import { useContext } from "react";

import DefaultButton from "@/shared/components/DefaultButton";
import smoothScroll from "@/shared/utils/smoothScroll";

import { GlobalContext } from "@/pages/_app.page";

import { Icons } from "./icons";
import { Container } from "./styles";

const Filter = () => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container>
      <DefaultButton
        icon={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
        text="Personagens"
        onClick={() => smoothScroll("characters")}
      />
      <DefaultButton
        icon={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
        text="Episódio"
        onClick={() => smoothScroll("episodes")}
      />
      <DefaultButton
        icon={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
        text="Localização"
        onClick={() => smoothScroll("locations")}
      />
    </Container>
  );
};

export default Filter;
