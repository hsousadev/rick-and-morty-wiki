import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import Hero from "./components/Hero";
import Search from "./components/Search";
import Filter from "@/shared/components/Filter";

import TitleSection from "@/shared/components/TitleSection";
import CharacterCard from "@/shared/components/CharacterCard";
import EpisodeCard from "@/shared/components/EpisodeCard";
import LocationCard from "@/shared/components/LocationCard";
import Paginate from "@/shared/components/Paginate";

import { GlobalContext } from "@/pages/_app.page";

import HomeContext from "./context";

import { Container, HeroContent, Content } from "./styles";
import CharacterProps from "../character/interfaces";
import { EpisodeProps } from "../episode/interfaces";
import { LocationProps } from "../location/interfaces";
import smoothScroll from "@/shared/utils/smoothScroll";

const Home = () => {
  const router = useRouter();

  const { darkTheme } = useContext(GlobalContext);
  const { characterList, episodeList, locationList } = useContext(HomeContext);

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [characterListInitial, setCharacterListInitial] =
    useState(characterList);
  const [episodeListInitial, setEpisodeListInitial] = useState(episodeList);
  const [locationListInitial, setLocationListInitial] = useState(locationList);

  const [newStoredCharacters, setNewStoredCharacters] = useState(false);
  const [storedCharacters, setStoredCharacters] = useState([]);

  function handleGetStoredCharacters() {
    const storageFavoritesCharacters: any =
      localStorage.getItem("favoriteCharacters");

    const storedFavoriteCharacters = JSON.parse(storageFavoritesCharacters);

    setStoredCharacters(storedFavoriteCharacters);
    setNewStoredCharacters(false);
  }

  const handleNewCharacterPage = async (page: number) => {
    smoothScroll("characters");
    const pageNumber = page + 1;

    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${searchText}`
    );
    const newCharacterPageList = await res.json();
    setCharacterListInitial(newCharacterPageList);
  };

  const handleNewEpisodePage = async (page: number) => {
    smoothScroll("episodes");
    const pageNumber = page + 1;

    const res = await fetch(
      `https://rickandmortyapi.com/api/episode/?page=${pageNumber}&name=${searchText}`
    );
    const newEpisodePageList = await res.json();
    setEpisodeListInitial(newEpisodePageList);
  };

  const handleNewLocationPage = async (page: number) => {
    smoothScroll("location");
    const pageNumber = page + 1;

    const res = await fetch(
      `https://rickandmortyapi.com/api/location/?page=${pageNumber}&name=${searchText}`
    );
    const newLocationPageList = await res.json();
    setLocationListInitial(newLocationPageList);
  };

  useEffect(() => {
    handleGetStoredCharacters();
  }, [newStoredCharacters]);

  useEffect(() => {
    if (router.pathname === "/home") {
      router.push("/");
    }
  }, []);

  const isPaginateNecessary = isSearching && searchText !== "";

  return (
    <Container>
      <HeroContent isDarkTheme={darkTheme}>
        <Hero />
      </HeroContent>
      <Content>
        <div className="search-and-filter">
          <Search
            setIsSearching={setIsSearching}
            setSearchText={setSearchText}
            searchText={searchText}
            setCharacterListInitial={setCharacterListInitial}
            setEpisodeListInitial={setEpisodeListInitial}
            setLocationListInitial={setLocationListInitial}
          />
          <Filter />
        </div>

        {characterListInitial && (
          <>
            <TitleSection
              onClick={() => router.push("/character/1")}
              id="characters"
              title="Personagens"
              isSearching={isSearching}
              resultsCount={characterListInitial?.info?.count}
            />
            <div className="characters">
              {characterListInitial?.results?.map(
                (character: CharacterProps) => (
                  <CharacterCard
                    id={character?.id}
                    key={character?.id}
                    image={character?.image}
                    name={character?.name}
                    status={character?.status}
                    species={character?.species}
                    origin={character?.origin?.name}
                  />
                )
              )}
            </div>
            {isPaginateNecessary && characterListInitial?.info?.pages > 1 && (
              <Paginate
                pageCount={characterListInitial?.info?.pages}
                onPageChange={(selectedItem: { selected: number }) =>
                  handleNewCharacterPage(selectedItem?.selected)
                }
              />
            )}
          </>
        )}

        {episodeListInitial && (
          <>
            <TitleSection
              onClick={() => router.push("/episode/1")}
              id="episodes"
              title="Episódios"
              isSearching={isSearching}
              resultsCount={episodeListInitial?.info?.count}
            />

            <div className="episodes">
              {episodeListInitial?.results?.map((episode: EpisodeProps) => (
                <EpisodeCard
                  id={episode?.id}
                  key={episode?.id}
                  name={episode?.name}
                  episode={episode?.episode}
                />
              ))}
            </div>
            {isPaginateNecessary && episodeListInitial?.info?.pages > 1 && (
              <Paginate
                pageCount={episodeListInitial?.info?.pages}
                onPageChange={(selectedItem: { selected: number }) =>
                  handleNewEpisodePage(selectedItem?.selected)
                }
              />
            )}
          </>
        )}

        {locationListInitial && (
          <>
            <TitleSection
              onClick={() => router.push("/location/1")}
              id="locations"
              title="Localizações"
              isSearching={isSearching}
              resultsCount={locationListInitial?.info?.count}
            />

            <div className="locations">
              {locationListInitial?.results?.map((location: LocationProps) => (
                <LocationCard
                  id={location.id}
                  key={location.id}
                  type={location?.type}
                  name={location?.name}
                />
              ))}
            </div>
            {isPaginateNecessary && locationListInitial?.info?.pages > 1 && (
              <Paginate
                pageCount={locationListInitial?.info?.pages}
                onPageChange={(selectedItem: { selected: number }) =>
                  handleNewLocationPage(selectedItem?.selected)
                }
              />
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Home;
