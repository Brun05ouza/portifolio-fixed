import { motion } from 'framer-motion';
import { useState } from 'react';

const GitCommands = () => {
  const [copiedCommand, setCopiedCommand] = useState('');

  const commands = [
    {
      command: 'git init',
      description: 'Inicia um novo repositório Git na pasta atual'
    },
    {
      command: 'git clone <url>',
      description: 'Clona um repositório remoto para sua máquina'
    },
    {
      command: 'git status',
      description: 'Mostra o estado atual dos arquivos (modificados, adicionados, etc)'
    },
    {
      command: 'git add .',
      description: 'Adiciona todos os arquivos modificados para o próximo commit'
    },
    {
      command: 'git add <arquivo>',
      description: 'Adiciona um arquivo específico para o próximo commit'
    },
    {
      command: 'git commit -m "mensagem"',
      description: 'Salva as alterações com uma mensagem descritiva'
    },
    {
      command: 'git push',
      description: 'Envia seus commits locais para o repositório remoto'
    },
    {
      command: 'git pull',
      description: 'Baixa e integra as alterações do repositório remoto'
    },
    {
      command: 'git branch',
      description: 'Lista todas as branches locais'
    },
    {
      command: 'git branch <nome>',
      description: 'Cria uma nova branch'
    },
    {
      command: 'git checkout <branch>',
      description: 'Muda para outra branch'
    },
    {
      command: 'git checkout -b <branch>',
      description: 'Cria e muda para uma nova branch'
    },
    {
      command: 'git merge <branch>',
      description: 'Mescla uma branch na branch atual'
    },
    {
      command: 'git log',
      description: 'Mostra o histórico de commits'
    },
    {
      command: 'git diff',
      description: 'Mostra as diferenças entre arquivos modificados'
    },
    {
      command: 'git reset --hard',
      description: 'Descarta todas as alterações locais (cuidado!)'
    },
    {
      command: 'git stash',
      description: 'Guarda temporariamente as alterações sem fazer commit'
    },
    {
      command: 'git stash pop',
      description: 'Recupera as alterações guardadas anteriormente'
    }
  ];

  const copyToClipboard = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <img src="/assets/github-mark.svg" alt="Git" className="w-10 h-10 bg-white rounded-full p-1" />
            Comandos Git que Podem te Ajudar
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Guia rápido dos principais comandos Git para versionar seus projetos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {commands.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <div className="flex items-start justify-between mb-2">
                <code className="text-sm font-mono text-purple-600 dark:text-purple-400 font-bold break-all">
                  {item.command}
                </code>
                <motion.button
                  onClick={() => copyToClipboard(item.command)}
                  className="ml-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex-shrink-0"
                  title="Copiar comando"
                  whileTap={{ scale: 0.8 }}
                  animate={copiedCommand === item.command ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {copiedCommand === item.command ? '✓' : <img src="/assets/abra-o-livro.png" alt="Copiar" className="w-5 h-5 bg-purple-100 dark:bg-purple-900 rounded p-0.5" />}
                </motion.button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            💡 Dica: Clique no ícone <img src="/assets/abra-o-livro.png" alt="livro" className="w-4 h-4 inline bg-purple-100 dark:bg-purple-900 rounded p-0.5" /> para copiar o comando
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GitCommands;
