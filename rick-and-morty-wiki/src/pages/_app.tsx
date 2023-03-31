import type { AppProps } from "next/app";
import { GlobalStyles } from "@/shared/styles/global";

import Footer from "@/shared/components/Footer";

import { createContext, useState } from "react";

interface GlobalContextProps {
  darkTheme: boolean;
  setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  darkTheme: true,
  setDarkTheme: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <GlobalContext.Provider value={{ darkTheme, setDarkTheme }}>
      <>
        <GlobalStyles darkTheme={darkTheme} /> <Component {...pageProps} />
        <Footer />
      </>
    </GlobalContext.Provider>
  );
}
