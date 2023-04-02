import React from "react";

import { Container } from "./styles";

interface MoreSectionProps {
  icon: any;
  text: string;
}

const MoreSection = ({ icon, text }: MoreSectionProps) => {
  return (
    <Container id="more-section">
      {icon}
      <h3>
        Mais <br /> {text}
      </h3>
    </Container>
  );
};

export default MoreSection;
