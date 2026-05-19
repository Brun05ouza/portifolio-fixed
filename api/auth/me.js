import { getSessionUser } from '../_lib/auth.js';

export default async function handler(request, response) {
  const user = await getSessionUser(request);
  if (!user) {
    response.status(401).json({ error: 'Login necessario.' });
    return;
  }
  response.status(200).json({ user });
}
