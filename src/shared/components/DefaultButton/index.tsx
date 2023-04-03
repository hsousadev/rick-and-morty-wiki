import Image from "next/image"
import { useContext, HTMLAttributes } from "react";

import { Container } from "./styles";
import { GlobalContext } from "../../../pages/_app.page";

interface DefaultButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: string;
  text?: string;
  onClick?: () => void;
  selected?: boolean;
  color?: string;
}

const DefaultButton = ({
  icon,
  text,
  onClick,
  selected,
  color,
}: DefaultButtonProps) => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container
      color={color}
      isDarkTheme={darkTheme}
      onClick={onClick}
      isSelected={selected}
    >
      <Image src={icon} alt="" />
      {text && <p>{text}</p>}
    </Container>
  );
};

export default DefaultButton;
