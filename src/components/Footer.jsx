import { Link } from 'react-router-dom';
import { Cpu, Facebook, MessageCircle, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-100 text-base-content border-t border-white/5 rounded-t-[3rem] mt-20">
      <aside>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Cpu className="text-primary-content w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">Phys <span className="text-primary">Academy</span></span>
        </div>
        <p className="max-w-xs text-sm font-medium opacity-50 leading-relaxed font-outfit">
          Mastering the universe one particle at a time. The ultimate learning platform for SSC Physics students in Bangladesh.
        </p>
        <div className="flex gap-4 mt-6">
          <button className="btn btn-ghost btn-circle btn-sm opacity-50 hover:opacity-100"><Facebook className="w-5 h-5"/></button>
          <button className="btn btn-ghost btn-circle btn-sm opacity-50 hover:opacity-100"><MessageCircle className="w-5 h-5"/></button>
          <button className="btn btn-ghost btn-circle btn-sm opacity-50 hover:opacity-100"><Github className="w-5 h-5"/></button>
        </div>
      </aside> 
      <nav>
        <h6 className="footer-title font-black text-[10px] tracking-[0.3em] uppercase opacity-40">Curriculum</h6> 
        <Link to="/dashboard" className="link link-hover font-bold text-sm">Chapter Maps</Link>
        <Link to="/profile" className="link link-hover font-bold text-sm">Neural Rank</Link>
        <Link to="/blog" className="link link-hover font-bold text-sm">Study Tips</Link>
        <Link to="/dashboard" className="link link-hover font-bold text-sm">Exam Prep</Link>
      </nav> 
      <nav>
        <h6 className="footer-title font-black text-[10px] tracking-[0.3em] uppercase opacity-40">Support</h6> 
        <Link to="/contact" className="link link-hover font-bold text-sm">Identity Sync Issues</Link>
        <Link to="/contact" className="link link-hover font-bold text-sm">Report a Glitch</Link>
        <Link to="/contact" className="link link-hover font-bold text-sm">Tutor Feedback</Link>
      </nav> 
      <nav>
        <h6 className="footer-title font-black text-[10px] tracking-[0.3em] uppercase opacity-40">Identity</h6> 
        <Link to="/login" className="link link-hover font-bold text-sm">Resume Session</Link>
        <Link to="/register" className="link link-hover font-bold text-sm">Create New Profile</Link>
      </nav>
      
      <div className="footer footer-center p-4 border-t border-white/5 opacity-30 text-[9px] uppercase font-black tracking-widest mt-12 gap-2">
        <aside className="inline-flex items-center gap-2">
          <p>© 2026 SSC Physics Academy - Built with </p>
          <Heart className="w-3 h-3 text-error fill-current animate-pulse" />
          <p> for Bangladesh</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
