import type { AppProps } from "next/app";
import { GlobalStyles } from "@/shared/styles/global";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import { FavoritesProvider } from "@/shared/context/FavoritesContext";
import { LocaleProvider } from "@/i18n/LocaleContext";
import SceneBackdrop from "@/shared/components/SceneBackdrop";
import Footer from "@/shared/components/Footer";
import TopBar from "@/shared/components/TopBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>
          <FavoritesProvider>
            <GlobalStyles />
            <SceneBackdrop />
            <div style={{ position: "relative", zIndex: 1 }}>
              <TopBar />
              <Component {...pageProps} />
              <Footer />
            </div>
          </FavoritesProvider>
        </ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
