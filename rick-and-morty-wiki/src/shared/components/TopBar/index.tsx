import { useRouter } from "next/router";
import { useContext } from "react";

import useWindowSize from "@/shared/utils/useWindowSize";

import Image from "next/image";

import Logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import DefaultButton from "../DefaultButton";

import { Heart, HouseSimple, Moon, Sun } from "@phosphor-icons/react";

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
              icon={<Heart size={24} color={`var(--FONT-COLOR)`} />}
              text={
                isMobile ? (isHome ? "Meus favoritos" : "") : "Meus favoritos"
              }
              onClick={() => router.push("/favorites")}
            />
          )}
          {!isHome && (
            <>
              <DefaultButton
                icon={<HouseSimple size={24} color={`var(--FONT-COLOR)`} />}
                text={isMobile ? "" : "Início"}
                onClick={() => router.push("/")}
              />
              {darkTheme ? (
                <>
                  <DefaultButton
                    icon={<Moon color="#fff" size={24} />}
                    onClick={() => handleActiveDarkTheme()}
                    selected
                  />
                  <DefaultButton
                    icon={<Sun color="#fff" size={24} />}
                    onClick={() => handleDisableDarkTheme()}
                  />
                </>
              ) : (
                <>
                  <DefaultButton
                    icon={<Moon color="#313234" size={24} />}
                    onClick={() => handleActiveDarkTheme()}
                  />
                  <DefaultButton
                    icon={<Sun color="#fff" size={24} />}
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
