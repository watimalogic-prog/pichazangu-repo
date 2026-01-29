import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, Wallet, Layers, Award, Briefcase, Trash2, 
  Image as ImageIcon, MapPin, X, Loader2, CloudUpload,
  Zap, Database, UserPlus, Calendar, Smartphone, Mail,
  CheckCircle, ShieldCheck, Globe, ShoppingCart, LayoutGrid,
  Users, Info, Tag, Search, Filter, PieChart, BarChart3,
  TrendingUp, ArrowRight, ArrowDownWideEqual, CalendarDays,
  RefreshCcw, ArrowUpDown, Edit3, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip, Legend } from 'recharts';
import { useVaultStore, useUserStore, useToastStore } from '../store/useAppStore';
import { MOCK_PHOTOS } from '../constants';
import { Photo, Vault } from '../types';
import VaultCard from '../components/VaultCard';
import PhotoCard from '../components/PhotoCard';
import VerificationBadge from '../components/VerificationBadge';

const PhotographerProfile: React.FC = () => {
  const { user, updateBio, updateGear } = useUserStore();
  const { vaults, addVault } = useVaultStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const [activeTab, setActiveTab] = useState<'vaults' | 'portfolio' | 'insights' | 'about'>('vaults');
  const [isNewVaultOpen, setIsNewVaultOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editData, setEditData] = useState({
    bio: user?.biography || '',
    gear: user?.photographyGear || ''
  });

  // Vault Tab Search State
  const [vaultSearch, setVaultSearch] = useState('');

  // Portfolio Filter State
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedVaultId, setSelectedVaultId] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'price-high' | 'price-low'>('newest');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // New Vault State
  const [newVaultData, setNewVaultData] = useState({
    name: '',
    phone: '',
    date: '',
    location: '',
    email: '',
    eventTitle: '',
    targetScreen: 'Sports' as Vault['targetScreen'],
    pricePerPhoto: 1500
  });

  const myPortfolio = useMemo(() => MOCK_PHOTOS.filter(p => p.photographer === user?.name || p.photographer === 'Ali Studio'), [user?.name]);
  
  const filteredVaults = useMemo(() => {
    if (!vaultSearch) return vaults;
    const query = vaultSearch.toLowerCase();
    return vaults.filter(v => 
      v.clientName.toLowerCase().includes(query) ||
      v.clientPhone.includes(query) ||
      v.clientEmail.toLowerCase().includes(query)
    );
  }, [vaults, vaultSearch]);

  const filteredPortfolio = useMemo(() => {
    let list = myPortfolio.filter(photo => {
      const matchesSearch = photo.title.toLowerCase().includes(portfolioSearch.toLowerCase());
      const matchesTag = selectedTag === 'All' || photo.tags.includes(selectedTag.toLowerCase());
      const matchesVault = selectedVaultId === 'All' || photo.collectionId === selectedVaultId;
      
      if (dateRange !== 'all' && photo.uploadedAt) {
        const uploadDate = new Date(photo.uploadedAt);
        const now = new Date();
        if (dateRange === 'today' && uploadDate.toDateString() !== now.toDateString()) return false;
        if (dateRange === 'week' && (now.getTime() - uploadDate.getTime()) > 7 * 24 * 60 * 60 * 1000) return false;
        if (dateRange === 'month' && (now.getTime() - uploadDate.getTime()) > 30 * 24 * 60 * 60 * 1000) return false;
      }

      return matchesSearch && matchesTag && matchesVault;
    });

    return list.sort((a, b) => {
      const dateA = a.uploadedAt ? new Date(a.uploadedAt).getTime() : 0;
      const dateB = b.uploadedAt ? new Date(b.uploadedAt).getTime() : 0;
      if (sortOrder === 'newest') return dateB - dateA;
      if (sortOrder === 'oldest') return dateA - dateB;
      if (sortOrder === 'price-high') return b.price - a.price;
      if (sortOrder === 'price-low') return a.price - b.price;
      return 0;
    });
  }, [portfolioSearch, selectedTag, selectedVaultId, sortOrder, dateRange, myPortfolio]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    myPortfolio.forEach(p => p.tags.forEach(t => tags.add(t.charAt(0).toUpperCase() + t.slice(1))));
    return Array.from(tags);
  }, [myPortfolio]);

  const revenueData = [
    { name: 'Sports', value: 45000, color: '#E63946' },
    { name: 'Fashion', value: 32000, color: '#000000' },
    { name: 'Wildlife', value: 18000, color: '#22c55e' },
    { name: 'Street', value: 47500, color: '#f59e0b' },
  ];

  const handleCreateVault = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      const vault: Vault = {
        id: `v-${Date.now()}`,
        clientId: isPublic ? 'public-market' : `c-${Date.now()}`,
        clientName: isPublic ? (newVaultData.eventTitle || 'Public Event') : newVaultData.name,
        clientEmail: newVaultData.email,
        clientPhone: newVaultData.phone,
        clientAvatar: isPublic ? 'https://images.unsplash.com/photo-1574629810360-7efbbe195018' : `https://i.pravatar.cc/150?u=${Date.now()}`,
        photographerId: user?.id || 'ph1',
        photographerName: user?.name || 'Ali Command',
        passkey: isPublic ? '' : Math.floor(100000 + Math.random() * 900000).toString(),
        photoCount: 0,
        lastUpdated: new Date().toISOString(),
        shootingDate: newVaultData.date || new Date().toISOString().split('T')[0],
        location: newVaultData.location,
        isPublic: isPublic,
        archiveStatus: 'Active',
        status: isPublic ? 'preview' : 'locked',
        eventName: isPublic ? newVaultData.eventTitle : undefined,
        targetScreen: isPublic ? newVaultData.targetScreen : undefined,
        price: isPublic ? newVaultData.pricePerPhoto : undefined
      };

      addVault(vault);
      setIsProcessing(false);
      setIsNewVaultOpen(false);
      showToast(isPublic ? "Public Market Node Live" : "Secure Private Vault Initialized", "success");
    }, 1500);
  };

  const handleWithdraw = () => {
    showToast("Dispatched M-Pesa STK Push to verified phone...", "info");
    setTimeout(() => showToast("Withdrawal Handshake Confirmed", "success"), 3000);
  };

  const saveAboutChanges = () => {
    updateBio(editData.bio);
    updateGear(editData.gear);
    setIsEditingAbout(false);
    showToast("Profile identity updated", "success");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* FINANCIAL SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-black border-2 border-[#E63946]/20 rounded-[3rem] p-10 relative overflow-hidden group hover:border-[#E63946]/50 transition-all shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-[#E63946] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(230,57,70,0.4)]">
                       <Wallet size={32} />
                    </div>
                    <div className="flex items-center gap-2">
                       <h2 className="font-embroidery text-3xl italic text-white uppercase tracking-tighter">LIQUIDITY <span className="text-[#E63946]">ARCHIVE</span></h2>
                       <VerificationBadge type="photographer" size="md" />
                    </div>
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div>
                       <span className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Unlocked Payouts (99% Share)</span>
                       <h2 className="text-7xl font-bungee text-white leading-none">142,500 <span className="text-sm text-[#E63946]">KES</span></h2>
                    </div>
                    <button 
                      onClick={handleWithdraw}
                      className="bg-white text-black font-black px-12 py-6 rounded-full text-xs uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all shadow-2xl"
                    >
                       Withdraw STK
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 flex flex-col justify-center gap-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-[10px] font-black uppercase text-gray-500">Active Nodes</span>
                 <span className="font-bungee text-xl">{vaults.length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-[10px] font-black uppercase text-gray-500">Global Rank</span>
                 <span className="font-bungee text-xl text-[#E63946]">#12</span>
              </div>
           </div>
        </section>

        {/* TABS */}
        <div className="flex flex-wrap bg-white/5 p-2 rounded-[2.5rem] border border-white/10 w-fit gap-2">
           <TabButton active={activeTab === 'vaults'} label="Vaults" onClick={() => setActiveTab('vaults')} />
           <TabButton active={activeTab === 'portfolio'} label="Portfolio" onClick={() => setActiveTab('portfolio')} />
           <TabButton active={activeTab === 'insights'} label="Market Insights" onClick={() => setActiveTab('insights')} />
           <TabButton active={activeTab === 'about'} label="Identity & Gear" onClick={() => setActiveTab('about')} />
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'vaults' && (
            <motion.section 
              key="vaults"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">MY <span className="text-[#E63946]">VAULTS</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Managing {vaults.length} total nodes</p>
                  </div>
                  <button 
                    onClick={() => setIsNewVaultOpen(true)}
                    className="bg-[#E63946] text-white font-black px-12 py-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3"
                  >
                    <Plus size={20} /> CREATE NEW VAULT
                  </button>
              </div>

              {/* VAULT SEARCH TERMINAL */}
              <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10 flex items-center gap-4 max-w-2xl">
                 <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E63946] transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Find by Name, Phone, or Email..."
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-10 py-3 text-[10px] font-black uppercase outline-none focus:border-[#E63946] transition-all"
                      value={vaultSearch}
                      onChange={(e) => setVaultSearch(e.target.value)}
                    />
                    {vaultSearch && (
                      <button 
                        onClick={() => setVaultSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                         <X size={14} />
                      </button>
                    )}
                 </div>
              </div>

              {filteredVaults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredVaults.map(vault => (
                      <VaultCard key={vault.id} vault={vault} isPublic={vault.isPublic} />
                    ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
                   <Database size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
                   <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No client nodes match your query: "{vaultSearch}"</p>
                   <button onClick={() => setVaultSearch('')} className="mt-4 text-[#E63946] font-black text-[10px] uppercase tracking-widest hover:underline">Clear Search Filter</button>
                </div>
              )}
            </motion.section>
          )}

          {activeTab === 'portfolio' && (
            <motion.section 
              key="portfolio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">MY <span className="text-[#E63946]">PORTFOLIO</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Global Exposure: {filteredPortfolio.length} Assets</p>
                  </div>
                  <button 
                    onClick={() => showToast("Portfolio Upload Terminal Opening...", "info")}
                    className="bg-[#E63946] text-white font-black px-12 py-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3"
                  >
                    <CloudUpload size={20} /> UPLOAD TO PORTFOLIO
                  </button>
              </div>

              {/* ENHANCED PORTFOLIO FILTERS */}
              <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 flex flex-wrap items-center gap-4">
                 <div className="relative flex-1 min-w-[200px] group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E63946]" size={16} />
                    <input 
                      type="text" 
                      placeholder="Title or ID..."
                      className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[10px] font-black uppercase outline-none focus:border-[#E63946] transition-all"
                      value={portfolioSearch}
                      onChange={(e) => setPortfolioSearch(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-2 bg-black border border-white/10 rounded-xl px-3 py-1">
                    <Tag size={14} className="text-gray-500" />
                    <select 
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="bg-transparent border-none py-2 text-[10px] font-black uppercase outline-none text-white cursor-pointer"
                    >
                      {availableTags.map(t => <option key={t} className="bg-black">{t}</option>)}
                    </select>
                 </div>
                 <button 
                  onClick={() => { setPortfolioSearch(''); setSelectedTag('All'); setSortOrder('newest'); setDateRange('all'); }}
                  className="p-3 bg-white/5 hover:bg-red-600 rounded-xl transition-all"
                 >
                    <RefreshCcw size={16} />
                 </button>
              </div>

              {filteredPortfolio.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredPortfolio.map(photo => (
                      <PhotoCard key={photo.id} photo={photo} isPhotographerMode />
                    ))}
                </div>
              ) : (
                <div className="py-32 text-center bg-white/5 rounded-[3rem] border border-white/5">
                   <Filter size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
                   <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No assets match your search criteria.</p>
                </div>
              )}
            </motion.section>
          )}

          {activeTab === 'insights' && (
            <motion.section 
              key="insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
                  <div>
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">MARKET <span className="text-[#E63946]">INSIGHTS</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Real-time revenue performance analysis</p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                     <TrendingUp size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">+12.4% Revenue Growth</span>
                  </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10">
                    <h3 className="text-xl font-black uppercase tracking-widest mb-10">Revenue per Sector (KES)</h3>
                    <div className="w-full h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <RePieChart>
                             <Pie
                                data={revenueData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                             >
                                {revenueData.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                             </Pie>
                             <ReTooltip contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px' }} />
                             <Legend />
                          </RePieChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <InsightMetricCard icon={<BarChart3 className="text-[#E63946]" />} label="Top Sector" val="Street / Urban" sub="45,000 KES this month" />
                    <InsightMetricCard icon={<Zap className="text-[#E63946]" />} label="Market Velocity" val="1.4 Assets / Day" sub="High liquidity detected" />
                 </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'about' && (
            <motion.section 
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
               <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
                  <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">THE <span className="text-[#E63946]">IDENTITY</span></h2>
                  <button 
                    onClick={() => isEditingAbout ? saveAboutChanges() : setIsEditingAbout(true)}
                    className="bg-white text-black font-black px-12 py-5 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all flex items-center gap-3"
                  >
                    {isEditingAbout ? <CheckCircle size={18} /> : <Edit3 size={18} />}
                    {isEditingAbout ? 'SAVE IDENTITY NODE' : 'EDIT PROFILE'}
                  </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 group">
                       <div className="flex items-center gap-3 mb-6">
                          <Edit3 size={20} className="text-[#E63946]" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Professional Bio</h4>
                       </div>
                       {isEditingAbout ? (
                         <textarea 
                           className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-white font-medium outline-none focus:border-[#E63946] min-h-[150px] resize-none"
                           value={editData.bio}
                           onChange={e => setEditData({...editData, bio: e.target.value})}
                         />
                       ) : (
                         <p className="text-lg font-medium leading-relaxed text-gray-300 italic">
                            "{user?.biography || 'No professional bio dispatched.'}"
                         </p>
                       )}
                    </div>

                    <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10">
                       <div className="flex items-center gap-3 mb-6">
                          <Camera size={20} className="text-[#E63946]" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Photography Gear</h4>
                       </div>
                       {isEditingAbout ? (
                         <input 
                           className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-white font-medium outline-none focus:border-[#E63946]"
                           placeholder="Camera, Lenses, Equipment..."
                           value={editData.gear}
                           onChange={e => setEditData({...editData, gear: e.target.value})}
                         />
                       ) : (
                         <div className="p-6 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-6">
                            <div className="p-4 bg-white/5 rounded-xl"><Camera size={24} className="text-gray-500" /></div>
                            <p className="text-sm font-bold uppercase tracking-tight text-white leading-relaxed">
                               {user?.photographyGear || 'Unlisted specialized gear node.'}
                            </p>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="bg-red-600/5 p-12 rounded-[3.5rem] border border-red-600/20 relative overflow-hidden group">
                    <ShieldCheck size={300} className="absolute -bottom-20 -right-20 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-8">
                       <h3 className="font-embroidery text-4xl italic text-white">NETWORK <span className="text-[#E63946]">VERIFIED</span></h3>
                       <div className="space-y-4">
                          <IdentityNode label="Tax Verification" active />
                          <IdentityNode label="Identity Document" active />
                          <IdentityNode label="Phone Link (M-Pesa)" active />
                          <IdentityNode label="30-Year Archive Agreement" active />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* NEW VAULT MODAL */}
      <AnimatePresence>
        {isNewVaultOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className={`bg-white rounded-[3.5rem] shadow-2xl overflow-hidden max-w-2xl w-full text-black transition-colors duration-500 ${isPublic ? 'border-4 border-[#E63946]' : ''}`}
            >
              <div className={`${isPublic ? 'bg-[#E63946]' : 'bg-black'} p-10 text-white flex justify-between items-center transition-colors duration-500`}>
                 <div className="flex items-center gap-4">
                    <Database size={32} />
                    <h3 className="font-embroidery text-4xl italic uppercase leading-none">
                      {isPublic ? 'PUBLIC MARKET NODE' : 'PRIVATE VAULT NODE'}
                    </h3>
                 </div>
                 <button onClick={() => setIsNewVaultOpen(false)} className="hover:bg-black/20 p-3 rounded-full transition-colors"><X size={28}/></button>
              </div>

              <div className="px-12 pt-10 flex justify-center">
                 <div className="bg-gray-100 p-2 rounded-full flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setIsPublic(false)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${!isPublic ? 'bg-black text-white' : 'text-gray-400'}`}
                    >
                      Private
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsPublic(true)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isPublic ? 'bg-[#E63946] text-white' : 'text-gray-400'}`}
                    >
                      Public
                    </button>
                 </div>
              </div>

              <form onSubmit={handleCreateVault} className="p-12 space-y-8">
                 {isPublic ? (
                   <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Event / Collection Title</label>
                        <input 
                          required 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#E63946] transition-all font-bold text-lg"
                          value={newVaultData.eventTitle}
                          onChange={e => setNewVaultData({...newVaultData, eventTitle: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Target Screen</label>
                           <select 
                             className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#E63946] font-bold appearance-none"
                             value={newVaultData.targetScreen}
                             onChange={e => setNewVaultData({...newVaultData, targetScreen: e.target.value as any})}
                           >
                              <option>Sports</option>
                              <option>Fashion</option>
                              <option>Wildlife</option>
                              <option>Street</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Price Per Photo (KES)</label>
                           <input 
                             type="number"
                             className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#E63946] font-bold"
                             value={newVaultData.pricePerPhoto}
                             onChange={e => setNewVaultData({...newVaultData, pricePerPhoto: Number(e.target.value)})}
                           />
                        </div>
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Client Name</label>
                          <input 
                            required 
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-black font-bold"
                            value={newVaultData.name}
                            onChange={e => setNewVaultData({...newVaultData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Phone (M-Pesa)</label>
                          <input 
                            required 
                            placeholder="+254..."
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-black font-bold"
                            value={newVaultData.phone}
                            onChange={e => setNewVaultData({...newVaultData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                   </div>
                 )}
                 <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={`w-full text-white font-black py-6 rounded-full shadow-2xl transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] ${isPublic ? 'bg-[#E63946] shadow-red-900/30' : 'bg-black shadow-gray-900/30'} hover:scale-105 active:scale-95`}
                 >
                    {isProcessing ? <Loader2 size={22} className="animate-spin" /> : <Database size={22} />}
                    {isProcessing ? 'PROVISIONING...' : `INITIALIZE ${isPublic ? 'PUBLIC' : 'PRIVATE'} NODE`}
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabButton = ({ active, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-[#E63946] text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
  >
    {label}
  </button>
);

const InsightMetricCard = ({ icon, label, val, sub }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex items-center gap-6 hover:bg-white/10 transition-all group">
     <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#E63946]/50 transition-colors">
        {icon}
     </div>
     <div>
        <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-xl font-bold uppercase">{val}</span>
        <p className="text-[9px] text-gray-400 font-medium uppercase mt-1">{sub}</p>
     </div>
  </div>
);

const IdentityNode = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5">
     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
     <div className="flex items-center gap-2">
        <span className="text-[9px] font-black text-green-500 uppercase">VERIFIED</span>
        <CheckCircle size={14} className="text-green-500" />
     </div>
  </div>
);

export default PhotographerProfile;