import Image from "next/image";
import { useRouter } from "next/router";

import DefaultButton from "../DefaultButton";
import { favoritesEpisodesToSet } from "@/pages/favorites/index.page";

import { Container } from "./styles";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/pages/_app.page";
import { Icons } from "./icons";

export interface EpisodeCardProps {
  id?: number;
  name: string;
  episode: string;
}

const EpisodeCard = ({ id, name, episode }: EpisodeCardProps) => {
  const router = useRouter();
  const { darkTheme } = useContext(GlobalContext);

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
        <Image
          width={24}
          height={24}
          src={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
          alt=""
        />
        <h4>
          {name} {episode}
        </h4>
      </div>
      <div>
        <DefaultButton
          icon={darkTheme ? Icons.WhiteInfo : Icons.DarkInfo}
          text="Saiba mais"
          onClick={() => router.push(`/episode/${id}`)}
        />

        {!isFavorited ? (
          <button>
            <Image width={32} height={32} src={Icons.BlueHeartOutline} alt="" onClick={() => handleFavorite()} />
          </button>
        ) : (
          <h4 style={{ textAlign: "end", color: `var(--BLUE-A)` }}>
            <Image width={16} height={16} src={Icons.BlueHeart} alt="" />
            Item <br /> favoritado{" "}
          </h4>
        )}
      </div>
    </Container>
  );
};

export default EpisodeCard;
