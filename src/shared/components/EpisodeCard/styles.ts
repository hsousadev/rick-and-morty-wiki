import styled from "styled-components";

export const Container = styled.div`
  transition: all 0.4s ease-in-out;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  border-radius: 8px;
  padding: 16px;
  background-color: var(--CARD-BACKGROUND);
  width: 232px;

  gap: 8px;

  :hover {
    transition: all 0.4s ease-in-out;
    background-color: var(--CARD-BACKGROUND-HOVER);
  }

  div:nth-child(1) {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    h4 {
      width: 80%;
      margin-left: 8px;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;
