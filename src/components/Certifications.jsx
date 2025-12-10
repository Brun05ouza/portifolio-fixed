import { motion } from 'framer-motion';

const Certifications = ({ showAll = false }) => {
  const certifications = [
    {
      name: 'JavaScript: utilizando tipos, variáveis e funções',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/javascript.png',
      color: 'bg-yellow-500',
      verified: true
    },
    {
      name: 'React Basics',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/react.png',
      color: 'bg-blue-500',
      verified: true
    },
    {
      name: 'HTML e CSS: responsividade com mobile-first',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/html.png',
      color: 'bg-orange-500',
      verified: true
    },
    {
      name: 'HTML e CSS: praticando HTML/CSS',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/html.png',
      color: 'bg-orange-500',
      verified: true
    },
    {
      name: 'HTML e CSS: trabalhando com responsividade e publicação de projetos',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/html.png',
      color: 'bg-orange-500',
      verified: true
    },
    {
      name: 'Git e GitHub: repositório, commit e versões',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/git.png',
      color: 'bg-purple-500',
      verified: true
    },
    {
      name: 'Lógica de programação: explore funções e listas',
      issuer: 'Alura',
      date: '2024/2025',
      badgeImage: '/assets/javascript.png',
      color: 'bg-yellow-500',
      verified: true,
      status: 'completed'
    }
  ];

  const certificationsInProgress = [
    {
      name: 'JavaScript: aprendendo a programar',
      issuer: 'Alura',
      date: 'Em Andamento',
      badgeImage: '/assets/javascript.png',
      color: 'bg-yellow-500',
      verified: false,
      status: 'in-progress'
    },
    {
      name: 'JavaScript: construindo páginas dinâmicas',
      issuer: 'Alura',
      date: 'Em Andamento',
      badgeImage: '/assets/javascript.png',
      color: 'bg-yellow-500',
      verified: false,
      status: 'in-progress'
    }
  ];

  const formations = [
    {
      name: 'Explore React com JavaScript',
      issuer: 'Alura',
      date: 'Em Andamento',
      badgeImage: '/assets/react.png',
      color: 'bg-blue-500',
      verified: false,
      status: 'in-progress',
      type: 'formation'
    },
    {
      name: 'Criando uma aplicação acessível com JavaScript, Emotion e React Router',
      issuer: 'Alura',
      date: 'Em Andamento',
      badgeImage: '/assets/react.png',
      color: 'bg-blue-500',
      verified: false,
      status: 'in-progress',
      type: 'formation'
    }
  ];

  const displayCertifications = showAll ? certifications : certifications.slice(0, -3);
  const displayInProgress = showAll ? certificationsInProgress : [];
  const displayFormations = showAll ? formations : [];

  return (
    <div className="space-y-8">
      {/* Certificações Concluídas */}
      <div>
        {showAll && (
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Certificações Concluídas
          </h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayCertifications.map((cert, index) => (
        <motion.div
          key={cert.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-blue-500 relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {cert.badgeImage ? (
                  <img 
                    src={cert.badgeImage} 
                    alt={cert.name}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-2xl">{cert.badge}</span>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {cert.issuer}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {cert.date}
                </span>
                {cert.verified && (
                  <div className="flex items-center space-x-1 text-green-500">
                    <span className="text-sm">✓</span>
                    <span className="text-xs">Verificado</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Efeito de brilho */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
          </motion.div>
          ))}
        </div>
      </div>

      {/* Certificações Em Andamento */}
      {showAll && displayInProgress.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Em Andamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayInProgress.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-orange-500 relative overflow-hidden opacity-80"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {cert.badgeImage ? (
                        <img 
                          src={cert.badgeImage} 
                          alt={cert.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-2xl">{cert.badge}</span>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {cert.name}
                        </h3>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-semibold">
                        {cert.date}
                      </span>
                      <div className="flex items-center space-x-1 text-orange-500">
                        <span className="text-xs">Em Progresso</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Formações */}
      {showAll && displayFormations.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Formações
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {displayFormations.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-purple-500 relative overflow-hidden opacity-80"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {cert.badgeImage ? (
                        <img 
                          src={cert.badgeImage} 
                          alt={cert.name}
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="text-2xl">{cert.badge}</span>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full font-semibold">
                            FORMAÇÃO
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {cert.name}
                        </h3>
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
                        {cert.date}
                      </span>
                      <div className="flex items-center space-x-1 text-purple-500">
                        <span className="text-xs">Em Progresso</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Certifications;