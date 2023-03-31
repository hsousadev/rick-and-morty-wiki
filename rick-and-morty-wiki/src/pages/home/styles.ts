import styled, { css } from "styled-components";

interface HeroContentProps {
  isDarkTheme: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

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

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 64px 0 80px 0;
  max-width: 1240px;
  width: 100%;

  .search-and-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }

  .characters,
  .episodes,
  .locations {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    width: 100%;
    margin-top: 24px;

    gap: 16px;
  }
`;
