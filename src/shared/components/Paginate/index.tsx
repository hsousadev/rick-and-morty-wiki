import ReactPaginate from "react-paginate";
import Image from "next/image";
import styled from "styled-components";
import { Icons } from "./icons";
import { useTheme } from "@/shared/context/ThemeContext";

type PaginateProps = {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
};

const Container = styled.div`
  width: 100%;

  ul {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
    margin: 40px 0;
    padding: 0;
    list-style: none;
  }

  li {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    border: 3px solid var(--INK);
    box-shadow: 3px 3px 0 var(--INK);
    background: var(--CARD-BACKGROUND);
    cursor: pointer;
    overflow: hidden;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      color: var(--FONT-COLOR);
      font-family: var(--FONT-DISPLAY);
      font-weight: 700;
    }

    &.selected {
      background: var(--PORTAL-CYAN);

      a {
        color: #06101c;
      }
    }

    &.previous,
    &.next {
      background: var(--PORTAL-LIME);
      border-radius: 999px;
    }

    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }

  @media (max-width: 720px) {
    li {
      width: 40px;
      height: 40px;
    }
  }
`;

export default function Paginate({
  pageCount,
  onPageChange,
  forcePage,
}: PaginateProps) {
  const { darkTheme } = useTheme();

  if (pageCount <= 1) return null;

  return (
    <Container>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        forcePage={forcePage}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        nextLabel={
          <Image
            width={24}
            height={24}
            src={darkTheme ? Icons.WhiteCaretRight : Icons.DarkCaretRight}
            alt="Próxima"
          />
        }
        previousLabel={
          <Image
            width={24}
            height={24}
            src={darkTheme ? Icons.WhiteCaretLeft : Icons.DarkCaretLeft}
            alt="Anterior"
          />
        }
      />
    </Container>
  );
}
