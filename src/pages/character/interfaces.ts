export default interface CharacterProps {
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

export default interface CharacterListProps {
  info: {
    pages: number;
    count: number;
    next: string;
  };
  results: Array<CharacterProps>;
}
