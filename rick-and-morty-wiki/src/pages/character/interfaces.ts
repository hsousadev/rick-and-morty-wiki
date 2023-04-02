export interface CharacterProps {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    url: string;
    name: string;
  };
  location: {
    url: string;
  };
  image: string;
  episode: Array<string>;
}

export interface CharacterListProps {
  info: {
    pages: number;
    count: number;
    next: string;
  };
  results: Array<CharacterProps>;
}
