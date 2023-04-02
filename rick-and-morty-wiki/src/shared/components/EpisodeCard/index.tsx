import { useRouter } from "next/router";

import { MonitorPlay, Info, Heart } from "@phosphor-icons/react";

import DefaultButton from "../DefaultButton";
import { favoritesEpisodesToSet } from "@/pages/favorites";

import { Container } from "./styles";
import { useEffect, useState } from "react";

export interface EpisodeCardProps {
  id?: number;
  name: string;
  episode: string;
}

const EpisodeCard = ({ id, name, episode }: EpisodeCardProps) => {
  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(false);

  const episodeCard = {
    id: id,
    name: name,
    episode: episode,
  };

  function handleFavorite() {
    setIsFavorited(true);

    const storageFavoritesEpisodes: any =
      localStorage.getItem("favoriteEpisodes");

    const storedFavoriteEpisodes = JSON.parse(storageFavoritesEpisodes);

    if (storedFavoriteEpisodes) {
      storedFavoriteEpisodes.push(episodeCard);

      localStorage.setItem(
        "favoriteEpisodes",
        JSON.stringify(storedFavoriteEpisodes)
      );
    } else {
      favoritesEpisodesToSet.push(episodeCard);

      localStorage.setItem(
        "favoriteEpisodes",
        JSON.stringify(favoritesEpisodesToSet)
      );
    }
  }

  function handleFavoriteEpisodesExists(card: any, list: any) {
    var i;
    for (i = 0; i < list?.length; i++) {
      if (list[i]?.id === card.id) {
        setIsFavorited(true);
      }
    }
  }

  useEffect(() => {
    const storageFavoritesEpisodes: any =
      localStorage.getItem("favoriteEpisodes");
    const storedFavoriteEpisodes = JSON.parse(storageFavoritesEpisodes);

    handleFavoriteEpisodesExists(episodeCard, storedFavoriteEpisodes);
  }, []);

  return (
    <Container>
      <div>
        <MonitorPlay size={24} color={`var(--FONT-COLOR)`} />
        <h4>
          {name} {episode}
        </h4>
      </div>
      <div>
        <DefaultButton
          icon={<Info size={24} color={`var(--FONT-COLOR)`} />}
          text="Saiba mais"
          onClick={() => router.push(`/episode/${id}`)}
        />

        {!isFavorited ? (
          <button>
            <Heart
              size={32}
              color={`var(--FONT-COLOR)`}
              onClick={() => handleFavorite()}
            />
          </button>
        ) : (
          <h4 style={{ textAlign: "end", color: `var(--BLUE-A)` }}>
            <Heart color={`var(--BLUE-A)`} size={16} weight="fill" /> Item{" "}
            <br /> favoritado{" "}
          </h4>
        )}
      </div>
    </Container>
  );
};

export default EpisodeCard;
