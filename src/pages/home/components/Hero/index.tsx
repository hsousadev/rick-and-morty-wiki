import { useContext } from "react";
import Image from "next/image";

import DarkThemeHeroImage from "@/shared/assets/images/hero-image-dark.png";
import WhiteThemeHeroImage from "@/shared/assets/images/hero-image-white.png";

import { Icons } from "./icons";

import { GlobalContext } from "@/pages/_app.page";

import DefaultButton from "@/shared/components/DefaultButton";

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
        <h1>
          Saiba tudo em <br /> um só <strong>lugar.</strong>
        </h1>
        <h4>Personagens, localizações, episódios e muito mais.</h4>
        <div className="buttons">
          <DefaultButton
            icon={darkTheme ? Icons.WhiteMoon : Icons.DarkMoon}
            text="Escuro"
            onClick={() => handleActiveDarkTheme()}
            selected={darkTheme}
          />
          <DefaultButton
            icon={darkTheme ? Icons.WhiteSun : Icons.DarkSun}
            text="Claro"
            onClick={() => handleDisableDarkTheme()}
            selected={!darkTheme}
          />
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
