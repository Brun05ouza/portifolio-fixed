import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300"
    >
      <motion.div
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <img 
            src="/assets/lua.svg" 
            alt="Moon"
            className="w-4 h-4 object-contain"
          />
        ) : (
          <img 
            src="/assets/sol.jpg" 
            alt="Sun"
            className="w-4 h-4 object-contain rounded-full"
          />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;