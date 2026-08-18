import styled from "styled-components";
import DefaultButton from "@/shared/components/DefaultButton";
import smoothScroll from "@/shared/utils/smoothScroll";
import { useTheme } from "@/shared/context/ThemeContext";
import { useI18n } from "@/i18n/LocaleContext";
import { Icons } from "./icons";

const Container = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export default function Filter() {
  const { darkTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Container>
      <DefaultButton
        icon={darkTheme ? Icons.WhiteSmileyBlank : Icons.DarkSmileyBlank}
        text={t.filter.characters}
        onClick={() => smoothScroll("characters")}
      />
      <DefaultButton
        icon={darkTheme ? Icons.WhiteMonitorPlay : Icons.DarkMonitorPlay}
        text={t.filter.episodes}
        onClick={() => smoothScroll("episodes")}
      />
      <DefaultButton
        icon={darkTheme ? Icons.WhitePlanet : Icons.DarkPlanet}
        text={t.filter.locations}
        onClick={() => smoothScroll("locations")}
      />
    </Container>
  );
}
