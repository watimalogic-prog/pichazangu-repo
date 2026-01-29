import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DO add comment above each fix.
// Integrated AI-Negotiator for high-stakes exclusive deals.
import { 
  Zap, Download, Lock, CheckCircle2, Globe, MapPin, 
  ShieldAlert, Radio, Search, Filter, Settings, 
  Server, FileText, Bell, Users, Plus, Star, 
  Video, Maximize2, RefreshCcw, Smartphone, 
  ChevronRight, Trash2, Layers, Map, Shield,
  X, Loader2, Send, Terminal, AlertTriangle,
  Play, Clock, Bot
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_NEWS_BOUNTIES, MOCK_NEWS_CLIPS, CURRENCY_SYMBOLS } from '../constants';
import { Photo } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import { useToastStore, useThemeStore, useUserStore } from '../store/useAppStore';
import AiNegotiator from '../components/AiNegotiator';

const MediaHouse: React.FC = () => {
  const showToast = useToastStore((state) => state.showToast);
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<'wire' | 'bounties' | 'b-roll' | 'settings'>('wire');
  const [tickerMsg, setTickerMsg] = useState('PROTESTS IN NAIROBI CBD - 14 PHOTOGRAPHERS ACTIVE');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [watermark, setWatermark] = useState<'none' | 'NTV' | 'Citizen' | 'BBC'>('none');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Negotiation State
  const [negotiatingPhoto, setNegotiatingPhoto] = useState<Photo | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'exclusive' | 'verified'>('all');
  
  // Settings State
  const [ftpEnabled, setFtpEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [showFtpConfig, setShowFtpConfig] = useState(false);

  // Bounties State
  const [bounties, setBounties] = useState(MOCK_NEWS_BOUNTIES);
  const [showBountyModal, setShowBountyModal] = useState(false);

  // Derived News Wire Data
  const filteredPhotos = useMemo(() => {
    return MOCK_PHOTOS.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            photo.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeFilter === 'all' || 
                              (activeFilter === 'exclusive' && photo.isIPPO) ||
                              (activeFilter === 'verified' && (photo.authenticityScore || 0) > 90);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeFilter]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setTickerMsg(`LIVE UPDATE: ${Math.floor(Math.random() * 20 + 5)} NEW ASSETS INGESTED FROM ${['MOMBASA', 'KAMPALA', 'ELDORET'][Math.floor(Math.random()*3)]}`);
      showToast("Satellite Link Re-synced", "success");
    }, 1200);
  };

  const handlePostBounty = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newBounty = {
      id: `nb-${Date.now()}`,
      title: formData.get('title') as string,
      reward: Number(formData.get('reward')),
      location: formData.get('location') as string,
      deadline: 'Today',
      description: formData.get('description') as string
    };
    setBounties([newBounty, ...bounties]);
    setShowBountyModal(false);
    showToast("Bounty Broadcasted to Network", "success");
  };

  const handleBulkPurchase = () => {
    setShowInvoiceModal(false);
    setSelectedPhotos([]);
    showToast(`${selectedPhotos.length} assets synced to FTP server.`, "success");
  };

  const toggleSelect = (id: string) => {
    setSelectedPhotos(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    return selectedPhotos.length * 5000; 
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 -mt-6 -mx-4 md:-mx-0 flex flex-col md:flex-row font-mono selection:bg-red-600">
      
      {/* LEFT SIDEBAR: Command Controls */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col gap-10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Radio size={24} className="text-white animate-pulse" />
            </div>
            <div className="font-bungee text-lg leading-none">
              NEWSROOM<br/><span className="text-red-600 text-[10px] font-black uppercase tracking-widest">COMMAND</span>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarBtn icon={<Radio/>} label="Live Wire" active={activeTab === 'wire'} onClick={() => setActiveTab('wire')} />
            <SidebarBtn icon={<Star/>} label="Bounties" active={activeTab === 'bounties'} onClick={() => setActiveTab('bounties')} />
            <SidebarBtn icon={<Video/>} label="Video B-Roll" active={activeTab === 'b-roll'} onClick={() => setActiveTab('b-roll')} />
            <SidebarBtn icon={<Settings/>} label="Sync Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        {/* Heat Map Widget */}
        <div className="bg-[#111] p-5 rounded-[2rem] border border-white/5 group">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase text-gray-500">Node Activity</span>
              <Map size={14} className="text-red-600 group-hover:animate-bounce" />
           </div>
           <div 
             onClick={() => showToast("Region Cluster: Nairobi CBD • 14 Active Pros", "info")}
             className="aspect-square bg-red-600/5 rounded-2xl border border-red-600/20 relative overflow-hidden cursor-crosshair"
            >
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-600 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                 <Globe size={120} />
              </div>
           </div>
           <button 
            onClick={() => setActiveTab('bounties')}
            className="w-full mt-4 text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors"
          >
            Dispatch Bounties
          </button>
        </div>

        <div className="mt-auto p-4 bg-white/5 rounded-xl border border-white/5">
           <span className="block text-[8px] font-black text-gray-500 uppercase mb-2">Editor Session</span>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800 border border-white/10" />
              <div className="text-[9px] font-bold truncate">Zainab J. (Nation Media)</div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* News Ticker */}
        <div className="h-10 bg-red-600 text-white flex items-center px-4 overflow-hidden whitespace-nowrap border-b border-black">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 items-center font-black text-[10px] uppercase tracking-[0.2em]"
          >
            {[1,2,3,4].map(i => (
              <span key={i} className="flex items-center gap-4">
                <ShieldAlert size={14} /> {tickerMsg}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Command Header */}
        <header className="p-8 border-b border-white/5 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#080808]">
           <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
                  {activeTab === 'wire' ? 'MEDIA WIRE' : activeTab === 'bounties' ? 'MISSION HUB' : activeTab.toUpperCase()}
                </h1>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase mt-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   Satellite Link: Stable • {filteredPhotos.length} Nodes Online
                </div>
              </div>
              <div className="flex gap-2">
                <FilterChip label="All" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
                <FilterChip label="Exclusive" active={activeFilter === 'exclusive'} onClick={() => setActiveFilter('exclusive')} />
                <FilterChip label="Verified" active={activeFilter === 'verified'} onClick={() => setActiveFilter('verified')} />
              </div>
           </div>

           <div className="flex items-center gap-3">
              <div className="relative group flex-1 xl:w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" size={16} />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="SCAN WIRE..." 
                   className="bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-[10px] font-black outline-none focus:border-red-600 transition-all w-full text-white uppercase tracking-widest"
                 />
              </div>
              <button 
                onClick={handleRefresh}
                className={`p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-red-600 transition-all group ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCcw size={18} className="group-hover:text-white" />
              </button>
           </div>
        </header>

        {/* CONTENT SWITCHER */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           {activeTab === 'wire' && (
             <div className="space-y-4">
                {filteredPhotos.length > 0 ? (
                  filteredPhotos.map((photo) => (
                    <NewsCard 
                      key={photo.id} 
                      photo={photo} 
                      isSelected={selectedPhotos.includes(photo.id)}
                      onSelect={() => toggleSelect(photo.id)}
                      onNegotiate={() => setNegotiatingPhoto(photo)}
                      watermark={watermark}
                    />
                  ))
                ) : (
                  <div className="py-32 text-center">
                     <Search size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
                     <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No assets match your current scan.</p>
                  </div>
                )}
             </div>
           )}

           {activeTab === 'bounties' && (
             <div className="space-y-10">
                <div className="flex justify-between items-center bg-red-600/5 p-8 rounded-[2.5rem] border border-red-600/20">
                   <div>
                      <h2 className="text-2xl font-black uppercase mb-1">Open Assignments</h2>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Broadcast urgent media needs to local pros.</p>
                   </div>
                   <button 
                    onClick={() => setShowBountyModal(true)}
                    className="bg-red-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-red-900/40 hover:bg-white hover:text-red-600 transition-all text-xs uppercase tracking-widest flex items-center gap-3"
                   >
                     <Plus size={18} /> INITIALIZE BOUNTY
                   </button>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                   {bounties.map(bounty => (
                     <div key={bounty.id} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all group relative overflow-hidden">
                       <div className="flex justify-between items-start mb-6">
                          <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">{bounty.location}</span>
                          <div className="text-right">
                             <span className="text-2xl font-bungee text-white">KSH {bounty.reward.toLocaleString()}</span>
                             <span className="block text-[8px] text-gray-500 font-black uppercase mt-1">ESTIMATED PAYOUT</span>
                          </div>
                       </div>
                       <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-600 transition-colors">{bounty.title}</h3>
                       <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">{bounty.description}</p>
                       <div className="flex items-center justify-between border-t border-white/5 pt-8">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                             <Users size={16} className="text-red-600" />
                             <span>{Math.floor(Math.random()*15)+3} Bidders Active</span>
                          </div>
                          <button 
                            onClick={() => showToast(`Dispatching ${bounty.title} request...`, "info")}
                            className="bg-white text-black font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
                          >
                            Recruit Pro
                          </button>
                       </div>
                       <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none -rotate-12 group-hover:rotate-0 transition-transform">
                          <Zap size={150} />
                       </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'b-roll' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_NEWS_CLIPS.map(clip => (
                  <div key={clip.id} className="bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 group">
                     <div className="aspect-video relative overflow-hidden bg-black">
                        <img src={clip.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-1000" alt="" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center border-4 border-black shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                              <Play size={24} className="text-white ml-1" />
                           </div>
                        </div>
                        <div className="absolute top-4 right-4 text-[10px] font-black bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/10">
                           {clip.duration}
                        </div>
                     </div>
                     <div className="p-8">
                        <h4 className="font-black text-white uppercase tracking-wider mb-2">{clip.title}</h4>
                        <div className="flex items-center gap-2 mb-6">
                           <MapPin size={12} className="text-red-600" />
                           <span className="text-[9px] font-black text-gray-500 uppercase">{clip.location}</span>
                        </div>
                        <button 
                          onClick={() => showToast("Syncing B-Roll to Newsroom Server", "success")}
                          className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg"
                        >
                          Push to Live Gallery
                        </button>
                     </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'settings' && (
             <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
                <div className="bg-[#111] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
                   <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
                     <Terminal size={24} className="text-red-600" /> SYSTEM INTEGRATIONS
                   </h3>
                   <div className="space-y-8">
                      <div className="flex items-center justify-between p-8 bg-black/40 rounded-[2.5rem] border border-white/10">
                         <div className="flex items-center gap-6">
                           <div className={`p-4 rounded-2xl ${ftpEnabled ? 'bg-red-600/10 text-red-600' : 'bg-gray-800 text-gray-500'}`}>
                             <Server size={32} />
                           </div>
                           <div>
                              <span className="block font-black text-lg text-white">Direct FTP Gateway</span>
                              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Automatic ingestion of licensed assets</p>
                           </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <button 
                              onClick={() => setShowFtpConfig(true)}
                              className="text-red-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                            >
                              Configure
                            </button>
                            <button 
                              onClick={() => {setFtpEnabled(!ftpEnabled); showToast(ftpEnabled ? "FTP Gateway Disabled" : "FTP Gateway Online", "info");}}
                              className={`w-14 h-7 rounded-full relative transition-colors ${ftpEnabled ? 'bg-red-600' : 'bg-gray-800'}`}
                            >
                               <motion.div 
                                 animate={{ x: ftpEnabled ? 30 : 4 }}
                                 className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg" 
                               />
                            </button>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-8 bg-black/40 rounded-[2.5rem] border border-white/10">
                         <div className="flex items-center gap-6">
                           <div className={`p-4 rounded-2xl ${smsAlerts ? 'bg-red-600/10 text-red-600' : 'bg-gray-800 text-gray-500'}`}>
                             <Smartphone size={32} />
                           </div>
                           <div>
                              <span className="block font-black text-lg text-white">Emergency SMS Alerts</span>
                              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Dispatch alerts for local news peaks</p>
                           </div>
                         </div>
                         <button 
                            onClick={() => {setSmsAlerts(!smsAlerts); showToast(smsAlerts ? "SMS Alerts Silent" : "SMS Alerts Active", "info");}}
                            className={`w-14 h-7 rounded-full relative transition-colors ${smsAlerts ? 'bg-red-600' : 'bg-gray-800'}`}
                          >
                             <motion.div 
                               animate={{ x: smsAlerts ? 30 : 4 }}
                               className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg" 
                             />
                          </button>
                      </div>
                   </div>
                </div>

                <div className="bg-red-600/5 p-10 rounded-[3rem] border border-red-600/20">
                   <div className="flex items-center gap-4 mb-6">
                      <Shield size={32} className="text-red-600" />
                      <h4 className="text-xl font-black uppercase">Editorial Security</h4>
                   </div>
                   <p className="text-gray-500 text-sm leading-relaxed mb-8">
                      Your Media House account is protected by hardware-level encryption. All downloads include a digital provenance certificate for legal compliance.
                   </p>
                   <button 
                    onClick={() => showToast("Security Logs Exported", "info")}
                    className="text-red-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline"
                   >
                     Audit Access Logs <ChevronRight size={14}/>
                   </button>
                </div>
             </div>
           )}
        </div>

        {/* Floating Bulk Action Bar */}
        <AnimatePresence>
          {selectedPhotos.length > 0 && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-10 py-6 rounded-[3rem] shadow-2xl flex items-center gap-12 z-50 border-[6px] border-red-600"
            >
               <div className="flex items-center gap-8 border-r border-gray-200 pr-10">
                  <div className="flex -space-x-4">
                    {selectedPhotos.slice(0, 3).map(id => (
                      <img key={id} src={MOCK_PHOTOS.find(p=>p.id===id)?.url} className="w-12 h-12 rounded-full border-2 border-white object-cover" alt="" />
                    ))}
                    {selectedPhotos.length > 3 && (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-900 text-white flex items-center justify-center text-xs font-black">+{selectedPhotos.length-3}</div>
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Newsroom Selection</span>
                    <span className="text-2xl font-black">{selectedPhotos.length} ASSETS</span>
                  </div>
               </div>

               <div className="flex items-center gap-10">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Editorial Sub-Total</span>
                    <span className="text-2xl font-bungee text-red-600">KSH {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex gap-3">
                     <button 
                      onClick={() => {setSelectedPhotos([]); showToast("Selection Purged", "info");}} 
                      className="p-5 bg-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all"
                      title="Clear Selection"
                     >
                        <Trash2 size={24} />
                     </button>
                     <button 
                      onClick={() => setShowInvoiceModal(true)} 
                      className="bg-red-600 text-white font-black px-12 py-5 rounded-[1.8rem] flex items-center gap-3 hover:bg-black transition-all shadow-2xl shadow-red-200 text-xs uppercase tracking-widest"
                     >
                        <Download size={22} /> ACQUIRE EDITORIAL LICENSE
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RIGHT SIDE PANEL: Metadata & Tools */}
      <aside className="w-full md:w-80 bg-[#0a0a0a] border-l border-white/5 p-8 space-y-10">
         <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
               <Layers size={14} className="text-red-600" /> NEWSROOM TOOLS
            </h3>
            <div className="space-y-6">
               <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase mb-4 block tracking-widest">Watermark Preview</label>
                  <div className="grid grid-cols-2 gap-2">
                     {['None', 'NTV', 'Citizen', 'BBC'].map(m => (
                       <button 
                         key={m} 
                         onClick={() => setWatermark(m.toLowerCase() as any)}
                         className={`px-3 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${watermark === m.toLowerCase() ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-transparent border-white/10 text-gray-600 hover:text-white hover:border-white/20'}`}
                       >
                         {m}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5 space-y-3">
                  <ToolBtn icon={<Maximize2/>} label="Asset Upscale (4K)" onClick={() => showToast("Enhancing resolution...", "info")} />
                  <ToolBtn icon={<FileText/>} label="Export Metadata (XML)" onClick={() => showToast("Downloading sidecar file...", "success")} />
               </div>
            </div>
         </div>

         <div className="bg-red-600/5 p-8 rounded-[2.5rem] border border-red-600/20 relative overflow-hidden group">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-8 flex items-center gap-2">
               <ShieldAlert size={16} className="animate-pulse" /> AI FACT-CHECKER
            </h3>
            <div className="space-y-6 relative z-10">
               <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className="text-gray-400">Satellite Verif.</span>
                  <span className="text-green-500">98.2% Accurate</span>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: '98%' }} className="h-full bg-green-500" />
               </div>
               <p className="text-[9px] text-gray-500 leading-relaxed italic font-medium">
                 "Ingested metadata matches regional cellular pings. Pixel signature unique to local sensor node."
               </p>
               <button 
                onClick={() => showToast("Deep Scan Triggered...", "info")}
                className="w-full py-3 bg-red-600/10 text-red-600 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] border border-red-600/20 hover:bg-red-600 hover:text-white transition-all"
               >
                 Trigger Forensic Scan
               </button>
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2 mb-6">NEWS ACTIVITY STREAM</h3>
            <div className="space-y-6">
              {[
                { time: '2m', text: 'New Bounty: Eldoret Protest' },
                { time: '8m', text: 'Sarah Lens uploaded 4 Exclusive assets' },
                { time: '14m', text: 'Citizen TV licensed "CBD Nightlife"' }
              ].map((activity, i) => (
                 <div key={i} className="flex gap-4 p-2 group cursor-pointer hover:bg-white/5 rounded-xl transition-all">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0 shadow-lg shadow-red-900/40" />
                    <div>
                      <span className="block text-[10px] font-black text-gray-300 group-hover:text-red-600 transition-colors leading-tight">{activity.text}</span>
                      <span className="text-[8px] text-gray-600 uppercase font-bold tracking-widest">{activity.time} ago</span>
                    </div>
                 </div>
              ))}
            </div>
         </div>
      </aside>

      {/* NEGOTIATION MODAL */}
      <AnimatePresence>
        {negotiatingPhoto && user && (
          <AiNegotiator 
            photo={negotiatingPhoto} 
            user={user} 
            onClose={() => setNegotiatingPhoto(null)} 
          />
        )}
      </AnimatePresence>

      {/* MODAL: LICENSING & INVOICE */}
      <AnimatePresence>
         {showInvoiceModal && (
           <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white text-black rounded-[4rem] shadow-2xl overflow-hidden max-w-2xl w-full text-black"
             >
                <div className="bg-red-600 p-10 text-white flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <FileText size={32} />
                      <h3 className="font-embroidery text-4xl italic uppercase">EDITORIAL LICENSE</h3>
                   </div>
                   <button onClick={() => setShowInvoiceModal(false)} className="hover:bg-black/20 p-3 rounded-full transition-colors"><X size={28}/></button>
                </div>
                <div className="p-12 space-y-10">
                   <div className="border-b border-gray-100 pb-10">
                      <div className="flex justify-between items-start mb-8">
                         <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Bill To Organization</span>
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Nation Media Group PLC <VerificationBadge type="media" size={20} /></h4>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Invoice Identity</span>
                            <h4 className="font-black text-xl">#PZ-2024-WIRE</h4>
                         </div>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                         <div>
                            <span className="block font-black text-lg">{selectedPhotos.length} Global Media Assets</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Multi-Platform Editorial Rights Included</span>
                         </div>
                         <span className="font-bungee text-3xl text-red-600">KES {calculateTotal().toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="flex items-center gap-4 text-green-600">
                         <CheckCircle2 size={24} />
                         <p className="text-[11px] font-black uppercase tracking-widest">KRA-READY DIGITAL TAX RECEIPT GENERATED</p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed italic font-medium">
                        "Confirmation triggers immediate high-res extraction. Assets are cleared for broadcast and print within the East African sector."
                      </p>
                   </div>

                   <button 
                     onClick={handleBulkPurchase}
                     className="w-full bg-black text-white font-black py-6 rounded-[2.5rem] shadow-2xl hover:bg-red-600 transition-all text-sm uppercase tracking-[0.2em]"
                   >
                     EXECUTE CORPORATE PURCHASE
                   </button>
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>

    </div>
  );
};

interface NewsCardProps {
  photo: Photo;
  isSelected: boolean;
  onSelect: () => void;
  onNegotiate: () => void;
  watermark: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ photo, isSelected, onSelect, onNegotiate, watermark }) => {
  const timeAgo = useMemo(() => Math.floor(Math.random() * 60) + 1, []);
  const isVerified = (photo.authenticityScore || 0) > 90;
  const coords = useMemo(() => `LAT: ${photo.lat || '-1.28'}${Math.floor(Math.random()*999)} LONG: ${photo.lng || '36.82'}${Math.floor(Math.random()*999)}`, [photo]);

  return (
    <motion.div 
      layout
      whileHover={{ scale: 1.01 }}
      className={`group flex flex-col md:flex-row gap-8 p-6 bg-[#111] border rounded-[2.5rem] transition-all cursor-pointer ${isSelected ? 'border-red-600 bg-red-600/5 ring-4 ring-red-600/10' : 'border-white/5 hover:border-white/10 shadow-xl'}`}
      onClick={onSelect}
    >
      <div className="w-full md:w-64 h-52 bg-black rounded-2xl overflow-hidden shrink-0 relative">
        <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-80" alt="" />
        {watermark !== 'none' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
             <span className="text-white font-black text-4xl italic rotate-12">{watermark.toUpperCase()}</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10">
           <MapPin size={12} className="text-red-600" />
           <span className="text-[8px] font-black uppercase text-white tracking-widest truncate max-w-[120px]">{coords}</span>
        </div>
        {isSelected && (
           <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
              <CheckCircle2 size={48} className="text-white drop-shadow-2xl" />
           </div>
        )}
      </div>

      <div className="flex-1 py-2 flex flex-col">
        <div className="flex justify-between items-start mb-6">
           <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">{photo.location}</span>
                <span className="text-gray-500 text-[9px] font-black uppercase flex items-center gap-2">
                   <Clock size={10}/> {timeAgo} MINS AGO
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">
                {photo.title} {isVerified && <VerificationBadge type="photographer" size={16} />}
              </h3>
           </div>
           {isVerified && (
             <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-xl border border-green-500/20">
                <ShieldAlert size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Verified Spot</span>
             </div>
           )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
          Source verification complete. Photographed by {photo.photographer} with a regional credibility score of {photo.credibilityScore}%. Digital footprint matches sector node.
        </p>

        <div className="mt-auto flex items-center justify-between">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                 <Radio size={14} className="text-red-600" /> <span>{Math.floor(Math.random()*200)+20} Ingestions</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                 <Smartphone size={14} className="text-red-600" /> <span>Editorial Wire</span>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <button 
                onClick={(e) => { e.stopPropagation(); onNegotiate(); }}
                className="flex items-center gap-2 text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors border-b border-red-600/30"
              >
                <Bot size={12} /> Negotiate Exclusive
              </button>
              <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-red-600 border-red-600 text-white' : 'border-white/10 group-hover:border-white/30'}`}>
                {isSelected && <CheckCircle2 size={16} />}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

// DO add comment above each fix.
// Fixed missing 'SidebarBtn' component definition.
const SidebarBtn = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest border ${
      active 
        ? 'bg-red-600 border-red-600 text-white shadow-lg' 
        : 'bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon} {label}
  </button>
);

// DO add comment above each fix.
// Fixed missing 'FilterChip' component definition.
const FilterChip = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all ${
      active 
        ? 'bg-red-600 border-red-600 text-white shadow-lg' 
        : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/20'
    }`}
  >
    {label}
  </button>
);

// DO add comment above each fix.
// Fixed missing 'ToolBtn' component definition.
const ToolBtn = ({ icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-red-600 hover:border-red-600 transition-all group"
  >
    <div className="text-gray-500 group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-white tracking-widest">{label}</span>
  </button>
);

export default MediaHouse;