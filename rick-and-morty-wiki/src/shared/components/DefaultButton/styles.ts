import styled, { css } from "styled-components";

interface ContainerProps {
  isDarkTheme: boolean;
  isSelected?: boolean;
  color?: string;
}

export const Container = styled.button<ContainerProps>`
  transition: all 0.4s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 32px;
  width: auto;

  p {
    margin-left: 8px;
    white-space: nowrap;
  }

  svg {
    transition: all 0.4s ease-in-out;
  }

  :hover {
    transition: all 0.4s ease-in-out;

    ${(props) =>
      props.color
        ? css`
            background-color: ${props.color};
          `
        : css`
            background-color: var(--BLUE-A);
          `}

    svg {
      transition: all 0.4s ease-in-out;
      fill: white;
    }

    p {
      color: #fff;
    }
  }

  ${(props) =>
    props.isSelected
      ? css`
          background-color: var(--BLUE-A);
          p {
            color: #fff;
          }
        `
      : css`
          background-color: var(--BTN-BACKGROUND);
        `}
`;
