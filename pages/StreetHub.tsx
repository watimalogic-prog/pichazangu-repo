
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DO add comment above each fix.
// Fixed missing imports and activated Predictive Heatmap nodes.
import { 
  Camera, MapPin, Zap, Flame, Volume2, Info, ShoppingCart, 
  Search, Filter, Heart, Share2, Crown, Map, Target, 
  Smartphone, UserPlus, Globe, Radio, PlayCircle, 
  X, DollarSign, Award, Image as ImageIcon, Crosshair,
  TrendingUp, Activity, CheckCircle, Loader2, ShieldCheck,
  BrainCircuit, Radar
} from 'lucide-react';
import { MOCK_PHOTOS, CURRENCY_SYMBOLS, COLORS } from '../constants';
import { Photo } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import { useCartStore, useThemeStore, useToastStore } from '../store/useAppStore';
import { GoogleGenAI } from "@google/genai";

const StreetHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wire' | 'challenges' | 'heatmap'>('wire');
  const [isUnfiltered, setIsUnfiltered] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  
  // Forecast State
  const [forecast, setForecast] = useState<string>("");
  const [isPredicting, setIsPredicting] = useState(false);

  const { theme } = useThemeStore();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const filteredStreetPhotos = useMemo(() => {
    const list = MOCK_PHOTOS.filter(p => p.category === 'Street' || p.tags.includes('urban'));
    if (!searchQuery) return list;
    return list.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.photographer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  
  const generateForecast = async () => {
    setIsPredicting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze the current East African urban media trends. Predict which neighborhood in Nairobi or Kampala will have the highest 'Street Photography Value' tomorrow (e.g., due to weather, events, or lighting). Return a brief 2-sentence dispatch for the heatmap node."
      });
      setForecast(response.text || "Scanning regional weather buffers...");
    } catch (e) {
      setForecast("NEURAL LINK ERROR: Satellite prediction offline.");
    } finally {
      setIsPredicting(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'heatmap') generateForecast();
  }, [activeTab]);

  return (
    <div className={`min-h-screen pb-20 space-y-16 -mt-6 -mx-4 md:-mx-0 transition-all duration-1000 ${isUnfiltered ? 'grayscale brightness-110 contrast-125 bg-black' : theme === 'dark' ? 'bg-[#050505]' : 'bg-gray-50'}`}>
      
      {/* HERO SECTION (omitted for brevity, keep existing) */}
      <section className="relative h-[550px] md:h-[700px] overflow-hidden bg-black flex items-center justify-center">
         <div className="absolute inset-0 opacity-40">
            <img 
               src="https://images.unsplash.com/photo-1544621150-45308605330a?auto=format&fit=crop&w=1600&q=80" 
               className="w-full h-full object-cover animate-kenburns-zoom-in" 
               alt="City Street" 
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
         
         <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h1 className="font-embroidery text-6xl md:text-9xl text-white italic leading-none mb-6">URBAN <span className="text-red-600 font-embroidery-sketch">DEEP</span></h1>
            <p className="text-xs font-black uppercase text-white/60 tracking-[0.5em] mb-12">The Decisive Moment Node</p>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
         <div className={`${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100 shadow-xl'} p-6 rounded-[3rem] border transition-all flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 sticky top-20 z-40 backdrop-blur-xl bg-opacity-80`}>
            <div className={`flex p-2 rounded-[2rem] border ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-gray-50 border-gray-200'}`}>
               <TabBtn label="Street Wire" active={activeTab==='wire'} onClick={()=>setActiveTab('wire')} theme={theme} />
               <TabBtn label="Neural Heatmap" active={activeTab==='heatmap'} onClick={()=>setActiveTab('heatmap')} theme={theme} />
            </div>
         </div>

         <AnimatePresence mode="wait">
           {activeTab === 'heatmap' && (
              <motion.div 
                key="heatmap"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-12"
              >
                 <div className={`${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-gray-100 shadow-xl'} relative h-[600px] rounded-[4rem] border overflow-hidden flex flex-col items-center justify-center transition-all p-12`}>
                    <Radar size={300} className="text-red-600/10 animate-spin-slow absolute" />
                    
                    <div className="relative z-10 text-center max-w-2xl space-y-10">
                       <div className="flex flex-col items-center">
                          <MapPin size={64} className="text-red-600 mb-6 animate-bounce" />
                          <h3 className={`font-embroidery text-6xl italic mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PREDICTIVE HOTSPOTS</h3>
                       </div>

                       <div className="bg-black/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-red-600/20 shadow-2xl relative group overflow-hidden">
                          <div className="flex items-center gap-3 mb-4 text-red-600">
                             <BrainCircuit size={20} className="animate-pulse" />
                             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Gemini Intelligence Dispatch</span>
                          </div>
                          {isPredicting ? (
                            <div className="flex flex-col items-center gap-4 py-6">
                               <Loader2 className="animate-spin text-red-600" />
                               <span className="text-[10px] font-bold text-gray-500 uppercase animate-pulse">Syncing 24H Meteorological Buffers...</span>
                            </div>
                          ) : (
                            <p className="text-xl font-medium leading-relaxed italic text-white">
                               "{forecast}"
                            </p>
                          )}
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                             <TrendingUp size={120} />
                          </div>
                       </div>

                       <div className="flex flex-wrap justify-center gap-10">
                          <Hotspot label="Luthuli Ave" count={14} peak="08:45" theme={theme} />
                          <Hotspot label="Biashara St" count={22} peak="16:30" theme={theme} />
                          <Hotspot label="Kampala Rd" count={8} peak="12:00" theme={theme} />
                       </div>
                    </div>
                 </div>
              </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
};

const TabBtn = ({ label, active, onClick, theme }: any) => (
  <button onClick={onClick} className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] ${active ? 'bg-white text-red-600 shadow-xl' : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
    {label}
  </button>
);

const Hotspot = ({ label, count, peak, theme }: any) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="w-20 h-20 rounded-full bg-red-600/5 border-2 border-red-600/40 flex flex-col items-center justify-center mb-4 animate-pulse group-hover:scale-110 transition-transform">
      <span className="text-[10px] font-black text-red-600">{peak}</span>
      <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E31E24] mt-1" />
    </div>
    <span className={`font-bold text-xs uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{label}</span>
    <span className="text-gray-500 text-[8px] font-black uppercase mt-1">{count} PROS EXPECTED</span>
  </div>
);

export default StreetHub;
