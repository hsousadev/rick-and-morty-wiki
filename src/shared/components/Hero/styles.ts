import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);

  .episode {
    h1 {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      gap: 16px;
      margin: 24px 0;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 24px;
    margin-bottom: 72px;

    h3 {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      font-weight: 300;
      gap: 8px;
    }
  }

  .characters {
    margin-bottom: 40px;

    h3 {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      font-weight: 300;
      gap: 8px;
    }
  }

  @media (max-width: 1360px) {
    padding: 64px;
  }
`;
