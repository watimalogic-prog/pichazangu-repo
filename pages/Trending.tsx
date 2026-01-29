import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Search, Filter, ShoppingCart, 
  MapPin, Sparkles, Mic, History, 
  Calendar, X, Bell, Radio, BarChart3, Download,
  Maximize2, Share2, Layers, Loader2, ArrowRight,
  Shield, ChevronLeft, ChevronRight, Volume2, 
  Cpu, Zap, Globe, Activity, TrendingUp, Heart
} from 'lucide-react';
import { MOCK_PHOTOS } from '../constants';
import { Photo, UserRole } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import ProtectedImage from '../components/ProtectedImage';
import { GoogleGenAI } from "@google/genai";
import { useCartStore, useToastStore } from '../store/useAppStore';

const TICKER_MOCK = [
  "JUST SOLD: Ali Studio - Serengeti Sunrise for KSH 1,500",
  "WHALE ALERT: 45 Assets Licensed by Nation Media Group",
  "IPPO DROP: Sarah Lens released 'State House Exclusives'",
  "TRENDING: 'Nairobi Nightlife' volume up 140%",
  "CREATOR SYNC: 12 New Pros joined the Ugandan Sector",
];

const PULSE_EVENTS = [
  { id: 1, type: 'SALE', text: 'New License: Mombasa Fashion Week', time: '2s ago' },
  { id: 2, type: 'UPLOAD', text: 'Sarah Lens pushed 12 raw assets', time: '1m ago' },
  { id: 3, type: 'BID', text: 'NTV Bid 15k on "CBD Protest"', time: '3m ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

interface TrendingProps {
  userRole: UserRole | null;
}

const Trending: React.FC<TrendingProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'price' | 'newest'>('trending');
  const [showPulse, setShowPulse] = useState(true);
  
  const [discoverySource, setDiscoverySource] = useState<Photo | null>(null);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(false);
  const [similarResults, setSimilarResults] = useState<Photo[]>([]);
  const [discoveryInsights, setDiscoveryInsights] = useState<string>("");

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);
  const spotlightPhotos = MOCK_PHOTOS.slice(0, 5); 

  const getFilteredPhotos = () => {
    let filtered = [...MOCK_PHOTOS];
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab !== 'All') {
      if (activeTab === 'Recent') {
        filtered.sort((a, b) => (b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0) - (a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0));
      } else if (activeTab === 'Wildlife') filtered = filtered.filter(p => p.category === 'Wildlife');
      else if (activeTab === 'Sports') filtered = filtered.filter(p => p.category === 'Sports');
      else if (activeTab === 'Weddings') filtered = filtered.filter(p => p.category === 'Wedding' || p.category === 'Weddings');
      else if (activeTab === 'Portraits') filtered = filtered.filter(p => p.category === 'Portrait' || p.category === 'Fashion');
    }

    if (sortBy === 'price') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') filtered.sort((a, b) => (b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0) - (a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0));

    return filtered;
  };

  const gridPhotos = getFilteredPhotos();

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % spotlightPhotos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [spotlightPhotos.length]);

  const handleBuy = (photo: Photo, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(photo);
    showToast(`${photo.title} added to license cart`, "success");
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast("Initializing Neural Voice Node...", "info");
    setTimeout(() => {
      setIsListening(false);
      showToast("Listening Complete. Syncing search query.", "success");
      setSearchQuery("Sunset landscapes");
    }, 3000);
  };

  const handleExploreSimilar = async (photo: Photo, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDiscoverySource(photo);
    setIsDiscoveryLoading(true);
    setSimilarResults([]);
    setDiscoveryInsights("");
    showToast("Initializing Visual Neural Scan...", "info");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the visual themes of this photo: "${photo.title}" in category "${photo.category}". 
        Return a brief "AI Insight" (max 25 words) about its aesthetic and regional relevance.`
      });

      const insight = response.text || "Analyzing visual patterns and regional aesthetic markers...";
      setDiscoveryInsights(insight);

      const results = MOCK_PHOTOS.filter(p => 
        p.id !== photo.id && 
        (p.category === photo.category || p.tags.some(t => photo.tags.includes(t)))
      ).slice(0, 4);

      setSimilarResults(results);
    } catch (error) {
      setSimilarResults(MOCK_PHOTOS.filter(p => p.id !== photo.id && p.category === photo.category).slice(0, 4));
    } finally {
      setIsDiscoveryLoading(false);
    }
  };

  return (
    <div className="space-y-0 -mt-6 relative">
      <div className="bg-black/90 backdrop-blur-md text-white py-3 overflow-hidden whitespace-nowrap sticky top-16 md:top-0 z-40 border-b border-red-600/30">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center"
        >
          {TICKER_MOCK.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.includes('WHALE') ? 'bg-yellow-500' : 'bg-red-600'}`} />
              <span className="text-[9px] font-black uppercase tracking-widest italic">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="pt-8 space-y-10 md:space-y-12">
        <header className="px-4 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="text-red-600 fill-current" size={20} />
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Global Discovery v4.2</span>
            </div>
            <h1 className="font-embroidery text-5xl md:text-8xl text-white leading-none">TRENDING <span className="font-embroidery-sketch text-red-600">NOW</span></h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 relative">
             <div className="relative group w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" size={18} />
               <input 
                  type="text"
                  placeholder="Ask AI: 'Vibrant city life'..."
                  className="pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none w-full sm:w-80 transition-all text-sm font-bold uppercase tracking-widest focus:border-red-600/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <button 
                onClick={handleVoiceSearch}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-600' : 'text-gray-500 hover:text-white'}`}
               >
                 <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
               </button>
             </div>
          </div>
        </header>

        <section className="relative h-[400px] md:h-[650px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-black mx-4 md:mx-0 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={spotlightIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <ProtectedImage 
                src={spotlightPhotos[spotlightIndex].url} 
                photographerName={spotlightPhotos[spotlightIndex].photographer} 
                className="opacity-70" 
                priority
                width={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              
              <div className="absolute bottom-10 left-6 right-6 md:left-16 md:bottom-16 z-30">
                <div className="max-w-3xl text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-red-600 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-xl">ELITE ASSET #{spotlightIndex + 1}</span>
                  </div>
                  <h2 className="font-embroidery text-4xl md:text-[10rem] leading-[0.8] mb-8 italic truncate uppercase drop-shadow-2xl">
                    {spotlightPhotos[spotlightIndex].title}
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button 
                      onClick={(e) => handleBuy(spotlightPhotos[spotlightIndex], e)} 
                      className="flex-1 md:flex-none bg-white text-black hover:bg-red-600 hover:text-white font-black px-12 md:px-16 py-5 md:py-6 rounded-[2rem] text-xs uppercase tracking-[0.2em] shadow-2xl transition-all cursor-pointer relative z-[40]"
                    >
                      License KES {spotlightPhotos[spotlightIndex].price}
                    </button>
                    <button 
                      onClick={(e) => handleExploreSimilar(spotlightPhotos[spotlightIndex], e)} 
                      className="p-5 md:p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 text-white hover:bg-white hover:text-black transition-all group cursor-pointer relative z-[40]"
                    >
                      <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => setSpotlightIndex(prev => (prev - 1 + spotlightPhotos.length) % spotlightPhotos.length)}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setSpotlightIndex(prev => (prev + 1) % spotlightPhotos.length)}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0">
          {['All', 'Sports', 'Weddings', 'Portraits', 'Wildlife', 'Recent'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveTab(cat)} 
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 cursor-pointer ${activeTab === cat ? 'bg-red-600 text-white border-red-600 shadow-xl' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:border-white/20'}`}
            >
              {cat} Sector
            </button>
          ))}
        </div>

        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 px-4 md:px-0 pb-20">
          {gridPhotos.map((photo, i) => (
            <motion.div key={`${photo.id}-${i}`} variants={itemVariants}>
              <TrendingCard 
                photo={photo} 
                userRole={userRole} 
                onBuy={(e) => handleBuy(photo, e)} 
                onExploreSimilar={() => handleExploreSimilar(photo)} 
              />
            </motion.div>
          ))}
        </motion.section>
      </div>

      <AnimatePresence>
        {discoverySource && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl overflow-y-auto">
             <motion.div 
               initial={{ y: 50, opacity: 0, scale: 0.95 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               exit={{ y: 50, opacity: 0, scale: 0.95 }}
               className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl max-w-6xl w-full flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
             >
                <div className="w-full md:w-[45%] bg-black relative">
                   <ProtectedImage src={discoverySource.url} photographerName={discoverySource.photographer} className="opacity-80" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   <button onClick={() => setDiscoverySource(null)} className="absolute top-8 left-8 p-4 bg-black/60 rounded-2xl text-white md:hidden z-30 cursor-pointer"><X size={24}/></button>
                </div>

                <div className="flex-1 p-10 md:p-16 flex flex-col overflow-y-auto custom-scrollbar bg-white text-black">
                   <div className="flex justify-between items-center mb-12">
                      <div>
                        <h3 className="font-embroidery text-5xl text-black italic">SIMILAR <span className="text-red-600">FINDS</span></h3>
                      </div>
                      <button onClick={() => setDiscoverySource(null)} className="hidden md:block p-4 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition-all cursor-pointer"><X size={24}/></button>
                   </div>

                   <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] mb-12 relative overflow-hidden group">
                      <div className="relative z-10">
                         {isDiscoveryLoading ? (
                           <div className="flex items-center gap-4 py-2">
                             <Loader2 size={16} className="animate-spin text-red-600" />
                             <span className="text-xs font-bold text-gray-400 uppercase animate-pulse">Mapping Coordinates...</span>
                           </div>
                         ) : (
                           <p className="text-lg font-medium text-gray-700 leading-relaxed italic">"{discoveryInsights}"</p>
                         )}
                      </div>
                   </div>

                   <div className="mt-12 pt-10 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={(e) => { e.preventDefault(); addItem(discoverySource); setDiscoverySource(null); showToast("Asset Licensed", "success"); }}
                        className="flex-1 bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest cursor-pointer"
                      >
                         <Zap size={18} /> License Primary Asset
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TrendingCard: React.FC<{photo: Photo, userRole: UserRole | null, onBuy: (e: any) => void, onExploreSimilar: () => void}> = ({ photo, userRole, onBuy, onExploreSimilar }) => (
  <div className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/5 transition-all flex flex-col h-full hover:border-red-600/30 hover:shadow-2xl">
    <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
      <ProtectedImage src={photo.url} photographerName={photo.photographer} width={600} />
      <div className="absolute top-5 right-5 flex flex-col gap-2 z-20">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onExploreSimilar(); }} 
          className="p-3 bg-black/60 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10 hover:bg-red-600 cursor-pointer"
        >
          <Sparkles size={18} />
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/80 to-transparent z-30">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBuy(e); }} 
          className="w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-xl cursor-pointer"
        >
          Instant License • KES {photo.price}
        </button>
      </div>
    </div>
    <div className="p-8">
      <h3 className="font-embroidery text-2xl text-white truncate mb-2 italic group-hover:text-red-600 transition-colors uppercase leading-none">{photo.title}</h3>
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
         <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{photo.photographer}</span>
            <VerificationBadge type="photographer" size={12} />
         </div>
         <div className="flex items-center gap-1 text-red-600">
            <Zap size={10} fill="currentColor" />
            <span className="font-bungee text-sm">KES {photo.price}</span>
         </div>
      </div>
    </div>
  </div>
);

export default Trending;