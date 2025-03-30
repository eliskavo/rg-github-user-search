import { useState } from "react";
import { Layout } from "./components/Layout.tsx";
import { WidgetContainer } from "./components/WidgetContainer.tsx";
import { SearchUsers } from "./components/SearchUsers.tsx";
import { UserDetail } from "./components/UserDetail.tsx";
import ChevronLeft from "./components/icons/ChevronLeft.tsx";

type User = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
};

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
  };

  return (
    <Layout>
      {selectedUser ? (
        <>
          <div className="flex items-baseline gap-2">
            <button onClick={handleCloseDetail} className="cursor-pointer">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl mb-4 md:text-4xl">User details</h1>
          </div>

          <UserDetail username={selectedUser.login} />
        </>
      ) : (
        <>
          <h1 className="text-2xl mb-4 md:text-4xl">Search GitHub users</h1>
          <WidgetContainer>
            <SearchUsers onUserClick={handleUserSelect} />
          </WidgetContainer>
        </>
      )}
    </Layout>
  );
};
