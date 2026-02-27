import { motion } from 'motion/react';
import { Heart, Code2 } from 'lucide-react';
import { siteConfig } from '../../config/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function Footer() {
  const reduceMotion = useReducedMotion();
  return (
    <footer className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 border-t border-[var(--border)]" style={{ backgroundColor: 'var(--background-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary-muted)', color: 'var(--accent-primary)' }}>
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">Bruno Souza</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
              Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>Início</a></li>
              <li><a href="#services" className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>Serviços</a></li>
              <li><a href="#work" className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>Cases</a></li>
              <li><a href="#about" className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>Sobre</a></li>
              <li><a href="#contact" className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Contato</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:opacity-90 transition-opacity">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>Brasil</li>
              <li>Disponível para novos projetos</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 sm:pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4">
          <p className="text-sm flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-center md:text-left" style={{ color: 'var(--foreground-muted)' }}>
            © 2026 Bruno Souza. Todos os direitos reservados. Feito com{' '}
            <motion.span
              animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.2, 1] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{' '}
            e React
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <a href="#" className="hover:opacity-90 transition-opacity">Privacidade</a>
            <span>·</span>
            <a href="#" className="hover:opacity-90 transition-opacity">Termos</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
