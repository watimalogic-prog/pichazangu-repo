
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Info, Lock, Zap, Flame, Plus, Layers } from 'lucide-react';
import { Photo, Currency } from '../types';
import { COLORS } from '../constants';
import ProtectedImage from './ProtectedImage';
import VerificationBadge from './VerificationBadge';
import FramingStudio from './FramingStudio';
import LocalizedPrice from './LocalizedPrice';
import { useCartStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoCardProps {
  photo: Photo;
  showGeo?: boolean;
  currency?: Currency;
  isPhotographerMode?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, showGeo, currency = 'KES', isPhotographerMode }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isFramingOpen, setIsFramingOpen] = useState(false);
  
  // Logic: Photographer Price + 7/10 fee
  const platformFee = photo.category === 'Stock' ? 10 : 7;
  const totalPrice = photo.price + platformFee;
  const isIppo = photo.isIPPO;

  return (
    <>
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-red-600/30 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      >
        <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
          <ProtectedImage 
            src={photo.url} 
            photographerName={photo.photographer} 
            alt={photo.title}
          />

          <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
            <div className="bg-black/60 backdrop-blur-md text-white text-[8px] px-3 py-1.5 rounded-full uppercase tracking-widest font-black border border-white/10">
              {photo.license}
            </div>
          </div>

          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
             <button 
               onClick={(e) => { e.stopPropagation(); setIsFramingOpen(true); }}
               className="p-3 bg-white text-gray-900 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all"
             >
                <Layers size={18} />
             </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
             <button 
               onClick={() => addItem(photo)}
               className="w-full bg-red-600 hover:bg-white hover:text-red-600 text-white text-[10px] font-black uppercase py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-900/40"
             >
               <ShoppingCart size={18} /> Full License Details
             </button>
          </div>
        </div>
        
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 min-w-0">
               <h3 className="font-bold text-gray-900 text-xl line-clamp-1 group-hover:text-red-600 transition-colors leading-tight">{photo.title}</h3>
               <p className="text-gray-400 text-[9px] mt-1.5 flex items-center gap-2 font-black uppercase tracking-widest">
                 By <span className="text-gray-900">{photo.photographer}</span> <VerificationBadge type="photographer" size={12} />
               </p>
            </div>
            <div className="text-right ml-4 shrink-0">
              <LocalizedPrice 
                basePrice={totalPrice} 
                className="text-red-600 font-bungee text-2xl block leading-none" 
              />
              <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Regional Node Index</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFramingOpen && (
          <FramingStudio photo={photo} onClose={() => setIsFramingOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoCard;
