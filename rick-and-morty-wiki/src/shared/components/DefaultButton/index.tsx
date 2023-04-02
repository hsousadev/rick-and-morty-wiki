import { useContext, HTMLAttributes } from "react";

import { Container } from "./styles";
import { GlobalContext } from "../../../pages/_app";

interface DefaultButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: any;
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
      {icon}
      {text && <p>{text}</p>}
    </Container>
  );
};

export default DefaultButton;
