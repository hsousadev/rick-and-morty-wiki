import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Character } from "@/shared/types/api";
import type { Location } from "@/shared/types/api";
import { Icons } from "./icons";
import LocationCard from "@/shared/components/LocationCard";
import { useTheme } from "@/shared/context/ThemeContext";
import { useFavorites } from "@/shared/context/FavoritesContext";
import { useI18n } from "@/i18n/LocaleContext";
import { fetchByUrl } from "@/shared/services/rickAndMorty";
import { BLUR_DATA_URL } from "@/shared/utils/image";
import BlueHeart from "@/shared/assets/icons/BlueHeart.svg";
import BlueHeartOutline from "@/shared/assets/icons/BlueHeartOutline.svg";
import {
  genderLabel,
  speciesLabel,
  statusLabel,
  statusTone,
} from "@/shared/utils/labels";

type CharacterHeroProps = Character & {
  originLocation?: Location | null;
  currentLocation?: Location | null;
};

const Container = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 48px;
  padding: 16px 24px 40px;

  .portal-frame {
    flex-shrink: 0;
    padding: 10px;
    border-radius: 40px;
    background: conic-gradient(
      from 180deg,
      var(--PORTAL-CYAN),
      var(--PORTAL-LIME),
      var(--CHAOS-PINK),
      var(--PORTAL-CYAN)
    );
    box-shadow: 8px 8px 0 var(--INK);
  }

  .portal-frame img {
    display: block;
    border-radius: 28px;
    border: 3px solid var(--INK);
    object-fit: cover;
  }

  .character-info {
    width: 100%;
  }

  h1 {
    margin-bottom: 16px;
  }

  .headline {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .meta,
  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin: 16px 0 28px;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 500px) {
    .portal-frame,
    .portal-frame img {
      width: 100%;
    }
  }
`;

export default function CharacterHero({
  id,
  name,
  status,
  species,
  gender,
  origin,
  location,
  image,
  episode,
  originLocation,
  currentLocation,
}: CharacterHeroProps) {
  const { darkTheme } = useTheme();
  const { locale, t } = useI18n();
  const { isCharacterFavorited, toggleCharacter } = useFavorites();
  const favorited = isCharacterFavorited(id);
  const [originCard, setOriginCard] = useState<Location | null>(originLocation ?? null);
  const [locationCard, setLocationCard] = useState<Location | null>(
    currentLocation ?? null
  );
  const tone = statusTone(status);

  useEffect(() => {
    if (originLocation) {
      setOriginCard(originLocation);
      return;
    }

    fetchByUrl<Location>(origin?.url).then((data) => {
      if (data) setOriginCard(data);
    });
  }, [origin?.url, originLocation]);

  useEffect(() => {
    if (currentLocation) {
      setLocationCard(currentLocation);
      return;
    }

    fetchByUrl<Location>(location?.url).then((data) => {
      if (data) setLocationCard(data);
    });
  }, [location?.url, currentLocation]);

  const samePlace = originCard?.name && originCard.name === locationCard?.name;

  return (
    <Container>
      <div className="portal-frame">
        <Image
          src={image}
          width={320}
          height={400}
          alt={name}
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="character-info">
        <div className="headline">
          <h1>{name}</h1>
          <button
            type="button"
            aria-label={favorited ? t.card.unfavorite : t.card.favorite}
            onClick={() =>
              toggleCharacter({
                id,
                image,
                name,
                status,
                species,
                origin: origin?.name ?? "",
              })
            }
          >
            <Image
              width={40}
              height={40}
              src={favorited ? BlueHeart : BlueHeartOutline}
              alt=""
            />
          </button>
        </div>
        <div className="meta">
          <h3>
            <Image
              src={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
              width={28}
              height={28}
              alt=""
            />
            {episode?.length === 1
              ? t.hero.episodesOne
              : t.hero.episodesMany.replace("{n}", String(episode?.length ?? 0))}
          </h3>
        </div>
        <div className="details">
          <h3>
            <Image
              src={
                tone === "alive"
                  ? Icons.Pulse
                  : tone === "dead"
                    ? Icons.Skull
                    : darkTheme
                      ? Icons.WhiteQuestion
                      : Icons.DarkQuestion
              }
              width={28}
              height={28}
              alt=""
            />
            {statusLabel(status, gender, locale)}
          </h3>
          <h3>
            <Image
              src={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
              width={28}
              height={28}
              alt=""
            />
            {speciesLabel(species, locale)}
          </h3>
          <h3>
            <Image
              src={darkTheme ? Icons.WhiteGenderIntersex : Icons.DarkGenderIntersex}
              width={28}
              height={28}
              alt=""
            />
            {genderLabel(gender, locale)}
          </h3>
        </div>
        <div className="cards">
          {originCard ? (
            <LocationCard id={originCard.id} name={originCard.name} type={originCard.type} />
          ) : null}
          {!samePlace && locationCard ? (
            <LocationCard
              id={locationCard.id}
              name={locationCard.name}
              type={locationCard.type}
            />
          ) : null}
        </div>
      </div>
    </Container>
  );
}
