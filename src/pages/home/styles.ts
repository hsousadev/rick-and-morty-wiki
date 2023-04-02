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

  ${(props) =>
    props.isDarkTheme
      ? css`
          background-color: #000000;
        `
      : css`
          background-color: transparent;
          border-bottom: 1px solid var(--BLUE-A);
        `}

  @media(max-width: var(--MAX-CONTENT-WIDTH)) {
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 64px 0 80px 0;
  max-width: var(--MAX-CONTENT-WIDTH);
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
    display: grid;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
    margin-top: 24px;

    gap: 16px;
  }

  .characters {
    grid-template-columns: repeat(4, 1fr);
  }
  .episodes {
    grid-template-columns: repeat(5, 1fr);
  }
  .locations {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (max-width: 1360px) {
    padding: 64px;

    .search-and-filter {
      flex-direction: column;
      gap: 24px;
    }

    .characters,
    .episodes,
    .locations {
      display: flex;
      justify-content: center;
      flex-direction: row;

      flex-wrap: wrap;
    }
  }

  @media (max-width: 460px) {
    padding: 24px;
  }
`;
