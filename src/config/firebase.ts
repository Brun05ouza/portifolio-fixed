import { initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/** Firestore só é inicializado se o projeto estiver configurado (VITE_FIREBASE_PROJECT_ID). */
export const db: Firestore | null =
  typeof firebaseConfig.projectId === 'string' && firebaseConfig.projectId.length > 0
    ? getFirestore(initializeApp(firebaseConfig))
    : null;
