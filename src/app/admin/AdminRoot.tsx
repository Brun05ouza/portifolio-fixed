import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import './admin-theme.css';

type AdminUser = { id: string; email: string };

export function AdminRoot() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('admin-mode');
    let cancelled = false;

    fetch('/api/auth/me')
      .then(async (response) => {
        if (!response.ok) return null;
        const payload = await response.json() as { user?: AdminUser };
        return payload.user || null;
      })
      .catch(() => null)
      .then((sessionUser) => {
        if (cancelled) return;
        setUser(sessionUser);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      document.body.classList.remove('admin-mode');
    };
  }, []);

  if (loading) {
    return (
      <div className="admin-login-page">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!user) return <AdminLogin onLogin={setUser} />;

  return <AdminLayout user={user} onLogout={() => setUser(null)} />;
}
