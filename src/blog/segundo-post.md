# Deploy de Aplicações React na AWS

*Publicado em 22 de Janeiro, 2024*

Fazer deploy de aplicações React pode parecer complexo, mas com as ferramentas certas da AWS, o processo se torna simples e eficiente.

## Opções de Deploy na AWS

### 1. Amazon S3 + CloudFront

A combinação mais popular para SPAs (Single Page Applications):

- **S3**: Hospedagem estática
- **CloudFront**: CDN global para performance
- **Route 53**: Gerenciamento de domínio

### 2. AWS Amplify

Solução completa para aplicações frontend:

- Deploy automático via Git
- CI/CD integrado
- Hosting global
- Funcionalidades backend opcionais

## Passo a Passo: Deploy com S3 + CloudFront

### 1. Build da Aplicação

```bash
npm run build
```

### 2. Criar Bucket S3

```bash
aws s3 mb s3://meu-app-react
aws s3 sync build/ s3://meu-app-react
```

### 3. Configurar CloudFront

- Criar distribuição CloudFront
- Apontar para o bucket S3
- Configurar error pages para SPA

### 4. Configurar Domínio Personalizado

- Registrar domínio no Route 53
- Criar certificado SSL no ACM
- Configurar CNAME no CloudFront

## Vantagens do Deploy na AWS

- **Escalabilidade**: Suporta milhões de usuários
- **Performance**: CDN global
- **Segurança**: HTTPS por padrão
- **Custo-benefício**: Pague apenas pelo que usar

## Automatização com GitHub Actions

```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to S3
        run: aws s3 sync build/ s3://meu-bucket
```

## Monitoramento e Logs

- **CloudWatch**: Métricas e logs
- **AWS X-Ray**: Tracing de requests
- **CloudTrail**: Auditoria de ações

O deploy na AWS oferece uma infraestrutura robusta e escalável para suas aplicações React. Com as práticas certas, você terá uma aplicação rápida e confiável!

---

*Tags: AWS, Deploy, React, CloudFront, S3*