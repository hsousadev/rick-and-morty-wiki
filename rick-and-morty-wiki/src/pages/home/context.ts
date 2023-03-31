import { createContext } from "react";

export interface HomeContextProps {
  characterList: any;
  episodeList: any;
  locationList: any;
}
export const HomeContext = createContext<HomeContextProps>({
  characterList: {},
  episodeList: {},
  locationList: {},
});

export default HomeContext;
