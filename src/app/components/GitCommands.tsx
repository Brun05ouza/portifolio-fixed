import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Copy, Terminal, Check } from 'lucide-react';

const gitCommands = [
  { command: 'git init', description: 'Inicia um novo repositório Git na pasta atual' },
  { command: 'git clone <url>', description: 'Clona um repositório remoto para sua máquina' },
  { command: 'git status', description: 'Mostra o estado atual dos arquivos (modificados, adicionados, etc)' },
  { command: 'git add .', description: 'Adiciona todos os arquivos modificados para o próximo commit' },
  { command: 'git add <arquivo>', description: 'Adiciona um arquivo específico para o próximo commit' },
  { command: 'git commit -m "mensagem"', description: 'Salva as alterações com uma mensagem descritiva' },
  { command: 'git push', description: 'Envia seus commits locais para o repositório remoto' },
  { command: 'git pull', description: 'Baixa e integra as alterações do repositório remoto' },
  { command: 'git branch', description: 'Lista todas as branches locais' },
  { command: 'git branch <nome>', description: 'Cria uma nova branch' },
  { command: 'git checkout <branch>', description: 'Muda para outra branch' },
  { command: 'git checkout -b <nome>', description: 'Cria e muda para uma nova branch' },
  { command: 'git merge <branch>', description: 'Mescla uma branch na branch atual' },
  { command: 'git log', description: 'Mostra o histórico de commits' },
  { command: 'git diff', description: 'Mostra as diferenças entre arquivos modificados' },
  { command: 'git reset --hard', description: 'Descarta todas as alterações locais (cuidado!)' },
  { command: 'git stash', description: 'Guarda temporariamente as alterações sem fazer commit' },
  { command: 'git stash pop', description: 'Recupera as alterações guardadas anteriormente' },
];

const INITIAL_VISIBLE = 8;

export function GitCommands() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<{ command: string; output: string }[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  const suggestions = terminalInput.trim()
    ? gitCommands
        .filter((item) =>
          item.command.toLowerCase().includes(terminalInput.toLowerCase().trim())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
  }, [terminalOutput]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim();
    if (!trimmed) return;

    const cmd = gitCommands.find(
      (item) =>
        item.command === trimmed ||
        (item.command.startsWith(trimmed) && trimmed.length >= 4)
    );

    if (cmd) {
      setTerminalOutput((prev) => [
        ...prev,
        { command: trimmed, output: `→ ${cmd.description}` },
      ]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        {
          command: trimmed,
          output: 'Comando não encontrado. Explore os comandos listados abaixo.',
        },
      ]);
    }
    setTerminalInput('');
    setSelectedSuggestion(0);
  };

  const handleSuggestionClick = (command: string) => {
    setTerminalInput(command);
    setSelectedSuggestion(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Tab' && suggestions[selectedSuggestion]) {
      e.preventDefault();
      setTerminalInput(suggestions[selectedSuggestion].command);
    }
  };

  return (
    <section id="git-commands" className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Comandos Git" />
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Guia rápido dos principais comandos Git para versionar seus projetos
          </p>
          <div className="w-20 h-1 mx-auto mt-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Terminal Interativo */}
        <motion.div
          className="mb-12 rounded-xl overflow-hidden bg-gray-950 border border-gray-700/50 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900/80 border-b border-gray-700/50">
            <div className="flex gap-1.5 sm:gap-2 shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/90" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/90" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/90" />
            </div>
            <Terminal className="w-4 h-4 text-emerald-500/80 shrink-0" />
            <span className="text-xs sm:text-sm text-gray-400 truncate">Terminal — digite um comando git</span>
          </div>
          <div className="p-3 sm:p-4 min-h-[100px] sm:min-h-[120px]">
            <div
              ref={outputRef}
              className="mb-3 max-h-[160px] sm:max-h-[200px] overflow-y-auto space-y-2 font-mono text-xs sm:text-sm"
            >
              {terminalOutput.map((line, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">$</span>
                    <span className="text-gray-300">{line.command}</span>
                  </div>
                  <div className="text-cyan-400/90 pl-4 text-xs">{line.output}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="relative">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                <span className="flex-shrink-0">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => {
                    setTerminalInput(e.target.value);
                    setSelectedSuggestion(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite um comando..."
                  className="flex-1 bg-transparent outline-none text-gray-100 placeholder:text-gray-500"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="animate-pulse">|</span>
              </div>
              {suggestions.length > 0 && (
                <div className="mt-2 rounded-lg bg-gray-900/90 border border-gray-700/50 overflow-hidden">
                  {suggestions.map((item, i) => (
                    <button
                      key={item.command}
                      type="button"
                      onClick={() => handleSuggestionClick(item.command)}
                      className={`w-full px-3 py-2 text-left font-mono text-xs transition-colors ${
                        i === selectedSuggestion
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                      }`}
                    >
                      {item.command}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Lista de comandos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {(showAll ? gitCommands : gitCommands.slice(0, INITIAL_VISIBLE)).map((item, index) => (
            <motion.div
              key={item.command}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: showAll ? index * 0.03 : index * 0.02,
              }}
              className="flex flex-col gap-2 p-3 sm:p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <code className="flex-1 font-mono text-xs sm:text-sm text-foreground break-all min-w-0">{item.command}</code>
                <button
                  onClick={() => copyToClipboard(item.command, index)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
                  title="Copiar comando"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {!showAll && gitCommands.length > INITIAL_VISIBLE && (
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 font-semibold text-primary text-sm sm:text-base"
            >
              Ver mais comandos ({gitCommands.length - INITIAL_VISIBLE} restantes)
            </button>
          </motion.div>
        )}

        <motion.p
          className="text-center text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          💡 Dica: Clique no ícone para copiar o comando
        </motion.p>
      </div>
    </section>
  );
}
