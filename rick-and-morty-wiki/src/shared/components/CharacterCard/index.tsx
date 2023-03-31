import React, { useContext } from "react";

import DefaultButton from "../DefaultButton";

import { Pulse, Alien, Planet, Heart, Info } from "@phosphor-icons/react";

import { Container } from "./styles";

interface CharacterCardProps {
  image: string;
  name: string;
  status: string;
  species: string;
  origin: string;
}

const CharacterCard = ({
  image,
  name,
  status,
  species,
  origin,
}: CharacterCardProps) => {
  return (
    <Container>
      <img src={image} height={200} alt="" />

      <div className="character-info">
        <div className="info">
          <p className="name">{name}</p>

          <div>
            <Pulse color="#bfde42" />
            <p>{status}</p>
          </div>
          <div>
            <Alien color={`var(--FONT-COLOR)`} />
            <p>{species}</p>
          </div>
          <div>
            <Planet color={`var(--FONT-COLOR)`} />
            <p>{origin}</p>
          </div>
        </div>
        <button>
          <Heart color="#11b0c8" size={48} />
        </button>
      </div>

      <DefaultButton
        icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
        text="Saiba Mais"
      />
    </Container>
  );
};

export default CharacterCard;
