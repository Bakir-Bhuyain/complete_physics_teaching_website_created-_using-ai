import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, Award, Zap, TrendingUp, Cpu, Star, Target, 
  User, Activity, Users, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, language } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/progress/user');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching rankings data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <span className="loading loading-infinity text-primary loading-lg w-20"></span>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Initializing Global Rankings...</p>
    </div>
  );

  const userStats = stats?.userStats || { level: 1, xp: 0, achievements: [] };
  const recentActivity = stats?.recentActivity || [];

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32 px-4">
      
      {/* 🎖 1. Personal Standing Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 neural-card p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-br from-primary/10 via-slate-900 to-transparent"
        >
          <div className="flex items-center gap-10">
            <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-3xl ring-4 ring-white/5">
              <User className="w-12 h-12 text-primary-content" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none text-white">{user?.name}</h1>
              <div className="flex items-center gap-4">
                <span className="badge badge-primary font-black uppercase tracking-widest text-[9px] py-3">Rank: Candidate</span>
                <div className="h-1 w-8 bg-white/5" />
                <span className="text-xs font-black italic text-slate-500 uppercase tracking-widest">Global Rank: #428</span>
              </div>
            </div>
          </div>
          <div className="flex gap-12">
            <div className="text-right">
              <p className="text-4xl font-black text-primary italic leading-none mb-2">{userStats.xp}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Study Points</p>
            </div>
            <div className="text-right border-l border-white/5 pl-12">
              <p className="text-4xl font-black text-secondary italic leading-none mb-2">{userStats.level}</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Level</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-4 neural-card p-10 flex flex-col items-center justify-center text-center space-y-6 bg-secondary/5 border-secondary/20">
          <Trophy className="w-16 h-16 text-warning" />
          <div>
            <h4 className="text-xl font-black italic text-white uppercase tracking-tight">Syllabus Master</h4>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Target: Top 1%</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* 🏆 2. Global Leaderboard (Main Section) */}
        <div className="lg:col-span-8 space-y-10">
           <div className="flex items-center gap-4 px-6">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Global Rankings</h2>
           </div>

           <div className="neural-card p-4 md:p-8 space-y-4">
              {[
                { name: 'Bakir Bhuiyan', xp: '12.4k', rank: 1, me: true },
                { name: 'Nafis Ahmed', xp: '10.1k', rank: 2 },
                { name: 'Samiul Islam', xp: '9.8k', rank: 3 },
                { name: 'Arafat Karim', xp: '8.4k', rank: 4 },
                { name: 'Tanvir Hossain', xp: '7.9k', rank: 5 },
                { name: 'Mehedi Hasan', xp: '7.2k', rank: 6 },
                { name: 'Zayan Kabir', xp: '6.8k', rank: 7 },
              ].map((player, i) => (
                <div key={i} className={`flex items-center justify-between p-6 rounded-3xl border transition-all hover:translate-x-2 ${player.me ? 'bg-primary/10 border-primary/30' : 'bg-white/5 border-white/5'}`}>
                   <div className="flex items-center gap-8">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${player.rank === 1 ? 'bg-warning text-warning-content' : 'bg-white/5 text-slate-500'}`}>
                         {player.rank}
                      </div>
                      <div>
                        <span className={`text-base font-black italic uppercase tracking-widest ${player.me ? 'text-white' : 'text-slate-400'}`}>{player.name}</span>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-20 italic">Class 10 Student • Dhaka</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="text-lg font-black italic text-secondary">{player.xp} XP</span>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-20 italic">Mastery: 92%</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 📊 3. My Study Feed (Side History) */}
        <div className="lg:col-span-4 space-y-10">
           <div className="flex items-center gap-4 px-6">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">My Study Feed</h2>
           </div>

           <div className="neural-card p-10 space-y-10 bg-slate-900/40">
              <div className="space-y-8">
                 {recentActivity.length > 0 ? recentActivity.map((act, idx) => (
                    <div key={idx} className="flex gap-6 group">
                       <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${act.status === 'mastered' ? 'bg-success shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-primary'} `} />
                          {idx !== recentActivity.length - 1 && <div className="w-px h-full bg-white/5 mt-2" />}
                       </div>
                       <div className="pb-4">
                          <p className="text-[8px] font-black uppercase tracking-widest opacity-30 italic mb-1">
                            {new Date(act.updatedAt).toLocaleDateString()}
                          </p>
                          <p className={`text-sm font-bold text-white group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn text-lg' : 'italic'}`}>
                            {language === 'bangla' ? act.topicId?.topic?.bangla : act.topicId?.topic?.english}
                          </p>
                          <p className="text-[9px] uppercase font-black tracking-widest text-slate-600 italic">Lesson Synchronized</p>
                       </div>
                    </div>
                 )) : (
                   <div className="text-center py-20 opacity-20 italic text-[10px] uppercase font-black tracking-widest">
                      No Recent Activity Logged
                   </div>
                 )}
              </div>
           </div>

           {/* 🎖 Unlocked Achievements */}
           <section className="space-y-8">
             <div className="flex items-center gap-4 px-6">
                <Award className="w-6 h-6 text-accent" />
                <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Badges</h2>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {userStats.achievements?.slice(0, 4).map((a, i) => (
                  <div key={i} className="neural-card p-6 flex flex-col items-center text-center gap-4 bg-accent/5 border-accent/20">
                     <Star className="w-8 h-8 text-accent" />
                     <span className="text-[9px] font-black uppercase tracking-widest text-white leading-tight">
                        {language === 'bangla' ? a.name?.bangla : a.name?.english}
                     </span>
                  </div>
                ))}
             </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
