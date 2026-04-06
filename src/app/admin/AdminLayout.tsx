import { NavLink, Outlet } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  FolderKanban,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '../../config/supabase';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  { to: '/admin/certificados', label: 'Certificados', icon: Award },
  { to: '/admin/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/admin/configuracao', label: 'Configurações', icon: Settings },
] as const;

interface AdminLayoutProps {
  user: User;
}

export function AdminLayout({ user }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950/90 md:flex">
        <div className="flex h-14 items-center border-b border-zinc-800 px-4">
          <span className="text-sm font-semibold tracking-tight text-white">Portfólio CMS</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-950/80 text-cyan-300 ring-1 ring-cyan-800/60'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
          <p className="truncate px-1" title={user.email ?? ''}>
            {user.email}
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-sm">
          <div className="flex min-w-0 items-center gap-3 md:hidden">
            <span className="truncate text-sm font-medium text-white">CMS</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver site
            </a>
            <button
              type="button"
              onClick={() => {
                if (supabase) void supabase.auth.signOut();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b border-zinc-800 bg-zinc-950 px-2 py-2 md:hidden">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
                  isActive ? 'bg-cyan-950 text-cyan-300' : 'text-zinc-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <main className="flex-1 overflow-auto bg-[#0a0a0b] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
