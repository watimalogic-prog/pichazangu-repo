import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DO add comment above each fix.
// Fixed missing 'CheckCircle', 'Plus', and 'Image as ImageIcon' imports from lucide-react.
import { 
  Trophy, Search, Filter, Camera, ShoppingCart, 
  MapPin, Clock, Users, Zap, Shield, Share2, 
  ChevronRight, Play, Info, Target, 
  Dribbble, Flame, X, Download, Heart,
  Dna, Briefcase, Map, Radio, Award, Eye,
  Globe, LayoutGrid, BarChart3, Binary,
  Crosshair, ShieldCheck, Star, Sparkles, Upload,
  Smartphone, Loader2, BarChart, LineChart, ChevronLeft,
  ArrowRight, CheckCircle, Plus, Image as ImageIcon
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_MATCHES, MOCK_PLAYERS, CURRENCY_SYMBOLS } from '../constants';
import { Photo, Match, PlayerStats, Vault } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import VerificationBadge from '../components/VerificationBadge';
import VaultCard from '../components/VaultCard';
import { useCartStore, useVaultStore, useToastStore } from '../store/useAppStore';

type LeagueTier = 'All' | 'KPL' | 'NSL' | 'Div 1' | 'Women';

const SportsHub: React.FC<{ userRole: any }> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'players' | 'bounties' | 'fans' | 'scout'>('feed');
  const [activeLeague, setActiveLeague] = useState<LeagueTier>('All');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTradingCardOpen, setIsTradingCardOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);
  
  // New: Scout Comparison State
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [comparePlayers, setComparePlayers] = useState<PlayerStats[]>([]);

  // New: Fan Cam Upload State
  const [isFanCamOpen, setIsFanCamOpen] = useState(false);
  const [fanCamStep, setFanCamStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const { vaults } = useVaultStore();
  const showToast = useToastStore((state) => state.showToast);

  const leagueTiers: LeagueTier[] = ['All', 'KPL', 'NSL', 'Div 1', 'Women'];

  // Logic: Filter Photos based on search, league, match and tab
  const filteredPhotos = useMemo(() => {
    let list = [...MOCK_PHOTOS].filter(p => p.category === 'Sports' || p.tags.includes('football'));
    
    if (selectedMatchId) {
      list = list.filter(p => p.matchId === selectedMatchId);
    }
    
    if (activeLeague !== 'All') {
      list = list.filter((_, i) => i % 2 === 0);
    }

    if (searchQuery) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.photographer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list;
  }, [searchQuery, activeLeague, selectedMatchId]);

  // Discovery: Find Public Vaults targeting Sports
  const publicVaults = vaults.filter(v => v.isPublic && v.targetScreen === 'Sports');

  const handleMatchClick = (matchId: string) => {
    if (selectedMatchId === matchId) {
      setSelectedMatchId(null);
      showToast("Global Feed Restored", "info");
    } else {
      setSelectedMatchId(matchId);
      const match = MOCK_MATCHES.find(m => m.id === matchId);
      showToast(`Locked to ${match?.homeTeam} vs ${match?.awayTeam}`, "success");
    }
  };

  const toggleCompare = (player: PlayerStats) => {
    setComparePlayers(prev => {
      const alreadyIn = prev.find(p => p.id === player.id);
      if (alreadyIn) return prev.filter(p => p.id !== player.id);
      if (prev.length >= 2) {
        showToast("Maximum 2 players for comparison", "info");
        return prev;
      }
      return [...prev, player];
    });
  };

  const handleFanCamSubmit = () => {
    setIsUploading(true);
    showToast("Extracting GPS & Match Metadata...", "info");
    setTimeout(() => {
      setIsUploading(false);
      setFanCamStep(3);
      showToast("Fan-Cam Asset Authenticated", "success");
    }, 3000);
  };

  const renderScoreboard = () => (
    <div className="bg-[#111] border-b border-red-600/20 overflow-hidden sticky top-16 md:top-20 z-40">
      <div className="flex overflow-x-auto scrollbar-hide py-3 px-4 gap-6 items-center">
        <div className="flex items-center gap-2 px-4 border-r border-white/10 shrink-0">
           <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
           <span className="text-[10px] font-black uppercase text-white tracking-widest">Live Updates</span>
        </div>
        {MOCK_MATCHES.map((match) => (
          <motion.div 
            key={match.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleMatchClick(match.id)}
            className={`shrink-0 flex items-center gap-6 px-6 py-3 rounded-2xl cursor-pointer transition-all border-2 ${
              selectedMatchId === match.id 
                ? 'bg-red-600 border-white text-white' 
                : 'bg-white/5 border-white/10 hover:border-red-600/40 text-gray-200'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className={`text-[9px] font-black uppercase tracking-widest mb-1 ${selectedMatchId === match.id ? 'text-white' : 'text-red-600'}`}>
                {match.status === 'Live' ? match.minute + "'" : match.status}
              </span>
              <span className="text-[10px] font-bold opacity-50">{match.league}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{match.homeTeam}</span>
                <span className={`font-bungee text-lg ${selectedMatchId === match.id ? 'text-white' : 'text-red-600'}`}>{match.homeScore}</span>
              </div>
              <span className="opacity-30 font-bold">-</span>
              <div className="flex items-center gap-2">
                <span className={`font-bungee text-lg ${selectedMatchId === match.id ? 'text-white' : 'text-red-600'}`}>{match.awayScore}</span>
                <span className="font-bold text-sm">{match.awayTeam}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 -mt-6 -mx-4 md:-mx-0">
      {renderScoreboard()}

      <div className="px-6 md:px-12 py-10 space-y-16">
        <header className="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-3 mb-2">
               <Trophy className="text-red-600" size={24} />
               <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Stadium Intelligence Network</span>
            </div>
            <h1 className="font-embroidery text-6xl md:text-8xl leading-none text-white italic">MATCH <span className="text-red-600 font-embroidery-sketch">HUB</span></h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
             <div className="relative flex-1 sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={20} />
                <input 
                  type="text" 
                  placeholder="CLUB OR PLAYER..." 
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-[2rem] outline-none focus:border-red-600/50 transition-all font-bold text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="flex bg-white/5 border border-white/10 rounded-[2rem] p-1">
                {leagueTiers.map(tier => (
                  <button 
                    key={tier}
                    onClick={() => setActiveLeague(tier)}
                    className={`px-4 py-2 rounded-[1.8rem] text-[9px] font-black uppercase tracking-widest transition-all ${activeLeague === tier ? 'bg-red-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tier}
                  </button>
                ))}
             </div>
          </div>
        </header>

        <div className="flex flex-wrap bg-white/5 p-2 rounded-[2.5rem] border border-white/10 w-fit">
           <TabBtn active={activeTab==='feed'} label="Pro Match Feed" onClick={()=>setActiveTab('feed')} />
           <TabBtn active={activeTab==='players'} label="Player Market" onClick={()=>setActiveTab('players')} />
           <TabBtn active={activeTab==='fans'} label="Fan Cam" onClick={()=>setActiveTab('fans')} />
           <TabBtn active={activeTab==='scout'} label="Scout Portal" onClick={()=>setActiveTab('scout')} />
           <TabBtn active={activeTab==='bounties'} label="Bounties" onClick={()=>setActiveTab('bounties')} />
        </div>

        <main className="min-h-[500px]">
           <AnimatePresence mode="wait">
             {/* 1. PRO MATCH FEED */}
             {activeTab === 'feed' && (
               <motion.div 
                 key="feed"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
               >
                 {filteredPhotos.map((photo) => (
                   <SportsPhotoCard key={photo.id} photo={photo} onBuy={() => addItem(photo)} />
                 ))}
               </motion.div>
             )}

             {/* 2. PLAYER MARKET */}
             {activeTab === 'players' && (
               <motion.div 
                 key="players"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               >
                 {MOCK_PLAYERS.map((player) => (
                   <motion.div 
                     layout
                     key={player.id} 
                     whileHover={{ y: -10, rotate: 0.5 }}
                     className="bg-[#1a1a1a] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl group hover:border-red-600/30 transition-all cursor-pointer relative overflow-hidden"
                     onClick={() => { setSelectedPlayer(player); setIsTradingCardOpen(true); }}
                   >
                     <div className="flex gap-6 mb-8 relative z-10">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-red-600 transition-colors bg-black">
                           <img src={player.image} className="w-full h-full object-cover" alt={player.name} />
                        </div>
                        <div>
                           <h3 className="font-embroidery text-3xl text-white italic leading-tight">{player.name}</h3>
                           <p className="text-red-600 font-black text-[10px] uppercase tracking-widest mt-1">{player.team} • #{player.jerseyNumber}</p>
                           <div className="mt-3 flex items-center gap-2">
                              <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-gray-400">{player.position}</span>
                              <div className="flex items-center gap-1 text-yellow-500">
                                 <Star size={10} fill="currentColor" />
                                 <span className="text-[10px] font-black">92% VALUE</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
                        <StatBox label="MATCHES" val={player.matches} />
                        <StatBox label="GOALS" val={player.goals} />
                        <StatBox label="ASSISTS" val={player.assists} />
                     </div>
                     <button className="w-full bg-white/5 border border-white/10 group-hover:bg-red-600 group-hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10 flex items-center justify-center gap-2">
                        <Dna size={14} /> Open Player Vault
                     </button>
                     <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Trophy size={200} />
                     </div>
                   </motion.div>
                 ))}
               </motion.div>
             )}

             {/* 3. FAN CAM TAB */}
             {activeTab === 'fans' && (
               <motion.div 
                 key="fans"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                 className="space-y-12"
               >
                 <div className="bg-red-600/5 p-12 rounded-[4rem] border border-red-600/20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl text-center md:text-left">
                       <h2 className="font-embroidery text-5xl italic text-white mb-4">THE 12TH <span className="text-red-600">MAN</span></h2>
                       <p className="text-gray-400 font-medium text-lg leading-relaxed uppercase">
                         Unfiltered moments from the stands. Lower resolution, pure passion. All assets verified by regional cell-tower metadata.
                       </p>
                    </div>
                    <button onClick={() => setIsFanCamOpen(true)} className="bg-red-600 text-white font-black px-12 py-6 rounded-full text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:bg-white hover:text-black transition-all">
                       <Upload size={20}/> Submit Fan-Cam
                    </button>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {MOCK_PHOTOS.slice(4, 9).map((photo, i) => (
                      <div key={i} className="group relative aspect-square rounded-3xl overflow-hidden bg-[#111] border border-white/5 cursor-pointer">
                         <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] font-black text-black uppercase tracking-widest flex items-center gap-1">
                            <Sparkles size={10} className="text-red-600" /> FAN CONTENT
                         </div>
                         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                            <span className="font-bungee text-sm">KES 500</span>
                            <button onClick={() => addItem(photo)} className="p-2 bg-red-600 rounded-lg hover:bg-white hover:text-red-600 transition-all"><ShoppingCart size={14}/></button>
                         </div>
                      </div>
                    ))}
                 </div>
               </motion.div>
             )}

             {/* 4. SCOUT PORTAL */}
             {activeTab === 'scout' && (
                <motion.div 
                  key="scout"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                   <div className="flex items-center justify-between border-b border-white/5 pb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-xl">
                           <Crosshair size={32} />
                        </div>
                        <div>
                           <h2 className="text-3xl font-black uppercase tracking-tighter">TALENT ANALYTICS</h2>
                           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Identifying Elite Potential across regional tiers</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsCompareMode(!isCompareMode)}
                        className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isCompareMode ? 'bg-white text-black' : 'bg-red-600 text-white'}`}
                      >
                         {isCompareMode ? 'Exit Comparison' : 'Compare Players'}
                      </button>
                   </div>

                   {isCompareMode && comparePlayers.length > 0 && (
                     <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-8 mb-12 bg-white/5 p-10 rounded-[3rem] border border-white/10">
                        {comparePlayers.map(p => (
                          <div key={p.id} className="text-center">
                             <img src={p.image} className="w-24 h-24 rounded-3xl mx-auto mb-4 border-2 border-red-600" alt="" />
                             <h4 className="font-bungee text-xl mb-6">{p.name}</h4>
                             <div className="space-y-4">
                                <CompareStat label="Speed" val={88 + Math.floor(Math.random()*10)} />
                                <CompareStat label="Physique" val={75 + Math.floor(Math.random()*20)} />
                                <CompareStat label="Accuracy" val={92 + Math.floor(Math.random()*5)} />
                             </div>
                          </div>
                        ))}
                        {comparePlayers.length === 1 && <div className="flex items-center justify-center border-2 border-dashed border-white/10 rounded-[2rem] text-gray-600 font-black uppercase text-xs tracking-widest">Select second player</div>}
                     </motion.div>
                   )}

                   <div className="grid grid-cols-1 gap-4">
                      {MOCK_PLAYERS.map(player => (
                        <div key={player.id} className="bg-[#111] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-red-600/30 transition-all">
                           <div className="flex items-center gap-8">
                              <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 overflow-hidden shrink-0">
                                 <img src={player.image} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div>
                                 <span className="text-red-600 font-bungee text-lg">94.2 SCORE</span>
                                 <h3 className="text-xl font-bold uppercase text-white leading-none mt-1">{player.name}</h3>
                              </div>
                           </div>
                           <div className="grid grid-cols-3 gap-8 border-x border-white/5 px-8">
                              <ScoutMetric label="Speed" value="88" />
                              <ScoutMetric label="Agility" value="95" />
                              <ScoutMetric label="Shot Accuracy" value="91" />
                           </div>
                           <div className="flex items-center gap-4">
                              <button 
                                onClick={() => isCompareMode ? toggleCompare(player) : showToast("Scout Data Pack Exported", "success")} 
                                className={`p-4 rounded-2xl transition-all border ${isCompareMode && comparePlayers.find(p=>p.id===player.id) ? 'bg-white text-black' : 'bg-white/5 border-white/10 hover:bg-red-600 hover:text-white'}`}
                              >
                                 {isCompareMode ? (comparePlayers.find(p=>p.id===player.id) ? <CheckCircle size={20}/> : <Plus size={20}/>) : <BarChart3 size={20}/>}
                              </button>
                           </div>
                        </div>
                      ))}
                   </div>
                </motion.div>
             )}

             {/* 5. BOUNTY BOARD */}
             {activeTab === 'bounties' && (
               <motion.div 
                 key="bounties"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-8"
               >
                  {[
                    { id: 'b1', title: "K'Ogalo Fan Cluster", desc: "Wanted: High-res wide shot of the green army in Gor Mahia regalia during the second half.", prize: "KSH 5,000", urgency: 'Normal' },
                    { id: 'b2', title: "NSL Goal Celebration", desc: "Urgent: Need the goal celebration from the 78th minute of the derby at City Stadium.", prize: "KSH 12,000", urgency: 'Flash' },
                    { id: 'b3', title: "Scout Request: Omala", desc: "Wanted: 4k Portrait and action sequence of Benson Omala for international scout pack.", prize: "KSH 25,000", urgency: 'Flash' }
                  ].map((b) => (
                    <div key={b.id} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all group relative overflow-hidden">
                      <div className="flex justify-between items-center mb-6">
                        <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${b.urgency === 'Flash' ? 'bg-red-600 animate-pulse text-white' : 'bg-red-600/40 text-red-600'}`}>
                          {b.urgency} MISSION
                        </div>
                        <span className="font-bungee text-2xl text-white">{b.prize}</span>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-600 transition-colors leading-tight">{b.title}</h3>
                      <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">{b.desc}</p>
                      <button 
                        onClick={() => showToast(`Submit Terminal active for Mission ${b.id}`, "info")}
                        className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                      >
                        Transmit Asset
                      </button>
                    </div>
                  ))}
               </motion.div>
             )}
           </AnimatePresence>
        </main>
      </div>

      {/* FAN CAM UPLOAD MODAL */}
      <AnimatePresence>
         {isFanCamOpen && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[4rem] shadow-2xl max-w-xl w-full text-black overflow-hidden">
                 <div className="bg-red-600 p-10 text-white flex justify-between items-center">
                    <h3 className="font-embroidery text-4xl italic uppercase">FAN-CAM <span className="text-black">INGEST</span></h3>
                    <button onClick={() => { setIsFanCamOpen(false); setFanCamStep(1); }} className="p-3 hover:bg-black/20 rounded-full"><X size={24}/></button>
                 </div>
                 
                 <div className="p-12 space-y-8">
                    <div className="flex gap-2 mb-4">
                       {[1,2,3].map(s => <div key={s} className={`h-1.5 flex-1 rounded-full ${fanCamStep >= s ? 'bg-red-600' : 'bg-gray-100'}`} />)}
                    </div>

                    {fanCamStep === 1 && (
                      <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="space-y-8 text-center">
                         <div className="w-24 h-24 bg-red-600/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-red-600/10">
                            <Smartphone size={40} className="text-red-600" />
                         </div>
                         <h4 className="text-2xl font-black uppercase tracking-tighter">SELECT MEDIA SOURCE</h4>
                         <p className="text-gray-500 font-medium leading-relaxed">Picha Zangu Fan-Cam requires original assets with unstripped metadata for verification.</p>
                         <button onClick={() => setFanCamStep(2)} className="w-full bg-black text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest shadow-xl">BROWSE MOBILE REEL</button>
                      </motion.div>
                    )}

                    {fanCamStep === 2 && (
                      <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="space-y-8">
                         <div className="aspect-video rounded-3xl bg-gray-100 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                            {isUploading ? <Loader2 className="animate-spin text-red-600" size={32}/> : <ImageIcon className="text-gray-300" size={32} />}
                            <span className="mt-4 text-[10px] font-black uppercase text-gray-400">Processing Pixels...</span>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                               <span className="text-[10px] font-black text-gray-400 uppercase">Detected Match</span>
                               <span className="text-xs font-bold">GOR MAHIA VS AFC</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                               <span className="text-[10px] font-black text-gray-400 uppercase">Verified Location</span>
                               <span className="text-xs font-bold text-green-600">NYAYO STADIUM (TRUSTED)</span>
                            </div>
                         </div>
                         <button 
                            disabled={isUploading}
                            onClick={handleFanCamSubmit} 
                            className="w-full bg-red-600 text-white font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"
                         >
                            {isUploading ? 'VERIFYING...' : 'FINALIZE SUBMISSION'}
                         </button>
                      </motion.div>
                    )}

                    {fanCamStep === 3 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10 space-y-6">
                         <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                            <CheckCircle size={40} />
                         </div>
                         <h4 className="text-3xl font-black uppercase tracking-tighter">SUBMISSION LIVE</h4>
                         <p className="text-gray-500 font-medium">Your photo is now available in the Fan-Cam marketplace for KES 500.</p>
                         <button onClick={() => { setIsFanCamOpen(false); setFanCamStep(1); }} className="w-full py-4 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Close Terminal</button>
                      </motion.div>
                    )}
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* TRADING CARD MODAL (Same as Before) */}
      <AnimatePresence>
        {isTradingCardOpen && selectedPlayer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
               animate={{ scale: 1, rotateY: 0, opacity: 1 }}
               exit={{ scale: 0.8, rotateY: -90, opacity: 0 }}
               className="relative w-full max-w-sm aspect-[5/7] bg-gradient-to-br from-red-600 to-red-900 rounded-[3rem] p-1.5 shadow-[0_0_100px_rgba(230,57,70,0.5)] border-4 border-white/20 overflow-hidden"
             >
                <div className="relative h-full bg-[#111] rounded-[2.8rem] flex flex-col p-8 overflow-hidden">
                   <div className="absolute inset-0 bg-white/[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
                   
                   <button onClick={() => setIsTradingCardOpen(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-white/50 hover:text-white z-20"><X size={20}/></button>
                   
                   <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-16 h-16 bg-white p-1 rounded-2xl shadow-xl overflow-hidden">
                         <img src={selectedPlayer.image} className="w-full h-full object-cover rounded-xl" alt="" />
                      </div>
                      <div className="text-right">
                         <span className="block text-red-600 font-bungee text-4xl leading-none">#{selectedPlayer.jerseyNumber}</span>
                         <span className="block text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] mt-1">PICHA ZANGU IDENTITY</span>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
                      <h2 className="font-embroidery text-5xl text-white mb-2 italic uppercase leading-none">{selectedPlayer.name}</h2>
                      <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-10">{selectedPlayer.team}</p>
                      <div className="w-full grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                            <span className="block text-[8px] font-black text-gray-400 uppercase mb-2">SEASON GOALS</span>
                            <span className="text-2xl font-bungee text-white">{selectedPlayer.goals}</span>
                         </div>
                         <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                            <span className="block text-[8px] font-black text-gray-400 uppercase mb-2">SEASON ASSISTS</span>
                            <span className="text-2xl font-bungee text-white">{selectedPlayer.assists}</span>
                         </div>
                      </div>
                   </div>

                   <div className="mt-8 pt-8 border-t border-white/5 flex gap-3 relative z-10">
                      <button 
                        onClick={() => { showToast("Saving High-Res Card...", "success"); setIsTradingCardOpen(false); }}
                        className="flex-1 bg-white text-black font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-xl"
                      >
                        <Download size={14}/> Download
                      </button>
                      <button 
                        onClick={() => { addItem(MOCK_PHOTOS[0]); setIsTradingCardOpen(false); }}
                        className="flex-1 bg-white/5 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10"
                      >
                        <ShoppingCart size={14}/> Licensing
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

// --- SUBCOMPONENTS ---

const SportsPhotoCard: React.FC<{ photo: Photo, onBuy: () => void }> = ({ photo, onBuy }) => {
  const [isLiked, setIsLiked] = useState(false);
  const showToast = useToastStore(s => s.showToast);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/5 shadow-xl hover:border-red-600/30 transition-all flex flex-col h-full"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-black">
        <ProtectedImage src={photo.url} photographerName={photo.photographer} alt={photo.title} />
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-xl z-20">
           <Zap size={12} fill="currentColor" />
           <span className="text-[10px] font-black uppercase tracking-widest">Pro Action</span>
        </div>
        <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
           <button 
             onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); showToast(isLiked ? "Asset Unstarred" : "Asset Starred in Collection", "info"); }} 
             className={`p-3 rounded-2xl backdrop-blur-md transition-all shadow-2xl ${isLiked ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-white hover:text-black border border-white/10'}`}
           >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
           </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
           <div className="flex justify-between items-center mb-6 text-white">
              <div>
                <span className="block text-[8px] font-black text-red-600 uppercase tracking-widest mb-1">Commercial License</span>
                <span className="font-bungee text-2xl">KES {photo.price}</span>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                    <Target size={14} className="text-red-600" /> #{photo.jerseyNumber || '?'}
                 </div>
              </div>
           </div>
           <button 
             onClick={(e) => { e.stopPropagation(); onBuy(); }}
             className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-white hover:text-red-600 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest"
            >
              <ShoppingCart size={18}/> Unlock High-Res Original
           </button>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-embroidery text-2xl text-white mb-2 italic truncate group-hover:text-red-600 transition-colors uppercase leading-tight">{photo.title}</h3>
        <div className="flex justify-between items-center text-gray-500 text-[9px] font-black uppercase tracking-widest mt-auto pt-6 border-t border-white/5">
           <span className="flex items-center gap-1.5"><MapPin size={10} className="text-red-600" /> {photo.location}</span>
           <span className="flex items-center gap-1.5"><Camera size={10} className="text-red-600" /> {photo.photographer}</span>
        </div>
      </div>
    </motion.div>
  );
};

const TabBtn = ({label, active, onClick}: {label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.8rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${active ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-400 hover:text-white'}`}
  >
    {label}
  </button>
);

const StatBox = ({label, val}: {label: string, val: number}) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center group-hover:bg-white group-hover:border-white transition-all">
    <span className="block text-[8px] font-black text-gray-500 uppercase mb-1 group-hover:text-gray-400">{label}</span>
    <span className="text-xl font-bungee text-white group-hover:text-black">{val}</span>
  </div>
);

const ScoutMetric = ({label, value}: {label: string, value: string}) => (
  <div className="text-center">
    <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</span>
    <div className="flex items-center justify-center gap-2">
       <span className="text-lg font-black text-white">{value}</span>
       <div className={`h-2 w-2 rounded-full ${Number(value) > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} />
    </div>
  </div>
);

const CompareStat = ({label, val}: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[10px] font-black uppercase">
        <span className="text-gray-500">{label}</span>
        <span>{val}%</span>
     </div>
     <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ delay: 0.5 }} className="h-full bg-red-600" />
     </div>
  </div>
);

export default SportsHub;