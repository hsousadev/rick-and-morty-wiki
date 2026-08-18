import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Hero from "./components/Hero";
import TitleSection from "@/shared/components/TitleSection";
import Filter from "@/shared/components/Filter";
import CharacterCard from "@/shared/components/CharacterCard";
import EpisodeCard from "@/shared/components/EpisodeCard";
import LocationCard from "@/shared/components/LocationCard";
import DefaultButton from "@/shared/components/DefaultButton";
import EmptyState from "@/shared/components/EmptyState";
import Seo from "@/shared/components/Seo";
import Carousel from "@/shared/components/Carousel";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useFavorites } from "@/shared/context/FavoritesContext";
import { useToast } from "@/shared/context/ToastContext";
import { useI18n } from "@/i18n/LocaleContext";
import { Icons } from "./icons";
import { carouselOnMobile } from "@/shared/styles/mixins";
import { parseCapsule, serializeCapsule } from "@/shared/utils/catalog";
import {
  getCharactersByIds,
  getEpisodesByIds,
  getLocationsByIds,
} from "@/shared/services/rickAndMorty";
import type { Character } from "@/shared/types/api";
import type { CharacterCardProps } from "@/shared/types/characterCardProps";
import type { EpisodeCardProps } from "@/shared/types/episodeCardProps";
import type { LocationCardProps } from "@/shared/types/locationCardProps";
import WhiteLinkBreak from "@/shared/assets/icons/WhiteLinkBreak.svg";
import DarkLinkBreak from "@/shared/assets/icons/DarkLinkBreak.svg";
import WhiteHeart from "@/shared/assets/icons/WhiteHeart.svg";
import DarkHeart from "@/shared/assets/icons/DarkHeart.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 24px 80px;

  .filter {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 12px;
    flex-wrap: wrap;
  }

  .banner {
    width: 100%;
    margin: 16px 0;
    padding: 14px 18px;
    border: 3px solid var(--INK);
    border-radius: 18px;
    background: color-mix(in srgb, var(--PORTAL-CYAN) 18%, var(--CARD-BACKGROUND));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .section-and-delete {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
    flex-wrap: wrap;
  }

  .characters,
  .episodes,
  .locations {
    display: grid;
    width: 100%;
    margin-top: 24px;
    gap: 24px;
  }

  .characters {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    ${carouselOnMobile("min(78vw, 280px)")}
  }
  .episodes {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    ${carouselOnMobile("min(72vw, 240px)")}
  }
  .locations {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    ${carouselOnMobile("min(48vw, 180px)")}
  }

  @media (max-width: 700px) {
    .filter,
    .section-and-delete {
      justify-content: center;
    }
  }
`;

const HeroContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 3px solid var(--INK);
  background: var(--HERO-BAND);
`;

function toCharacterCard(item: Character): CharacterCardProps {
  return {
    id: item.id,
    image: item.image,
    name: item.name,
    status: item.status,
    species: item.species,
    origin: item.origin?.name ?? "",
  };
}

function mergeCards<T extends { id?: number }>(local: T[], shared: T[]) {
  const ids = new Set(local.map((item) => item.id));
  return [...local, ...shared.filter((item) => item.id && !ids.has(item.id))];
}

export default function Favorites() {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const { toast } = useToast();
  const {
    characters,
    episodes,
    locations,
    clearCharacters,
    clearEpisodes,
    clearLocations,
    importCapsule,
  } = useFavorites();

  const capsule = useMemo(
    () =>
      parseCapsule({
        c: router.query.c as string | string[] | undefined,
        e: router.query.e as string | string[] | undefined,
        l: router.query.l as string | string[] | undefined,
      }),
    [router.query.c, router.query.e, router.query.l]
  );

  const hasShared = capsule.c.length + capsule.e.length + capsule.l.length > 0;
  const [loadingShared, setLoadingShared] = useState(false);
  const [sharedCharacters, setSharedCharacters] = useState<CharacterCardProps[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<EpisodeCardProps[]>([]);
  const [sharedLocations, setSharedLocations] = useState<LocationCardProps[]>([]);

  useEffect(() => {
    if (!router.isReady || !hasShared) {
      setSharedCharacters([]);
      setSharedEpisodes([]);
      setSharedLocations([]);
      return;
    }

    let cancelled = false;

    async function loadShared() {
      setLoadingShared(true);
      const [chars, eps, locs] = await Promise.all([
        getCharactersByIds(capsule.c),
        getEpisodesByIds(capsule.e),
        getLocationsByIds(capsule.l),
      ]);
      if (cancelled) return;
      setSharedCharacters(chars.map(toCharacterCard));
      setSharedEpisodes(eps.map((item) => ({ id: item.id, name: item.name, episode: item.episode })));
      setSharedLocations(locs.map((item) => ({ id: item.id, name: item.name, type: item.type })));
      setLoadingShared(false);
    }

    loadShared();
    return () => {
      cancelled = true;
    };
  }, [capsule.c, capsule.e, capsule.l, hasShared, router.isReady]);

  const displayCharacters = mergeCards(characters, sharedCharacters);
  const displayEpisodes = mergeCards(episodes, sharedEpisodes);
  const displayLocations = mergeCards(locations, sharedLocations);
  const isEmpty =
    displayCharacters.length === 0 &&
    displayEpisodes.length === 0 &&
    displayLocations.length === 0;

  async function shareCapsule() {
    const query = serializeCapsule({
      c: characters.map((item) => item.id),
      e: episodes.map((item) => item.id).filter((id): id is number => typeof id === "number"),
      l: locations.map((item) => item.id).filter((id): id is number => typeof id === "number"),
    });
    const source = hasShared ? serializeCapsule(capsule) : query;
    const url = `${window.location.origin}/favorites?${new URLSearchParams(source).toString()}`;
    await navigator.clipboard.writeText(url);
    toast({ tone: "success", title: t.toast.copied, message: t.toast.copiedMsg });
  }

  return (
    <Container>
      <Seo title={t.favorites.title} description={t.seo.favorites} />
      <HeroContent>
        <Hero />
      </HeroContent>
      <Content>
        <div className="filter">
          <DefaultButton
            icon={darkTheme ? WhiteLinkBreak : DarkLinkBreak}
            text={t.favorites.share}
            onClick={shareCapsule}
          />
          <Filter />
        </div>

        {hasShared ? (
          <div className="banner">
            <p>{t.favorites.sharedBanner}</p>
            <DefaultButton
              icon={darkTheme ? WhiteHeart : DarkHeart}
              text={t.favorites.import}
              onClick={() =>
                importCapsule({
                  characters: sharedCharacters,
                  episodes: sharedEpisodes,
                  locations: sharedLocations,
                })
              }
            />
          </div>
        ) : null}

        {loadingShared ? (
          <CatalogSkeletons count={4} />
        ) : isEmpty ? (
          <EmptyState title={t.empty.favorites} description={t.empty.favoritesHint} />
        ) : (
          <>
            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/character/1")}
                id="characters"
                title={t.sections.characters}
              />
              {characters.length > 0 ? (
                <DefaultButton
                  icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                  text={t.favorites.clearCharacters}
                  tone="danger"
                  onClick={clearCharacters}
                />
              ) : null}
            </div>
            {displayCharacters.length > 0 ? (
              <Carousel className="characters" label={t.a11y.carousel}>
                {displayCharacters.map((character) => (
                  <CharacterCard
                    id={character.id}
                    key={character.id}
                    image={character.image}
                    name={character.name}
                    status={character.status}
                    species={character.species}
                    origin={character.origin}
                  />
                ))}
              </Carousel>
            ) : (
              <EmptyState title={t.empty.noFavCharacters} />
            )}

            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/episode/1")}
                id="episodes"
                title={t.sections.episodes}
              />
              {episodes.length > 0 ? (
                <DefaultButton
                  icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                  text={t.favorites.clearEpisodes}
                  tone="danger"
                  onClick={clearEpisodes}
                />
              ) : null}
            </div>
            {displayEpisodes.length > 0 ? (
              <Carousel className="episodes" label={t.a11y.carousel}>
                {displayEpisodes.map((episode) => (
                  <EpisodeCard
                    id={episode.id}
                    key={episode.id ?? episode.name}
                    name={episode.name}
                    episode={episode.episode}
                  />
                ))}
              </Carousel>
            ) : (
              <EmptyState title={t.empty.noFavEpisodes} />
            )}

            <div className="section-and-delete">
              <TitleSection
                onClick={() => router.push("/location/1")}
                id="locations"
                title={t.sections.locations}
              />
              {locations.length > 0 ? (
                <DefaultButton
                  icon={darkTheme ? Icons.WhiteXCircle : Icons.DarkXCircle}
                  text={t.favorites.clearLocations}
                  tone="danger"
                  onClick={clearLocations}
                />
              ) : null}
            </div>
            {displayLocations.length > 0 ? (
              <Carousel className="locations" label={t.a11y.carousel}>
                {displayLocations.map((location) => (
                  <LocationCard
                    id={location.id}
                    key={location.id ?? location.name}
                    type={location.type}
                    name={location.name}
                  />
                ))}
              </Carousel>
            ) : (
              <EmptyState title={t.empty.noFavLocations} />
            )}
          </>
        )}
      </Content>
    </Container>
  );
}
