
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, Zap, Download, X, Maximize2, Loader2 } from 'lucide-react';

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
  const taglineWords = ["CAPTURE.", "SHARE.", "EARN."];

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 4096 }, // Requesting maximum resolution
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
      setError("Permission Denied");
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
    
    // Simulate mechanical shutter delay
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
        
        // Auto-download to simulate "saving to vault"
        const link = document.createElement('a');
        link.download = `Pichazangu_400MP_Shot_${Date.now()}.jpg`;
        link.href = data;
        link.click();
      }
      
      setFlash(false);
      setIsCapturing(false);
    }, 150);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className={`relative flex items-center gap-4 ${scale} transform-gpu ${className}`}>
      {/* Hidden high-res capture canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Logo Body */}
      <div 
        onClick={() => !isLive && startCamera()}
        className={`relative border-[8px] ${isLive ? 'border-white' : 'border-[#E31E24]'} rounded-[3rem] p-8 flex items-center gap-8 bg-black/85 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(227,30,36,0.4)] group cursor-pointer transition-all duration-700 overflow-hidden border-glow`}
      >
        {/* Shutter Flash Effect */}
        <AnimatePresence>
          {flash && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[100]"
            />
          )}
        </AnimatePresence>

        {/* Camera Hardware Section */}
        <div className="relative w-36 h-28 bg-[#111] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] border-t border-white/20 transition-transform group-hover:rotate-1">
          {/* Viewfinder block */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-18 h-5 bg-[#222] rounded-t-xl border-t border-white/10"></div>
          
          {/* LENS / VIEWFINDER */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              onClick={(e) => { if(isLive) { e.stopPropagation(); takePhoto(); } }}
              className={`w-22 h-22 rounded-full bg-black border-[6px] ${isLive ? 'border-red-600 animate-pulse' : 'border-[#222]'} flex items-center justify-center shadow-inner relative overflow-hidden transition-all duration-500`}
            >
              {isLive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className={`w-full h-full object-cover rounded-full ${capturedImage ? 'hidden' : 'block'}`}
                  />
                  {capturedImage && (
                    <img src={capturedImage} className="w-full h-full object-cover rounded-full" alt="Snap" />
                  )}
                  {/* Digital Crosshair */}
                  <div className="absolute inset-0 border border-white/20 rounded-full pointer-events-none" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600/30" />
                  <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-600/30" />
                </>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#111] border-2 border-[#333] flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-white via-red-100 to-gray-600 opacity-90"></div>
                </div>
              )}
            </div>
          </div>

          {/* Shutter Button (Top Left Red Accent) */}
          <div 
            onClick={(e) => { if(isLive) { e.stopPropagation(); takePhoto(); } }}
            className={`absolute top-3 left-3 w-5 h-5 ${isLive ? 'bg-red-500 animate-bounce scale-125' : 'bg-[#E31E24]'} rounded-full shadow-[0_0_10px_rgba(227,30,36,0.8)] z-20 cursor-pointer hover:brightness-125`}
          >
            {isLive && <div className="absolute inset-0 rounded-full border border-white/50 animate-ping" />}
          </div>

          <div className="absolute bottom-3 right-3 w-3 h-3 bg-[#E31E24] rounded-full"></div>
        </div>

        {/* Text Section - Enhanced with text shadows for prominence */}
        <div className="flex flex-col items-start leading-none relative z-10 select-none">
          <div className="font-bungee text-6xl text-white uppercase tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
            {isLive ? 'VIEW' : 'PICHA'}
          </div>
          <div className={`font-bungee text-7xl ${isLive ? 'text-white' : 'text-[#E31E24]'} uppercase -mt-2 tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]`}>
            {isLive ? 'FINDER' : 'ZANGU'}
          </div>
          
          <div className={`mt-4 ${isLive ? 'bg-white text-black' : 'bg-[#E31E24] text-white'} px-6 py-1.5 rounded shadow-2xl transform -skew-x-12 border border-red-500 flex gap-2 transition-colors duration-500 shadow-[0_10px_20px_rgba(0,0,0,0.5)]`}>
            {isLive ? (
              <span className="text-[10px] font-black tracking-widest uppercase italic flex items-center gap-2">
                <Loader2 size={10} className="animate-spin" /> 400MP ULTRA-SENSOR ACTIVE
              </span>
            ) : (
              taglineWords.map((word) => (
                <span key={word} className="text-[12px] font-black tracking-[0.2em] italic uppercase drop-shadow-sm">
                  {word}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Close Button when Live */}
        {isLive && (
          <button 
            onClick={(e) => { e.stopPropagation(); stopCamera(); }}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-600 rounded-full text-white transition-all z-20 shadow-xl"
          >
            <X size={20} />
          </button>
        )}

        {/* Status Error Message */}
        {error && (
          <div className="absolute inset-0 bg-red-600 flex items-center justify-center text-white font-black text-xs uppercase tracking-widest z-[110]">
            {error}
          </div>
        )}
      </div>

      {/* Captured Preview Toast */}
      <AnimatePresence>
        {capturedImage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full mt-4 left-0 right-0 p-4 bg-white rounded-2xl shadow-2xl text-black flex items-center gap-4 z-50 border-4 border-red-600"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-100 shrink-0">
               <img src={capturedImage} className="w-full h-full object-cover" alt="Preview" />
            </div>
            <div className="flex-1">
               <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Picha Zangu Intelligence</span>
               <span className="text-[10px] font-black uppercase">Asset Saved to Gallery</span>
            </div>
            <button onClick={() => setCapturedImage(null)} className="p-2 bg-gray-100 rounded-lg"><X size={14}/></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;
