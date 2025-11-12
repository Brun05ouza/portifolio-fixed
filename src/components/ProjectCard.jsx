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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {project.demo === 'Em breve no Vercel' ? (
            <button
              onClick={() => addNotification('🚧 Este projeto ainda está em desenvolvimento!', 'warning', 4000)}
              className="btn-primary text-sm"
            >
              Ver Demo
            </button>
          ) : project.demo.startsWith('/project/') ? (
            <Link
              to={project.demo}
              className="btn-primary text-sm"
            >
              Ver Demo
            </Link>
          ) : (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Ver Demo
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
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