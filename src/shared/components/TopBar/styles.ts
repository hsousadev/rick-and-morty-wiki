import styled, { css } from "styled-components";

interface ContainterProps {
  isDarkMode: boolean;
  isHome?: boolean;
}

interface ContentProps {
  isHome?: boolean;
}

export const Container = styled.div<ContainterProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 64px 0 16px 0;

  @media (max-width: 1360px) {
    padding: 64px 64px 16px 64px;
  }

  ${(props) =>
    props.isDarkMode
      ? props.isHome &&
        css`
          background-color: #000000;
        `
      : css`
          background-color: transparent;
        `}
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  @media (max-width: 1360px) {
    flex-direction: column;
    gap: 32px;
  }
`;
