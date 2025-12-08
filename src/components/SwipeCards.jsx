import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SwipeCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const cards = [
    { title: 'HTML & CSS', desc: 'Estrutura e estilo', iconImage: '/assets/html.png', color: 'bg-orange-500' },
    { title: 'JavaScript', desc: 'Lógica e interação', iconImage: '/assets/javascript.png', color: 'bg-yellow-500' },
    { title: 'React', desc: 'Componentes modernos', iconImage: '/assets/react.png', color: 'bg-blue-500' },
    { title: 'Bancos de Dados', desc: 'PostgreSQL & SQL Server', iconImage: '/assets/postgre.png', color: 'bg-green-500' }
  ];

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="relative h-56 w-full max-w-sm mx-auto mb-12">
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
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl cursor-grab active:cursor-grabbing border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center h-full flex flex-col justify-center">
            <div className={`mb-4 flex justify-center items-center w-20 h-20 mx-auto rounded-full ${cards[currentIndex].color} bg-opacity-20 dark:bg-opacity-30`}>
              <img 
                src={cards[currentIndex].iconImage} 
                alt={cards[currentIndex].title}
                className="w-12 h-12 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{cards[currentIndex].title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{cards[currentIndex].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary-500 scale-125' : 'bg-gray-400 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeCards;