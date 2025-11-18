# Portfolio React

Um portfolio moderno e responsivo construído com React, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **React Router DOM** - Roteamento para SPAs
- **React Hook Form** - Gerenciamento de formulários

## 📁 Estrutura do Projeto

```
portfolio/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── BlogCard.jsx
│   │   ├── Dashboard.jsx          # 📊 Analytics em tempo real
│   │   ├── CodeEditor.jsx         # 💻 Editor interativo
│   │   ├── Timeline.jsx           # 🎯 Timeline de experiência
│   │   ├── SkillsRadar.jsx        # 📊 Radar de competências
│   │   ├── Certifications.jsx     # 🏆 Certificações
│   │   ├── GitHubStats.jsx        # 📈 Estatísticas GitHub
│   │   ├── ThemeToggle.jsx        # 🌙 Toggle de tema
│   │   └── NotificationToast.jsx  # 🔔 Sistema de notificações
│   ├── hooks/
│   │   ├── useTheme.js            # 🎨 Gerenciamento de tema
│   │   ├── useAnalytics.js        # 📊 Analytics hook
│   │   └── useNotification.js     # 🔔 Notificações hook
│   ├── utils/
│   │   └── performance.js         # ⚡ Métricas de performance
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Dashboard.jsx          # 🚀 Dashboard técnico
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   ├── blog/
│   │   ├── primeiro-post.md
│   │   └── segundo-post.md
│   ├── styles/
│   │   └── tailwind.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portfolio-react.git
cd portfolio-react
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` e adicione seu token do GitHub (opcional):
```
VITE_GITHUB_USERNAME=seu-usuario
VITE_GITHUB_TOKEN=seu-token-github
```

4. Execute o projeto:
```bash
npm run dev
```

5. Acesse `http://localhost:3000`

## 📱 Funcionalidades

### Básicas
- ✅ Design responsivo (mobile-first)
- ✅ Navegação fixa com menu hambúrguer
- ✅ Hero section com animações
- ✅ Seção "Sobre Mim" com skills
- ✅ Portfólio de projetos com filtros
- ✅ Blog com posts em Markdown
- ✅ Formulário de contato com validação
- ✅ Animações suaves com Framer Motion
- ✅ SEO otimizado

### Avançadas (Impressionam Recrutadores)
- 🚀 **Dashboard de Analytics** - Métricas em tempo real
- 🌙 **Sistema de Temas** - Dark/Light mode com persistência
- 💻 **Editor de Código Interativo** - Demonstração de skills técnicas
- 📊 **Radar de Skills** - Visualização interativa de competências
- 🏆 **Sistema de Certificações** - Badges verificados
- ⏱️ **Monitor de Performance** - Métricas de carregamento e memória
- 🔔 **Sistema de Notificações** - Toast notifications animadas
- 📈 **Integração GitHub** - Repositórios reais carregados automaticamente
- ⭐ **Projetos Dinâmicos** - Carregamento automático dos seus repositórios GitHub
- 🎯 **Timeline Interativa** - Experiência profissional visual
- ⚡ **Hooks Customizados** - Demonstração de React avançado

## 🎨 Personalização

### Cores e Tema
Edite o arquivo `tailwind.config.js` para personalizar as cores:

```js
colors: {
  primary: {
    50: '#eff6ff',
    400: '#60a5fa',  // Para dark mode
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Dark Mode
O tema escuro é habilitado automaticamente via classe CSS:
```js
darkMode: 'class'  // No tailwind.config.js
```

### Conteúdo
- **Projetos**: Edite o array `projects` em `src/pages/Projects.jsx`
- **Posts do Blog**: Adicione arquivos `.md` em `src/blog/`
- **Informações pessoais**: Atualize os dados em `src/pages/Home.jsx`
- **Skills**: Personalize em `src/components/SkillsRadar.jsx`
- **Certificações**: Atualize em `src/components/Certifications.jsx`
- **Timeline**: Modifique experiências em `src/components/Timeline.jsx`
- **GitHub**: Configure username em `src/components/GitHubStats.jsx`

## 🚀 Deploy

### Vercel
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Faça upload da pasta dist/
```

### AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://seu-bucket
```

## 🚀 Funcionalidades que Impressionam Recrutadores

### 1. Dashboard de Analytics em Tempo Real
- Métricas simuladas que atualizam automaticamente
- Monitoramento de performance (load time, memory usage)
- Visualização de dados com animações

### 2. Sistema de Temas Avançado
- Dark/Light mode com persistência no localStorage
- Transições suaves entre temas
- Toggle animado com Framer Motion

### 3. Editor de Código Interativo
- Demonstração de diferentes linguagens
- Interface similar a IDEs reais
- Tabs interativas com syntax highlighting

### 4. Hooks Customizados
- `useTheme` - Gerenciamento de tema
- `useAnalytics` - Simulação de métricas
- `useNotification` - Sistema de toast

### 5. Componentes Avançados
- Timeline interativa com animações
- Radar de skills com categorias
- Sistema de certificações verificadas
- Integração com APIs (GitHub)

## 📈 Melhorias de SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- URLs amigáveis
- Sitemap.xml (adicionar)
- Schema markup (adicionar)

## ♿ Acessibilidade

- Navegação por teclado
- Labels em formulários
- Alt text em imagens
- Contraste adequado
- ARIA labels
- Foco visível

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ por Bruno Souza (https://github.com/Brun05ouza)
