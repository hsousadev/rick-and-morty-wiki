import Image from "next/image";

import logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import smoothScroll from "@/shared/utils/smoothScroll";

import { Icons } from "./icons";

import { Container, Content } from "./styles";
import { useContext } from "react";
import { GlobalContext } from "@/pages/_app.page";

const Footer = () => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container>
      <Content>
        <div className="logo-and-return-top">
          <Image src={logo} alt="" width={128} />

          <div className="return-top">
            <button onClick={() => smoothScroll("top")}>
              <h4>Voltar ao topo</h4>
              <Image
                alt=""
                width={40}
                height={40}
                src={
                  darkTheme ? Icons.WhiteCircleArrowUp : Icons.DarkCircleArrowUp
                }
              />
            </button>
          </div>
        </div>
        <div className="copyrights">
          <h4>Copyright © 2023 </h4>
          <h4>
            <Image alt="" width={24} height={24} src={Icons.CodeSimple} />
            Desenvolvido por{" "}
            <strong>
              <a
                href="https://henriquesousadev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Henrique Sousa
              </a>
            </strong>
          </h4>
        </div>
      </Content>
    </Container>
  );
};

export default Footer;
