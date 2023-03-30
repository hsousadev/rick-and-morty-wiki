import styled, { css } from "styled-components";

interface ContainerProps {
  isDarkTheme: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  max-width: 1240px;
  width: 100%;
  height: 100%;

  padding-top: 64px;

  .hero-info {
    h1 {
      margin-top: 64px;
    }

    h4 {
      margin: 24px 0 64px;
    }

    h4.theme-phrase,
    strong {
      transition: all 0.4s ease-in-out;
      color: var(--BLUE-A);
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
    }
  }

  img {
    transition: all 0.4s ease-in-out;
    align-self: flex-end;
  }

  @media (max-width: 1360px) {
    padding: 64px 64px 0 64px;
  }

  @media (max-width: 1240px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    img.hero-image {
      align-self: center;
      height: 100%;
    }

    ${(props) =>
      props.isDarkTheme
        ? css`
            img.hero-image {
              width: 500px;
            }
          `
        : css`
            img.hero-image {
              width: 300px;
              margin-bottom: 24px;
            }
          `}
  }
`;
