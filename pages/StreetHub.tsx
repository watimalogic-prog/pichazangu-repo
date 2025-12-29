import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, MapPin, Zap, Flame, Volume2, Info, ShoppingCart, 
  Search, Filter, Heart, Share2, Crown, Map, Target, 
  Smartphone, UserPlus, Globe, Radio, PlayCircle, 
  X, DollarSign, Award, Image as ImageIcon, Crosshair
} from 'lucide-react';
import { MOCK_PHOTOS, CURRENCY_SYMBOLS, COLORS } from '../constants';
import { Photo } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import { useCartStore } from '../store/useAppStore';

const glitchAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.2,
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    x: [0, -2, 2, -2, 0],
    y: [0, 1, -1, 1, 0],
    transition: {
      duration: 0.1,
      repeat: Infinity
    }
  }
};

const StreetHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wire' | 'challenges' | 'heatmap'>('wire');
  const [isUnfiltered, setIsUnfiltered] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);

  const streetPhotos = MOCK_PHOTOS.filter(p => p.category === 'Street');
  
  const streetKing = {
    name: "Urban King",
    handle: "@u_king_nbi",
    sales: 142,
    likes: "4.8K",
    location: "Nairobi CBD",
    avatar: "https://i.pravatar.cc/300?u=uking"
  };

  return (
    <div className={`min-h-screen pb-20 space-y-16 -mt-6 -mx-4 md:-mx-0 transition-colors duration-1000 ${isUnfiltered ? 'grayscale' : 'bg-[#050505]'}`}>
      
      {/* 1. THE KING'S THRONE (HERO) */}
      <section className="relative h-[550px] md:h-[700px] overflow-hidden bg-black flex items-center justify-center">
         <div className="absolute inset-0 opacity-40">
            <img 
               src="https://images.unsplash.com/photo-1544621150-45308605330a?auto=format&fit=crop&w=1600&q=80" 
               className="w-full h-full object-cover ken-burns" 
               alt="City Street" 
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
         
         <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="mb-8 relative"
            >
               <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-red-600 p-1.5 shadow-[0_0_50px_rgba(227,30,36,0.3)] bg-black">
                  <img src={streetKing.avatar} className="w-full h-full object-cover rounded-full" alt="Street King" />
               </div>
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black border-2 border-red-600 p-3 rounded-2xl shadow-xl animate-bounce">
                  <Crown className="text-red-600" size={32} />
               </div>
            </motion.div>

            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em] mb-4">King of the Streets</span>
            <h1 className="font-embroidery text-6xl md:text-9xl text-white italic leading-none mb-6 glitch-text">
               {streetKing.name.toUpperCase()}
            </h1>
            
            <div className="flex flex-wrap justify-center gap-8 text-white mb-12">
               <div className="flex items-center gap-2">
                  <Target className="text-red-600" size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{streetKing.location}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Flame className="text-red-600" size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{streetKing.sales} SALES THIS WEEK</span>
               </div>
            </div>

            <div className="flex gap-4">
               <button className="bg-red-600 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-white hover:text-red-600 transition-all text-xs uppercase tracking-widest border-2 border-red-600">VIEW THRONE PORTFOLIO</button>
               <button 
                  onClick={() => setIsUnfiltered(!isUnfiltered)}
                  className={`px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest border-2 transition-all ${isUnfiltered ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
               >
                  {isUnfiltered ? 'COLOR MODE' : 'UNFILTERED MODE (B&W)'}
               </button>
            </div>
         </div>

         <div className="absolute bottom-10 right-10 flex items-center gap-4">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Ambient City Loop</span>
            <button 
               onClick={() => setActiveSoundscape(activeSoundscape ? null : 'nbi')}
               className={`p-4 rounded-2xl backdrop-blur-md border transition-all ${activeSoundscape ? 'bg-red-600 border-red-600 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}
            >
               <Volume2 size={24} className={activeSoundscape ? 'animate-pulse' : ''} />
            </button>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 bg-[#111] p-6 rounded-[3rem] border border-white/5 shadow-2xl">
            <div className="flex bg-black p-2 rounded-[2rem] border border-white/5">
               <TabBtn label="Live Street Wire" active={activeTab==='wire'} onClick={()=>setActiveTab('wire')} />
               <TabBtn label="City Challenges" active={activeTab==='challenges'} onClick={()=>setActiveTab('challenges')} />
               <TabBtn label="Heatmap" active={activeTab==='heatmap'} onClick={()=>setActiveTab('heatmap')} />
            </div>

            <div className="flex flex-1 items-center gap-6 w-full lg:w-auto">
               <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={18} />
                  <input 
                     type="text" 
                     placeholder="SEARCH BY STREET OR CITY..."
                     className="w-full pl-12 pr-4 py-4 bg-black border border-white/5 rounded-2xl outline-none focus:border-red-600/50 transition-all text-xs font-bold uppercase tracking-widest text-white"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <button className="p-4 bg-red-600 text-white rounded-2xl shadow-xl hover:bg-red-700 transition-all"><Filter size={20}/></button>
            </div>
         </div>

         {activeTab === 'wire' && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
               {streetPhotos.map((photo, i) => (
                  <StreetPhotoCard 
                     key={photo.id} 
                     photo={photo} 
                     onDetails={() => setSelectedPhoto(photo)} 
                     onBuy={() => addItem(photo)}
                  />
               ))}
            </div>
         )}

         {activeTab === 'challenges' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <ChallengeCard 
                  title="RED IN THE RAIN" 
                  desc="Capture the vibrant red of Nairobi matatus or umbrellas during a downpour." 
                  prize="KSH 15,000 + Front Page Boost"
                  ends="2 Days Left"
                  image="https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=800&q=80"
               />
               <ChallengeCard 
                  title="SHADOW PLAY" 
                  desc="Find the harsh shadows of urban architecture in Dar Es Salaam's early morning." 
                  prize="Zangu 'Shadow Master' Badge"
                  ends="Starts Tomorrow"
                  image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80"
               />
            </div>
         )}

         {activeTab === 'heatmap' && (
            <div className="relative h-[600px] bg-[#111] rounded-[4rem] border border-white/5 overflow-hidden flex items-center justify-center">
               <Globe size={300} className="text-red-600/10 animate-spin-slow" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                  <MapPin size={64} className="text-red-600 mb-8 animate-bounce" />
                  <h3 className="font-embroidery text-5xl italic text-white mb-4">LIVE URBAN HOTSPOTS</h3>
                  <p className="text-gray-500 text-sm max-w-md">Real-time GPS tracking of where the "Decisive Moments" are being captured right now.</p>
                  <div className="mt-12 flex gap-10">
                     <Hotspot label="Luthuli Ave" count={14} />
                     <Hotspot label="Tom Mboya" count={22} />
                     <Hotspot label="Downton Kampala" count={8} />
                  </div>
               </div>
            </div>
         )}
      </div>

      <AnimatePresence>
         {selectedPhoto && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
               <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#0a0a0a] rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row border border-white/5"
               >
                  <div className="w-full lg:w-2/3 aspect-[4/5] lg:aspect-auto relative group">
                     <ProtectedImage src={selectedPhoto.url} photographerName={selectedPhoto.photographer} />
                     <button onClick={() => setSelectedPhoto(null)} className="absolute top-8 left-8 p-4 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-red-600 transition-all border border-white/10 z-30"><X size={24}/></button>
                     
                     <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none z-30">
                        <div className="flex items-center gap-4">
                           <div className="p-4 bg-red-600 rounded-3xl shadow-xl text-white">
                              <Volume2 size={32} />
                           </div>
                           <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white font-black text-xs tracking-widest">
                              PLAY AMBIENT CITY NOISE
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 p-12 flex flex-col">
                     <div className="flex justify-between items-start mb-10">
                        <div>
                           <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">{selectedPhoto.location}</span>
                           <h2 className="font-embroidery text-5xl text-white italic leading-tight mb-2">{selectedPhoto.title}</h2>
                           <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Captured by <span className="text-white underline">{selectedPhoto.photographer}</span></p>
                        </div>
                        {selectedPhoto.isRawTalent && (
                           <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-3xl text-green-500" title="Anti-Crop Policy Badge">
                              <Crosshair size={24} />
                           </div>
                        )}
                     </div>

                     <div className="space-y-8 flex-1">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                           <div className="flex items-center gap-3 mb-4">
                              <Smartphone size={16} className="text-red-600" />
                              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Gear Talk (EXIF)</span>
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <span className="block text-[8px] font-black text-gray-500 uppercase mb-1">Body</span>
                                 <span className="text-xs font-bold text-white">{selectedPhoto.gear?.camera || 'N/A'}</span>
                              </div>
                              <div>
                                 <span className="block text-[8px] font-black text-gray-500 uppercase mb-1">Optics</span>
                                 <span className="text-xs font-bold text-white">{selectedPhoto.gear?.lens || 'N/A'}</span>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <Radio className="text-red-600 animate-pulse" size={20} />
                              <div>
                                 <span className="block text-[8px] font-black text-gray-500 uppercase">The Decisive Moment</span>
                                 <span className="text-sm font-bold text-white">{selectedPhoto.decisiveMomentSeconds}s After Arrival</span>
                              </div>
                           </div>
                           <button className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                              Tip Artist <Heart size={14} fill="currentColor"/>
                           </button>
                        </div>
                     </div>

                     <div className="mt-12 space-y-4">
                        <button 
                          onClick={() => { addItem(selectedPhoto); setSelectedPhoto(null); }}
                          className="w-full bg-red-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-red-900/40 hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                        >
                           <ShoppingCart size={20} /> Instant License • KES {selectedPhoto.price}
                        </button>
                        <button className="w-full bg-white/5 border border-white/10 text-white font-black py-5 rounded-[2rem] hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-widest">
                           Buy as Urban Canvas (Print)
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

interface StreetPhotoCardProps {
  photo: Photo;
  onDetails: () => void;
  onBuy: () => void;
}

const StreetPhotoCard: React.FC<StreetPhotoCardProps> = ({ photo, onDetails, onBuy }) => {
  return (
    <motion.div 
      variants={glitchAnimation}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onDetails}
      className="group relative bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-xl cursor-pointer"
    >
      <div className="relative">
         <ProtectedImage 
            src={photo.url} 
            photographerName={photo.photographer}
            className="opacity-80 group-hover:opacity-100"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 z-10" />
         
         <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
            {photo.isRawTalent && (
               <div className="bg-green-500 text-white p-2 rounded-xl shadow-xl" title="Raw Talent (No Crop)">
                  <Target size={14} />
               </div>
            )}
            {photo.isMediaReady && (
               <div className="bg-red-600 text-white p-2 rounded-xl shadow-xl animate-pulse" title="Media Ready">
                  <Radio size={14} />
               </div>
            )}
         </div>

         <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white">
               <Volume2 size={18} />
            </div>
         </div>

         <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/40 backdrop-blur-md border-t border-white/10 z-30">
            <div className="flex justify-between items-center text-white">
               <div>
                  <h4 className="font-embroidery text-2xl mb-1 italic truncate max-w-[150px]">{photo.title}</h4>
                  <p className="text-[9px] font-black uppercase text-red-600 tracking-widest">{photo.location}</p>
               </div>
               <button 
                  onClick={(e) => { e.stopPropagation(); onBuy(); }}
                  className="bg-red-600 p-3 rounded-2xl shadow-xl hover:bg-white hover:text-red-600 transition-all"
               >
                  <ShoppingCart size={18} />
               </button>
            </div>
         </div>
      </div>
    </motion.div>
  );
};

const TabBtn = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] ${active ? 'bg-white text-red-600 shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}
  >
    {label}
  </button>
);

const ChallengeCard = ({ title, desc, prize, ends, image }: { title: string, desc: string, prize: string, ends: string, image: string }) => (
  <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all group overflow-hidden relative">
    <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 transition-all">
      <img src={image} className="w-full h-full object-cover" alt="" />
    </div>
    <div className="relative z-10">
      <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">{ends}</span>
      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">{desc}</p>
      <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-2xl">
        <span className="text-[10px] font-black text-red-600 uppercase block mb-1">Prize Pool</span>
        <span className="text-xl font-bold text-white">{prize}</span>
      </div>
    </div>
  </div>
);

const Hotspot = ({ label, count }: { label: string, count: number }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mb-2 animate-pulse">
      <div className="w-3 h-3 bg-red-600 rounded-full" />
    </div>
    <span className="text-white font-bold text-xs">{label}</span>
    <span className="text-gray-500 text-[9px] font-black uppercase">{count} ACTIVE</span>
  </div>
);

export default StreetHub;