import DefaultButton from "../DefaultButton";

import { SquaresFour } from "@phosphor-icons/react";

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
  return (
    <Container id={id}>
      <h3>{title}</h3>
      <DefaultButton
        icon={<SquaresFour size={24} color={`var(--FONT-COLOR)`} />}
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
