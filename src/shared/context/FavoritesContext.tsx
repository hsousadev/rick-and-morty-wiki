import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CharacterCardProps } from "@/shared/types/characterCardProps";
import type { EpisodeCardProps } from "@/shared/types/episodeCardProps";
import type { LocationCardProps } from "@/shared/types/locationCardProps";
import { useToast } from "@/shared/context/ToastContext";
import { useI18n } from "@/i18n/LocaleContext";

const KEYS = {
  characters: "favoriteCharacters",
  episodes: "favoriteEpisodes",
  locations: "favoriteLocation",
} as const;

type FavoritesContextValue = {
  characters: CharacterCardProps[];
  episodes: EpisodeCardProps[];
  locations: LocationCardProps[];
  isCharacterFavorited: (id: number) => boolean;
  isEpisodeFavorited: (id?: number) => boolean;
  isLocationFavorited: (id?: number) => boolean;
  toggleCharacter: (item: CharacterCardProps) => void;
  toggleEpisode: (item: EpisodeCardProps) => void;
  toggleLocation: (item: LocationCardProps) => void;
  clearCharacters: () => void;
  clearEpisodes: () => void;
  clearLocations: () => void;
  importCapsule: (payload: {
    characters?: CharacterCardProps[];
    episodes?: EpisodeCardProps[];
    locations?: LocationCardProps[];
  }) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, value: T[]) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function mergeById<T extends { id?: number }>(current: T[], incoming: T[]) {
  const ids = new Set(current.map((item) => item.id));
  return [
    ...current,
    ...incoming.filter((item) => item.id && !ids.has(item.id)),
  ];
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const { t } = useI18n();
  const [characters, setCharacters] = useState<CharacterCardProps[]>([]);
  const [episodes, setEpisodes] = useState<EpisodeCardProps[]>([]);
  const [locations, setLocations] = useState<LocationCardProps[]>([]);
  const charactersRef = useRef(characters);
  const episodesRef = useRef(episodes);
  const locationsRef = useRef(locations);

  charactersRef.current = characters;
  episodesRef.current = episodes;
  locationsRef.current = locations;

  useEffect(() => {
    const storedCharacters = readList<CharacterCardProps>(KEYS.characters);
    const storedEpisodes = readList<EpisodeCardProps>(KEYS.episodes);
    const storedLocations = readList<LocationCardProps>(KEYS.locations);

    charactersRef.current = storedCharacters;
    episodesRef.current = storedEpisodes;
    locationsRef.current = storedLocations;
    setCharacters(storedCharacters);
    setEpisodes(storedEpisodes);
    setLocations(storedLocations);
  }, []);

  const toggleCharacter = useCallback(
    (item: CharacterCardProps) => {
      const current = charactersRef.current;
      const exists = current.some((entry) => entry.id === item.id);
      const next = exists
        ? current.filter((entry) => entry.id !== item.id)
        : [...current, item];

      charactersRef.current = next;
      setCharacters(next);
      writeList(KEYS.characters, next);
      toast({
        tone: exists ? "remove" : "success",
        title: exists ? t.toast.out : t.toast.in,
        message: exists
          ? `${item.name} ${t.toast.outMsg}`
          : `${item.name} ${t.toast.inMsg}`,
      });
    },
    [t, toast]
  );

  const toggleEpisode = useCallback(
    (item: EpisodeCardProps) => {
      const current = episodesRef.current;
      const exists = current.some((entry) => entry.id === item.id);
      const next = exists
        ? current.filter((entry) => entry.id !== item.id)
        : [...current, item];

      episodesRef.current = next;
      setEpisodes(next);
      writeList(KEYS.episodes, next);
      toast({
        tone: exists ? "remove" : "success",
        title: exists ? t.toast.epOut : t.toast.epIn,
        message: item.name,
      });
    },
    [t, toast]
  );

  const toggleLocation = useCallback(
    (item: LocationCardProps) => {
      const current = locationsRef.current;
      const exists = current.some((entry) => entry.id === item.id);
      const next = exists
        ? current.filter((entry) => entry.id !== item.id)
        : [...current, item];

      locationsRef.current = next;
      setLocations(next);
      writeList(KEYS.locations, next);
      toast({
        tone: exists ? "remove" : "success",
        title: exists ? t.toast.locOut : t.toast.locIn,
        message: item.name ?? "",
      });
    },
    [t, toast]
  );

  const importCapsule = useCallback(
    (payload: {
      characters?: CharacterCardProps[];
      episodes?: EpisodeCardProps[];
      locations?: LocationCardProps[];
    }) => {
      const nextCharacters = mergeById(charactersRef.current, payload.characters ?? []);
      const nextEpisodes = mergeById(episodesRef.current, payload.episodes ?? []);
      const nextLocations = mergeById(locationsRef.current, payload.locations ?? []);

      charactersRef.current = nextCharacters;
      episodesRef.current = nextEpisodes;
      locationsRef.current = nextLocations;
      setCharacters(nextCharacters);
      setEpisodes(nextEpisodes);
      setLocations(nextLocations);
      writeList(KEYS.characters, nextCharacters);
      writeList(KEYS.episodes, nextEpisodes);
      writeList(KEYS.locations, nextLocations);
      toast({
        tone: "success",
        title: t.toast.imported,
        message: t.toast.importedMsg,
      });
    },
    [t, toast]
  );

  const clearCharacters = useCallback(() => {
    setCharacters([]);
    window.localStorage.removeItem(KEYS.characters);
    toast({
      tone: "remove",
      title: "Personagens evaporados",
      message: "A cápsula ficou sem ninguém. Típico.",
    });
  }, [toast]);

  const clearEpisodes = useCallback(() => {
    setEpisodes([]);
    window.localStorage.removeItem(KEYS.episodes);
    toast({
      tone: "remove",
      title: "Maratona zerada",
      message: "Os episódios foram pro vazio.",
    });
  }, [toast]);

  const clearLocations = useCallback(() => {
    setLocations([]);
    window.localStorage.removeItem(KEYS.locations);
    toast({
      tone: "remove",
      title: "Mapa apagado",
      message: "Nenhuma localização restou neste universo.",
    });
  }, [toast]);

  const value = useMemo(
    () => ({
      characters,
      episodes,
      locations,
      isCharacterFavorited: (id: number) =>
        characters.some((entry) => entry.id === id),
      isEpisodeFavorited: (id?: number) =>
        Boolean(id && episodes.some((entry) => entry.id === id)),
      isLocationFavorited: (id?: number) =>
        Boolean(id && locations.some((entry) => entry.id === id)),
      toggleCharacter,
      toggleEpisode,
      toggleLocation,
      clearCharacters,
      clearEpisodes,
      clearLocations,
      importCapsule,
    }),
    [
      characters,
      episodes,
      locations,
      toggleCharacter,
      toggleEpisode,
      toggleLocation,
      clearCharacters,
      clearEpisodes,
      clearLocations,
      importCapsule,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
