import React, { useState } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  GraduationCap, 
  History, 
  User, 
  LogOut, 
  Bell, 
  Search,
  Settings,
  Calendar,
  Building2,
  Library,
  Star,
  FileText,
  LifeBuoy,
  Book,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertTriangle,
  PartyPopper,
  Trash2,
  CheckCircle,
  Clock, // Added Clock for future use or consistency if needed
  Moon,
  Sun,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_USER, MOCK_SEMESTERS, MOCK_SCHEDULE, MOCK_ROOMS, MOCK_BOOKS, MOCK_EVALUATIONS, MOCK_PQRS, MOCK_SUPPORT_TICKETS, MOCK_NOTIFICATIONS } from './mockData';
import Overview from './components/Overview';
import GradesList from './components/GradesList';
import AcademicHistory from './components/AcademicHistory';
import Profile from './components/Profile';
import ScheduleView from './components/ScheduleView';
import RoomsView from './components/RoomsView';
import LibraryView from './components/LibraryView';
import TeacherEvaluationView from './components/TeacherEvaluationView';
import PQRSView from './components/PQRSView';
import SupportView from './components/SupportView';
import ManualView from './components/ManualView';
import LoginPage from './components/LoginPage';

type View = 'dashboard' | 'grades' | 'history' | 'profile' | 'schedule' | 'rooms' | 'library' | 'eval' | 'pqrs' | 'support' | 'manual';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(MOCK_USER);
  const [semesters] = useState(MOCK_SEMESTERS);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotifIcon = (type: any) => {
    switch(type) {
      case 'exam': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'quiz': return <BookOpen className="w-4 h-4 text-amber-500" />;
      case 'event': return <PartyPopper className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleUpdateUser = (updatedUser: typeof MOCK_USER) => {
    setUser(updatedUser);
  };

  const navItems = [
    { id: 'dashboard' as View, label: 'Panel Principal', icon: BarChart3 },
    { id: 'grades' as View, label: 'Calificaciones', icon: BookOpen },
    { id: 'history' as View, label: 'Historial Académico', icon: History },
    { id: 'schedule' as View, label: 'Horario', icon: Calendar },
    { id: 'rooms' as View, label: 'Aulas Disponibles', icon: Building2 },
    { id: 'library' as View, label: 'Biblioteca Virtual', icon: Library },
    { id: 'eval' as View, label: 'Evaluación Docente', icon: Star },
    { id: 'profile' as View, label: 'Mi Perfil', icon: User },
    { id: 'pqrs' as View, label: 'PQRS', icon: FileText },
    { id: 'support' as View, label: 'Soporte', icon: LifeBuoy },
    { id: 'manual' as View, label: 'Manual de Usuario', icon: Book },
  ];

  const getViewTitle = (id: View) => {
    return navItems.find(item => item.id === id)?.label || 'Portal Académico';
  };

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className={`flex min-h-screen lg:h-screen bg-brand-bg transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        bg-brand-sidebar flex flex-col h-screen lg:h-full shrink-0 transition-all duration-300 overflow-hidden z-50
        fixed lg:relative
        ${mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed && !mobileMenuOpen ? 'lg:w-0' : 'lg:w-64 w-64'}
      `}>
        {/* Logo and App Title */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center p-1 shadow-sm">
            <GraduationCap className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <h1 className="text-[10px] font-black text-white leading-tight uppercase tracking-widest">Unicomfacauca</h1>
            <p className="text-[9px] font-bold text-slate-400 leading-tight uppercase">Portal Estudiantil</p>
          </div>
        </div>

        {/* User Summary */}
        <div className="px-6 py-6 border-y border-white/5 mx-2 my-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold shrink-0">
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{user.periodLabel}</p>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full sidebar-nav-item ${
                activeView === item.id ? 'sidebar-nav-item-active' : 'sidebar-nav-item-inactive'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen lg:h-full relative">
        {/* Floating Toggle Button (Desktop Only) */}
        <div className="absolute left-0 top-14 -translate-x-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-8 h-8 bg-[#3b82f6] border border-[#2563eb] rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#2563eb] transition-all transform hover:scale-105 group active:scale-95"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 text-xs font-bold">
               <BarChart3 className="w-4 h-4 text-brand-info shrink-0" />
               <span className="text-[#1e2d4d] leading-none truncate max-w-[120px] md:max-w-none">{getViewTitle(activeView)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition-colors"
              title={isDarkMode ? 'Modo Claro' : 'Modo Nocturno'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                jueves, 26 de marzo de 2026
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 hover:bg-slate-50 rounded-lg relative transition-colors ${showNotifications ? 'bg-slate-50 text-brand-info' : 'text-slate-400'}`}
              >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-yellow-400 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-[calc(100vw-2rem)] md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#1e2d4d]">Notificaciones</h3>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-[9px] font-black text-brand-info uppercase hover:underline"
                          >
                            Marcar todo como leído
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id}
                              className={`p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors relative group ${!notif.isRead ? 'bg-brand-info/5' : ''}`}
                            >
                              <div className="flex gap-3">
                                <div className="mt-0.5 shrink-0">
                                  {getNotifIcon(notif.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <p className={`text-[11px] font-black uppercase leading-tight ${!notif.isRead ? 'text-[#1e2d4d]' : 'text-slate-500'}`}>
                                      {notif.title}
                                    </p>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteNotification(notif.id);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                                    {notif.message}
                                  </p>
                                  <p className="text-[9px] text-slate-300 mt-2 font-medium uppercase tracking-tighter">
                                    {notif.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                             <CheckCircle className="w-8 h-8 text-slate-200" />
                             <p className="text-[10px] font-bold text-slate-400 flex flex-col">
                                <span>No tienes notificaciones</span>
                                <span className="font-medium text-[9px]">¡Estás al día!</span>
                             </p>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                         <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#1e2d4d]">
                            Configurar alertas
                         </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-brand-bg">
          <div className="max-w-6xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeView === 'dashboard' && <Overview user={user} currentSemester={semesters[0]} schedule={MOCK_SCHEDULE} />}
                {activeView === 'grades' && <GradesList semester={semesters[0]} user={user} />}
                {activeView === 'history' && <AcademicHistory semesters={semesters} />}
                {activeView === 'profile' && <Profile user={user} onUpdate={handleUpdateUser} />}
                {activeView === 'schedule' && <ScheduleView schedule={MOCK_SCHEDULE} />}
                {activeView === 'rooms' && <RoomsView rooms={MOCK_ROOMS} />}
                {activeView === 'library' && <LibraryView books={MOCK_BOOKS} />}
                {activeView === 'eval' && <TeacherEvaluationView evaluations={MOCK_EVALUATIONS} />}
                {activeView === 'pqrs' && <PQRSView pqrsList={MOCK_PQRS} />}
                {activeView === 'support' && <SupportView tickets={MOCK_SUPPORT_TICKETS} />}
                {activeView === 'manual' && <ManualView />}
                {/* Fallback for not implemented views */}
                {!['dashboard', 'grades', 'history', 'profile', 'schedule', 'rooms', 'library', 'eval', 'pqrs', 'support', 'manual'].includes(activeView) && (
                   <div className="flex flex-col items-center justify-center h-64 text-slate-400 p-12 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
                      <GraduationCap className="w-16 h-16 opacity-10 mb-4" />
                      <p className="text-sm font-bold uppercase tracking-widest text-slate-600">En Desarrollo</p>
                      <p className="text-xs mt-2 font-medium">Esta sección estará disponible próximamente en el portal.</p>
                   </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
