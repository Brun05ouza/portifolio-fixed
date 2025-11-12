import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProjectDetail = () => {
  const { id } = useParams()

  const projectDetails = {
    '3': {
      title: 'App Mobile React Native',
      description: 'Aplicativo mobile para delivery com geolocalização e pagamentos integrados.',
      fullDescription: 'Este aplicativo mobile foi desenvolvido com React Native, oferecendo uma experiência completa de delivery. Inclui funcionalidades como geolocalização em tempo real, sistema de pagamentos integrado, notificações push, tela de login interativa para acesso e segurança, e interface intuitiva para usuários e entregadores.',
      video: '/assets/appmobile-demo.mp4',
      tags: ['React Native', 'Firebase', 'Maps API', 'Stripe'],
      features: [
        'Tela de login interativa para acesso e segurança',
        'Geolocalização em tempo real',
        'Sistema de pagamentos integrado',
        'Notificações push',
        'Interface responsiva',
        'Rastreamento de pedidos'
      ]
    }
  }

  const project = projectDetails[id]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
          <Link to="/projects" className="btn-primary">Voltar aos Projetos</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container-custom">
        <Link to="/projetos" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          ← Voltar aos Projetos
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Video Section */}
          <div className="aspect-video bg-black">
            <video
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src={project.video} type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {project.fullDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Principais Funcionalidades
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectDetail