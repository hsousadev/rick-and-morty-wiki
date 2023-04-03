import Image from 'next/image'
import React, { useContext, SetStateAction, Dispatch } from "react";

import { GlobalContext } from "@/pages/_app.page";

import { Icons } from "./icons";

import CharacterListProps from "@/pages/character/interfaces";
import { EpisodeListProps } from "@/pages/episode/interfaces";
import { LocationListProps } from "@/pages/location/interfaces";

import { Container } from "./styles";

interface SearchProps {
  setCharacterListInitial: Dispatch<SetStateAction<CharacterListProps>>;
  setEpisodeListInitial: Dispatch<SetStateAction<EpisodeListProps>>;
  setLocationListInitial: Dispatch<SetStateAction<LocationListProps>>;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  searchText: string;
}

const Search = ({
  setCharacterListInitial,
  setEpisodeListInitial,
  setLocationListInitial,
  setIsSearching,
  setSearchText,
  searchText,
}: SearchProps) => {
  const { darkTheme } = useContext(GlobalContext);

  const handleSearch = async (event: any) => {
    if (event.key === "Enter" || event.type === "click") {
      if (searchText === "") {
        setIsSearching(false);
      } else {
        setIsSearching(true);
      }

      const resCharacterSearch = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchText}`
      );
      const characterSearched = await resCharacterSearch.json();
      setCharacterListInitial(characterSearched);

      const resEpisodeSearch = await fetch(
        `https://rickandmortyapi.com/api/episode/?name=${searchText}`
      );
      const episodeSearched = await resEpisodeSearch.json();
      setEpisodeListInitial(episodeSearched);

      const resLocationSearch = await fetch(
        `https://rickandmortyapi.com/api/location/?name=${searchText}`
      );
      const locationSearched = await resLocationSearch.json();
      if (locationSearched) setLocationListInitial(locationSearched);
    }
  };

  const handleInputText = (event: any) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <Container isDarkTheme={darkTheme}>
        <input
          id="search"
          type="search"
          placeholder="Personagens, episódios ou localizações"
          onChange={handleInputText}
          onKeyDown={handleSearch}
          maxLength={30}
        />
        <button id="doSearch" onClick={(e) => handleSearch(e)}>
          <Image src={darkTheme ? Icons.WhiteMagnifyingGlass : Icons.DarkMagnifyingGlass} alt ="" /> 
        </button>
      </Container>
    </>
  );
};

export default Search;
