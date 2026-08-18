import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import DefaultButton from "../DefaultButton";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useFavorites } from "@/shared/context/FavoritesContext";
import { useI18n } from "@/i18n/LocaleContext";
import { sticker } from "@/shared/styles/mixins";
import { BLUR_DATA_URL } from "@/shared/utils/image";
import { usePrefetch } from "@/shared/utils/usePrefetch";
import {
  originLabel,
  speciesLabel,
  statusLabel,
  statusTone,
} from "@/shared/utils/labels";

export interface CharacterCardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  origin: string;
}

const Container = styled.article`
  ${sticker}
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;

  .portal-frame {
    position: relative;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 28px;
    background: conic-gradient(
      from 90deg,
      var(--PORTAL-CYAN),
      var(--PORTAL-LIME),
      var(--CHAOS-PINK),
      var(--PORTAL-CYAN)
    );
  }

  .portal-frame img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 20px;
    border: 3px solid var(--INK);
    display: block;
  }

  .character-info {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-bottom: 12px;
  }

  .info {
    min-width: 0;

    .name {
      font-family: var(--FONT-DISPLAY);
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border: 2px solid var(--INK);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
  }

  .badge.alive {
    background: var(--ALIVE);
    color: #06101c;
  }
  .badge.dead {
    background: var(--DEAD);
    color: #fff;
  }
  .badge.unknown {
    background: var(--UNKNOWN);
    color: #fff;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: auto;
  }
`;

export default function CharacterCard({
  id,
  image,
  name,
  status,
  species,
  origin,
}: CharacterCardProps) {
  const { darkTheme } = useTheme();
  const { locale, t } = useI18n();
  const { isCharacterFavorited, toggleCharacter } = useFavorites();
  const favorited = isCharacterFavorited(id);
  const tone = statusTone(status);
  const href = `/character/${id}`;
  const prefetch = usePrefetch(href);

  return (
    <Container {...prefetch}>
      <div className="portal-frame">
        <Image
          src={image}
          alt={name}
          width={280}
          height={220}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="character-info">
        <div className="info">
          <p className="name">{name}</p>
          <div>
            <span className={`badge ${tone}`}>
              <Image
                width={14}
                height={14}
                src={tone === "alive" ? Icons.DarkPulse : tone === "dead" ? Icons.WhiteSkull : darkTheme ? Icons.WhiteQuestion : Icons.DarkQuestion}
                alt=""
              />
              {statusLabel(status, undefined, locale)}
            </span>
          </div>
          <div>
            <Image
              width={16}
              height={16}
              src={darkTheme ? Icons.WhiteAlien : Icons.DarkAlien}
              alt=""
            />
            <p>{speciesLabel(species, locale)}</p>
          </div>
          <div>
            <Image
              width={16}
              height={16}
              src={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
              alt=""
            />
            <p>{originLabel(origin, locale)}</p>
          </div>
        </div>
      </div>
      <div className="actions">
        <Link href={href} prefetch>
          <DefaultButton
            icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
            text={t.card.more}
          />
        </Link>
        <button
          type="button"
          aria-label={favorited ? t.card.unfavorite : t.card.favorite}
          onClick={() =>
            toggleCharacter({ id, image, name, status, species, origin })
          }
        >
          <Image
            width={36}
            height={36}
            src={favorited ? Icons.BlueHeart : Icons.BlueHeartOutline}
            alt=""
          />
        </button>
      </div>
    </Container>
  );
}
