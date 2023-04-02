import type { AppProps } from "next/app";
import { GlobalStyles } from "@/shared/styles/global";

import Footer from "@/shared/components/Footer";
import TopBar from "@/shared/components/TopBar";

import { createContext, SetStateAction, useEffect, useState } from "react";
import { CharacterCardProps } from "@/shared/components/CharacterCard";

interface GlobalContextProps {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  favoritesCharacters: any;
  setFavoritesCharacters: any;
}

export const GlobalContext = createContext<GlobalContextProps>({
  darkTheme: true,
  setDarkTheme: () => {},
  favoritesCharacters: [],
  setFavoritesCharacters: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        favoritesCharacters,
        setFavoritesCharacters,
      }}
    >
      <>
        <TopBar />
        <GlobalStyles darkTheme={darkTheme} /> <Component {...pageProps} />
        <Footer />
      </>
    </GlobalContext.Provider>
  );
}
