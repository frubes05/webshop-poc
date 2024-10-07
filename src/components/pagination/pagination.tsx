import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginateProps {
    onPageChange: (elem: number) => void;
    totalPages: number;
    currentPage: number;
}

const Paginate = ({ onPageChange, totalPages, currentPage }: PaginateProps) => {
  const pagesToRender = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  
  return (
    <Pagination className="my-8">
      <PaginationContent>
        {pagesToRender.map((page, i) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => onPageChange(page)}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
