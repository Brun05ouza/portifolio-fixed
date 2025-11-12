import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = ({ username = 'Brun05ouza' }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const headers = {
          'Accept': 'application/vnd.github.v3+json'
        };
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        const userData = await userResponse.json();
        
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`, { headers });
        const reposData = await reposResponse.json();
        
        if (Array.isArray(reposData)) {
          setStats({
            followers: userData.followers || 0,
            following: userData.following || 0,
            publicRepos: userData.public_repos || 0,
            totalStars: reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
          });
          
          setRepos(reposData.map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count || 0,
            language: repo.language || 'N/A',
            description: repo.description || 'Sem descrição',
            url: repo.html_url
          })));
        }
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
      }
    };
    
    fetchGitHubData();
  }, [username]);

  if (!stats) return <div className="animate-pulse">Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats && Object.entries(stats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-lg"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </motion.div>
        ))}
      </div>

      {repos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Repositórios em Destaque
          </h3>
          {repos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => window.open(repo.url, '_blank')}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {repo.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {repo.description}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {repo.language}
                </span>
                <span className="text-xs text-gray-500">⭐ {repo.stars}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GitHubStats;