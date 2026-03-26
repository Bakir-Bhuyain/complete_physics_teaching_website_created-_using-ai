import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Trophy, Award, Zap, TrendingUp, Cpu, Star, Target, User, AlertTriangle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, language } = useAuth(); // Ensure language is here

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/progress/user');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching profile stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <span className="loading loading-infinity text-primary loading-lg w-20"></span>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Retrieving Neural Identity...</p>
    </div>
  );

  // 🛡️ SAFETY CHECK: Handle null stats
  if (!stats) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center p-12 bg-base-100 rounded-[3rem] border border-white/5 mx-4">
       <AlertTriangle className="w-20 h-20 text-error animate-pulse" />
       <div className="space-y-2">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">Neural Sync Failed</h2>
          <p className="text-slate-500 font-medium italic">We couldn't connect to your brain data. Please try refreshing your link.</p>
       </div>
       <button onClick={() => window.location.reload()} className="btn btn-primary btn-lg rounded-3xl h-16 font-black italic uppercase tracking-widest px-10">Re-initiate Sync</button>
    </div>
  );

  // Fallbacks for data to prevent crashes
  const userStats = stats.userStats || { level: 1, xp: 0, achievements: [], nextLevelXp: 500 };
  const chapterStats = stats.chapterStats || {};
  
  const totalMastered = Object.values(chapterStats).reduce((acc, curr) => acc + (curr.mastered || 0), 0);
  const totalTopics = Object.values(chapterStats).reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalMasteryPercent = Math.round((totalMastered / (totalTopics || 1)) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-12 font-outfit px-4">
      {/* 🎖 Profile Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card bg-slate-900/40 border border-white/5 rounded-[4rem] p-10 md:p-16 shadow-3xl overflow-hidden relative group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-8 mb-12">
              <div className="avatar placeholder">
                <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-primary to-accent text-primary-content flex items-center justify-center shadow-2xl shadow-primary/30 ring-4 ring-white/10 group-hover:rotate-12 transition-transform duration-700">
                  <User className="w-12 h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none text-white">{user?.name || 'Candidate'}</h1>
                <div className="flex items-center gap-3">
                  <span className="badge badge-primary font-black uppercase tracking-widest text-[9px] py-3">Elite Candidate</span>
                  <div className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 opacity-60">
                    Neural ID: {user?._id?.slice(-6) || 'Hub-1'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat p-0">
                <div className="stat-title font-black uppercase tracking-widest text-[9px] mb-2 opacity-30 italic">Current Level</div>
                <div className="stat-value text-4xl font-black text-primary italic">Lvl {userStats.level}</div>
              </div>
              <div className="stat p-0 border-l border-white/5 pl-8">
                <div className="stat-title font-black uppercase tracking-widest text-[9px] mb-2 opacity-30 italic">Neural XP</div>
                <div className="stat-value text-4xl font-black text-secondary italic">{userStats.xp}</div>
              </div>
              <div className="stat p-0 border-l border-white/5 pl-8">
                <div className="stat-title font-black uppercase tracking-widest text-[9px] mb-2 opacity-30 italic">Total Mastery</div>
                <div className="stat-value text-4xl font-black text-accent italic">{totalMasteryPercent}%</div>
              </div>
              <div className="stat p-0 border-l border-white/5 pl-8">
                <div className="stat-title font-black uppercase tracking-widest text-[9px] mb-2 opacity-30 italic">Sync Streak</div>
                <div className="stat-value text-4xl font-black text-success italic">12d</div>
              </div>
            </div>

            {/* XP PROGRESS BAR */}
            <div className="mt-16 space-y-4">
              <div className="flex items-end justify-between px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary italic flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Next Level Threshold
                </span>
                <span className="text-xs font-black italic opacity-40">{userStats.xp} / {userStats.nextLevelXp} XP</span>
              </div>
              <div className="h-4 w-full bg-base-300 rounded-full overflow-hidden border border-white/5 p-1">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(userStats.xp % 500) / 500 * 100}%` }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
          </div>
          <Sparkles className="absolute bottom-[-10%] right-[-5%] w-64 h-64 text-primary/5 opacity-40 group-hover:scale-110 transition-transform duration-1000" />
        </motion.div>

        {/* 🏆 Rank Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-slate-900/40 border border-white/5 rounded-[4rem] p-12 shadow-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group"
        >
          <div className="relative z-10 space-y-6">
            <Trophy className="w-20 h-20 text-warning mx-auto drop-shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-black italic tracking-tight text-white uppercase">Syllabus Master</h4>
            <div className="divider opacity-5 mx-12"></div>
            <p className="text-xs font-bold leading-relaxed text-slate-500 uppercase tracking-widest px-4">
              Currently ranked in the top <span className="text-primary font-black">2%</span> of physics candidates globally.
            </p>
            <button className="btn btn-primary btn-sm rounded-xl px-8 font-black uppercase tracking-widest text-[9px] py-1 shadow-lg shadow-primary/20 border-none">View Leaderboard</button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 animate-pulse" />
        </motion.div>
      </div>

      {/* 🚀 Achievement Grid */}
      <div className="space-y-10">
        <div className="flex items-center gap-4 px-8">
          <Award className="w-8 h-8 text-secondary" />
          <h2 className="text-3xl font-black tracking-tighter italic text-white uppercase">Unlocked <span className="text-secondary italic">Awards</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userStats.achievements && userStats.achievements.length > 0 ? userStats.achievements.map((a, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="card bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] shadow-2xl flex flex-col items-center text-center gap-6 group hover:border-secondary/40 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-[2.5rem] bg-secondary/10 flex items-center justify-center border border-secondary/20 shadow-inner group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10 text-secondary" />
              </div>
              <div>
                <h4 className={`text-white font-black tracking-tight mb-2 ${language === 'bangla' ? 'bn text-lg' : 'italic uppercase text-sm'}`}>
                  {language === 'bangla' ? a.name?.bangla : a.name?.english}
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Synced Mastery</p>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 bg-base-100/30 rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center gap-6 grayscale opacity-30">
              <Award className="w-16 h-16" />
              <p className="font-black italic uppercase tracking-widest">No achievements detected. Initiate studying.</p>
            </div>
          )}
        </div>
      </div>

      {/* 📊 Course Progress Snapshot */}
      <div className="card bg-slate-900/40 border border-white/5 rounded-[4rem] overflow-hidden shadow-3xl">
        <div className="p-10 md:p-14 border-b border-white/5 bg-black/20 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl font-black italic tracking-tighter mb-2 text-white uppercase">Subject Mastery</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Global NCTB Syllabus Monitor</p>
          </div>
          <div className="flex gap-10">
            <div className="text-right">
              <p className="text-4xl font-black text-indigo-500">{totalTopics}</p>
              <p className="text-[9px] uppercase font-black tracking-widest opacity-30 italic">Modules</p>
            </div>
            <div className="text-right border-l border-white/5 pl-10">
              <p className="text-4xl font-black text-emerald-500">{totalMastered}</p>
              <p className="text-[9px] uppercase font-black tracking-widest opacity-30 italic">Nodes</p>
            </div>
          </div>
        </div>
        
        <div className="p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 bg-slate-900/10">
           {Object.keys(chapterStats).map((num) => {
             const chap = chapterStats[num];
             const percent = Math.round(((chap.mastered || 0) / (chap.total || 1)) * 100);
             return (
               <div key={num} className="space-y-4">
                 <div className="flex items-center justify-between text-xs px-2">
                   <p className="font-black italic text-slate-400">Chapter {num}</p>
                   <p className="font-black text-primary opacity-80">{percent}%</p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                   />
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
