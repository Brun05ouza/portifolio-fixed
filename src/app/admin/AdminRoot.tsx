import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../config/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';

/**
 * Auth do admin (Supabase). Filhos vêm das rotas em App.tsx → Outlet no AdminLayout.
 */
export function AdminRoot() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    void supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] p-8 text-zinc-100">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold text-white">Admin</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Configure <code className="text-cyan-400">VITE_SUPABASE_URL</code> e{' '}
            <code className="text-cyan-400">VITE_SUPABASE_ANON_KEY</code> no .env.
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-cyan-400 hover:underline">
            Voltar ao site
          </Link>
        </div>
      </div>
    );
  }

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b]">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminLayout user={user} />;
}
