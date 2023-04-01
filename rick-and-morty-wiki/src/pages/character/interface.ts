interface CharacterProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    url: string;
  };
  location: {
    url: string;
  };
  image: string;
  episodes: Array<string>;
}

export default CharacterProps;
