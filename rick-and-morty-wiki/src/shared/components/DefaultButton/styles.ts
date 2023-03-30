import styled, { css } from "styled-components";

interface ContainerProps {
  isDarkTheme: boolean;
  selected?: boolean;
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
  }

  :hover {
    transition: all 0.4s ease-in-out;
    background-color: var(--BLUE-A);

    svg {
      fill: white;
    }

    p {
      color: #fff;
    }
  }

  ${(props) =>
    props.selected
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
