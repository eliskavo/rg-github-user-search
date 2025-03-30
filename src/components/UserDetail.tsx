import { useState, useEffect } from "react";

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

export const UserDetail: React.FC<UserDetailProps> = ({
  username,
  onClose,
}) => {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            {userDetail.followers} followers · {userDetail.following} following
          </p>
        </div>

        <div className="flex flex-col">
          {userDetail.bio && <p>{userDetail.bio}</p>}
          {userDetail.location && <p>Location: {userDetail.location}</p>}
        </div>
      </div>
    </div>
  );
};
