import { motion } from 'framer-motion';
import { Newspaper, ArrowRight, Zap, BookMarked, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BlogPage = () => {
  const { language } = useAuth();

  const posts = [
    {
      id: 1,
      title: { bangla: 'পদার্থবিজ্ঞানে কীভাবে এ+ পাওয়া যায়?', english: 'How to score A+ in Physics?' },
      content: { 
        bangla: 'পদার্থবিজ্ঞানে ভালো নম্বর পাওয়ার মূল রহস্য হলো সৃজনশীল প্রশ্ন ও গাণিতিক সমস্যার সঠিক সমাধান...', 
        english: 'The secret to scoring high in physics is mastering creative questions and mathematical problems...' 
      },
      tag: 'Exam Tips',
      date: 'March 24, 2026',
      readTime: '5 min'
    },
    {
      id: 2,
      title: { bangla: 'গতি ও ত্বরণের গাণিতিক ম্যাজিক', english: 'Mathematical Magic of Motion' },
      content: { 
        bangla: 'গতির সমীকরণগুলো মনে রাখার সহজ উপায় এবং সঠিক প্রয়োগ নিয়ে থাকছে বিশেষ আলোচনা...', 
        english: 'Special discussion on easy ways to remember motion equations and their correct application...' 
      },
      tag: 'Chapter 2',
      date: 'March 20, 2026',
      readTime: '8 min'
    },
    {
      id: 3,
      title: { bangla: 'বোর্ড পরীক্ষার সেরা ১০টি সৃজনশীল', english: 'Top 10 Board Creative Questions' },
      content: { 
        bangla: 'বিগত কয়েক বছরের বোর্ড প্রশ্ন বিশ্লেষণ করে সেরা ১০টি সৃজনশীল প্রশ্ন বাছাই করা হয়েছে...', 
        english: 'Top 10 creative questions selected by analyzing board questions of the past few years...' 
      },
      tag: 'Preparation',
      date: 'March 15, 2026',
      readTime: '12 min'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="space-y-12">
      {/* 📰 Blog Header */}
      <section className="text-center md:text-left space-y-6">
        <div className="flex items-center gap-4 justify-center md:justify-start">
           <Newspaper className="w-10 h-10 text-primary animate-pulse" />
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">Physics <span className="text-primary italic">Journal.</span></h1>
        </div>
        <p className="max-w-2xl text-xl font-medium opacity-50 italic">
          Deep dives into complex laws, exam strategies, and the latest from the scientific frontier.
        </p>
      </section>

      {/* 📑 Featured Posts */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post) => (
          <motion.div 
            key={post.id} 
            variants={itemVariants}
            className="card bg-base-100 shadow-2xl rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all group overflow-hidden"
          >
            <div className="card-body p-8 justify-between">
              <div className="space-y-4">
                <div className="badge badge-primary badge-outline font-black uppercase tracking-widest text-[9px] px-4 py-3">{post.tag}</div>
                <h3 className={`text-2xl font-black leading-tight group-hover:text-primary transition-colors ${language === 'bangla' ? 'bn text-3xl' : 'italic'}`}>
                  {language === 'bangla' ? post.title.bangla : post.title.english}
                </h3>
                <p className={`text-sm opacity-40 leading-relaxed line-clamp-3 font-medium ${language === 'bangla' ? 'bn text-lg' : ''}`}>
                  {language === 'bangla' ? post.content.bangla : post.content.english}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-3">
                   <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary rounded-full w-8 h-8 font-black text-[10px]">PA</div>
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">{post.date}</div>
                </div>
                <button className="btn btn-ghost btn-circle btn-sm group-hover:translate-x-1 transition-transform">
                   <ArrowRight className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 🔋 Weekly Newsletter Card */}
      <section className="bg-gradient-to-br from-primary to-accent p-12 md:p-20 rounded-[4rem] text-primary-content relative overflow-hidden shadow-3xl shadow-primary/20">
         <div className="relative z-10 space-y-8 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">Stay Synchronized.</h2>
            <p className="text-lg md:text-xl font-bold opacity-80 italic">Get weekly curated physics notes and problem sets delivered to your neural interface.</p>
            <div className="flex flex-col md:flex-row gap-4">
               <input type="email" placeholder="student@ssc.gov" className="input input-lg bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all rounded-[2rem] h-20 px-8 font-black w-full" />
               <button className="btn btn-neutral btn-lg h-20 rounded-[2rem] px-12 font-black italic text-xl">Activate Sync</button>
            </div>
         </div>
         <Zap className="absolute top-[-20%] right-[-10%] w-96 h-96 opacity-10 -rotate-12" />
      </section>
    </div>
  );
};

export default BlogPage;
