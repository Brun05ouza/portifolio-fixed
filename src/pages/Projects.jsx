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
      category: 'Web'
    },
    {
      id: 2,
      title: 'Culture Hub',
      description: 'Plataforma para descoberta e divulgação de eventos culturais com sistema de reservas.',
      image: '/assets/culture-hub.png',
      tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      demo: 'Em breve no Vercel',
      github: 'https://github.com/Brun05ouza/culture-hub',
      category: 'Web'
    },
    {
      id: 3,
      title: 'App Mobile React Native',
      description: 'Aplicativo mobile para delivery com geolocalização e pagamentos integrados.',
      image: '/assets/appmobile.png',
      tags: ['React Native', 'Firebase', 'Maps API'],
      demo: '/project/3',
      github: 'https://github.com/exemplo',
      category: 'Mobile'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Dashboard interativo para análise de dados com gráficos e relatórios em tempo real.',
      image: '/assets/dashboard.png',
      tags: ['React', 'D3.js', 'Python', 'AWS'],
      demo: 'https://dashboard-analytics-peach.vercel.app',
      github: 'https://github.com/Brun05ouza/DashboardAnalytics',
      category: 'Web'
    },
    {
      id: 5,
      title: 'Sistema de Gestão',
      description: 'Sistema completo para gestão de empresas com controle de estoque e vendas.',
      image: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Sistema+Gestão',
      tags: ['React', 'Node.js', 'MySQL', 'Express'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 6,
      title: 'App Fitness Tracker',
      description: 'Aplicativo para acompanhamento de exercícios e metas de fitness.',
      image: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Fitness+App',
      tags: ['React Native', 'Firebase', 'Health API'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Mobile'
    },
    {
      id: 7,
      title: 'Blog Pessoal',
      description: 'Blog moderno com sistema de comentários e categorias.',
      image: 'https://via.placeholder.com/600x400/ef4444/ffffff?text=Blog',
      tags: ['Next.js', 'Markdown', 'Tailwind'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 8,
      title: 'API RESTful',
      description: 'API completa para gerenciamento de usuários e autenticação.',
      image: 'https://via.placeholder.com/600x400/10b981/ffffff?text=API+REST',
      tags: ['Node.js', 'Express', 'JWT', 'MongoDB'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Backend'
    },
    {
      id: 9,
      title: 'Chat em Tempo Real',
      description: 'Aplicação de chat com mensagens instantâneas e salas.',
      image: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Chat+App',
      tags: ['React', 'Socket.io', 'Node.js'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 10,
      title: 'Game 2D',
      description: 'Jogo 2D desenvolvido com JavaScript puro e Canvas.',
      image: 'https://via.placeholder.com/600x400/f97316/ffffff?text=Game+2D',
      tags: ['JavaScript', 'Canvas', 'HTML5'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Game'
    },
    {
      id: 11,
      title: 'Calculadora Científica',
      description: 'Calculadora avançada com funções científicas e gráficos.',
      image: 'https://via.placeholder.com/600x400/06b6d4/ffffff?text=Calculadora',
      tags: ['React', 'Math.js', 'Chart.js'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 12,
      title: 'Sistema de Tarefas',
      description: 'Gerenciador de tarefas com drag and drop e colaboração.',
      image: 'https://via.placeholder.com/600x400/84cc16/ffffff?text=Task+Manager',
      tags: ['React', 'DnD', 'Firebase'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    },
    {
      id: 13,
      title: 'App de Receitas',
      description: 'Aplicativo mobile para descobrir e salvar receitas culinárias.',
      image: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Receitas+App',
      tags: ['React Native', 'API', 'SQLite'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Mobile'
    },
    {
      id: 14,
      title: 'Portfolio 3D',
      description: 'Portfolio interativo com elementos 3D e animações avançadas.',
      image: 'https://via.placeholder.com/600x400/a855f7/ffffff?text=Portfolio+3D',
      tags: ['Three.js', 'React', 'WebGL'],
      demo: 'Em desenvolvimento',
      github: 'https://github.com/exemplo',
      category: 'Web'
    }
  ]

  const filters = ['Todos', 'Web', 'Mobile', 'Backend', 'Game']

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
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

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