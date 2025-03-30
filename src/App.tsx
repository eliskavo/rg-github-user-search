import { useState } from "react";
import { Layout } from "./components/Layout.tsx";
import { WidgetContainer } from "./components/WidgetContainer.tsx";
import { SearchUsers } from "./components/SearchUsers.tsx";
import { UserDetail } from "./components/UserDetail.tsx";
import ChevronLeft from "./components/icons/ChevronLeft.tsx";
import { Repositories } from "./components/Repositories.tsx";

type User = {
  login: string;
};

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
  };

  const reloadPage = () => {
    window.location.reload();
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <WidgetContainer>
                <UserDetail username={selectedUser.login} />
              </WidgetContainer>
            </div>
            <div className="w-full sm:w-2/3">
              <WidgetContainer>
                <Repositories username={selectedUser.login} />
              </WidgetContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="text-2xl mb-4 md:text-4xl cursor-pointer"
            onClick={reloadPage}
          >
            Search GitHub users
          </button>
          <WidgetContainer>
            <SearchUsers onUserClick={handleUserSelect} />
          </WidgetContainer>
        </>
      )}
    </Layout>
  );
};
