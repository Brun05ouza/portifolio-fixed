import { motion } from 'framer-motion';
import Certifications from '../components/Certifications';
import AnimatedBackground from '../components/AnimatedBackground';

const CertificationsPage = () => {
  return (
    <AnimatedBackground className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Minhas Certificações
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Cursos e certificações que comprovam meu aprendizado e evolução na área de tecnologia
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Certifications showAll={true} />
        </motion.div>
      </div>
    </AnimatedBackground>
  );
};

export default CertificationsPage;