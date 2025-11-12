import { motion } from 'framer-motion';
import { useAnalytics } from '../hooks/useAnalytics';
import { measurePerformance, getMemoryUsage } from '../utils/performance';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const analytics = useAnalytics();
  const [performance, setPerformance] = useState(null);
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    setPerformance(measurePerformance());
    setMemory(getMemoryUsage());
  }, []);

  const cards = [
    { title: 'Visitantes', value: analytics.visitors, color: 'bg-blue-500', iconImage: '/assets/pessoas.png' },
    { title: 'Page Views', value: analytics.pageViews, color: 'bg-green-500', iconImage: '/assets/postgre.png' },
    { title: 'Bounce Rate', value: `${analytics.bounceRate.toFixed(1)}%`, color: 'bg-yellow-500', iconImage: '/assets/raio.png' },
    { title: 'Tempo Médio', value: `${analytics.avgSessionTime.toFixed(0)}s`, color: 'bg-purple-500', iconImage: '/assets/relogio.png' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${card.color} rounded-lg p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            {card.iconImage ? (
              <img 
                src={card.iconImage} 
                alt={card.title}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-3xl">{card.icon}</span>
            )}
          </div>
        </motion.div>
      ))}
      
      {performance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 text-white col-span-full"
        >
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="opacity-80">Load Time</p>
              <p className="font-bold">{performance.loadTime}ms</p>
            </div>
            <div>
              <p className="opacity-80">DOM Ready</p>
              <p className="font-bold">{performance.domContentLoaded}ms</p>
            </div>
            <div>
              <p className="opacity-80">First Paint</p>
              <p className="font-bold">{performance.firstPaint}ms</p>
            </div>
            {memory && (
              <div>
                <p className="opacity-80">Memory Usage</p>
                <p className="font-bold">{memory.used}MB</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;