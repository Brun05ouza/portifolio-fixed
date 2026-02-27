# Relatório do Redesign — Portfólio Bruno Souza

Redesign total com foco em **venda de serviço** (principal) e **nível técnico** (secundário), identidade **Premium Dark** e padrões inspirados em portfolios de premiação (Awwwards, Lapa Ninja, SiteInspire).

---

## 1. O que mudou (por arquivo)

### Novos arquivos

| Arquivo | Descrição |
|---------|-----------|
| `src/styles/theme.css` | Reescrito: Design Tokens Premium Dark (superfícies, acentos cyan/amber, tipografia, radius, sombras). |
| `src/app/components/BackgroundPremium.tsx` | Background global: grid sutil + noise + spotlight (substitui Squares animado). |
| `src/app/components/ds/Container.tsx` | Componente de layout: max-width + padding (sm/md/lg/full). |
| `src/app/components/ds/SectionTitle.tsx` | Título de seção: label opcional, título, subtítulo, alinhamento. |
| `src/app/components/Navbar.tsx` | Nova barra de navegação: logo, links, botão Agendar, ThemeToggle, menu mobile (Sheet). |
| `src/app/sections/Trust.tsx` | Seção Trust: métricas (stats) + strip de tecnologias. |
| `src/app/sections/Process.tsx` | Seção “Como eu trabalho”: 4 etapas (Descoberta, Design/Arquitetura, Implementação, Deploy/Observabilidade) com entregáveis. |

### Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/app/App.tsx` | BackgroundPremium no lugar de Squares; PillNav → Navbar; Hero com `onScheduleCall`; inclusão de Trust e Process; ordem: Hero → Trust → Services → About → LiveStats → TccEcoSphere → Projects → Process → Certifications → SocialProof → Stack → GitCommands → Contact → CTAFinal. |
| `src/app/components/Hero.tsx` | Novo layout: chip “Disponível para freela · +X projetos”; headline/subheadline; 3 CTAs (Solicitar orçamento, Ver cases, Agendar call); animação em stagger; prop `onScheduleCall`. |
| `src/app/sections/Services.tsx` | Uso de Container e SectionTitle; cards com hover lift + sombra; ícones e bullets com tokens; CTA “Solicitar orçamento” por card. |
| `src/app/components/Projects.tsx` | Container e SectionTitle; grid 3 colunas (lg); estilos com vars (border, surface, foreground-muted); link GitHub com novo estilo. |
| `src/app/components/Footer.tsx` | Tokens (border, background-elevated, accent-primary, foreground-muted); marca “Bruno Souza”; links simplificados. |
| `src/app/sections/CTAFinal.tsx` | Botões com `accent-primary` e `border-strong`/`surface-hover`. |
| `src/config/content.ts` | `navItems` atualizado: ordem e inclusão de Process; remoção de “Terminal” da nav (seção mantida). |
| `src/styles/index.css` | Scrollbar e selection usando `--accent-primary`. |

### Arquivos não alterados (mantidos)

- `src/app/components/ProjectCard.tsx` — Mantido (spotlight 3D, tags, links). Compatível com tokens via `--color-spotlight`, `--card`, `--border`.
- `src/app/components/CaseModal.tsx` — Mantido (Problema/Solução/Stack/Resultado). Usa `--color-chroma-*` (mapeados no theme).
- Demais seções (About, LiveStats, TccEcoSphere, Certifications, SocialProof, Stack, GitCommands, Contact), FloatingWhatsApp, CalendlyModal — Mantidos; herdam cores do novo theme.

---

## 2. Design tokens e rationale

### Cores (Premium Dark)

