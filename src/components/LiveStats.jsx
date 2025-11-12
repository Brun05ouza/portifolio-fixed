import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LiveStats = () => {
  const [stats, setStats] = useState({
    linesOfCode: 12584,
    projectsCompleted: 8,
    coffeeConsumed: 247,
    hoursOfEstudo: 520
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 10),
        projectsCompleted: prev.projectsCompleted + (Math.random() > 0.99 ? 1 : 0),
        coffeeConsumed: prev.coffeeConsumed + (Math.random() > 0.95 ? 1 : 0),
        hoursOfEstudo: prev.hoursOfEstudo + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 2000);

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