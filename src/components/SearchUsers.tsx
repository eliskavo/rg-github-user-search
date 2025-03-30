import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { usePagination } from ".././hooks/usePagination";

type UserSearchProps = {
  onUserClick: (user: User) => void;
};

type User = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  name?: string;
};

export const SearchUsers: React.FC<UserSearchProps> = ({
  onUserClick,
}: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);

    if (query === "") {
      setMessage("Start searching users");
    }
  };

  const fetchUsers = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}`
      );
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const { currentData, emptyRows, paginationControls } = usePagination({
    data: users,
    itemsPerPage: 6,
    initialPage: 1,
  });

  useEffect(() => {
    if (searchQuery) {
      fetchUsers(searchQuery);
    } else {
      setMessage("Start searching users");
    }
  }, [searchQuery]);

  return (
    <>
      <div className="flex justify-between gap-4">
        <SearchInput
          onSearch={handleSearchUpdate}
          value={searchQuery}
          placeholder="Search GitHub users"
          area-label="Search GitHub users"
        />
      </div>

      {users ? (
        <ul className="list-none p-0">
          {currentData.map((user: User) => (
            <li
              key={user.id}
              className="flex p-2 border-essential-black border-b-2 h-24 items-center hover:bg-gray-900"
            >
              <button
                onClick={() => onUserClick(user)}
                className="w-full flex gap-8 items-center text-left cursor-pointer"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="rounded-full w-12 h-12"
                />
                <div className="flex flex-col">
                  <h2>{user.login}</h2>
                  <div>
                    <p>{user.name}</p>
                  </div>
                </div>
              </button>
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
      ) : (
        <p>{message}</p>
      )}

      <nav aria-label="Search results pagination">{paginationControls}</nav>
    </>
  );
};
