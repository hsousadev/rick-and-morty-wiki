import { useRouter } from "next/router";

import { Planet, Info, Heart, MapPin } from "@phosphor-icons/react";

import { LocationCardProps } from "@/shared/types/locationCardProps";
import DefaultButton from "../DefaultButton";
import { favoritesLocationsToSet } from "@/pages/favorites";

import { Container, Content } from "./styles";
import { useEffect, useState } from "react";

const LocationCard = ({ id, type, name }: LocationCardProps) => {
  const router = useRouter();

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
            <Planet size={48} color={`var(--FONT-COLOR)`} />
          ) : (
            <MapPin size={48} color={`var(--FONT-COLOR)`} />
          )}
          <Content>
            <h4>{type === "unknown" ? "Desconhecido" : type}</h4>
            <h4>{name}</h4>
            <DefaultButton
              icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
              text="Saiba mais"
              onClick={() => router.push(`/location/${id}`)}
            />
            {!isCharacterScreen && (
              <>
                {!isFavorited ? (
                  <button>
                    <Heart
                      size={32}
                      color={`var(--FONT-COLOR)`}
                      onClick={() => handleFavorite()}
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
                    <Heart color={`var(--BLUE-A)`} size={16} weight="fill" />{" "}
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
