import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import './admin-theme.css';

interface AdminLoginProps {
  onLogin: (user: { id: string; email: string }) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const payload = await response.json().catch(() => ({})) as { user?: { id: string; email: string }; error?: string };
    setLoading(false);

    if (!response.ok || !payload.user) {
      setError(payload.error || 'Nao foi possivel entrar.');
      return;
    }

    onLogin(payload.user);
  };

  return (
    <div className="admin-login-page">
      <form onSubmit={submit} className="admin-login-card">
        <h1>Painel administrativo</h1>
        <p className="mt-3 text-sm">Entre com o usuario criado no Neon.</p>

        {error ? <p className="mt-5 rounded-lg border border-red-900/60 bg-red-950/40 p-3 text-sm text-red-300">{error}</p> : null}

        <div className="mt-6 space-y-4">
          <div>
            <Label className="mb-2 block">E-mail</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="mt-6 w-full bg-cyan-600 text-white hover:bg-cyan-500">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
        </Button>

        <Link to="/" className="mt-6 block text-center text-sm text-zinc-500 hover:text-zinc-300">
          Voltar ao site
        </Link>
      </form>
    </div>
  );
}
