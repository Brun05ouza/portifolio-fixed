import { motion } from 'framer-motion'
import BlogCard from '../components/BlogCard'
import AnimatedBackground from '../components/AnimatedBackground'

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Como Começar com React em 2024',
      slug: 'como-comecar-com-react-2024',
      excerpt: 'React continua sendo uma das bibliotecas JavaScript mais populares. Neste post, compartilho as melhores práticas para começar com React em 2024.',
      date: '15 de Janeiro, 2024',
      readTime: 5,
      tags: ['React', 'JavaScript', 'Frontend', 'Tutorial'],
      content: 'primeiro-post'
    },
    {
      id: 2,
      title: 'Deploy de Aplicações React na AWS',
      slug: 'deploy-react-aws',
      excerpt: 'Aprenda como fazer deploy de aplicações React na AWS usando S3, CloudFront e outras ferramentas para criar uma infraestrutura robusta e escalável.',
      date: '22 de Janeiro, 2024',
      readTime: 8,
      tags: ['AWS', 'Deploy', 'React', 'CloudFront', 'S3'],
      content: 'segundo-post'
    }
  ]

  return (
    <AnimatedBackground className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Compartilho conhecimentos sobre desenvolvimento, tecnologia e experiências profissionais
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>

        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              Nenhum post encontrado. Volte em breve para novos conteúdos!
            </p>
          </motion.div>
        )}
      </div>
    </AnimatedBackground>
  )
}

export default Blog