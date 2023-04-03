import Image from "next/image"

import { Container } from "./styles";

interface MoreSectionProps {
  icon: string;
  text: string;
}

const MoreSection = ({ icon, text }: MoreSectionProps) => {
  return (
    <Container id="more-section">
      <Image src={icon} width={48} height={48} alt="" />
      <h3>
        Mais <br /> {text}
      </h3>
    </Container>
  );
};

export default MoreSection;
