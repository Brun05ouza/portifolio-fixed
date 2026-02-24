import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const COLLECTION = 'contacts';

/**
 * Salva a mensagem de contato no Firestore.
 * Configure as variáveis VITE_FIREBASE_* no .env.
 * Para envio de e-mail ao receber, use Firebase Extension "Trigger Email" ou uma Cloud Function.
 */
export async function submitContactToFirebase(data: ContactFormData): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!db) {
    return { ok: false, error: 'Firebase não configurado. Adicione VITE_FIREBASE_PROJECT_ID (e demais variáveis) no .env.' };
  }

  try {
    await addDoc(collection(db, COLLECTION), {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erro ao salvar mensagem. Tente novamente.';
    return { ok: false, error: message };
  }
}
