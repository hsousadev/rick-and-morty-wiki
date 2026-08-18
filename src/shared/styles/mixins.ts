import { css } from "styled-components";

export const sticker = css`
  border: 3px solid var(--INK);
  border-radius: 28px;
  box-shadow: 6px 6px 0 var(--INK);
  background: var(--CARD-BACKGROUND);
  transition:
    transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.22s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translate(-3px, -5px) rotate(-1.4deg);
    box-shadow: 10px 10px 0 var(--INK);
    background: var(--CARD-BACKGROUND-HOVER);
  }
`;

export const stampButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 14px;
  border: 3px solid var(--INK);
  border-radius: 999px;
  box-shadow: 3px 3px 0 var(--INK);
  font-family: var(--FONT-DISPLAY);
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    transform: translate(-1px, -2px) rotate(-2deg);
    box-shadow: 5px 5px 0 var(--INK);
  }

  &:active {
    transform: translate(2px, 2px) rotate(0deg);
    box-shadow: 0 0 0 var(--INK);
  }
`;

export const carouselOnMobile = (cardWidth = "min(78vw, 280px)") => css`
  @media (max-width: 860px) {
    display: flex !important;
    grid-template-columns: none !important;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 24px;
    gap: 14px;
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-right: -24px;
    padding: 6px 24px 18px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    mask-image: linear-gradient(
      90deg,
      transparent 0,
      #000 24px,
      #000 calc(100% - 28px),
      transparent 100%
    );

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      flex: 0 0 ${cardWidth};
      width: ${cardWidth};
      max-width: ${cardWidth};
      scroll-snap-align: start;
    }
  }
`;
