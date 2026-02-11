
import React, { useState, useRef, useMemo } from 'react';
import { 
  Plus, Wallet, Layers, Award, Briefcase, Trash2, 
  Image as ImageIcon, MapPin, X, Loader2, CloudUpload,
  Zap, Database, UserPlus, Calendar, Smartphone, Mail,
  CheckCircle, ShieldCheck, Globe, ShoppingCart, LayoutGrid,
  Users, Info, Tag, Search, Filter, PieChart, BarChart3,
  TrendingUp, ArrowRight, ArrowDownWideEqual, CalendarDays,
  RefreshCcw, ArrowUpDown, Edit3, Camera, Upload, Share2
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
  const { user, updateBio, updateGear, updateAvatar, updateBanner } = useUserStore();
  const { vaults, addVault } = useVaultStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const [activeTab, setActiveTab] = useState<'vaults' | 'portfolio' | 'insights' | 'about'>('vaults');
  const [isNewVaultOpen, setIsNewVaultOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

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
    { name: 'Sports', value: 45000, color: '#E31E24' },
    { name: 'Fashion', value: 32000, color: '#000000' },
    { name: 'Wildlife', value: 18000, color: '#22c55e' },
    { name: 'Street', value: 47500, color: '#f59e0b' },
  ];

  const handleImageUpload = (type: 'avatar' | 'banner', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        if (type === 'avatar') updateAvatar(url);
        else updateBanner(url);
        showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} synchronized with node.`, "success");
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="min-h-screen bg-[#050505] text-white pb-32">
      
      {/* 1. BRANDED HEADER WITH BANNER & AVATAR */}
      <header className="relative w-full mb-24">
         {/* Cover Banner */}
         <div className="h-64 md:h-96 w-full relative bg-zinc-900 overflow-hidden">
            <img 
              src={user?.banner || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80'} 
              className="w-full h-full object-cover opacity-60" 
              alt="Banner" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            
            <input type="file" ref={bannerInputRef} className="hidden" onChange={(e) => handleImageUpload('banner', e)} accept="image/*" />
            <button 
              onClick={() => bannerInputRef.current?.click()}
              className="absolute top-8 right-8 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white hover:bg-red-600 transition-all z-20 group"
            >
               <Camera size={20} className="group-hover:scale-110 transition-transform" />
            </button>
         </div>

         {/* Profile Identity Overlap */}
         <div className="max-w-7xl mx-auto px-6 relative -mt-20 md:-mt-32 z-30">
            <div className="flex flex-col md:flex-row items-end gap-8">
               <div className="relative group">
                  <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3.5rem] border-8 border-[#050505] bg-[#050505] p-2 shadow-2xl overflow-hidden relative">
                     <img src={user?.avatar} className="w-full h-full object-cover rounded-[2.8rem]" alt="Profile" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={32} className="text-white" />
                     </div>
                     <input type="file" ref={avatarInputRef} className="hidden" onChange={(e) => handleImageUpload('avatar', e)} accept="image/*" />
                     <button 
                       onClick={() => avatarInputRef.current?.click()}
                       className="absolute inset-0 z-10"
                     />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white p-3 rounded-2xl shadow-xl border-4 border-[#050505]">
                    <ShieldCheck size={20} />
                  </div>
               </div>

               <div className="flex-1 mb-4">
                  <div className="flex items-center gap-4 mb-2">
                     <h1 className="font-embroidery text-5xl md:text-7xl italic leading-none">{user?.name.toUpperCase()}</h1>
                     <VerificationBadge type="photographer" size="lg" />
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                     <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                        <MapPin size={14} className="text-red-600" /> {user?.location}
                     </div>
                     <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                        <Award size={14} className="text-red-600" /> Node Rank #12
                     </div>
                     <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest">
                        <Zap size={14} fill="currentColor" /> 98% AUTHENTICITY
                     </div>
                  </div>
               </div>

               <div className="flex gap-4 mb-4">
                  <button className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-red-600 transition-all">
                     <Share2 size={24} />
                  </button>
                  <button className="bg-red-600 text-white font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-white hover:text-red-600 transition-all text-xs uppercase tracking-widest">
                     PUBLIC GALLERY
                  </button>
               </div>
            </div>
         </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* FINANCIAL SUMMARY */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-black border-2 border-red-600/20 rounded-[3rem] p-10 relative overflow-hidden group hover:border-red-600/50 transition-all shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(227,30,36,0.4)]">
                       <Wallet size={32} />
                    </div>
                    <h2 className="font-embroidery text-3xl italic text-white uppercase tracking-tighter">LIQUIDITY <span className="text-red-600">ARCHIVE</span></h2>
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div>
                       <span className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Unlocked Payouts (99% Share)</span>
                       <h2 className="text-7xl font-bungee text-white leading-none">142,500 <span className="text-sm text-red-600">KES</span></h2>
                    </div>
                    <button 
                      onClick={handleWithdraw}
                      className="bg-white text-black font-black px-12 py-6 rounded-full text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl"
                    >
                       Withdraw via M-Pesa STK
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
                 <span className="text-[10px] font-black uppercase text-gray-500">KRA Invoices</span>
                 <span className="font-bungee text-xl text-red-600">42</span>
              </div>
           </div>
        </section>

        {/* TABS */}
        <div className="flex flex-wrap bg-white/5 p-2 rounded-[2.5rem] border border-white/10 w-fit gap-2">
           <TabButton active={activeTab === 'vaults'} label="Client Vaults" onClick={() => setActiveTab('vaults')} />
           <TabButton active={activeTab === 'portfolio'} label="Global Portfolio" onClick={() => setActiveTab('portfolio')} />
           <TabButton active={activeTab === 'insights'} label="Analytics" onClick={() => setActiveTab('insights')} />
           <TabButton active={activeTab === 'about'} label="Identity Node" onClick={() => setActiveTab('about')} />
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
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">CLIENT <span className="text-red-600">VAULTS</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Bit-perfect archival synchronization active.</p>
                  </div>
                  <button 
                    onClick={() => setIsNewVaultOpen(true)}
                    className="bg-red-600 text-white font-black px-12 py-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3"
                  >
                    <Plus size={20} /> INITIALIZE SECURE VAULT
                  </button>
              </div>

              {/* VAULT SEARCH TERMINAL */}
              <div className="bg-white/5 p-4 rounded-[2rem] border border-white/10 flex items-center gap-4 max-w-2xl">
                 <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="SCAN NODES BY CLIENT NAME OR ID..."
                      className="w-full bg-black border border-white/10 rounded-xl pl-12 pr-10 py-3 text-[10px] font-black uppercase outline-none focus:border-red-600 transition-all"
                      value={vaultSearch}
                      onChange={(e) => setVaultSearch(e.target.value)}
                    />
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
                   <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No client nodes match query.</p>
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
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">PORTFOLIO <span className="text-red-600">MESH</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Displaying verified high-res assets to the global market.</p>
                  </div>
                  <button 
                    onClick={() => showToast("Dispatching upload link...", "info")}
                    className="bg-red-600 text-white font-black px-12 py-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center gap-3"
                  >
                    <CloudUpload size={20} /> INGEST NEW ASSET
                  </button>
              </div>

              {/* ENHANCED PORTFOLIO FILTERS */}
              <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 flex flex-wrap items-center gap-4">
                 <div className="relative flex-1 min-w-[200px] group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={16} />
                    <input 
                      type="text" 
                      placeholder="FILTER BY ASSET ID..."
                      className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-[10px] font-black uppercase outline-none focus:border-red-600 transition-all"
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
                   <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No assets match search criteria.</p>
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
                    <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">MARKET <span className="text-red-600">INSIGHTS</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Real-time revenue performance analysis node.</p>
                  </div>
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
                     <TrendingUp size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest">+12.4% Revenue Growth</span>
                  </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10">
                    <h3 className="text-xl font-black uppercase tracking-widest mb-10">Revenue per Sector</h3>
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
                    <InsightMetricCard icon={<BarChart3 className="text-red-600" />} label="Dominant Sector" val="STREET / URBAN" sub="45,000 KES LIQUIDITY" />
                    <InsightMetricCard icon={<Zap className="text-red-600" />} label="Node Velocity" val="1.4 ASSETS / DAY" sub="SYNC_SPEED_OPTIMAL" />
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
                  <h2 className="font-embroidery text-6xl italic text-white uppercase leading-none">NODE <span className="text-red-600">IDENTITY</span></h2>
                  <button 
                    onClick={() => isEditingAbout ? saveAboutChanges() : setIsEditingAbout(true)}
                    className="bg-white text-black font-black px-12 py-5 rounded-full text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-3"
                  >
                    {isEditingAbout ? <CheckCircle size={18} /> : <Edit3 size={18} />}
                    {isEditingAbout ? 'SYNC IDENTITY' : 'UPDATE PROFILE'}
                  </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-[3.5rem] border border-white/10 group">
                       <div className="flex items-center gap-3 mb-6">
                          <Edit3 size={20} className="text-red-600" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Professional Mission</h4>
                       </div>
                       {isEditingAbout ? (
                         <textarea 
                           className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-white font-medium outline-none focus:border-red-600 min-h-[150px] resize-none"
                           value={editData.bio}
                           onChange={e => setEditData({...editData, bio: e.target.value})}
                         />
                       ) : (
                         <p className="text-lg font-medium leading-relaxed text-gray-300 italic">
                            "{user?.biography || 'No professional bio dispatched.'}"
                         </p>
                       )}
                    </div>

                    <div className="bg-white/5 p-8 rounded-[3.5rem] border border-white/10">
                       <div className="flex items-center gap-3 mb-6">
                          <Camera size={20} className="text-red-600" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Sensor Hardware</h4>
                       </div>
                       {isEditingAbout ? (
                         <input 
                           className="w-full bg-black/50 border border-white/10 rounded-2xl p-6 text-sm text-white font-medium outline-none focus:border-red-600"
                           placeholder="Camera, Lenses, Equipment..."
                           value={editData.gear}
                           onChange={e => setEditData({...editData, gear: e.target.value})}
                         />
                       ) : (
                         <div className="p-6 bg-black/30 rounded-2xl border border-white/5 flex items-center gap-6">
                            <div className="p-4 bg-white/5 rounded-xl"><Camera size={24} className="text-gray-500" /></div>
                            <p className="text-sm font-bold uppercase tracking-tight text-white leading-relaxed">
                               {user?.photographyGear || 'Unlisted hardware node.'}
                            </p>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="bg-red-600/5 p-12 rounded-[4rem] border border-red-600/20 relative overflow-hidden group">
                    <ShieldCheck size={300} className="absolute -bottom-20 -right-20 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-8">
                       <h3 className="font-embroidery text-4xl italic text-white uppercase">Network <span className="text-red-600">Verification</span></h3>
                       <div className="space-y-4">
                          <IdentityNode label="KRA Tax Compliance" active />
                          <IdentityNode label="National ID Verification" active />
                          <IdentityNode label="M-Pesa Payout Link" active />
                          <IdentityNode label="30-Year Archive Protocol" active />
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
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className={`bg-white rounded-[3.5rem] shadow-2xl overflow-hidden max-w-2xl w-full text-black transition-colors duration-500 ${isPublic ? 'border-4 border-red-600' : ''}`}
            >
              <div className={`${isPublic ? 'bg-red-600' : 'bg-black'} p-10 text-white flex justify-between items-center transition-colors duration-500`}>
                 <div className="flex items-center gap-4">
                    <Database size={32} />
                    <h3 className="font-embroidery text-4xl italic uppercase leading-none">
                      {isPublic ? 'MARKET NODE' : 'SECURE VAULT'}
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
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isPublic ? 'bg-red-600 text-white' : 'text-gray-400'}`}
                    >
                      Public
                    </button>
                 </div>
              </div>

              <form onSubmit={handleCreateVault} className="p-12 space-y-8">
                 {isPublic ? (
                   <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Collection Title</label>
                        <input 
                          required 
                          className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold text-lg"
                          value={newVaultData.eventTitle}
                          onChange={e => setNewVaultData({...newVaultData, eventTitle: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Hub Sector</label>
                           <select 
                             className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 font-bold appearance-none"
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
                           <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Unit Price (KES)</label>
                           <input 
                             type="number"
                             className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 font-bold"
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
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Client Identity</label>
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
                  className={`w-full text-white font-black py-6 rounded-full shadow-2xl transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] ${isPublic ? 'bg-red-600 shadow-red-900/30' : 'bg-black shadow-gray-900/30'} hover:scale-105 active:scale-95`}
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
    className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
  >
    {label}
  </button>
);

const InsightMetricCard = ({ icon, label, val, sub }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-6 hover:bg-white/10 transition-all group">
     <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-red-600/50 transition-colors">
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
