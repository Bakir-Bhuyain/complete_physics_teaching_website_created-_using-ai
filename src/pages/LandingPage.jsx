import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Sparkles, BookOpen, Bot, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Bilingual AI Tutor",
      desc: "Ask physics questions in Bangla or English. Our AI understands and explains in your language.",
      color: "from-primary/20 to-transparent"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-secondary" />,
      title: "NCTB Aligned",
      desc: "Every chapter and topic follows the latest Class 9-10 Physics syllabus perfectly.",
      color: "from-secondary/20 to-transparent"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "Mastery Tracking",
      desc: "Monitor your progress, earn XP, and reach new academic levels as you study.",
      color: "from-accent/20 to-transparent"
    }
  ];

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden flex flex-col pt-16">
      <div className="mesh-bg opacity-30" />

      {/* 🧭 Public Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 glass z-50 px-8 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Cpu className="text-primary-content w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">SSC <span className="text-primary">Physics</span></span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-ghost font-black uppercase text-[10px] tracking-widest">Sign In</Link>
          <Link to="/register" className="btn btn-primary rounded-xl font-black px-8">Join Now</Link>
        </div>
      </nav>

      {/* 🚀 Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 mb-8 px-5 py-2 rounded-full glass border-white/5 animate-bounce">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Next Generation Learning</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10 italic">
            Physics. <br />
            <span className="text-primary">Demystified.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-base-content/50 font-medium max-w-2xl mx-auto leading-relaxed mb-12 italic">
            The ultimate distraction-free learning platform for Bangladeshi SSC students. 
            Study with AI support and master your curriculum.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="btn btn-primary btn-lg h-20 px-12 rounded-[2rem] font-black italic text-xl shadow-2xl shadow-primary/40 group overflow-hidden">
              Initialize Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg h-20 px-12 rounded-[2rem] font-black italic text-xl hover:bg-white/5 transition-all">
              Resume Session
            </Link>
          </div>
        </motion.div>

        {/* 🧪 Floating Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-12 mt-24 opacity-30 grayscale"
        >
          <div className="text-center">
            <p className="text-4xl font-black">2.4k+</p>
            <p className="text-[9px] uppercase font-black tracking-widest">Neural Students</p>
          </div>
          <div className="text-center border-x border-white/10 px-12">
            <p className="text-4xl font-black">100%</p>
            <p className="text-[9px] uppercase font-black tracking-widest">NCTB Coverage</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black">0.4ms</p>
            <p className="text-[9px] uppercase font-black tracking-widest">Tutor Latency</p>
          </div>
        </motion.div>
      </section>

      {/* ✨ Features Grid */}
      <section className="bg-base-200/50 py-32 border-t border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`card bg-base-100 border border-white/5 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-b ${f.color}`}
              >
                <div className="mb-8">{f.icon}</div>
                <h3 className="text-2xl font-black italic mb-4">{f.title}</h3>
                <p className="text-base-content/40 font-medium leading-relaxed">{f.desc}</p>
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡 Protection Note */}
      <footer className="py-20 text-center opacity-20 border-t border-white/5">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">SSL Secure & NCTB Verified</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest">&copy; 2026 SSC Physics Academy. Built for Excellence.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
