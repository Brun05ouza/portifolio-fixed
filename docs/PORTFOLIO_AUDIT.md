# Auditoria do Portfólio — Bruno Souza

**Objetivo:** Documentação técnica completa para venda de serviços, vagas e demonstração de nível técnico.  
**Regra:** Tudo baseado no código real; itens não encontrados marcados como "N/A (não encontrado no repo)".

---

## 1) Detecção do Projeto

| Item | Valor |
|------|--------|
| **Framework** | Vite (SPA) |
| **Linguagem** | TypeScript |
| **UI** | React 18.3.1 |
| **Gerenciador de pacotes** | pnpm (implícito por `pnpm.overrides` em `package.json`); npm/yarn também utilizáveis |
| **Node sugerido** | N/A (não definido em `package.json`; sem campo `engines`) |
| **Padrão de rotas** | SPA de página única (uma rota; âncoras `#home`, `#about`, `#work`, etc.) |

**Evidências:**

- **package.json**: `"build": "vite build"`, `"dev": "vite"`, `"type": "module"`, `peerDependencies` React 18.3.1.
- **vite.config.ts**: `@vitejs/plugin-react`, `@tailwindcss/vite`, alias `@` → `./src`, `assetsInclude` para SVG/CSV.
- **tsconfig.json**: `"module": "ESNext"`, `"jsx": "react-jsx"`, `"baseUrl": "."`, `"paths": { "@/*": ["./src/*"] }`, `include: ["src"]`.
- **index.html**: ponto de entrada com `<div id="root">` e `<script type="module" src="/src/main.tsx">`.
- **Não é Next.js:** não há `next.config.*`, `app/` ou `pages/` no padrão Next.js; é Vite + React SPA.

### Variáveis de ambiente

Todas são opcionais exceto as necessárias para o recurso que você usa. Prefixo obrigatório: `VITE_` (expostas no cliente).

| Variável | Onde é usada | Descrição |
|----------|----------------|-----------|
| `VITE_GITHUB_USER` | `src/config/content.ts` | Usuário GitHub (padrão: Brun05ouza). |
| `VITE_GITHUB_TOKEN` | `src/app/services/githubService.ts` | Token para evitar rate limit da API GitHub. |
| `VITE_ALLOWED_REPOS` | `src/config/projects.ts` | JSON array de nomes de repositórios a exibir (ex.: `["repo1","repo2"]`). Se ausente, usa lista padrão. |
| `VITE_CONTACT_FORM_ENDPOINT` | `src/config/content.ts` | URL de endpoint alternativo para formulário (não usado ativamente no fluxo atual; Firebase/EmailJS são usados). |
| `VITE_FIREBASE_API_KEY` | `src/config/firebase.ts` | Config Firebase. |
| `VITE_FIREBASE_AUTH_DOMAIN` | `src/config/firebase.ts` | Config Firebase. |
| `VITE_FIREBASE_PROJECT_ID` | `src/config/firebase.ts` | Config Firebase (obrigatório para Firestore). |
| `VITE_FIREBASE_STORAGE_BUCKET` | `src/config/firebase.ts` | Config Firebase. |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `src/config/firebase.ts` | Config Firebase. |
| `VITE_FIREBASE_APP_ID` | `src/config/firebase.ts` | Config Firebase. |
| `VITE_EMAILJS_PUBLIC_KEY` | `src/app/services/contactEmailJS.ts` | EmailJS: chave pública. |
| `VITE_EMAILJS_SERVICE_ID` | `src/app/services/contactEmailJS.ts` | EmailJS: ID do serviço. |
| `VITE_EMAILJS_TEMPLATE_ID` | `src/app/services/contactEmailJS.ts` | EmailJS: ID do template. |

Referência: `.env.example` na raiz (não inclui `VITE_ALLOWED_REPOS`; pode ser documentado lá).

---

## 2) Como Rodar Localmente

### Pré-requisitos

- Node.js (recomendado LTS, ex.: 18+ ou 20+).
- pnpm (ou npm/yarn) para instalar dependências.

### Instalação

