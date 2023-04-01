import { useRouter } from "next/router";
import { useContext } from "react";

import Image from "next/image";

import Logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import DefaultButton from "../DefaultButton";

import { Heart, HouseSimple } from "@phosphor-icons/react";

import { Container, Content } from "./styles";
import { GlobalContext } from "@/pages/_app";

const TopBar = () => {
  const { darkTheme } = useContext(GlobalContext);
  const router = useRouter();

  const isHome = router.pathname === "/" || router.pathname === "/home";

  return (
    <Container id="top" isDarkMode={darkTheme} isHome={isHome}>
      <Content isHome={isHome}>
        <Image src={Logo} height={64} alt="Site Logo" />

        <div className="buttons">
          {!isHome && (
            <DefaultButton
              icon={<HouseSimple size={24} color={`var(--FONT-COLOR)`} />}
              text="Início"
              onClick={() => router.push("/")}
            />
          )}

          <DefaultButton
            icon={<Heart size={24} color={`var(--FONT-COLOR)`} />}
            text="Meus favoritos"
          />
        </div>
      </Content>
    </Container>
  );
};

export default TopBar;
