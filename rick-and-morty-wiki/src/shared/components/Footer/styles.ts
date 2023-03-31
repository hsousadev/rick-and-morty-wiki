import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1240px;

  border-top: 1px solid var(--FONT-COLOR);

  .logo-and-return-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 7.5rem 0 4rem 0;
    border-bottom: 1px solid var(--FONT-COLOR);

    .return-top {
      button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        gap: 0.5rem;

        :hover {
          svg {
            transition: all 0.4s ease-in-out;
            transform: rotate(360deg);
          }

          h4 {
            transition: all 0.4s ease-in-out;
          }
        }
      }
    }
  }

  .copyrights {
    padding: 1.5rem 0 4rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--FONT-COLOR);

      strong {
        color: var(--BLUE-A);
      }
    }

    a:hover {
      transition: all 0.4s ease-in-out;
      border-bottom: 1px solid var(--BLUE-A);
    }
  }

  @media (max-width: 768px) {
    .logo-and-return-top {
      flex-direction: column-reverse;
      gap: 2rem;
      padding: 2rem;
    }

    .copyrights {
      flex-direction: column;
      gap: 1rem;

      h4 {
        text-align: center;
      }
    }
  }

  @media (max-width: 375px) {
    h4 {
      flex-direction: column;
    }
  }
`;
