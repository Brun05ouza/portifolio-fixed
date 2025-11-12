import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SwipeCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const cards = [
    { title: 'HTML & CSS', desc: 'Estrutura e estilo', icon: '🎨', color: 'bg-orange-500' },
    { title: 'JavaScript', desc: 'Lógica e interação', icon: '⚡', color: 'bg-yellow-500' },
    { title: 'React', desc: 'Componentes modernos', icon: '⚛️', color: 'bg-blue-500' },
    { title: 'Bancos de Dados', desc: 'PostgreSQL & SQL Server', icon: '🗄️', color: 'bg-green-500' }
  ];

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="relative h-64 w-full max-w-sm mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, { offset }) => {
            if (offset.x > 100) prevCard();
            else if (offset.x < -100) nextCard();
          }}
          className={`absolute inset-0 ${cards[currentIndex].color} rounded-2xl p-6 text-white shadow-2xl cursor-grab active:cursor-grabbing`}
        >
          <div className="text-center h-full flex flex-col justify-center">
            <div className="text-4xl mb-4">{cards[currentIndex].icon}</div>
            <h3 className="text-xl font-bold mb-2">{cards[currentIndex].title}</h3>
            <p className="text-sm opacity-90">{cards[currentIndex].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeCards;