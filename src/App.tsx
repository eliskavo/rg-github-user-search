import { useState, useEffect } from "react";
import Layout from "./components/Layout.tsx";
import { WidgetContainer } from "./components/WidgetContainer.tsx";
import SearchInput from "./components/SearchInput.tsx";
import Button from "./components/Button.tsx";

type UserProps = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

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
          <Button
            kind="primary"
            onClick={() => console.log(searchQuery)}
            type="button"
            className="hidden sm:flex"
          >
            Search
          </Button>
        </div>
        {message}

        {users
          ? users.map((user: UserProps) => (
              <li
                key={user.id}
                className="flex gap-8 p-2 border-essential-black border-b-2"
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
            ))
          : "No users"}
      </WidgetContainer>
    </Layout>
  );
}
