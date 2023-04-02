import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  max-width: var(--MAX-CONTENT-WIDTH);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 64px 0;

  .filter {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
  }

  .section-and-delete {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    width: 100%;
  }

  .characters,
  .episodes,
  .locations {
    display: grid;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 100%;
    margin-top: 24px;

    gap: 16px;
  }

  .characters {
    grid-template-columns: repeat(4, 1fr);
  }
  .episodes {
    grid-template-columns: repeat(5, 1fr);
  }
  .locations {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (max-width: 1360px) {
    .filter,
    .section-and-delete {
      padding: 0 64px;
    }

    .section-and-delete {
      #characters {
        width: auto;
      }
    }

    .characters,
    .episodes,
    .locations {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;

      flex-wrap: wrap;
      padding: 0 64px;
    }
  }

  @media (max-width: 580px) {
    padding: 32px 0;

    .filter {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .section-and-delete {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 32px;
    }

    .characters,
    .episodes,
    .locations {
      justify-content: center;
    }

    #characters,
    #episodes,
    #locations {
      width: auto;
      flex-direction: column;
    }
  }
`;

export const HeroContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--BLUE-A);
`;
