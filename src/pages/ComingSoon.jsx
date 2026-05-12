import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Construction, Hammer, Rocket, ArrowLeft, Beaker, Microscope, Calculator, Monitor } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const subjectName = location.pathname.split('/').pop().toUpperCase();

  const getSubjectIcon = () => {
    switch(subjectName) {
      case 'CHEMISTRY': return <Beaker className="w-16 h-16 text-primary" />;
      case 'BIOLOGY': return <Microscope className="w-16 h-16 text-secondary" />;
      case 'MATH': return <Calculator className="w-16 h-16 text-warning" />;
      case 'ICT': return <Monitor className="w-16 h-16 text-info" />;
      default: return <Hammer className="w-16 h-16 text-primary" />;
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="relative inline-block">
          <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-xl relative z-10">
            {getSubjectIcon()}
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30"
          >
            <Cpu className="w-6 h-6 text-primary" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white leading-none">
            {subjectName} <span className="text-primary gradient-text">NEXUS.</span>
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-white/10" />
             <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 italic">Work In Progress</p>
             <div className="h-px w-12 bg-white/10" />
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <p className="text-lg text-slate-400 font-medium italic">
            Our neural network is currently synthesizing the curriculum for this subject. New modules will be synchronized soon.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard" className="btn btn-primary btn-lg rounded-2xl px-10 font-black italic uppercase tracking-widest text-xs group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Physics
            </Link>
            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/5">
              <Construction className="w-4 h-4 text-warning animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Targeting Q3 Release</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-20 left-10 opacity-10 animate-pulse hidden xl:block">
        <Rocket className="w-32 h-32 rotate-45" />
      </div>
    </div>
  );
};

export default ComingSoon;
