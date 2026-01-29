import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, Zap, Download, X, Maximize2, Loader2, RotateCcw, Aperture, Settings } from 'lucide-react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', className?: string }> = ({ size = 'md', className = '' }) => {
  const [isLive, setIsLive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scale = size === 'sm' ? 'scale-50' : size === 'lg' ? 'scale-125' : 'scale-100';

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 3840 },
          height: { ideal: 2160 }
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLive(true);
    } catch (err) {
      console.error("Camera access denied", err);
      setError("SENSOR LINK OFFLINE");
      setTimeout(() => setError(null), 3000);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsLive(false);
    setCapturedImage(null);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsCapturing(true);
    setFlash(true);
    
    setTimeout(() => {
      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/jpeg', 1.0);
        setCapturedImage(data);
        
        const link = document.createElement('a');
        link.download = `PZ_ARCHIVE_NODE_${Date.now()}.jpg`;
        link.href = data;
        link.click();
      }
      
      setFlash(false);
      setIsCapturing(false);
    }, 120);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className={`relative flex flex-col items-center gap-6 ${scale} transform-gpu ${className}`}>
      <canvas ref={canvasRef} className="hidden" />

      {/* CAMERA BODY MOCKUP */}
      <div 
        className={`relative bg-[#1a1a1a] rounded-[3.5rem] p-10 border-[10px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-700 ${isLive ? 'border-white' : 'border-[#E31E24]'} flex items-center gap-12 overflow-hidden group`}
        style={{ backgroundImage: 'radial-gradient(circle at center, #222 0%, #111 100%)' }}
      >
        {/* Shutter Flash */}
        <AnimatePresence>
          {flash && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[110]"
            />
          )}
        </AnimatePresence>

        {/* TOP HARDWARE CONTROLS */}
        <div className="absolute top-0 left-0 right-0 h-10 px-12 flex justify-between items-end">
           <div className="flex gap-4">
              <div className="w-12 h-4 bg-[#222] rounded-t-lg border-x border-t border-white/10" />
              <div className="w-8 h-3 bg-[#222] rounded-t-md border-x border-t border-white/10" />
           </div>
           {/* Shutter Button Hardware */}
           <div 
            onClick={(e) => { if(isLive) { e.stopPropagation(); takePhoto(); } else { startCamera(); } }}
            className={`w-14 h-6 rounded-t-xl border-x border-t transition-all cursor-pointer ${isLive ? 'bg-red-500 border-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-[#333] border-white/20 hover:bg-[#444]'}`} 
           />
        </div>

        {/* LENS MOUNT / VIEWFINDER */}
        <div className="relative shrink-0">
          <div className="w-48 h-48 rounded-full bg-[#111] border-[12px] border-[#222] flex items-center justify-center shadow-[inset_0_10px_30px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group/lens">
            {/* Inner Lens Ring */}
            <div className="absolute inset-4 rounded-full border-4 border-[#333] flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border border-white/5" />
            </div>

            {isLive ? (
              <div className="absolute inset-0 z-10">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className={`w-full h-full object-cover transition-all duration-500 ${capturedImage ? 'opacity-0' : 'opacity-100'}`}
                />
                {capturedImage && (
                  <img src={capturedImage} className="absolute inset-0 w-full h-full object-cover" alt="Capture" />
                )}
                {/* HUD Overlays */}
                <div className="absolute inset-0 pointer-events-none z-20">
                   <div className="absolute inset-8 border border-white/20 rounded-full" />
                   <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/20" />
                   <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/20" />
                   <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/50">4K_RAW</div>
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#222] via-[#111] to-[#000] flex items-center justify-center relative overflow-hidden group-hover/lens:scale-105 transition-transform duration-700">
                <Aperture size={40} className="text-[#333] animate-spin-slow" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>
            )}
            
            {/* Lens Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
            
            <button 
              onClick={(e) => { e.stopPropagation(); isLive ? stopCamera() : startCamera(); }}
              className="absolute inset-0 z-30 opacity-0 group-hover/lens:opacity-100 transition-opacity bg-black/40 flex items-center justify-center backdrop-blur-sm"
            >
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{isLive ? 'TERMINATE' : 'INITIALIZE'}</span>
            </button>
          </div>

          {/* AF Assist Light */}
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-black ${isLive ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-[#222]'}`} />
        </div>

        {/* RIGHT CONTROL PANEL */}
        <div className="flex flex-col items-start leading-none relative z-10 py-4 select-none">
          <h2 className="font-bungee text-5xl text-white tracking-tighter drop-shadow-2xl">PICHA</h2>
          <h2 className={`font-bungee text-6xl ${isLive ? 'text-white' : 'text-[#E31E24]'} -mt-2 tracking-tighter drop-shadow-2xl transition-colors duration-500`}>ZANGU</h2>
          
          <div className="mt-8 flex gap-6 items-center">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"/></div>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">PRO_MODE_V4</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-600/20 flex items-center justify-center"><div className="w-1 h-1 bg-red-600 rounded-full"/></div>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">LIVE_DATA_LINK</span>
                </div>
             </div>
             
             <div className="w-px h-10 bg-white/5" />

             <div className="flex flex-col items-center">
                <button 
                  onClick={() => startCamera()}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${isLive ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/30'}`}
                >
                   <Maximize2 size={20} />
                </button>
                <span className="text-[8px] font-black text-gray-600 uppercase mt-2">Viewfinder</span>
             </div>
          </div>

          <div className={`mt-10 px-8 py-3 rounded-xl border flex items-center gap-4 transition-all duration-500 ${isLive ? 'bg-white text-black border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]' : 'bg-[#E31E24] text-white border-red-500 shadow-[0_10px_30px_rgba(227,30,36,0.3)]'}`}>
             {isLive ? (
               <>
                 <Loader2 size={14} className="animate-spin" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">400MP SENSOR SYNCED</span>
               </>
             ) : (
               <div className="flex gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest">CAPTURE.</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">SHARE.</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">EARN.</span>
               </div>
             )}
          </div>
        </div>

        {/* LCD DATA SCREEN (Bottom Right) */}
        <div className="absolute bottom-4 right-10 flex gap-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">
           <span>ISO 200</span>
           <span>F/2.8</span>
           <span>1/500</span>
           <span className={isLive ? 'text-red-500' : ''}>[ REC ]</span>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECENT CAPTURE PREVIEW */}
      <AnimatePresence>
        {capturedImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -right-48 top-10 w-40 p-4 bg-white rounded-3xl shadow-2xl border-[6px] border-red-600 rotate-6"
          >
             <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-black mb-4">
                <img src={capturedImage} className="w-full h-full object-cover" alt="Last shot" />
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Regional Archive</span>
                <span className="text-[10px] font-black text-black uppercase">ASSET SECURED</span>
                <button onClick={() => setCapturedImage(null)} className="mt-2 text-red-600"><RotateCcw size={16}/></button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;