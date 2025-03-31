import { useState, useEffect } from "react";
import { usePagination } from "../hooks/usePagination";

type RepositoriesProps = {
  username: string;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

export const Repositories: React.FC<RepositoriesProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentData, emptyRows, paginationControls } = usePagination({
    data: repos,
    itemsPerPage: 6,
    initialPage: 1,
  });

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (error) {
        setError("Error fetching repositories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  if (loading) {
    return (
      <>
        <h1 className="text-2xl mb-6 sm:text-4xl">Repositories</h1>
        <p className="text-xl font-semibold mb-4">Loading repositories...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1 className="text-2xl mb-6 sm:text-4xl">Repositories</h1>
        <p className="text-xl font-semibold mb-4">{error}</p>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-[500px]">
      <h1 className="text-2xl mb-6 sm:text-4xl">Repositories</h1>
      <div className="flex-grow">
        {repos.length > 0 ? (
          <div>
            {currentData.map((repo) => (
              <ul
                key={repo.id}
                className="py-2 border-essential-black flex items-center border-b-2 h-22 hover:bg-gray-900"
              >
                <li className="w-full">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-essential-white text-xl w-full"
                  >
                    {repo.name}

                    {repo.description && (
                      <p className="text-sm hidden sm:block text-gray-600 mt-1">
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
          <p className="text-2xl text-gray-500 mt-6">
            No public repositories found :({" "}
          </p>
        )}
      </div>

      {currentData.length > 0 && (
        <nav className="mt-auto pt-4" aria-label="Search results pagination">
          {paginationControls}
        </nav>
      )}
    </div>
  );
};
