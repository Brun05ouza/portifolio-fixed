import { readFileSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const envPath = join(root, '.env');
const firebasercPath = join(root, '.firebaserc');

let projectId = '';
try {
  const env = readFileSync(envPath, 'utf8');
  const line = env.split('\n').find((l) => l.startsWith('VITE_FIREBASE_PROJECT_ID='));
  if (line) {
    const value = line.slice('VITE_FIREBASE_PROJECT_ID='.length).trim();
    projectId = value.replace(/^["']|["']$/g, '');
  }
} catch (_) {}

if (!projectId) {
  console.error('Não encontrado VITE_FIREBASE_PROJECT_ID no arquivo .env');
  process.exit(1);
}

const firebaserc = { projects: { default: projectId } };
writeFileSync(firebasercPath, JSON.stringify(firebaserc, null, 2) + '\n');
console.log('Firebase project definido:', projectId);
