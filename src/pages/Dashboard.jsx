import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Trophy, Book, Star, Activity, ChevronRight, 
  ArrowRight, LayoutGrid, Clock, Target, TrendingUp,
  Cpu, Users, Award, BookOpen, Search, ArrowLeft, BookCheck
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, language } = useAuth();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [progress, setProgress] = useState({ chapterStats: {}, progress: [] });
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(9);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [chapRes, progRes] = await Promise.all([
          axios.get(`/api/topics/chapters?class=${selectedClass}`),
          axios.get('/api/progress/user')
        ]);
        setChapters(chapRes.data.chapters || []);
        setProgress(progRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedClass]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="loading loading-ring loading-lg text-primary"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 animate-pulse">Initializing Physics Nexus...</p>
    </div>
  );

  const lastLesson = progress.progress?.[0] || null;
  const currentTopicName = lastLesson ? 
    (language === 'bangla' ? lastLesson.topicId?.topic?.bangla : lastLesson.topicId?.topic?.english) : 
    (language === 'bangla' ? 'নতুন পাঠ শুরু করুন' : 'Begin Your Journey');

  return (
    <div className="flex flex-col gap-16 pb-32">
      {/* 🚀 1. Student Status Header */}
      <header className="flex flex-col xl:flex-row items-center justify-between gap-12 pt-12 pb-10 border-b border-white/5 relative">
        <div className="flex-1 space-y-8 text-center xl:text-left">
           <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary italic">Candidate {user?.level || 1}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-secondary italic">Class {selectedClass} Directive</span>
              </div>
           </div>
           
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none text-white">
              Physics <span className="text-primary gradient-text italic">Nexus.</span>
           </h1>
           
           <div className="flex flex-col gap-6 pt-4">
              <p className="text-2xl font-medium text-slate-400 italic">
                 Welcome back, <span className="text-white">{user?.name}</span>. Select your active class:
              </p>
              
              <div className="flex items-center justify-center xl:justify-start gap-6">
                 {[9, 10].map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedClass(c)}
                      className={`btn btn-xl px-16 h-24 rounded-[2rem] border-none transition-all duration-500 font-black italic flex-col gap-1 ${
                        selectedClass === c 
                          ? 'bg-primary text-primary-content shadow-[0_0_40px_rgba(99,102,241,0.4)] scale-110' 
                          : 'bg-white/5 text-slate-500 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Selection</span>
                      <span className="text-3xl uppercase tracking-tighter">Class {c}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full xl:w-auto xl:min-w-[500px]">
           <div className="hidden lg:flex neural-card p-6 border-primary/20 bg-primary/5 flex-col justify-center gap-2 relative overflow-hidden group">
              <div className="flex items-center justify-between relative z-10">
                 <p className="text-[8px] font-black uppercase tracking-widest text-primary italic">Neural Consistency</p>
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className={`text-2xl font-black italic tracking-tighter ${
                    (new Date() - new Date(progress.userStats?.lastStudyDate)) / (1000 * 60 * 60) > 20 
                    ? 'text-warning' 
                    : 'text-white'
                 }`}>
                    { (new Date() - new Date(progress.userStats?.lastStudyDate)) / (1000 * 60 * 60) > 48 ? 'LINK BROKEN' : 
                      (new Date() - new Date(progress.userStats?.lastStudyDate)) / (1000 * 60 * 60) > 20 ? 'SIGNAL WEAK' : 'SYNC ACTIVE' }
                 </div>
                 <div className="h-4 w-px bg-white/10" />
                 <span className="text-xs font-black italic text-primary">0% LOSS</span>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
                 <div 
                    style={{ width: `${Math.max(0, 100 - ((new Date() - new Date(progress.userStats?.lastStudyDate)) / (1000 * 60 * 60 * 24)) * 100)}%` }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000"
                 />
              </div>
           </div>

           <div className="neural-card p-6 border-white/5 text-center bg-white/5">
              <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-2">Study Points</p>
              <span className="text-3xl font-black italic text-white tracking-tighter">{progress.userStats?.xp || 0}</span>
           </div>
           <div className="neural-card p-6 border-white/5 text-center bg-white/5">
              <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-2">Study Streak</p>
              <div className="flex items-center justify-center gap-2">
                 <Zap className="w-4 h-4 text-warning" />
                 <span className={`text-3xl font-black italic tracking-tighter ${ (new Date() - new Date(progress.userStats?.lastStudyDate)) / (1000 * 60 * 60) > 20 ? 'text-warning' : 'text-white' }`}>
                    {String(progress.userStats?.streak || 0).padStart(2, '0')}D
                 </span>
              </div>
           </div>
        </div>
      </header>

      {/* 🎯 2. Current Study Goal */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 px-6">
           <Target className="w-5 h-5 text-primary" />
           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Current Study Goal</h2>
        </div>
        <div className="neural-card bg-gradient-to-br from-primary/20 via-slate-900 to-transparent p-10 md:p-14 relative overflow-hidden group border-primary/20">
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 italic">Highest Priority Lesson</span>
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white leading-none">
                    Resume: <span className="text-primary">{currentTopicName}.</span>
                 </h3>
                 <p className="text-lg text-slate-400 font-medium italic max-w-xl">
                    {lastLesson ? 
                       (language === 'bangla' ? 'আপনি যেখানে শেষ করেছেন সেখান থেকে আবার শুরু করুন।' : 'Pick up exactly where you left off.') :
                       (language === 'bangla' ? 'আপনার প্রথম অধ্যায় শুরু করতে নিচের একটি বই নির্বাচন করুন।' : 'Select a chapter below to start your first lesson.')
                    }
                 </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                 {lastLesson ? (
                    <Link 
                      to={`/chapter/${lastLesson.topicId?.class}/${lastLesson.topicId?.chapter?.number}`}
                      className="btn btn-primary btn-lg rounded-2xl h-16 px-12 font-black italic uppercase tracking-widest text-xs group"
                    >
                      Start Studying Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                 ) : (
                    <button className="btn btn-disabled btn-lg rounded-2xl h-16 px-12 font-black italic uppercase tracking-widest text-xs opacity-20">
                       Select a Class Below to Sync Data
                    </button>
                 )}
              </div>
           </div>
           <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </div>
      </section>

      {/* 📚 3. Chapter Library */}
      <section className="space-y-10">
        <div className="flex items-center justify-between px-6">
           <div className="flex items-center gap-4">
              <BookOpen className="w-6 h-6 text-secondary" />
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Physics Chapter Library</h2>
           </div>
           <div className="h-px flex-1 bg-white/5 mx-10" />
           <p className="text-[10px] font-black uppercase tracking-widest opacity-20 italic">{chapters.length} Units Found</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {chapters.length > 0 ? chapters.map((chapter) => {
            // Safety check for progress data
            const chapterStats = progress?.chapterStats || {};
            const stats = chapterStats[chapter._id] || { total: chapter.topicCount, completed: 0, mastered: 0 };
            const percent = Math.round(((stats.mastered || 0) / (chapter.topicCount || 1)) * 100);

            return (
              <motion.div 
                key={chapter._id}
                whileHover={{ y: -8 }}
                className="neural-card overflow-hidden group hover:border-primary/40 transition-all duration-500 bg-slate-900/40"
              >
                <Link to={`/chapter/${selectedClass}/${chapter._id}`} className="p-10 flex flex-col h-full gap-8">
                   <div className="flex items-start justify-between gap-6">
                      <div className="space-y-4 flex-1">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                               <Book className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Unit {String(chapter._id).padStart(2, '0')}</span>
                         </div>
                         <h3 className={`text-3xl md:text-4xl font-black tracking-tighter text-white leading-tight ${language === 'bangla' ? 'bn' : 'italic'}`}>
                           {language === 'bangla' ? chapter.chapterName.bangla : chapter.chapterName.english}
                         </h3>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-content transition-all duration-500">
                         <ChevronRight className="w-6 h-6" />
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="badge bg-white/5 border-none text-[8px] font-black uppercase tracking-widest py-3 px-4 text-slate-500">{chapter.topicCount} Lessons</span>
                      {percent === 100 ? (
                        <span className="badge badge-success font-black text-[8px] uppercase tracking-widest py-3 px-4 italic">Complete</span>
                      ) : percent > 0 && (
                        <span className="badge badge-primary font-black text-[8px] uppercase tracking-widest py-3 px-4 italic">{percent}% Sync</span>
                      )}
                   </div>

                   <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                           <span className="text-[8px] font-black uppercase tracking-widest opacity-20">Neural Progress</span>
                           <span className="text-[9px] font-black text-primary italic">{percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <div style={{ width: `${percent}%` }} className="h-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-1000" />
                        </div>
                      </div>
                      <div className="btn btn-primary btn-sm rounded-xl px-6 font-black italic uppercase tracking-widest text-[8px] h-10">
                        Open Book
                      </div>
                   </div>
                </Link>
              </motion.div>
            );
          }) : (
             <div className="col-span-full py-32 bg-base-100 rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center gap-8 opacity-30 grayscale group">
                <Search className="w-16 h-16 animate-bounce" />
                <div className="space-y-2 px-8">
                   <p className="text-2xl font-black italic uppercase tracking-tighter text-white">No Books Identified for Class {selectedClass}</p>
                </div>
             </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
