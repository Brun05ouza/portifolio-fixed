import { NavLink, Outlet } from 'react-router-dom';
import {
  Award,
  BookOpen,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
} from 'lucide-react';
import './admin-theme.css';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  { to: '/admin/certificados', label: 'Certificados', icon: Award },
  { to: '/admin/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/admin/configuracao', label: 'Configuracoes', icon: Settings },
] as const;

interface AdminLayoutProps {
  user: {
    email?: string | null;
  };
  onLogout: () => void;
}

export function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => null);
    onLogout();
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar hidden shrink-0 flex-col md:flex">
        <div className="admin-brand">
          <span>Portfolio CMS</span>
          <strong>Bruno Souza</strong>
        </div>

        <nav className="admin-nav flex-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-user-card text-xs">
          <p className="truncate" title={user.email ?? ''}>
            {user.email}
          </p>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="flex min-w-0 items-center gap-3 md:hidden">
            <span className="admin-kicker truncate">CMS</span>
          </div>
          <div className="hidden md:block">
            <span className="admin-kicker">Painel privado</span>
          </div>

          <div className="admin-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-action">
              <ExternalLink className="h-3.5 w-3.5" />
              Ver site
            </a>
            <button type="button" onClick={() => void logout()} className="admin-action">
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </header>

        <div className="admin-mobile-nav md:hidden">
          {nav.map(({ to, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {label}
            </NavLink>
          ))}
        </div>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
