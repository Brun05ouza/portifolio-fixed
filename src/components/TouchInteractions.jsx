import { motion } from 'framer-motion';
import { useState } from 'react';

const TouchInteractions = ({ children, className = "" }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={createRipple}
      onClick={createRipple}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/20 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.div>
  );
};

export default TouchInteractions;