import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, Lock, ArrowRight, ShieldCheck, Search, Database, Loader2, Cpu, Globe, Key, AlertTriangle } from 'lucide-react';
import { useVaultStore } from '../store/useAppStore';
import VaultCard from '../components/VaultCard';

const VaultAccess: React.FC = () => {
  const navigate = useNavigate();
  const { vaults } = useVaultStore();
  const [step, setStep] = useState<'search' | 'scanning' | 'verify'>('search');
  const [phone, setPhone] = useState('');
  const [studio, setStudio] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [foundVault, setFoundVault] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('scanning');
    setError('');

    // Simulate network scan latency
    setTimeout(() => {
      const vault = vaults.find(v => {
        // Robust Matching Logic
        const phoneDigitsInput = phone.replace(/\D/g, '');
        const vaultPhoneDigits = v.clientPhone.replace(/\D/g, '');
        
        // Match if the input is a subset of the vault phone (minimum 4 chars)
        const phoneMatch = phoneDigitsInput.length >= 4 && vaultPhoneDigits.includes(phoneDigitsInput);
        
        // Match if studio name is a partial match
        const studioMatch = studio.length >= 3 && v.photographerName.toLowerCase().includes(studio.toLowerCase());
        
        return !v.isPublic && (phoneMatch || studioMatch);
      });

      if (vault) {
        setFoundVault(vault);
        setStep('verify');
      } else {
        setStep('search');
        setError('UNRECOGNIZED NODE: NO ARCHIVE MATCHES THESE CREDENTIALS.');
      }
    }, 2000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === foundVault.passkey) {
      navigate(`/gallery/${foundVault.id}`);
    } else {
      setError('AUTH_FAILED: INVALID SECURITY PASSKEY.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-black border border-white/5 rounded-[4rem] shadow-2xl overflow-hidden relative"
      >
        {/* TERMINAL HEADER */}
        <div className="bg-[#111] p-10 border-b border-white/5 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
             <div className="w-16 h-16 bg-red-600 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-2xl shadow-red-900/40">
                <Database size={32} className="text-white" />
             </div>
             <h1 className="font-embroidery text-5xl text-white italic leading-none mb-2">VAULT <span className="text-red-600">RECOVERY</span></h1>
             <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Protocol Version 4.0.2</p>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-[4] rotate-12 pointer-events-none">
             <ShieldCheck size={100} />
          </div>
        </div>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {step === 'search' && (
              <motion.form 
                key="search"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSearch}
                className="space-y-8"
              >
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">Registered Phone (M-Pesa/MTN)</label>
                      <div className="relative group">
                         <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-red-600 transition-colors" size={18} />
                         <input 
                           type="tel" 
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="w-full bg-zinc-950 border border-zinc-900 p-5 pl-14 rounded-2xl text-sm font-bold text-white focus:border-red-600 outline-none transition-all placeholder:text-gray-800"
                           placeholder="+254 7XX XXX XXX"
                         />
                      </div>
                   </div>

                   <div className="flex items-center gap-4 py-2">
                      <div className="flex-1 h-[1px] bg-zinc-900" />
                      <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Global Switch</span>
                      <div className="flex-1 h-[1px] bg-zinc-900" />
                   </div>

                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-1">Photographer / Studio Handle</label>
                      <div className="relative group">
                         <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-red-600 transition-colors" size={18} />
                         <input 
                           type="text" 
                           value={studio}
                           onChange={(e) => setStudio(e.target.value)}
                           className="w-full bg-zinc-950 border border-zinc-900 p-5 pl-14 rounded-2xl text-sm font-bold text-white focus:border-red-600 outline-none transition-all placeholder:text-gray-800"
                           placeholder="e.g. Ali Command"
                         />
                      </div>
                   </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-4 text-red-600 animate-shake">
                     <AlertTriangle size={20} className="shrink-0" />
                     <span className="text-[9px] font-black uppercase leading-tight">{error}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={!phone && !studio}
                  className="w-full bg-red-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-red-900/40 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest disabled:opacity-30"
                >
                   <Search size={18} /> SCAN REGIONAL NODES
                </button>
              </motion.form>
            )}

            {step === 'scanning' && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center"
              >
                 <div className="relative mb-12">
                    <div className="w-32 h-32 rounded-full border-4 border-zinc-900 border-t-red-600 animate-spin" />
                    <Cpu size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 animate-pulse" />
                 </div>
                 <h3 className="font-embroidery text-4xl text-white italic mb-2">SCANNING ARCHIVES...</h3>
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] animate-pulse">Querying Satellite Media Hubs</p>
              </motion.div>
            )}

            {step === 'verify' && foundVault && (
              <motion.div 
                key="verify"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="flex flex-col items-center text-center">
                   <div className="w-40 mb-10">
                      <VaultCard vault={foundVault} compactPreview />
                   </div>
                   <h3 className="font-embroidery text-4xl text-white italic mb-2">SECURE VAULT FOUND</h3>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Authorized by {foundVault.photographerName}</p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-8">
                   <div className="space-y-4">
                      <label className="block text-center text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Enter 6-Digit Secure Passkey</label>
                      <div className="relative group">
                         <Key className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-red-600 transition-colors" size={20} />
                         <input 
                           type="password" 
                           maxLength={6}
                           required
                           value={pin}
                           onChange={(e) => setPin(e.target.value)}
                           className="w-full bg-black border border-zinc-800 p-6 pl-16 rounded-[2rem] text-3xl font-bungee text-white text-center tracking-[0.5em] focus:border-red-600 outline-none transition-all"
                           placeholder="••••••"
                           autoFocus
                         />
                      </div>
                   </div>

                   {error && <p className="text-red-600 text-[10px] font-black uppercase text-center">{error}</p>}

                   <div className="flex flex-col gap-4">
                      <button type="submit" className="w-full bg-red-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
                         DECRYPT & INITIALIZE <Lock size={18} />
                      </button>
                      <button type="button" onClick={() => {setStep('search'); setPin('');}} className="text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">Wrong Node? Restart Scan</button>
                   </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TERMINAL FOOTER */}
        <div className="p-8 bg-zinc-950/50 border-t border-white/5 flex items-center justify-between">
           <div className="flex items-center gap-3 text-[9px] font-black text-zinc-700 uppercase tracking-widest">
              <Globe size={14} />
              <span>CLUSTER: EAST AFRICA NBI_01</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(227,30,36,0.6)]" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">PROTECTED LINK ACTIVE</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VaultAccess;