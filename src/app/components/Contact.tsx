import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { socialLinks } from '../../config/content';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';
import { toast } from 'sonner';
import { submitContact } from '../services/contactDb';
import { sendContactEmailJS, isEmailJSConfigured } from '../services/contactEmailJS';

const iconMap = { Email: Mail, GitHub: Github, LinkedIn: Linkedin } as const;

function socialHref(
  link: (typeof socialLinks)[0],
  siteConfig: { contactEmail: string; githubUrl: string; linkedinUrl: string }
) {
  if (link.name === 'Email') return `mailto:${siteConfig.contactEmail}`;
  if (link.name === 'GitHub') return siteConfig.githubUrl;
  if (link.name === 'LinkedIn') return siteConfig.linkedinUrl;
  return link.href;
}

function getSocialDisplay(
  link: (typeof socialLinks)[0],
  siteConfig: { contactEmail: string; githubUrl: string; linkedinUrl: string }
) {
  if (link.name === 'Email') return siteConfig.contactEmail;
  if (link.name === 'GitHub') return siteConfig.githubUrl.replace('https://', '');
  if (link.name === 'LinkedIn') return siteConfig.linkedinUrl.replace(/^https?:\/\//, '');
  return link.href;
}

export function Contact() {
  const { siteConfig, openSiteWhatsApp } = useSiteContent();
  const { bundle } = useI18n();
  const c = bundle.contact;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = c.errNameRequired;
    else if (formData.name.trim().length < 2) next.name = c.errNameShort;
    if (!formData.email.trim()) next.email = c.errEmailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = c.errEmailInvalid;
    if (!formData.message.trim()) next.message = c.errMessageRequired;
    else if (formData.message.trim().length < 10) next.message = c.errMessageShort;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const result = await submitContact(formData);

      if (result.ok) {
        if (isEmailJSConfigured()) {
          const emailResult = await sendContactEmailJS(formData);
          if (!emailResult.ok) {
            toast.warning(c.toastSavedWarn);
          }
        }
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(true);
        toast.success(c.toastSuccess);
      } else {
        toast.error(result.error);
        setErrors({ submit: result.error });
      }
    } catch {
      toast.error(c.toastConnection);
      setErrors({ submit: c.errConnection });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text={c.title} />
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">{c.subtitle}</p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl bg-card border border-border">
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-20 blur-xl -z-10"
                style={{ background: 'linear-gradient(135deg, var(--color-glow), var(--color-beam-end))' }}
              />
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <h3 className="text-xl font-semibold">{c.successTitle}</h3>
                  <p className="text-muted-foreground">{c.successBody}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block mb-2 text-sm font-medium">
                      {c.name}
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.name ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder={c.phName}
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
                      {c.email}
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
                        errors.email ? 'border-destructive' : 'border-border'
                      }`}
                      placeholder={c.phEmail}
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
                      {c.message}
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-background border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none ${
                        errors.message ? 'border-destructive' : 'border-border'
                      }`}
                      rows={5}
                      placeholder={c.phMessage}
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
                          {c.sending}
                        </>
                      ) : (
                        <>
                          {c.send}
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
                <h3 className="text-2xl font-bold">{c.chatTitle}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{c.chatBody}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
                  <span className="text-muted-foreground">{c.availableProjects}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-glow)]" aria-hidden />
                  <span className="text-muted-foreground">{c.respond24}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openSiteWhatsApp(c.whatsappSchedule)}
                className="mt-4 w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {c.schedule}
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">{c.connect}</h4>
              <div className="grid gap-4">
                {socialLinks.map((link, index) => {
                  const Icon = iconMap[link.name as keyof typeof iconMap];
                  return (
                    <motion.a
                      key={link.name}
                      href={socialHref(link, siteConfig)}
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
                        <div className="text-sm text-muted-foreground">{getSocialDisplay(link, siteConfig)}</div>
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
