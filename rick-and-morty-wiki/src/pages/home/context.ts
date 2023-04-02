import { createContext } from "react";
import { EpisodeListProps } from "../episode/interfaces";
import { LocationListProps } from "../location/interfaces";

export interface HomeContextProps {
  characterList: any;
  episodeList: EpisodeListProps;
  locationList: LocationListProps;
}
export const HomeContext = createContext<HomeContextProps>({
  characterList: {
    info: {
      pages: 0,
      count: 0,
    },
    results: [],
  },
  episodeList: {
    info: {
      pages: 0,
      count: 0,
    },
    results: [],
  },
  locationList: {
    info: {
      pages: 0,
      count: 0,
    },
    results: [],
  },
});

export default HomeContext;