- **Background:** `#050508` (quase preto) — base para contraste e foco no conteúdo.
- **Superfícies:** `--surface` / `--surface-hover` / `--card` — hierarquia sem peso visual excessivo.
- **Texto:** `--foreground` (principal), `--foreground-muted` (secundário), `--foreground-subtle` (terciário).
- **Acento principal (cyan):** `--accent-primary` (#22d3ee) — CTAs, links, ícones, highlights. Transmite tech e confiança.
- **Acento secundário (amber):** `--accent-secondary` — badges e ênfases secundárias (uso opcional).
- **Bordas:** `--border` e `--border-strong` — sutis para não competir com o conteúdo.

### Tipografia

- **Font stack:** system-ui / Segoe UI / Roboto (sem nova lib de fontes).
- **Escala:** `--text-xs` a `--text-7xl`; `--text-display` para hero (clamp).
- **Leading/tracking:** `--leading-tight`, `--tracking-tight` para títulos.

### Radius e sombras

- **Radius:** sm (0.375rem) a full; cards e botões em `xl` (1rem) para visual “premium”.
- **Sombras:** `--shadow-sm/md/lg` com opacidade controlada; `--shadow-glow` para destaque leve (evitar blur excessivo).

### Rationale

- **Um acento forte (cyan):** reconhecível e associado a tech/SaaS.
- **Fundo escuro + grid/noise:** referência a portfolios premiados, sem animação pesada.
- **Espaço em branco e grids:** layout mais editorial (Container, SectionTitle, seções com borda superior).

---

## 3. Checklist de conversão

| Item | Onde | Status |
|------|------|--------|
| Botão flutuante WhatsApp | FloatingWhatsApp (fixed bottom-6 right-6) | ✅ |
| CTA “Solicitar orçamento” | Hero, Services (por card), CTAFinal, Contact (implícito via form) | ✅ |
| CTA “Agendar call” / “Agendar reunião” | Hero, Navbar (desktop + mobile), Contact, CTAFinal | ✅ |
| Cases com modal | Projects: clique no card → CaseModal (Problema/Solução/Stack/Resultado/Links) | ✅ |
| Formulário de contato | Contact (Firebase + EmailJS) | ✅ |
| Tempo de resposta | Contact: “Respondo em até 24 horas” (já existia) | ✅ |

---

## 4. Como editar textos e links

### WhatsApp

- **Número:** `.env` → `VITE_WHATSAPP_NUMBER=5521965272231` (formato internacional sem `+`).
- **Mensagem padrão:** `src/utils/whatsapp.ts` → constante `DEFAULT_MESSAGE`.

### Calendly

- **URL:** `.env` → `VITE_CALENDLY_URL=https://calendly.com/seu-usuario/30min`.
- Uso: `src/config/content.ts` → `siteConfig.calendlyUrl` (fallback se env não definido).

### E-mail e redes

- **E-mail de contato:** `src/config/content.ts` → `siteConfig.contactEmail`.
- **GitHub / LinkedIn:** `siteConfig.githubUrl`, `siteConfig.linkedinUrl` e `socialLinks`.

### Textos do Hero e serviços

- **Hero:** `src/config/content.ts` → `heroTexts` (greeting, headline, subheadline).
- **Serviços:** `src/app/sections/Services.tsx` → array `services` (título, descrição, bullets).
- **Processo:** `src/app/sections/Process.tsx` → array `steps` (título, entregáveis).

---

## 5. Preview (OG) e como testar

### preview.png

- **Caminho:** `public/preview.png`.
- **Recomendado:** 1200×630 px (Open Graph / Twitter).
- **Conteúdo sugerido:** Nome “Bruno Souza”, frase de posicionamento e, se possível, identidade visual (cor cyan).
- **Como gerar:** design no Figma/Canva e exportar em PNG, ou screenshot da home e recorte.

### Testar OG e Twitter

1. Subir o site (ex.: `pnpm run build` + `pnpm run preview` ou deploy).
2. Usar [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) ou [Twitter Card Validator](https://cards-dev.twitter.com/validator) com a URL pública.
3. Se a imagem não atualizar, usar “Scrape Again” (Facebook) ou limpar cache.

### robots.txt e sitemap

- **Arquivos:** `public/robots.txt`, `public/sitemap.xml`.
- **Domínio:** substituir `https://seusite.com` pela URL real em ambos e em `index.html` (og:url).

---

## 6. Performance e acessibilidade

- **Lazy load:** TccEcoSphere (Three/Globe) carregado com `React.lazy` + `Suspense`.
- **Motion:** `useReducedMotion()` usado em Hero, Services, Trust, Process; `prefers-reduced-motion` em `index.css` (duração mínima).
- **Foco/teclado:** `focus-visible:ring-2` e `ring-[var(--ring)]` em botões e links principais; Navbar e modais acessíveis por teclado.
- **Contraste:** texto principal em `--foreground` sobre `--background`; muted em `--foreground-muted`; acento em `--accent-primary` (recomenda-se validar com ferramenta de contraste).
- **Nenhuma lib nova adicionada:** apenas Vite, React, Tailwind, Motion (já no projeto).

---

## 7. Estrutura final da home (landing de serviço)

1. **Hero** — Impacto + chip + 3 CTAs  
2. **Trust** — Métricas + strip de tecnologias  
3. **Services** — 4 cards (SaaS, Sistemas, Landing, Performance)  
4. **About** — Sobre e timeline  
5. **LiveStats** — Números animados  
6. **TccEcoSphere** — Destaque TCC (lazy)  
7. **Cases (Projects)** — Grid de projetos + modal com caso completo  
8. **Process** — 4 etapas (Descoberta → Deploy)  
9. **Certifications** — Certificados  
10. **Social Proof** — Depoimentos e números  
11. **Stack** — Skills  
12. **GitCommands** — Terminal interativo  
13. **Contact** — Form + WhatsApp + Agendar  
14. **CTA Final** — Mensagem + Solicitar orçamento + Agendar reunião  
15. **Footer** — Links e contato  

Navbar (fixa) com links, Agendar e ThemeToggle; botão flutuante WhatsApp; Calendly em modal.
