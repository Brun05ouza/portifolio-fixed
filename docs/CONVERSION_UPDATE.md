# Atualização de Conversão — Portfólio

Este documento descreve todas as alterações feitas para transformar o portfólio em uma máquina de venda de serviços (captação de clientes, autoridade técnica, conversão via WhatsApp e agendamento).

---

## 1. O que foi criado

| Arquivo | Descrição |
|---------|-----------|
| `src/utils/whatsapp.ts` | Função `openWhatsApp(message?)` para abrir WhatsApp com mensagem pré-preenchida. |
| `src/app/sections/Services.tsx` | Seção de serviços com 4 cards (SaaS, Sistemas empresariais, Landing pages, Performance) e CTA "Solicitar orçamento". |
| `src/config/cases.ts` | Configuração de cases: problema, solução e resultado por repositório; placeholder quando não houver dado real. |
| `src/app/components/CaseModal.tsx` | Modal com detalhes do case: problema, solução técnica, stack, resultado e links demo/GitHub. |
| `src/app/sections/SocialProof.tsx` | Seção de prova social: 3 depoimentos (estrutura pronta para substituir) e estatísticas (+projetos, +sistemas, 100% performance). |
| `src/app/components/FloatingWhatsApp.tsx` | Botão flutuante WhatsApp (fixed bottom-6 right-6), ícone, hover animado e sombra. |
| `src/app/components/CalendlyModal.tsx` | Modal com iframe do Calendly para "Agendar reunião". |
| `src/app/sections/CTAFinal.tsx` | CTA antes do footer: "Vamos transformar sua ideia..." + botões Solicitar orçamento e Agendar reunião. |
| `public/robots.txt` | `User-agent: *`, `Allow: /`, `Sitemap: https://seusite.com/sitemap.xml`. |
| `public/sitemap.xml` | Sitemap com URL principal (substitua `https://seusite.com` pelo seu domínio). |

**Preview de compartilhamento (OG/Twitter):**  
Foi referenciado `/preview.png` no `index.html`. **Você precisa criar o arquivo** `public/preview.png` (recomendado 1200×630 px) para redes sociais. Até lá, o link da imagem pode retornar 404 ao compartilhar.

---

## 2. Arquivos alterados

