import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, CheckCircle2, ChevronRight, Sparkles, TrendingUp, 
  Activity, Zap, Clock, Star, LayoutGrid, Calendar, ArrowRight,
  ArrowLeft, Book
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({ progress: [], user: {}, chapterStats: {} });
  const [loading, setLoading] = useState(true);
  const { language, user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(9);
  const [searchParams] = useSearchParams();
  const activeChapter = searchParams.get('chapter');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [chapRes, topRes, progRes] = await Promise.all([
          axios.get(`/api/topics/chapters?class=${selectedClass}`),
          axios.get(`/api/topics?class=${selectedClass}`),
          axios.get('/api/progress/user')
        ]);
        setChapters(chapRes.data.chapters);
        setTopics(topRes.data.topics);
        setProgress(progRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedClass]);

  // Derived Activity Data
  const recentActivity = progress.progress
    ?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 4) || [];

  const masteredCount = progress.progress?.filter(p => p.status === 'mastered').length || 0;
  const totalTopicsCount = topics.length || 1;
  const overallPercent = Math.round((masteredCount / totalTopicsCount) * 100);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <div className="loading loading-infinity text-primary loading-lg w-24 h-24"></div>
      <p className="text-secondary font-black tracking-[0.4em] uppercase text-xs animate-pulse italic">Synchronizing Neural Data</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 font-outfit">
      {/* 🚀 Cinematic Header */}
      <section className="flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between p-12 lg:p-16 bg-gradient-to-br from-slate-900 to-black rounded-[4rem] border border-white/5 relative overflow-hidden shadow-3xl">
        <div className="space-y-6 relative z-10 max-w-2xl">
           <div className="flex items-center gap-3">
              <span className="badge badge-primary font-black uppercase tracking-widest text-[9px] px-4 py-3">SSC Physics Hub v6.1</span>
              <div className="h-0.5 w-10 bg-white/10" />
           </div>
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none text-white">
              Neural <span className="text-primary italic underline decoration-white/5 underline-offset-8">Terminal.</span>
           </h1>
           <p className="text-xl font-medium text-slate-400 italic">
              Welcome back, <span className="text-white">{user?.name}</span>. Your current neural synchronization is at <span className="text-primary">{overallPercent}%</span> across the Class {selectedClass} syllabus.
           </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 relative z-10">
           {[9, 10].map(c => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`btn btn-lg h-24 w-32 md:w-40 rounded-[2.5rem] border-none transition-all duration-500 font-black italic shadow-2xl ${
                  selectedClass === c ? 'btn-primary shadow-primary/30 scale-105' : 'bg-white/5 text-slate-500 hover:bg-white/10'
                }`}
              >
                Class {c}
              </button>
           ))}
        </div>
        
        <Sparkles className="absolute top-[-10%] right-[-5%] w-64 h-64 text-primary opacity-5 rotate-12" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 📚 Module Library Section */}
        <div className="lg:col-span-2 space-y-10">
           <AnimatePresence mode="wait">
            {!activeChapter ? (
              /* --- CHAPTERS LIST VIEW --- */
              <motion.div 
                key="chapters"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <LayoutGrid className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">Module Library</h2>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">{chapters.length} Chapters Active</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {chapters.map((chapter) => {
                    const stats = progress.chapterStats[chapter._id] || { total: chapter.topicCount, completed: 0, mastered: 0 };
                    const percent = Math.round((stats.mastered / (chapter.topicCount || 1)) * 100);

                    return (
                      <motion.div 
                        key={chapter._id}
                        whileHover={{ x: 10 }}
                        className="card bg-slate-900/40 border border-white/5 rounded-[3rem] overflow-hidden group hover:border-primary/20 transition-all duration-500"
                      >
                        <div className="card-body p-10 flex-col md:flex-row gap-10 items-center justify-between">
                          <div className="flex items-center gap-8 flex-1">
                              <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-all duration-500 shrink-0">
                                <span className="text-3xl font-black italic text-inherit">{chapter._id}</span>
                              </div>
                              <div>
                                <h3 className={`text-3xl font-black tracking-tight mb-2 text-white ${language === 'bangla' ? 'bn' : 'italic'}`}>
                                  {language === 'bangla' ? chapter.chapterName.bangla : chapter.chapterName.english}
                                </h3>
                                <div className="flex gap-4">
                                    <span className="badge badge-outline border-white/10 text-[9px] font-black uppercase tracking-widest py-3 opacity-40">{chapter.topicCount} Topics</span>
                                    {percent === 100 && <span className="badge badge-success font-black text-[9px] uppercase tracking-widest py-3 italic">Synced</span>}
                                </div>
                              </div>
                          </div>

                          <div className="flex items-center gap-10">
                              <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mb-2 italic">Mastery</span>
                                <div className="radial-progress text-primary font-black" style={{"--value": percent, "--size": "5rem", "--thickness": "4px"}} role="progressbar">
                                    {percent}%
                                </div>
                              </div>
                              <Link to={`/dashboard?chapter=${chapter._id}`} className="btn btn-circle btn-ghost border border-white/5 hover:bg-primary hover:text-primary-content transition-all">
                                <ChevronRight className="w-6 h-6" />
                              </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* --- TOPICS LIST VIEW --- */
              <motion.div 
                key="topics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between px-6">
                  <Link to="/dashboard" className="btn btn-ghost gap-4 rounded-2xl group border border-white/5">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest italic">Back to Maps</span>
                  </Link>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Chapter {activeChapter} Module Feed</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {topics.filter(t => t.chapter?.number === parseInt(activeChapter)).map((topic) => {
                    const prog = progress.progress?.find(p => p.topicId?._id === topic._id || p.topicId === topic._id);
                    const isMastered = prog?.status === 'mastered';
                    
                    return (
                      <Link 
                        key={topic._id} 
                        to={`/topic/${topic._id}`}
                        className="card bg-slate-900/40 border border-white/5 rounded-[2.5rem] hover:bg-slate-900 transition-all p-8 flex flex-row items-center justify-between group"
                      >
                         <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isMastered ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-500 group-hover:text-primary'}`}>
                               <Book className="w-5 h-5" />
                            </div>
                            <div>
                               <h4 className={`text-xl font-black text-white group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn text-2xl' : 'italic'}`}>
                                  {language === 'bangla' ? topic.topic?.bangla : topic.topic?.english}
                               </h4>
                               <p className="text-[9px] uppercase font-black tracking-widest opacity-30 italic">
                                  {isMastered ? 'Neural Sync Complete' : 'Incomplete Synchronization'}
                               </p>
                            </div>
                         </div>
                         <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary -translate-x-4 group-hover:translate-x-0" />
                      </Link>
                    )
                  })}
                  {topics.filter(t => t.chapter?.number === parseInt(activeChapter)).length === 0 && (
                     <div className="text-center py-20 bg-black/10 rounded-[3rem] border border-dashed border-white/5 opacity-30 flex flex-col items-center gap-6">
                        <Activity className="w-12 h-12" />
                        <p className="font-black italic uppercase tracking-widest text-xs">No topics identified for this Directive.</p>
                     </div>
                  )}
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>

        {/* 📊 Side Analytics & Activity Feed */}
        <div className="space-y-10">
           {/* Activity Feed Card */}
           <div className="card bg-slate-900/40 rounded-[3.5rem] border border-white/5 p-10 space-y-10 overflow-hidden relative">
              <div className="flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <Activity className="w-5 h-5 text-secondary" />
                    <h3 className="text-xl font-black italic tracking-tight text-white uppercase">Sync Activity</h3>
                 </div>
                 <Zap className="w-5 h-5 text-warning animate-pulse" />
              </div>

              <div className="space-y-6 relative z-10">
                 {recentActivity.length > 0 ? recentActivity.map((act, idx) => (
                    <div key={idx} className="flex gap-6 group">
                       <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${act.status === 'mastered' ? 'bg-success' : 'bg-primary'} shadow-[0_0_10px_rgba(34,197,94,0.3)]`} />
                          {idx !== recentActivity.length - 1 && <div className="w-px h-full bg-white/5 mt-2" />}
                       </div>
                       <div className="pb-4">
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-30 italic mb-1">
                            {new Date(act.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className={`text-sm font-bold text-white group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn text-lg' : 'italic'}`}>
                            {language === 'bangla' ? act.topicId?.topic?.bangla : act.topicId?.topic?.english}
                          </p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 italic">Status: {act.status}</p>
                       </div>
                    </div>
                 )) : (
                   <div className="text-center py-10 space-y-4 opacity-30">
                      <Clock className="w-12 h-12 mx-auto" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">No Recent Transmissions</p>
                   </div>
                 )}
              </div>

              <Link to="/profile" className="btn btn-ghost btn-block h-16 rounded-3xl border border-white/5 font-black italic tracking-widest text-xs uppercase group relative z-10">
                 View Neural Profile
                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-secondary/5 rounded-full blur-[50px] pointer-events-none" />
           </div>

           {/* Stats Summary Card */}
           <div className="card bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3.5rem] border border-white/5 p-10 space-y-8">
              <div className="flex items-center gap-4">
                 <TrendingUp className="w-5 h-5 text-primary" />
                 <h3 className="text-xl font-black italic tracking-tight text-white uppercase">Live Metrics</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-black/20 p-6 rounded-[2rem] border border-white/5">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 italic">Synapse Level</p>
                    <p className="text-3xl font-black italic text-white leading-none">{user?.level || 1}</p>
                 </div>
                 <div className="bg-black/20 p-6 rounded-[2rem] border border-white/5">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 italic">Neural XP</p>
                    <p className="text-3xl font-black italic text-white leading-none">{user?.xp || 0}</p>
                 </div>
                 <div className="col-span-2 bg-black/20 p-6 rounded-[2rem] border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-2 italic">Global Goal</p>
                      <p className="text-lg font-black italic text-white uppercase">{masteredCount}/{topics.length} Mastered</p>
                    </div>
                    <Star className="w-8 h-8 text-warning fill-warning/20 animate-pulse" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
