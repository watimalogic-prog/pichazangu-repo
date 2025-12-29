import React from 'react';
import { MapPin, ShoppingCart, Info, Lock } from 'lucide-react';
import { Photo, Currency } from '../types';
import { CURRENCY_SYMBOLS, COLORS } from '../constants';
import ProtectedImage from './ProtectedImage';
import VerificationBadge from './VerificationBadge';
import { useCartStore } from '../store/useAppStore';

interface PhotoCardProps {
  photo: Photo;
  showGeo?: boolean;
  currency?: Currency;
  isPhotographerMode?: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, showGeo, currency = 'KES', isPhotographerMode }) => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const addItem = useCartStore((state) => state.addItem);
  
  // Logic: Photographer Price + 7/10 fee
  const platformFee = photo.category === 'Stock' ? 10 : 7;
  const totalPrice = photo.price + platformFee;

  return (
    <div className="group relative bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 hover:border-red-600/30 shadow-xl transition-all duration-300">
      <div className="aspect-[3/4] overflow-hidden bg-gray-900 relative">
        <ProtectedImage 
          src={photo.url} 
          photographerName={photo.photographer} 
          alt={photo.title}
        />

        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="bg-black/60 backdrop-blur-md text-white text-[8px] px-3 py-1.5 rounded-full uppercase tracking-widest font-black">
            {photo.license}
          </span>
          {showGeo && photo.location && (
            <span className="bg-red-600/80 backdrop-blur-md text-white text-[8px] px-3 py-1.5 rounded-full flex items-center gap-1 font-black">
              <MapPin size={10} /> {photo.location}
            </span>
          )}
        </div>

        <div className="absolute bottom-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-xl text-red-500 z-20">
          <Lock size={16} />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-embroidery text-xl text-white line-clamp-1">{photo.title}</h3>
          <div className="text-right">
            <span className="text-red-500 font-bungee text-lg block">
              {symbol} {totalPrice.toLocaleString()}
            </span>
            {isPhotographerMode && (
              <span className="text-[8px] text-gray-500 font-bold uppercase">
                INC. {platformFee} KSH FEE (HIDDEN)
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-500 text-[10px] mb-6 flex items-center gap-2 font-bold uppercase tracking-widest">
          Captured by <span className="text-white">{photo.photographer} <VerificationBadge type="photographer" size={10} /></span>
        </p>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Info size={14} /> Details
          </button>
          <button 
            onClick={() => addItem(photo)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/40"
          >
            <ShoppingCart size={14} /> Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;