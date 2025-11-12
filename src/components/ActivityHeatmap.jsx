import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ActivityHeatmap = ({ username = 'Brun05ouza' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const headers = {
          'Accept': 'application/vnd.github.v3+json'
        };
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers });
        const events = await eventsResponse.json();
        
        if (!Array.isArray(events)) {
          throw new Error('Invalid response format');
        }
        
        const contributionMap = new Map();
        const today = new Date();
        
        // Inicializar todos os dias
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          contributionMap.set(dateStr, 0);
        }
        
        // Contar eventos por dia
        events.forEach(event => {
          const eventDate = new Date(event.created_at).toISOString().split('T')[0];
          if (contributionMap.has(eventDate)) {
            contributionMap.set(eventDate, contributionMap.get(eventDate) + 1);
          }
        });
        
        // Converter para array com níveis
        const contributionData = Array.from(contributionMap.entries()).map(([date, count]) => {
          let level = 0;
          if (count > 0) level = 1;
          if (count > 2) level = 2;
          if (count > 4) level = 3;
          if (count > 6) level = 4;
          
          return { date, count, level };
        });
        
        setData(contributionData);
      } catch (error) {
        console.error('Erro:', error);
        
        // Dados simulados como fallback
        const fallbackData = [];
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const activity = Math.floor(Math.random() * 5);
          fallbackData.push({
            date: date.toISOString().split('T')[0],
            count: activity,
            level: activity
          });
        }
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Atividade de Desenvolvimento
        </h3>
        <div className="animate-pulse h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const getColor = (level) => {
    const colors = [
      'bg-gray-200 dark:bg-gray-800',
      'bg-green-200 dark:bg-green-900',
      'bg-green-300 dark:bg-green-700',
      'bg-green-400 dark:bg-green-600',
      'bg-green-500 dark:bg-green-500'
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Atividade de Desenvolvimento
      </h3>
      
      <div className="flex gap-0.5 sm:gap-1 overflow-x-auto pb-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5 sm:gap-1 flex-shrink-0">
            {week.map((day, dayIndex) => (
              <motion.div
                key={day.date}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getColor(day.level)} hover:ring-1 sm:hover:ring-2 hover:ring-primary-500 cursor-pointer`}
                title={`${day.date}: ${day.count} contribuições`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        <span>Menos</span>
        <div className="flex gap-0.5 sm:gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getColor(level)}`} />
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;