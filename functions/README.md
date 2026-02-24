# Envio de e-mail ao receber contato (Firebase Cloud Functions)

Quando alguém envia uma mensagem pelo formulário do portfólio, os dados são salvos no Firestore na coleção `contacts`. Esta função dispara automaticamente e envia um e-mail para **brunosouzagithub2003@gmail.com** com nome, e-mail e mensagem.

## Pré-requisitos

1. **Firebase CLI**  
   Instale na raiz do projeto (não precisa ser global). Use sempre `npx firebase` para evitar problema de "comando não encontrado" no PowerShell:
   ```bash
   npm install firebase-tools --save-dev
   npx firebase login
   ```

2. **Projeto Firebase**  
   Use o mesmo projeto onde o Firestore já está configurado (o mesmo `VITE_FIREBASE_PROJECT_ID` do `.env` do site).

3. **Senha de app do Gmail**  
   - Conta Google: brunosouzagithub2003@gmail.com  
   - Ative verificação em 2 etapas na conta.  
   - Acesse: https://myaccount.google.com/apppasswords  
   - Crie uma “Senha de app” para “Mail” e copie a senha de 16 caracteres.

## Configuração

### 1. Definir o projeto

Na raiz do projeto (onde está o `firebase.json`):

```bash
npx firebase use SEU_PROJECT_ID
```

Substitua `SEU_PROJECT_ID` pelo ID do projeto (o mesmo do `.env`: `VITE_FIREBASE_PROJECT_ID`).

### 2. Guardar a senha de app (sem plano pago)

O projeto usa variável de ambiente em vez de Secret Manager, para funcionar no **plano gratuito** do Firebase.

1. Na pasta `functions`, crie um arquivo **`.env`** (copie de `functions/.env.example`).
2. Preencha com sua senha de app do Gmail (16 caracteres, sem espaços):
   ```
   GMAIL_APP_PASSWORD=suasenhade16caracteres
   ```
3. O arquivo `functions/.env` já está no `.gitignore` — não será commitado.

### 3. Instalar dependências e fazer deploy

```bash
cd functions
npm install
cd ..
npx firebase deploy --only functions
```

## O que a função faz

- **Gatilho:** criação de um documento na coleção `contacts`.
- **Ação:** envia um e-mail para `brunosouzagithub2003@gmail.com` com:
  - **Assunto:** `Contato do portfólio: [Nome]`
  - **Corpo:** Nome, e-mail e mensagem (em texto e HTML).

O remetente do e-mail é o mesmo Gmail (`brunosouzagithub2003@gmail.com`); a autenticação usa o secret `GMAIL_APP_PASSWORD`.

## Resumo rápido

```bash
npm install firebase-tools --save-dev
npm run firebase:use
npx firebase login
# Criar functions/.env com GMAIL_APP_PASSWORD=sua_senha_de_app
cd functions && npm install && cd ..
npx firebase deploy --only functions
```

Depois disso, cada novo contato salvo no Firestore gerará o e-mail na sua caixa de entrada.
