import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import CharacterProps from "../../interfaces";
import { Icons } from "./icons";

import LocationCard from "@/shared/components/LocationCard";
import { LocationCardProps } from "@/shared/types/locationCardProps";

import { Container } from "./styles";
import { GlobalContext } from "@/pages/_app.page";

const HomeHero = ({
  name,
  status,
  species,
  gender,
  origin,
  location,
  image,
  episode,
}: CharacterProps) => {
  const { darkTheme } = useContext(GlobalContext);

  const [originCardInfo, setOriginCardInfo] = useState<LocationCardProps>();
  const [locationCardInfo, setLocationCardInfo] = useState<LocationCardProps>();

  const isLocationCardEquals = originCardInfo?.name === locationCardInfo?.name;

  useEffect(() => {
    async function getCharacterOrigin() {
      const res = await fetch(origin?.url);
      const characterOrigin = await res.json();
      setOriginCardInfo(characterOrigin);
    }
    getCharacterOrigin();
  }, []);

  useEffect(() => {
    async function getCharacterLocation() {
      const res = await fetch(location?.url);
      const characterLocation = await res.json();
      setLocationCardInfo(characterLocation);
    }
    getCharacterLocation();
  }, []);

  return (
    <Container>
      <Image src={image} width={370} height={460} alt="" />
      <div className="character-info">
        <div>
          <h1>{name}</h1>
          <h3>
            <Image
              src={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
              width={32}
              height={32}
              alt=""
            />
            Participou de{" "}
            {episode?.length > 1
              ? episode?.length + " episódios"
              : "1 episódio"}
          </h3>
          <div className="details">
            <h3>
              {status === "Alive" ? (
                <>
                  <Image src={Icons.Pulse} width={32} height={32} alt="" />

                  {gender === "Male" ? "Vivo" : "Viva"}
                </>
              ) : (
                <>
                  <Image src={Icons.Skull} width={32} height={32} alt="" />
                  {gender === "Male" ? "Morto" : "Morta"}
                </>
              )}
            </h3>
            <h3>
              <Image
                src={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
                width={32}
                height={32}
                alt=""
              />
              {species === "unknown"
                ? "Espécie desconhecida"
                : species === "Human"
                ? gender === "Male"
                  ? "Humano"
                  : "Humana"
                : species}
            </h3>
            <h3>
              <Image
                src={darkTheme ? Icons.WhiteGenderIntersex : Icons.DarkGenderIntersex}
                width={32}
                height={32}
                alt=""
              />
              {gender === "unknown"
                ? "Espécie desconhecida"
                : gender === "Male"
                ? "Masculino"
                : gender === "Female"
                ? "Feminino"
                : species}
            </h3>
          </div>
        </div>

        <div className="cards">
          {isLocationCardEquals ? (
            <>
              <LocationCard
                id={originCardInfo?.id}
                name={originCardInfo?.name}
                type={originCardInfo?.type}
              />
            </>
          ) : (
            <>
              <LocationCard
                id={originCardInfo?.id}
                name={originCardInfo?.name}
                type={originCardInfo?.type}
              />
              <LocationCard
                id={locationCardInfo?.id}
                name={locationCardInfo?.name}
                type={locationCardInfo?.type}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default HomeHero;
