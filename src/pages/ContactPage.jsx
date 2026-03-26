import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Github, Facebook, Sparkles, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ContactPage = () => {
  const { language } = useAuth();
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="space-y-16">
      {/* 📞 Contact Hero */}
      <section className="text-center md:text-left space-y-6">
        <div className="flex items-center gap-4 justify-center md:justify-start">
           <MessageSquare className="w-10 h-10 text-secondary animate-bounce" />
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">Support <span className="text-secondary italic">Neural.</span></h1>
        </div>
        <p className="max-w-2xl text-xl font-medium opacity-50 italic">
          Experiencing a glitch in the laws of physics or just need study help? Our senior scientists are ready to assist.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* ✉️ Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="card bg-base-100 shadow-3xl rounded-[4rem] border border-white/5 p-8 md:p-16 relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic tracking-tight uppercase">Transmit <span className="text-secondary">Data</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Identity Verification Applied</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="form-control">
                  <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-widest opacity-40 ml-2">Protocol Name</span></label>
                  <input type="text" placeholder="Isaac Newton" className="input input-lg bg-base-200/50 border-white/5 rounded-3xl h-16 font-bold focus:border-secondary/50 transition-all px-8 w-full" required />
               </div>
               <div className="form-control">
                  <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-widest opacity-40 ml-2">Neural Address</span></label>
                  <input type="email" placeholder="isaac@physics.net" className="input input-lg bg-base-200/50 border-white/5 rounded-3xl h-16 font-bold focus:border-secondary/50 transition-all px-8 w-full" required />
               </div>
            </div>

            <div className="form-control">
              <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-widest opacity-40 ml-2">Transmission Subject</span></label>
              <select className="select select-lg bg-base-200/50 border-white/5 rounded-3xl h-16 font-bold focus:border-secondary/50 transition-all px-8 w-full">
                 <option>Subject Matter Doubt</option>
                 <option>Platform Sync Issue</option>
                 <option>Neural Profile Recovery</option>
                 <option>Partnership Proposal</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label py-0"><span className="label-text text-[9px] font-black uppercase tracking-widest opacity-40 ml-2">Message Content</span></label>
              <textarea placeholder="How can we help your learning journey today?" className="textarea textarea-lg bg-base-200/50 border-white/5 rounded-3xl min-h-[150px] font-bold focus:border-secondary/50 transition-all px-8 py-6 w-full" required></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="btn btn-secondary btn-lg h-20 rounded-[2.5rem] w-full font-black italic text-xl shadow-2xl shadow-secondary/30 group"
            >
              {status === 'sending' ? <span className="loading loading-dots loading-lg"></span> : (
                <>
                  Transmit Message
                  <Send className={`w-6 h-6 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${status === 'success' ? 'text-success' : ''}`} />
                </>
              )}
            </button>
            
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-success rounded-3xl text-sm font-black uppercase tracking-widest"
              >
                <span>Message Received. Syncing Response...</span>
              </motion.div>
            )}
          </form>
          <Sparkles className="absolute top-[-5%] left-[-5%] w-32 h-32 text-secondary opacity-5 rotate-12" />
        </motion.div>

        {/* 🗺 Sync Locations */}
        <div className="space-y-12">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-base-200/30 p-12 rounded-[3.5rem] border border-white/5 space-y-10"
           >
              <div className="space-y-2">
                 <h3 className="text-3xl font-black italic tracking-tight">Direct <span className="text-secondary">Sync.</span></h3>
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30 italic">Satellite Uplink Hubs</p>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center gap-6 group">
                    <div className="bg-secondary/10 p-5 rounded-2xl group-hover:bg-secondary group-hover:text-secondary-content transition-all animate-pulse">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1 italic">Main Research Lab</p>
                       <p className="text-lg font-bold">123 Theoretical Rd, Science City, Bangladesh</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group">
                    <div className="bg-secondary/10 p-5 rounded-2xl group-hover:bg-secondary group-hover:text-secondary-content transition-all delay-500 animate-pulse">
                       <Phone className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1 italic">Vocal Network</p>
                       <p className="text-lg font-bold">+880-96-ACADEMY</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 group">
                    <div className="bg-secondary/10 p-5 rounded-2xl group-hover:bg-secondary group-hover:text-secondary-content transition-all delay-1000 animate-pulse">
                       <Mail className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-30 mb-1 italic">Digital Nexus</p>
                       <p className="text-lg font-bold">support@physicsacademy.io</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           <div className="grid grid-cols-2 gap-8 px-6">
              <button className="btn btn-outline btn-lg rounded-[2.5rem] h-20 border-white/5 hover:bg-white/5 hover:scale-105 transition-all text-sm font-black italic group">
                 <Facebook className="w-5 h-5 mr-3 text-blue-500" /> Facebook Page
              </button>
              <button className="btn btn-outline btn-lg rounded-[2.5rem] h-20 border-white/5 hover:bg-white/5 hover:scale-105 transition-all text-sm font-black italic group">
                 <Github className="w-5 h-5 mr-3 text-primary" /> Core Source
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
