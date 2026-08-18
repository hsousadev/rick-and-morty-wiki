import type { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import styled from "styled-components";
import Hero from "@/shared/components/Hero";
import MoreSection from "@/shared/components/MoreSection";
import CharacterCard from "@/shared/components/CharacterCard";
import Paginate from "@/shared/components/Paginate";
import EmptyState from "@/shared/components/EmptyState";
import Seo from "@/shared/components/Seo";
import Carousel from "@/shared/components/Carousel";
import SeasonGroups from "@/shared/components/SeasonGroups";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import { carouselOnMobile } from "@/shared/styles/mixins";
import { getEpisodeById, getEpisodes } from "@/shared/services/rickAndMorty";
import { loadRelatedCharacters } from "@/shared/utils/related";
import type { Character, Episode, Paged } from "@/shared/types/api";
import smoothScroll from "@/shared/utils/smoothScroll";

type EpisodePageProps = {
  episode: Episode;
  cast: Character[];
  list: Paged<Episode>;
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

export const getStaticProps: GetStaticProps<EpisodePageProps> = async ({
  params,
}) => {
  const slug = params?.episode_slug;
  const id = Array.isArray(slug) ? slug[0] : slug;
  if (!id) return { notFound: true };

  const episode = await getEpisodeById(id);
  if (!episode) return { notFound: true };

  const [list, cast] = await Promise.all([
    getEpisodes(),
    loadRelatedCharacters(episode.characters),
  ]);

  return {
    props: { episode, list, cast },
    revalidate: 86400,
  };
};

export default function EpisodePage({ episode, list, cast }: EpisodePageProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const [listData, setListData] = useState(list);
  const [page, setPage] = useState(0);
  const [loadingList, setLoadingList] = useState(false);

  async function handlePageChange(selected: number) {
    smoothScroll("more-section");
    setLoadingList(true);
    const data = await getEpisodes({ page: selected + 1 });
    setListData(data);
    setPage(selected);
    setLoadingList(false);
  }

  return (
    <Container>
      <Seo
        title={episode.name}
        description={`${episode.episode} • ${episode.air_date} • ${episode.characters.length} ${t.sections.characters.toLowerCase()}`}
      />
      <HeroContent>
        <Hero
          id={episode.id}
          name={episode.name}
          air_date={episode.air_date}
          episode={episode.episode}
          characters={episode.characters}
        />
      </HeroContent>
      <Content>
        <div className="graph">
          <MoreSection
            icon={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
            text={t.sections.cast}
            hidePrefix
          />
          {cast.length > 0 ? (
            <Carousel className="characters" label={t.a11y.carousel}>
              {cast.map((item) => (
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
            icon={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
            text={t.sections.moreEpisodes}
            id="more-section"
          />
          {loadingList ? (
            <CatalogSkeletons count={4} />
          ) : (
            <SeasonGroups episodes={listData.results} />
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
