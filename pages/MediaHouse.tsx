// DO add comment above each fix.
// Fixed missing 'Shield' icon import from lucide-react.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Download, Lock, CheckCircle2, Globe, MapPin, 
  ShieldAlert, Radio, Search, Filter, Settings, 
  Server, FileText, Bell, Users, Plus, Star, 
  Video, Maximize2, RefreshCcw, Smartphone, 
  ChevronRight, Trash2, Layers, Map, Shield
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_NEWS_BOUNTIES, MOCK_NEWS_CLIPS, CURRENCY_SYMBOLS } from '../constants';
import { Photo } from '../types';
import VerificationBadge from '../components/VerificationBadge';

const MediaHouse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wire' | 'bounties' | 'b-roll' | 'settings'>('wire');
  const [tickerMsg, setTickerMsg] = useState('PROTESTS IN NAIROBI CBD - 14 PHOTOGRAPHERS ACTIVE');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [watermark, setWatermark] = useState<'none' | 'NTV' | 'Citizen' | 'BBC'>('none');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulated live refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const toggleSelect = (id: string) => {
    setSelectedPhotos(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    return selectedPhotos.length * 5000; // Mock flat rate for media
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 -mt-6 -mx-4 md:-mx-0 flex flex-col md:flex-row font-mono">
      {/* LEFT SIDEBAR: Command Controls */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col gap-10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Radio size={24} className="text-white animate-pulse" />
            </div>
            <div className="font-bungee text-lg leading-none">
              NEWSROOM<br/><span className="text-red-600 text-xs">COMMAND CENTER</span>
            </div>
          </div>

          <nav className="space-y-2">
            <SidebarBtn icon={<Radio/>} label="Live Wire" active={activeTab === 'wire'} onClick={() => setActiveTab('wire')} />
            <SidebarBtn icon={<Star/>} label="Bounties" active={activeTab === 'bounties'} onClick={() => setActiveTab('bounties')} />
            <SidebarBtn icon={<Video/>} label="Video B-Roll" active={activeTab === 'b-roll'} onClick={() => setActiveTab('b-roll')} />
            <SidebarBtn icon={<Settings/>} label="FTP Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </nav>
        </div>

        {/* Heat Map Mini Widget */}
        <div className="bg-[#111] p-4 rounded-2xl border border-white/5">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase text-gray-500">Live Heatmap</span>
              <Map size={14} className="text-red-600" />
           </div>
           <div className="aspect-square bg-red-600/5 rounded-xl border border-red-600/20 relative overflow-hidden">
              {/* Stylized dots for photographers */}
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-600 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-red-600 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <Globe size={100} />
              </div>
           </div>
           <button className="w-full mt-4 text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors">Dispatch Photographers</button>
        </div>

        <div className="mt-auto p-4 bg-white/5 rounded-xl">
           <span className="block text-[8px] font-black text-gray-500 uppercase mb-2">Editor Account</span>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-800" />
              <div className="text-[10px] font-bold">Zainab J. (NTV) <VerificationBadge type="media" size={12} /></div>
           </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Ticker */}
        <div className="h-10 bg-red-600 text-white flex items-center px-4 overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center font-black text-xs uppercase tracking-[0.2em]"
          >
            {[1,2,3].map(i => (
              <span key={i} className="flex items-center gap-4">
                <ShieldAlert size={14} /> {tickerMsg}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Action Header */}
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-8">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">
                  {activeTab === 'wire' ? 'MEDIA WIRE' : activeTab.toUpperCase()}
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase mt-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   {MOCK_PHOTOS.length} Assets Available Today
                </div>
              </div>
              <div className="hidden lg:flex gap-4">
                <FilterChip label="Latest" active />
                <FilterChip label="Exclusive" />
                <FilterChip label="Verified" />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                 <input 
                   type="text" 
                   placeholder="SEARCH WIRE..." 
                   className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold outline-none focus:border-red-600 transition-all w-64"
                 />
              </div>
              <button 
                onClick={handleRefresh}
                className={`p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCcw size={18} />
              </button>
           </div>
        </header>

        {/* CONTENT SWITCHER */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           {activeTab === 'wire' && (
             <div className="space-y-6">
                {MOCK_PHOTOS.map((photo) => (
                  <NewsCard 
                    key={photo.id} 
                    photo={photo} 
                    isSelected={selectedPhotos.includes(photo.id)}
                    onSelect={() => toggleSelect(photo.id)}
                    watermark={watermark}
                  />
                ))}
             </div>
           )}

           {activeTab === 'bounties' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MOCK_NEWS_BOUNTIES.map(bounty => (
                  <div key={bounty.id} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">{bounty.location}</span>
                       <div className="text-right">
                          <span className="text-2xl font-bungee text-white">KSH {bounty.reward.toLocaleString()}</span>
                          <span className="block text-[8px] text-gray-500 font-black uppercase">LIVE BOUNTY</span>
                       </div>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-600 transition-colors">{bounty.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-10">{bounty.description}</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-8">
                       <div className="flex items-center gap-2 text-xs font-bold">
                          <Users size={16} className="text-gray-500" />
                          <span>12 Bidders Active</span>
                       </div>
                       <button className="bg-white text-black font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest">Commission Now</button>
                    </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'b-roll' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_NEWS_CLIPS.map(clip => (
                  <div key={clip.id} className="bg-[#111] rounded-[2rem] overflow-hidden border border-white/5 group">
                     <div className="aspect-video relative overflow-hidden bg-black">
                        <img src={clip.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-700" alt="" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                              <Video size={20} className="text-white" />
                           </div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-[10px] font-black bg-red-600 text-white px-2 py-1 rounded">
                           {clip.duration}
                        </div>
                     </div>
                     <div className="p-6">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-1">{clip.title}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{clip.photographer} • {clip.location}</p>
                        <button className="w-full mt-6 bg-white/5 border border-white/10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download B-Roll</button>
                     </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'settings' && (
             <div className="max-w-2xl bg-[#111] p-10 rounded-[3rem] border border-white/5">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">NEWSROOM INTEGRATIONS</h3>
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <Server size={24} className="text-red-600" />
                        <div>
                           <span className="block font-bold">Direct FTP Server</span>
                           <span className="text-[10px] text-gray-500 uppercase">Auto-upload purchased assets</span>
                        </div>
                      </div>
                      <button className="text-red-600 font-black text-[10px] uppercase tracking-widest">Configure</button>
                   </div>
                   <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <Smartphone size={24} className="text-red-600" />
                        <div>
                           <span className="block font-bold">SMS Wire Alerts</span>
                           <span className="text-[10px] text-gray-500 uppercase">Keywords: Protests, Election</span>
                        </div>
                      </div>
                      <div className="flex bg-gray-900 rounded-lg p-1">
                         <button className="bg-red-600 px-3 py-1 text-[10px] font-black uppercase rounded">ON</button>
                         <button className="px-3 py-1 text-[10px] font-black uppercase">OFF</button>
                      </div>
                   </div>
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
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-6 rounded-[2.5rem] shadow-2xl flex items-center gap-10 z-50 border-[6px] border-red-600"
            >
               <div className="flex items-center gap-6 border-r border-gray-200 pr-10">
                  <div className="flex -space-x-4">
                    {selectedPhotos.slice(0, 3).map(id => (
                      <img key={id} src={MOCK_PHOTOS.find(p=>p.id===id)?.url} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />
                    ))}
                    {selectedPhotos.length > 3 && (
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-black">+{selectedPhotos.length-3}</div>
                    )}
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Selection</span>
                    <span className="text-xl font-black">{selectedPhotos.length} IMAGES</span>
                  </div>
               </div>

               <div className="flex items-center gap-8">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">Sub-Total</span>
                    <span className="text-xl font-bungee">KSH {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                     <button onClick={() => setSelectedPhotos([])} className="p-4 bg-gray-100 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all">
                        <Trash2 size={20} />
                     </button>
                     <button onClick={() => setShowInvoiceModal(true)} className="bg-red-600 text-white font-black px-10 py-4 rounded-2xl flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-red-200">
                        <Download size={20} /> BULK LICENSE
                     </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* RIGHT SIDE PANEL: Metadata & Tools */}
      <aside className="w-full md:w-80 bg-[#0a0a0a] border-l border-white/5 p-6 space-y-8">
         <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Layers size={14} className="text-red-600" /> Newsroom Tools
            </h3>
            <div className="space-y-4">
               <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block">Watermark Preview</label>
                  <div className="grid grid-cols-2 gap-2">
                     {['None', 'NTV', 'Citizen', 'BBC'].map(m => (
                       <button 
                         key={m} 
                         onClick={() => setWatermark(m.toLowerCase() as any)}
                         className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase border ${watermark === m.toLowerCase() ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-white/10 text-gray-500'}`}
                       >
                         {m}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="pt-4 border-t border-white/5">
                  <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                     <div className="flex items-center gap-3">
                        <Maximize2 size={16} className="text-gray-500 group-hover:text-red-600" />
                        <span className="text-[10px] font-bold uppercase">Image Enhance</span>
                     </div>
                     <ChevronRight size={14} className="text-gray-600" />
                  </button>
               </div>
            </div>
         </div>

         <div className="bg-red-600/5 p-6 rounded-2xl border border-red-600/20">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-6 flex items-center gap-2">
               <ShieldAlert size={14} /> AI Fact-Checker
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-400">Authenticity Score</span>
                  <span className="text-green-500">98% Verified</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[98%]" />
               </div>
               <p className="text-[9px] text-gray-500 leading-relaxed italic">
                 "No prior instances of this image found in the global media database. GPS metadata matches Nairobi CBD."
               </p>
            </div>
         </div>

         <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Recent News Activity</h3>
            {MOCK_NEWS_BOUNTIES.map(b => (
               <div key={b.id} className="flex gap-4 p-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] font-bold text-gray-300">New Bounty: {b.title}</span>
                    <span className="text-[9px] text-gray-600 uppercase">2 mins ago</span>
                  </div>
               </div>
            ))}
         </div>
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield size={200} />
         </div>
      </aside>

      {/* MODAL: LICENSING & INVOICE */}
      <AnimatePresence>
         {showInvoiceModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white rounded-[3rem] shadow-2xl overflow-hidden max-w-2xl w-full text-black"
             >
                <div className="bg-red-600 p-8 text-white flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <FileText size={24} />
                      <h3 className="font-embroidery text-3xl italic">EDITORIAL LICENSE</h3>
                   </div>
                   <button onClick={() => setShowInvoiceModal(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><Trash2 size={24}/></button>
                </div>
                <div className="p-10 space-y-8">
                   <div className="border-b border-gray-100 pb-8">
                      <div className="flex justify-between items-start mb-4">
                         <div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bill To</span>
                            <h4 className="font-bold text-xl">Nation Media Group PLC <VerificationBadge type="media" size={18} /></h4>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice #</span>
                            <h4 className="font-bold">PZ-77192-2024</h4>
                         </div>
                      </div>
                      <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl">
                         <span className="font-bold text-gray-500">{selectedPhotos.length} x High-Res Editorial Assets</span>
                         <span className="font-bungee text-2xl">KES {calculateTotal().toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3 text-green-600">
                         <CheckCircle2 size={18} />
                         <p className="text-[10px] font-bold uppercase tracking-widest">Instant Tax-Ready KRA Invoice Included</p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed italic">
                        By clicking "Complete Purchase", you agree to the regional editorial license terms. Assets will be automatically synced to your designated FTP server.
                      </p>
                   </div>

                   <button 
                     onClick={() => setShowInvoiceModal(false)}
                     className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-all text-xs uppercase tracking-widest"
                   >
                     Complete Corporate Purchase
                   </button>
                </div>
             </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

// Fix: Use React.FC to allow React-specific props like 'key'
interface NewsCardProps {
  photo: Photo;
  isSelected: boolean;
  onSelect: () => void;
  watermark: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ photo, isSelected, onSelect, watermark }) => {
  const timeAgo = Math.floor(Math.random() * 60) + 1;
  const isVerified = (photo.authenticityScore || 0) > 90;

  return (
    <div 
      className={`group flex gap-8 p-6 bg-[#111] border rounded-[2rem] transition-all cursor-pointer ${isSelected ? 'border-red-600 bg-red-600/5' : 'border-white/5 hover:border-white/10'}`}
      onClick={onSelect}
    >
      <div className="w-64 h-48 bg-black rounded-2xl overflow-hidden shrink-0 relative">
        <img src={photo.url} className="w-full h-full object-cover opacity-80" alt="" />
        {watermark !== 'none' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
             <span className="text-white font-black text-4xl italic rotate-12">{watermark.toUpperCase()}</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2">
           <MapPin size={12} className="text-red-600" />
           <span className="text-[9px] font-black uppercase text-white tracking-widest">Lat: {photo.lat}</span>
        </div>
      </div>

      <div className="flex-1 py-2 flex flex-col">
        <div className="flex justify-between items-start mb-4">
           <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{photo.location}</span>
                <span className="text-gray-500 text-[10px] font-black uppercase">{timeAgo} MINS AGO</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                {photo.title} {isVerified && <VerificationBadge type="photographer" size={16} />}
              </h3>
           </div>
           {isVerified && (
             <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full border border-green-500/20">
                <ShieldAlert size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Verified Spot</span>
             </div>
           )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          Breaking coverage of the {photo.title} event. Photographed by {photo.photographer} with a credibility score of {photo.credibilityScore}%.
        </p>

        <div className="mt-auto flex items-center justify-between">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                 <Radio size={14} /> <span>{Math.floor(Math.random()*100)} Views</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                 <Smartphone size={14} /> <span>Editorial</span>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors">Exclusive Rights: KSH 50,000</button>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-red-600 border-red-600 text-white' : 'border-white/20'}`}>
                {isSelected && <CheckCircle2 size={16} />}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SidebarBtn = ({icon, label, active, onClick}: {icon: any, label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest border ${
      active 
        ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-900/40' 
        : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

const FilterChip = ({label, active}: {label: string, active?: boolean}) => (
  <button className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${active ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}>
    {label}
  </button>
);

export default MediaHouse;