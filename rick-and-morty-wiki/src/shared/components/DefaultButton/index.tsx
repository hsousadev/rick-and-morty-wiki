import { useContext, HTMLAttributes } from "react";

import { Container } from "./styles";
import { GlobalContext } from "../../../pages/_app";

interface DefaultButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: any;
  text: string;
  onClick?: () => void;
  selected?: boolean;
}

const DefaultButton = ({
  icon,
  text,
  onClick,
  selected,
}: DefaultButtonProps) => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container isDarkTheme={darkTheme} onClick={onClick} isSelected={selected}>
      {icon}
      <p>{text}</p>
    </Container>
  );
};

export default DefaultButton;
