import ReactPaginate from "react-paginate";

import { CaretRight, CaretLeft } from "@phosphor-icons/react";

import { Container } from "./styles";

interface PaginateProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Paginate = ({ pageCount, onPageChange }: PaginateProps) => {
  return (
    <Container>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        nextLabel={<CaretRight />}
        previousLabel={<CaretLeft />}
        pageRangeDisplayed={1}
      />
    </Container>
  );
};

export default Paginate;

{
}
