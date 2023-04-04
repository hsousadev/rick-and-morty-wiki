import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Hero from "./components/Hero";
import TitleSection from "@/shared/components/TitleSection";
import Filter from "@/shared/components/Filter";

import CharacterCard from "@/shared/components/CharacterCard";
import { CharacterCardProps } from "@/shared/types/characterCardProps";

import EpisodeCard from "@/shared/components/EpisodeCard";
import { EpisodeCardProps } from "@/shared/types/episodeCardProps";

import LocationCard from "@/shared/components/LocationCard";
import { LocationCardProps } from "@/shared/types/locationCardProps";

import DefaultButton from "@/shared/components/DefaultButton";
import { GlobalContext } from "../_app.page";

import { Icons } from "./icons";

export let favoritesCharactersToSet: any = [];
export const favoritesEpisodesToSet: any = [];
export const favoritesLocationsToSet: any = [];

import { Container, Content, HeroContent } from "./styles";

const Favorites = () => {
  const router = useRouter();
  const { darkTheme } = useContext(GlobalContext);

  const [storedCharacters, setStoredCharacters] = useState([]);
  const [storedEpisodes, setStoredEpisodes] = useState([]);
  const [storedLocations, setStoredLocations] = useState([]);

  const [newStoredCharacters, setNewStoredCharacters] = useState(false);

  function handleGetStoredCharacters() {
    const storageFavoritesCharacters: any =
      localStorage.getItem("favoriteCharacters");

    const storedFavoriteCharacters = JSON.parse(storageFavoritesCharacters);

    setStoredCharacters(storedFavoriteCharacters);
    setNewStoredCharacters(false);
  }

  function handleGetStoredEpisodes() {
    const storageFavoritesEpisodes: any =
      localStorage.getItem("favoriteEpisodes");

    const storedFavoriteEpisodes = JSON.parse(storageFavoritesEpisodes);

    setStoredEpisodes(storedFavoriteEpisodes);
  }

  function handleGetStoredLocation() {
    const storageFavoritesLocations: any =
      localStorage.getItem("favoriteLocation");

    const storedFavoriteLocation = JSON.parse(storageFavoritesLocations);

    setStoredLocations(storedFavoriteLocation);
  }

  function handleDeleteFavoriteCharacters() {
    localStorage.removeItem("favoriteCharacters");
    window.location.reload();
  }

  function handleDeleteFavoriteEpisodes() {
    localStorage.removeItem("favoriteEpisodes");
    window.location.reload();
  }

  function handleDeleteFavoriteLocations() {
    localStorage.removeItem("favoriteLocation");
    window.location.reload();
  }

  useEffect(() => {
    handleGetStoredCharacters();
    handleGetStoredEpisodes();
    handleGetStoredLocation();
  }, []);

  useEffect(() => {
    handleGetStoredCharacters();
  }, [newStoredCharacters]);

  return (
    <Container>
      <HeroContent>
        <Hero />
      </HeroContent>
      <Content>
        <div className="filter">
          <Filter />
        </div>

        {storedCharacters?.length > 0 ? (
          <>
            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/character/1")}
                id="characters"
                title="Personagens"
              />
              <DefaultButton
                icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                text="Deletar personagens"
                onClick={() => handleDeleteFavoriteCharacters()}
                color={`var(--RED)`}
              />
            </div>

            <div className="characters">
              {storedCharacters?.map((character: CharacterCardProps) => (
                <CharacterCard
                  id={character?.id}
                  key={character?.id}
                  image={character?.image}
                  name={character?.name}
                  status={character?.status}
                  species={character?.species}
                  origin={character?.origin}
                />
              ))}
            </div>
          </>
        ) : (
          <TitleSection
            onClick={() => router.push("/character/1")}
            id="characters"
            title="Personagens"
            isSearching
          />
        )}

        {storedEpisodes?.length > 0 ? (
          <>
            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/episode/1")}
                id="episodes"
                title="Episódios"
              />
              <DefaultButton
                icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                text="Deletar episódios"
                onClick={() => handleDeleteFavoriteEpisodes()}
                color={`var(--RED)`}
              />
            </div>

            <div className="episodes">
              {storedEpisodes?.map((episode: EpisodeCardProps) => (
                <EpisodeCard
                  id={episode?.id}
                  key={episode?.id}
                  name={episode?.name}
                  episode={episode?.episode}
                />
              ))}
            </div>
          </>
        ) : (
          <TitleSection
            id="episodes"
            title="Episódios"
            isSearching
            onClick={() => router.push("/episode/1")}
          />
        )}

        {storedLocations?.length > 0 ? (
          <>
            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/location/1")}
                id="locations"
                title="Localizações"
              />
              <DefaultButton
                icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                text="Deletar localizações"
                onClick={() => handleDeleteFavoriteLocations()}
                color={`var(--RED)`}
              />
            </div>

            <div className="locations">
              {storedLocations?.map((location: LocationCardProps) => (
                <LocationCard
                  id={location.id}
                  key={location.id}
                  type={location?.type}
                  name={location?.name}
                />
              ))}
            </div>
          </>
        ) : (
          <TitleSection
            id="locations"
            title="Localizações"
            onClick={() => router.push("/location/1")}
            isSearching
          />
        )}
      </Content>
    </Container>
  );
};

export default Favorites;
