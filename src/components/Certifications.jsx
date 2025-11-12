import { motion } from 'framer-motion';

const Certifications = () => {
  const certifications = [
    {
      name: 'JavaScript Fundamentals',
      issuer: 'Curso Online',
      date: '2024',
      badgeImage: '/assets/javascript.png',
      color: 'bg-yellow-500',
      verified: true
    },
    {
      name: 'React Basics',
      issuer: 'Plataforma de Ensino',
      date: '2024',
      badgeImage: '/assets/react.png',
      color: 'bg-blue-500',
      verified: true
    },
    {
      name: 'HTML & CSS Complete',
      issuer: 'Curso Web',
      date: '2023',
      badgeImage: '/assets/html.png',
      color: 'bg-orange-500',
      verified: true
    },
    {
      name: 'SQL Database Basics',
      issuer: 'Estudos Pessoais',
      date: '2023',
      badgeImage: '/assets/postgre.png',
      color: 'bg-green-500',
      verified: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {certifications.map((cert, index) => (
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">
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
  );
};

export default Certifications;