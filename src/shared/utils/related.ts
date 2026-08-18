import { idsFromUrls } from "@/shared/utils/catalog";
import {
  getCharactersByIds,
  getEpisodesByIds,
  getLocationsByIds,
} from "@/shared/services/rickAndMorty";

const RELATED_CAP = 80;

export function relatedIds(urls: string[] = []) {
  return idsFromUrls(urls).slice(0, RELATED_CAP);
}

export const loadRelatedCharacters = (urls: string[] = []) =>
  getCharactersByIds(relatedIds(urls));

export const loadRelatedEpisodes = (urls: string[] = []) =>
  getEpisodesByIds(relatedIds(urls));

export const loadRelatedLocations = (urls: string[] = []) =>
  getLocationsByIds(relatedIds(urls));
