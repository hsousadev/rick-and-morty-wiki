import Image from "next/image";

import { ArrowUp, CodeSimple } from "@phosphor-icons/react";

import logo from "@/shared/assets/icons/rick-and-morty-no-border-logo.svg";
import smoothScroll from "@/shared/utils/smoothScroll";

import { Container, Content } from "./styles";

const Footer = () => {
  return (
    <Container>
      <Content>
        <div className="logo-and-return-top">
          <Image src={logo} alt="" width={128} />

          <div className="return-top">
            <button onClick={() => smoothScroll("top")}>
              <h4>Voltar ao topo</h4>
              <ArrowUp weight="thin" size={24} color={`var(--FONT-COLOR)`} />
            </button>
          </div>
        </div>
        <div className="copyrights">
          <h4>Copyright © 2023 </h4>
          <h4>
            <CodeSimple weight="bold" size={24} color={`var(--BLUE-A)`} />
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
