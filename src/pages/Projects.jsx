import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import AnimatedBackground from '../components/AnimatedBackground'

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('Todos')

  const projects = [
    {
      id: 1,
      title: 'E-commerce React',
      description: 'Plataforma completa de e-commerce com carrinho, pagamentos e painel administrativo.',
      image: '/assets/ecommerce.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demo: 'https://e-commerce-react-sand.vercel.app/',
      github: 'https://github.com/Brun05ouza/E-commerce-React-',
      category: 'Web',
      featured: true
    },
    {
      id: 2,
      title: 'Culture Hub',
      description: 'Plataforma para descoberta e divulgação de eventos culturais com sistema de reservas.',
      image: '/assets/culture-hub.png',
      tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      demo: 'Em breve no Vercel',
      github: 'https://github.com/Brun05ouza/culture-hub',
      category: 'Web',
      featured: true
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos e relatórios em tempo real.',
      image: '/assets/dashboard.png',
      tags: ['React', 'D3.js', 'Python', 'AWS'],
      demo: 'https://dashboard-analytics-peach.vercel.app',
      github: 'https://github.com/Brun05ouza/DashboardAnalytics',
      category: 'Web',
      featured: true
    },
    {
      id: 4,
      title: 'App Mobile React Native',
      description: 'Aplicativo mobile para delivery com geolocalização e pagamentos integrados.',
      image: '/assets/appmobile.png',
      tags: ['React Native', 'Firebase', 'Maps API'],
      demo: '/project/3',
      github: 'https://github.com/exemplo',
      category: 'Mobile',
      featured: true
    },
    {
      id: 5,
      title: 'Nexus Flow Web',
      description: 'Plataforma web moderna para gerenciamento de fluxos de trabalho e automação de processos.',
      image: 'https://opengraph.githubassets.com/1/Brun05ouza/nexus-flow-web',
      tags: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
      demo: null,
      github: 'https://github.com/Brun05ouza/nexus-flow-web',
      category: 'Web',
      featured: true
    },
    {
      id: 6,
      title: 'Gestor Pro Web',
      description: 'Sistema completo de gestão empresarial com dashboard intuitivo, controle de vendas, estoque e relatórios avançados para otimizar a administração de negócios.',
      image: 'https://opengraph.githubassets.com/1/Brun05ouza/gestor-pro-web',
      tags: ['React', 'TypeScript', 'Material-UI', 'Node.js'],
      demo: null,
      github: 'https://github.com/Brun05ouza/gestor-pro-web',
      category: 'Web',
      featured: true
    },
    {
      id: 7,
      title: 'PromoPC Hub Web',
      description: 'Plataforma especializada em promoções de hardware e componentes de PC, com sistema de comparação de preços, alertas de ofertas e interface otimizada para gamers e entusiastas.',
      image: 'https://opengraph.githubassets.com/1/Brun05ouza/promopc-hub-web',
      tags: ['React', 'Next.js', 'Tailwind', 'API'],
      demo: null,
      github: 'https://github.com/Brun05ouza/promopc-hub-web',
      category: 'Web',
      featured: true
    },
    {
      id: 8,
      title: 'LUX - Moda Masculina',
      description: 'E-commerce elegante e moderno para moda masculina premium, com catálogo interativo, sistema de carrinho avançado e experiência de compra sofisticada.',
      image: 'https://opengraph.githubassets.com/1/Brun05ouza/LUX-site-de-moda-masculina',
      tags: ['HTML', 'CSS', 'JavaScript', 'E-commerce'],
      demo: null,
      github: 'https://github.com/Brun05ouza/LUX-site-de-moda-masculina',
      category: 'Web',
      featured: true
    },
    {
      id: 9,
      title: 'Jogo do Número Secreto',
      description: 'Jogo interativo desenvolvido em JavaScript puro onde o jogador deve adivinhar o número secreto com dicas e sistema de pontuação.',
      image: 'https://opengraph.githubassets.com/1/Brun05ouza/jogo-do-numero-secreto',
      tags: ['JavaScript', 'HTML', 'CSS', 'Game'],
      demo: 'https://jogo-do-numero-secreto-amber-delta.vercel.app/',
      github: 'https://github.com/Brun05ouza/jogo-do-numero-secreto',
      category: 'Game',
      featured: true
    }
  ]

  const filters = [
    { key: 'Todos', label: 'Todos os Projetos', count: projects.length },
    { key: 'Web', label: 'Desenvolvimento Web', count: projects.filter(p => p.category === 'Web').length },
    { key: 'Mobile', label: 'Apps Mobile', count: projects.filter(p => p.category === 'Mobile').length },
    { key: 'Backend', label: 'Backend & APIs', count: projects.filter(p => p.category === 'Backend').length },
    { key: 'Game', label: 'Games & Interativo', count: projects.filter(p => p.category === 'Game').length }
  ].filter(filter => filter.count > 0)

  const filteredProjects = selectedFilter === 'Todos' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter)

  return (
    <AnimatedBackground className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meus Projetos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Uma seleção dos meus trabalhos mais recentes e projetos pessoais
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
            {filters.map((filter, index) => (
              <motion.button
                key={filter.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedFilter(filter.key)}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                  selectedFilter === filter.key
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{filter.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedFilter === filter.key
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  }`}>
                    {filter.count}
                  </span>
                </span>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                  selectedFilter === filter.key
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-30 bg-gradient-to-r from-primary-100/50 to-primary-200/50 dark:from-primary-900/10 dark:to-primary-800/10'
                }`} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${selectedFilter}-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Nenhum projeto encontrado para esta categoria.
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedBackground>
  )
}

export default Projects