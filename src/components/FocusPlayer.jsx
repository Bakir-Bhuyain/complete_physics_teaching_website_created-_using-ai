import { useState } from 'react';
import { Play, Pause, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FocusPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Note: Using a copyright-free Lo-Fi stream link
  const audioUrl = "https://stream.zeno.fm/0r0xa792kwzuv"; 

  return (
    <div className="fixed bottom-10 left-10 z-[200]">
      <AnimatePresence>
        {showPlayer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="neural-card p-4 mb-4 w-64 flex items-center gap-4 bg-slate-900/90 border-primary/20"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse">
               <Music className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-[10px] font-black uppercase tracking-widest text-white italic truncate">Neural Focus Beats</p>
               <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30 italic">Lofi Study Stream</p>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="btn btn-circle btn-sm btn-primary shadow-lg shadow-primary/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            
            {isPlaying && (
               <audio autoPlay src={audioUrl} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setShowPlayer(!showPlayer)}
        className={`btn btn-circle btn-lg border-none shadow-2xl transition-all duration-500 ${showPlayer ? 'btn-primary rotate-90' : 'bg-slate-900 text-primary hover:bg-primary hover:text-white'}`}
      >
        <Volume2 className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FocusPlayer;
