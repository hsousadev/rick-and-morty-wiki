import type { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import styled from "styled-components";
import Hero from "@/shared/components/Hero";
import MoreSection from "@/shared/components/MoreSection";
import LocationCard from "@/shared/components/LocationCard";
import CharacterCard from "@/shared/components/CharacterCard";
import Paginate from "@/shared/components/Paginate";
import EmptyState from "@/shared/components/EmptyState";
import Seo from "@/shared/components/Seo";
import Carousel from "@/shared/components/Carousel";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import { carouselOnMobile } from "@/shared/styles/mixins";
import { getLocationById, getLocations } from "@/shared/services/rickAndMorty";
import { loadRelatedCharacters } from "@/shared/utils/related";
import type { Character, Location, Paged } from "@/shared/types/api";
import smoothScroll from "@/shared/utils/smoothScroll";

type LocationPageProps = {
  location: Location;
  residents: Character[];
  list: Paged<Location>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;
  padding: 0 24px;

  .graph,
  .catalog {
    width: 100%;
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    width: 100%;
    gap: 24px;
    ${carouselOnMobile("min(78vw, 280px)")}
  }

  .locations {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    width: 100%;
    gap: 24px;
    ${carouselOnMobile("min(48vw, 180px)")}
  }
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 3px solid var(--INK);
  background: var(--HERO-BAND);
`;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<LocationPageProps> = async ({
  params,
}) => {
  const slug = params?.location_slug;
  const id = Array.isArray(slug) ? slug[0] : slug;
  if (!id) return { notFound: true };

  const location = await getLocationById(id);
  if (!location) return { notFound: true };

  const [list, residents] = await Promise.all([
    getLocations(),
    loadRelatedCharacters(location.residents),
  ]);

  return {
    props: { location, list, residents },
    revalidate: 86400,
  };
};

export default function LocationPage({ location, list, residents }: LocationPageProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const [listData, setListData] = useState(list);
  const [page, setPage] = useState(0);
  const [loadingList, setLoadingList] = useState(false);

  async function handlePageChange(selected: number) {
    smoothScroll("more-section");
    setLoadingList(true);
    const data = await getLocations({ page: selected + 1 });
    setListData(data);
    setPage(selected);
    setLoadingList(false);
  }

  return (
    <Container>
      <Seo
        title={location.name}
        description={`${location.type} • ${location.dimension} • ${location.residents.length} ${t.sections.residents.toLowerCase()}`}
      />
      <HeroContent>
        <Hero
          id={location.id}
          name={location.name}
          type={location.type}
          dimension={location.dimension}
          residents={location.residents}
        />
      </HeroContent>
      <Content>
        <div className="graph">
          <MoreSection
            icon={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
            text={t.sections.residents}
            hidePrefix
          />
          {residents.length > 0 ? (
            <Carousel className="characters" label={t.a11y.carousel}>
              {residents.map((item) => (
                <CharacterCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  status={item.status}
                  species={item.species}
                  origin={item.origin?.name}
                />
              ))}
            </Carousel>
          ) : (
            <EmptyState title={t.empty.noCharacters} />
          )}
        </div>

        <div className="catalog">
          <MoreSection
            icon={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
            text={t.sections.moreLocations}
            id="more-section"
          />
          {loadingList ? (
            <CatalogSkeletons count={4} />
          ) : listData.results.length > 0 ? (
            <Carousel className="locations" label={t.a11y.carousel}>
              {listData.results.map((item) => (
                <LocationCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                />
              ))}
            </Carousel>
          ) : (
            <EmptyState title={t.empty.noLocations} />
          )}
        </div>
        <Paginate
          pageCount={listData.info.pages}
          forcePage={page}
          onPageChange={(item) => handlePageChange(item.selected)}
        />
      </Content>
    </Container>
  );
}
