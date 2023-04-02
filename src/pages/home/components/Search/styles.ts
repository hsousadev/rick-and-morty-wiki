import styled, { css } from "styled-components";

interface ContatinerProps {
  isDarkTheme: boolean;
}

export const Container = styled.div<ContatinerProps>`
  transition: all 0.4s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 405px;
  height: 48px;

  border-radius: 32px;
  padding: 12px 16px;

  ${(props) =>
    props.isDarkTheme
      ? css`
          background: #1a1a1a;
        `
      : css`
          background: transparent;
          border: 1px solid var(--FONT-COLOR);
        `}

  input {
    background: transparent;
    width: 100%;
    color: var(--FONT-COLOR);
  }

  input[type="search"] {
    appearance: none;
    font-size: 16px;
  }

  @media (max-width: 580px) {
    width: 100%;
  }
`;
