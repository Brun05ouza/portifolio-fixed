import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useNotification } from '../hooks/useNotification'
import NotificationToast from './NotificationToast'

const ProjectCard = ({ project }) => {
  const { notifications, addNotification, removeNotification } = useNotification()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3 mt-auto">
          {project.demo === 'Em breve no Vercel' ? (
            <button
              onClick={() => addNotification('🚧 Este projeto ainda está em desenvolvimento!', 'warning', 4000)}
              className="btn-primary text-sm flex-1"
            >
              Ver Demo
            </button>
          ) : project.demo && project.demo.startsWith('/project/') ? (
            <Link
              to={project.demo}
              className="btn-primary text-sm flex-1 text-center"
            >
              Ver Demo
            </Link>
          ) : project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm flex-1 text-center"
            >
              Ver Demo
            </a>
          ) : (
            <button
              onClick={() => addNotification('📋 Demo não disponível para este projeto', 'info', 3000)}
              className="btn-primary text-sm flex-1 opacity-50 cursor-not-allowed"
              disabled
            >
              Ver Demo
            </button>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm flex-1 text-center"
          >
            GitHub
          </a>
        </div>
      </div>
      <NotificationToast 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </motion.div>
  )
}

export default ProjectCard