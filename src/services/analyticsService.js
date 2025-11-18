// Sistema de Analytics Real
class AnalyticsService {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeAnalytics();
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  initializeAnalytics() {
    // Registra visita
    this.recordVisit();
    
    // Registra usuário online
    this.registerOnlineUser();
    
    // Cleanup ao sair
    window.addEventListener('beforeunload', () => {
      this.unregisterOnlineUser();
    });
  }

  recordVisit() {
    const today = new Date().toDateString();
    const visits = JSON.parse(localStorage.getItem('portfolio-analytics') || '{}');
    
    // Incrementa visitas do dia
    visits[today] = (visits[today] || 0) + 1;
    
    // Mantém apenas últimos 30 dias
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    Object.keys(visits).forEach(date => {
      if (new Date(date) < thirtyDaysAgo) {
        delete visits[date];
      }
    });
    
    localStorage.setItem('portfolio-analytics', JSON.stringify(visits));
  }

  getTotalVisits() {
    const visits = JSON.parse(localStorage.getItem('portfolio-analytics') || '{}');
    return Object.values(visits).reduce((total, count) => total + count, 0);
  }

  getTodayVisits() {
    const today = new Date().toDateString();
    const visits = JSON.parse(localStorage.getItem('portfolio-analytics') || '{}');
    return visits[today] || 0;
  }

  registerOnlineUser() {
    const onlineUsers = JSON.parse(localStorage.getItem('portfolio-online') || '[]');
    const now = Date.now();
    
    // Remove usuários inativos (mais de 5 minutos)
    const activeUsers = onlineUsers.filter(user => now - user.lastSeen < 300000);
    
    // Adiciona usuário atual
    activeUsers.push({
      sessionId: this.sessionId,
      lastSeen: now
    });
    
    localStorage.setItem('portfolio-online', JSON.stringify(activeUsers));
    
    // Atualiza a cada 30 segundos
    this.onlineInterval = setInterval(() => {
      this.updateOnlineStatus();
    }, 30000);
  }

  updateOnlineStatus() {
    const onlineUsers = JSON.parse(localStorage.getItem('portfolio-online') || '[]');
    const now = Date.now();
    
    // Atualiza timestamp do usuário atual
    const updatedUsers = onlineUsers.map(user => 
      user.sessionId === this.sessionId 
        ? { ...user, lastSeen: now }
        : user
    ).filter(user => now - user.lastSeen < 300000); // Remove inativos
    
    localStorage.setItem('portfolio-online', JSON.stringify(updatedUsers));
  }

  getOnlineUsers() {
    const onlineUsers = JSON.parse(localStorage.getItem('portfolio-online') || '[]');
    const now = Date.now();
    
    // Filtra usuários ativos
    const activeUsers = onlineUsers.filter(user => now - user.lastSeen < 300000);
    localStorage.setItem('portfolio-online', JSON.stringify(activeUsers));
    
    return activeUsers.length;
  }

  unregisterOnlineUser() {
    const onlineUsers = JSON.parse(localStorage.getItem('portfolio-online') || '[]');
    const filteredUsers = onlineUsers.filter(user => user.sessionId !== this.sessionId);
    localStorage.setItem('portfolio-online', JSON.stringify(filteredUsers));
    
    if (this.onlineInterval) {
      clearInterval(this.onlineInterval);
    }
  }

  getPageViews() {
    const pageViews = JSON.parse(localStorage.getItem('portfolio-pageviews') || '{}');
    return pageViews;
  }

  recordPageView(page) {
    const pageViews = JSON.parse(localStorage.getItem('portfolio-pageviews') || '{}');
    pageViews[page] = (pageViews[page] || 0) + 1;
    localStorage.setItem('portfolio-pageviews', JSON.stringify(pageViews));
  }

  getSessionDuration() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
}

export default new AnalyticsService();