| Arquivo | Alteração |
|---------|-----------|
| `src/config/content.ts` | Inclusão de `heroTexts.headline`, `heroTexts.subheadline`, `siteConfig.whatsappNumber`, `siteConfig.calendlyUrl`. |
| `src/config/content.ts` | Nav: item "Serviços" (#services), label "Projetos" → "Cases" (#work). |
| `src/app/components/Hero.tsx` | Nova headline e subheadline estratégicas; 2 CTAs: "Solicitar orçamento" (WhatsApp) e "Ver projetos" (#work). Remoção do texto rotativo e do terceiro CTA. |
| `src/app/services/githubService.ts` | Interface `ProjectFromRepo`: campo opcional `repoName`; preenchido em `parseApiResponse`. |
| `src/app/components/ProjectCard.tsx` | Props `repoName?` e `onSelect?`; clique no card chama `onSelect()` (links internos continuam funcionando). |
| `src/app/components/Projects.tsx` | Título "Cases", subtítulo sobre problema/solução/stack/resultado; estado `selectedCase` e `CaseModal`; cada card passa `onSelect={() => setSelectedCase(project)}`. |
| `src/app/components/Contact.tsx` | Prop `onScheduleMeeting?: () => void` e botão "Agendar reunião" que chama essa função. |
| `src/app/App.tsx` | Estado `calendlyOpen`; import de `Services`, `SocialProof`, `CTAFinal`, `FloatingWhatsApp`, `CalendlyModal`; ordem: Hero → Services → About → LiveStats → TccEcoSphere (lazy) → Projects → Certifications → SocialProof → Stack → GitCommands → Contact → CTAFinal → Footer; render de `FloatingWhatsApp` e `CalendlyModal`; botão "voltar ao topo" com `bottom-24 right-6` para não sobrepor o WhatsApp. |
| `src/app/App.tsx` | `TccEcoSphere` carregado com `React.lazy` e `Suspense` (fallback "Carregando...") para reduzir bundle inicial. |
| `index.html` | Meta description, Open Graph (og:title, og:description, og:image, og:type, og:url, og:locale), Twitter Cards (twitter:card, twitter:title, twitter:description, twitter:image); título atualizado. |
| `.env.example` | Comentários e exemplos para `VITE_WHATSAPP_NUMBER` e `VITE_CALENDLY_URL`. |

---

## 3. Como testar

1. **Rodar o projeto**
   ```bash
   pnpm install
   pnpm run dev
   ```

2. **Hero**
   - Headline: "Desenvolvo sistemas web escaláveis..."
   - Subheadline: "Especialista em SaaS..."
   - Botão "Solicitar orçamento" abre WhatsApp (número em `.env` ou fallback).
   - Botão "Ver projetos" leva à seção #work.

3. **Serviços**
   - Seção #services após o Hero com 4 cards.
   - Cada "Solicitar orçamento" abre WhatsApp com mensagem incluindo o nome do serviço.

4. **Cases**
   - Seção #work com título "Cases".
   - Clique em um card de projeto: abre modal com Problema, Solução, Stack, Resultado e links.

5. **Prova social**
   - Seção com 3 depoimentos e 3 estatísticas.

6. **WhatsApp flutuante**
   - Botão verde fixo no canto inferior direito; ao clicar abre WhatsApp.

7. **Agendar reunião**
   - Em Contact e no CTA final: botão "Agendar reunião" abre modal com iframe do Calendly (URL em `siteConfig.calendlyUrl`).

8. **CTA final**
   - Antes do footer: texto "Vamos transformar sua ideia..." e os dois botões (Solicitar orçamento, Agendar reunião).

9. **Performance**
   - Seção TCC (globo) só carrega ao chegar na página (lazy); aparece "Carregando..." brevemente.

10. **SEO**
    - Abra as ferramentas de desenvolvedor e inspecione `<head>`: meta description e tags og/twitter presentes.

---

## 4. Como substituir WhatsApp e Calendly

### WhatsApp

- **Número:** Defina no `.env`:
  ```env
  VITE_WHATSAPP_NUMBER=5521999999999
  ```
  Use o número no formato internacional, sem `+` (ex.: Brasil: 55 + DDD + número).

- **Mensagem padrão:** Está em `src/utils/whatsapp.ts` na constante `DEFAULT_MESSAGE`. Altere lá se quiser outro texto padrão.

### Calendly

- **URL do agendamento:** No `.env`:
  ```env
  VITE_CALENDLY_URL=https://calendly.com/seu-usuario/30min
  ```
  Substitua pelo seu link do Calendly (pode ser o mesmo que você usa no iframe do site deles).

- **Uso em iframe:** A URL normal do Calendly (ex.: `https://calendly.com/usuario/30min`) costuma funcionar em iframe. Se a rede do Calendly exigir domínio autorizado, configure em Calendly → Embed → allowed domains.

---

## 5. Substituir depoimentos e casos reais

- **Depoimentos:** Edite o array `testimonials` em `src/app/sections/SocialProof.tsx` (quote, author, role).
- **Cases (problema/solução/resultado):** Edite o objeto `caseDetailsByRepo` em `src/config/cases.ts`; a chave é o nome do repositório (ex.: `nexus-flow-web`). Para novos repos, inclua uma entrada nesse objeto ou o sistema usará o placeholder definido em `getCaseDetails`.

---

## 6. Domínio e SEO em produção

- Substitua `https://seusite.com` por seu domínio real em:
  - `index.html`: `og:url`
  - `public/robots.txt`: `Sitemap`
  - `public/sitemap.xml`: `<loc>`
- Crie e coloque `public/preview.png` (1200×630 px) para compartilhamento em redes sociais.
