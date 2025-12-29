import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Lock, Camera, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedUrl, getBlurPlaceholder } from '../services/imageService';

interface ProtectedImageProps {
  src: string;
  photographerName: string;
  alt?: string;
  className?: string;
  isPurchased?: boolean;
  priority?: boolean;
  width?: number;
}

const ProtectedImage: React.FC<ProtectedImageProps> = ({ 
  src, 
  photographerName, 
  alt = "Picha Zangu Asset",
  className = "",
  isPurchased = false,
  priority = false,
  width = 800
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Simulation: Blind the image if the user switches tabs or tries to record/screenshot
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsSecure(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Check if image is already cached
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  // CDN Optimization
  const optimizedUrl = getOptimizedUrl(src, { 
    width, 
    quality: isPurchased ? 90 : 75,
    format: 'webp' 
  });
  
  const blurUrl = getBlurPlaceholder(src);

  return (
    <div className={`relative inline-block overflow-hidden group select-none w-full h-full bg-gray-900`}>
      
      {/* 1. BLUR-UP PLACEHOLDER (LQIP) */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.img
            src={blurUrl}
            alt="Loading..."
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl z-0 ${className}`}
          />
        )}
      </AnimatePresence>

      {/* 2. MAIN OPTIMIZED ASSET */}
      <motion.img 
        ref={imgRef}
        src={optimizedUrl} 
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          filter: isSecure ? 'blur(0px)' : 'blur(40px)',
          scale: (isSecure && isLoaded) ? 1 : 1.1
        }}
        alt={alt} 
        className={`relative z-1 w-full h-full object-cover transition-transform duration-700 ${!isPurchased && 'group-hover:scale-105'} ${className}`}
        onContextMenu={(e) => e.preventDefault()}
        loading={priority ? "eager" : "lazy"}
      />

      {/* Loading Spinner for very slow connections */}
      {!isLoaded && !priority && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
           <Loader2 className="animate-spin text-red-600/30" size={24} />
        </div>
      )}

      {/* 3. Glass Shield Security Overlay */}
      <div className="absolute inset-0 bg-transparent cursor-default z-10" />

      {/* 4. PRO-GRADE WATERMARKING */}
      {isLoaded && !isPurchased && (
        <>
          {/* Dynamic Mesh Watermark */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 opacity-[0.06] pointer-events-none rotate-[-15deg] scale-150 z-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center border border-white/20">
                <span className="font-black text-[10px] text-white uppercase whitespace-nowrap">
                  PICHA ZANGU PRO ARCHIVE
                </span>
              </div>
            ))}
          </div>

          {/* Core Brand Mark */}
          <div className="absolute bottom-4 left-4 flex flex-col items-start pointer-events-none drop-shadow-lg z-30">
            <div className="bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-sm border-l-2 border-red-600">
              <p className="text-white text-[9px] font-medium tracking-wide uppercase">
                Preview Asset • <span className="italic">{photographerName}</span>
              </p>
            </div>
          </div>

          {/* Secure Asset Label */}
          <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10 flex items-center gap-2">
            <Lock size={12} className="text-red-500" />
            <span className="text-[8px] font-black text-white uppercase tracking-widest">DRM ACTIVE</span>
          </div>
        </>
      )}

      {/* PURCHASED OVERLAY */}
      {isLoaded && isPurchased && (
        <div className="absolute top-4 right-4 z-30 bg-green-500 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5">
           <ShieldAlert size={10} /> SECURE ORIGINAL UNLOCKED
        </div>
      )}

      {/* Security Awareness Modal (Triggered on focus loss) */}
      <AnimatePresence>
        {!isSecure && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[40] bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center"
          >
             <ShieldAlert size={48} className="text-red-600 mb-4" />
             <h4 className="text-white font-bungee text-xl leading-none">SHIELD<br/>ENGAGED</h4>
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-4">Screen capture protection triggered.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProtectedImage;