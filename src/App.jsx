import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import DashboardPage from './pages/Dashboard'
import NotificationToast from './components/NotificationToast'
import ScrollProgress from './components/ScrollProgress'
import VisitorCounter from './components/VisitorCounter'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import { useNotification } from './hooks/useNotification'
import analyticsService from './services/analyticsService'

function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
    analyticsService.recordPageView(location.pathname);
  }, [location]);
  
  return null;
}

function App() {
  const { notifications, removeNotification } = useNotification();

  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
        <NotificationToast 
          notifications={notifications} 
          removeNotification={removeNotification} 
        />
        <ScrollProgress />
        <VisitorCounter />
        <CustomCursor />
      </Layout>
    </Router>
  )
}

export default App