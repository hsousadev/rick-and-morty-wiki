import styled from "styled-components";

export const Container = styled.div`
  max-width: var(--MAX-CONTENT-WIDTH);
  transition: all 0.4s ease-in-out;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  padding: 16px 0 32px 0;

  img {
    transition: all 0.4s ease-in-out;
    border-radius: 16px;
    object-fit: cover;
  }

  .character-info {
    transition: all 0.4s ease-in-out;
    margin-left: 64px;
    width: 100%;

    h1,
    h3 {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    h1 {
      margin-bottom: 32px;
      gap: 16px;
    }

    h3 {
      font-weight: 300;
      gap: 8px;
    }

    .details {
      margin: 48px 0 32px 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 24px;
    }

    .cards {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;
      gap: 32px;
    }
  }
`;
