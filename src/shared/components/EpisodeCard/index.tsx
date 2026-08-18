import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import DefaultButton from "../DefaultButton";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useFavorites } from "@/shared/context/FavoritesContext";
import { useI18n } from "@/i18n/LocaleContext";
import { sticker } from "@/shared/styles/mixins";
import { usePrefetch } from "@/shared/utils/usePrefetch";

export interface EpisodeCardProps {
  id?: number;
  name: string;
  episode: string;
}

const Container = styled.article`
  ${sticker}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  min-height: 160px;
  gap: 16px;

  .title {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    h4 {
      font-family: var(--FONT-DISPLAY);
      line-height: 1.2;
    }
  }

  .code {
    color: var(--PORTAL-CYAN);
    font-size: 13px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
`;

export default function EpisodeCard({ id, name, episode }: EpisodeCardProps) {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const { isEpisodeFavorited, toggleEpisode } = useFavorites();
  const favorited = isEpisodeFavorited(id);
  const href = id ? `/episode/${id}` : undefined;
  const prefetch = usePrefetch(href);

  return (
    <Container {...prefetch}>
      <div className="title">
        <Image
          width={24}
          height={24}
          src={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
          alt=""
        />
        <div>
          <h4>{name}</h4>
          <p className="code">{episode}</p>
        </div>
      </div>
      <div className="actions">
        <DefaultButton
          icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
          text={t.card.more}
          onClick={() => href && router.push(href)}
        />
        <button
          type="button"
          aria-label={favorited ? t.card.unfavorite : t.card.favorite}
          onClick={() => toggleEpisode({ id, name, episode })}
        >
          <Image
            width={32}
            height={32}
            src={favorited ? Icons.BlueHeart : Icons.BlueHeartOutline}
            alt=""
          />
        </button>
      </div>
    </Container>
  );
}
