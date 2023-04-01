import { SmileyBlank, Planet, MonitorPlay } from "@phosphor-icons/react";

import DefaultButton from "@/shared/components/DefaultButton";
import smoothScroll from "@/shared/utils/smoothScroll";

import { Container } from "./styles";

const Filter = () => {
  return (
    <Container>
      <DefaultButton
        icon={<SmileyBlank size={24} color={`var(--FONT-COLOR)`} />}
        text="Personagens"
        onClick={() => smoothScroll("characters")}
      />
      <DefaultButton
        icon={<MonitorPlay size={24} color={`var(--FONT-COLOR)`} />}
        text="Episódio"
        onClick={() => smoothScroll("episodes")}
      />
      <DefaultButton
        icon={<Planet size={24} color={`var(--FONT-COLOR)`} />}
        text="Localização"
        onClick={() => smoothScroll("locations")}
      />
    </Container>
  );
};

export default Filter;
