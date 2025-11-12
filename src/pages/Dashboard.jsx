import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Timeline from '../components/Timeline';
import GitHubStats from '../components/GitHubStats';
import AnimatedBackground from '../components/AnimatedBackground';
import { useNotification } from '../hooks/useNotification';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    addNotification('Dashboard carregado com sucesso!', 'success');
  }, [addNotification]);

  return (
    <AnimatedBackground className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard Técnico
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Métricas em tempo real e demonstrações técnicas
          </p>
        </motion.div>

        {/* Analytics Dashboard */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Analytics em Tempo Real
          </h2>
          <Dashboard />
        </section>

        {/* Code Editor Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Demonstração de Código
          </h2>
          <CodeEditor />
        </section>

        {/* GitHub Stats */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Estatísticas GitHub
          </h2>
          <GitHubStats />
        </section>

        {/* Experience Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Timeline de Experiência
          </h2>
          <Timeline />
        </section>
      </div>
    </AnimatedBackground>
  );
};

export default DashboardPage;