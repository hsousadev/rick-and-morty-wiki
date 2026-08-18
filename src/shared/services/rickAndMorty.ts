import {
  emptyPage,
  type Character,
  type Episode,
  type Location,
  type Paged,
} from "@/shared/types/api";
import { chunk } from "@/shared/utils/catalog";

const BASE = "https://rickandmortyapi.com/api";

export type ListParams = {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
};

function buildQuery(params: ListParams = {}) {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      qs.set(key, String(value));
    }
  });

  const query = qs.toString();
  return query ? `?${query}` : "";
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data?.error) {
      return null;
    }

    return data as T;
  } catch {
    return null;
  }
}

export async function fetchPaged<T>(
  resource: "character" | "episode" | "location",
  params: ListParams = {}
): Promise<Paged<T>> {
  const data = await getJson<Paged<T>>(`${BASE}/${resource}${buildQuery(params)}`);
  return data ?? emptyPage<T>();
}

export async function fetchById<T>(
  resource: "character" | "episode" | "location",
  id: string | number
): Promise<T | null> {
  return getJson<T>(`${BASE}/${resource}/${id}`);
}

export async function fetchByUrl<T>(url?: string): Promise<T | null> {
  if (!url) return null;
  return getJson<T>(url);
}

export const getCharacters = (params?: ListParams) =>
  fetchPaged<Character>("character", params);

export const getEpisodes = (params?: ListParams) =>
  fetchPaged<Episode>("episode", params);

export const getLocations = (params?: ListParams) =>
  fetchPaged<Location>("location", params);

export async function fetchByIds<T>(
  resource: "character" | "episode" | "location",
  ids: number[]
): Promise<T[]> {
  const unique = [...new Set(ids.filter((id) => Number.isFinite(id) && id > 0))];
  if (!unique.length) return [];

  const groups = chunk(unique, 20);
  const pages = await Promise.all(
    groups.map(async (group) => {
      const data = await getJson<T[] | T>(`${BASE}/${resource}/${group.join(",")}`);
      if (!data) return [] as T[];
      return Array.isArray(data) ? data : [data];
    })
  );

  return pages.flat();
}

export const getCharactersByIds = (ids: number[]) =>
  fetchByIds<Character>("character", ids);

export const getEpisodesByIds = (ids: number[]) =>
  fetchByIds<Episode>("episode", ids);

export const getLocationsByIds = (ids: number[]) =>
  fetchByIds<Location>("location", ids);

export async function getRandomPortal() {
  const [characters, episodes, locations] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getLocations(),
  ]);

  const pools = [
    { type: "character" as const, count: characters.info.count || 1 },
    { type: "episode" as const, count: episodes.info.count || 1 },
    { type: "location" as const, count: locations.info.count || 1 },
  ];
  const pool = pools[Math.floor(Math.random() * pools.length)];
  const id = Math.max(1, Math.floor(Math.random() * pool.count) + 1);

  return { type: pool.type, id };
}

export const getCharacterById = (id: string | number) =>
  fetchById<Character>("character", id);

export const getEpisodeById = (id: string | number) =>
  fetchById<Episode>("episode", id);

export const getLocationById = (id: string | number) =>
  fetchById<Location>("location", id);
