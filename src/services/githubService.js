const GITHUB_API_BASE = 'https://api.github.com';

const getHeaders = () => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  
  return headers;
};

export const getUserData = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    headers: getHeaders()
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status}`);
  }
  
  return response.json();
};

export const getRepositories = async (username, limit = 5) => {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&per_page=${limit}`,
    {
      headers: getHeaders()
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.status}`);
  }
  
  return response.json();
};

export const getCommits = async (username, repoName, limit = 30) => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${username}/${repoName}/commits?author=${username}&per_page=${limit}`,
    {
      headers: getHeaders()
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.status}`);
  }
  
  return response.json();
};