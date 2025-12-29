import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { EditingInstructions } from '../types';

interface StyleSliderProps {
  beforeUrl: string;
  afterUrl?: string; // If provided, we show real images, otherwise we apply CSS filters to beforeUrl
  instructions?: EditingInstructions;
  height?: string;
}

const StyleSlider: React.FC<StyleSliderProps> = ({ 
  beforeUrl, 
  afterUrl, 
  instructions,
  height = "h-[500px]" 
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  // Map AI instructions to CSS filters
  const generateFilter = (inst: EditingInstructions) => {
    return `
      brightness(${inst.brightness}%) 
      contrast(${inst.contrast}%) 
      saturate(${inst.saturation}%) 
      sepia(${inst.sepia}%)
      hue-rotate(${inst.hueShift}deg)
    `.trim();
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className={`relative w-full ${height} rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none bg-black group`}
    >
      {/* "AFTER" LAYER (Processed) */}
      <div className="absolute inset-0 z-0">
        <img 
          src={afterUrl || beforeUrl} 
          className="w-full h-full object-cover" 
          alt="Processed"
          style={!afterUrl && instructions ? { filter: generateFilter(instructions) } : {}}
        />
        {instructions?.grain && instructions.grain > 0 && (
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay animate-pulse" 
               style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
        )}
      </div>

      {/* "BEFORE" LAYER (Original) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={beforeUrl} 
          className="w-full h-full object-cover" 
          alt="Original"
          style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
        />
      </div>

      {/* SLIDER HANDLE */}
      <div 
        className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-gray-100">
           <div className="flex gap-0.5">
              <ChevronLeft size={14} className="text-gray-400" />
              <ChevronRight size={14} className="text-gray-400" />
           </div>
        </div>
      </div>

      {/* LABELS */}
      <div className="absolute bottom-6 left-6 z-30 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/10 group-hover:opacity-0 transition-opacity">
        Original RAW
      </div>
      <div className="absolute bottom-6 right-6 z-30 bg-red-600 px-4 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest shadow-xl flex items-center gap-2 group-hover:opacity-0 transition-opacity">
        <Wand2 size={12} /> AI Style Applied
      </div>
    </div>
  );
};

export default StyleSlider;