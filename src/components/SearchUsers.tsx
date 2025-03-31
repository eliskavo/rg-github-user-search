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
};

export const SearchUsers: React.FC<UserSearchProps> = ({
  onUserClick,
}: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const fetchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`
      );
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch users. Please try again.");
      setUsers([]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const { currentData, emptyRows, paginationControls } = usePagination({
    data: users,
    itemsPerPage: 6,
    initialPage: 1,
  });

  useEffect(() => {
    if (searchQuery) {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <>
        <div className="flex justify-between gap-4">
          <SearchInput
            onSearch={handleSearchUpdate}
            value={searchQuery}
            placeholder="Search GitHub users"
            aria-label="Search GitHub users"
          />
        </div>
        <div className="flex justify-center py-8 mt-10">
          <p className="text-2xl">Loading users...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex justify-between gap-4">
          <SearchInput
            onSearch={handleSearchUpdate}
            value={searchQuery}
            placeholder="Search GitHub users"
            aria-label="Search GitHub users"
          />
        </div>
        <div className="flex justify-center py-8 mt-10">
          <p className="text-2xl">{error}</p>
        </div>
      </>
    );
  }

  if (!searchQuery) {
    return (
      <>
        <div className="flex justify-between gap-4">
          <SearchInput
            onSearch={handleSearchUpdate}
            value={searchQuery}
            placeholder="Search GitHub users"
            aria-label="Search GitHub users"
          />
        </div>
        <div className="flex justify-center py-8 mt-10">
          <p className="text-xl text-gray-500 text-center sm:text-2xl">
            Start searching for GitHub users
          </p>
        </div>
      </>
    );
  }

  if (users.length === 0 && !isTyping) {
    return (
      <>
        <div className="flex justify-between gap-4">
          <SearchInput
            onSearch={handleSearchUpdate}
            value={searchQuery}
            placeholder="Search GitHub users"
            aria-label="Search GitHub users"
          />
        </div>
        <div className="flex justify-center py-8 mt-10">
          <p className="text-2xl">No users found matching "{searchQuery}"</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between gap-4">
        <SearchInput
          onSearch={handleSearchUpdate}
          value={searchQuery}
          placeholder="Search GitHub users"
          aria-label="Search GitHub users"
        />
      </div>

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
                <h1>{user.login}</h1>
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

      <nav aria-label="Search results pagination">{paginationControls}</nav>
    </>
  );
};
