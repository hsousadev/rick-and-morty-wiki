import styled, { css } from "styled-components";

interface HeroContentProps {
  isDarkTheme: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const HeroContent = styled.div<HeroContentProps>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 580px;

  ${(props) =>
    props.isDarkTheme
      ? css`
          background-color: #000000;
        `
      : css`
          background-color: transparent;
          border-bottom: 1px solid var(--BLUE-A);
        `}

  @media(max-width: 1240px) {
    height: 100%;
  }
`;
