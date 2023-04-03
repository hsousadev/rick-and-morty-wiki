import styled from "styled-components";

export const Container = styled.div`
  transition: all 0.4s ease-in-out;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;

  border-radius: 8px;
  padding: 16px;
  background-color: var(--CARD-BACKGROUND);
  width: 294px;

  :hover {
    transition: all 0.4s ease-in-out;
    background-color: var(--CARD-BACKGROUND-HOVER);
  }

  > img {
    width: 100%;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 16px;
  }

  .character-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    .info {
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      p.name {
        font-weight: bold;
        margin-bottom: 16px;
      }

      div {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 8px;
      }
    }
  }
`;
