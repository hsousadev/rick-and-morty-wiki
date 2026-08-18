import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Hero from "./components/Hero";
import Search, { type SearchSuggestion } from "./components/Search";
import Filter from "@/shared/components/Filter";
import TitleSection from "@/shared/components/TitleSection";
import CharacterCard from "@/shared/components/CharacterCard";
import EpisodeCard from "@/shared/components/EpisodeCard";
import LocationCard from "@/shared/components/LocationCard";
import Paginate from "@/shared/components/Paginate";
import EmptyState from "@/shared/components/EmptyState";
import Seo from "@/shared/components/Seo";
import Carousel from "@/shared/components/Carousel";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import { CatalogSkeletons } from "@/shared/components/Skeletons";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import HomeContext from "./context";
import { Container, HeroContent, Content } from "./styles";
import { type Character, type Episode, type Location, type Paged } from "@/shared/types/api";
import { getCharacters, getEpisodes, getLocations } from "@/shared/services/rickAndMorty";
import { useDebouncedValue } from "@/shared/utils/useDebouncedValue";
import smoothScroll from "@/shared/utils/smoothScroll";

function pageFromQuery(value: string | string[] | undefined) {
  const parsed = Number(typeof value === "string" ? value : 1);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function compactQuery(next: Record<string, string | undefined>) {
  const query: Record<string, string> = {};
  Object.entries(next).forEach(([key, value]) => {
    if (!value) return;
    if ((key === "cpage" || key === "epage" || key === "lpage") && value === "1") return;
    query[key] = value;
  });
  return query;
}

export default function Home() {
  const router = useRouter();
  const { darkTheme } = useTheme();
  const { t } = useI18n();
  const { characterList, episodeList, locationList } = useContext(HomeContext);

  const querySearch = typeof router.query.q === "string" ? router.query.q : "";
  const cpage = pageFromQuery(router.query.cpage);
  const epage = pageFromQuery(router.query.epage);
  const lpage = pageFromQuery(router.query.lpage);

  const [searchInput, setSearchInput] = useState(querySearch);
  const [isSearching, setIsSearching] = useState(Boolean(querySearch));
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchDirty = useRef(false);

  const [characterData, setCharacterData] = useState<Paged<Character>>(characterList);
  const [episodeData, setEpisodeData] = useState<Paged<Episode>>(episodeList);
  const [locationData, setLocationData] = useState<Paged<Location>>(locationList);

  const debouncedInput = useDebouncedValue(searchInput, 400);
  const suggestionQuery = useDebouncedValue(searchInput.trim(), 280);

  useEffect(() => {
    searchDirty.current = false;
    setSearchInput(querySearch);
  }, [querySearch]);

  useEffect(() => {
    if (!router.isReady || !searchDirty.current) return;
    const next = debouncedInput.trim();
    if (next === querySearch) return;

    router.replace(
      { pathname: "/", query: compactQuery({ q: next || undefined }) },
      undefined,
      { shallow: true, scroll: false }
    );
  }, [debouncedInput, querySearch, router]);

  useEffect(() => {
    if (!router.isReady) return;

    const name = querySearch.trim();
    setIsSearching(Boolean(name));
    setFailed(false);

    if (!name && cpage === 1 && epage === 1 && lpage === 1) {
      setCharacterData(characterList);
      setEpisodeData(episodeList);
      setLocationData(locationList);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [characters, episodes, locations] = await Promise.all([
          getCharacters({ name: name || undefined, page: cpage }),
          getEpisodes({ name: name || undefined, page: epage }),
          getLocations({ name: name || undefined, page: lpage }),
        ]);
        if (cancelled) return;
        setCharacterData(characters);
        setEpisodeData(episodes);
        setLocationData(locations);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [
    querySearch,
    cpage,
    epage,
    lpage,
    router.isReady,
    characterList,
    episodeList,
    locationList,
  ]);

  useEffect(() => {
    if (suggestionQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;

    async function loadSuggestions() {
      const [characters, episodes, locations] = await Promise.all([
        getCharacters({ name: suggestionQuery, page: 1 }),
        getEpisodes({ name: suggestionQuery, page: 1 }),
        getLocations({ name: suggestionQuery, page: 1 }),
      ]);
      if (cancelled) return;

      const next: SearchSuggestion[] = [
        ...characters.results.slice(0, 4).map((item) => ({
          href: `/character/${item.id}`,
          label: item.name,
          meta: t.sections.characters,
        })),
        ...episodes.results.slice(0, 3).map((item) => ({
          href: `/episode/${item.id}`,
          label: item.name,
          meta: item.episode,
        })),
        ...locations.results.slice(0, 3).map((item) => ({
          href: `/location/${item.id}`,
          label: item.name,
          meta: t.sections.locations,
        })),
      ];
      setSuggestions(next);
    }

    loadSuggestions();
    return () => {
      cancelled = true;
    };
  }, [suggestionQuery, t.sections.characters, t.sections.locations]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const inField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        Boolean(target?.isContentEditable);

      if (event.key === "/" && !inField) {
        event.preventDefault();
        document.getElementById("search")?.focus();
      }

      if (event.key === "Escape") {
        setSearchInput("");
        setSuggestions([]);
        if (querySearch || cpage > 1 || epage > 1 || lpage > 1) {
          router.push("/", undefined, { scroll: false });
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cpage, epage, lpage, querySearch, router]);

  function submitSearch() {
    const nextQuery = searchInput.trim();
    router.push(
      { pathname: "/", query: compactQuery({ q: nextQuery || undefined }) },
      undefined,
      { scroll: false }
    );
  }

  function updatePages(next: { cpage?: number; epage?: number; lpage?: number }) {
    router.replace(
      {
        pathname: "/",
        query: compactQuery({
          q: querySearch || undefined,
          cpage: String(next.cpage ?? cpage),
          epage: String(next.epage ?? epage),
          lpage: String(next.lpage ?? lpage),
        }),
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }

  const noResults =
    isSearching &&
    !loading &&
    characterData.results.length === 0 &&
    episodeData.results.length === 0 &&
    locationData.results.length === 0;

  const listError = useMemo(
    () => ({
      title: t.empty.error,
      description: t.empty.errorHint,
      retryLabel: t.empty.retry,
    }),
    [t]
  );

  return (
    <Container>
      <Seo title="Rick and Morty Wiki" description={t.seo.home} />
      <HeroContent $isDarkTheme={darkTheme}>
        <Hero />
      </HeroContent>
      <Content>
        <div className="search-and-filter">
          <Search
            value={searchInput}
            onChange={(value) => {
              searchDirty.current = true;
              setSearchInput(value);
            }}
            onSubmit={submitSearch}
            loading={loading}
            suggestions={suggestions}
          />
          <Filter />
        </div>

        {loading ? (
          <CatalogSkeletons count={6} />
        ) : failed ? (
          <EmptyState
            title={t.empty.error}
            description={t.empty.errorHint}
          />
        ) : noResults ? (
          <EmptyState title={t.empty.none} description={t.empty.noneHint} />
        ) : (
          <>
            <div className="section-block">
              <TitleSection
                onClick={() => router.push("/character/1")}
                id="characters"
                title={t.sections.characters}
                isSearching={isSearching}
                resultsCount={characterData.info.count}
              />
              <ErrorBoundary {...listError}>
                {characterData.results.length > 0 ? (
                  <Carousel className="characters" label={t.a11y.carousel}>
                    {characterData.results.map((character) => (
                      <CharacterCard
                        id={character.id}
                        key={character.id}
                        image={character.image}
                        name={character.name}
                        status={character.status}
                        species={character.species}
                        origin={character.origin?.name}
                      />
                    ))}
                  </Carousel>
                ) : (
                  <EmptyState title={t.empty.noCharacters} />
                )}
              </ErrorBoundary>
              <Paginate
                pageCount={characterData.info.pages}
                forcePage={cpage - 1}
                onPageChange={(item) => {
                  smoothScroll("characters");
                  updatePages({ cpage: item.selected + 1 });
                }}
              />
            </div>

            <div className="section-block">
              <TitleSection
                onClick={() => router.push("/episode/1")}
                id="episodes"
                title={t.sections.episodes}
                isSearching={isSearching}
                resultsCount={episodeData.info.count}
              />
              <ErrorBoundary {...listError}>
                {episodeData.results.length > 0 ? (
                  <Carousel className="episodes" label={t.a11y.carousel}>
                    {episodeData.results.map((episode) => (
                      <EpisodeCard
                        id={episode.id}
                        key={episode.id}
                        name={episode.name}
                        episode={episode.episode}
                      />
                    ))}
                  </Carousel>
                ) : (
                  <EmptyState title={t.empty.noEpisodes} />
                )}
              </ErrorBoundary>
              <Paginate
                pageCount={episodeData.info.pages}
                forcePage={epage - 1}
                onPageChange={(item) => {
                  smoothScroll("episodes");
                  updatePages({ epage: item.selected + 1 });
                }}
              />
            </div>

            <div className="section-block">
              <TitleSection
                onClick={() => router.push("/location/1")}
                id="locations"
                title={t.sections.locations}
                isSearching={isSearching}
                resultsCount={locationData.info.count}
              />
              <ErrorBoundary {...listError}>
                {locationData.results.length > 0 ? (
                  <Carousel className="locations" label={t.a11y.carousel}>
                    {locationData.results.map((location) => (
                      <LocationCard
                        id={location.id}
                        key={location.id}
                        type={location.type}
                        name={location.name}
                      />
                    ))}
                  </Carousel>
                ) : (
                  <EmptyState title={t.empty.noLocations} />
                )}
              </ErrorBoundary>
              <Paginate
                pageCount={locationData.info.pages}
                forcePage={lpage - 1}
                onPageChange={(item) => {
                  smoothScroll("locations");
                  updatePages({ lpage: item.selected + 1 });
                }}
              />
            </div>
          </>
        )}
      </Content>
    </Container>
  );
}
