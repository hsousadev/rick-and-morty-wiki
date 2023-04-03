import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import DefaultButton from "../DefaultButton";
import { favoritesCharactersToSet } from "@/pages/favorites/index.page";

import {
  Pulse,
  Alien,
  Planet,
  Heart,
  Info,
  Skull,
} from "@phosphor-icons/react";

import { Container } from "./styles";
import Link from "next/link";

export interface CharacterCardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  origin: string;
  changed?: any;
  setChanged?: any;
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

  const [isFavorited, setIsFavorited] = useState(false);

  const characterCard = {
    id: id,
    image: image,
    name: name,
    status: status,
    species: species,
    origin: origin,
  };

  function handleFavorite() {
    setIsFavorited(true);

    const storageFavoritesCharacters: any =
      localStorage.getItem("favoriteCharacters");

    const storedFavoriteCharacters = JSON.parse(storageFavoritesCharacters);

    if (storedFavoriteCharacters) {
      storedFavoriteCharacters.push(characterCard);

      localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(storedFavoriteCharacters)
      );
    } else {
      favoritesCharactersToSet.push(characterCard);

      localStorage.setItem(
        "favoriteCharacters",
        JSON.stringify(favoritesCharactersToSet)
      );
    }
  }

  function handleFavoriteCharacterExists(card: any, list: any) {
    var i;
    for (i = 0; i < list?.length; i++) {
      if (list[i]?.id === card.id) {
        setIsFavorited(true);
      }
    }
  }

  useEffect(() => {
    const storageFavoritesCharacters: any =
      localStorage.getItem("favoriteCharacters");
    const storedFavoriteCharacters = JSON.parse(storageFavoritesCharacters);

    handleFavoriteCharacterExists(characterCard, storedFavoriteCharacters);
  }, []);

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
                <p>Morto(a)</p>
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
        {!isFavorited ? (
          <button>
            <Heart
              color={`var(--BLUE-A)`}
              size={48}
              onClick={() => handleFavorite()}
            />
          </button>
        ) : (
          <h4 style={{ textAlign: "end", color: `var(--BLUE-A)` }}>
            <Heart color={`var(--BLUE-A)`} size={16} weight="fill" /> Item{" "}
            <br /> favoritado{" "}
          </h4>
        )}
      </div>
      <Link href={`/character/${id}`}>
        <DefaultButton
          icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
          text="Saiba Mais"
        />
      </Link>
    </Container>
  );
};

export default CharacterCard;
