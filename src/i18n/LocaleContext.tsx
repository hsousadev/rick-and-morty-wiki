import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messages, type Locale, type Messages } from "@/i18n/messages";

type LocaleContextValue = {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const STORAGE_KEY = "rm-locale";
const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "pt" ? "pt-BR" : "en";
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "pt" ? "en" : "pt");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({
      locale,
      t: messages[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return context;
}
