import { motion } from 'framer-motion';

const Timeline = () => {
  const experiences = [
    {
      year: '2024',
      title: 'Estudando Desenvolvimento Web',
      company: 'Autodidata / Cursos Online',
      description: 'Aprendendo React, aprofundando JavaScript e explorando tecnologias modernas de desenvolvimento.',
      skills: ['React', 'JavaScript', 'Vite', 'CSS']
    },
    {
      year: '2023',
      title: 'Fundamentos de Programação',
      company: 'Estudos Pessoais',
      description: 'Dominando HTML, CSS, JavaScript e conceitos de bancos de dados relacionais.',
      skills: ['HTML', 'CSS', 'JavaScript', 'PostgreSQL']
    },
    {
      year: '2022',
      title: 'Início da Jornada',
      company: 'Primeiros Passos',
      description: 'Descobrindo o mundo da programação e criando meus primeiros projetos web.',
      skills: ['HTML', 'CSS', 'SQL Server', 'Lógica']
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
      
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative flex items-start mb-12"
        >
          <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
          
          <div className="ml-20 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-full">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-blue-500">{exp.year}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {exp.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-3">
              {exp.company}
            </p>
            
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {exp.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;