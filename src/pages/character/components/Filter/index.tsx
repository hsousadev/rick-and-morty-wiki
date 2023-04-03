import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import DefaultButton from "@/shared/components/DefaultButton";

import { Icons } from "./icons"

import { Container } from "./styles";
import CharacterProps from "../../interfaces";
import { GlobalContext } from "@/pages/_app.page";

interface FilterProps {
  setCharacterListData: Dispatch<SetStateAction<CharacterProps[]>>;
  setInfoPage: Dispatch<
    SetStateAction<{ pages: number; count: number; next: string }>
  >;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  species: string;
  setSpecies: Dispatch<SetStateAction<string>>;
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
}

const Filter = ({
  setCharacterListData,
  setInfoPage,
  status,
  setStatus,
  species,
  setSpecies,
  setGender,
  gender,
}: FilterProps) => {

  const { darkTheme } = useContext(GlobalContext)

  async function handleFilter() {
    const resCharacterFilter = await fetch(
      `https://rickandmortyapi.com/api/character/?status=${status}&species=${species}&gender=${gender}`
    );

    let characterFiltered = await resCharacterFilter.json();

    setCharacterListData(characterFiltered?.results);
    setInfoPage(characterFiltered.info);
  }

  function handleClearFilter() {
    setStatus("");
    setSpecies("");
    setGender("");
  }

  useEffect(() => {
    handleFilter();
  }, [status, species, gender]);

  const isFiltering = status !== "" || species !== "" || gender !== "";

  return (
    <Container>
      <div className="category">
        <h4>Status:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhitePulse : Icons.DarkPulse}
            text="Vivo"
            onClick={() => setStatus("alive")}
            selected={status === "alive"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSkull : Icons.DarkSkull}
            text="Morto"
            onClick={() => setStatus("dead")}
            selected={status === "dead"}
          />
        </div>
      </div>
      <div className="category">
        <h4>Espécie:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhitePerson : Icons.DarkPerson}
            text="Humano"
            onClick={() => setSpecies("human")}
            selected={species === "human"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
            text="Alien"
            onClick={() => setSpecies("alien")}
            selected={species === "alien"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteRobot : Icons.DarkRobot}
            text="Robo"
            onClick={() => setSpecies("robot")}
            selected={species === "robot"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
            text="Desconhecido"
            onClick={() => setSpecies("unknown")}
            selected={species === "unknown"}
          />
        </div>
      </div>
      <div className="category">
        <h4>Genero:</h4>
        <div className="filters">
          <DefaultButton
            icon={darkTheme ? Icons.WhiteGenderMale : Icons.DarkGenderMale}
            text="Masculino"
            onClick={() => setGender("male")}
            selected={gender === "male"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteGenderFemale : Icons.DarkGenderFemale}
            text="Feminino"
            onClick={() => setGender("female")}
            selected={gender === "female"}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
            text="Desconhecido"
            onClick={() => setGender("unknown")}
            selected={gender === "unknown"}
          />
        </div>
      </div>
      {isFiltering && (
        <DefaultButton
        icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}  
        text="Limpar filtros"
          onClick={() => handleClearFilter()}
        />
      )}
    </Container>
  );
};

export default Filter;
