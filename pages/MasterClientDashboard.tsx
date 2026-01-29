import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, History, Heart, Download, Printer, 
  ScanFace, FileText, Filter, Star, Clock, 
  Smartphone, CheckCircle, X, ChevronRight,
  ShieldCheck, Wallet, MoreVertical, Pin, Bell,
  MessageCircle, Activity, LayoutGrid, Package
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS } from '../constants';
import { Photo, Vault } from '../types';
import { useToastStore } from '../store/useAppStore';
import ProtectedImage from '../components/ProtectedImage';

type DashboardTab = 'browsing' | 'archive' | 'history' | 'notifications';

const MasterClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('browsing');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [purchasedAssetIds, setPurchasedAssetIds] = useState<string[]>(['1', 'sp1']); // Simulated initial purchases
  const [pinnedVaults, setPinnedVaults] = useState<string[]>(['v1']);
  const [showInvoice, setShowInvoice] = useState<any | null>(null);
  const showToast = useToastStore((state) => state.showToast);

  // Filter Logic for Purchased Photos
  const myPhotos = MOCK_PHOTOS.filter(p => purchasedAssetIds.includes(p.id));

  const handleAiSearch = () => {
    setIsAiScanning(true);
    showToast("Initializing Neural Face Scan...", "info");
    setTimeout(() => {
      setIsAiScanning(false);
      showToast("Scan Complete: Found matches in 3 regional vaults.", "success");
    }, 4000);
  };

  const handleDownload = (photo: Photo) => {
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `Pichazangu_${photo.id}_HQ.jpg`;
    link.click();
    showToast(`Downloading: ${photo.title}`, "success");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-32 font-sans selection:bg-[#E63946]">
      
      {/* 1. COMMAND HEADER */}
      <header className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#E63946]">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Client Terminal</span>
            </div>
            <h1 className="font-embroidery text-6xl md:text-8xl italic uppercase leading-none">
              MASTER <span className="text-[#E63946]">DASHBOARD</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E63946]" size={18} />
                <input 
                  type="text" 
                  placeholder="SEARCH VAULTS, PROS, OR CONTACTS..."
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-[#E63946] transition-all font-bold text-xs uppercase tracking-widest"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <button 
              onClick={handleAiSearch}
              className="bg-[#E63946] text-white p-4 rounded-2xl shadow-xl hover:bg-white hover:text-black transition-all group relative overflow-hidden"
             >
                <ScanFace size={24} className="relative z-10" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
             </button>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-1.5 mt-8 bg-white/5 p-1.5 rounded-full w-fit overflow-x-auto scrollbar-hide max-w-full">
          <TabBtn active={activeTab === 'browsing'} label="Browsing Activity" onClick={() => setActiveTab('browsing')} />
          <TabBtn active={activeTab === 'archive'} label="My Photo Vault" onClick={() => setActiveTab('archive')} />
          <TabBtn active={activeTab === 'history'} label="Purchase History" onClick={() => setActiveTab('history')} />
          <TabBtn active={activeTab === 'notifications'} label="Inbox" onClick={() => setActiveTab('notifications')} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: RECENT BROWSING */}
          {activeTab === 'browsing' && (
            <motion.section 
              key="browsing"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                   <Clock size={20} className="text-[#E63946]" /> CONTINUE BROWSING
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_VAULTS.map(vault => (
                  <RecentVaultCard 
                    key={vault.id} 
                    vault={vault} 
                    isPinned={pinnedVaults.includes(vault.id)}
                    onPin={() => {
                      setPinnedVaults(prev => prev.includes(vault.id) ? prev.filter(id => id !== vault.id) : [...prev, vault.id]);
                      showToast(pinnedVaults.includes(vault.id) ? "Vault Unpinned" : "Vault Pinned to Top", "info");
                    }}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* TAB 2: BENTO ARCHIVE */}
          {activeTab === 'archive' && (
            <motion.section 
              key="archive"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                   <Heart size={20} className="text-[#E63946]" /> MY ARCHIVE
                </h3>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{myPhotos.length} SECURE ASSETS</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                {myPhotos.map((photo, i) => (
                  <BentoPhotoCard 
                    key={photo.id} 
                    photo={photo} 
                    index={i} 
                    onDownload={() => handleDownload(photo)}
                    onPrint={() => showToast("Sending to Print Service...", "info")}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* TAB 3: PURCHASE HISTORY */}
          {activeTab === 'history' && (
            <motion.section 
              key="history"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    <tr className="text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/10">
                      <th className="px-8 py-6">Transaction Date</th>
                      <th className="px-8 py-6">Vault Context</th>
                      <th className="px-8 py-6 text-center">Assets</th>
                      <th className="px-8 py-6 text-right">Total KES</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { date: '22 May 2024', vault: 'Wild Safari Expedition', count: 4, total: 6000 },
                      { date: '15 May 2024', vault: 'Nairobi Fashion Week', count: 1, total: 1500 },
                      { date: '08 May 2024', vault: 'Personal Studio - Ali Command', count: 12, total: 14200 },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-6 font-bold text-sm">{row.date}</td>
                        <td className="px-8 py-6 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{row.vault}</td>
                        <td className="px-8 py-6 text-center font-bungee text-red-600">{row.count}</td>
                        <td className="px-8 py-6 text-right font-bungee text-xl">{row.total.toLocaleString()}</td>
                        <td className="px-8 py-6 text-right">
                           <button 
                            onClick={() => setShowInvoice(row)}
                            className="bg-white text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all shadow-lg"
                           >
                             Download Receipt
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <motion.section 
              key="notifications"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-4"
            >
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                     <Bell size={20} className="text-[#E63946]" /> SYSTEM INBOX
                  </h3>
                  <button className="text-[10px] font-black text-gray-500 uppercase hover:text-white">Mark all read</button>
               </div>
               
               <NotificationItem 
                  icon={<Package size={20} className="text-green-500" />}
                  title="Asset Processed"
                  text="High-res original for 'Serengeti Sunrise' is now available in your archive."
                  time="12m ago"
                  unread
               />
               <NotificationItem 
                  icon={<Wallet size={20} className="text-blue-500" />}
                  title="STK Handshake Confirmed"
                  text="Your M-Pesa payment of KES 1,500 has been verified by Safaricom node."
                  time="2h ago"
               />
               <NotificationItem 
                  icon={<MessageCircle size={20} className="text-red-500" />}
                  title="New Bid Alert"
                  text="Nation Media has placed a bid on your 'City Streets' commission."
                  time="Yesterday"
               />
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* MODALS REMAIN THE SAME */}
      <AnimatePresence>
        {showInvoice && (
           <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white text-black rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col"
             >
                <div className="bg-[#E63946] p-10 text-white flex justify-between items-start">
                   <div>
                      <h2 className="font-embroidery text-5xl italic leading-none mb-1 uppercase">OFFICIAL RECEIPT</h2>
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-[0.4em]">Pichazangu Licensing v1.2</p>
                   </div>
                   <button onClick={() => setShowInvoice(null)} className="p-2 bg-black/20 rounded-full hover:bg-black/40"><X size={24}/></button>
                </div>
                
                <div className="p-12 space-y-8 flex-1">
                   <div className="flex justify-between border-b-2 border-gray-100 pb-8">
                      <div>
                         <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Transaction Ref</span>
                         <span className="font-bold text-sm tracking-tighter">PZ_TXN_99281726</span>
                      </div>
                      <div className="text-right">
                         <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Status</span>
                         <span className="text-green-600 font-black text-xs uppercase tracking-widest">KRA COMPLIANT</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Vault Name</span>
                         <span className="font-bold text-sm uppercase">{showInvoice.vault}</span>
                      </div>
                      <div className="flex justify-between items-end">
                         <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Asset Count</span>
                         <span className="font-bold text-sm uppercase">{showInvoice.count} Units</span>
                      </div>
                      <div className="pt-6 border-t-2 border-gray-100 flex justify-between items-center">
                         <span className="text-lg font-black uppercase">GRAND TOTAL</span>
                         <span className="font-bungee text-4xl text-[#E63946]">KES {showInvoice.total.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="p-6 bg-gray-50 rounded-2xl flex items-center gap-4">
                      <Smartphone size={32} className="text-[#E63946]" />
                      <div>
                         <span className="block text-[8px] font-black text-gray-400 uppercase">Payment Channel</span>
                         <span className="text-xs font-bold uppercase tracking-widest">M-PESA STK PUSH (Verified)</span>
                      </div>
                   </div>
                </div>

                <div className="p-10 border-t border-gray-100 bg-gray-50 flex gap-4">
                   <button 
                    onClick={() => {
                      showToast("Receipt saved to device", "success");
                      setShowInvoice(null);
                    }}
                    className="flex-1 bg-black text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-gray-400/20"
                   >
                     SAVE TO DEVICE
                   </button>
                   <button className="px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-black hover:bg-gray-100 transition-all"><Printer size={20} /></button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const NotificationItem = ({ icon, title, text, time, unread = false }: any) => (
  <div className={`p-6 rounded-3xl border transition-all flex items-start gap-5 cursor-pointer ${unread ? 'bg-white/10 border-red-600/30 ring-1 ring-red-600/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
     <div className="mt-1">{icon}</div>
     <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
           <h4 className="font-bold text-sm uppercase">{title}</h4>
           <span className="text-[8px] font-black text-gray-500 uppercase">{time}</span>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase">{text}</p>
     </div>
     {unread && <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />}
  </div>
);

const TabBtn: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-[#E63946] text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
  >
    {label}
  </button>
);

const RecentVaultCard: React.FC<{ vault: Vault, isPinned: boolean, onPin: () => void }> = ({ vault, isPinned, onPin }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="relative aspect-square bg-[#111] border border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-xl overflow-hidden group"
  >
    <div className="w-20 h-20 rounded-full border-4 border-white/5 p-1 mb-4 group-hover:border-[#E63946]/40 transition-colors">
       <img src={vault.clientAvatar} className="w-full h-full object-cover rounded-full" alt="" />
    </div>
    <h4 className="font-embroidery text-xl uppercase tracking-tighter truncate w-full">{vault.clientName}</h4>
    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Accessed: {vault.lastUpdated}</p>
    
    <button 
      onClick={(e) => { e.stopPropagation(); window.location.href=`#/gallery/${vault.id}`; }}
      className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all"
    >
      Re-Enter Vault
    </button>

    <button 
      onClick={onPin}
      className={`absolute top-4 right-4 p-2 rounded-xl transition-all ${isPinned ? 'bg-[#E63946] text-white shadow-lg' : 'bg-white/5 text-gray-600 hover:bg-white/10'}`}
    >
       <Pin size={14} className={isPinned ? 'fill-current' : ''} />
    </button>
  </motion.div>
);

const BentoPhotoCard: React.FC<{ photo: Photo, index: number, onDownload: () => void, onPrint: () => void }> = ({ photo, index, onDownload, onPrint }) => {
  const isLarge = index % 5 === 0;
  const isTall = index % 7 === 0;

  return (
    <motion.div 
      className={`relative rounded-[2rem] overflow-hidden border border-white/10 group ${isLarge ? 'md:col-span-2' : ''} ${isTall ? 'md:row-span-2' : ''}`}
    >
      <ProtectedImage src={photo.url} photographerName={photo.photographer} isPurchased={true} />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col p-6">
         <div className="flex justify-between items-start">
            <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10" title="Editorial License Active">
               <FileText size={16} className="text-[#E63946]" />
            </div>
            <div className="flex flex-col gap-2">
               <button onClick={onDownload} className="p-3 bg-white text-black rounded-xl hover:bg-[#E63946] hover:text-white transition-all"><Download size={18} /></button>
               <button onClick={onPrint} className="p-3 bg-black/60 backdrop-blur-md text-white rounded-xl hover:bg-white hover:text-black transition-all border border-white/10"><Printer size={18} /></button>
            </div>
         </div>
         <div className="mt-auto">
            <h5 className="font-bold text-sm uppercase truncate mb-1">{photo.title}</h5>
            <span className="text-[8px] font-black text-[#E63946] uppercase tracking-widest">Vault ID: {photo.matchId || 'Z-X9'}</span>
         </div>
      </div>
    </motion.div>
  );
};

export default MasterClientDashboard;