import DefaultButton from "../DefaultButton";

import { SquaresFour } from "@phosphor-icons/react";

import { Container } from "./styles";

interface TitleSectionProps {
  id: string;
  title: string;
}

const TitleSection = ({ title, id }: TitleSectionProps) => {
  return (
    <Container id={id}>
      <h3>{title}</h3>
      <DefaultButton
        icon={<SquaresFour size={24} color={`var(--FONT-COLOR)`} />}
        text="Ver todos"
      />
    </Container>
  );
};

export default TitleSection;
