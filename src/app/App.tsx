import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

const PortfolioView = lazy(() => import('./PortfolioView').then((module) => ({ default: module.PortfolioView })));
const ProjectFormPage = lazy(() => import('./ProjectFormPage').then((module) => ({ default: module.ProjectFormPage })));
const ProjectDetailPage = lazy(() => import('./ProjectDetailPage').then((module) => ({ default: module.ProjectDetailPage })));
const AdminRoute = lazy(() => import('./admin/AdminRoute').then((module) => ({ default: module.AdminRoute })));
const DashboardPanel = lazy(() => import('./admin/panels/DashboardPanel').then((module) => ({ default: module.DashboardPanel })));
const CoursesPanel = lazy(() => import('./admin/panels/CoursesPanel').then((module) => ({ default: module.CoursesPanel })));
const CertificatesPanel = lazy(() => import('./admin/panels/CertificatesPanel').then((module) => ({ default: module.CertificatesPanel })));
const ProjectsPanel = lazy(() => import('./admin/panels/ProjectsPanel').then((module) => ({ default: module.ProjectsPanel })));
const SiteSettingsPanel = lazy(() => import('./admin/panels/SiteSettingsPanel').then((module) => ({ default: module.SiteSettingsPanel })));

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
    <Suspense fallback={null}>
      <Routes>
        <Route path="admin" element={<AdminRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPanel />} />
          <Route path="cursos" element={<CoursesPanel />} />
          <Route path="certificados" element={<CertificatesPanel />} />
          <Route path="projetos" element={<ProjectsPanel />} />
          <Route path="configuracao" element={<SiteSettingsPanel />} />
        </Route>
        <Route path="formulario" element={<ProjectFormPage />} />
        <Route path="projetos/:projectId" element={<ProjectDetailPage />} />
        <Route path="*" element={<PortfolioView />} />
      </Routes>
    </Suspense>
  );
}
