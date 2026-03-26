import { useAuth } from '../context/AuthContext';
import { 
  LogOut, Globe, Cpu, User, LayoutDashboard, Trophy, BookOpen, 
  Menu, X, MessageSquare, Newspaper, Info, HelpCircle, ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, logout, language, toggleLanguage } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Nexus Hub', path: '/dashboard', color: 'text-primary' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Neural Rank', path: '/profile', color: 'text-secondary' },
    { icon: <Newspaper className="w-5 h-5" />, label: 'Study Blog', path: '/blog', color: 'text-accent' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Sync Support', path: '/contact', color: 'text-success' },
  ];

  return (
    <div className="drawer lg:drawer-open bg-base-300 min-h-screen relative overflow-hidden" data-theme="luxury">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* 🚀 Main Page Content */}
      <div className="drawer-content flex flex-col pt-6 relative">
        <div className="mesh-bg opacity-30 grayscale-[50%]" />
        
        {/* 🧭 Global Mobile Navbar */}
        <div className="navbar lg:hidden sticky top-4 z-50 glass border border-white/5 px-6 rounded-[2rem] mx-4 w-auto shadow-2xl backdrop-blur-3xl mb-8">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
              <Menu className="w-6 h-6 text-primary animate-pulse" />
            </label>
          </div>
          <div className="flex-1 px-4">
             <span className="text-xl font-black italic tracking-tighter">Phys <span className="text-primary italic">Academy</span></span>
          </div>
          <div className="flex-none">
             <button onClick={toggleLanguage} className="btn btn-ghost btn-circle btn-sm"><Globe className="w-5 h-5 text-secondary" /></button>
          </div>
        </div>

        {/* 📚 Desktop Top Header (Simplified) */}
        <header className="hidden lg:flex items-center justify-between px-12 py-4 mb-8 sticky top-0 z-40 bg-base-300/80 backdrop-blur-sm">
           <div className="flex items-center gap-3">
             <div className="badge badge-primary badge-outline font-black tracking-widest text-[9px] uppercase px-4 py-3">Educational Directive v6.0</div>
             <div className="h-0.5 w-12 bg-white/5" />
           </div>
           
           <div className="flex items-center gap-6">
              <button 
                onClick={toggleLanguage}
                className="btn btn-ghost gap-3 hover:bg-white/5 rounded-2xl border border-white/5"
              >
                <Globe className="w-4 h-4 text-secondary" />
                <span className={`font-black uppercase tracking-widest text-[9px] ${language === 'bangla' ? 'bn text-sm' : ''}`}>
                  {language === 'bangla' ? 'বাংলা' : 'English Sync'}
                </span>
              </button>
              <div className="divider divider-horizontal opacity-10 m-0" />
              {user && (
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-black text-xs italic">{user.name}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-30 italic">Lvl {user.level || 1} Candidate</p>
                  </div>
                  <div className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full w-10">
                    <div className="bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              )}
           </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex-1 container mx-auto px-4 md:px-12 max-w-7xl relative z-10"
          >
            {children}
            <Footer />
          </motion.main>
        </AnimatePresence>

        {/* Floating Effects */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[200px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[200px] -z-10 pointer-events-none" />
      </div> 

      {/* 🧭 Sidebar Drawer Access */}
      <div className="drawer-side z-[100]">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-10 w-85 min-h-full bg-base-100/10 backdrop-blur-3xl text-base-content border-r border-white/5 flex flex-col gap-6 font-outfit">
          {/* Logo & App Info */}
          <li className="mb-12 pointer-events-none px-4">
            <div className="flex items-center gap-4 p-0">
               <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-3xl shadow-primary/20 ring-4 ring-white/10">
                  <Cpu className="text-primary-content w-9 h-9" />
               </div>
               <div className="space-y-1">
                  <h1 className="text-3xl font-black tracking-tighter italic">Phys <span className="text-primary">Academy</span></h1>
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-base-content/30 opacity-60">SSC Neural System v6.4</p>
               </div>
            </div>
          </li>

          <div className="space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 px-6 mb-2">Operational Maps</p>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-6 py-6 px-8 rounded-[2.5rem] transition-all duration-500 hover:translate-x-3 active:scale-95 no-underline font-black italic tracking-widest text-xs uppercase ${
                    location.pathname === item.path 
                      ? 'bg-base-100 shadow-2xl border border-white/5 text-primary scale-105' 
                      : 'hover:bg-white/5 opacity-50'
                  }`}
                >
                  <div className={location.pathname === item.path ? item.color : 'text-base-content'}>
                    {item.icon}
                  </div>
                  {item.label}
                  {location.pathname === item.path && <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-ping" />}
                </Link>
              </li>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <div className="divider opacity-5 mx-6">System End</div>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-6 py-6 px-8 rounded-[2.5rem] text-error hover:bg-error/10 hover:translate-x-3 font-black italic text-xs uppercase transition-all duration-500"
              >
                <LogOut className="w-5 h-5" />
                Terminate Session
              </button>
            </li>
            <div className="px-8 flex flex-col gap-3 py-6 opacity-20 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em]">
                  <HelpCircle className="w-3 h-3" /> Get Help
               </div>
               <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em]">
                  <Info className="w-3 h-3" /> Subject Data
               </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
