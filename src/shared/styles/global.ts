import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --PORTAL-CYAN: #00b5cc;
    --PORTAL-LIME: #b6de3c;
    --PORTAL-LIME-FILL: #b6de3c;
    --ACCENT-TEXT: #b6de3c;
    --CHAOS-PINK: #e23a8a;
    --ALIVE: #b6de3c;
    --DEAD: #e24b4b;
    --UNKNOWN: #8b90a8;
    --MAX-CONTENT-WIDTH: 1240px;
    --FONT-DISPLAY: "Fredoka", sans-serif;
    --FONT-BODY: "Nunito", sans-serif;
    --RADIUS-CARD: 28px;
    --INK: #0b1020;
  }

  html,
  html[data-theme="dark"] {
    --PAGE-BG: #0b1020;
    --PAGE-BG-ALT: #14182a;
    --FONT-COLOR: #f4f1e8;
    --FONT-MUTED: #c5c8d6;
    --CARD-BACKGROUND: #1a2040;
    --CARD-BACKGROUND-HOVER: #242b52;
    --BTN-BACKGROUND: #1a2040;
    --PAPER: #1a2040;
    --INK: #06101c;
    --HERO-BAND: #070b18;
  }

  html[data-theme="light"] {
    --PAGE-BG: #f4ead0;
    --PAGE-BG-ALT: #efe3c0;
    --FONT-COLOR: #1a1630;
    --FONT-MUTED: #4a4660;
    --CARD-BACKGROUND: #fff8e8;
    --CARD-BACKGROUND-HOVER: #ffe9b8;
    --BTN-BACKGROUND: #fff8e8;
    --PAPER: #fff8e8;
    --INK: #1a1630;
    --HERO-BAND: #ffe27a;
    --PORTAL-LIME: #4a7608;
    --ACCENT-TEXT: #3d6b00;
  }

  html,
  body,
  #__next {
    margin: 0;
    padding: 0;
    min-height: 100%;
    font-family: var(--FONT-BODY);
    background-color: var(--PAGE-BG);
    color: var(--FONT-COLOR);
  }

  body {
    overflow-x: hidden;
  }

  body {
    background-image:
      radial-gradient(circle at 12% 8%, color-mix(in srgb, var(--PORTAL-CYAN) 18%, transparent), transparent 32%),
      radial-gradient(circle at 88% 12%, color-mix(in srgb, var(--PORTAL-LIME) 16%, transparent), transparent 28%);
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
    margin: 0;
    color: var(--FONT-COLOR);
  }

  h1, h2, h3 {
    font-family: var(--FONT-DISPLAY);
    letter-spacing: -0.03em;
  }

  h1 {
    font-weight: 700;
    font-size: 56px;
    line-height: 1.05;
  }

  h2 {
    font-weight: 600;
    font-size: 32px;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
  }

  h4, p {
    font-family: var(--FONT-BODY);
    font-weight: 600;
    font-size: 16px;
  }

  p {
    font-weight: 500;
    font-size: 15px;
  }

  button {
    cursor: pointer;
    appearance: none;
    border: none;
    background: transparent;
    font-family: inherit;
    color: inherit;
  }

  button:focus,
  input:focus,
  a:focus {
    outline: none;
  }

  button:focus-visible,
  input:focus-visible,
  a:focus-visible,
  [tabindex]:focus-visible {
    outline: 3px solid var(--PORTAL-CYAN);
    outline-offset: 3px;
  }

  input {
    appearance: none;
    outline: none;
    border: none;
    font-family: var(--FONT-BODY);
    color: var(--FONT-COLOR);
  }

  input::placeholder {
    color: var(--FONT-MUTED);
    opacity: 1;
  }

  img {
    max-width: 100%;
  }

  @keyframes portal-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes wobble {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }

  .theme-phrase {
    animation: wobble 2.8s ease-in-out infinite;
    display: inline-block;
  }

  @media (max-width: 720px) {
    h1 { font-size: 36px; }
    h2 { font-size: 24px; }
    h3 { font-size: 18px; }
    h4 { font-size: 14px; }
    p { font-size: 13px; }
  }
`;
