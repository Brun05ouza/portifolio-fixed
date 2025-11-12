import { useState, useEffect } from 'react';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    visitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionTime: 0
  });

  useEffect(() => {
    // Simula dados de analytics em tempo real
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        bounceRate: Math.max(0, Math.min(100, prev.bounceRate + (Math.random() - 0.5) * 2)),
        avgSessionTime: Math.max(0, prev.avgSessionTime + (Math.random() - 0.5) * 10)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return analytics;
};