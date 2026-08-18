import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  darkTheme: boolean;
  setDarkTheme: (value: boolean) => void;
};

const STORAGE_KEY = "rm-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(dark: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkTheme, setDarkThemeState] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const isDark = stored !== "light";
    setDarkThemeState(isDark);
    applyTheme(isDark);
  }, []);

  const setDarkTheme = useCallback((value: boolean) => {
    setDarkThemeState(value);
    applyTheme(value);
    window.localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
  }, []);

  const value = useMemo(
    () => ({ darkTheme, setDarkTheme }),
    [darkTheme, setDarkTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
