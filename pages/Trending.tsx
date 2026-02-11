import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Search, ShoppingCart, Sparkles, Mic, X, ChevronLeft, ChevronRight, Loader2, Zap, MapPin, Camera
} from 'lucide-react';
import { MOCK_PHOTOS } from '../constants';
import { Photo, UserRole } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import ProtectedImage from '../components/ProtectedImage';
import { GoogleGenAI } from "@google/genai";
import { useCartStore, useToastStore } from '../store/useAppStore';

const Trending: React.FC<{ userRole: UserRole | null }> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const [discoverySource, setDiscoverySource] = useState<Photo | null>(null);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(false);
  const [discoveryInsights, setDiscoveryInsights] = useState<string>("");

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);
  const spotlightPhotos = MOCK_PHOTOS.slice(0, 5); 

  const gridPhotos = useMemo(() => {
    let filtered = [...MOCK_PHOTOS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.photographer.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (activeTab !== 'All') {
      filtered = filtered.filter(p => p.category === activeTab);
    }
    return filtered;
  }, [searchQuery, activeTab]);

  useEffect(() => {
    const timer = setInterval(() => setSpotlightIndex((prev) => (prev + 1) % spotlightPhotos.length), 10000);
    return () => clearInterval(timer);
  }, []);

  const handleBuy = (photo: Photo, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(photo);
    showToast(`${photo.title} added to license cart`, "success");
  };

  const handleExploreSimilar = async (photo: Photo, e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setDiscoverySource(photo);
    setIsDiscoveryLoading(true);
    showToast("Analyzing Visual Node...", "info");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze photo: "${photo.title}". Return a brief AI Insight (max 15 words) about its aesthetic.`
      });
      setDiscoveryInsights(response.text || "Regional aesthetic markers verified.");
    } catch (error) {
      setDiscoveryInsights("Aesthetic signature: Dynamic Urban Heritage.");
    } finally {
      setIsDiscoveryLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* --- MOBILE SEARCH & TITLE --- */}
      <header className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Flame className="text-red-600" size={18} />
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Global Discovery Node</span>
          </div>
          <h1 className="font-embroidery text-5xl md:text-7xl lg:text-8xl leading-none text-white italic">
            TRENDING <span className="text-red-600 font-embroidery-sketch">NOW</span>
          </h1>
        </div>

        <div className="relative group w-full lg:max-w-md">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
           <input 
              type="text"
              placeholder="Ask AI: 'Vibrant city life'..."
              className="pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none w-full text-sm font-bold uppercase tracking-widest focus:border-red-600/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
           <button onClick={() => { setIsListening(true); setTimeout(()=>setIsListening(false), 2000); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
             <Mic size={18} className={isListening ? 'animate-pulse text-red-600' : ''} />
           </button>
        </div>
      </header>

      {/* --- SPOTLIGHT HERO (Fluid Resize) --- */}
      <section className="relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black group">
        <AnimatePresence mode="wait">
          <motion.div key={spotlightIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
            <ProtectedImage src={spotlightPhotos[spotlightIndex].url} photographerName={spotlightPhotos[spotlightIndex].photographer} className="opacity-70" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute bottom-8 left-6 right-6 md:left-12 md:bottom-12 z-20">
               <span className="bg-red-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">HOT ASSET</span>
               <h2 className="font-embroidery text-3xl md:text-7xl lg:text-8xl leading-[0.85] mb-6 italic truncate uppercase">{spotlightPhotos[spotlightIndex].title}</h2>
               <div className="flex gap-3">
                  <button onClick={(e) => handleBuy(spotlightPhotos[spotlightIndex], e)} className="bg-white text-black font-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">License KES {spotlightPhotos[spotlightIndex].price}</button>
                  <button onClick={(e) => handleExploreSimilar(spotlightPhotos[spotlightIndex], e)} className="p-4 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-black transition-all"><Sparkles size={20}/></button>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={() => setSpotlightIndex(p => (p - 1 + spotlightPhotos.length) % spotlightPhotos.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft size={24}/></button>
        <button onClick={() => setSpotlightIndex(p => (p + 1) % spotlightPhotos.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight size={24}/></button>
      </section>

      {/* --- GRID (1 col mobile, 2 col tablet, 4 col desktop) --- */}
      <div className="space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {['All', 'Wildlife', 'Street', 'Fashion', 'Sports'].map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${activeTab === cat ? 'bg-red-600 text-white border-red-600' : 'bg-white/5 border-white/5 text-gray-500'}`}>
              {cat} Sector
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-32 lg:pb-0">
          {gridPhotos.map((photo) => (
            <TrendingCard key={photo.id} photo={photo} onBuy={(e) => handleBuy(photo, e)} onSimilar={() => handleExploreSimilar(photo)} />
          ))}
        </section>
      </div>

      {/* DISCOVERY MODAL (Responsive Overlays) */}
      <AnimatePresence>
        {discoverySource && (
          <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/90 backdrop-blur-3xl">
             <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-white rounded-t-[3rem] md:rounded-[3rem] shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
                <div className="w-full md:w-[45%] bg-black relative aspect-[4/5] md:aspect-auto">
                   <ProtectedImage src={discoverySource.url} photographerName={discoverySource.photographer} />
                   <button onClick={() => setDiscoverySource(null)} className="absolute top-6 left-6 p-3 bg-black/40 text-white rounded-xl md:hidden"><X size={24}/></button>
                </div>
                <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar bg-white text-black">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="font-embroidery text-4xl text-black italic uppercase leading-none">NEURAL <span className="text-red-600">DISCOVERY</span></h3>
                      <button onClick={() => setDiscoverySource(null)} className="hidden md:block p-3 bg-gray-100 rounded-full"><X size={24}/></button>
                   </div>
                   <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                      {isDiscoveryLoading ? <Loader2 size={24} className="animate-spin text-red-600" /> : <p className="text-lg font-medium italic text-gray-700">"{discoveryInsights}"</p>}
                   </div>
                   <button onClick={() => { addItem(discoverySource); setDiscoverySource(null); }} className="mt-auto w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest active:scale-95">
                      <Zap size={18} /> LICENSE PRIMARY ASSET
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrendingCard = ({ photo, onBuy, onSimilar }: any) => (
  <div className="group bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 flex flex-col h-full hover:border-red-600/30 transition-all shadow-xl">
    <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
      <ProtectedImage src={photo.url} photographerName={photo.photographer} />
      <button onClick={onSimilar} className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl text-white opacity-0 group-hover:opacity-100 transition-all"><Sparkles size={16}/></button>
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
        <button onClick={onBuy} className="w-full bg-white text-black font-black py-4 rounded-xl text-[9px] uppercase tracking-widest active:scale-95 transition-all shadow-xl">Instant License • KES {photo.price}</button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold text-white truncate mb-4 uppercase tracking-tighter text-lg">{photo.title}</h3>
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
         <div className="flex items-center gap-2">
            <span className="text-[8px] font-black text-gray-500 uppercase">{photo.photographer}</span>
            <VerificationBadge type="photographer" size={12} />
         </div>
         <span className="font-bungee text-red-600 text-sm">KES {photo.price}</span>
      </div>
    </div>
  </div>
);

export default Trending;