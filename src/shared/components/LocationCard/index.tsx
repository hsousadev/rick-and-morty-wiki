import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { Icons } from "./icons";

import { LocationCardProps } from "@/shared/types/locationCardProps";
import DefaultButton from "../DefaultButton";
import { favoritesLocationsToSet } from "@/pages/favorites/index.page";

import { Container, Content } from "./styles";
import { GlobalContext } from "@/pages/_app.page";

const LocationCard = ({ id, type, name }: LocationCardProps) => {
  const router = useRouter();
  const { darkTheme } = useContext(GlobalContext);

  const isCharacterScreen = router.pathname.slice(0, 10) === "/character";

  const [isFavorited, setIsFavorited] = useState(false);

  const locationCard = {
    id: id,
    type: type,
    name: name,
  };

  function handleFavorite() {
    setIsFavorited(true);

    const storageFavoritesLocation: any =
      localStorage.getItem("favoriteLocation");

    const storedFavoriteLocation = JSON.parse(storageFavoritesLocation);

    if (storedFavoriteLocation) {
      storedFavoriteLocation.push(locationCard);

      localStorage.setItem(
        "favoriteLocation",
        JSON.stringify(storedFavoriteLocation)
      );
    } else {
      favoritesLocationsToSet.push(locationCard);

      localStorage.setItem(
        "favoriteLocation",
        JSON.stringify(favoritesLocationsToSet)
      );
    }
  }

  function handleFavoriteLocationExists(card: any, list: any) {
    var i;
    for (i = 0; i < list?.length; i++) {
      if (list[i]?.id === card.id) {
        setIsFavorited(true);
      }
    }
  }

  useEffect(() => {
    const storageFavoritesLocation: any =
      localStorage.getItem("favoriteLocation");
    const storedFavoriteLocation = JSON.parse(storageFavoritesLocation);

    handleFavoriteLocationExists(locationCard, storedFavoriteLocation);
  }, []);

  return (
    <Container>
      {name && (
        <>
          {type === "Planet" ? (
            <Image
              src={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
              width={48}
              height={48}
              alt=""
            />
          ) : (
            <Image
              src={darkTheme ? Icons.WhiteMapPin : Icons.DarkMapPin}
              width={48}
              height={48}
              alt=""
            />
          )}
          <Content>
            <h4>{type === "unknown" ? "Desconhecido" : type}</h4>
            <h4>{name}</h4>
            <DefaultButton
              icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
              text="Saiba mais"
              onClick={() => router.push(`/location/${id}`)}
            />
            {!isCharacterScreen && (
              <>
                {!isFavorited ? (
                  <button onClick={() => handleFavorite()}>
                    <Image
                      src={Icons.BlueHeartOutline}
                      width={32}
                      height={32}
                      alt=""
                    />
                  </button>
                ) : (
                  <h4
                    style={{
                      textAlign: "end",
                      color: `var(--BLUE-A)`,
                      width: "100%",
                      height: "50px",
                      marginTop: "8px",
                    }}
                  >
                    <Image
                      src={Icons.BlueHeart}
                      width={16}
                      height={16}
                      alt=""
                    />
                    Item
                    <br /> favoritado
                  </h4>
                )}
              </>
            )}
          </Content>
        </>
      )}
    </Container>
  );
};

export default LocationCard;
