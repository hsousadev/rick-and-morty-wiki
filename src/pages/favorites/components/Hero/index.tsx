import { useContext } from "react";
import Image from "next/image";

import { Heart } from "@phosphor-icons/react";

import HighlightImage from "@/shared/assets/images/rick-and-morty-fav.png";
import { GlobalContext } from "@/pages/_app.page";

import { Container } from "./styles";

const Hero = () => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container isDarkMode={darkTheme}>
      <div className="page-title">
        <Heart size={56} color={`var(--BLUE-A)`} />
        <h1>
          Todos os seus <br /> <strong>favoritos</strong>
        </h1>
      </div>

      <Image src={HighlightImage} alt="" width={315} />
    </Container>
  );
};

export default Hero;
