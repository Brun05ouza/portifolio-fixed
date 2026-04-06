import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SiteContentProvider } from '../contexts/SiteContentContext';
import { PortfolioView } from './PortfolioView';
import { AdminRoot } from './admin/AdminRoot';
import { DashboardPanel } from './admin/panels/DashboardPanel';
import { CoursesPanel } from './admin/panels/CoursesPanel';
import { CertificatesPanel } from './admin/panels/CertificatesPanel';
import { ProjectsPanel } from './admin/panels/ProjectsPanel';
import { SiteSettingsPanel } from './admin/panels/SiteSettingsPanel';

function isEditableFocus(target: EventTarget | null): boolean {
  const el = target instanceof HTMLElement ? target : null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (el.isContentEditable) return true;
  return el.closest('[contenteditable="true"]') != null;
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.shiftKey || e.key.toLowerCase() !== 'a') return;
      if (isEditableFocus(e.target)) return;
      e.preventDefault();
      void navigate('/admin');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <SiteContentProvider>
      <Routes>
        <Route path="admin" element={<AdminRoot />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPanel />} />
          <Route path="cursos" element={<CoursesPanel />} />
          <Route path="certificados" element={<CertificatesPanel />} />
          <Route path="projetos" element={<ProjectsPanel />} />
          <Route path="configuracao" element={<SiteSettingsPanel />} />
        </Route>
        <Route path="*" element={<PortfolioView />} />
      </Routes>
    </SiteContentProvider>
  );
}
