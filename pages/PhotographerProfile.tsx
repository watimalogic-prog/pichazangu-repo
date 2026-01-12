import React, { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, Area, ResponsiveContainer, Tooltip
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Zap, Globe, Search, Filter, 
  BarChart3, Activity, Briefcase, Award, ArrowRight, 
  ShoppingCart, DollarSign, Camera, Newspaper, 
  Maximize2, Share2, Info, ChevronRight, Gavel, 
  ShieldAlert, RefreshCcw, Bell, Layers, Clock, X,
  Wallet, Plus, History, BrainCircuit, ShieldCheck,
  Smartphone, CloudUpload, FileText, Tag, Loader2, Sparkles,
  CheckCircle, Trash2, Image as ImageIcon, Edit3,
  Globe2, Lock
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS } from '../constants';
import { Vault, Photo } from '../types';
import VaultCard from '../components/VaultCard';
import { useToastStore, useUserStore, useThemeStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Stock', 'Sports', 'Fashion', 'Wildlife', 'Media', 'Street', 'Portrait', 'Wedding'];

interface UploadAsset {
  id: string;
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

const PhotographerProfile: React.FC = () => {
  const { user } = useUserStore();
  const showToast = useToastStore((state) => state.showToast);
  const [activeTab, setActiveTab] = useState<'performance' | 'vaults' | 'portfolio' | 'wallet' | 'style'>('performance');
  const [vaultType, setVaultType] = useState<'private' | 'public'>('private');

  // Vault Upload State
  const [uploadToVaultId, setUploadToVaultId] = useState<string | null>(null);
  const [uploadQueue, setUploadQueue] = useState<UploadAsset[]>([]);
  const [isIngesting, setIsIngesting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Portfolio Management State
  const [portfolioPhotos, setPortfolioPhotos] = useState<Photo[]>(
    MOCK_PHOTOS.filter(p => p.photographer === 'Ali Studio')
  );
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const portfolioFileInputRef = useRef<HTMLInputElement>(null);
  const [newPortfolioAsset, setNewPortfolioAsset] = useState<{
    file: File | null;
    preview: string;
    title: string;
    price: number;
    category: string;
    license: 'Commercial' | 'Editorial' | 'Personal';
  }>({
    file: null,
    preview: '',
    title: '',
    price: 1500,
    category: 'Stock',
    license: 'Commercial'
  });

  // Extended simulation of real-time data
  const chartData = [
    { n: 'Mon', s: 4200 }, { n: 'Tue', s: 3800 }, { n: 'Wed', s: 5100 }, 
    { n: 'Thu', s: 4800 }, { n: 'Fri', s: 7200 }, { n: 'Sat', s: 8500 }, { n: 'Sun', s: 6200 }
  ];

  const dashboardVaults: Vault[] = [
    {
      id: 'v-private-1',
      clientId: 'c1',
      clientName: 'Amara Okafor',
      clientEmail: 'amara@example.io',
      clientPhone: '+254 712 000 111',
      clientAvatar: 'https://i.pravatar.cc/150?u=amara',
      photographerId: 'ph1',
      photographerName: 'Ali Command',
      passkey: '882910',
      photoCount: 42,
      lastUpdated: '2024-05-21',
      isPublic: false,
      archiveStatus: 'Active',
      eventName: 'Nairobi Fashion Gala',
      price: 25000,
      status: 'locked'
    },
    {
      id: 'v-private-2',
      clientId: 'c2',
      clientName: 'Kofi Mensah',
      clientEmail: 'kofi@corporate.gh',
      clientPhone: '+254 712 333 444',
      clientAvatar: 'https://i.pravatar.cc/150?u=kofi',
      photographerId: 'ph1',
      photographerName: 'Ali Command',
      passkey: '123456',
      photoCount: 156,
      lastUpdated: '2024-05-20',
      isPublic: false,
      archiveStatus: 'Permanent',
      eventName: 'Tech Summit Day 1',
      price: 120000,
      status: 'paid'
    },
    {
      id: 'v-public-1',
      clientId: 'system',
      clientName: 'Global Market',
      clientEmail: '',
      clientPhone: '',
      clientAvatar: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=100&q=80',
      photographerId: 'ph1',
      photographerName: 'Ali Command',
      passkey: '',
      photoCount: 890,
      lastUpdated: '2024-05-22',
      isPublic: true,
      archiveStatus: 'Active',
      eventName: 'Wildlife Sector',
      price: 1500,
      status: 'preview'
    }
  ];

  const filteredVaults = dashboardVaults.filter(v => 
    vaultType === 'public' ? v.isPublic : !v.isPublic
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    const newAssets: UploadAsset[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      description: "",
      category: 'Stock',
      tags: [],
      progress: 0,
      status: 'pending'
    }));
    setUploadQueue(prev => [...prev, ...newAssets]);
  };

  const startIngestion = async () => {
    if (uploadQueue.length === 0) return;
    setIsIngesting(true);
    for (let i = 0; i < uploadQueue.length; i++) {
      const assetId = uploadQueue[i].id;
      setUploadQueue(prev => prev.map(a => a.id === assetId ? { ...a, status: 'uploading' } : a));
      for (let p = 0; p <= 100; p += 10) {
        setUploadQueue(prev => prev.map(a => a.id === assetId ? { ...a, progress: p } : a));
        await new Promise(r => setTimeout(r, 150));
      }
      setUploadQueue(prev => prev.map(a => a.id === assetId ? { ...a, status: 'complete' } : a));
    }
    showToast(`Successfully synced ${uploadQueue.length} assets to Vault.`, "success");
    setIsIngesting(false);
    setTimeout(() => {
      setUploadQueue([]);
      setUploadToVaultId(null);
    }, 1500);
  };

  const updateAssetMeta = (id: string, updates: Partial<UploadAsset>) => {
    setUploadQueue(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  // Portfolio Handlers
  const handlePortfolioFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPortfolioAsset(prev => ({
        ...prev,
        file,
        preview: URL.createObjectURL(file),
        title: file.name.replace(/\.[^/.]+$/, "")
      }));
    }
  };

  const addToPortfolio = () => {
    if (!newPortfolioAsset.file) return;
    const newPhoto: Photo = {
      id: `p-port-${Date.now()}`,
      url: newPortfolioAsset.preview,
      title: newPortfolioAsset.title,
      photographer: 'Ali Studio',
      price: newPortfolioAsset.price,
      category: newPortfolioAsset.category,
      license: newPortfolioAsset.license,
      tags: [],
      uploadedAt: new Date().toISOString(),
    };
    setPortfolioPhotos(prev => [newPhoto, ...prev]);
    showToast("Added to Public Portfolio", "success");
    setShowAddPortfolioModal(false);
    setNewPortfolioAsset({
      file: null,
      preview: '',
      title: '',
      price: 1500,
      category: 'Stock',
      license: 'Commercial'
    });
  };

  const removePortfolioItem = (id: string) => {
    setPortfolioPhotos(prev => prev.filter(p => p.id !== id));
    showToast("Asset Removed from Portfolio", "info");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 selection:bg-violet-600">
      
      {/* 1. FINANCIAL COMMAND CENTER */}
      <section className="px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 bg-black border-2 border-zinc-800 rounded-[3.5rem] p-12 relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(138,43,226,0.5)]">
                      <Wallet size={32} />
                   </div>
                   <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Node Balance Alpha</span>
                      <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-0.5">Picha Wallet Pro</h4>
                   </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                   <div>
                      <span className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Available for Withdrawal</span>
                      <h2 className="text-7xl font-bungee text-white leading-none">124,580 <span className="text-sm text-violet-500">KES</span></h2>
                   </div>
                   <div className="flex gap-4">
                      <button 
                        onClick={() => showToast("Requesting STK Push for node liquidation...", "info")}
                        className="bg-white text-black font-black px-10 py-5 rounded-[1.5rem] text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all shadow-xl"
                      >
                         Withdraw (M-Pesa)
                      </button>
                      <button className="p-5 bg-zinc-900 rounded-[1.5rem] hover:bg-zinc-800 transition-all border border-zinc-800 text-violet-500">
                         <Plus size={24} />
                      </button>
                   </div>
                </div>
             </div>
             <DollarSign size={250} className="absolute -right-20 -bottom-20 opacity-[0.04] text-white rotate-12 pointer-events-none" />
          </div>

          <StatMiniCard 
            icon={<TrendingUp className="text-green-500" />} 
            label="Total Earnings" 
            val="KES 2.4M" 
            trend="+14% Activity" 
          />
          <StatMiniCard 
            icon={<Camera className="text-violet-500" />} 
            label="Managed Assets" 
            val="3,402" 
            trend="100% Verified" 
          />
        </div>
      </section>

      {/* 2. DUAL-ARCHITECTURE SYSTEM */}
      <section className="px-6 md:px-12 py-10 pb-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
           <div className="flex bg-zinc-900/40 p-2 rounded-[2.5rem] border border-zinc-800/50 backdrop-blur-xl overflow-x-auto scrollbar-hide max-w-full">
              <TabBtn active={activeTab === 'performance'} label="Performance" onClick={() => setActiveTab('performance')} />
              <TabBtn active={activeTab === 'portfolio'} label="Portfolio" onClick={() => setActiveTab('portfolio')} />
              <TabBtn active={activeTab === 'vaults'} label="The Vaults" onClick={() => setActiveTab('vaults')} />
              <TabBtn active={activeTab === 'wallet'} label="Ledger" onClick={() => setActiveTab('wallet')} />
              <TabBtn active={activeTab === 'style'} label="AI Lab" onClick={() => setActiveTab('style')} />
           </div>

           {activeTab === 'vaults' && (
             <div className="flex items-center gap-4 bg-black/40 p-2 rounded-full border border-zinc-800">
                <button 
                  onClick={() => setVaultType('private')}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${vaultType === 'private' ? 'bg-white text-black shadow-lg' : 'text-zinc-600 hover:text-white'}`}
                >
                  Private Tier
                </button>
                <button 
                   onClick={() => setVaultType('public')}
                   className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${vaultType === 'public' ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(138,43,226,0.4)]' : 'text-zinc-600 hover:text-white'}`}
                >
                  Public Market
                </button>
             </div>
           )}
        </div>

        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <motion.div 
                key="portfolio-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h2 className="font-embroidery text-6xl italic uppercase leading-none text-white">
                        Public <span className="text-red-600">Portfolio</span>
                      </h2>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mt-2">Curating {portfolioPhotos.length} masterpiece assets</p>
                    </div>
                    <button 
                      onClick={() => setShowAddPortfolioModal(true)}
                      className="flex items-center gap-4 px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl bg-red-600 hover:bg-red-500 text-white"
                    >
                      <Plus size={20} /> Add New Asset
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                   {portfolioPhotos.map((photo) => (
                     <motion.div 
                        layout
                        key={photo.id}
                        className="group relative bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-xl"
                      >
                        <div className="aspect-[4/5] relative overflow-hidden">
                           <img src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={photo.title} />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                              <button 
                                onClick={() => removePortfolioItem(photo.id)}
                                className="w-full py-4 bg-red-600/90 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600"
                              >
                                <Trash2 size={16} /> Remove from Portfolio
                              </button>
                           </div>
                        </div>
                        <div className="p-6">
                           <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-white uppercase text-sm truncate">{photo.title}</h3>
                              <span className="text-red-600 font-bungee">KES {photo.price}</span>
                           </div>
                           <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{photo.category} • {photo.license} License</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'vaults' && (
              <motion.div 
                key="vaults-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-16"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h2 className="font-embroidery text-6xl italic uppercase leading-none">
                        {vaultType === 'public' ? 'Public' : 'Private'} <span className={vaultType === 'public' ? 'text-violet-600' : 'text-zinc-500'}>Archive</span>
                      </h2>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mt-2">Managing {filteredVaults.length} secure containers</p>
                    </div>
                    <button 
                      onClick={() => setUploadToVaultId(vaultType === 'public' ? 'v-public-1' : 'v-private-1')}
                      className={`flex items-center gap-4 px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-2xl ${vaultType === 'public' ? 'bg-violet-600 hover:bg-violet-500' : 'bg-white text-black hover:bg-zinc-200'}`}
                    >
                      <Plus size={20} /> {vaultType === 'public' ? 'Upload to Market Archive' : 'Initialize Client Vault'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 pt-8">
                    {filteredVaults.map(vault => (
                      <VaultCard 
                        key={vault.id} 
                        vault={vault} 
                        isPublic={vault.isPublic} 
                        onUpload={(id) => setUploadToVaultId(id)}
                      />
                    ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'performance' && (
              <motion.div 
                key="performance-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-[3.5rem] p-12">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <h3 className="font-embroidery text-5xl italic">Market <span className="text-violet-600 text-glow-violet">Velocity</span></h3>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Global License Acquisition Heat</p>
                      </div>
                    </div>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4B0082" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#4B0082" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="s" stroke="#4B0082" strokeWidth={5} fill="url(#velocityGrad)" />
                          </AreaChart>
                      </ResponsiveContainer>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-[3rem] p-10">
                      <div className="flex items-center gap-4 mb-8">
                          <Award size={24} className="text-violet-500" />
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Node Verification</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          <Badge label="Elite Archivist" active />
                          <Badge label="Direct Wire" active />
                          <Badge label="STK Verified" active />
                      </div>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </section>

      {/* PORTFOLIO ADD MODAL */}
      <AnimatePresence>
        {showAddPortfolioModal && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="w-full max-w-4xl bg-black border border-red-600/30 rounded-[4rem] shadow-2xl overflow-hidden"
             >
                <div className="bg-red-600 p-10 flex justify-between items-center text-white">
                   <div className="flex items-center gap-4">
                      <Edit3 size={32} />
                      <h2 className="font-embroidery text-4xl italic uppercase leading-none">Portfolio Asset Ingestion</h2>
                   </div>
                   <button onClick={() => setShowAddPortfolioModal(false)} className="p-4 bg-black/20 rounded-full hover:bg-black/40 transition-all"><X size={24}/></button>
                </div>

                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      {!newPortfolioAsset.preview ? (
                        <div 
                          onClick={() => portfolioFileInputRef.current?.click()}
                          className="aspect-[4/5] border-4 border-dashed border-zinc-800 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:border-red-600/30 transition-all group"
                        >
                           <input type="file" hidden ref={portfolioFileInputRef} onChange={handlePortfolioFileSelect} accept="image/*" />
                           <CloudUpload size={48} className="text-zinc-700 group-hover:text-red-600 transition-colors mb-4" />
                           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select High-Res Master</span>
                        </div>
                      ) : (
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-zinc-800">
                           <img src={newPortfolioAsset.preview} className="w-full h-full object-cover" alt="Preview" />
                           <button onClick={() => setNewPortfolioAsset(prev => ({...prev, file: null, preview: ''}))} className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-red-600"><X size={16}/></button>
                        </div>
                      )}
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Master Title</label>
                         <input 
                           type="text" 
                           value={newPortfolioAsset.title}
                           onChange={e => setNewPortfolioAsset(prev => ({...prev, title: e.target.value}))}
                           className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm font-bold focus:border-red-600 outline-none" 
                           placeholder="e.g. Serengeti Dusk"
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Target Sector</label>
                            <select 
                              value={newPortfolioAsset.category}
                              onChange={e => setNewPortfolioAsset(prev => ({...prev, category: e.target.value}))}
                              className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm font-bold focus:border-red-600 outline-none appearance-none"
                            >
                               {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Spot Price (KES)</label>
                            <input 
                               type="number" 
                               value={newPortfolioAsset.price}
                               onChange={e => setNewPortfolioAsset(prev => ({...prev, price: Number(e.target.value)}))}
                               className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-sm font-bold focus:border-red-600 outline-none" 
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">License Type</label>
                         <div className="flex gap-2">
                            {['Commercial', 'Editorial', 'Personal'].map(l => (
                              <button 
                                key={l}
                                onClick={() => setNewPortfolioAsset(prev => ({...prev, license: l as any}))}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${newPortfolioAsset.license === l ? 'bg-red-600 border-red-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
                              >
                                {l}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="pt-10 border-t border-zinc-800 mt-auto">
                         <div className="flex items-center gap-4 text-zinc-500 mb-6">
                            <Globe2 size={16} />
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-relaxed">Asset will be instantly discoverable on Global Trending Feed.</p>
                         </div>
                         <button 
                           onClick={addToPortfolio}
                           disabled={!newPortfolioAsset.file || !newPortfolioAsset.title}
                           className="w-full bg-red-600 text-white font-black py-5 rounded-[2rem] shadow-2xl hover:bg-black transition-all text-xs uppercase tracking-widest disabled:opacity-50"
                         >
                            PUBLISH ASSET TO PORTFOLIO
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIZUAL INGESTION MODAL (VAULTS) */}
      <AnimatePresence>
        {uploadToVaultId && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto py-20">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 40 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 40 }}
               className={`w-full max-w-5xl rounded-[4rem] border shadow-2xl overflow-hidden flex flex-col ${
                 uploadToVaultId.includes('public') ? 'bg-[#0a0510]' : 'bg-black border-zinc-800'
               }`}
             >
                <div className={`p-10 flex justify-between items-center ${uploadToVaultId.includes('public') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                   <div className="flex items-center gap-4">
                      <CloudUpload size={32} />
                      <div>
                        <h2 className="font-embroidery text-4xl italic uppercase leading-none">Vault Ingestion</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                          Secure Porting to {uploadToVaultId.includes('public') ? 'Public Sector' : 'Client Vault'}
                        </p>
                      </div>
                   </div>
                   <button onClick={() => setUploadToVaultId(null)} className="p-4 bg-black/20 rounded-full hover:bg-black/40 transition-all">
                      <X size={24}/>
                   </button>
                </div>

                <div className="flex-1 p-10 flex flex-col min-h-[500px]">
                   {uploadQueue.length === 0 ? (
                     <div 
                       onClick={() => fileInputRef.current?.click()}
                       className={`flex-1 border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-20 cursor-pointer group transition-all ${
                         uploadToVaultId.includes('public') ? 'border-violet-600/20 hover:border-violet-600/50 hover:bg-violet-600/5' : 'border-zinc-800 hover:border-red-600/30 hover:bg-red-600/5'
                       }`}
                     >
                        <input type="file" ref={fileInputRef} multiple hidden onChange={handleFileSelect} accept="image/*" />
                        <ImageIcon size={64} className="text-gray-700 group-hover:text-red-600 transition-colors mb-6" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Drop Assets Here</h3>
                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Select High-Res RAW or JPEGs for 30Y Archival</p>
                     </div>
                   ) : (
                     <div className="space-y-8 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{uploadQueue.length} Assets in Queue</span>
                           <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black text-red-600 uppercase hover:underline">+ Add more</button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                           {uploadQueue.map((asset, idx) => (
                             <motion.div 
                               key={asset.id}
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col md:flex-row gap-8"
                             >
                                <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-zinc-900 shrink-0 relative">
                                   <img src={asset.preview} className="w-full h-full object-cover" alt="" />
                                   {asset.status === 'complete' && (
                                     <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle className="text-white" size={32} />
                                     </div>
                                   )}
                                </div>
                                
                                <div className="flex-1 space-y-4">
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="space-y-1.5">
                                         <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Asset Title</label>
                                         <input 
                                           value={asset.title}
                                           onChange={(e) => updateAssetMeta(asset.id, { title: e.target.value })}
                                           className="w-full bg-black border border-white/10 p-3 rounded-xl text-xs font-bold focus:border-red-600 outline-none"
                                         />
                                      </div>
                                      <div className="space-y-1.5">
                                         <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Market Sector</label>
                                         <select 
                                           value={asset.category}
                                           onChange={(e) => updateAssetMeta(asset.id, { category: e.target.value })}
                                           className="w-full bg-black border border-white/10 p-3 rounded-xl text-xs font-bold focus:border-red-600 outline-none appearance-none"
                                         >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                         </select>
                                      </div>
                                      <div className="space-y-1.5">
                                         <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Search Tags</label>
                                         <div className="relative">
                                            <input 
                                              placeholder="Nairobi, Urban, Sunset..."
                                              value={asset.tags.join(', ')}
                                              onChange={(e) => updateAssetMeta(asset.id, { tags: e.target.value.split(',').map(t => t.trim()) })}
                                              className="w-full bg-black border border-white/10 p-3 pr-10 rounded-xl text-xs font-bold focus:border-red-600 outline-none"
                                            />
                                            <Sparkles size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500 cursor-pointer hover:scale-125 transition-transform" />
                                         </div>
                                      </div>
                                   </div>
                                   <div className="space-y-1.5">
                                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Narrative / Context</label>
                                      <textarea 
                                        rows={2}
                                        value={asset.description}
                                        onChange={(e) => updateAssetMeta(asset.id, { description: e.target.value })}
                                        className="w-full bg-black border border-white/10 p-3 rounded-xl text-xs font-medium focus:border-red-600 outline-none resize-none"
                                        placeholder="Brief context about the moment..."
                                      />
                                   </div>
                                   
                                   <div className="space-y-2">
                                      <div className="flex justify-between items-center text-[9px] font-black uppercase text-gray-600">
                                         <span>Ingestion Link: PZ-NODE-ALPHA</span>
                                         <span className={asset.status === 'complete' ? 'text-green-500' : 'text-red-600'}>
                                            {asset.status === 'complete' ? 'SYNCED' : `${asset.progress}%`}
                                         </span>
                                      </div>
                                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                         <motion.div 
                                           animate={{ width: `${asset.progress}%` }} 
                                           className={`h-full ${asset.status === 'complete' ? 'bg-green-500' : 'bg-red-600'}`} 
                                         />
                                      </div>
                                   </div>
                                </div>
                                
                                <button 
                                  onClick={() => setUploadQueue(q => q.filter(a => a.id !== asset.id))}
                                  className="self-start p-2 text-zinc-700 hover:text-red-500 transition-colors"
                                >
                                   <Trash2 size={18} />
                                </button>
                             </motion.div>
                           ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="flex items-center gap-4 text-zinc-500">
                              <ShieldCheck size={20} />
                              <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">
                                End-to-End Encryption Enabled • AES-256-GCM Archival Protocol
                              </p>
                           </div>
                           <button 
                             onClick={startIngestion}
                             disabled={isIngesting || uploadQueue.length === 0}
                             className={`min-w-[280px] py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 ${
                               uploadToVaultId.includes('public') ? 'bg-violet-600 hover:bg-violet-500' : 'bg-red-600 hover:bg-black'
                             } disabled:opacity-50`}
                           >
                              {isIngesting ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                              {isIngesting ? 'INITIALIZING ARCHIVE SYNC...' : 'PORT ASSETS TO VAULT'}
                           </button>
                        </div>
                     </div>
                   )}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Portal */}
      <div className="fixed bottom-10 right-10 z-[100]">
         <button 
           onClick={() => {
              if (activeTab === 'portfolio') setShowAddPortfolioModal(true);
              else setUploadToVaultId(vaultType === 'public' ? 'v-public-1' : 'v-private-1');
           }}
           className="w-20 h-20 bg-violet-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-violet-900/50 hover:scale-110 transition-transform group"
          >
            <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
         </button>
      </div>
    </div>
  );
};

// --- Dashboard Subcomponents ---

const StatMiniCard = ({ icon, label, val, trend }: any) => (
  <div className="bg-black border-2 border-zinc-900 rounded-[3rem] p-10 group hover:border-violet-600/50 transition-all shadow-xl">
    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 group-hover:bg-violet-600/10 group-hover:text-violet-500">
       {icon}
    </div>
    <span className="block text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">{label}</span>
    <h4 className="text-4xl font-bungee text-white mb-2">{val}</h4>
    <div className="flex items-center gap-2">
       <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{trend}</span>
    </div>
  </div>
);

const TabBtn = ({ label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-10 py-4 rounded-[2rem] transition-all font-black text-[10px] uppercase tracking-widest whitespace-nowrap ${active ? 'bg-white text-black shadow-2xl' : 'text-zinc-600 hover:text-white'}`}
  >
    {label}
  </button>
);

const Badge = ({ label, active = false }: any) => (
  <div className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${active ? 'bg-violet-600/10 border-violet-600/40 text-violet-500' : 'bg-transparent border-zinc-800 text-zinc-700'}`}>
     {label}
  </div>
);

export default PhotographerProfile;
