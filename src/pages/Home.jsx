import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SkillsRadar from '../components/SkillsRadar'
import Certifications from '../components/Certifications'
import AnimatedBackground from '../components/AnimatedBackground'
import TypingAnimation from '../components/TypingAnimation'
import Terminal from '../components/Terminal'
import ActivityHeatmap from '../components/ActivityHeatmap'
import LiveStats from '../components/LiveStats'
import SwipeCards from '../components/SwipeCards'

import { useNotification } from '../hooks/useNotification'
import { useEffect } from 'react'

const Home = () => {
  const { addNotification } = useNotification();

  useEffect(() => {
    addNotification('Bem-vindo ao meu portfolio!', 'success');
    // Força scroll para o topo na página inicial
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [addNotification]);

  const skills = [
    { name: 'HTML', iconImage: '/assets/html.png' },
    { name: 'CSS', iconImage: '/assets/css.png' },
    { name: 'JavaScript', iconImage: '/assets/javascript.png' },
    { name: 'React', iconImage: '/assets/react.png' },
    { name: 'PostgreSQL', iconImage: '/assets/postgre.png' },
    { name: 'Vite', iconImage: '/assets/vite.png' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div id="home-top">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white dark:bg-gray-300 rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Olá, eu sou<br className="sm:hidden" /> Bruno Souza<br/>
              <span className="text-2xl sm:text-3xl md:text-5xl">
                <TypingAnimation 
                  texts={['Estudante de Desenvolvimento', 'Aprendendo React', 'Explorando Tecnologias', 'Futuro Desenvolvedor', 'já tomou café hoje ?']}
                  speed={80}
                  deleteSpeed={40}
                  pauseTime={1500}
                />
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto px-4">
              Estudante de desenvolvimento apaixonado por tecnologia,
              aprendendo e criando projetos para evoluir minhas habilidades
            </p>
            
            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/4 animate-bounce">
              <div className="text-4xl opacity-20">⚛️</div>
            </div>
            <div className="absolute top-1/3 right-1/4 animate-pulse">
              <div className="text-3xl opacity-20">🚀</div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-bounce" style={{animationDelay: '1s'}}>
              <div className="text-3xl opacity-20">💻</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/projetos" className="btn-primary text-center py-4 sm:py-3">
                Ver Projetos
              </Link>
              <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-center">
                Dashboard Técnico
              </Link>
              <Link to="/contato" className="btn-secondary text-center py-4 sm:py-3">
                Entre em Contato
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedBackground className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Sobre Mim
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Estudante de desenvolvimento web com conhecimentos em HTML, CSS, JavaScript,
              React e bancos de dados. Atualmente cursando e aprimorando minhas habilidades
              em tecnologias modernas para me tornar um desenvolvedor completo.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div className="order-2 lg:order-1">
              <SkillsRadar />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                Skills Interativas
              </h3>
              <div className="block lg:hidden mb-8">
                <SwipeCards />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                Certificações
              </h3>
              <Certifications />
            </div>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Estatísticas em Tempo Real
            </h3>
            <LiveStats />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                Terminal Interativo
              </h3>
              <Terminal />
            </div>
            <div className="order-1 lg:order-2">
              <ActivityHeatmap />
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">
                  {skill.iconImage ? (
                    <img 
                      src={skill.iconImage} 
                      alt={skill.name}
                      className="w-12 h-12 mx-auto object-contain"
                    />
                  ) : (
                    skill.icon
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedBackground>

      {/* CTA Section */}
      <AnimatedBackground className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Estou sempre aberto a novos desafios e oportunidades
            </p>
            <Link to="/contato" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Entrar em Contato
            </Link>
          </motion.div>
        </div>
      </AnimatedBackground>
    </div>
  )
}

export default Home