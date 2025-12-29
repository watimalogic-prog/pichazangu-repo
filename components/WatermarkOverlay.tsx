
import React from 'react';
import { Camera } from 'lucide-react';

interface WatermarkOverlayProps {
  photographer: string;
}

const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({ photographer }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-30">
      <div className="transform -rotate-45 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 border-2 border-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
           <Camera size={24} className="text-white" />
           <span className="font-bungee text-xl text-white">PICHA ZANGU</span>
        </div>
        <span className="font-embroidery text-lg text-white tracking-widest uppercase">
          by {photographer}
        </span>
      </div>
      
      {/* Repeater Pattern */}
      <div className="absolute top-4 left-4 font-black text-[8px] text-white opacity-20 uppercase tracking-[0.5em]">
        PICHA ZANGU • NO SCREENSHOTS • SECURE VAULT
      </div>
      <div className="absolute bottom-4 right-4 font-black text-[8px] text-white opacity-20 uppercase tracking-[0.5em]">
        PICHA ZANGU • 30-YEAR STORAGE • {photographer}
      </div>
    </div>
  );
};

export default WatermarkOverlay;
