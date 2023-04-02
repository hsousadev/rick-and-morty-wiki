import styled from "styled-components";

export const Container = styled.div`
  ul {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    gap: 16px;
    margin: 64px 0 64px 0;
    padding: 0;

    list-style: none;

    color: black;

    li {
      border-radius: 50%;

      width: max-content;
      cursor: pointer;

      width: 48px;
      height: 48px;

      font-size: 16px;
      line-height: 20px;
      border: 1px solid var(--FONT-COLOR);

      a {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        width: 100%;

        color: var(--FONT-COLOR);
      }

      &.selected {
        color: #fff;
        background: var(--BLUE-A);
        border: none;
      }

      &.previous,
      &.next {
        background: none;
        font-size: 32px;
        border: none;
      }
    }
  }

  @media (max-width: 720px) {
    ul {
      li {
        width: 32px;
        height: 32px;
      }
    }
  }

  @media (max-width: 500px) {
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 0;
      width: 100%;
    }
  }
`;
