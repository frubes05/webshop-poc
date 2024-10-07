import Paginate from "@/components/pagination/pagination";
import useHomeContext from "@/hooks/home/use-home-context";

const HomePagination = () => {
  const { handlePageChange, pagination } = useHomeContext();

  return (
    <div className="flex justify-center items-center mb-12">
    <Paginate onPageChange={handlePageChange} totalPages={pagination.totalPages} currentPage={pagination.currentPage} />
    </div>
  )
}

export default HomePagination