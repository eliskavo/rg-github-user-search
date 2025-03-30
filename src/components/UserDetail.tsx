import { useState, useEffect } from "react";
import { WidgetContainer } from "./WidgetContainer";
import { usePagination } from "../hooks/usePagination";

type UserDetailProps = {
  username: string;
  onClose?: () => void;
};

type UserDetail = {
  id: number;
  username: string;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
};

type Repos = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

export const UserDetail: React.FC<UserDetailProps> = ({
  username,
  onClose,
}) => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<Repos[]>([]);

  const { currentData, emptyRows, paginationControls } = usePagination({
    data: repos,
    itemsPerPage: 6,
    initialPage: 1,
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );

        if (response) {
          const data = await response.json();
          setUserDetail(data);

          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos`
          );
          const reposData = await reposResponse.json();
          setRepos(reposData);
        }
      } catch (error) {
        setError("Error fetching user details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [username]);

  if (loading) {
    return (
      <h2 className="text-xl font-semibold mb-4">Loading user details...</h2>
    );
  }

  if (error || !userDetail) {
    return (
      <div>
        <p>{error ?? "Failed to load user details"}</p>
        <button onClick={onClose}>Back to search</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/3">
        <WidgetContainer>
          <div>
            <img
              src={userDetail.avatar_url}
              alt={userDetail.login}
              className=" w-full h-auto"
            />
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-3xl mt-4">{userDetail.name}</h2>
                <p className="text-xl text-gray-500">{userDetail.login}</p>
                <p className="text-gray-500 text-sm">
                  {userDetail.followers} followers · {userDetail.following}{" "}
                  following
                </p>
              </div>

              <div className="flex flex-col">
                {userDetail.bio && <p>{userDetail.bio}</p>}
                {userDetail.location && <p>Location: {userDetail.location}</p>}
              </div>
            </div>
          </div>
        </WidgetContainer>
      </div>

      <div className="w-full sm:w-2/3">
        <WidgetContainer>
          <h1 className="text-2xl mb-6 sm:text-4xl">Repositories</h1>
          {repos.length > 0 ? (
            <div>
              {currentData.map((repo) => (
                <ul
                  key={repo.id}
                  className="py-4 border-essential-black border-b-2 h-22 hover:bg-gray-900
                "
                >
                  <li className="flex justify-between">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-essential-white text-xl w-full"
                    >
                      {repo.name}

                      {repo.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {repo.description}
                        </p>
                      )}
                    </a>
                  </li>
                </ul>
              ))}

              {emptyRows.map((emptyRow) => (
                <li
                  key={emptyRow.id}
                  className="flex gap-8 p-2 border-essential-black border-b-2 h-22 items-center"
                >
                  <div className="flex flex-col">
                    <h2>&nbsp;</h2>
                    <p>&nbsp;</p>
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <p className="text-2xl">No public repositories found :O </p>
          )}
          <nav className="mt-6" aria-label="Search results pagination">
            {paginationControls}
          </nav>
        </WidgetContainer>
      </div>
    </div>
  );
};
