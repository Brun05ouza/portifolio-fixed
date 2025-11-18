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
    { name: 'Node.js', iconImage: '/assets/node.png' },
    { name: 'TypeScript', iconImage: '/assets/typescript.png' },
    { name: 'Git', iconImage: '/assets/git.png' },
    { name: 'MongoDB', iconImage: '/assets/mongoDB.jpg' },
    { name: 'PostgreSQL', iconImage: '/assets/postgre.png' },
    { name: 'Vite', iconImage: '/assets/vite.png' },
    { name: 'Tailwind CSS', iconImage: '/assets/tailwindcss.svg' },
    { name: 'Firebase', iconImage: '/assets/firebase.svg' }
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Olá, eu sou<br className="sm:hidden" /> Bruno Souza<br/>
              <span className="text-3xl sm:text-4xl md:text-5xl">
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
              <Link to="/projetos" className="btn-primary text-center py-4 sm:py-3 text-lg sm:text-base">
                Ver Projetos
              </Link>
              <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-center text-lg sm:text-base">
                Dashboard Técnico
              </Link>
              <Link to="/contato" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-center text-lg sm:text-base">
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

          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Skills Interativas
            </h3>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">
                  {skill.iconImage ? (
                    <img 
                      src={skill.iconImage} 
                      alt={skill.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto object-contain"
                    />
                  ) : (
                    skill.icon
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm md:text-base">{skill.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedBackground>

      {/* TCC Highlight Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-900 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Globe with U Movement */}
        <motion.div
          initial={{ 
            x: -300, 
            y: -150
          }}
          animate={{ 
            x: 1200,
            y: -150
          }}
          transition={{
            duration: 8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.5
          }}
          style={{
            offsetPath: "path('M -300,-50 Q 200,600 1200,-50')",
            offsetDistance: "0%"
          }}
          whileInView={{
            offsetDistance: "100%"
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute top-20 left-0 z-20"
        >
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 animate-spin shadow-2xl" style={{animationDuration: '20s'}}>
            {/* Continents */}
            <div className="absolute top-20 left-28 w-40 h-32 bg-emerald-700 rounded-full opacity-80"></div>
            <div className="absolute top-48 right-32 w-32 h-20 bg-emerald-700 rounded-full opacity-80"></div>
            <div className="absolute bottom-32 left-20 w-44 h-28 bg-emerald-700 rounded-full opacity-80"></div>
            <div className="absolute bottom-20 right-28 w-36 h-36 bg-emerald-700 rounded-full opacity-80"></div>
            
            {/* Orbital rings */}
            <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </motion.div>
        
        <div className="container-custom relative z-10 flex items-center min-h-[80vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Second Globe - Static beside EcoSphere */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 4, duration: 2, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center relative order-1 lg:order-1"
            >
              {/* Floating Data Points around second globe */}
              <motion.div
                animate={{ 
                  x: [0, 30, 0, -30, 0],
                  y: [0, -20, 0, 20, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-emerald-200 shadow-lg z-10"
              >
                <span className="text-emerald-700 text-sm font-bold">CO₂</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [0, 20, 0, -20, 0],
                  y: [0, 30, 0, -30, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-10 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-teal-200 shadow-lg z-10"
              >
                <span className="text-teal-700 text-sm font-bold">25°C</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [0, 20, 0, -20, 0],
                  y: [0, 25, 0, -25, 0]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-12 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-cyan-200 shadow-lg z-10"
              >
                <span className="text-cyan-700 text-sm font-bold">78%</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  x: [0, -15, 0, 15, 0],
                  y: [0, -30, 0, 30, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -right-8 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-emerald-200 shadow-lg z-10"
              >
                <span className="text-emerald-700 text-sm font-bold">IoT</span>
              </motion.div>
              
              {/* Pulsing rings around globe */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-2 border-white/30 rounded-full"
                style={{ width: '500px', height: '500px', left: '-100px', top: '-100px' }}
              />
              
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute inset-0 border border-white/20 rounded-full"
                style={{ width: '600px', height: '600px', left: '-150px', top: '-150px' }}
              />
              
              {/* Main Globe */}
              <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 animate-spin shadow-2xl relative" style={{animationDuration: '15s'}}>
                {/* Continents */}
                <div className="absolute top-12 left-16 w-20 h-16 bg-emerald-700 rounded-full opacity-80"></div>
                <div className="absolute top-28 right-20 w-16 h-12 bg-emerald-700 rounded-full opacity-80"></div>
                <div className="absolute bottom-20 left-12 w-24 h-14 bg-emerald-700 rounded-full opacity-80"></div>
                <div className="absolute bottom-12 right-16 w-18 h-18 bg-emerald-700 rounded-full opacity-80"></div>
                
                {/* Orbital rings */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border border-white/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </motion.div>
            
            {/* TCC Information - Appears gradually */}
            <div className="text-white space-y-6 order-2 lg:order-2">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30"
              >
                <span className="text-2xl">🎓</span>
                <span className="font-semibold text-lg">Trabalho de Conclusão de Curso</span>
              </motion.div>
            
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                EcoSphere
                <span className="block text-xl md:text-2xl font-normal mt-2 text-emerald-100">
                  Sistema de Monitoramento Ambiental
                </span>
              </motion.h2>
            
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="text-lg md:text-xl mb-8 text-teal-100 leading-relaxed"
              >
                Plataforma inovadora que integra IoT, Machine Learning e análise de dados em tempo real 
                para monitoramento e preservação ambiental.
              </motion.p>
            
              {/* Features */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.6, duration: 0.6 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <img src="/assets/plant.png" alt="Plant" className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">IoT Sensors</h3>
                    <p className="text-teal-100 text-sm">Sensores inteligentes para coleta de dados ambientais</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.8, duration: 0.6 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <img src="/assets/smart_toy.svg" alt="Smart" className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">Machine Learning</h3>
                    <p className="text-teal-100 text-sm">Algoritmos preditivos para análise ambiental</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 3, duration: 0.6 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <img src="/assets/dashboard.svg" alt="Dashboard" className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold text-lg">Dashboard Real-time</h3>
                    <p className="text-teal-100 text-sm">Visualização de dados em tempo real</p>
                  </div>
                </motion.div>
              </div>
            
              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3.2, duration: 0.6 }}
                onClick={() => window.open('https://github.com/Brun05ouza/Tcc-EcoSphere', '_blank')}
                className="group bg-white text-emerald-600 hover:bg-emerald-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/20"
              >
                <span className="flex items-center gap-3">
                  <span>Ver Projeto Completo</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </motion.button>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >

            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Estou sempre disponível para novos desafios e oportunidades. 
              <span className="block mt-2 text-primary-400 font-semibold">Vamos criar algo incrível!</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contato" 
                className="group bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-500/25"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Entrar em Contato</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link 
                to="/projetos" 
                className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <span className="flex items-center justify-center gap-3">
                  <span>Ver Meus Projetos</span>

                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home