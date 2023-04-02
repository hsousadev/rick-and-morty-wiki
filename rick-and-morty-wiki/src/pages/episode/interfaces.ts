export interface EpisodeProps {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
}

export interface EpisodeListProps {
  info: {
    pages: number;
    count: number;
  };
  results: Array<EpisodeProps>;
}
