import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Hero from "./components/Hero";
import Filter from "./components/Filter";
import CharacterCard from "@/shared/components/CharacterCard";
import Paginate from "@/shared/components/Paginate";
import MoreSection from "@/shared/components/MoreSection";
import EmptyState from "@/shared/components/EmptyState";
import Seo from "@/shared/components/Seo";
import Carousel from "@/shared/components/Carousel";
import SeasonGroups from "@/shared/components/SeasonGroups";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import { carouselOnMobile } from "@/shared/styles/mixins";
import {
  fetchByUrl,
  getCharacterById,
  getCharacters,
} from "@/shared/services/rickAndMorty";
import { loadRelatedEpisodes } from "@/shared/utils/related";
import type { Character, Episode, Location, Paged } from "@/shared/types/api";
import { emptyPage } from "@/shared/types/api";
import smoothScroll from "@/shared/utils/smoothScroll";

type CharacterPageProps = {
  character: Character;
  originLocation: Location | null;
  currentLocation: Location | null;
  relatedEpisodes: Episode[];
  list: Paged<Character>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Content = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .section-and-filter {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .graph {
    width: 100%;
    margin-top: 8px;
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    width: 100%;
    gap: 24px;
    ${carouselOnMobile("min(78vw, 280px)")}
  }
`;

const HeroContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 3px solid var(--INK);
  background: var(--HERO-BAND);
`;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<CharacterPageProps> = async ({
  params,
}) => {
  const slug = params?.character_slug;
  const id = Array.isArray(slug) ? slug[0] : slug;

  if (!id) return { notFound: true };

  const character = await getCharacterById(id);
  if (!character) return { notFound: true };

  const [list, originLocation, currentLocation, relatedEpisodes] = await Promise.all([
    getCharacters(),
    fetchByUrl<Location>(character.origin?.url),
    fetchByUrl<Location>(character.location?.url),
    loadRelatedEpisodes(character.episode),
  ]);

  return {
    props: {
      character,
      originLocation,
      currentLocation,
      relatedEpisodes,
      list,
    },
    revalidate: 86400,
  };
};

function queryValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default function CharacterPage({
  character,
  originLocation,
  currentLocation,
  relatedEpisodes,
  list,
}: CharacterPageProps) {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const status = queryValue(router.query.status);
  const species = queryValue(router.query.species);
  const gender = queryValue(router.query.gender);
  const pageQuery = Number(queryValue(router.query.page) || "1");

  const [listData, setListData] = useState(list);
  const [page, setPage] = useState(Math.max(pageQuery - 1, 0));
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setLoadingList(true);
      const data = await getCharacters({
        page: pageQuery || 1,
        status,
        species,
        gender,
      });
      if (cancelled) return;
      setListData(data.results.length ? data : emptyPage<Character>());
      setPage(Math.max((pageQuery || 1) - 1, 0));
      setLoadingList(false);
    }

    loadList();
    return () => {
      cancelled = true;
    };
  }, [status, species, gender, pageQuery]);

  function updateQuery(next: Record<string, string>) {
    const query: Record<string, string> = {};

    Object.entries(next).forEach(([key, value]) => {
      if (!value) return;
      if (key === "page" && value === "1") return;
      query[key] = value;
    });

    router.replace(
      { pathname: `/character/${character.id}`, query },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  function setFilter(key: "status" | "species" | "gender", value: string) {
    updateQuery({
      status: key === "status" ? (status === value ? "" : value) : status,
      species: key === "species" ? (species === value ? "" : value) : species,
      gender: key === "gender" ? (gender === value ? "" : value) : gender,
      page: "1",
    });
  }

  async function handlePageChange(selected: number) {
    smoothScroll("more-section");
    updateQuery({
      status,
      species,
      gender,
      page: String(selected + 1),
    });
  }

  return (
    <Container>
      <Seo
        title={character.name}
        description={`${character.name} • ${character.species} • ${character.status}`}
        image={character.image}
      />
      <HeroContent>
        <Hero
          {...character}
          originLocation={originLocation}
          currentLocation={currentLocation}
        />
      </HeroContent>
      <Content>
        <div className="graph">
          <MoreSection
            icon={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
            text={t.sections.appearedIn}
            hidePrefix
          />
          <SeasonGroups episodes={relatedEpisodes} />
        </div>

        <div className="section-and-filter">
          <MoreSection
            icon={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
            text={t.sections.moreCharacters}
            id="more-section"
          />
          <Filter
            status={status}
            species={species}
            gender={gender}
            onStatus={(value) => setFilter("status", value)}
            onSpecies={(value) => setFilter("species", value)}
            onGender={(value) => setFilter("gender", value)}
            onClear={() =>
              updateQuery({ status: "", species: "", gender: "", page: "1" })
            }
          />
        </div>

        {loadingList ? (
          <CatalogSkeletons count={4} />
        ) : listData.results.length > 0 ? (
          <Carousel className="characters" label={t.a11y.carousel}>
            {listData.results.map((item) => (
              <CharacterCard
                id={item.id}
                key={item.id}
                image={item.image}
                name={item.name}
                status={item.status}
                species={item.species}
                origin={item.origin?.name}
              />
            ))}
          </Carousel>
        ) : (
          <EmptyState
            title={t.empty.noFilters}
            description={t.empty.noFiltersHint}
          />
        )}

        <Paginate
          pageCount={listData.info.pages}
          forcePage={page}
          onPageChange={(item) => handlePageChange(item.selected)}
        />
      </Content>
    </Container>
  );
}
