import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DO add comment above each fix.
// Fixed missing 'Clock' and 'ScanFace' imports from lucide-react.
import { 
  Camera, ShoppingBag, UserCheck, Star, Calendar, 
  MapPin, Video, Info, Tag, Download, Pin, 
  ChevronRight, ArrowUpRight, Search, Filter, 
  CheckCircle2, PlusCircle, Briefcase, Heart, X,
  Loader2, Sparkles, Upload, ShieldCheck, UserPlus,
  Maximize2, Share2, Layers, Cpu, Database, Fingerprint,
  QrCode, Ruler, Scissors, Palette, Smartphone, Zap,
  Clock, ScanFace
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_MODELS, MOCK_CASTING_CALLS } from '../constants';
import { Photo, Model, CastingCall } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import { useCartStore, useToastStore } from '../store/useAppStore';

const FashionHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lookbook' | 'models' | 'casting'>('lookbook');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isCastingModalOpen, setIsCastingModalOpen] = useState(false);
  const [isModelBookingOpen, setIsModelBookingOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [localCastingCalls, setLocalCastingCalls] = useState<CastingCall[]>(MOCK_CASTING_CALLS);
  
  // Virtual Wardrobe State
  const [selectedGarment, setSelectedGarment] = useState<Photo | null>(null);
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false);

  // Interaction States
  const [isBookingTransmitting, setIsBookingTransmitting] = useState(false);
  const [isScoutingUploading, setIsScoutingUploading] = useState(false);
  const [scoutingResult, setScoutingResult] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bookingDate, setBookingDate] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const fashionPhotos = useMemo(() => {
    let list = MOCK_PHOTOS.filter(p => p.category === 'Fashion');
    if (selectedFilter !== 'All') {
      list = list.filter(p => p.tags.some(t => t.toLowerCase() === selectedFilter.toLowerCase()));
    }
    return list;
  }, [selectedFilter]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      showToast(exists ? "Removed from Style Wishlist" : "Added to Style Wishlist", "info");
      return exists ? prev.filter(p => p !== id) : [...prev, id];
    });
  };

  const handleRequestBooking = () => {
    if (!bookingDate) {
      showToast("Please select a date from the availability node", "error");
      return;
    }
    setIsBookingTransmitting(true);
    showToast(`Transmitting booking request for ${bookingDate}...`, "info");
    setTimeout(() => {
      setIsBookingTransmitting(false);
      setIsModelBookingOpen(false);
      showToast(`Booking request sent to ${selectedModel?.name}`, "success");
    }, 2500);
  };

  const handleScoutingUpload = () => {
    setIsScoutingUploading(true);
    setScoutingResult(null);
    showToast("Initializing Neural Feature Scan...", "info");
    setTimeout(() => {
      setIsScoutingUploading(false);
      setScoutingResult({
        potential: 94,
        archetype: 'Editorial High Fashion',
        features: ['Strong Jawline', 'Symmetric Proportions', 'High Contrast Tone']
      });
      showToast("Neural Mapping Complete. Discovery Node Updated.", "success");
    }, 3500);
  };

  const renderLookbook = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      {fashionPhotos.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {fashionPhotos.map((photo, i) => (
            <motion.div 
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white break-inside-avoid overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100 rounded-[2rem]"
            >
              <div className="relative overflow-hidden aspect-auto cursor-zoom-in" onClick={() => setSelectedGarment(photo)}>
                <img 
                  src={photo.url} 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt={photo.title} 
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                   <div className="flex justify-between items-end text-white">
                    <div>
                      <h3 className="font-embroidery text-3xl mb-1 italic">{photo.title}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Digital Fabric Scan Available</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                        onClick={(e) => { e.stopPropagation(); addItem(photo); showToast("Editorial License Added", "success"); }}
                        className="p-3 bg-red-600 rounded-2xl shadow-xl hover:bg-white hover:text-red-600 transition-all"
                       >
                        <ShoppingBag size={20} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-50 flex justify-between items-center">
                 <div className="flex gap-4">
                    <button 
                      onClick={() => toggleWishlist(photo.id)}
                      className={`transition-colors ${wishlist.includes(photo.id) ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                    >
                      <Heart size={18} fill={wishlist.includes(photo.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => showToast("Added to Trend Moodboard", "info")}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Pin size={18} />
                    </button>
                 </div>
                 <span className="font-bungee text-gray-900">KES {photo.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center opacity-30">
          <Search size={64} className="mx-auto mb-4" />
          <p className="font-embroidery text-4xl">NO {selectedFilter.toUpperCase()} ASSETS FOUND</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 space-y-20 -mx-4 md:-mx-0">
      <section className="relative h-[450px] md:h-[600px] overflow-hidden md:rounded-[4rem] shadow-2xl bg-black">
         <div className="absolute inset-0 opacity-60">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover animate-kenburns-zoom-in" alt="Hero" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Editorial Excellence</span>
            <h1 className="font-embroidery text-6xl md:text-[10rem] text-white italic leading-none mb-8">SILK & <br/><span className="font-embroidery-sketch text-red-600">STEEL</span></h1>
            <div className="flex gap-6">
               <button onClick={() => setActiveTab('lookbook')} className="bg-white text-gray-900 font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest">View Lookbook</button>
               <button onClick={() => setActiveTab('models')} className="bg-red-600 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-white hover:text-gray-900 transition-all text-xs uppercase tracking-widest">Hire Talent</button>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex bg-gray-50 p-2 rounded-[2rem] border border-gray-100 overflow-x-auto scrollbar-hide max-w-full">
            <TabBtn active={activeTab==='lookbook'} label="Virtual Wardrobe" onClick={()=>setActiveTab('lookbook')} />
            <TabBtn active={activeTab==='models'} label="Model Market" onClick={()=>setActiveTab('models')} />
            <TabBtn active={activeTab==='casting'} label="Casting Calls" onClick={()=>setActiveTab('casting')} />
          </div>

          {activeTab === 'lookbook' && (
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-hide">
              {['All', 'High Fashion', 'Streetwear', 'Commercial', 'Fitness', 'Couture'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setSelectedFilter(cat); showToast(`Filtering by ${cat}...`, "info"); }}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedFilter === cat ? 'bg-red-600 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === 'lookbook' && renderLookbook()}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {MOCK_MODELS.map((model) => (
              <ModelCard key={model.id} model={model} onBook={() => { setSelectedModel(model); setIsModelBookingOpen(true); }} />
            ))}
          </div>
        )}
        {activeTab === 'casting' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {localCastingCalls.map((call) => (
              <CastingCard key={call.id} call={call} onApply={() => showToast("Transmitting portfolio...", "info")} />
            ))}
          </div>
        )}

        {/* NEURAL SCOUTING SECTION */}
        <section className="mt-32 bg-gray-900 rounded-[3.5rem] p-16 text-white overflow-hidden relative group">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="font-embroidery text-5xl mb-6 italic uppercase">NEURAL <br/><span className="text-red-600">SCOUTING</span></h2>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
                  AI-powered facial mapping for regional talent discovery. Our neural network analyzes bone structure and symmetric indexes against global industry standards.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
                   {isScoutingUploading ? (
                     <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <Loader2 className="animate-spin text-red-600" size={48} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Mapping Facial Vectors...</span>
                     </div>
                   ) : scoutingResult ? (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-black uppercase text-gray-500">Discovery Score</span>
                           <span className="text-4xl font-bungee text-red-600">{scoutingResult.potential}%</span>
                        </div>
                        <div className="space-y-2">
                           {scoutingResult.features.map((f: string) => (
                             <div key={f} className="flex items-center gap-2 text-xs font-bold uppercase text-white/80">
                                <CheckCircle2 size={14} className="text-red-600" /> {f}
                             </div>
                           ))}
                        </div>
                        <button onClick={() => setScoutingResult(null)} className="text-[10px] font-black text-gray-500 uppercase hover:text-white transition-colors">Reset Scan</button>
                     </motion.div>
                   ) : (
                     <div className="text-center py-10">
                        <Camera size={48} className="text-red-600 mx-auto mb-6" />
                        <h4 className="font-bold text-xl mb-4">DRAG & DROP POLAROIDS</h4>
                        <button onClick={handleScoutingUpload} className="px-8 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Select Image Files</button>
                     </div>
                   )}
                </div>
             </div>
             <div className="relative aspect-square rounded-[3rem] bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                <AnimatePresence>
                   {isScoutingUploading ? (
                     <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                     >
                        <div className="w-full h-full relative">
                           <motion.div 
                             animate={{ top: ['0%', '100%'] }}
                             transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                             className="absolute left-0 right-0 h-1 bg-red-600 shadow-[0_0_20px_red] z-30" 
                           />
                           <img src="https://i.pravatar.cc/600?u=scout" className="w-full h-full object-cover opacity-40 blur-sm grayscale" alt="" />
                        </div>
                     </motion.div>
                   ) : (
                     <Fingerprint size={240} className="text-red-600 opacity-20" />
                   )}
                </AnimatePresence>
                <div className="absolute top-8 left-8 text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Node: Scouting_NBI_01</div>
             </div>
           </div>
        </section>
      </div>

      {/* MODAL: AVAILABILITY & BOOKING */}
      <AnimatePresence>
        {isModelBookingOpen && selectedModel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row max-h-[90vh]"
            >
               {/* COMP CARD VIEW (LEFT) */}
               <div className="w-full md:w-1/2 bg-black relative flex flex-col p-12 text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-40">
                    <img src={selectedModel.thumbnail} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                     <div className="flex justify-between items-start mb-auto">
                        <div className="bg-red-600 p-2.5 rounded-2xl text-white"><UserCheck size={28}/></div>
                        <QrCode size={64} className="opacity-40" />
                     </div>

                     <div className="mt-auto">
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] mb-4 block">Professional Comp Card</span>
                        <h2 className="font-embroidery text-7xl md:text-8xl italic uppercase leading-none mb-6">{selectedModel.name}</h2>
                        
                        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-8">
                           <CompStat label="Height" val={selectedModel.height} />
                           <CompStat label="Measurements" val={selectedModel.measurements} />
                           <CompStat label="Eye Color" val="Deep Brown" />
                           <CompStat label="Experience" val="4 Years Pro" />
                        </div>
                     </div>
                  </div>
               </div>

               {/* AVAILABILITY CALENDAR (RIGHT) */}
               <div className="flex-1 p-12 flex flex-col bg-white text-black overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-center mb-10">
                     <h3 className="font-embroidery text-4xl italic text-gray-900">AVAILABILITY <span className="text-red-600">NODE</span></h3>
                     <button onClick={() => setIsModelBookingOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100"><X size={20}/></button>
                  </div>

                  <div className="space-y-8 flex-1">
                     <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                           <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">September 2025</span>
                           <div className="flex gap-2">
                              <button className="p-2 bg-white rounded-lg border border-gray-200"><ChevronRight size={14} className="rotate-180" /></button>
                              <button className="p-2 bg-white rounded-lg border border-gray-200"><ChevronRight size={14}/></button>
                           </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                           {['M','T','W','T','F','S','S'].map(d => <span key={d} className="text-[10px] font-black text-gray-400">{d}</span>)}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                           {Array.from({length: 31}).map((_, i) => {
                             const day = i + 1;
                             const isBooked = [4, 5, 12, 18, 24, 25].includes(day);
                             const isSelected = bookingDate === `2025-09-${day}`;
                             return (
                               <button 
                                 key={day}
                                 disabled={isBooked}
                                 onClick={() => setBookingDate(`2025-09-${day}`)}
                                 className={`aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                                    isBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through' :
                                    isSelected ? 'bg-red-600 text-white shadow-xl' :
                                    'bg-white border border-gray-100 hover:border-red-600'
                                 }`}
                               >
                                 {day}
                               </button>
                             );
                           })}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                           <Clock size={20} className="text-red-600 mb-2" />
                           <span className="block text-[10px] font-black text-red-600 uppercase mb-1">Standard Rate</span>
                           <span className="text-lg font-bungee">KES 12,500 / HR</span>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                           <Database size={20} className="text-gray-400 mb-2" />
                           <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Commission Fee</span>
                           <span className="text-lg font-bungee">10% PZ FEE</span>
                        </div>
                     </div>
                  </div>

                  <div className="mt-12 space-y-4">
                     <button 
                        disabled={isBookingTransmitting || !bookingDate}
                        onClick={handleRequestBooking}
                        className="w-full bg-red-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-red-900/20 hover:bg-black transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                     >
                        {isBookingTransmitting ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                        {isBookingTransmitting ? "TRANSMITTING..." : "Finalize Booking Node"}
                     </button>
                     <p className="text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Funds held in Escrow Node until delivery confirmation</p>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIRTUAL WARDROBE / GARMENT MODAL */}
      <AnimatePresence>
         {selectedGarment && (
           <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row min-h-[70vh]"
              >
                 <div className="w-full md:w-2/3 bg-black relative group">
                    <img src={selectedGarment.url} className="w-full h-full object-cover" alt="" />
                    <button onClick={() => setSelectedGarment(null)} className="absolute top-8 left-8 p-4 bg-black/60 rounded-2xl text-white hover:bg-red-600 transition-all border border-white/10 z-20"><X size={24}/></button>
                    
                    {/* INTERACTIVE HOTSPOTS */}
                    <Hotspot top="30%" left="45%" label="Silk Weave" desc="Grade A Organic Silk" />
                    <Hotspot top="60%" left="30%" label="Custom Stitch" desc="Handcrafted in Mombasa" />
                 </div>

                 <div className="flex-1 p-12 flex flex-col">
                    <div className="mb-10">
                       <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em] block mb-2">Virtual Wardrobe Node</span>
                       <h2 className="font-embroidery text-5xl italic leading-tight text-gray-900">{selectedGarment.title}</h2>
                    </div>

                    <div className="space-y-8 flex-1">
                       <div className="grid grid-cols-2 gap-4">
                          <GarmentStat icon={<Palette/>} label="Primary Tone" val="Emerald Deep" />
                          <GarmentStat icon={<Scissors/>} label="Fabric" val="East African Cotton" />
                          <GarmentStat icon={<Ruler/>} label="Sizing" val="Regional Fit (M/L)" />
                          <GarmentStat icon={<Smartphone/>} label="AR Ready" val="Neural Scan v4" />
                       </div>

                       <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                          <div className="relative z-10">
                             <h4 className="font-embroidery text-2xl mb-2 italic">STYLE FORECAST</h4>
                             <p className="text-gray-400 text-[10px] font-bold uppercase leading-relaxed">AI suggests pairing this with the 'Mombasa Sunset' jewelry collection and neutral footwear.</p>
                             <button onClick={() => setIsVirtualTryOnOpen(true)} className="mt-6 flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                                <Maximize2 size={16} /> INITIALIZE AR TRY-ON
                             </button>
                          </div>
                          <Cpu size={120} className="absolute -right-10 -bottom-10 opacity-5 group-hover:rotate-12 transition-transform" />
                       </div>
                    </div>

                    <div className="mt-12">
                       <button 
                         onClick={() => { addItem(selectedGarment); setSelectedGarment(null); showToast("Garment License Acquired", "success"); }}
                         className="w-full bg-red-600 text-white font-black py-6 rounded-3xl shadow-xl shadow-red-900/20 hover:bg-black transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                       >
                          <ShoppingBag size={20}/> ADD TO CART • KES {selectedGarment.price}
                       </button>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* AR TRY-ON OVERLAY */}
      <AnimatePresence>
        {isVirtualTryOnOpen && (
          <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
             <div className="relative w-full h-full max-w-lg aspect-[9/16] bg-[#111] overflow-hidden">
                <video className="w-full h-full object-cover opacity-60" autoPlay playsInline />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <div className="w-64 h-96 border-4 border-dashed border-red-600/40 rounded-[4rem] flex items-center justify-center">
                      <ScanFace size={64} className="text-red-600 animate-pulse" />
                   </div>
                   <p className="mt-10 font-black uppercase text-xs tracking-[0.5em] text-white">Align body to start AR session</p>
                </div>
                <button onClick={() => setIsVirtualTryOnOpen(false)} className="absolute top-10 right-10 p-4 bg-white/10 rounded-full text-white border border-white/20 hover:bg-red-600"><X size={24}/></button>
                <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-center">
                   <div className="flex gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-red-600" />
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-blue-600" />
                   </div>
                   <button className="w-20 h-20 bg-white rounded-full border-8 border-white/20 flex items-center justify-center shadow-2xl">
                      <Camera size={32} className="text-black" />
                   </button>
                   <div className="w-12 h-12 bg-white/10 rounded-xl" />
                </div>
             </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const TabBtn = ({label, active, onClick}: {label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${active ? 'bg-white text-red-600 shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}
  >
    {label}
  </button>
);

// DO add comment above each fix.
// Fixed ModelCard typed as React.FC to address property key error in map function.
const ModelCard: React.FC<{model: Model, onBook: () => void}> = ({model, onBook}) => (
  <div className="group flex flex-col">
    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 shadow-xl border border-gray-100">
       <img src={model.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={model.name} />
       <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={onBook}
            className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-2xl text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            BOOK FOR CASTING
          </button>
       </div>
    </div>
    <div className="px-2">
      <div className="flex justify-between items-center mb-1">
         <h3 className="font-embroidery text-2xl text-gray-900 italic">{model.name}</h3>
         <div className="flex items-center gap-1 text-red-600">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">{model.rating}</span>
         </div>
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{model.style} • {model.agency || 'Freelance'}</p>
    </div>
  </div>
);

// DO add comment above each fix.
// Fixed CastingCard typed as React.FC to address property key error in map function.
const CastingCard: React.FC<{call: CastingCall, onApply: () => void}> = ({call, onApply}) => (
  <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">{call.agency}</span>
        <h3 className="font-embroidery text-3xl italic group-hover:text-red-600 transition-colors">{call.title}</h3>
      </div>
      <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl border border-red-100 font-bungee text-lg">
        KES {call.budget.toLocaleString()}
      </div>
    </div>
    <button 
      onClick={onApply}
      className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all"
    >
      Apply Now
    </button>
  </div>
);

const Hotspot = ({top, left, label, desc}: any) => (
  <div className="absolute z-20 group/hot" style={{ top, left }}>
     <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center animate-pulse border-2 border-white cursor-pointer hover:scale-125 transition-transform">
        <div className="w-2 h-2 bg-red-600 rounded-full" />
     </div>
     <div className="absolute left-10 top-0 bg-white p-4 rounded-2xl shadow-2xl w-48 opacity-0 group-hover/hot:opacity-100 transition-opacity pointer-events-none border border-gray-100">
        <span className="block text-[8px] font-black uppercase text-red-600 mb-1">{label}</span>
        <p className="text-[10px] font-bold text-gray-900 leading-tight">{desc}</p>
     </div>
  </div>
);

const CompStat = ({label, val}: any) => (
  <div>
     <span className="block text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">{label}</span>
     <span className="text-sm font-bold">{val}</span>
  </div>
);

const GarmentStat = ({icon, label, val}: any) => (
  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
     <div className="text-red-600">{icon && React.cloneElement(icon as React.ReactElement, { size: 18 })}</div>
     <div>
        <span className="block text-[8px] font-black text-gray-400 uppercase leading-none mb-1">{label}</span>
        <span className="text-[10px] font-bold text-gray-900 uppercase leading-none">{val}</span>
     </div>
  </div>
);

export default FashionHub;