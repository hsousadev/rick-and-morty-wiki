import Image from "next/image";

import { useContext, useEffect, useState } from "react";

import DefaultButton from "../DefaultButton";
import { favoritesCharactersToSet } from "@/pages/favorites/index.page";

import { Icons } from "./icons";

import { Container } from "./styles";
import Link from "next/link";
import { GlobalContext } from "@/pages/_app.page";

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
  const isAlive = status === "Alive";
  const { darkTheme } = useContext(GlobalContext);

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
                <Image width={16} height={16} src={Icons.Pulse} alt="" />
                <p>Vivo(a)</p>
              </>
            ) : (
              <>
                <Image width={16} height={16} src={Icons.Skull} alt="" />
                <p>Morto(a)</p>
              </>
            )}
          </div>
          <div>
            <Image
              width={16}
              height={16}
              src={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
              alt=""
            />
            <p>
              {species === "unknown"
                ? "Espécie desconhecida"
                : species === "Human"
                ? "Humano(a)"
                : species}
            </p>
          </div>
          <div>
            <Image
              width={16}
              height={16}
              src={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
              alt=""
            />
            <p>{origin === "unknown" ? "Desconhecido" : origin}</p>
          </div>
        </div>
        {!isFavorited ? (
          <button>
            <Image
              width={48}
              height={48}
              src={Icons.BlueHeartOutline}
              alt=""
              onClick={() => handleFavorite()}
            />
          </button>
        ) : (
          <h4 style={{ textAlign: "end", color: `var(--BLUE-A)` }}>
            <Image width={16} height={16} src={Icons.BlueHeart} alt="" />{" "}
            Item <br /> favoritado{" "}
          </h4>
        )}
      </div>
      <Link href={`/character/${id}`}>
        <DefaultButton
          icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
          text="Saiba Mais"
        />
      </Link>
    </Container>
  );
};

export default CharacterCard;
