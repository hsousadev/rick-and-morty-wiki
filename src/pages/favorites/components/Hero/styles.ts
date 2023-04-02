import styled, { css } from "styled-components";

interface ContainerProps {
  isDarkMode: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);
  align-self: center;

  ${(props) =>
    !props.isDarkMode &&
    css`
      img {
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
      }
    `}

  .page-title {
    margin-top: 64px;

    h1 {
      margin-top: 16px;
      strong {
        color: var(--BLUE-A);
      }
    }
  }

  @media (max-width: 1360px) {
    padding: 64px 64px 0 64px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;

    padding: 0 32px;

    .page-title {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 16px;
      gap: 16px;
    }
  }
`;
