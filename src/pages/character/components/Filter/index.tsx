import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DefaultButton from "@/shared/components/DefaultButton";
import smoothScroll from "@/shared/utils/smoothScroll";

import {
  Pulse,
  Skull,
  Alien,
  GenderMale,
  GenderFemale,
  Question,
  Robot,
  Person,
  XCircle,
} from "@phosphor-icons/react";

import { Container } from "./styles";
import CharacterProps from "../../interfaces";

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
            icon={
              <Pulse
                size={24}
                color={
                  status === "alive" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Vivo"
            onClick={() => setStatus("alive")}
            selected={status === "alive"}
          />
          <DefaultButton
            icon={
              <Skull
                size={24}
                color={status === "dead" ? `var(--WHITE)` : `var(--FONT-COLOR)`}
              />
            }
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
            icon={
              <Person
                size={24}
                color={
                  species === "human" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Humano"
            onClick={() => setSpecies("human")}
            selected={species === "human"}
          />
          <DefaultButton
            icon={
              <Alien
                size={24}
                color={
                  species === "alien" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Alien"
            onClick={() => setSpecies("alien")}
            selected={species === "alien"}
          />
          <DefaultButton
            icon={
              <Robot
                size={24}
                color={
                  species === "robot" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Robo"
            onClick={() => setSpecies("robot")}
            selected={species === "robot"}
          />
          <DefaultButton
            icon={
              <Question
                size={24}
                color={
                  species === "unknown" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
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
            icon={
              <GenderMale
                size={24}
                color={gender === "male" ? `var(--WHITE)` : `var(--FONT-COLOR)`}
              />
            }
            text="Masculino"
            onClick={() => setGender("male")}
            selected={gender === "male"}
          />
          <DefaultButton
            icon={
              <GenderFemale
                size={24}
                color={
                  gender === "female" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Feminino"
            onClick={() => setGender("female")}
            selected={gender === "female"}
          />
          <DefaultButton
            icon={
              <Question
                size={24}
                color={
                  gender === "unknown" ? `var(--WHITE)` : `var(--FONT-COLOR)`
                }
              />
            }
            text="Desconhecido"
            onClick={() => setGender("unknown")}
            selected={gender === "unknown"}
          />
        </div>
      </div>
      {isFiltering && (
        <DefaultButton
          icon={<XCircle size={24} color={`var(--FONT-COLOR)`} />}
          text="Limpar filtros"
          onClick={() => handleClearFilter()}
        />
      )}
    </Container>
  );
};

export default Filter;
