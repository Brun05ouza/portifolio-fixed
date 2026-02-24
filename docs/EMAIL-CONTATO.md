# Receber contatos por e-mail (plano gratuito)

O formulário salva as mensagens no **Firestore** (coleção `contacts`). Para receber também um **e-mail** em **brunosouzagithub2003@gmail.com** sem usar Cloud Functions (que exigem plano Blaze), use **EmailJS** no frontend.

## Por que EmailJS?

- **Cloud Functions** no Firebase exigem plano **Blaze** (pagamento).
- Com **EmailJS** você usa o plano gratuito (200 e-mails/mês) e não precisa de backend.

## Configuração rápida

### 1. Conta no EmailJS

1. Acesse https://www.emailjs.com/ e crie uma conta.
2. No dashboard, anote sua **Public Key** (Account → API Keys).

### 2. Email Service

1. Menu **Email Services** → **Add New Service**.
2. Escolha **Gmail** (ou outro) e conecte sua conta **brunosouzagithub2003@gmail.com**.
3. Anote o **Service ID**.

### 3. Template de e-mail

1. Menu **Email Templates** → **Create New Template**.
2. **To Email:** `brunosouzagithub2003@gmail.com` (ou deixe fixo no serviço).
3. **Subject:** por exemplo: `Contato do portfólio: {{from_name}}`.
4. No corpo use as variáveis:
   - `{{from_name}}` – nome de quem enviou
   - `{{reply_to}}` – e-mail para responder
   - `{{message}}` – mensagem
5. Salve e anote o **Template ID**.

### 4. Variáveis no `.env`

No `.env` na raiz do projeto, adicione:

```env
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
```

Reinicie o servidor (`npm run dev`) após alterar o `.env`.

## Fluxo

1. O usuário envia o formulário.
2. Os dados são salvos no Firestore (coleção `contacts`).
3. Se o EmailJS estiver configurado, um e-mail é enviado para você com os mesmos dados.
4. Se o EmailJS não estiver configurado, apenas o Firestore é preenchido (sem erro).

Assim você continua no **plano gratuito** do Firebase e ainda recebe os contatos por e-mail.
