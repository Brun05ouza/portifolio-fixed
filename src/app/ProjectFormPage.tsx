import { useState, type FormEvent } from 'react';
import { CalendarDays, Github, Linkedin, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/content';
import { createProjectRequest } from '../services/projectRequestsDb';
import './ProjectFormPage.css';

export function ProjectFormPage() {
  const [form, setForm] = useState({ name: '', email: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    const result = await createProjectRequest(form);
    setSaving(false);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setForm({ name: '', email: '', description: '' });
    setMessage('Recebi sua ideia. Vou analisar e te responder em breve.');
  };

  return (
    <main className="project-form-page">
      <Link className="project-form-brand" to="/">
        Bruno Souza
      </Link>

      <section className="project-form-shell">
        <div className="project-form-copy">
          <span>// Entre em contato</span>
          <h1>Vamos conectar e colaborar</h1>
          <p>
            Tem um projeto em mente? Me envie uma mensagem com os detalhes e eu retorno com os próximos passos.
          </p>

          <div className="project-form-socials">
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">/ LinkedIn</a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">/ GitHub</a>
          </div>

          <div className="project-form-contact">
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">
              <CalendarDays size={18} />
              Marcar uma reunião
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <Mail size={18} />
              {siteConfig.contactEmail}
            </a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <form className="project-form-card" onSubmit={submit}>
          <label>
            Nome*
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Seu nome"
              required
            />
          </label>

          <label>
            E-mail*
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="seu@email.com"
              required
            />
          </label>

          <label>
            Descrição do projeto*
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Conte sobre a ideia, objetivo, prazo, orçamento ou qualquer detalhe importante"
              rows={7}
              required
            />
          </label>

          {message && <p className="project-form-message">{message}</p>}

          <button type="submit" disabled={saving}>
            {saving ? 'Enviando...' : 'Enviar mensagem'}
            <Send size={17} />
          </button>
        </form>
      </section>
    </main>
  );
}
