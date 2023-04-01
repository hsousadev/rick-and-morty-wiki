import { useRouter } from "next/router";
import React from "react";

import DefaultButton from "../DefaultButton";

import {
  Pulse,
  Alien,
  Planet,
  Heart,
  Info,
  Skull,
} from "@phosphor-icons/react";

import { Container } from "./styles";

interface CharacterCardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  origin: string;
}

const CharacterCard = ({
  id,
  image,
  name,
  status,
  species,
  origin,
}: CharacterCardProps) => {
  const router = useRouter();

  const isAlive = status === "Alive";

  return (
    <Container>
      <img src={image} height={200} alt="" />
      <div className="character-info">
        <div className="info">
          <p className="name">{name}</p>

          <div>
            {isAlive ? (
              <>
                <Pulse color={`var(--PEAR)`} />
                <p>Vivo(a)</p>
              </>
            ) : (
              <>
                <Skull color={`var(--RED)`} />
                <p>Vivo(a)</p>
              </>
            )}
          </div>
          <div>
            <Alien color={`var(--FONT-COLOR)`} />
            <p>
              {species === "unknown"
                ? "Espécie desconhecida"
                : species === "Human"
                ? "Humano(a)"
                : species}
            </p>
          </div>
          <div>
            <Planet color={`var(--FONT-COLOR)`} />
            <p>{origin === "unknown" ? "Desconhecido" : origin}</p>
          </div>
        </div>
        <button>
          <Heart color="#11b0c8" size={48} />
        </button>
      </div>
      <DefaultButton
        icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
        text="Saiba Mais"
        onClick={() => router.push(`/character/${id}`)}
      />
    </Container>
  );
};

export default CharacterCard;
