import { useContext } from "react";
import Image from "next/image";

import Logo from "../../../../shared/assets/icons/rick-and-morty-no-border-logo.svg";
import DarkThemeHeroImage from "../../../../shared/assets/images/hero-image-dark.png";
import WhiteThemeHeroImage from "../../../../shared/assets/images/hero-image-white.png";

import { Moon, Sun } from "@phosphor-icons/react";

import DefaultButton from "@/shared/components/DefaultButton";

import { GlobalContext } from "../../../../pages/_app";
import { Container } from "./styles";

const Hero = () => {
  const { setDarkTheme, darkTheme } = useContext(GlobalContext);

  function handleActiveDarkTheme() {
    setDarkTheme(true);
  }

  function handleDisableDarkTheme() {
    setDarkTheme(false);
  }

  return (
    <Container isDarkTheme={darkTheme}>
      <div className="hero-info">
        <Image src={Logo} width={220} alt="logo" />
        <h1>
          Saiba tudo em <br /> um só <strong>lugar.</strong>
        </h1>
        <h4>Personagens. localizações, episódios e muito mais.</h4>
        <div className="buttons">
          {darkTheme ? (
            <>
              <DefaultButton
                icon={<Moon color="#fff" size={24} />}
                text="Escuro"
                onClick={() => handleActiveDarkTheme()}
                selected
              />
              <DefaultButton
                icon={<Sun color="#fff" size={24} />}
                text="Claro"
                onClick={() => handleDisableDarkTheme()}
              />
            </>
          ) : (
            <>
              <DefaultButton
                icon={<Moon color="#313234" size={24} />}
                text="Escuro"
                onClick={() => handleActiveDarkTheme()}
              />
              <DefaultButton
                icon={<Sun color="#fff" size={24} />}
                text="Claro"
                onClick={() => handleDisableDarkTheme()}
                selected
              />
            </>
          )}
        </div>
        {darkTheme ? (
          <h4 className="theme-phrase">Ai sim, Porr#@%&*</h4>
        ) : (
          <h4 className="theme-phrase">
            Wubba Lubba Dub Dub! Cuidado com os olhos.
          </h4>
        )}
      </div>

      {darkTheme ? (
        <Image
          src={DarkThemeHeroImage}
          width={774}
          alt="Image destaque Dark Mode"
          className="hero-image"
        />
      ) : (
        <Image
          src={WhiteThemeHeroImage}
          width={435}
          alt="Image destaque Modo Claro"
          className="hero-image"
        />
      )}
    </Container>
  );
};

export default Hero;
