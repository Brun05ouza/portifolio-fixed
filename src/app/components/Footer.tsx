import { motion } from 'motion/react';
import { Heart, Code2 } from 'lucide-react';
import { siteConfig } from '../../config/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Footer() {
  const reduceMotion = useReducedMotion();
  return (
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                }}
              >
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Portfolio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#work" className="text-muted-foreground hover:text-primary transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#certificados" className="text-muted-foreground hover:text-primary transition-colors">
                  Certificados
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-primary transition-colors">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>Brasil</li>
              <li>Disponível para novos desafios</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 sm:pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4">
          <p className="text-sm text-muted-foreground flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-center md:text-left">
            © 2026 Bruno Souza. Todos os direitos reservados. Feito com{' '}
            <motion.span
              animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.2, 1] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{' '}
            e React
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termos
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
