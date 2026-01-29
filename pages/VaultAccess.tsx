import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, ShieldCheck, Globe, Loader2, Cpu, AlertTriangle, Filter } from 'lucide-react';
import { useVaultStore } from '../store/useAppStore';
import VaultCard from '../components/VaultCard';

const VaultAccess: React.FC = () => {
  const { vaults } = useVaultStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsScanning(true);
    setResults([]);

    // Simulate Archive Scan
    setTimeout(() => {
      const filtered = vaults.filter(v => 
        !v.isPublic && (
          v.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.clientPhone.includes(searchQuery) ||
          v.photographerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setResults(filtered);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* TERMINAL HEADER */}
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#E63946]/10 border border-[#E63946]/20 rounded-full mb-4">
              <div className="w-1.5 h-1.5 bg-[#E63946] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-[#E63946] uppercase tracking-[0.4em]">Archival Retrieval Terminal Active</span>
           </div>
           <h1 className="font-embroidery text-7xl md:text-[10rem] italic leading-none text-white uppercase">VAULT <span className="text-[#E63946]">RECOVERY</span></h1>
           <p className="text-gray-500 font-medium uppercase tracking-[0.6em] text-sm">Secure Client Node Search v4.0</p>
        </div>

        {/* TERMINAL SEARCH UNIT */}
        <div className="bg-white/5 p-4 rounded-[3rem] border border-white/10 backdrop-blur-xl shadow-2xl max-w-3xl mx-auto">
           <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E63946] transition-colors" size={24} />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   placeholder="PHONE, NAME, OR STUDIO..."
                   className="w-full bg-black border-2 border-white/5 rounded-[2rem] pl-16 pr-8 py-6 text-white font-bungee text-xl outline-none focus:border-[#E63946] transition-all placeholder:text-gray-800"
                 />
              </div>
              <button 
                disabled={isScanning}
                type="submit" 
                className="bg-[#E63946] text-white font-black px-12 py-6 rounded-full text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-30"
              >
                 {isScanning ? <Loader2 className="animate-spin" size={20}/> : <Cpu size={20} />}
                 {isScanning ? 'SCANNING...' : 'QUERY NODES'}
              </button>
           </form>
        </div>

        {/* RESULTS GRID */}
        <AnimatePresence mode="wait">
           {isScanning ? (
             <motion.div 
               key="scanning"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="py-20 flex flex-col items-center gap-6"
             >
                <div className="relative">
                   <div className="w-32 h-32 rounded-full border-8 border-white/5 border-t-[#E63946] animate-spin" />
                   <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E63946]" size={40} />
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] animate-pulse text-center">Bypassing Regional Encryption Buffers...</p>
             </motion.div>
           ) : results.length > 0 ? (
             <motion.div 
               key="results"
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
             >
                {results.map(vault => (
                   <VaultCard key={vault.id} vault={vault} />
                ))}
             </motion.div>
           ) : searchQuery && !isScanning && (
             <motion.div 
               key="empty"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="py-20 text-center space-y-6 bg-white/5 rounded-[3rem] border border-white/5"
             >
                <AlertTriangle size={64} className="mx-auto text-gray-800" />
                <div>
                   <h3 className="text-xl font-black uppercase text-white mb-2">ACCESS DENIED</h3>
                   <p className="text-gray-500 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">No decentralized archive node matches your query profile.</p>
                </div>
                <button onClick={() => setSearchQuery('')} className="text-[#E63946] font-black text-[10px] uppercase tracking-widest hover:underline">Re-calibrate Scan</button>
             </motion.div>
           )}
        </AnimatePresence>

        {/* SECURITY INFO FOOTER */}
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-4">
              <Globe size={24} className="text-[#E63946]" />
              <div>
                 <span className="block text-[8px] font-black text-gray-500 uppercase mb-1">Retrieval Hub</span>
                 <span className="text-xs font-bold uppercase tracking-tighter">Cluster: Nairobi (NBI_01)</span>
              </div>
           </div>
           <div className="p-6 bg-[#E63946]/5 rounded-3xl border border-[#E63946]/20 max-w-sm">
              <p className="text-[9px] font-bold text-red-100 uppercase leading-relaxed tracking-widest">
                 Pichazangu utilizes zero-knowledge retrieval. We do not store your search history. Your access token (Passkey) is the only bridge to your media.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VaultAccess;