import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Content = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .more-character {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;
    padding: 48px 0 64px 0;
    gap: 16px;
  }

  .characters {
    display: grid;
    align-items: center;
    justify-content: space-between;

    grid-template-columns: repeat(4, 1fr);

    width: 100%;
    gap: 16px;
  }
`;

export const HeroContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: solid var(--BLUE-A);
`;
