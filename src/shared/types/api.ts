export type NamedUrl = {
  name: string;
  url: string;
};

export type PageInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type Paged<T> = {
  info: PageInfo;
  results: T[];
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: NamedUrl;
  location: NamedUrl;
  image: string;
  episode: string[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
};

export const emptyPage = <T,>(): Paged<T> => ({
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
});
