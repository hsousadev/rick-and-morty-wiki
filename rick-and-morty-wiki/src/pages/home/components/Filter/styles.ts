import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 16px;
  }
`;
