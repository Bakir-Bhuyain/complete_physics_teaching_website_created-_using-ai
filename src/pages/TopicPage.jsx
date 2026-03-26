import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Bot, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Info, 
  Loader2,
  Cpu,
  Bookmark,
  MessageSquare,
  X,
  Zap,
  Star,
  AlertOctagon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TopicPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useAuth();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('unstarted');
  
  // XP & Feedback States
  const [showXpGain, setShowXpGain] = useState(false);
  const [leveledUp, setLeveledUp] = useState(false);

  // UI States
  const [showAi, setShowAi] = useState(false); 
  
  // AI States
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [usage, setUsage] = useState({ remainingQueries: 5, limit: 5 });
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicRes, usageRes, progRes] = await Promise.all([
          axios.get(`/api/topics/${id}`),
          axios.get('/api/ai/usage'),
          axios.get('/api/progress/user')
        ]);
        setTopic(topicRes.data.topic);
        setUsage(usageRes.data);
        
        // 🛡️ defensive check for progress list
        if (progRes.data.progress && Array.isArray(progRes.data.progress)) {
           const prog = progRes.data.progress.find(p => p.topicId?._id === id || p.topicId === id);
           if (prog) setStatus(prog.status || 'unstarted');
        }
      } catch (err) {
        console.error('Error fetching topic:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const updateStatus = async (newStatus) => {
    try {
      const res = await axios.post('/api/progress/update', {
        topicId: id,
        status: newStatus
      });
      setStatus(res.data.progress.status);
      
      if (res.data.xpGained > 0) {
        setShowXpGain(true);
        setTimeout(() => setShowXpGain(false), 3000);
      }
      if (res.data.leveledUp) {
        setLeveledUp(true);
      }
    } catch (err) {
      console.error('Failed to update progress');
    }
  };

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim() || aiLoading) return;

    const userMsg = { role: 'user', content: question, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChat(prev => [...prev, userMsg]);
    setQuestion('');
    setAiLoading(true);

    try {
      const res = await axios.post('/api/ai/ask', {
        topicId: id,
        question: userMsg.content
      });
      setChat(prev => [...prev, { role: 'ai', content: res.data.answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setUsage(prev => ({ ...prev, remainingQueries: res.data.remainingQueries }));
    } catch (err) {
      setChat(prev => [...prev, { 
        role: 'error', 
        content: err.response?.data?.error || 'Failed to contact AI tutor.' 
      }]);
    } finally {
      setAiLoading(false);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      <span className="loading loading-infinity text-primary loading-lg w-20"></span>
      <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">Synchronizing Module Data...</p>
    </div>
  );

  // 🛡️ SAFETY CHECK: If topic data is missing, redirect or show error
  if (!topic) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center p-10 bg-base-100 rounded-[3rem] border border-white/5">
       <AlertOctagon className="w-20 h-20 text-error animate-bounce" />
       <div className="space-y-4">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">Data Sync Interrupted</h2>
          <p className="text-slate-500 font-medium italic max-w-sm mx-auto">This lesson module is currently out of sync or doesn't exist in our memory banks.</p>
       </div>
       <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-lg rounded-3xl h-16 font-black italic uppercase tracking-widest px-10">Return to Hub</button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 pb-20 max-w-7xl mx-auto px-4">
      {/* 🏆 XP Gain Notification Overlay */}
      <AnimatePresence>
        {showXpGain && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
          >
            <div className="badge badge-success h-20 px-10 rounded-[2rem] shadow-2xl shadow-emerald-500/40 gap-4 border-none scale-125">
              <Zap className="w-8 h-8 fill-white" />
              <span className="text-3xl font-black italic">+100 XP Mastery</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📖 Content Column */}
      <motion.div 
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        className="xl:col-span-2 space-y-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass p-6 md:p-8 rounded-[3.5rem] mt-[-1rem] shadow-xl border border-white/5 backdrop-blur-3xl relative">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-ghost btn-sm md:btn-md gap-3 rounded-2xl group flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform text-primary" />
            <span className="font-black text-[10px] uppercase tracking-widest italic font-outfit">Neural Map</span>
          </button>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
             <div className="join w-full sm:w-auto bg-base-300/50 p-1 rounded-2xl border border-white/5 shadow-inner">
                {['reading', 'completed', 'mastered'].map((s) => (
                  <button 
                    key={s}
                    onClick={() => updateStatus(s)}
                    className={`join-item btn btn-sm h-12 px-6 rounded-xl border-none transition-all duration-500 font-black italic flex-1 sm:flex-none uppercase text-[9px] tracking-widest ${
                      status === s 
                        ? s === 'mastered' ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20' : 'btn-primary shadow-lg' 
                        : 'btn-ghost text-base-content/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="card bg-slate-900/40 border border-white/5 rounded-[4rem] shadow-3xl overflow-hidden min-h-[700px]">
          <div className="card-body p-10 md:p-16">
            <header className="mb-14 pb-8 border-b border-white/5 relative">
              <div className="flex items-center gap-4 mb-8">
                <Bookmark className="w-5 h-5 text-secondary" />
                <span className="badge badge-secondary badge-outline font-black text-[9px] tracking-[.3em] uppercase py-3 px-6">Directive {topic.chapter?.number || '0'}</span>
                {status === 'mastered' && (
                  <div className="flex items-center gap-2 ml-auto text-emerald-500">
                    <Star className="w-5 h-5 fill-current animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Neural Excellence</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-primary rounded-full" />
                  <p className="text-primary text-xs font-black uppercase tracking-[0.5em] italic">CHAPTER {topic.chapter?.number || '0'}</p>
                </div>
                <h1 className={`text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white ${language === 'bangla' ? 'bn text-5xl not-italic leading-tight' : ''}`}>
                  {language === 'bangla' ? topic.topic?.bangla : topic.topic?.english}
                </h1>
              </div>
            </header>

            <article className={`max-w-none text-xl md:text-2xl text-slate-400 leading-relaxed font-medium space-y-12 ${language === 'bangla' ? 'bn leading-loose' : 'italic'}`}>
              <div className="whitespace-pre-wrap">
                {language === 'bangla' ? topic.content?.bangla : topic.content?.english}
              </div>
            </article>

            {topic.formulas && topic.formulas.length > 0 && (
              <div className="divider opacity-5 mt-24 mb-14 uppercase font-black text-[10px] tracking-[0.5em]">Laws of Physics</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {topic.formulas?.map((f, idx) => (
                <div key={idx} className="card bg-black/20 hover:bg-black/40 hover:scale-[1.03] border border-white/5 rounded-[3rem] transition-all duration-700 overflow-hidden group">
                  <div className="card-body p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <Cpu className="w-5 h-5 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn' : ''}`}>
                        {language === 'bangla' ? f.name?.bangla : f.name?.english}
                      </span>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter italic">
                      {f.formula}
                    </div>
                    <p className={`text-base text-slate-500 leading-relaxed font-medium italic ${language === 'bangla' ? 'bn text-lg' : ''}`}>
                      {language === 'bangla' ? f.explanation?.bangla : f.explanation?.english}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🤖 AI Tutor Sidebar (With Mobile Bottom Toggle) */}
      <motion.aside 
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        className={`xl:col-span-2 fixed inset-x-0 bottom-0 z-[60] xl:static xl:z-auto bg-slate-950 xl:bg-transparent transition-transform duration-500 xl:translate-y-0 ${showAi ? 'translate-y-0' : 'translate-y-[calc(100%-80px)] xl:translate-y-0'}`}
      >
        <div className="card bg-slate-900 shadow-3xl xl:bg-slate-900/40 border border-white/5 rounded-t-[4rem] xl:rounded-[4.5rem] flex flex-col h-[850px] xl:h-[850px] sticky top-24 overflow-hidden backdrop-blur-3xl">
          {/* AI Header / Mobile Toggle */}
          <div 
            onClick={() => setShowAi(!showAi)}
            className="p-8 border-b border-white/5 flex items-center justify-between cursor-pointer xl:cursor-default bg-black/20"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform">
                <Bot className="text-primary-content w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="font-black text-2xl italic tracking-tight text-white uppercase">Neural Tutor</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></div>
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em]">Synapse Syncing</span>
                </div>
              </div>
            </div>
            
            <div className="xl:hidden">
              {showAi ? <X className="w-8 h-8 opacity-20" /> : <MessageSquare className="w-8 h-8 text-primary animate-bounce mt-4 shadow-primary/20 shadow-2xl" />}
            </div>

            <div className="hidden xl:flex stat place-items-end p-0 opacity-80">
              <div className="stat-desc font-black opacity-30 text-[9px] uppercase tracking-widest">Neural Credits</div>
              <div className={`stat-value transition-colors duration-700 text-3xl italic ${usage.remainingQueries <= 1 ? 'text-error' : 'text-primary'}`}>
                {usage.remainingQueries}<span className="text-xs opacity-30 italic">/5</span>
              </div>
            </div>
          </div>

          {/* AI Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
            <AnimatePresence initial={false}>
              {chat.length === 0 && !aiLoading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 gap-10 opacity-30 grayscale">
                  <div className="w-24 h-24 rounded-[3.5rem] bg-base-300 flex items-center justify-center border border-white/10 shadow-inner">
                    <Cpu className="text-primary w-12 h-12" />
                  </div>
                  <p className="text-sm font-black italic uppercase tracking-[0.3em] font-outfit">Open Neural inquiry portal for lesson synthesis</p>
                </div>
              )}
              
              {chat.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
                >
                  <div className="chat-header opacity-20 mb-2 font-black uppercase text-[8px] tracking-[0.2em]">
                    {msg.role === 'user' ? 'Direct Prompt' : 'Resolution'}
                  </div>
                  <div className={`chat-bubble shadow-3xl text-[16px] leading-[1.6] py-5 px-8 rounded-[2.5rem] border border-white/5 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-content font-bold italic' 
                      : msg.role === 'error'
                      ? 'bg-error/10 text-error font-black border-error/20'
                      : 'bg-black/40 text-slate-300 glass'
                  }`}>
                    <div className={`${msg.role !== 'user' ? 'bn text-xl leading-loose font-medium italic' : ''} whitespace-pre-wrap`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {aiLoading && (
              <div className="chat chat-start">
                <div className="chat-bubble bg-black/40 glass animate-pulse py-5 px-10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.6em] text-primary italic">
                  Synthesizing Response...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* AI Input Area */}
          <div className="p-10 pt-6 bg-black/40">
            <form onSubmit={handleAskAI} className="relative group">
              <input 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={usage.remainingQueries > 0 ? "Identify inquiry parameters..." : "Neural credits depleted."}
                disabled={usage.remainingQueries === 0 || aiLoading}
                className="input input-bordered input-lg w-full pr-24 h-24 bg-base-300/40 focus:bg-base-300 border-white/5 focus:border-primary/50 transition-all font-outfit font-black rounded-[2.5rem] text-lg uppercase italic tracking-widest placeholder:opacity-20 text-white"
              />
              <button 
                type="submit"
                disabled={!question.trim() || usage.remainingQueries === 0 || aiLoading}
                className="btn btn-primary btn-circle absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 shadow-2xl shadow-primary/30 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700"
              >
                <Send className="w-7 h-7" />
              </button>
            </form>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default TopicPage;
