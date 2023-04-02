import Image from "next/image";

import {
  MonitorPlay,
  Heart,
  Pulse,
  Alien,
  GenderIntersex,
  Skull,
} from "@phosphor-icons/react";

import { CharacterProps } from "../../interfaces";

import LocationCard from "@/shared/components/LocationCard";
import LocationCardProps from "@/shared/types/LocationCardProps";

import { Container } from "./styles";
import { useEffect, useState } from "react";

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
          <h1>
            {name} <Heart />
          </h1>
          <h3>
            <MonitorPlay size={32} />
            Participou de{" "}
            {episode?.length > 1
              ? episode?.length + " episódios"
              : "1 episódio"}
          </h3>
          <div className="details">
            <h3>
              {status === "Alive" ? (
                <>
                  <Pulse size={32} color={`var(--PEAR)`} />

                  {gender === "Male" ? "Vivo" : "Viva"}
                </>
              ) : (
                <>
                  <Skull size={32} color={`var(--RED)`} />
                  {gender === "Male" ? "Morto" : "Morta"}
                </>
              )}
            </h3>
            <h3>
              <Alien size={32} />
              {species === "unknown"
                ? "Espécie desconhecida"
                : species === "Human"
                ? gender === "Male"
                  ? "Humano"
                  : "Humana"
                : species}
            </h3>
            <h3>
              <GenderIntersex size={32} />
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
