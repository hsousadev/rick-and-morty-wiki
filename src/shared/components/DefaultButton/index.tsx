import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { stampButton } from "@/shared/styles/mixins";

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  text?: string;
  selected?: boolean;
  tone?: "default" | "danger";
};

const Container = styled.button<{ $selected?: boolean; $tone?: "default" | "danger" }>`
  ${stampButton}
  background: var(--BTN-BACKGROUND);
  color: var(--FONT-COLOR);

  p {
    margin: 0;
    font-family: var(--FONT-DISPLAY);
    font-weight: 600;
    white-space: nowrap;
  }

  img {
    width: 22px;
    height: 22px;
  }

  ${(props) =>
    props.$selected &&
    css`
      background: var(--PORTAL-CYAN);
      color: #06101c;
    `}

  ${(props) =>
    props.$tone === "danger" &&
    css`
      background: var(--DEAD);
      color: #fff;
    `}

  &:hover {
    background: ${(props) =>
      props.$tone === "danger" ? "var(--DEAD)" : "var(--PORTAL-LIME-FILL)"};
    color: #06101c;
  }
`;

export default function DefaultButton({
  icon,
  text,
  selected,
  tone = "default",
  type = "button",
  ...props
}: DefaultButtonProps) {
  return (
    <Container $selected={selected} $tone={tone} type={type} {...props}>
      <Image src={icon} alt="" width={22} height={22} />
      {text ? <p>{text}</p> : null}
    </Container>
  );
}
