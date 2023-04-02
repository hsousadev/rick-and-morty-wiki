import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  padding: 48px 0 24px 0;
  gap: 16px;

  @media (max-width: 1360px) {
    padding: 32px 0;
  }

  @media (max-width: 720px) {
    padding: 0 0 32px 0;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;
