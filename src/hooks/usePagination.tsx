import { useState, useMemo } from "react";
import { Button } from "../components/Button.tsx";
import ArrowLeft from "../components/icons/ArrowLeft.tsx";
import ArrowRight from "../components/icons/ArrowRight.tsx";

export function usePagination<T>({
  data = [],
  itemsPerPage = 6,
  initialPage = 1,
}: {
  data?: T[];
  itemsPerPage?: number;
  initialPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const currentItemsCount = currentData.length;
  const emptyRowsCount = Math.max(0, itemsPerPage - currentItemsCount);

  const emptyRows = useMemo(() => {
    return Array(emptyRowsCount)
      .fill(null)
      .map((_, index) => ({
        id: `empty-${index}`,
        isEmpty: true,
      }));
  }, [emptyRowsCount]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginationControls = (
    <div className="mt-4 grid grid-cols-3 items-center">
      <div className="hidden md:block"></div>
      <div className="col-span-3 flex items-center justify-center md:col-span-1">
        <div className="flex items-center gap-2">
          <Button
            kind="secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <span className="text-[14px] text-gray-300">
            {startItem}-{endItem} of {totalItems}
          </span>

          <Button
            kind="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-8 w-8"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return {
    currentData,
    emptyRows,
    paginationControls,
  };
}
