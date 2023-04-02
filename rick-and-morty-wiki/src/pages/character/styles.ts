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

  margin-bottom: 24px;

  .section-and-filter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .characters {
    display: grid;
    align-items: center;
    justify-content: space-between;

    grid-template-columns: repeat(4, 1fr);

    width: 100%;
    gap: 16px;
  }

  @media (max-width: 1360px) {
    padding: 0 64px;

    .more-section {
      padding: 32px 0;
    }

    .characters {
      display: flex;
      justify-content: center;
      flex-direction: row;

      flex-wrap: wrap;
    }
  }

  @media (max-width: 720px) {
    padding: 32px;
  }
`;

export const HeroContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid var(--BLUE-A);
`;
