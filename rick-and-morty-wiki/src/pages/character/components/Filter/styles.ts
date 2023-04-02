import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 64px;

  .category,
  .filters {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    .category {
      width: 100%;
      flex-direction: column;

      .filters {
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
      }
    }
  }
`;
