import { motion } from 'framer-motion';
import { useState } from 'react';

const SkillsRadar = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const skills = {
    frontend: [
      { name: 'HTML', level: 85, color: 'bg-orange-500' },
      { name: 'CSS', level: 80, color: 'bg-blue-500' },
      { name: 'JavaScript', level: 70, color: 'bg-yellow-500' },
      { name: 'React', level: 60, color: 'bg-blue-600' },
      { name: 'Vite', level: 55, color: 'bg-purple-500' }
    ],
    backend: [
      { name: 'PostgreSQL', level: 65, color: 'bg-blue-700' },
      { name: 'SQL Server', level: 60, color: 'bg-red-600' },
      { name: 'APIs REST', level: 45, color: 'bg-purple-600' },
      { name: 'Node.js', level: 40, color: 'bg-green-600' },
      { name: 'Python', level: 35, color: 'bg-yellow-600' }
    ],
    estudando: [
      { name: 'MongoDB', level: 35, color: 'bg-green-500' },
      { name: 'TypeScript', level: 30, color: 'bg-blue-400' },
      { name: 'Next.js', level: 25, color: 'bg-gray-600' },
      { name: 'Docker', level: 20, color: 'bg-blue-300' },
      { name: 'AWS', level: 15, color: 'bg-orange-400' }
    ]
  };

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' },
    { id: 'estudando', name: 'Estudando', icon: '📚' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Skills Técnicas
      </h3>
      
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <span className="mr-1 sm:mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {skills[selectedCategory].map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                {skill.name}
              </span>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-4 rounded-full ${skill.color} relative overflow-hidden shadow-md`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;