import { useState, useEffect } from "react";

type WindowSize = {
  windowWidth: number;
  windowHeight: number;
};

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: 1200,
    windowHeight: 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
