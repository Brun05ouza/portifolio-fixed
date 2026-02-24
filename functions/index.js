const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { defineString } = require('firebase-functions/params');
const nodemailer = require('nodemailer');

// Usa variável de ambiente (sem Secret Manager = funciona no plano gratuito)
const gmailAppPassword = defineString('GMAIL_APP_PASSWORD');

const TO_EMAIL = 'brunosouzagithub2003@gmail.com';
const FROM_EMAIL = 'brunosouzagithub2003@gmail.com';

exports.sendContactEmail = onDocumentCreated(
  {
    document: 'contacts/{docId}',
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const pass = gmailAppPassword.value();
    if (!pass) {
      console.error('GMAIL_APP_PASSWORD não configurado. Crie functions/.env com GMAIL_APP_PASSWORD=sua_senha_de_app');
      return;
    }

    const data = snap.data();
    const name = data.name || '(sem nome)';
    const email = data.email || '(sem email)';
    const message = data.message || '(sem mensagem)';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: FROM_EMAIL,
        pass,
      },
    });

    const mailOptions = {
      from: `Portfólio <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `Contato do portfólio: ${name}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        ``,
        `Mensagem:`,
        message,
      ].join('\n'),
      html: [
        `<p><strong>Nome:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
        `<p><strong>Mensagem:</strong></p>`,
        `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      ].join(''),
    };

    await transporter.sendMail(mailOptions);
  }
);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
