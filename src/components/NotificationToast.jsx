import { motion, AnimatePresence } from 'framer-motion';

const NotificationToast = ({ notifications, removeNotification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500 border-green-600';
      case 'error': return 'bg-red-500 border-red-600';
      case 'warning': return 'bg-yellow-500 border-yellow-600';
      default: return 'bg-blue-500 border-blue-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            className={`${getColors(notification.type)} text-white px-4 py-3 rounded-lg shadow-lg border-l-4 max-w-sm cursor-pointer`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getIcon(notification.type)}</span>
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;