```bash
# Na raiz do repositório
pnpm install
# ou: npm install
# ou: yarn install
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm run dev` | Sobe o servidor de desenvolvimento (Vite). |
| `pnpm run build` | Gera build de produção em `dist/`. |
| `pnpm run lint` | Executa ESLint em `src` com `--max-warnings 0`. |
| `pnpm run typecheck` | Executa `tsc --noEmit`. |
| `pnpm run firebase:use` | Define o projeto Firebase a partir de `VITE_FIREBASE_PROJECT_ID` no `.env` e escreve `.firebaserc`. |

### Build e deploy

- **Build:** `pnpm run build` → saída em `dist/`.
- **Deploy:** N/A (não há `vercel.json`, `netlify.toml` ou config de CI no repo). Deploy típico: fazer upload da pasta `dist/` para Vercel, Netlify, Firebase Hosting ou qualquer host estático (SPA: configurar fallback para `index.html`).

### Troubleshooting

| Problema | Possível causa | Ação |
|----------|----------------|------|
| Rate limit na API do GitHub | Sem `VITE_GITHUB_TOKEN` ou limite excedido | Definir `VITE_GITHUB_TOKEN` no `.env` (opcional). O app usa cache 10 min e fallback estático. |
| Formulário de contato não envia | Firebase/EmailJS não configurados | Preencher variáveis em `.env` conforme `.env.example` (Firebase e/ou EmailJS). |
| Erro ao rodar `firebase:use` | Falta `.env` ou `VITE_FIREBASE_PROJECT_ID` | Criar `.env` a partir de `.env.example` e definir `VITE_FIREBASE_PROJECT_ID`. |
| Estilos quebrados / Tailwind não aplica | Cache ou ordem de imports | Garantir que `src/styles/index.css` é importado em `main.tsx` (já está). Reiniciar `pnpm run dev`. |

---

## 3) Arquitetura e Estrutura de Pastas

### Tree resumido (até 3 níveis)

```
portifolio-fixed/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── scripts/
│   └── set-firebase-project.js
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/       # Componentes de página + UI
│   │   │   ├── ui/           # Primitivos (shadcn-style)
│   │   │   ├── Hero.tsx, About.tsx, Contact.tsx, ...
│   │   │   └── *.css (Galaxy, Squares, RotatingText, TiltedCard)
│   │   └── services/         # contactEmailJS, contactFirebase, githubService
│   ├── config/               # content.ts, firebase.ts, projects.ts
│   ├── hooks/                # useReducedMotion.ts
│   └── styles/               # index.css, tailwind.css, theme.css, fonts.css
└── docs/
    └── PORTFOLIO_AUDIT.md
```

### Papel das pastas

