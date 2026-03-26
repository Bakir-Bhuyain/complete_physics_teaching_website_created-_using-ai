import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles, Orbit } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication denied. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden font-outfit" data-theme="luxury">
      {/* 🌌 Atmospheric Left Sidebar (Visual Anchor) */}
      <div className="lg:w-[45%] bg-gradient-to-br from-slate-900 to-black p-12 lg:p-24 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-white/5">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
              <Orbit className="w-7 h-7 text-primary-content animate-spin-slow" />
            </div>
            <span className="text-3xl font-black tracking-tighter italic text-white">Phys <span className="text-primary italic">Academy.</span></span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic">
              Empower <br /> <span className="text-primary underline decoration-white/10 underline-offset-8">Curiosity.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md italic">
              Access the most comprehensive SSC Physics curriculum in Bangladesh. Synchronize your progress across all devices.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex gap-8">
           <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-white italic">14+</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Full Chapters</span>
           </div>
           <div className="w-px h-10 bg-white/10" />
           <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-white italic">24/7</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">AI Tutor Sync</span>
           </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* 🔐 Authentication Card Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="mesh-bg opacity-20 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl bg-slate-900/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-success" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-success/70">Secure Session Link</span>
               </div>
               <h2 className="text-5xl font-black italic tracking-tighter text-white">Login <span className="text-primary italic">Portal.</span></h2>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="alert alert-error bg-error/10 border-none rounded-3xl p-5 text-sm font-black uppercase tracking-widest text-error"
              >
                <span>{error}</span>
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="form-control">
                <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 ml-2">Neural Identity (Email)</span></label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="student@academy.io" 
                    className="input input-lg w-full h-16 bg-black/40 border-white/5 rounded-3xl pl-16 font-bold text-white focus:border-primary/40 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 ml-2">Secure Passkey</span></label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-lg w-full h-16 bg-black/40 border-white/5 rounded-3xl pl-16 font-bold text-white focus:border-primary/40 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary btn-lg w-full h-20 rounded-[2.5rem] font-black italic tracking-widest text-xl group relative overflow-hidden border-none shadow-2xl shadow-primary/20"
            >
              {loading ? <span className="loading loading-spinner"></span> : (
                <>
                  Resume Journey
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center space-y-4">
               <div className="divider opacity-5 font-black uppercase text-[8px] tracking-[0.5em]">Identity Check</div>
               <p className="font-bold text-slate-500 italic">
                 New candidate? {' '}
                 <Link to="/register" className="text-primary hover:text-white underline underline-offset-8 decoration-white/10 transition-all">Enroll Now</Link>
               </p>
            </div>
          </form>
        </motion.div>
      </div>

      <Sparkles className="absolute top-[5%] right-[5%] w-10 h-10 text-primary opacity-5 animate-pulse" />
    </div>
  );
};

export default LoginPage;
