import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
`;

export const Content = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);
  width: 100%;

  .episodes {
    display: grid;
    align-items: center;
    justify-content: space-between;

    grid-template-columns: repeat(5, 1fr);

    width: 100%;
    gap: 16px;
  }

  @media (max-width: 1360px) {
    padding: 24px 64px;

    .episodes {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  border-bottom: 1px solid var(--BLUE-A);
`;
