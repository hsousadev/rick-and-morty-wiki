import { useRouter } from "next/router";
import { useContext } from "react";
import Image from "next/image";

import useWindowSize from "@/shared/utils/useWindowSize";

import Logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import DefaultButton from "../DefaultButton";

import { Icons } from "./icons";

import { Container, Content } from "./styles";
import { GlobalContext } from "@/pages/_app.page";

const TopBar = () => {
  const { darkTheme, setDarkTheme } = useContext(GlobalContext);
  const router = useRouter();
  const windowSize = useWindowSize();

  const isMobile = windowSize.windowWidth <= 500;

  const isHome = router.pathname === "/" || router.pathname === "/home";
  const isFavorites = router.pathname === "/favorites";

  function handleActiveDarkTheme() {
    setDarkTheme(true);
  }

  function handleDisableDarkTheme() {
    setDarkTheme(false);
  }

  return (
    <Container id="top" isDarkMode={darkTheme} isHome={isHome}>
      <Content isHome={isHome}>
        <Image src={Logo} height={64} alt="Site Logo" />

        <div className="buttons">
          {!isFavorites && (
            <DefaultButton
              icon={darkTheme ? Icons.WhiteHeart : Icons.DarkHeart}
              text={
                isMobile ? (isHome ? "Meus favoritos" : "") : "Meus favoritos"
              }
              onClick={() => router.push("/favorites")}
            />
          )}
          {!isHome && (
            <>
              <DefaultButton
                icon={darkTheme ? Icons.WhiteHouseSimple : Icons.DarkHouseSimple}
                text={isMobile ? "" : "Início"}
                onClick={() => router.push("/")}
              />
              {darkTheme ? (
                <>
                  <DefaultButton
                    icon={darkTheme ? Icons.WhiteMoon : Icons.DarkMoon}
                    onClick={() => handleActiveDarkTheme()}
                    selected
                  />
                  <DefaultButton
                    icon={darkTheme ? Icons.WhiteSun : Icons.DarkSun}
                    onClick={() => handleDisableDarkTheme()}
                  />
                </>
              ) : (
                <>
                  <DefaultButton
                    icon={darkTheme ? Icons.WhiteMoon : Icons.DarkMoon}
                    onClick={() => handleActiveDarkTheme()}
                  />
                  <DefaultButton
                    icon={darkTheme ? Icons.WhiteSun : Icons.DarkSun}
                    onClick={() => handleDisableDarkTheme()}
                    selected
                  />
                </>
              )}
            </>
          )}
        </div>
      </Content>
    </Container>
  );
};

export default TopBar;
