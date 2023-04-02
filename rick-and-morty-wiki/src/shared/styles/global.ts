import { createGlobalStyle } from "styled-components";
import { css } from "styled-components";

interface GlobalStylesProps {
  darkTheme: boolean;
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  :root {
    --BLACK-A: #1a1a1a;
    --BLACK-B: #1e1e20;
    --BLUE-A: #11b0c8;
    --BLUE-B: #42b4ca;
    --PEAR: #bfde42;
    --RED: #DE4242;
    --MAX-CONTENT-WIDTH: 1240px;
    --WHITE: #fff;
  }

  ${(props) =>
    props.darkTheme
      ? css`
          :root {
            --BTN-BACKGROUND: #313234;
            --FONT-COLOR: #fff;
            --CARD-BACKGROUND: #1a1a1a;
            --CARD-BACKGROUND-HOVER: #313234;
          }
        `
      : css`
          :root {
            --BTN-BACKGROUND: transparent;
            --FONT-COLOR: #313234;
            --CARD-BACKGROUND: #f9f9f9;
            --CARD-BACKGROUND-HOVER: #f1f1f1;
          }
        `}

  html,
  body,
  #__next {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif;
    overflow-x: hidden;

    ${(props) =>
      props.darkTheme
        ? css`
            background-color: var(--BLACK-B);
          `
        : css`
            background-color: #fff;
          `}

  }

  mark {
    background-color: transparent;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }


  h1, h2, h3, h4, p {
    transition: all 0.4s ease-in-out;

    margin: 0;
    font-family: 'Inter';
    font-style: normal;
    color: var(--FONT-COLOR);
  }

  h1 {
    font-weight: 700;
    font-size: 48px;
  }

  h2 {
    font-weight: 400;
    font-size: 32px;
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
  }

  h4 {
    font-weight: 400;
    font-size: 16px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
  }

  button {
    cursor: pointer;
    outline: none;
    appearance: none;
    border: none;
    background: transparent;
  }

  input {
    appearance: none;
    outline: none;
    border: none;
    font-family: Inter;
  }

  @media(max-width: 720px) {
    h1 {
    font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 16px;
    }

    h4 {
      font-size: 14px;
    }

    p {
      font-size: 12px;
    }
  }
  
`;
