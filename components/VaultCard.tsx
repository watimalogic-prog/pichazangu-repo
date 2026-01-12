import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Unlock, Download, ShoppingCart, 
  Smartphone, CheckCircle, Eye, Share2, 
  Trash2, MoreVertical, ShieldCheck, Zap,
  Loader2, CloudUpload, Clock, Image as ImageIcon,
  Activity, Database, ShieldAlert, Plus, Shield,
  ScanFace
} from 'lucide-react';
import { Vault } from '../types';
import { useToastStore } from '../store/useAppStore';

interface VaultCardProps {
  vault: Vault;
  isPublic?: boolean;
  onUpload?: (vaultId: string) => void;
  compactPreview?: boolean;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, isPublic = false, onUpload, compactPreview = false }) => {
  const [step, setStep] = useState<'locked' | 'otp' | 'preview' | 'paid'>(vault.status || 'locked');
  const [isProcessing, setIsProcessing] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handlePayment = () => {
    setIsProcessing(true);
    showToast("M-Pesa STK Push Sent to Client...", "info");
    
    // Simulate real-time background listener logic
    setTimeout(() => {
      setIsProcessing(false);
      setStep('paid');
      showToast("Payment Confirmed. High-res archive available.", "success");
    }, 4000);
  };

  const handlePasskeyCheck = (val: string) => {
    if (val.length === 6) {
      if (val === '882910' || val === vault.passkey) {
        setStep('preview');
        showToast("Access Token Verified", "success");
      } else {
        showToast("Invalid security passkey", "error");
      }
    }
  };

  // RED THEME for Private, VIOLET for Public
  const theme = isPublic 
    ? {
        border: 'border-violet-600/30',
        bg: 'bg-[#0a0510]',
        accent: 'text-violet-500',
        button: 'bg-violet-600 hover:bg-violet-500 text-white',
        glow: 'shadow-[0_0_15px_rgba(138,43,226,0.1)]',
        bar: 'bg-violet-600'
      }
    : {
        border: step === 'paid' ? 'border-green-500/30' : 'border-red-600/30',
        bg: 'bg-black',
        accent: 'text-red-500',
        button: 'bg-red-600 text-white hover:bg-white hover:text-black',
        glow: 'shadow-[0_0_20px_rgba(227,30,36,0.15)]',
        bar: 'bg-red-600'
      };

  const formattedDate = new Date(vault.lastUpdated).toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short'
  });

  return (
    <motion.div 
      layout
      className={`group relative ${theme.bg} border-2 ${theme.border} ${theme.glow} rounded-[1.5rem] p-3 pt-6 transition-all duration-500 flex flex-col h-full overflow-visible`}
    >
      {/* 1. NODE IDENTITY OVERLAY */}
      <div className="absolute top-2 left-3 flex items-center gap-1 opacity-40">
        <Database size={6} className={theme.accent} />
        <span className="text-[5px] font-black text-white uppercase tracking-widest">PZ-{vault.id.slice(-4).toUpperCase()}</span>
      </div>

      {/* 2. NEURAL SUBJECT THUMBNAIL (Simulation of Face Detection Crop) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className={`relative w-12 h-12 rounded-full border-2 ${step === 'paid' ? 'border-green-500' : isPublic ? 'border-violet-500' : 'border-red-600'} overflow-hidden bg-zinc-900 shadow-2xl transition-transform group-hover:scale-110 duration-500`}>
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={vault.clientAvatar || `https://i.pravatar.cc/150?u=${vault.id}`} 
            className={`w-full h-full object-cover ${step === 'locked' && !isPublic ? 'brightness-50 grayscale' : ''}`} 
            alt="Subject" 
          />
          
          {/* Lock Overlay for Private Vaults */}
          {step === 'locked' && !isPublic && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-600/20">
               <Lock className="text-white drop-shadow-lg" size={14} />
            </div>
          )}

          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className={`absolute left-0 right-0 h-[0.5px] ${isPublic ? 'bg-violet-500/50' : 'bg-red-600/50'} z-30 blur-[0.5px]`}
          />
        </div>
        {/* Neural Tag */}
        {!isPublic && (
           <div className="absolute -bottom-1 -right-1 p-1 bg-red-600 rounded-full border border-black text-white" title="Primary Subject Identified">
              <ScanFace size={8} />
           </div>
        )}
      </div>

      {/* 3. CORE TELEMETRY GRID */}
      <div className="mt-1 text-center flex-1">
        <div className="flex items-center justify-center gap-1 mb-0.5 px-1">
          <h3 className="text-white font-black text-[10px] uppercase truncate max-w-full leading-tight">
            {isPublic ? vault.eventName : vault.clientName}
          </h3>
          {isPublic && <Zap size={8} className="text-violet-500 fill-violet-500" />}
        </div>
        <p className="text-zinc-600 text-[5px] font-black uppercase tracking-[0.2em] mb-3">
          Ref: {vault.photographerName}
        </p>

        <div className={`mb-3 p-2 rounded-xl border ${isPublic ? 'bg-violet-950/5 border-violet-900/10' : 'bg-red-950/5 border-red-900/10'}`}>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-left">
              <span className="block text-[5px] font-black text-zinc-500 uppercase leading-none mb-0.5">Media</span>
              <span className="text-white font-bungee text-[10px] leading-none">{vault.photoCount}</span>
            </div>
            <div className="text-right">
              <span className="block text-[5px] font-black text-zinc-500 uppercase leading-none mb-0.5">Synced</span>
              <span className="text-zinc-400 font-bold text-[7px] leading-none uppercase">{formattedDate}</span>
            </div>
          </div>
          <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} className={`h-full ${theme.bar}`} />
          </div>
        </div>

        {/* 4. MANAGEMENT PORT (Upload logic for Photographers) */}
        {!isPublic && onUpload && !compactPreview && (
          <button 
            onClick={() => onUpload(vault.id)}
            className="w-full mb-3 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/20 transition-all py-1.5 rounded-lg flex items-center justify-center gap-1.5 text-[7px] font-black uppercase tracking-widest group/upload shadow-lg"
          >
            <Plus size={8} className="group-hover/upload:rotate-90 transition-transform" />
            Ingest Assets
          </button>
        )}

        {/* 5. DYNAMIC INTERACTION LOGIC (STK Push Simulator) */}
        {!compactPreview && (
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              {step === 'locked' && !isPublic && !onUpload && (
                <motion.button 
                  key="locked"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setStep('otp')}
                  className={`w-full py-2 rounded-lg font-black text-[7px] uppercase tracking-widest transition-all ${theme.button} shadow-xl shadow-red-900/20`}
                >
                  Verify Access
                </motion.button>
              )}

              {step === 'otp' && (
                <motion.div key="otp" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <input 
                    type="password" 
                    maxLength={6}
                    placeholder="PASSKEY"
                    className="w-full bg-zinc-900 border border-red-600/30 rounded-lg py-1.5 text-white text-center text-xs tracking-[0.3em] focus:outline-none focus:border-red-600 font-bungee"
                    onChange={(e) => handlePasskeyCheck(e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => setStep('locked')} className="text-[5px] font-black text-zinc-700 uppercase tracking-widest hover:text-white transition-colors">Abort Access</button>
                </motion.div>
              )}

              {(step === 'preview' || step === 'paid' || isPublic) && (
                <motion.div key="active" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-2">
                  <div className="bg-zinc-900/40 rounded-lg p-1.5 border border-zinc-800/30 flex justify-between items-center">
                    <span className="text-white font-mono text-[8px]">KES {vault.price?.toLocaleString() || '15K'}</span>
                    {step === 'paid' ? <CheckCircle size={10} className="text-green-500" /> : <Unlock size={10} className={isPublic ? 'text-violet-500' : 'text-red-500'} />}
                  </div>

                  <button 
                    onClick={step === 'paid' ? () => showToast("Downloading Originals...", "success") : handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-2 rounded-lg font-black text-[7px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all ${step === 'paid' ? 'bg-green-600 text-white' : theme.button} shadow-xl`}
                  >
                    {isProcessing ? (
                       <>
                         <Loader2 className="animate-spin" size={10} /> 
                         <span>STK Push...</span>
                       </>
                    ) : step === 'paid' ? (
                       <>
                         <Download size={10}/>
                         <span>Extract Media</span>
                       </>
                    ) : (
                       <>
                         <ShoppingCart size={10}/>
                         <span>Unlock Archive</span>
                       </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 6. BRANDING FOOTER */}
      {!compactPreview && (
        <div className="mt-3 pt-2 border-t border-zinc-900/30 flex justify-between items-center px-1">
          <span className="text-[5px] font-black text-zinc-800 uppercase italic">ARCHIVE v2</span>
          <div className="flex gap-2">
            <button className="text-zinc-800 hover:text-white transition-colors"><Eye size={10} /></button>
            <button className="text-zinc-800 hover:text-white transition-colors"><Share2 size={10} /></button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VaultCard;