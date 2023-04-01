import { useRouter } from "next/router";
import { useContext } from "react";

import Hero from "./components/Hero";
import Search from "./components/Search";
import Filter from "./components/Filter";
import TitleSection from "@/shared/components/TitleSection";
import CharacterCard from "@/shared/components/CharacterCard";
import EpisodeCard from "@/shared/components/EpisodeCard";
import LocationCard from "@/shared/components/LocationCard";

import { GlobalContext } from "@/pages/_app";

import HomeContext from "./context";

import { Container, HeroContent, Content } from "./styles";

const Home = () => {
  const router = useRouter();

  const { darkTheme } = useContext(GlobalContext);
  const { characterList, episodeList, locationList } = useContext(HomeContext);

  const characterListData = characterList?.results?.slice(0, 12);
  const episodeListData = episodeList?.results?.slice(0, 10);
  const locationListData = locationList?.results?.slice(0, 14);

  return (
    <Container>
      <HeroContent isDarkTheme={darkTheme}>
        <Hero />
      </HeroContent>
      <Content>
        <div className="search-and-filter">
          <Search />
          <Filter />
        </div>

        <TitleSection
          onClick={() => router.push("/character/1")}
          id="characters"
          title="Personagens"
        />

        <div className="characters">
          {characterListData?.map((character: any, index: number) => (
            <CharacterCard
              id={character?.id}
              key={index}
              image={character?.image}
              name={character?.name}
              status={character?.status}
              species={character?.species}
              origin={character?.origin?.name}
            />
          ))}
        </div>

        <TitleSection id="episodes" title="Episódios" />

        <div className="episodes">
          {episodeListData?.map((episode: any) => (
            <EpisodeCard
              key={episode?.id}
              name={episode?.name}
              episode={episode?.episode}
            />
          ))}
        </div>

        <TitleSection id="locations" title="Localizações" />

        <div className="locations">
          {locationListData?.map((location: any, index: number) => (
            <LocationCard
              key={index}
              type={location?.type}
              name={location?.name}
            />
          ))}
        </div>
      </Content>
    </Container>
  );
};

export default Home;
