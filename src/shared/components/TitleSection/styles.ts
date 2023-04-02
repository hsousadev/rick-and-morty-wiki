import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  margin-top: 64px;

  @media (max-width: 1360px) {
    justify-content: center;
  }
`;
