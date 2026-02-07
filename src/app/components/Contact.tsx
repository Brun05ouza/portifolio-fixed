import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Sparkles } from 'lucide-react';
import { GlitchText } from './GlitchText';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      href: 'mailto:brunosouzagithub2003@gmail.com',
      color: 'from-red-500 to-orange-500',
    },
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      href: 'https://github.com/Brun05ouza',
      color: 'from-gray-700 to-gray-900',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      href: 'https://www.linkedin.com/in/bruno-souza/',
      color: 'from-green-700 to-green-600',
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Vamos trabalhar juntos?" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estou sempre disponível para novos desafios e oportunidades. Vamos criar algo incrível!
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              {/* Glow effect */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-20 blur-xl -z-10"
                style={{
                  background: 'linear-gradient(135deg, var(--color-glow), var(--color-beam-end))',
                }}
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors resize-none"
                    rows={5}
                    placeholder="Conte-me sobre seu projeto..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full group relative px-8 py-4 rounded-lg overflow-hidden text-white font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Enviar Mensagem
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact info & social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info card */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Vamos conversar!</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Estou sempre interessado em ouvir sobre novos projetos, ideias criativas ou 
                oportunidades de fazer parte de projetos incríveis. Seja para construir algo 
                do zero ou melhorar uma solução existente, vamos criar algo excepcional juntos!
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-muted-foreground">Disponível para novos projetos</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-glow)]" />
                  <span className="text-muted-foreground">Respondo em até 24 horas</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Conecte-se comigo</h4>
              <div className="grid gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white`}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{link.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {link.name === 'Email' && 'brunosouzagithub2003@gmail.com'}
                        {link.name === 'GitHub' && 'github.com/Brun05ouza'}
                        {link.name === 'LinkedIn' && 'linkedin.com/in/bruno-souza'}
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}