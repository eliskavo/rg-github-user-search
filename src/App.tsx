import { useState, useEffect } from "react";
import Layout from "./components/Layout.tsx";
import { WidgetContainer } from "./components/WidgetContainer.tsx";
import SearchInput from "./components/SearchInput.tsx";
import mockUsersData from "././assets/mockdata.json";
import { Pagination } from "./components/Pagination.tsx";

type UserProps = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);

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

  useEffect(() => {
    if (searchQuery) {
      fetchUsers(searchQuery);
    } else {
      setMessage("Start searching users");
    }
  }, [searchQuery]);

  return (
    <Layout>
      <h1 className="text-2xl mb-4 md:text-4xl">Search GitHub users</h1>
      <WidgetContainer>
        <div className="flex justify-between gap-4">
          <SearchInput
            onSearch={handleSearchUpdate}
            value={searchQuery}
            placeholder="Search GitHub users"
          />
        </div>

        {/* {users && users.length > 0 ? (
          <Pagination data={users} itemsPerPage={6} initialPage={1} />
        ) : (
          <p>{message || "No users found"}</p>
        )} */}

        {mockUsersData.items && mockUsersData.items.length > 0 ? (
          <Pagination
            data={mockUsersData.items}
            itemsPerPage={6}
            initialPage={1}
          />
        ) : (
          <p>{message}</p>
        )}
      </WidgetContainer>
    </Layout>
  );
}
