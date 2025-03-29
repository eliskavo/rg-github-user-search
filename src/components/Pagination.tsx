import { useState, useMemo } from "react";
import Button from "./Button.tsx";
import ArrowLeft from "../components/icons/ArrowLeft";
import ArrowRight from "../components/icons/ArrowRight";

type UserProps = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
};

interface PaginationProps {
  data: UserProps[];
  itemsPerPage?: number;
  initialPage: number;
}

export function Pagination({
  data,
  itemsPerPage = 6,
  initialPage = 1,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
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

  return (
    <>
      <ul className="list-none p-0">
        {currentData.map((user) => (
          <li
            key={user.id}
            className="flex gap-8 p-2 border-essential-black border-b-2 h-24 items-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="rounded-full w-12 h-12"
            />
            <div className="flex flex-col">
              <h2>{user.login}</h2>
              <div>
                <p>{user.url}</p>
              </div>
            </div>
          </li>
        ))}

        {emptyRows.map((emptyRow) => (
          <li
            key={emptyRow.id}
            className="flex gap-8 p-2 border-essential-black border-b-2 h-24 items-center"
          >
            <div className="flex flex-col">
              <h2>&nbsp;</h2>
              <p>&nbsp;</p>
            </div>
          </li>
        ))}
      </ul>

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
    </>
  );
}
