import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { siteConfig, socialLinks } from '../../config/content';
import { toast } from 'sonner';

const iconMap = { Email: Mail, GitHub: Github, LinkedIn: Linkedin } as const;

function getSocialDisplay(link: (typeof socialLinks)[0]) {
  if (link.name === 'Email') return siteConfig.contactEmail;
  if (link.name === 'GitHub') return siteConfig.githubUrl.replace('https://', '');
  if (link.name === 'LinkedIn') return 'linkedin.com/in/bruno-souza';
  return link.href;
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Informe seu nome';
    else if (formData.name.trim().length < 2) next.name = 'Nome deve ter pelo menos 2 caracteres';
    if (!formData.email.trim()) next.email = 'Informe seu e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'E-mail inválido';
    if (!formData.message.trim()) next.message = 'Escreva sua mensagem';
    else if (formData.message.trim().length < 10) next.message = 'Mensagem deve ter pelo menos 10 caracteres';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = siteConfig.formEndpoint;
    if (!endpoint) {
      const mailto = `mailto:${siteConfig.contactEmail}?subject=Contato do Portfólio - ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\n---\nDe: ' + formData.email)}`;
      window.location.href = mailto;
      toast.success('Abriu seu cliente de e-mail. Envie a mensagem para entrar em contato.');
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(true);
        toast.success('Mensagem enviada! Responderei em breve.');
      } else {
        const msg = data.error || data.message || `Erro ${res.status}. Tente novamente.`;
        toast.error(msg);
        setErrors({ submit: msg });
      }
    } catch {
      toast.error('Falha na conexão. Verifique sua internet e tente novamente.');
      setErrors({ submit: 'Falha na conexão.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-20 blur-xl -z-10"
                style={{ background: 'linear-gradient(135deg, var(--color-glow), var(--color-beam-end))' }}
              />
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h3 className="text-xl font-semibold">Mensagem enviada!</h3>
                  <p className="text-muted-foreground">Obrigado pelo contato. Responderei em breve.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block mb-2 text-sm font-medium">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.name ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="Seu nome"
                      disabled={submitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.email ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder="seu@email.com"
                      disabled={submitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block mb-2 text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none ${
                        errors.message ? 'border-destructive' : 'border-border'
                      }`}
                      rows={5}
                      placeholder="Conte-me sobre seu projeto..."
                      disabled={submitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {errors.submit && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.submit}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full group relative px-8 py-4 rounded-lg overflow-hidden text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    style={{ background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Vamos conversar!</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Estou sempre interessado em ouvir sobre novos projetos, ideias criativas ou
                oportunidades de fazer parte de projetos incríveis.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
                  <span className="text-muted-foreground">Disponível para novos projetos</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-glow)]" aria-hidden />
                  <span className="text-muted-foreground">Respondo em até 24 horas</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Conecte-se comigo</h4>
              <div className="grid gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = iconMap[link.name as keyof typeof iconMap];
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center text-white`}>
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{link.name}</div>
                        <div className="text-sm text-muted-foreground">{getSocialDisplay(link)}</div>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
