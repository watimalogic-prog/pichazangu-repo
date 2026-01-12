import React, { useState } from 'react';
import { 
  TrendingUp, Camera, Wallet, Plus, Lock, 
  ShieldCheck, Smartphone, Zap, Globe, 
  Award, Briefcase, ChevronRight, Eye, 
  Download, Layers, Search, Filter, HardDrive,
  UserCheck, CreditCard, Cpu, ScanFace
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVaultStore, useUserStore, useToastStore } from '../store/useAppStore';
import VaultCard from '../components/VaultCard';

const PhotographerProfile: React.FC = () => {
  const { user } = useUserStore();
  const { vaults } = useVaultStore();
  const showToast = useToastStore((state) => state.showToast);
  const [activeTab, setActiveTab] = useState<'vaults' | 'wallet' | 'insights'>('vaults');
  const [vaultFilter, setVaultFilter] = useState<'private' | 'public'>('private');

  const stats = [
    { label: 'Active Vaults', val: '42', icon: <Layers size={18}/> },
    { label: 'Neural Index', val: '98%', icon: <Cpu size={18}/> },
    { label: 'Market Rank', val: '#12', icon: <Award size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 selection:bg-red-600">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* 1. FINANCIAL COMMAND CENTER */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-black border-2 border-red-600/20 rounded-[3rem] p-10 relative overflow-hidden group hover:border-red-600/50 transition-all shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                       <Wallet size={32} />
                    </div>
                    <div>
                       <h2 className="font-embroidery text-3xl italic">WALLET <span className="text-red-600">ALPHA</span></h2>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Picha Node: #882-NBI</p>
                    </div>
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div>
                       <span className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Available Liquidity</span>
                       <h2 className="text-7xl font-bungee text-white leading-none">142,500 <span className="text-sm text-red-600">KES</span></h2>
                    </div>
                    <div className="flex gap-4">
                       <button 
                        onClick={() => showToast("Requesting M-Pesa Withdrawal...", "info")}
                        className="bg-white text-black font-black px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl"
                       >
                          Withdraw (STK)
                       </button>
                       <button className="p-5 bg-[#111] rounded-2xl border border-white/5 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                          <Plus size={24} />
                       </button>
                    </div>
                 </div>
              </div>
              <CreditCard size={250} className="absolute -right-20 -bottom-20 opacity-[0.03] -rotate-12 pointer-events-none" />
           </div>

           <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-8 flex flex-col justify-between">
              <div className="space-y-6">
                 {stats.map(s => (
                   <div key={s.label} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="text-red-600">{s.icon}</div>
                         <span className="text-[10px] font-black uppercase text-gray-500">{s.label}</span>
                      </div>
                      <span className="font-bungee text-xl">{s.val}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-4 bg-red-600/10 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-600/20 hover:bg-red-600 hover:text-white transition-all">
                 View Node Insights
              </button>
           </div>
        </section>

        {/* 2. DUAL-VAULT ARCHITECTURE */}
        <section className="space-y-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-8">
              <div>
                 <h2 className="font-embroidery text-6xl italic">THE <span className="text-red-600">VAULTS</span></h2>
                 <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-2">Managing {vaults.length} secure archival nodes</p>
              </div>
              <div className="flex bg-[#111] p-1.5 rounded-[2rem] border border-white/5">
                 <button 
                  onClick={() => setVaultFilter('private')}
                  className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${vaultFilter === 'private' ? 'bg-red-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                 >
                    Private Nodes
                 </button>
                 <button 
                  onClick={() => setVaultFilter('public')}
                  className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${vaultFilter === 'public' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
                 >
                    Public Market
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {vaults.filter(v => vaultFilter === 'public' ? v.isPublic : !v.isPublic).map(vault => (
                <VaultCard key={vault.id} vault={vault} isPublic={vault.isPublic} onUpload={() => showToast("Initializing neural ingestion...", "info")} />
              ))}
              <button className="h-full min-h-[220px] border-4 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center gap-4 group hover:border-red-600/30 transition-all">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-700 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Plus size={24} />
                 </div>
                 <span className="text-[8px] font-black uppercase text-gray-600 group-hover:text-red-600">New Vault</span>
              </button>
           </div>
        </section>

        {/* 3. UPLOAD PORTAL MINI-VIEW */}
        <section className="bg-white text-black p-16 rounded-[4rem] relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                 <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                    <ScanFace size={32} className="text-red-600" />
                    <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.4em]">Neural Ingestion Active</span>
                 </div>
                 <h2 className="font-embroidery text-5xl md:text-7xl italic leading-none mb-6">BULK <span className="font-embroidery-sketch">UPLOAD</span></h2>
                 <p className="text-lg font-medium text-gray-500 mb-10 leading-relaxed uppercase">
                    Drop your raw assets. Our AI will automatically identify primary subjects, generate circular face thumbnails, and suggest regional tagging for the public marketplace.
                 </p>
                 <button className="bg-red-600 text-white font-black px-12 py-6 rounded-full text-xs uppercase tracking-widest shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-3">
                    <HardDrive size={20} /> INITIALIZE BATCH SYNC
                 </button>
              </div>
              <div className="w-full lg:w-96 aspect-square bg-gray-100 rounded-[3rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center group hover:border-red-600 transition-all cursor-pointer">
                 <Camera size={64} className="text-gray-300 group-hover:text-red-600 transition-colors mb-6" />
                 <span className="font-black text-xs uppercase tracking-widest text-gray-400">Drag RAW Files Here</span>
              </div>
           </div>
           <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none text-[30rem] font-embroidery whitespace-nowrap rotate-12">
             STITCH
           </div>
        </section>

      </div>
    </div>
  );
};

const StatMiniCard = ({ icon, label, val }: any) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center justify-between">
    <div className="flex items-center gap-4">
       <div className="text-red-600">{icon}</div>
       <span className="text-[10px] font-black uppercase text-gray-500">{label}</span>
    </div>
    <span className="font-bungee text-xl text-white">{val}</span>
  </div>
);

export default PhotographerProfile;