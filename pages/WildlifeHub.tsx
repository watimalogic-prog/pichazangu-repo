import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DO add comment above each fix.
// Fixed missing 'PlayCircle' import from lucide-react.
import { 
  Leaf, Trees, Bird, Map, Search, Filter, Camera, 
  ShoppingCart, MapPin, Zap, Info, ShieldCheck, 
  Globe, Compass, Eye, Maximize2, Share2, Upload, 
  Loader2, Radio, Award, Heart, CheckCircle, 
  Target, Activity, Binary, BrainCircuit, Scan,
  PawPrint, Sunset, Wind, ChevronRight, X,
  EyeOff, Crosshair, Radar, Signal, Video,
  AlertTriangle, FlaskConical, Github, PlayCircle
} from 'lucide-react';
import { MOCK_PHOTOS } from '../constants';
import { Photo } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import { useCartStore, useToastStore } from '../store/useAppStore';

const WildlifeHub: React.FC<{ userRole: any }> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'wire' | 'expeditions' | 'grid' | 'traps'>('wire');
  const [searchQuery, setSearchQuery] = useState('');
  const [conservationMode, setConservationMode] = useState(true);
  const [nightVision, setNightVision] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [sightingTicker, setSightingTicker] = useState("LIONESS PRIDE SPOTTED NEAR MARA RIVER NODE-04");
  const [activeGridNode, setActiveGridNode] = useState<string | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  // Logic: Filter Wildlife Photos
  const wildlifePhotos = useMemo(() => {
    let list = MOCK_PHOTOS.filter(p => p.category === 'Wildlife' || p.tags.includes('safari'));
    if (searchQuery) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return list;
  }, [searchQuery]);

  useEffect(() => {
    const sightings = [
      "RHINO NODE-12: CALF DETECTED BY SENSOR",
      "TSAVO WEST: MIGRATION PHASE 1 INITIALIZED",
      "AMBOSELI: ELEPHANT CROSSING AT KILIMANJARO VIEW",
      "SERENGETI: CHEETAH SPRINT CAPTURED AT 240FPS"
    ];
    const interval = setInterval(() => {
      setSightingTicker(sightings[Math.floor(Math.random() * sightings.length)]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSpeciesScan = () => {
    setIsScanning(true);
    showToast("Initializing Neural Species Mapping...", "info");
    setTimeout(() => {
      setIsScanning(false);
      showToast("Identification Complete: Loxodonta Africana (African Elephant)", "success");
    }, 3000);
  };

  const handleApplyExpedition = (title: string) => {
    showToast(`Joining Expedition: ${title}`, "info");
    setTimeout(() => {
      showToast("GPS Tracking Node Synced to Field Gear", "success");
    }, 2000);
  };

  const toggleNightVision = () => {
    setNightVision(!nightVision);
    showToast(nightVision ? "Infrared Lens Retracted" : "Thermal Imaging Node Active", "info");
  };

  return (
    <div className={`min-h-screen pb-20 space-y-20 -mx-4 md:-mx-0 transition-all duration-700 ${nightVision ? 'bg-[#001a00] text-[#00ff00] selection:bg-[#00ff00]' : ''}`}>
      
      {/* 1. HERO EXPEDITION BANNER */}
      <section className={`relative h-[450px] md:h-[650px] overflow-hidden md:rounded-[4rem] shadow-2xl bg-black ${nightVision ? 'border-4 border-[#00ff00]/20' : ''}`}>
         <div className={`absolute inset-0 transition-all duration-1000 ${nightVision ? 'grayscale sepia-[0.5] hue-rotate-[90deg] brightness-[1.2] contrast-[1.5]' : ''}`}>
            <img 
               src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80" 
               className="w-full h-full object-cover opacity-60 animate-kenburns-zoom-in" 
               alt="Serengeti" 
            />
         </div>
         <div className={`absolute inset-0 ${nightVision ? 'bg-[#00ff00]/5 mix-blend-color' : 'bg-gradient-to-t from-black via-black/30 to-transparent'}`} />
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="space-y-6"
            >
               <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl text-white shadow-lg ${nightVision ? 'bg-[#00ff00] text-black shadow-[#00ff00]/40' : 'bg-green-600 shadow-green-900/40'}`}>
                     <Trees size={20} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.6em] ${nightVision ? 'text-[#00ff00]' : 'text-white'}`}>The Serengeti Protocol</span>
               </div>
               <h1 className={`font-embroidery text-6xl md:text-[10rem] italic leading-none uppercase ${nightVision ? 'text-[#00ff00]' : 'text-white'}`}>
                  WILD <span className={`${nightVision ? '' : 'text-green-600'} font-embroidery-sketch`}>AFRICA</span>
               </h1>
               <p className={`max-w-2xl mx-auto text-xl md:text-2xl font-medium uppercase tracking-widest ${nightVision ? 'text-[#00ff00]/60' : 'text-gray-300'}`}>
                  Bit-Perfect Wildlife Documentation <br/> from the Regional Archive.
               </p>
               <div className="flex flex-wrap gap-4 justify-center pt-8">
                  <button onClick={() => setActiveTab('wire')} className={`font-black px-10 py-5 rounded-[2.5rem] shadow-2xl transition-all text-xs uppercase tracking-widest ${nightVision ? 'bg-[#00ff00] text-black hover:bg-white' : 'bg-white text-black hover:bg-green-600 hover:text-white'}`}>Enter Archive</button>
                  <button onClick={toggleNightVision} className={`px-10 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${nightVision ? 'bg-[#00ff00]/20 border-[#00ff00] text-[#00ff00]' : 'bg-transparent border-white/20 text-white hover:border-green-600'}`}>
                    <Eye size={16} /> {nightVision ? 'THERMAL ON' : 'NIGHT VISION'}
                  </button>
                  <button onClick={() => setConservationMode(!conservationMode)} className={`px-10 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest border-2 transition-all ${conservationMode ? 'bg-green-600/20 border-green-600 text-green-500' : 'bg-transparent border-white/20 text-white'}`}>
                    Impact Node: {conservationMode ? 'ACTIVE' : 'OFF'}
                  </button>
               </div>
            </motion.div>
         </div>

         {/* Night Vision Scanning Overlay */}
         {nightVision && (
           <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ff00] shadow-[0_0_20px_#00ff00] animate-scan" />
              <div className="absolute inset-0 border-[20px] border-black/40" />
              <div className="absolute top-10 left-10 text-[#00ff00] font-mono text-[10px] space-y-1">
                 <p>RECNODE_01</p>
                 <p>T_SENS: 24.2C</p>
                 <p>GPS_S: 0.94</p>
              </div>
           </div>
         )}

         {/* Live Sighting Ticker */}
         <div className={`absolute bottom-0 left-0 right-0 backdrop-blur-md border-t py-4 px-10 ${nightVision ? 'bg-black/80 border-[#00ff00]/20' : 'bg-black/60 border-white/5'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full animate-ping ${nightVision ? 'bg-[#00ff00]' : 'bg-red-600'}`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${nightVision ? 'text-[#00ff00]' : 'text-red-600'}`}>Live Sighting Wire</span>
               </div>
               <AnimatePresence mode="wait">
                  <motion.p 
                     key={sightingTicker}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className={`text-xs font-bold uppercase tracking-widest ${nightVision ? 'text-[#00ff00]/80' : 'text-gray-400'}`}
                  >
                     {sightingTicker}
                  </motion.p>
               </AnimatePresence>
               <div className="hidden md:flex items-center gap-6">
                  <span className={`text-[10px] font-black uppercase ${nightVision ? 'text-[#00ff00]/40' : 'text-white/30'}`}>Node-Status: Nominal</span>
                  <div className={`w-px h-4 ${nightVision ? 'bg-[#00ff00]/10' : 'bg-white/10'}`} />
                  <Globe size={16} className={nightVision ? 'text-[#00ff00]/40' : 'text-gray-600'} />
               </div>
            </div>
         </div>
      </section>

      {/* 2. COMMAND CENTER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6">
         <div className={`p-6 rounded-[3rem] border transition-all flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 sticky top-20 z-40 shadow-2xl backdrop-blur-xl bg-opacity-80 ${nightVision ? 'bg-[#001100] border-[#00ff00]/20' : 'bg-white dark:bg-[#111] border-gray-100 dark:border-white/5'}`}>
            <div className={`flex p-2 rounded-[2rem] border overflow-x-auto scrollbar-hide max-w-full ${nightVision ? 'bg-black border-[#00ff00]/10' : 'bg-gray-50 dark:bg-black border-gray-100 dark:border-white/5'}`}>
               <TabBtn label="Archival Wire" active={activeTab==='wire'} onClick={()=>setActiveTab('wire')} night={nightVision} />
               <TabBtn label="Expeditions" active={activeTab==='expeditions'} onClick={()=>setActiveTab('expeditions')} night={nightVision} />
               <TabBtn label="Live Traps" active={activeTab==='traps'} onClick={()=>setActiveTab('traps')} night={nightVision} />
               <TabBtn label="Sighting Grid" active={activeTab==='grid'} onClick={()=>setActiveTab('grid')} night={nightVision} />
            </div>

            <div className="flex flex-1 items-center gap-6 w-full lg:w-auto">
               <div className="relative flex-1 group">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${nightVision ? 'text-[#00ff00]' : 'text-gray-500 group-focus-within:text-green-600'}`} size={18} />
                  <input 
                     type="text" 
                     placeholder="SCAN BY SPECIES OR LOCATION..."
                     className={`w-full pl-12 pr-4 py-4 bg-transparent border-b-2 outline-none transition-all text-xs font-bold uppercase tracking-widest ${nightVision ? 'border-[#00ff00]/20 text-[#00ff00] focus:border-[#00ff00]' : 'border-gray-100 dark:border-white/10 text-black dark:text-white focus:border-green-600'}`}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <button onClick={() => showToast("Filters Updated", "info")} className={`p-4 rounded-2xl shadow-xl transition-all ${nightVision ? 'bg-[#00ff00] text-black hover:bg-white' : 'bg-green-600 text-white hover:bg-black'}`}>
                  <Filter size={20}/>
               </button>
            </div>
         </div>

         {/* 3. DYNAMIC CONTENT RENDERING */}
         <AnimatePresence mode="wait">
            {activeTab === 'wire' && (
               <motion.div 
                  key="wire"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
               >
                  {wildlifePhotos.map((photo, i) => (
                     <WildlifeCard 
                        key={photo.id} 
                        photo={photo} 
                        night={nightVision}
                        onDetails={() => setSelectedPhoto(photo)}
                        onBuy={() => { addItem(photo); showToast("Asset Locked in Checkout", "success"); }}
                     />
                  ))}
               </motion.div>
            )}

            {activeTab === 'expeditions' && (
               <motion.div 
                  key="expeditions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
               >
                  <ExpeditionCard 
                     title="THE BIG FIVE MISSION"
                     desc="Capture all Big Five species in a single calendar month. Requires verified GPS node proof."
                     prize="KSH 75,000 Grant + Pro Accreditation"
                     progress={40}
                     night={nightVision}
                     onJoin={() => handleApplyExpedition("BIG FIVE MISSION")}
                     image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
                  />
                  <ExpeditionCard 
                     title="MACRO SAVANNAH"
                     desc="Focus on the small giants. Insect and flora documentation within the Amboseli corridor."
                     prize="Archival Spotlight Feature"
                     progress={12}
                     night={nightVision}
                     onJoin={() => handleApplyExpedition("MACRO SAVANNAH")}
                     image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80"
                  />
               </motion.div>
            )}

            {activeTab === 'traps' && (
               <motion.div 
                  key="traps"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               >
                  {[
                    { node: "NODE-14", region: "Samburu", subject: "Leopard Movement", status: "LIVE" },
                    { node: "NODE-08", region: "Tsavo East", subject: "Waterhole Cluster", status: "TRIGGERED" },
                    { node: "NODE-22", region: "Ol Pejeta", subject: "Rhino Tracking", status: "LIVE" }
                  ].map((trap, i) => (
                    <div key={i} className={`p-8 rounded-[3rem] border transition-all group relative overflow-hidden ${nightVision ? 'bg-black border-[#00ff00]/20 text-[#00ff00]' : 'bg-white border-gray-100 shadow-xl'}`}>
                       <div className="flex justify-between items-start mb-6">
                          <div className={`p-3 rounded-2xl ${nightVision ? 'bg-[#00ff00]/10' : 'bg-red-600/5 text-red-600'}`}>
                             <Video size={24} className={trap.status === 'LIVE' ? 'animate-pulse' : ''} />
                          </div>
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${trap.status === 'LIVE' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>{trap.status}</span>
                       </div>
                       <h4 className="text-xl font-black mb-2">{trap.node} : {trap.region}</h4>
                       <p className={`text-sm mb-8 ${nightVision ? 'text-[#00ff00]/60' : 'text-gray-500'}`}>{trap.subject}</p>
                       <div className="aspect-video bg-black rounded-2xl mb-8 relative overflow-hidden group">
                          <img src={`https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80&sig=${i}`} className={`w-full h-full object-cover opacity-40 transition-all ${nightVision ? 'sepia hue-rotate-[90deg]' : ''}`} alt="" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <PlayCircle size={48} className="text-white opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer" />
                          </div>
                          <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/50">{new Date().toISOString()}</div>
                       </div>
                       <button onClick={() => showToast("Syncing with Remote Hub...", "info")} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${nightVision ? 'bg-[#00ff00] text-black' : 'bg-black text-white hover:bg-red-600'}`}>
                          Initialize Stream
                       </button>
                    </div>
                  ))}
               </motion.div>
            )}

            {activeTab === 'grid' && (
               <motion.div 
                  key="grid"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`rounded-[4rem] h-[600px] border overflow-hidden relative group ${nightVision ? 'bg-black border-[#00ff00]/20' : 'bg-zinc-950 border-white/5'}`}
               >
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <Globe size={400} className={`absolute -top-20 -right-20 animate-spin-slow ${nightVision ? 'text-[#00ff00]' : 'text-green-600'}`} />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                     <div className="relative mb-8">
                        <Radar size={64} className={`animate-spin-slow ${nightVision ? 'text-[#00ff00]' : 'text-green-600'}`} />
                        <div className={`absolute inset-0 blur-2xl rounded-full ${nightVision ? 'bg-[#00ff00]/20' : 'bg-green-600/20'}`} />
                     </div>
                     <h3 className={`font-embroidery text-5xl italic mb-4 uppercase ${nightVision ? 'text-[#00ff00]' : 'text-white'}`}>Regional Sighting Mesh</h3>
                     <p className={`font-black text-xs uppercase tracking-[0.4em] max-w-md mx-auto leading-relaxed ${nightVision ? 'text-[#00ff00]/40' : 'text-gray-500'}`}>
                        Visualizing secure sensor nodes and pro-captures in real-time across East African parks.
                     </p>
                     
                     <div className="mt-12 flex flex-wrap justify-center gap-12">
                        <SightingNode label="Maasai Mara" active count={12} night={nightVision} onClick={() => setActiveGridNode('MARA')} />
                        <SightingNode label="Serengeti" active count={45} night={nightVision} onClick={() => setActiveGridNode('SERENGETI')} />
                        <SightingNode label="Murchison Falls" count={4} night={nightVision} onClick={() => setActiveGridNode('MURCHISON')} />
                        <SightingNode label="Selous" count={18} night={nightVision} onClick={() => setActiveGridNode('SELOUS')} />
                     </div>
                  </div>

                  <AnimatePresence>
                     {activeGridNode && (
                       <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        className={`absolute top-0 right-0 bottom-0 w-80 backdrop-blur-3xl p-10 border-l ${nightVision ? 'bg-[#002200]/90 border-[#00ff00]/20' : 'bg-black/90 border-white/5'}`}
                       >
                          <button onClick={() => setActiveGridNode(null)} className="absolute top-8 left-8"><X size={20}/></button>
                          <div className="mt-10 space-y-8">
                             <h4 className="text-3xl font-embroidery italic">{activeGridNode} HUB</h4>
                             <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                   <span className="opacity-40">Sensor Health</span>
                                   <span className="text-green-500">99.2%</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                   <span className="opacity-40">Active Pros</span>
                                   <span>14 NODES</span>
                                </div>
                             </div>
                             <div className="pt-8 border-t border-white/10 space-y-4">
                                <span className="block text-[8px] font-black uppercase opacity-40">Recent Captures</span>
                                <div className="grid grid-cols-2 gap-2">
                                   <div className="aspect-square bg-white/5 rounded-xl" />
                                   <div className="aspect-square bg-white/5 rounded-xl" />
                                </div>
                             </div>
                          </div>
                       </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            )}
         </AnimatePresence>

         {/* CONSERVATION IMPACT PANEL */}
         <section className={`mt-32 rounded-[4rem] p-16 relative overflow-hidden group border ${nightVision ? 'bg-[#002200] border-[#00ff00]/20' : 'bg-green-950 border-green-900 text-white'}`}>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <ShieldCheck className={nightVision ? 'text-[#00ff00]' : 'text-green-400'} size={32} />
                     <h2 className="font-embroidery text-5xl italic uppercase">Impact <span className={nightVision ? '' : 'text-green-400'}>Node</span></h2>
                  </div>
                  <p className={`text-lg leading-relaxed mb-10 max-w-lg ${nightVision ? 'text-[#00ff00]/60' : 'text-green-100'}`}>
                     Picha Zangu routes 5% of all wildlife licensing fees directly to regional anti-poaching and conservation nodes. Every purchase protects the subjects you capture.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                     <div className={`p-6 rounded-[2rem] border ${nightVision ? 'bg-black border-[#00ff00]/10' : 'bg-black/40 border-white/5'}`}>
                        <span className={`block text-[8px] font-black uppercase tracking-widest mb-2 ${nightVision ? 'text-[#00ff00]/40' : 'text-green-400'}`}>Funded This Month</span>
                        <span className="text-3xl font-bungee">KES 420,500</span>
                     </div>
                     <div className={`p-6 rounded-[2rem] border ${nightVision ? 'bg-black border-[#00ff00]/10' : 'bg-black/40 border-white/5'}`}>
                        <span className={`block text-[8px] font-black uppercase tracking-widest mb-2 ${nightVision ? 'text-[#00ff00]/40' : 'text-green-400'}`}>Active Conservancies</span>
                        <span className="text-3xl font-bungee">14 NODES</span>
                     </div>
                  </div>
               </div>
               <div className={`relative aspect-square rounded-[3rem] p-10 flex flex-col items-center justify-center border transition-all ${nightVision ? 'bg-black border-[#00ff00]/20 group-hover:border-[#00ff00]' : 'bg-black/60 border-white/10 group-hover:border-green-600'}`}>
                  <Activity size={120} className={`opacity-20 mb-8 ${nightVision ? 'text-[#00ff00]' : 'text-green-600'}`} />
                  <div className="space-y-4 w-full">
                     <ImpactBar label="Mara Conservancies" percentage={88} night={nightVision} />
                     <ImpactBar label="Tsavo Elephant Fund" percentage={64} night={nightVision} />
                     <ImpactBar label="Ranger Salaries" percentage={95} night={nightVision} />
                  </div>
               </div>
            </div>
            <PawPrint size={300} className={`absolute -bottom-20 -right-20 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000 ${nightVision ? 'text-[#00ff00]' : ''}`} />
         </section>
      </div>

      {/* PHOTO DETAIL MODAL */}
      <AnimatePresence>
         {selectedPhoto && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
               <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className={`rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row min-h-[70vh] border transition-all duration-500 ${nightVision ? 'bg-black border-[#00ff00]/30 text-[#00ff00]' : 'bg-white text-black border-white/10'}`}
               >
                  <div className={`w-full md:w-2/3 bg-black relative group transition-all duration-1000 ${nightVision ? 'grayscale sepia hue-rotate-[90deg] brightness-125' : ''}`}>
                     <ProtectedImage src={selectedPhoto.url} photographerName={selectedPhoto.photographer} />
                     <button onClick={() => setSelectedPhoto(null)} className="absolute top-8 left-8 p-4 bg-black/60 rounded-2xl text-white hover:bg-green-600 transition-all border border-white/10 z-20"><X size={24}/></button>
                     
                     <div className="absolute bottom-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={handleSpeciesScan} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-green-600 transition-all">
                           <Scan size={24}/>
                        </button>
                        <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-green-600 transition-all">
                           <MapPin size={24}/>
                        </button>
                     </div>
                  </div>

                  <div className="flex-1 p-12 flex flex-col">
                     <div className="mb-10">
                        <div className="flex items-center gap-2 mb-4">
                           <Leaf size={16} className={nightVision ? 'text-[#00ff00]' : 'text-green-600'} />
                           <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${nightVision ? 'text-[#00ff00]' : 'text-green-600'}`}>Archival Asset: {selectedPhoto.location}</span>
                        </div>
                        <h2 className="font-embroidery text-5xl italic leading-tight uppercase">{selectedPhoto.title}</h2>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Captured by {selectedPhoto.photographer}</p>
                     </div>

                     <div className="space-y-8 flex-1">
                        {isScanning ? (
                           <div className="flex flex-col items-center justify-center py-20 gap-6">
                              <Loader2 className={`animate-spin ${nightVision ? 'text-[#00ff00]' : 'text-green-600'}`} size={48} />
                              <span className={`text-[10px] font-black uppercase tracking-[0.5em] animate-pulse ${nightVision ? 'text-[#00ff00]' : ''}`}>Running Neural Feature Check...</span>
                           </div>
                        ) : (
                           <>
                              <div className="grid grid-cols-2 gap-4">
                                 <TechStat icon={<Wind/>} label="Conditions" val="Afternoon Storm" night={nightVision} />
                                 <TechStat icon={<Sunset/>} label="Lighting" val="Golden Hour" night={nightVision} />
                                 <TechStat icon={<AlertTriangle/>} label="IUCN Status" val="Vulnerable (VU)" night={nightVision} />
                                 <TechStat icon={<Binary/>} label="Bit Integrity" val="99.8%" night={nightVision} />
                              </div>
                              <div className={`p-8 rounded-[2.5rem] border ${nightVision ? 'bg-[#001100] border-[#00ff00]/20' : 'bg-gray-50 border-gray-100'}`}>
                                 <div className="flex items-center gap-2 mb-4">
                                    <BrainCircuit size={18} className={nightVision ? 'text-[#00ff00]' : 'text-green-600'} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Archival Context</span>
                                 </div>
                                 <p className={`text-sm font-medium leading-relaxed italic ${nightVision ? 'text-[#00ff00]/60' : 'text-gray-600'}`}>
                                    "This capture represents a critical documentation of the migration phase. Metadata verified by Serengeti Node-04 satellite handshake."
                                 </p>
                              </div>
                           </>
                        )}
                     </div>

                     <div className="mt-12 flex gap-4">
                        <button 
                           onClick={() => { addItem(selectedPhoto); setSelectedPhoto(null); showToast("Commercial License Acquired", "success"); }}
                           className={`flex-1 font-black py-6 rounded-3xl shadow-xl transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] ${nightVision ? 'bg-[#00ff00] text-black hover:bg-white' : 'bg-green-600 text-white hover:bg-black'}`}
                        >
                           <ShoppingCart size={20}/> UNLOCK HIGH-RES • KES {selectedPhoto.price}
                        </button>
                        <button onClick={() => showToast("Added to Expedition Moodboard", "info")} className={`p-6 rounded-3xl transition-all border ${nightVision ? 'bg-black border-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00] hover:text-black' : 'bg-gray-50 text-gray-400 hover:text-green-600 border-gray-100'}`}>
                           <Heart size={24} />
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

// --- WILDLIFE COMPONENTS ---

const TabBtn = ({ label, active, onClick, night }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${
      active 
        ? (night ? 'bg-[#00ff00] text-black shadow-[0_0_20px_#00ff00]' : 'bg-green-600 text-white shadow-xl') 
        : (night ? 'text-[#00ff00]/40 hover:text-[#00ff00]' : 'text-gray-400 hover:text-green-600')
    }`}
  >
    {label}
  </button>
);

const WildlifeCard = ({ photo, onDetails, onBuy, night }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`group rounded-[2.5rem] overflow-hidden border transition-all cursor-pointer flex flex-col h-full ${
      night ? 'bg-black border-[#00ff00]/10 hover:border-[#00ff00] shadow-[#00ff00]/5' : 'bg-white dark:bg-[#111] border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl'
    }`}
    onClick={onDetails}
  >
     <div className={`aspect-square relative overflow-hidden bg-gray-200 transition-all duration-1000 ${night ? 'grayscale sepia hue-rotate-[90deg] brightness-125' : ''}`}>
        <ProtectedImage src={photo.url} photographerName={photo.photographer} />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl z-20 ${night ? 'bg-[#00ff00] text-black' : 'bg-green-600 text-white'}`}>
           Regional Pro
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 z-30">
           <button 
              onClick={(e) => { e.stopPropagation(); onBuy(); }}
              className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest transition-all ${night ? 'bg-[#00ff00] text-black hover:bg-white' : 'bg-white text-black hover:bg-green-600 hover:text-white'}`}
           >
              <ShoppingCart size={16}/> Instant License
           </button>
        </div>
     </div>
     <div className="p-8">
        <h3 className={`font-embroidery text-2xl mb-1 italic truncate transition-colors ${night ? 'group-hover:text-[#00ff00]' : 'group-hover:text-green-600'}`}>{photo.title}</h3>
        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
           <span className={`flex items-center gap-1 ${night ? 'text-[#00ff00]/60' : 'text-gray-500'}`}><MapPin size={10} className={night ? 'text-[#00ff00]' : 'text-green-600'} /> {photo.location}</span>
           <span className={`font-bungee text-sm ${night ? 'text-[#00ff00]' : 'text-green-600'}`}>KES {photo.price}</span>
        </div>
     </div>
  </motion.div>
);

const ExpeditionCard = ({ title, desc, prize, progress, image, night, onJoin }: any) => (
  <div className={`relative h-[500px] rounded-[3.5rem] overflow-hidden group border ${night ? 'border-[#00ff00]/20' : 'border-white/5'}`}>
     <img src={image} className={`w-full h-full object-cover transition-all duration-1000 ${night ? 'grayscale sepia hue-rotate-[90deg] brightness-125' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`} alt="" />
     <div className={`absolute inset-0 ${night ? 'bg-black/60' : 'bg-gradient-to-t from-black via-black/40 to-transparent'}`} />
     <div className="absolute inset-0 p-12 flex flex-col">
        <div className="mb-auto">
           <div className="flex justify-between items-start">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ${night ? 'bg-[#00ff00] text-black' : 'bg-green-600 text-white'}`}>Active Expedition</span>
              <Award className={night ? 'text-[#00ff00]' : 'text-green-600'} size={32} />
           </div>
        </div>
        <div className="space-y-6">
           <h3 className={`font-embroidery text-5xl italic leading-tight ${night ? 'text-[#00ff00]' : 'text-white'}`}>{title}</h3>
           <p className={`text-sm max-w-sm font-medium leading-relaxed ${night ? 'text-[#00ff00]/60' : 'text-gray-300'}`}>{desc}</p>
           <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase">
                 <span className="opacity-40">Tier Completion</span>
                 <span className={night ? 'text-[#00ff00]' : 'text-green-600'}>{progress}%</span>
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${night ? 'bg-[#00ff00]/10' : 'bg-white/10'}`}>
                 <motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} className={`h-full ${night ? 'bg-[#00ff00]' : 'bg-green-600'}`} />
              </div>
           </div>
           <div className={`border p-5 rounded-2xl backdrop-blur-md ${night ? 'bg-[#00ff00]/5 border-[#00ff00]/20' : 'bg-white/5 border-white/10'}`}>
              <span className={`block text-[8px] font-black uppercase mb-1 ${night ? 'text-[#00ff00]/40' : 'text-green-600'}`}>Mission Reward</span>
              <span className={night ? 'text-[#00ff00]' : 'text-white font-bold'}>{prize}</span>
           </div>
           <button onClick={onJoin} className={`w-full font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest transition-all ${night ? 'bg-[#00ff00] text-black' : 'bg-white text-black hover:bg-green-600 hover:text-white'}`}>Join Expedition Handshake</button>
        </div>
     </div>
  </div>
);

const SightingNode = ({ label, count, active, night, onClick }: any) => (
  <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
     <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center mb-4 transition-all ${
        active 
          ? (night ? 'bg-[#00ff00]/20 border-[#00ff00] animate-pulse' : 'bg-green-600/20 border-green-600 animate-pulse') 
          : (night ? 'bg-black border-[#00ff00]/10' : 'bg-white/5 border-white/10')
     }`}>
        <PawPrint size={24} className={active ? (night ? 'text-[#00ff00]' : 'text-green-600') : (night ? 'text-[#00ff00]/20' : 'text-gray-600')} />
     </div>
     <span className={`block font-black text-xs uppercase mb-1 ${night ? 'text-[#00ff00]' : 'text-white'}`}>{label}</span>
     <span className={`text-[9px] font-black uppercase ${night ? 'text-[#00ff00]/40' : 'text-gray-500'}`}>{count} Assets Pinned</span>
  </div>
);

const ImpactBar = ({ label, percentage, night }: any) => (
  <div className="space-y-2">
     <div className={`flex justify-between text-[9px] font-black uppercase ${night ? 'text-[#00ff00]/60' : 'text-green-400'}`}>
        <span>{label}</span>
        <span>{percentage}%</span>
     </div>
     <div className={`h-1 rounded-full overflow-hidden ${night ? 'bg-[#00ff00]/10' : 'bg-white/5'}`}>
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${percentage}%` }} className={`h-full ${night ? 'bg-[#00ff00] shadow-[0_0_10px_#00ff00]' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'}`} />
     </div>
  </div>
);

const TechStat = ({ icon, label, val, night }: any) => (
  <div className={`p-4 rounded-3xl border flex items-center gap-4 group transition-all ${
     night 
       ? 'bg-[#001100] border-[#00ff00]/10 hover:bg-[#00ff00]/5 hover:border-[#00ff00]/40' 
       : 'bg-gray-50 border-gray-100 hover:bg-green-50 hover:border-green-100'
  }`}>
     <div className={`${night ? 'text-[#00ff00]' : 'text-green-600'} group-hover:scale-110 transition-transform`}>{icon}</div>
     <div>
        <span className={`block text-[8px] font-black uppercase leading-none mb-1 ${night ? 'text-[#00ff00]/40' : 'text-gray-400'}`}>{label}</span>
        <span className={`text-[10px] font-bold uppercase leading-none ${night ? 'text-[#00ff00]' : 'text-gray-900'}`}>{val}</span>
     </div>
  </div>
);

export default WildlifeHub;