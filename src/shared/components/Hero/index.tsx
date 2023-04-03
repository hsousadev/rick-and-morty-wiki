import Image from "next/image";

import { Container } from "./styles";

import { Icons } from "./icons";
import { GlobalContext } from "@/pages/_app.page";
import { useContext } from "react";

interface HeroProps {
  id: number;
  name: string;
  air_date?: string;
  episode?: string;
  characters?: Array<string>;
  type?: string;
  dimension?: string;
  residents?: Array<string>;
}

const Hero = ({
  name,
  episode,
  air_date,
  characters,
  type,
  dimension,
  residents,
}: HeroProps) => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container>
      <div className="episode">
        {episode ? (
          <Image
            src={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
            width={72}
            height={72}
            alt=""
          />
        ) : type === "Planet" ? (
          <Image
            src={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
            width={72}
            height={72}
            alt=""
          />
        ) : (
          <Image
            src={darkTheme ? Icons.WhiteMapPin : Icons.DarkMapPin}
            width={72}
            height={72}
            alt=""
          />
        )}

        <h1>{name}</h1>
      </div>
      <div className="info">
        <h3>
          {episode ? (
            <>
              <Image
                src={
                  darkTheme ? Icons.WhiteCalendarBlank : Icons.DarkCalendarBlank
                }
                width={32}
                height={32}
                alt=""
              />
              {air_date}
            </>
          ) : type === "Planet" ? (
            <>
              <Image
                src={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
                width={32}
                height={32}
                alt=""
              />
              {type}
            </>
          ) : (
            <>
              <Image
                src={darkTheme ? Icons.WhiteMapPin : Icons.DarkMapPin}
                width={32}
                height={32}
                alt=""
              />
              {type}
            </>
          )}
        </h3>
        <h3>
          {episode ? (
            <>
              <Image
                src={darkTheme ? Icons.WhiteQueue : Icons.DarkQueue}
                width={32}
                height={32}
                alt=""
              />
              {episode}
            </>
          ) : (
            <>
              <Image
                src={darkTheme ? Icons.WhiteCubeFocus : Icons.DarkCubeFocus}
                width={32}
                height={32}
                alt=""
              />
              {dimension === "unknown" ? "Dimensão desconhecida" : dimension}
            </>
          )}
        </h3>
      </div>
      <div className="characters">
        <h3>
          {episode ? (
            <>
              <Image
                src={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
                width={32}
                height={32}
                alt=""
              />
              {characters?.length} Personagens participaram deste episódio
            </>
          ) : (
            <>
              <Image
                src={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
                width={32}
                height={32}
                alt=""
              />
              {residents?.length} Personagens estão localizados aqui
            </>
          )}
        </h3>
      </div>
    </Container>
  );
};

export default Hero;
