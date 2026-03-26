import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Sparkles, Orbit, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [name, setName] = useState('');
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
      const res = await axios.post('/api/auth/register', { name, email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Check your data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row-reverse overflow-hidden font-outfit" data-theme="luxury">
      {/* 🌌 Atmospheric Right Sidebar (Visual Anchor) */}
      <div className="lg:w-[45%] bg-gradient-to-bl from-slate-900 to-black p-12 lg:p-24 flex flex-col justify-between relative overflow-hidden shrink-0 border-l border-white/5">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shadow-2xl shadow-secondary/40">
              <Orbit className="w-7 h-7 text-secondary-content animate-spin-slow" />
            </div>
            <span className="text-3xl font-black tracking-tighter italic text-white">Phys <span className="text-secondary italic">Academy.</span></span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter italic">
              Join the <br /> <span className="text-secondary underline decoration-white/10 underline-offset-8">Frontier.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-md italic">
              Enroll today to unlock your personalized neural study path. Track your progress with advanced AI analytics.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 flex gap-8">
           <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-white italic">14+</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Physics Modules</span>
           </div>
           <div className="w-px h-10 bg-white/10" />
           <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-white italic">SSC</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Syllabus Sync</span>
           </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* 🔐 Enrollment Form Section */}
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
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-success/70">Candidate Enrollment</span>
               </div>
               <h2 className="text-5xl font-black italic tracking-tighter text-white">Register <span className="text-secondary italic">Profile.</span></h2>
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
                <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 ml-2">Full Identity (Name)</span></label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Isaac Newton" 
                    className="input input-lg w-full h-16 bg-black/40 border-white/5 rounded-3xl pl-16 font-bold text-white focus:border-secondary/40 transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 ml-2">Neural Address (Email)</span></label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="email" 
                    placeholder="student@ssc.gov" 
                    className="input input-lg w-full h-16 bg-black/40 border-white/5 rounded-3xl pl-16 font-bold text-white focus:border-secondary/40 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2 ml-2">Secure Passkey</span></label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-secondary transition-colors" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="input input-lg w-full h-16 bg-black/40 border-white/5 rounded-3xl pl-16 font-bold text-white focus:border-secondary/40 transition-all"
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
              className="btn btn-secondary btn-lg w-full h-20 rounded-[2.5rem] font-black italic tracking-widest text-xl group relative overflow-hidden border-none shadow-2xl shadow-secondary/20"
            >
              {loading ? <span className="loading loading-spinner"></span> : (
                <>
                  Initiate Enrollment
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center space-y-4">
               <div className="divider opacity-5 font-black uppercase text-[8px] tracking-[0.5em]">Identity Sync</div>
               <p className="font-bold text-slate-500 italic">
                 Existing member? {' '}
                 <Link to="/login" className="text-secondary hover:text-white underline underline-offset-8 decoration-white/10 transition-all">Resume Session</Link>
               </p>
            </div>
          </form>
        </motion.div>
      </div>

      <Sparkles className="absolute top-[5%] left-[5%] w-10 h-10 text-secondary opacity-5 animate-pulse" />
    </div>
  );
};

export default RegisterPage;
