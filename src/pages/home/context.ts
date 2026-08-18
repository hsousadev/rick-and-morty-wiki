import { createContext } from "react";
import { emptyPage, type Character, type Episode, type Location, type Paged } from "@/shared/types/api";

export type HomeContextProps = {
  characterList: Paged<Character>;
  episodeList: Paged<Episode>;
  locationList: Paged<Location>;
};

const HomeContext = createContext<HomeContextProps>({
  characterList: emptyPage<Character>(),
  episodeList: emptyPage<Episode>(),
  locationList: emptyPage<Location>(),
});

export default HomeContext;
