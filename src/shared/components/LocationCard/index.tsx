import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { Icons } from "./icons";
import type { LocationCardProps } from "@/shared/types/locationCardProps";
import DefaultButton from "../DefaultButton";
import { useTheme } from "@/shared/context/ThemeContext";
import { useFavorites } from "@/shared/context/FavoritesContext";
import { useI18n } from "@/i18n/LocaleContext";
import { sticker } from "@/shared/styles/mixins";
import { usePrefetch } from "@/shared/utils/usePrefetch";

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > img {
    margin-bottom: -18px;
    z-index: 2;
  }
`;

const Content = styled.div`
  ${sticker}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 12px 16px;
  width: 100%;
  min-height: 210px;
  text-align: center;
  gap: 8px;

  h4 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .type {
    color: var(--PORTAL-CYAN);
    font-size: 13px;
  }

  .actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
`;

export default function LocationCard({ id, type, name }: LocationCardProps) {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { locale, t } = useI18n();
  const { isLocationFavorited, toggleLocation } = useFavorites();
  const isCharacterScreen = router.pathname.startsWith("/character");
  const favorited = isLocationFavorited(id);
  const href = id ? `/location/${id}` : undefined;
  const prefetch = usePrefetch(href);

  if (!name) return null;

  return (
    <Container {...prefetch}>
      <Image
        src={
          type === "Planet"
            ? darkTheme
              ? Icons.WhitePlanet
              : Icons.DarkPlanet
            : darkTheme
              ? Icons.WhiteMapPin
              : Icons.DarkMapPin
        }
        width={48}
        height={48}
        alt=""
      />
      <Content>
        <h4 className="type">{type === "unknown" ? (locale === "en" ? "Unknown" : "Desconhecido") : type}</h4>
        <h4>{name}</h4>
        <div className="actions">
          <DefaultButton
            icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
            text={t.card.more}
            onClick={() => href && router.push(href)}
          />
          {!isCharacterScreen && (
            <button
              type="button"
              aria-label={favorited ? t.card.unfavorite : t.card.favorite}
              onClick={() => toggleLocation({ id, type, name })}
            >
              <Image
                src={favorited ? Icons.BlueHeart : Icons.BlueHeartOutline}
                width={28}
                height={28}
                alt=""
              />
            </button>
          )}
        </div>
      </Content>
    </Container>
  );
}
