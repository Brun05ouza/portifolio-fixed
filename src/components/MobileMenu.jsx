import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Início', href: '/', iconImage: '/assets/casa.png' },
    { name: 'Projetos', href: '/projetos', iconImage: '/assets/projetos.png' },
    { name: 'Dashboard', href: '/dashboard', iconImage: '/assets/dashboard-tel.png' },
    { name: 'Blog', href: '/blog', iconImage: '/assets/blog.png' },
    { name: 'Contato', href: '/contato', iconImage: '/assets/telefone-tel.png' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl md:hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>
              
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                        location.pathname === item.href
                          ? 'bg-primary-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <img 
                        src={item.iconImage} 
                        alt={item.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;