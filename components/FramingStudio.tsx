import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Maximize2, Layers, Home, Info, ShoppingCart, Loader2 } from 'lucide-react';
import { Photo } from '../types';
import { useToastStore, useCartStore } from '../store/useAppStore';

interface FramingStudioProps {
  photo: Photo;
  onClose: () => void;
}

const WALLS = [
  { id: 'gallery', name: 'Art Gallery', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'modern', name: 'Industrial Loft', url: 'https://images.unsplash.com/photo-1522444195799-478538b28823?auto=format&fit=crop&w=1200&q=80' },
  { id: 'lodge', name: 'Safari Lodge', url: 'https://images.unsplash.com/photo-1544161515-4af6b1d4970a?auto=format&fit=crop&w=1200&q=80' },
];

const FRAMES = [
  { id: 'ebony', name: 'Polished Ebony', color: '#000000', border: 'border-8 border-black shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]' },
  { id: 'teak', name: 'Natural Teak', color: '#8b4513', border: 'border-8 border-[#5d2e0c] shadow-xl' },
  { id: 'gold', name: 'Royal Gold', color: '#ffd700', border: 'border-8 border-[#d4af37] shadow-2xl' },
  { id: 'white', name: 'Minimal White', color: '#ffffff', border: 'border-8 border-white shadow-sm' },
];

const FramingStudio: React.FC<FramingStudioProps> = ({ photo, onClose }) => {
  const [selectedWall, setSelectedWall] = useState(WALLS[0]);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
  const [isOrdering, setIsOrdering] = useState(false);
  const showToast = useToastStore((s) => s.showToast);
  const addItem = useCartStore((s) => s.addItem);

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      addItem(photo, photo.price + 5000); // Frame markup
      showToast("Framed physical order synced to cart", "success");
      setIsOrdering(false);
      onClose();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl flex flex-col"
    >
      {/* Top Header */}
      <header className="h-20 border-b border-white/10 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Layers className="text-red-600" />
           <h2 className="font-embroidery text-3xl italic uppercase text-white">THE FRAME <span className="text-red-600">LAB</span></h2>
        </div>
        <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-red-600 transition-all">
          <X size={24} />
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* VISUALIZER (LEFT) */}
        <div className="flex-1 relative overflow-hidden bg-[#111] flex items-center justify-center p-12">
           <img src={selectedWall.url} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
           <div className="absolute inset-0 bg-black/20" />
           
           <motion.div 
             layoutId={`frame-${photo.id}`}
             className={`relative z-10 transition-all duration-700 w-full max-w-lg aspect-[4/5] bg-white ${selectedFrame.border}`}
             style={{ transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' }}
           >
              <img src={photo.url} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
           </motion.div>

           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-4">
              <Home size={16} className="text-red-600" />
              <span className="text-[10px] font-black uppercase text-white tracking-widest">Environment: {selectedWall.name}</span>
           </div>
        </div>

        {/* CONTROLS (RIGHT) */}
        <aside className="w-full lg:w-96 bg-black border-l border-white/5 p-10 space-y-12 overflow-y-auto">
           <div>
              <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">1. Select Interior</span>
              <div className="grid grid-cols-3 gap-3">
                 {WALLS.map(w => (
                   <button 
                    key={w.id} onClick={() => setSelectedWall(w)}
                    className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedWall.id === w.id ? 'border-red-600 ring-2 ring-red-600/20' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                   >
                     <img src={w.url} className="w-full h-full object-cover" alt="" />
                   </button>
                 ))}
              </div>
           </div>

           <div>
              <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">2. Frame Selection</span>
              <div className="space-y-3">
                 {FRAMES.map(f => (
                   <button 
                    key={f.id} onClick={() => setSelectedFrame(f)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${selectedFrame.id === f.id ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'}`}
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-md shadow-inner" style={{ backgroundColor: f.color, border: f.id === 'white' ? '1px solid #ddd' : 'none' }} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{f.name}</span>
                     </div>
                     {selectedFrame.id === f.id && <Check size={16} />}
                   </button>
                 ))}
              </div>
           </div>

           <div className="pt-10 border-t border-white/5">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <span className="text-gray-500 text-[10px] font-black uppercase block mb-1">Physical Delivery</span>
                    <span className="text-3xl font-bungee">KES {(photo.price + 5000).toLocaleString()}</span>
                 </div>
                 <Info size={20} className="text-gray-500 cursor-help" />
              </div>
              <button 
                onClick={handleOrder}
                disabled={isOrdering}
                className="w-full bg-red-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-red-900/40 flex items-center justify-center gap-4 hover:bg-white hover:text-red-600 transition-all uppercase text-xs tracking-widest"
              >
                 {isOrdering ? <Loader2 className="animate-spin" /> : <ShoppingCart />}
                 {isOrdering ? 'PROCESSING...' : 'ORDER FRAMED PRINT'}
              </button>
              <p className="text-[8px] text-center text-gray-600 uppercase font-black mt-6 tracking-widest">Ships within 48 hours to all major regional hubs</p>
           </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default FramingStudio;