import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import analyticsService from '../services/analyticsService';

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);
  const [isOnline, setIsOnline] = useState(0);

  useEffect(() => {
    // Carrega dados reais
    setVisitors(analyticsService.getTotalVisits());
    setIsOnline(analyticsService.getOnlineUsers());
    
    // Atualiza dados a cada 30 segundos
    const interval = setInterval(() => {
      setVisitors(analyticsService.getTotalVisits());
      setIsOnline(analyticsService.getOnlineUsers());
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-2 sm:right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 z-40 text-xs sm:text-sm"
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {isOnline} online
          </span>
        </div>
        
        <div className="border-l border-gray-300 dark:border-gray-600 pl-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">Visitantes</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {visitors.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorCounter;