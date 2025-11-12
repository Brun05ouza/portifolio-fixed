import { motion } from 'framer-motion'

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Brun05ouza', iconImage: '/assets/github.png' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bruno-souza-4826a6271', iconImage: '/assets/linkedin.png' },
  ]

  return (
    <footer className="bg-dark-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400">
              Estudante de desenvolvimento apaixonado por tecnologia,
              aprendendo e criando projetos para evoluir minhas habilidades.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
              <li><a href="/projetos" className="text-gray-400 hover:text-white transition-colors">Projetos</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:text-primary-500 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.name}
                >
                  {link.iconImage ? (
                    <img 
                      src={link.iconImage} 
                      alt={link.name}
                      className="w-6 h-6 object-contain filter invert"
                    />
                  ) : (
                    link.icon
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Bruno Souza. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer