import React, { useState, useContext } from "react";

import { MagnifyingGlass } from "@phosphor-icons/react";

import { GlobalContext } from "@/pages/_app";

import { Container } from "./styles";

const Search = () => {
  const { darkTheme } = useContext(GlobalContext);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: any) => {
    if (event.key === "Enter") {
      console.log(searchText);
    }
  };

  const handleInputText = (event: any) => {
    setSearchText(event.target.value);
  };

  return (
    <Container isDarkTheme={darkTheme}>
      <input
        id="search"
        type="search"
        placeholder="Personagens, episódios ou localizações"
        onChange={handleInputText}
        onKeyDown={handleSearch}
      />
      <button>
        <MagnifyingGlass color={`var(--FONT-COLOR)`} size={32} />
      </button>
    </Container>
  );
};

export default Search;
