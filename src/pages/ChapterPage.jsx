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
  AlertOctagon,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

const ChapterPage = () => {
  const { classId, chapterId } = useParams();
  const navigate = useNavigate();
  const { language } = useAuth();
  
  const [topics, setTopics] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [showAi, setShowAi] = useState(false); 
  const [showXpGain, setShowXpGain] = useState(false);
  
  // AI States
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [isSimplified, setIsSimplified] = useState(false);
  const [usage, setUsage] = useState({ remainingQueries: 5, limit: 5 });
  const chatEndRef = useRef(null);

  // 🪄 Highlight Magic States
  const [selection, setSelection] = useState({ text: '', x: 0, y: 0, visible: false });

  const handleTextSelection = (e) => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 5) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelection({
        text: selectedText,
        x: rect.left + (rect.width / 2),
        y: rect.top + window.scrollY - 10,
        visible: true
      });
    } else {
      setSelection(prev => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    // 🛡️ Safety Guard: Don't fetch if params are missing or undefined
    if (!classId || !chapterId || classId === 'undefined' || chapterId === 'undefined') return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [topicsRes, usageRes] = await Promise.all([
          axios.get(`/api/topics?class=${classId}&chapter=${chapterId}`),
          axios.get('/api/ai/usage')
        ]);
        setTopics(topicsRes.data.topics);
        setUsage(usageRes.data);
        setCurrentIndex(0);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Error fetching chapter data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [classId, chapterId]);

  const currentTopic = topics[currentIndex];

  const handleNext = async () => {
    // Mark current as completed before moving on
    if (currentTopic) {
      try {
        const res = await axios.post('/api/progress/update', {
          topicId: currentTopic._id,
          status: 'mastered'
        });
        if (res.data.xpGained > 0) {
          setShowXpGain(true);
          setTimeout(() => setShowXpGain(false), 3000);
        }
      } catch (err) {
        console.error('Failed to update progress', err);
      }
    }

    if (currentIndex < topics.length - 1) {
      setCurrentIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Go to next chapter
      const nextChapterId = parseInt(chapterId) + 1;
      navigate(`/chapter/${classId}/${nextChapterId}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      window.scrollTo(0, 0);
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
      const prompt = isSimplified ? `${userMsg.content} (Please explain this like I'm a 10-year old student with simple examples)` : userMsg.content;
      const res = await axios.post('/api/ai/ask', {
        topicId: currentTopic?._id,
        question: prompt
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
      <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">Loading Chapter Data...</p>
    </div>
  );

  if (!topics || topics.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 text-center p-10 bg-base-100 rounded-[3rem] border border-white/5">
       <AlertOctagon className="w-20 h-20 text-error animate-bounce" />
       <div className="space-y-4">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">Chapter Not Found</h2>
          <p className="text-slate-500 font-medium italic max-w-sm mx-auto">You have completed all available chapters or this chapter is not yet synced.</p>
       </div>
       <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-lg rounded-3xl h-16 font-black italic uppercase tracking-widest px-10">Return to Hub</button>
    </div>
  );

  const progressPercentage = Math.round(((currentIndex + 1) / topics.length) * 100);

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
        key={currentTopic._id}
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        className="xl:col-span-2 space-y-10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 neural-card p-6 md:px-10 md:py-8 mt-[-1rem] relative z-20">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-ghost gap-3 rounded-2xl group flex-shrink-0 border border-white/5 bg-white/5 hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform text-primary" />
            <span className="font-black text-[10px] uppercase tracking-widest italic font-outfit">Neural Hub</span>
          </button>
          
          <div className="flex flex-col items-end gap-2 flex-1 max-w-xs">
             <div className="flex justify-between w-full px-2">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-30 italic">Synapse Syncing...</span>
                <span className="text-[10px] font-black text-primary italic">{progressPercentage}%</span>
             </div>
             <div className="w-full h-3 bg-base-300 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]" 
                  style={{ width: `${progressPercentage}%` }}
                />
             </div>
          </div>
        </div>

        <div className="card bg-slate-900/40 border border-white/5 rounded-[4rem] shadow-3xl overflow-hidden min-h-[700px]">
          <div className="card-body p-10 md:p-16">
            <header className="mb-14 pb-10 border-b border-white/5 relative">
              <div className="flex flex-wrap items-center gap-6 mb-10">
                <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                  <Bookmark className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary-focus italic bg-secondary/5 px-4 py-2 rounded-lg border border-secondary/10">Chapter {chapterId}</span>
                  <div className="h-1 w-8 bg-white/5" />
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase italic border-l border-white/10 pl-4">Lesson {currentIndex + 1} of {topics.length}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className={`text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white ${language === 'bangla' ? 'bn text-6xl not-italic leading-tight' : ''}`}>
                  {language === 'bangla' ? currentTopic.topic?.bangla : currentTopic.topic?.english}
                </h1>
                <div className="h-2 w-32 bg-primary/20 rounded-full" />
              </div>
            </header>

            <article 
              onMouseUp={handleTextSelection}
              onKeyUp={handleTextSelection}
              className={`relative prose prose-invert max-w-none text-xl md:text-2xl text-slate-400 leading-relaxed font-medium space-y-6 ${language === 'bangla' ? 'bn leading-loose' : 'italic'}`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                className="whitespace-pre-wrap"
              >
                {language === 'bangla' ? currentTopic.content?.bangla : currentTopic.content?.english}
              </ReactMarkdown>

              {/* 🪄 Highlight Magic Tooltip */}
              <AnimatePresence>
                {selection.visible && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    style={{ 
                      position: 'absolute', 
                      left: selection.x, 
                      top: selection.y, 
                      transform: 'translateX(-50%) translateY(-100%)',
                      zIndex: 100 
                    }}
                    className="pointer-events-auto"
                  >
                    <button 
                      onClick={() => {
                        setQuestion(`Can you explain this specific part: "${selection.text}"?`);
                        setShowAi(true);
                        setSelection(prev => ({ ...prev, visible: false }));
                      }}
                      className="btn btn-primary btn-sm rounded-full shadow-2xl shadow-primary/40 gap-2 h-10 px-4 border-none group"
                    >
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="text-[9px] font-black uppercase tracking-widest italic">Ask Neural AI</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>

            {currentTopic.formulas && currentTopic.formulas.length > 0 && (
              <div className="divider opacity-5 mt-24 mb-14 uppercase font-black text-[10px] tracking-[0.5em]">Laws of Physics</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {currentTopic.formulas?.map((f, idx) => (
                <div key={idx} className="card bg-black/20 hover:bg-black/40 hover:scale-[1.03] border border-white/5 rounded-[3rem] transition-all duration-700 overflow-hidden group">
                  <div className="card-body p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <Cpu className="w-5 h-5 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn' : ''}`}>
                        {language === 'bangla' ? f.name?.bangla : f.name?.english}
                      </span>
                    </div>
                    <div className="text-3xl md:text-4xl text-white mb-8 overflow-x-auto pb-4 scrollbar-hide">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {`$$${f.formula}$$`}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-base text-slate-500 leading-relaxed font-medium italic ${language === 'bangla' ? 'bn text-lg' : ''}`}>
                      {language === 'bangla' ? f.explanation?.bangla : f.explanation?.english}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn btn-ghost rounded-3xl h-16 px-8 font-black uppercase tracking-widest text-xs disabled:opacity-20"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous Topic
              </button>
              
              <button 
                onClick={handleNext}
                className="btn btn-primary rounded-3xl h-16 px-10 font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30"
              >
                {currentIndex < topics.length - 1 ? 'Next Topic' : 'Next Chapter'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>

          </div>
        </div>
      </motion.div>

      {/* 🤖 AI Tutor Sidebar */}
      <motion.aside 
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        className={`xl:col-span-2 fixed inset-x-0 bottom-0 z-[60] xl:static xl:z-auto bg-slate-950 xl:bg-transparent transition-transform duration-500 xl:translate-y-0 ${showAi ? 'translate-y-0' : 'translate-y-[calc(100%-80px)] xl:translate-y-0'}`}
      >
        <div className="card bg-slate-900 shadow-3xl xl:bg-slate-900/40 border border-white/5 rounded-t-[4rem] xl:rounded-[4.5rem] flex flex-col h-[850px] xl:h-[850px] sticky top-24 overflow-hidden backdrop-blur-3xl">
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
                  <div className={`chat-bubble shadow-3xl text-[16px] leading-[1.7] py-6 px-8 rounded-[2.5rem] border border-white/5 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-content font-black italic' 
                      : msg.role === 'error'
                      ? 'bg-error/10 text-error font-black border-error/20'
                      : 'bg-white/5 text-slate-300 backdrop-blur-xl'
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

          <div className="p-10 pt-6 bg-black/40 space-y-4">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${isSimplified ? 'bg-success animate-pulse' : 'bg-white/10'}`} />
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 italic">Simplify Logic</span>
               </div>
               <input 
                 type="checkbox" 
                 className="toggle toggle-primary toggle-sm border-white/10 bg-white/5" 
                 checked={isSimplified}
                 onChange={() => setIsSimplified(!isSimplified)}
               />
            </div>
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

export default ChapterPage;
