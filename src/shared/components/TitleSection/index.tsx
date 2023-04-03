import { useContext } from "react";

import { Icons } from "./icons";
import DefaultButton from "../DefaultButton";

import { GlobalContext } from "@/pages/_app.page";
import { Container } from "./styles";

interface TitleSectionProps {
  id: string;
  title: string;
  onClick?: () => void;
  isSearching?: boolean;
  resultsCount?: number;
}

const TitleSection = ({
  title,
  id,
  onClick,
  isSearching,
  resultsCount,
}: TitleSectionProps) => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container id={id}>
      <h3>{title}</h3>
      <DefaultButton
        icon={darkTheme ? Icons.WhiteSquaresFour : Icons.DarkSquaresFour}
        text="Ver todos"
        onClick={onClick}
      />
      {isSearching && (
        <h4>{resultsCount ? resultsCount : "0"} resultados encontrados</h4>
      )}
    </Container>
  );
};

export default TitleSection;
