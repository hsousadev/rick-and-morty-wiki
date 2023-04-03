import smoothScroll from "@/shared/utils/smoothScroll";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import Hero from "@/shared/components/Hero";

import { Icons } from "./icons";

import { EpisodeProps, EpisodeListProps } from "./interfaces";

import { Container, Content, HeroContent } from "./styles";
import MoreSection from "@/shared/components/MoreSection";
import EpisodeCard from "@/shared/components/EpisodeCard";
import Paginate from "@/shared/components/Paginate";
import { GlobalContext } from "../_app.page";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/episode");
  const episodeList = await res.json();
  const results = episodeList.results;
  const info = episodeList.info;

  return {
    props: {
      results,
      info,
    },
  };
}

const Episode = ({ results, info }: EpisodeListProps) => {
  const router = useRouter();
  const { episode_slug } = router.query;
  const { darkTheme } = useContext(GlobalContext);

  const [episode, setEpisode] = useState<EpisodeProps>();
  const [espisodeListData, setEspisodeListData] = useState(results);

  const handleNewEpisodePage = async (page: number) => {
    smoothScroll("more-section");

    const pageNumber = page + 1;
    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/?page=${pageNumber}`
    );
    const newEpisodePageList = await res.json();
    setEspisodeListData(newEpisodePageList?.results);
  };

  useEffect(() => {
    const getEpisodeRequested = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/episode/${episode_slug}`
      );

      const episodeResquested = await res.json();

      setEpisode(episodeResquested);
    };

    getEpisodeRequested();
  }, [episode_slug]);

  return (
    <Container>
      {episode && (
        <HeroContent>
          <Hero
            id={episode.id}
            name={episode.name}
            air_date={episode.air_date}
            episode={episode.episode}
            characters={episode.characters}
          />
        </HeroContent>
      )}
      <Content>
        <MoreSection
          icon={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
          text="episódios"
        />

        <div className="episodes">
          {espisodeListData?.map((episode: EpisodeProps) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              episode={episode.episode}
            />
          ))}
        </div>
      </Content>

      <Paginate
        pageCount={info?.pages}
        onPageChange={(selectedItem: { selected: number }) =>
          handleNewEpisodePage(selectedItem?.selected)
        }
      />
    </Container>
  );
};

export default Episode;
