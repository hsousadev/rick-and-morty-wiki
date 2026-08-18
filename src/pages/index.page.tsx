import Home from "./home/Home";
import HomeContext, { type HomeContextProps } from "./home/context";
import { getCharacters, getEpisodes, getLocations } from "@/shared/services/rickAndMorty";

export async function getStaticProps() {
  const [characterList, episodeList, locationList] = await Promise.all([
    getCharacters(),
    getEpisodes(),
    getLocations(),
  ]);

  return {
    props: {
      characterList,
      episodeList,
      locationList,
    },
    revalidate: 3600,
  };
}

export default function Index({
  characterList,
  episodeList,
  locationList,
}: HomeContextProps) {
  return (
    <HomeContext.Provider value={{ characterList, episodeList, locationList }}>
      <Home />
    </HomeContext.Provider>
  );
}
