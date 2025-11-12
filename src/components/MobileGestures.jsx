import { motion } from 'framer-motion';
import { useState } from 'react';

const MobileGestures = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileTap={{ scale: 0.98 }}
      className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
    >
      {children}
    </motion.div>
  );
};

export default MobileGestures;