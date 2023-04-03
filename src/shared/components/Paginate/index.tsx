import { useContext } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";

import { Icons } from "./icons";

import { Container } from "./styles";
import { GlobalContext } from "@/pages/_app.page";

interface PaginateProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Paginate = ({ pageCount, onPageChange }: PaginateProps) => {
  const { darkTheme } = useContext(GlobalContext);

  return (
    <Container>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        nextLabel={
          <Image
            width={32}
            height={32}
            src={darkTheme ? Icons.WhiteCaretRight : Icons.DarkCaretRight}
            alt=""
          />
        }
        previousLabel={
          <Image
            width={32}
            height={32}
            src={darkTheme ? Icons.WhiteCaretLeft : Icons.DarkCaretLeft}
            alt=""
          />
        }
        pageRangeDisplayed={1}
      />
    </Container>
  );
};

export default Paginate;

{
}
