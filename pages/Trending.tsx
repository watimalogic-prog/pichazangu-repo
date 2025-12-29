// DO add comment above each fix.
// Fixed 'Cannot find name Shield' by adding it to the lucide-react import list.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Search, Filter, ShoppingCart, 
  MapPin, Sparkles, Mic, History, 
  Calendar, X, Bell, Radio, BarChart3, Download,
  Maximize2, Share2, Layers, Loader2, ArrowRight,
  Shield
} from 'lucide-react';
import { MOCK_PHOTOS } from '../constants';
import { Photo, UserRole } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import ProtectedImage from '../components/ProtectedImage';
import { GoogleGenAI } from "@google/genai";
import { useCartStore } from '../store/useAppStore';

const TICKER_MOCK = [
  "JUST SOLD: Ali Studio - Serengeti Sunrise for KSH 1,500",
  "NEW CREATOR: Sarah Lens joined the tribe!",
  "TRENDING: 'Nairobi Nightlife' collection is peaking!",
  "JUST SOLD: WildLens Africa - Lioness Hunt for KSH 4,200",
  "GIG ALERT: Wedding in Mombasa needs 2 Photographers",
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
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  
  // Similar Discovery State
  const [discoverySource, setDiscoverySource] = useState<Photo | null>(null);
  const [isDiscoveryLoading, setIsDiscoveryLoading] = useState(false);
  const [similarResults, setSimilarResults] = useState<Photo[]>([]);
  const [discoveryInsights, setDiscoveryInsights] = useState<string>("");

  const addItem = useCartStore((state) => state.addItem);
  const spotlightPhotos = MOCK_PHOTOS.slice(0, 5); 

  const getFilteredPhotos = () => {
    let filtered = [...MOCK_PHOTOS];
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.photographer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    e.stopPropagation();
    addItem(photo);
  };

  const handleExploreSimilar = async (photo: Photo) => {
    setDiscoverySource(photo);
    setIsDiscoveryLoading(true);
    setSimilarResults([]);
    setDiscoveryInsights("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the visual themes of this photo: "${photo.title}" in category "${photo.category}". 
        The photo is captured by "${photo.photographer}". 
        Return a brief "AI Insight" (max 15 words) about its aesthetic and list 3 visual keywords that would find similar content in a regional African archive.`
      });

      const insight = response.text || "Analyzing visual patterns and regional aesthetic markers...";
      setDiscoveryInsights(insight);

      const results = MOCK_PHOTOS.filter(p => 
        p.id !== photo.id && 
        (p.category === photo.category || p.tags.some(t => photo.tags.includes(t)))
      ).slice(0, 4);

      setSimilarResults(results);
    } catch (error) {
      console.error("Discovery error:", error);
      setSimilarResults(MOCK_PHOTOS.filter(p => p.id !== photo.id && p.category === photo.category).slice(0, 3));
    } finally {
      setIsDiscoveryLoading(false);
    }
  };

  return (
    <div className="space-y-0 -mt-6 -mx-4 md:-mx-0">
      <div className="bg-black/90 backdrop-blur-md text-white py-4 overflow-hidden whitespace-nowrap sticky top-20 z-40 border-b-2 border-red-600/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center"
        >
          {[...TICKER_MOCK, ...TICKER_MOCK, ...TICKER_MOCK].map((item, i) => (
            <div key={i} className="flex items-center gap-6 group">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-red-600 group-hover:animate-ring" />
                <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(227,30,36,0.9)]" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] italic text-white text-glow">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="px-4 md:px-0 pt-8 space-y-12 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="text-red-600 fill-current" size={24} />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Global Discovery</span>
            </div>
            <h1 className="font-embroidery text-6xl text-white leading-none">TRENDING <span className="font-embroidery-sketch text-red-600">NOW</span></h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
               <input 
                  type="text"
                  placeholder="Ask AI: 'Vibrant city life'..."
                  className="pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-3xl text-white focus:border-red-600/50 outline-none w-full sm:w-80 transition-all font-medium text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
                 <Mic size={18} />
               </button>
             </div>
             <button className="p-4 bg-red-600 text-white rounded-3xl hover:bg-white hover:text-red-600 transition-all shadow-lg border border-red-600">
               <Filter size={20} />
             </button>
          </div>
        </header>

        <section className="relative h-[500px] md:h-[650px] rounded-[4rem] overflow-hidden shadow-2xl group/spotlight bg-black mx-4 md:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={spotlightIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <ProtectedImage 
                src={spotlightPhotos[spotlightIndex].url} 
                photographerName={spotlightPhotos[spotlightIndex].photographer} 
                className="opacity-60" 
                priority
                width={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              
              <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16 flex flex-col md:flex-row items-end justify-between gap-8 z-30">
                <div className="max-w-2xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">TOP #{(spotlightIndex + 1)} TRENDING</span>
                  </div>
                  <h2 className="font-embroidery text-5xl md:text-8xl leading-none mb-4 italic">{spotlightPhotos[spotlightIndex].title}</h2>
                  <div className="flex items-center gap-4 text-gray-300 text-sm font-bold uppercase tracking-widest mb-8">
                    <span className="flex items-center gap-2"><MapPin size={16} className="text-red-600" /> {spotlightPhotos[spotlightIndex].location}</span>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={(e) => handleBuy(spotlightPhotos[spotlightIndex], e)} className="bg-red-600 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-red-700 transition-all shadow-2xl flex items-center gap-3 scale-110">
                      {userRole === 'media' ? <Radio size={20}/> : <ShoppingCart size={20}/>} 
                      {userRole === 'media' ? 'Instant Wire Sync' : `KSH ${spotlightPhotos[spotlightIndex].price}`}
                    </button>
                    <button 
                      onClick={() => handleExploreSimilar(spotlightPhotos[spotlightIndex])}
                      className="bg-white/10 backdrop-blur-md text-white font-black px-8 py-5 rounded-[2rem] border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <Sparkles size={20} className="text-red-500" /> Explore Similar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-6 bg-white/5 p-6 rounded-[3rem] shadow-sm border border-white/10 mx-4 md:px-0">
           <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full justify-center md:justify-start">
             {['All', 'Sports', 'Weddings', 'Portraits', 'Wildlife', 'Recent'].map(cat => (
               <button key={cat} onClick={() => setActiveTab(cat)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>{cat}</button>
             ))}
           </div>
        </div>

        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-4 md:px-0">
          <AnimatePresence mode="popLayout">
            {gridPhotos.map((photo, i) => (
              <motion.div key={`${photo.id}-${i}`} layout variants={itemVariants} exit={{ opacity: 0, scale: 0.8 }}>
                <TrendingCard 
                  photo={photo} 
                  userRole={userRole}
                  onBuy={(e) => handleBuy(photo, e)} 
                  onExploreSimilar={() => handleExploreSimilar(photo)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {gridPhotos.length === 0 && (
          <div className="py-32 text-center">
            <X size={64} className="mx-auto text-gray-800 mb-4 opacity-20" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">No assets found matching this filter.</p>
          </div>
        )}
      </div>

      {/* DISCOVERY MODAL: Visually Similar Photos */}
      <AnimatePresence>
        {discoverySource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 40 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 40 }}
               className="bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] max-w-6xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-100"
             >
                <div className="w-full md:w-[45%] bg-gray-900 relative group overflow-hidden">
                   <ProtectedImage src={discoverySource.url} photographerName={discoverySource.photographer} className="opacity-80" width={1000} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                   <div className="absolute top-10 left-10 z-10">
                      <div className="bg-red-600 text-white px-5 py-2 rounded-2xl shadow-2xl flex items-center gap-2">
                         <Search size={18} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Discovery Source</span>
                      </div>
                   </div>
                   <div className="absolute bottom-12 left-10 right-10 z-10">
                      <h2 className="font-embroidery text-4xl text-white italic mb-2 leading-tight">{discoverySource.title}</h2>
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full border-2 border-red-600/50 p-0.5 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${discoverySource.photographer}`} className="w-full h-full object-cover rounded-full" alt="" />
                         </div>
                         <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{discoverySource.photographer}</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 p-12 flex flex-col bg-white overflow-y-auto custom-scrollbar max-h-[90vh]">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <div className="flex items-center gap-2 mb-2">
                           <Sparkles size={16} className="text-red-600" />
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">AI Visual Match Engine</span>
                         </div>
                         <h3 className="font-embroidery text-5xl text-black italic">SIMILAR <span className="text-red-600">FINDINGS</span></h3>
                      </div>
                      <button onClick={() => setDiscoverySource(null)} className="p-4 bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition-all"><X size={24}/></button>
                   </div>

                   <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] mb-12 relative overflow-hidden group">
                      <div className="relative z-10">
                         <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block mb-4">Gemini Vision Analysis</span>
                         {isDiscoveryLoading ? (
                           <div className="flex items-center gap-3 text-gray-400">
                             <Loader2 size={20} className="animate-spin" />
                             <p className="text-sm font-bold animate-pulse uppercase tracking-widest">Scanning Pixel Signatures...</p>
                           </div>
                         ) : (
                           <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
                             "{discoveryInsights}"
                           </p>
                         )}
                      </div>
                      <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform">
                         <Layers size={100} />
                      </div>
                   </div>

                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-6">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recommended Visuals</span>
                         <span className="text-[10px] font-black text-red-600 uppercase">{similarResults.length} Assets Found</span>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {similarResults.map((result) => (
                            <motion.div 
                              whileHover={{ y: -5 }}
                              key={result.id} 
                              className="group bg-gray-50 rounded-[2.5rem] p-4 border border-gray-100 hover:border-red-600/30 transition-all cursor-pointer flex flex-col"
                              onClick={() => addItem(result)}
                            >
                               <div className="aspect-square rounded-[1.8rem] overflow-hidden mb-4 relative shadow-inner">
                                  <img src={result.url} className="w-full h-full object-cover" alt="" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <button className="p-3 bg-red-600 text-white rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <ShoppingCart size={18} />
                                     </button>
                                  </div>
                               </div>
                               <div>
                                  <h4 className="text-sm font-bold text-gray-900 truncate mb-1">{result.title}</h4>
                                  <div className="flex justify-between items-center">
                                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">By {result.photographer}</span>
                                     <span className="font-bungee text-red-600 text-xs">KES {result.price}</span>
                                  </div>
                               </div>
                            </motion.div>
                         ))}
                      </div>
                   </div>

                   <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Shield size={16} className="text-green-500" />
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authenticity Secure</span>
                      </div>
                      <button className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest hover:text-black transition-colors">
                         View Regional Sector <ArrowRight size={14}/>
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

const TrendingCard: React.FC<{photo: Photo, userRole: UserRole | null, onBuy: (e: any) => void, onExploreSimilar: () => void}> = ({ photo, userRole, onBuy, onExploreSimilar }) => {
  const isHot = Math.random() > 0.7;
  const isOwnedByMe = userRole === 'photographer' && photo.photographer === 'Ali Studio';

  return (
    <motion.div whileHover={{ y: -10 }} className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/5 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col relative">
      <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
        <ProtectedImage src={photo.url} photographerName={photo.photographer} alt={photo.title} width={600} />
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
          {isHot && (
            <div className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-full shadow-lg animate-bounce">
              <Flame size={12} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">RISING</span>
            </div>
          )}
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onExploreSimilar(); }}
          className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-md text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/10 hover:bg-red-600"
          title="Explore Visually Similar"
        >
          <Sparkles size={18} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/60 backdrop-blur-md z-30">
          <div className="flex gap-2">
            <button 
              onClick={onBuy}
              className="flex-1 bg-white text-black font-black py-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
            >
              {userRole === 'media' ? <Radio size={14}/> : <ShoppingCart size={14}/>}
              {isOwnedByMe ? 'Manage Asset' : (userRole === 'media' ? 'Editorial Buy' : 'Instant License')}
            </button>
          </div>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
           <div>
              <h3 className="font-embroidery text-2xl text-white group-hover:text-red-600 transition-colors truncate max-w-[150px]">{photo.title}</h3>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{photo.photographer} <VerificationBadge type="photographer" size={10} /></p>
           </div>
           <div className="text-right">
             <span className="font-bungee text-xl text-red-600 block leading-none">KES {photo.price}</span>
             {userRole === 'media' && <span className="text-[8px] font-black text-gray-600 uppercase">Editorial Rate</span>}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Trending;