# Portfolio de Desenvolvedor Web 🚀

Portfolio moderno e animado inspirado em conceitos do React Bits, com microinterações avançadas e design "fora da caixa".

## ✨ Características

### Microinterações Avançadas
- **Pill Navigation**: Navegação com indicador fluido que acompanha a seção ativa
- **Tilt 3D**: Cards de projetos com efeito de inclinação 3D seguindo o cursor
- **Glitch Effect**: Texto com efeito glitch ao passar o mouse
- **Spotlight**: Efeito de luz que segue o cursor nas seções principais
- **Beam Background**: Gradientes animados vibrantes
- **Chroma Grid**: Grid de cores animadas no fundo
- **Animated Lists**: Listas com animação de entrada escalonada

### Seções
1. **Home/Hero**: Apresentação impactante com spotlight e beam
2. **Sobre**: Bio, valores e timeline de carreira
3. **Projetos**: Galeria de projetos com cards tilt 3D
4. **Experiência**: Timeline profissional com resultados quantificados
5. **Stack & Skills**: Tecnologias com barras de progresso animadas
6. **Contato**: Formulário de contato e links sociais

## 🛠️ Tecnologias Utilizadas

- **React 18.3** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Estilização utility-first
- **Motion (Framer Motion)** - Animações avançadas
- **Lucide React** - Ícones modernos
- **Vite** - Build tool rápida

## 🎨 Design System

### Cores Customizadas
```css
--color-glow: #6366f1 (Indigo)
--color-beam-start: #8b5cf6 (Purple)
--color-beam-end: #ec4899 (Pink)
--color-spotlight: rgba(139, 92, 246, 0.3)
--color-chroma-1: #6366f1
--color-chroma-2: #8b5cf6
--color-chroma-3: #ec4899
--color-chroma-4: #06b6d4
```

### Gradientes
- Beam: Linear gradient diagonal vibrante
- Spotlight: Radial gradient que segue o cursor
- Chroma: Múltiplas cores para background dinâmico

## 🚀 Como Usar

### Instalação
```bash
# Clone o repositório
git clone [seu-repo]

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

### Build para Produção
```bash
npm run build
```

## 📦 Estrutura de Componentes

```
/src/app/components/
├── PillNav.tsx          # Navegação com pill indicator
├── Hero.tsx             # Hero com spotlight e beam
├── GlitchText.tsx       # Texto com efeito glitch
├── ProjectCard.tsx      # Card com tilt 3D
├── ChromaGrid.tsx       # Grid de cores animadas
├── AnimatedList.tsx     # Lista com animação
├── About.tsx            # Seção sobre
├── Projects.tsx         # Seção de projetos
├── Experience.tsx       # Seção de experiência
├── Stack.tsx            # Seção de tecnologias
├── Contact.tsx          # Seção de contato
└── Footer.tsx           # Rodapé
```

## 🎯 Conceitos Inspirados no React Bits

### Tilt 3D
Cards que inclinam em 3D seguindo a posição do mouse usando `useMotionValue` e `useTransform` do Motion.

### Spotlight
Efeito de luz radial que segue o cursor, criando um destaque dinâmico no conteúdo.

### Glitch Effect
Múltiplas camadas de texto com offsets e cores diferentes que animam ao hover.

### Pill Navigation
Indicador animado que desliza entre os itens usando `layoutId` do Motion.

### Animated Beam
Background com gradiente linear animado e overlay de spotlight.

## 🎨 Customização

### Alterar Cores
Edite as variáveis CSS em `/src/styles/theme.css`:

```css
:root {
  --color-glow: #sua-cor;
  --color-beam-start: #sua-cor;
  --color-beam-end: #sua-cor;
}
```

### Adicionar Projetos
Edite o array `projects` em `/src/app/components/Projects.tsx`:

```typescript
{
  title: 'Seu Projeto',
  description: 'Descrição do impacto',
  image: 'url-da-imagem',
  tags: ['React', 'TypeScript'],
  role: 'Full Stack',
  demoLink: '#',
  githubLink: '#',
}
```

### Modificar Experiências
Edite o array `experiences` em `/src/app/components/Experience.tsx`.

### Atualizar Skills
Edite `skillCategories` em `/src/app/components/Stack.tsx`.

## 📱 Responsividade

O portfolio é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Acessibilidade

- Navegação por teclado suportada
- Labels ARIA apropriadas
- Respeito a `prefers-reduced-motion`
- Contraste de cores adequado
- Scroll suave

## 🌟 Performance

- Code splitting automático via Vite
- Lazy loading de componentes
- Otimização de animações (GPU-accelerated)
- Imagens otimizadas via Unsplash

## 📝 Notas

- As imagens dos projetos são carregadas do Unsplash. Substitua pelos seus projetos reais.
- Os links sociais e de contato são placeholders. Atualize com seus dados.
- O formulário de contato atualmente apenas loga no console. Integre com seu backend ou serviço de email.

## 🤝 Contribuindo

Sinta-se livre para fazer fork e customizar este portfolio para suas necessidades!

## 📄 Licença

MIT

---

Feito com ❤️ e React
