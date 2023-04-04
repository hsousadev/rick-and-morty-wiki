import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    margin-bottom: -12%;
    z-index: 2;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  background-color: var(--CARD-BACKGROUND);

  border-radius: 16px;
  padding: 16px;
  width: 152px;
  height: 190px;

  > h4 {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  h4:nth-child(1) {
    margin-top: 8px;
  }

  h4:nth-child(2) {
    color: var(--BLUE-A);
  }

  button {
    margin-top: 16px;
  }
`;
