import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRepositories } from '../services/githubService';

const LiveStats = () => {
  const [stats, setStats] = useState({
    linesOfCode: 0,
    projectsCompleted: 0,
    coffeeConsumed: 350,
    hoursOfEstudo: 1200
  });

  useEffect(() => {
    // Buscar dados reais do GitHub
    const fetchGitHubStats = async () => {
      try {
        const repos = await getRepositories('Brun05ouza', 50);
        const totalRepos = repos.filter(repo => !repo.fork).length;
        
        // Simular contagem de linhas baseada nos repositórios
        const estimatedLines = totalRepos * 1500; // Média de 1500 linhas por repo
        
        setStats(prev => ({
          ...prev,
          linesOfCode: estimatedLines,
          projectsCompleted: totalRepos
        }));
      } catch (error) {
        console.error('Erro ao buscar stats do GitHub:', error);
        // Valores fallback
        setStats(prev => ({
          ...prev,
          linesOfCode: 25000,
          projectsCompleted: 15
        }));
      }
    };

    fetchGitHubStats();

    // Atualizar café a cada 30 segundos
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        coffeeConsumed: prev.coffeeConsumed + (Math.random() > 0.98 ? 1 : 0)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    { label: 'Linhas de Código', value: stats.linesOfCode.toLocaleString(), iconImage: '/assets/computador.png', color: 'text-blue-500' },
    { label: 'Projetos Concluídos', value: stats.projectsCompleted, iconImage: '/assets/foguete.png', color: 'text-green-500' },
    { label: 'Cafés Consumidos', value: stats.coffeeConsumed.toLocaleString(), iconImage: '/assets/cafe.png', color: 'text-yellow-600' },
    { label: 'Horas de Estudo', value: stats.hoursOfEstudo.toLocaleString(), iconImage: '/assets/relogio.png', color: 'text-purple-500' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="text-3xl mb-2">
            {stat.iconImage ? (
              <img 
                src={stat.iconImage} 
                alt={stat.label}
                className="w-8 h-8 mx-auto object-contain"
              />
            ) : (
              stat.icon
            )}
          </div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveStats;