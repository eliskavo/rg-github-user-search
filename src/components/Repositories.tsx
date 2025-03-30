import { useState, useEffect } from "react";
import { usePagination } from "../hooks/usePagination";

type RepositoriesProps = {
  username: string;
};

type Repos = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

export const Repositories: React.FC<RepositoriesProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repos[]>([]);
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
      <h2 className="text-xl font-semibold mb-4">Loading repositories...</h2>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1 className="text-2xl mb-6 sm:text-4xl">Repositories</h1>
      {repos.length > 0 ? (
        <div>
          {currentData.map((repo) => (
            <ul
              key={repo.id}
              className="py-4 border-essential-black border-b-2 h-22 hover:bg-gray-900"
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
    </>
  );
};
