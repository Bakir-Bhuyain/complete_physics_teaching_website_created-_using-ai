import { useAuth } from '../context/AuthContext';
import { 
  LogOut, Globe, Cpu, User, LayoutDashboard, Trophy, BookOpen, 
  Menu, X, MessageSquare, Newspaper, Info, HelpCircle, ArrowRight,
  Star, Zap, Bot, Beaker, Microscope, Calculator, Monitor, Atom
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
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard', color: 'text-primary' },
    { icon: <Trophy className="w-5 h-5" />, label: 'Rankings', path: '/profile', color: 'text-secondary' },
    { icon: <Newspaper className="w-5 h-5" />, label: 'Physics Blog', path: '/blog', color: 'text-accent' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Help Center', path: '/contact', color: 'text-success' },
  ];

  const subjectItems = [
    { icon: <Atom className="w-5 h-5" />, label: 'Physics', path: '/dashboard', color: 'text-primary', status: 'ACTIVE' },
    { icon: <Beaker className="w-5 h-5" />, label: 'Chemistry', path: '/subject/chemistry', color: 'text-secondary', status: 'SYNCING' },
    { icon: <Microscope className="w-5 h-5" />, label: 'Biology', path: '/subject/biology', color: 'text-accent', status: 'SYNCING' },
    { icon: <Calculator className="w-5 h-5" />, label: 'Mathematics', path: '/subject/math', color: 'text-warning', status: 'SYNCING' },
    { icon: <Monitor className="w-5 h-5" />, label: 'ICT', path: '/subject/ict', color: 'text-info', status: 'SYNCING' },
  ];

  return (
    <div className="drawer lg:drawer-open bg-base-300 min-h-screen relative overflow-hidden" data-theme="dark">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* 🚀 Main Page Content */}
      <div className="drawer-content flex flex-col pt-6 relative">
        <div className="mesh-bg opacity-30 grayscale-[50%]" />
        
        {/* 🧭 Unified Pro Navbar */}
        <nav className="nav-glass px-6 py-4 flex items-center justify-between gap-6">
          <div className="lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle border border-white/5 bg-white/5">
              <Menu className="w-5 h-5 text-primary" />
            </label>
          </div>

          <div className="hidden md:flex flex-1 max-w-md relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Menu className="w-4 h-4 opacity-20 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search neural lessons..." 
              className="input input-bordered w-full h-12 pl-14 bg-white/5 border-white/5 rounded-2xl focus:border-primary/50 focus:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest italic"
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="btn btn-ghost btn-circle sm:btn-md sm:rounded-2xl border border-white/5 bg-white/5 group hover:bg-white/10"
            >
              <Globe className="w-4 h-4 text-secondary group-hover:rotate-12 transition-transform" />
              <span className={`hidden sm:inline font-black uppercase tracking-widest text-[9px] ${language === 'bangla' ? 'bn text-xs' : ''}`}>
                {language === 'bangla' ? 'বাংলা' : 'EN'}
              </span>
            </button>

            {user && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-4 hover:opacity-80 transition-opacity p-1 pr-3 rounded-full bg-white/5 border border-white/5">
                  <div className="avatar ring-1 ring-primary/30 ring-offset-base-300 ring-offset-2 rounded-full w-10">
                    <div className="bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-black text-[10px] italic leading-none mb-1">{user.name}</p>
                    <p className="text-[7px] font-black uppercase tracking-widest opacity-30 italic">Lvl {user.level || 1} Candidate</p>
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow-3xl bg-base-100/90 backdrop-blur-3xl rounded-[2.5rem] w-64 mt-4 border border-white/5 gap-2">
                  <li>
                    <Link to="/profile" className="flex items-center gap-4 py-4 px-6 rounded-2xl hover:bg-white/5">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-black italic text-[10px] uppercase tracking-widest">My Analytics</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="flex items-center gap-4 py-4 px-6 rounded-2xl text-error hover:bg-error/10">
                      <LogOut className="w-4 h-4" />
                      <span className="font-black italic text-[10px] uppercase tracking-widest">Terminate Session</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

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

        <div className="lg:hidden fixed bottom-6 left-6 right-6 h-20 nav-glass rounded-[2.5rem] flex items-center justify-around px-8 shadow-3xl border border-white/10 z-[100]">
           {menuItems.map((item) => (
             <Link 
               key={item.path} 
               to={item.path}
               className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === item.path ? 'text-primary scale-110' : 'text-slate-500 opacity-50'}`}
             >
               {item.icon}
               <span className="text-[7px] font-black uppercase tracking-[0.2em]">{item.label.split(' ')[0]}</span>
             </Link>
           ))}
        </div>
      </div> 

      {/* 🧭 Sidebar Drawer */}
      <div className="drawer-side z-[100]">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-10 w-85 min-h-full bg-base-100/40 backdrop-blur-3xl text-base-content border-r border-white/5 flex flex-col gap-8 font-outfit shadow-2xl">
          <li className="mb-8 pointer-events-none px-4">
            <div className="flex items-center gap-4 p-0">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-2xl ring-2 ring-white/5">
                  <Cpu className="text-primary-content w-7 h-7" />
               </div>
               <div className="flex flex-col">
                  <h1 className="text-2xl font-black tracking-tighter italic leading-none mb-1">Physics <span className="text-primary">Nexus</span></h1>
                  <span className="text-[7px] font-black uppercase tracking-[0.4em] opacity-30 italic">Neural Hub v6.4</span>
               </div>
            </div>
          </li>

          {/* Section 1: Main Nav */}
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 px-6 mb-2">Operational Maps</p>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-6 py-5 px-8 rounded-[2.5rem] transition-all duration-500 hover:translate-x-3 active:scale-95 no-underline font-black italic tracking-widest text-xs uppercase ${
                    location.pathname === item.path 
                      ? 'bg-base-100 shadow-2xl border border-white/5 text-primary scale-105' 
                      : 'hover:bg-white/5 opacity-50'
                  }`}
                >
                  <div className={location.pathname === item.path ? item.color : 'text-base-content'}>
                    {item.icon}
                  </div>
                  {item.label}
                </Link>
              </li>
            ))}
          </div>

          {/* Section 2: Neural Core (Subjects) */}
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30 px-6 mb-2">Neural Core Sync</p>
            {subjectItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-6 py-5 px-8 rounded-[2.5rem] transition-all duration-500 hover:translate-x-3 active:scale-95 no-underline font-black italic tracking-widest text-[9px] uppercase ${
                    location.pathname === item.path 
                      ? 'bg-base-100 shadow-2xl border border-white/5 text-primary scale-105' 
                      : 'hover:bg-white/5 opacity-40'
                  }`}
                >
                  <div className={item.color}>{item.icon}</div>
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className={`text-[6px] font-black tracking-[0.3em] ${item.status === 'ACTIVE' ? 'text-success' : 'text-warning opacity-50'}`}>
                      {item.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </div>

          <div className="mt-auto space-y-6">
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
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