| Pasta | Papel |
|-------|--------|
| **src/** | Código-fonte da aplicação. |
| **src/app/** | App React: raiz (`App.tsx`), componentes de seção e serviços. |
| **src/app/components/** | Componentes de seção (Hero, About, Projects, Contact, etc.) e subpasta **ui/** com componentes reutilizáveis (button, card, dialog, sheet, etc.). |
| **src/app/services/** | Lógica de contato (EmailJS, Firestore) e API GitHub (`githubService.ts`). |
| **src/config/** | Dados e configuração estáticos: conteúdo do site, Firebase, lista de repositórios permitidos. |
| **src/hooks/** | Hooks customizados (ex.: `useReducedMotion`). |
| **src/styles/** | CSS global: Tailwind, tema (variáveis), scrollbar, reduced-motion. |
| **scripts/** | Utilitários (ex.: sincronizar Firebase com `.env`). |

### Fluxo de renderização

- **SPA:** `index.html` carrega `main.tsx` → `main.tsx` monta `ThemeProvider` (next-themes) e `App` no `#root`.
- **App.tsx** renderiza em ordem: background global (Squares), `PillNav`, `main` (Hero → About → LiveStats → TccEcoSphere → Projects → Certifications → Stack → GitCommands → Contact), `Footer`, `Toaster`, botão “voltar ao topo”.
- Não há roteador (React Router, etc.): uma única página com seções por id e navegação por âncora (`#home`, `#about`, etc.).

### Padrões identificados

- **Componentes:** Organização por feature/seção em `components/` e primitivos em `components/ui/` (estilo shadcn/Radix).
- **Config centralizada:** `config/content.ts`, `config/projects.ts`, `config/firebase.ts`.
- **Serviços:** `services/` para contato e GitHub; sem API routes (não é Next.js).
- **Hooks:** `hooks/useReducedMotion.ts` para acessibilidade.
- **Design:** Não é atomic design explícito; há seções grandes e UI pequenos reutilizáveis.

---

## 4) Routes / Páginas

- **Tipo:** SPA de página única; não há rotas no sentido de múltiplas URLs.
- **Única “página”:** conteúdo em `src/app/App.tsx`, servido por `index.html` em qualquer path (fallback do servidor de deploy).

### Seções (âncoras)

| Id (hash) | Propósito | Componente principal |
|-----------|-----------|----------------------|
| `#home` | Hero, apresentação, CTAs | `Hero` |
| `#about` | Sobre, valores, timeline | `About` |
| `#stats` | Números (linhas de código, projetos, etc.) | `LiveStats` |
| `#tcc` | Projeto TCC EcoSphere | `TccEcoSphere` |
| `#work` | Lista de projetos (GitHub) | `Projects` |
| `#certificados` | Certificações (Alura, etc.) | `Certifications` |
| `#stack` | Skills por categoria | `Stack` |
| `#git-commands` | Terminal simulado + comandos Git | `GitCommands` |
| `#contact` | Formulário + links sociais | `Contact` |

### Dados/props e modo de renderização

- **SSR/SSG:** N/A (Vite SPA; tudo é CSR).
- **Dados:** Conteúdo em `config/content.ts` e `config/projects.ts`; projetos via `fetchUserRepos()` (GitHub API) no cliente; formulário envia para Firestore e/ou EmailJS.
- **API routes / Server Actions:** N/A (não há backend no repo).

---

## 5) Inventário de Componentes

### Por categoria

**Layout / Navegação**

| Componente | Arquivo | Props | Comportamento | Dependências |
|------------|---------|--------|----------------|---------------|
| PillNav | `components/PillNav.tsx` | — | Nav fixa (pill desktop, sheet mobile), highlight da seção no viewport, ThemeToggle | Sheet, ThemeToggle, navItems (content) |
| Footer | `components/Footer.tsx` | — | Links rápidos, email, copyright, animação opcional (useReducedMotion) | siteConfig, useReducedMotion |

**Seções de página**

| Componente | Arquivo | Props | Comportamento | Dependências |
|------------|---------|--------|----------------|--------------|
| Hero | `components/Hero.tsx` | — | Foto, saudação, texto rotativo, CTAs (Ver Projetos, Dashboard, Contato) | GlitchText, RotatingText, heroTexts, useReducedMotion |
| About | `components/About.tsx` | — | Valores, timeline (carreira/estudos), TiltedCard com foto | GlitchText, TiltedCard, useReducedMotion |
| LiveStats | `components/LiveStats.tsx` | — | Contadores animados (stats de content.ts) | GlitchText, stats, useReducedMotion, useInView |
| TccEcoSphere | `components/TccEcoSphere.tsx` | — | Seção TCC: features, link GitHub, GlobeAnimation | GlitchText, GlobeAnimation, motion |
| Projects | `components/Projects.tsx` | — | Busca repos no GitHub, grid de ProjectCard, loading/erro | ProjectCard, GlitchText, fetchUserRepos |
| Certifications | `components/Certifications.tsx` | — | Lista de certificações, expandir/recolher | GlitchText, react-icons |
| Stack | `components/Stack.tsx` | — | Categorias de skills com AnimatedList | GlitchText, AnimatedList, SkillItem, react-icons |
| GitCommands | `components/GitCommands.tsx` | — | Lista de comandos Git, terminal simulado, copiar | GlitchText, Sheet (ui) |
| Contact | `components/Contact.tsx` | — | Formulário (Firebase + opcional EmailJS), links sociais | GlitchText, contactFirebase, contactEmailJS, sonner |

**Background / Efeitos**

| Componente | Arquivo | Props | Comportamento | Dependências |
|------------|---------|--------|----------------|---------------|
| Squares | `components/Squares.tsx` | speed, squareSize, direction, borderColor, hoverFillColor, className | Grid animado em canvas | Squares.css |
| GlobeAnimation | `components/GlobeAnimation.tsx` | className?, size?, light? | Globo 3D (Three.js + three-globe) | three, three-globe, OrbitControls |

**UI / Primitivos (components/ui/)**

- **button, input, label, textarea, checkbox, switch, radio-group, select, slider, input-otp** — formulários.
- **card, badge, avatar, separator, progress, skeleton** — layout e feedback.
- **dialog, sheet, drawer, alert-dialog, popover, hover-card, tooltip, dropdown-menu, context-menu, menubar** — overlay e menus.
- **tabs, accordion, collapsible** — conteúdo agrupado.
- **carousel, scroll-area, resizable, table, breadcrumb, pagination** — listagem e navegação.
- **form** — react-hook-form + Radix.
- **sonner** — toasts (usado em Contact).
- **ThemeToggle** — alternância dark/light (next-themes).

**Animações / Texto**

| Componente | Arquivo | Props | Comportamento | Dependências |
|------------|---------|--------|----------------|---------------|
| GlitchText | `components/GlitchText.tsx` | text, className? | Efeito glitch em texto | motion |
| RotatingText | `components/RotatingText.tsx` | texts, mainClassName, ... | Rotação de palavras (Hero) | motion, AnimatePresence |
| AnimatedList / SkillItem | `components/AnimatedList.tsx` | — | Lista animada (Stack) | motion |
| TiltedCard | `components/TiltedCard.tsx` | imageSrc, title, overlayContent, ... | Card com tilt 3D e overlay | motion, useMotionValue, useSpring |
| ProjectCard | `components/ProjectCard.tsx` | title, description, image, tags, role, demoLink?, githubLink? | Card de projeto com spotlight e tilt | motion, useMotionValue, useSpring, useTransform |

**Outros**

| Componente | Arquivo | Observação |
|------------|---------|------------|
| ThemeToggle | `components/ThemeToggle.tsx` | Alterna tema (next-themes). |
| Galaxy | `components/Galaxy.tsx` | N/A (não importado em App.tsx; possivelmente legado). |

### Duplicação e refatoração

- **Padrão repetido:** Várias seções usam o mesmo bloco “título + GlitchText + subtítulo + linha decorativa”. Candidato a componente `SectionHeader`.
- **Galaxy:** Não está em uso; pode ser removido ou documentado como opcional.
- **ContactFormData:** Interface definida em `contactEmailJS.ts` e `contactFirebase.ts`; poderia ficar em um único tipo compartilhado.

---

## 6) Estilo, UI System e Design Tokens

### Stack de estilo

- **Tailwind CSS 4** (`@tailwindcss/vite`, `tailwindcss` 4.1.12) — `src/styles/tailwind.css` com `@import 'tailwindcss'` e `tw-animate-css`.
- **CSS global:** `src/styles/index.css` importa `fonts.css`, `tailwind.css`, `theme.css`; scrollbar customizada; `prefers-reduced-motion` aplicado globalmente.
- **theme.css:** Variáveis em `:root` (light) e `.dark` (dark); `@theme inline` para Tailwind v4 (cores, radius).
- **CSS modules:** N/A (não há `*.module.css`).
- **Styled-components / Emotion:** Instalados no package.json (MUI/Radix) mas não usados diretamente nos componentes do portfólio; estilos via Tailwind e CSS.

### Tokens principais (theme.css)

**Cores semânticas:** `--background`, `--foreground`, `--card`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--chart-1` a `--chart-5`, sidebar.

**Portfólio (verde):** `--color-glow`, `--color-beam-start`, `--color-beam-end`, `--color-spotlight`, `--color-chroma-1` a `--color-chroma-4`, `--squares-border`, `--squares-hover-fill`, `--overlay-gradient`.

**Tipografia:** `--font-size` (16px), `--font-weight-medium`, `--font-weight-normal`; em theme base há `--text-2xl`, `--text-xl`, etc. (referenciados em @layer base).

**Espaçamento / forma:** `--radius` (0.625rem), `--radius-sm/md/lg/xl` no @theme.

### Tema dark/light

- **next-themes:** `ThemeProvider` em `main.tsx` com `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`.
- **Aplicação:** Classe `dark` no `<html>`; variáveis em `theme.css` em `:root` (light) e `.dark` (dark).
- **Persistência:** Script inline em `index.html` lê `localStorage.theme` e aplica `.dark` antes da hidratação.
- **Toggle:** `ThemeToggle` em `PillNav`.

### Responsividade

- Breakpoints Tailwind padrão (sm, md, lg, xl, 2xl).
- Uso explícito: `md:block` / `md:hidden` na nav, `lg:grid-cols-2` em Contact/Projects, `sm:`, `md:` em padding e tipografia (ex.: Hero, About).
- N/A: arquivo de breakpoints customizados não encontrado; usa padrão Tailwind.

---

## 7) Animações e Interações

### Bibliotecas

- **motion** (12.23.24): `motion/react` — usado em praticamente todas as seções (Hero, About, PillNav, Projects, Contact, Footer, etc.).
- **Three.js** e **three-globe**: `GlobeAnimation.tsx` (globo 3D).
- **tw-animate-css**: animações utilitárias Tailwind.
- **GSAP:** N/A (não encontrado no repo).

### Onde estão as animações

- **Hero:** entrada (opacity, y), avatar (scale, rotate), texto, botões; RotatingText com spring.
- **About:** scroll indicator animado; TiltedCard com tilt; timeline.
- **PillNav:** entrada da barra; pill indicador com `layoutId` (shared layout).
- **LiveStats:** contadores (AnimatedNumber) ao entrar no viewport; useInView.
- **Projects / TccEcoSphere / Certifications / Stack / Contact:** `initial` / `whileInView`, opacity e eixo y/x.
- **ProjectCard:** spotlight e rotação 3D com useMotionValue/useSpring/useTransform.
- **TiltedCard:** mouse move → tilt; overlay.
- **GlitchText:** múltiplos motion.span com efeito glitch.
- **Footer:** ícone de coração com scale animado (respeitando useReducedMotion).
- **useReducedMotion:** Hero, About, LiveStats, Footer desativam ou encurtam animações quando `prefers-reduced-motion: reduce`.

### Performance e otimizações

- **Viewport:** Uso de `whileInView` e `viewport={{ once: true }}` evita re-animações contínuas.
- **Reduced motion:** Respeitado em vários componentes; `index.css` força duração mínima quando `prefers-reduced-motion: reduce`.
- **Globe:** `devicePixelRatio` limitado a 2; cleanup no `useEffect` (dispose). Possível melhoria: lazy load do Globe (dynamic import) para reduzir bundle inicial.
- **Squares:** requestAnimationFrame e resize; sem lazy hoje.

---

## 8) Dados, Conteúdo e SEO

### Onde ficam os dados

- **Hardcoded em config:** `src/config/content.ts` (siteConfig, navItems, stats, heroTexts, socialLinks); `src/config/projects.ts` (DEFAULT_ALLOWED_REPOS, knownDescriptions).
- **GitHub:** Projetos via `githubService.fetchUserRepos()`; cache 10 min em localStorage; fallback estático em caso de erro/rate limit.
- **JSON/MDX/CMS:** N/A (não há arquivos de conteúdo MDX ou CMS no repo).

### SEO

- **index.html:** `<title>Portfolio - Bruno Souza | Desenvolvedor Full Stack</title>`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `lang="pt-BR"`.
- **Open Graph / Twitter Cards:** N/A (não encontrado no repo).
- **Sitemap / robots.txt:** N/A (não encontrado no repo).
- **Canonical:** N/A (não encontrado no repo).
- **Schema.org / JSON-LD:** N/A (não encontrado no repo).

### Acessibilidade

- **Landmarks:** `<main>`, `<footer>`, `<section id="...">`; nav com `aria-label="Navegação principal"` em PillNav; Sheet com `SheetTitle` “Navegação”.
- **ARIA:** `aria-hidden` em elementos decorativos; `aria-invalid`, `aria-describedby` no formulário de contato; `aria-current` no item ativo da nav; `aria-label` no botão “Abrir menu” e “Voltar ao topo”.
- **Contraste:** Cores via tema (foreground/background); não foi feita auditoria de contraste automática.
- **Teclado:** `focus-visible:ring-2` e `focus-visible:outline` em links e botões; navegação por teclado possível.
- **Reduced motion:** Respeitado (hook + CSS).

### Internacionalização

- N/A (conteúdo em pt-BR fixo; não há i18n no repo).

---

## 9) Performance e Qualidade

### Imagens

- **Hero:** `<img src="/eu.png" width={128} height={128} alt="Bruno Souza">` — sem next/image (não é Next.js); alt presente.
- **ProjectCard / TiltedCard:** `loading="lazy"` usado; imagens vêm de URL (GitHub/placeholder) ou `/background-project.svg`, `/eu.png`.
- **GlobeAnimation:** texturas do CDN (three-globe); não há otimização de imagem no repo.
- **Recomendação:** Manter `width`/`height` e `loading="lazy"`; considerar formatos modernos (WebP) e srcset se houver várias resoluções.

### Fontes

- **fonts.css:** Arquivo vazio no repo; nenhum `@font-face` ou preload encontrado.
- **next/font:** N/A (não é Next.js).
- **Sistema:** Uso de fontes do sistema via Tailwind (não há referência a fontes customizadas no código auditado).

### Bundle e code splitting

- **Dynamic imports:** Apenas `loading="lazy"` em imagens; não há `React.lazy` ou `import()` dinâmico para componentes.
- **Imports pesados:** Three.js e three-globe carregados em `GlobeAnimation`; todo o módulo é carregado na entrada. Recomendação: `React.lazy(() => import('./GlobeAnimation'))` para a seção TCC.
- **Dependências grandes:** MUI, Radix, recharts, etc. — muitas delas usadas apenas em `ui/`; verificar uso real e tree-shaking.

### Melhorias concretas

| Melhoria | Arquivos | Como validar |
|----------|----------|--------------|
| Lazy load GlobeAnimation | `App.tsx`, `TccEcoSphere.tsx` | Bundle menor na carga inicial; Lighthouse/DevTools. |
| Extrair SectionHeader | About, Projects, Contact, Certifications, Stack, LiveStats, TccEcoSphere | Menos duplicação; um único componente de cabeçalho de seção. |
| Adicionar meta OG e Twitter | `index.html` ou template no build | Compartilhamento em redes com título/descrição/imagem. |
| Sitemap/robots para deploy | Raiz ou script de build | Melhor indexação em SPA (se houver domínio público). |

---

## 10) Segurança e Boas Práticas

- **Headers / CSP:** N/A (não há configuração de servidor ou meta CSP no repo; depende do host de deploy).
- **Sanitização:** Formulário de contato envia nome, email e mensagem; sem rich text; backend (Firebase/EmailJS) deve validar/sanitizar.
- **Dependências:** Nenhum script de auditoria (npm audit) executado nesta auditoria; recomendado rodar `pnpm audit` periodicamente.
- **Segredos:** Chaves e tokens vêm de `import.meta.env.VITE_*`; não devem ser commitadas; `.env.example` sem valores reais. **Atenção:** garantir que `.env` está no `.gitignore` e que nenhuma chave aparece em logs ou no bundle de forma indevida.

---

## 11) Lista de Melhorias (Roadmap)

### Quick Wins (1–2 h)

| Item | Impacto | Esforço | Arquivos | Validação |
|------|---------|---------|----------|-----------|
| Meta OG e Twitter em index.html | Melhor compartilhamento em redes | Baixo | `index.html` | Compartilhar link e inspecionar preview. |
| Adicionar `description` e keywords em meta | SEO básico | Baixo | `index.html` | Inspecionar `<head>`. |
| Links “Privacidade” e “Termos” no Footer | Evitar href="#" vazio | Baixo | `Footer.tsx` | Apontar para páginas ou remover. |
| Documentar VITE_ALLOWED_REPOS em .env.example | Configuração clara | Baixo | `.env.example` | Listar variável e formato (JSON array). |

### Melhorias de Médio Porte (1–2 dias)

| Item | Impacto | Esforço | Arquivos | Validação |
|------|---------|---------|----------|-----------|
| Componente SectionHeader reutilizável | Menos duplicação, manutenção mais fácil | Médio | Novo componente + seções | Trocar blocos repetidos por `<SectionHeader title={} subtitle={} />`. |
| Lazy load GlobeAnimation | Menor bundle inicial, LCP melhor | Médio | `App.tsx` ou `TccEcoSphere.tsx` | React.lazy + Suspense; medir bundle e LCP. |
| Sitemap e robots.txt no build | Indexação e SEO | Médio | Script ou plugin Vite / pasta public | Verificar em produção. |
| Testes E2E ou de smoke (ex.: Playwright) | Regressão antes de deploy | Médio | Nova pasta e CI | Rodar fluxo: abrir site, clicar Contato, preencher. |

### Melhorias “Nível Sênior” (1–2 semanas)

| Item | Impacto | Esforço | Arquivos | Validação |
|------|---------|---------|----------|-----------|
| Migrar para Next.js (App Router) ou manter Vite com SSR (ex.: vite-plugin-ssr) | SEO forte, meta por “página”, possível SSG | Alto | Todo o projeto | Métricas Core Web Vitals e indexação. |
| Schema.org (Person, WebSite) e JSON-LD | Rich results em busca | Médio | index.html ou componente Head | Testar com Ferramenta de Teste de Resultados. |
| Auditoria de acessibilidade (axe, Lera) | Conformidade e inclusão | Médio | Componentes e páginas | Relatório sem violações críticas. |
| Pipeline CI (lint, typecheck, build, testes) | Qualidade contínua | Médio | GitHub Actions ou similar | Push e PR com checks verdes. |
| Reduzir dependências (remover MUI se não usado, consolidar Radix) | Bundle e manutenção | Alto | package.json e imports | Bundle size e dependências instaladas. |

---

## 12) Checklist Final — Portfólio para Vender Serviço

### CTA e conversão

- [ ] **Botão principal acima da dobra:** Hero tem “Ver Projetos”, “Dashboard Técnico”, “Entre em Contato” — verificar se o CTA principal está claro para “contratar” ou “conversar”.
- [ ] **WhatsApp / canal direto:** N/A (não encontrado no repo). Considerar link ou botão flutuante WhatsApp além do formulário.
- [ ] **Email visível:** Footer e Contact exibem `siteConfig.contactEmail` — ok.
- [ ] **Calendário / agendar reunião:** N/A (não encontrado). Considerar link Calendly ou similar.
- [ ] **Formulário de contato:** Implementado (Firebase + EmailJS opcional); validado e com feedback (toast).

### Prova social

- [ ] **Números:** LiveStats exibe “Linhas de Código”, “Projetos Concluídos”, “Cafés”, “Horas de Estudo” — conferir se valores estão atualizados e críveis.
- [ ] **Depoimentos:** N/A (não encontrado). Considerar seção de depoimentos ou citações.
- [ ] **Certificações:** Seção Certificados presente (Alura, etc.) — ok.

### Cases (problema → solução → stack → resultado)

- [ ] **Projetos com contexto:** Projects mostra cards com link GitHub e descrição; falta narrativa “problema → solução → resultado” por projeto. Considerar texto curto ou link para case no próprio repo/README.
- [ ] **TCC EcoSphere:** Seção dedicada com features e link — bom exemplo de case destacado.

### Clareza de proposta

- [ ] **Headline:** Hero: “Apaixonado por [Desenvolvimento/Tecnologia/Café]” e subtítulo sobre estudante e evolução — alinhar com “Full Stack”, “Freelancer” ou “Disponível para projetos” se for o foco de venda.
- [ ] **Quem você atende:** Não explícito no código. Considerar frase do tipo “Ajudo empresas e startups a…” na Hero ou About.

### Copywriting e escaneabilidade

- [ ] **Parágrafos curtos:** About e Contact têm blocos de texto; revisar para listas ou frases curtas onde fizer sentido.
- [ ] **Hierarquia visual:** Títulos com GlitchText e linhas decorativas — boa hierarquia; manter consistência.
- [ ] **Idioma:** Tudo em pt-BR — adequado para público brasileiro.

---

## Como enviar este arquivo para o ChatGPT

1. Abra `docs/PORTFOLIO_AUDIT.md` no seu editor.
2. Selecione todo o conteúdo (Ctrl+A / Cmd+A).
3. Copie (Ctrl+C / Cmd+C).
4. No chat do ChatGPT, cole o conteúdo (Ctrl+V / Cmd+V).
5. Diga o que deseja fazer, por exemplo: “Com base nesta auditoria, priorize as melhorias de SEO” ou “Gere um README para o repositório usando esta auditoria”.

Isso permite ao modelo ter o contexto completo do portfólio e dar respostas alinhadas ao código e aos objetivos (vendas, vagas, nível técnico).
