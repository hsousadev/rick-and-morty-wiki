import { EpisodeProps } from "@/pages/episode/interfaces";
import {
  Heart,
  CalendarBlank,
  Queue,
  SmileyBlank,
  CubeFocus,
  MonitorPlay,
  Planet,
} from "@phosphor-icons/react";

import { Container } from "./styles";

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
  return (
    <Container>
      <div className="episode">
        {episode ? (
          <MonitorPlay size={72} color={`var(--FONT-COLOR)`} />
        ) : (
          <>
            <Planet size={72} color={`var(--FONT-COLOR)`} />
          </>
        )}

        <h1>
          {name} <Heart size={52} color={`var(--FONT-COLOR)`} />
        </h1>
      </div>
      <div className="info">
        <h3>
          {episode ? (
            <>
              <CalendarBlank color={`var(--FONT-COLOR)`} size={32} />
              {air_date}
            </>
          ) : (
            <>
              <Planet color={`var(--FONT-COLOR)`} size={32} />
              {type}
            </>
          )}
        </h3>
        <h3>
          {episode ? (
            <>
              <Queue color={`var(--FONT-COLOR)`} size={32} />
              {episode}
            </>
          ) : (
            <>
              <CubeFocus color={`var(--FONT-COLOR)`} size={32} />{" "}
              {dimension === "unknown" ? "Dimensão desconhecida" : dimension}
            </>
          )}
        </h3>
      </div>
      <div className="characters">
        <h3>
          {episode ? (
            <>
              <SmileyBlank size={32} /> {characters?.length} Personagens
              participaram deste episódio
            </>
          ) : (
            <>
              <SmileyBlank size={32} /> {residents?.length} Personagens estão
              localizados aqui
            </>
          )}
        </h3>
      </div>
    </Container>
  );
};

export default Hero;
