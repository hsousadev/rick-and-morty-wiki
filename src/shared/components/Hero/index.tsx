import Image from "next/image";
import styled from "styled-components";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";

type HeroProps = {
  id: number;
  name: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  type?: string;
  dimension?: string;
  residents?: string[];
};

const Container = styled.div`
  margin-top: 16px;
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  padding: 16px 24px 40px;

  .headline {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .info,
  .characters {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: 720px) {
    .headline {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default function Hero({
  name,
  episode,
  air_date,
  characters,
  type,
  dimension,
  residents,
}: HeroProps) {
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const isEpisode = Boolean(episode);

  return (
    <Container>
      <div className="headline">
        <Image
          src={
            isEpisode
              ? darkTheme
                ? Icons.WhiteMonitorPlay
                : Icons.DarkMonitorPlay
              : type === "Planet"
                ? darkTheme
                  ? Icons.WhitePlanet
                  : Icons.DarkPlanet
                : darkTheme
                  ? Icons.WhiteMapPin
                  : Icons.DarkMapPin
          }
          width={64}
          height={64}
          alt=""
        />
        <h1>{name}</h1>
      </div>
      <div className="info">
        <h3>
          <Image
            src={
              isEpisode
                ? darkTheme
                  ? Icons.WhiteCalendarBlank
                  : Icons.DarkCalendarBlank
                : type === "Planet"
                  ? darkTheme
                    ? Icons.WhitePlanet
                    : Icons.DarkPlanet
                  : darkTheme
                    ? Icons.WhiteMapPin
                    : Icons.DarkMapPin
            }
            width={28}
            height={28}
            alt=""
          />
          {isEpisode ? air_date : type === "unknown" ? t.hero.unknownType : type}
        </h3>
        <h3>
          <Image
            src={
              isEpisode
                ? darkTheme
                  ? Icons.WhiteQueue
                  : Icons.DarkQueue
                : darkTheme
                  ? Icons.WhiteCubeFocus
                  : Icons.DarkCubeFocus
            }
            width={28}
            height={28}
            alt=""
          />
          {isEpisode
            ? episode
            : dimension === "unknown"
              ? t.hero.unknownDimension
              : dimension}
        </h3>
      </div>
      <div className="characters">
        <h3>
          <Image
            src={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
            width={28}
            height={28}
            alt=""
          />
          {isEpisode
            ? t.hero.charactersInEpisode.replace("{n}", String(characters?.length ?? 0))
            : t.hero.charactersInLocation.replace("{n}", String(residents?.length ?? 0))}
        </h3>
      </div>
    </Container>
  );
}
