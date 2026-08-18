import styled, { css } from "styled-components";
import { carouselOnMobile } from "@/shared/styles/mixins";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const HeroContent = styled.div<{ $isDarkTheme: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px 32px;
  background: var(--HERO-BAND);
  border-bottom: 3px solid var(--INK);

  ${(props) =>
    !props.$isDarkTheme &&
    css`
      background-image: repeating-linear-gradient(
        -12deg,
        transparent,
        transparent 12px,
        color-mix(in srgb, var(--INK) 6%, transparent) 12px,
        color-mix(in srgb, var(--INK) 6%, transparent) 13px
      );
    `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 48px 24px 80px;
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;

  .search-and-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
    flex-wrap: wrap;
  }

  .characters,
  .episodes,
  .locations {
    display: grid;
    width: 100%;
    margin-top: 24px;
    gap: 24px;
  }

  .characters {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    ${carouselOnMobile("min(78vw, 280px)")}
  }

  .episodes {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    ${carouselOnMobile("min(72vw, 240px)")}
  }

  .locations {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    ${carouselOnMobile("min(48vw, 180px)")}
  }

  .section-block {
    width: 100%;
  }
`;
