import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Bruno Souza Portfolio Terminal v1.0' },
    { type: 'output', text: 'Digite "help" para ver os comandos disponíveis' }
  ]);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Comandos disponíveis:',
      '• about - Informações sobre mim',
      '• skills - Minhas habilidades técnicas',
      '• projects - Lista de projetos',
      '• contact - Informações de contato',
      '• clear - Limpar terminal'
    ],
    about: () => [
      'Bruno Souza - Estudante de Desenvolvimento Web',
      'Aprendendo tecnologias modernas de programação',
      'Focado em HTML, CSS, JavaScript e React'
    ],
    skills: () => [
      'Conhecimentos: HTML, CSS, JavaScript',
      'Estudando: React, Vite, PostgreSQL',
      'Bancos: PostgreSQL, SQL Server (básico)',
      'Ferramentas: VS Code, Git (aprendendo)'
    ],
    projects: () => [
      '1. Portfolio Pessoal - React + Vite',
      '2. Landing Pages - HTML, CSS, JS',
      '3. Projetos de Estudo - Exercícios práticos'
    ],
    contact: () => [
      'Email: bruno.estudante@exemplo.com',
      'LinkedIn: linkedin.com/in/bruno-estudante',
      'GitHub: github.com/bruno-estudante'
    ],
    clear: () => {
      setHistory([]);
      return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', text: `$ ${input}` }]);
    
    if (commands[command]) {
      const output = commands[command]();
      if (output.length > 0) {
        setHistory(prev => [...prev, ...output.map(text => ({ type: 'output', text }))]);
      }
    } else if (command) {
      setHistory(prev => [...prev, { type: 'error', text: `Comando não encontrado: ${command}` }]);
    }
    
    setInput('');
  };

  useEffect(() => {
    // Scroll apenas dentro do terminal, não a página inteira
    const terminal = inputRef.current?.closest('.overflow-y-auto');
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight;
    }
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 text-green-400 p-4 sm:p-6 rounded-lg font-mono text-xs sm:text-sm max-h-80 sm:max-h-96 overflow-y-auto"
    >
      <div className="flex items-center mb-4">
        <div className="flex space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="ml-2 sm:ml-4 text-gray-400 text-xs sm:text-sm">terminal</span>
      </div>
      
      <div className="space-y-1">
        {history.map((line, index) => (
          <div
            key={index}
            className={`${
              line.type === 'input' ? 'text-white' : 
              line.type === 'error' ? 'text-red-400' : 'text-green-400'
            }`}
          >
            {line.text}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none flex-1 text-white text-xs sm:text-sm"
            placeholder="Digite um comando..."
            autoFocus={window.innerWidth > 768}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default Terminal;