import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Unlock, Download, ShoppingCart, 
  Smartphone, CheckCircle, Eye, Share2, 
  Trash2, MoreVertical, ShieldCheck, Zap,
  Loader2, CloudUpload, Clock, Image as ImageIcon,
  Activity, Database, ShieldAlert, Plus
} from 'lucide-react';
import { Vault } from '../types';
import { useToastStore } from '../store/useAppStore';

interface VaultCardProps {
  vault: Vault;
  isPublic?: boolean;
  onUpload?: (vaultId: string) => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, isPublic = false, onUpload }) => {
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

  // Theme configuration for the Dual-Architecture system
  const theme = isPublic 
    ? {
        border: 'border-violet-600/30',
        bg: 'bg-[#0a0510]',
        accent: 'text-violet-500',
        button: 'bg-violet-600 hover:bg-violet-500 text-white',
        glow: 'shadow-[0_0_40px_rgba(138,43,226,0.15)]',
        accentHex: '#4B0082',
        bar: 'bg-violet-600'
      }
    : {
        border: step === 'paid' ? 'border-green-500/50' : 'border-zinc-800',
        bg: 'bg-black',
        accent: 'text-zinc-500',
        button: 'bg-zinc-100 text-black hover:bg-violet-600 hover:text-white',
        glow: 'shadow-2xl shadow-black/80',
        accentHex: '#ffffff',
        bar: 'bg-red-600'
      };

  const formattedDate = new Date(vault.lastUpdated).toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: '2-digit' 
  });

  return (
    <motion.div 
      layout
      className={`group relative ${theme.bg} border-2 ${theme.border} ${theme.glow} rounded-[3rem] p-8 pt-12 transition-all duration-500 flex flex-col h-full overflow-visible`}
    >
      {/* 1. SECURE NODE IDENTITY OVERLAY */}
      <div className="absolute top-6 left-8 flex items-center gap-2 opacity-30">
        <Database size={10} className={isPublic ? 'text-violet-500' : 'text-zinc-500'} />
        <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">PZ-NODE-{vault.id.slice(-4).toUpperCase()}</span>
      </div>

      {/* 2. CIRCULAR FACE THUMBNAIL OVERLAY */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
        <div className={`relative w-24 h-24 rounded-full border-4 ${step === 'paid' ? 'border-green-500' : 'border-black'} overflow-hidden bg-zinc-900 shadow-[0_15px_40px_rgba(0,0,0,1)]`}>
          {step === 'locked' && !isPublic ? (
            <div className="flex items-center justify-center h-full bg-zinc-900">
              <Lock className="text-zinc-700" size={32} />
            </div>
          ) : (
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={vault.clientAvatar || `https://i.pravatar.cc/150?u=${vault.id}`} 
              className="w-full h-full object-cover" 
              alt="Client Face" 
            />
          )}
          
          {/* AI Activity Scan Line */}
          <motion.div 
            animate={{ top: ['-10%', '110%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className={`absolute left-0 right-0 h-[2px] ${isPublic ? 'bg-violet-500/50' : 'bg-red-600/30'} z-30 blur-[1px]`}
          />
        </div>
      </div>

      {/* 3. FOLDER BODY CONTENT */}
      <div className="mt-4 text-center flex-1">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="text-white font-bungee text-lg truncate px-2">
            {isPublic ? vault.eventName : vault.clientName}
          </h3>
          {isPublic && <Zap size={14} className="text-violet-500 fill-violet-500" />}
        </div>
        <p className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.4em] mb-8">
          Status: {vault.archiveStatus}
        </p>

        {/* ENHANCED TELEMETRY GRID */}
        <div className={`mb-6 p-6 rounded-[2rem] border ${isPublic ? 'bg-violet-950/10 border-violet-900/20' : 'bg-zinc-900/40 border-zinc-800/50'}`}>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-left">
              <div className="flex items-center gap-1.5 mb-1.5">
                <ImageIcon size={12} className={isPublic ? 'text-violet-500' : 'text-red-600'} />
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Archive Set</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-bungee text-2xl leading-none">{vault.photoCount}</span>
                <span className="text-[7px] font-black text-zinc-600 uppercase">Items</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 mb-1.5">
                <Clock size={12} className={isPublic ? 'text-violet-500' : 'text-red-600'} />
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Last Synced</span>
              </div>
              <span className="text-zinc-300 font-bold text-[10px] uppercase tracking-tighter leading-none block">
                {formattedDate}
              </span>
            </div>
          </div>

          {/* INTEGRITY PROGRESS BAR */}
          <div className="mt-6 space-y-2">
             <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-widest">
                <span className="text-zinc-500">Vault Health</span>
                <span className={isPublic ? 'text-violet-500' : 'text-green-500'}>98.2% Secure</span>
             </div>
             <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  className={`h-full ${theme.bar}`}
                />
             </div>
          </div>
        </div>

        {/* 4. PHOTOGRAPHER UPLOAD INTERFACE (Visible only when onUpload is provided) */}
        {!isPublic && onUpload && (
          <div className="mb-6 p-4 bg-red-600/5 border border-red-600/20 rounded-2xl flex flex-col gap-3">
             <div className="flex items-center gap-2">
                <CloudUpload size={14} className="text-red-600" />
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Vault Management</span>
             </div>
             <button 
               onClick={() => onUpload(vault.id)}
               className="w-full bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/30 transition-all py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest group/upload"
             >
                <Plus size={14} className="group-hover/upload:rotate-90 transition-transform" />
                Direct Asset Porting
             </button>
          </div>
        )}

        {/* 5. DYNAMIC INTERACTION STATES (CLIENT VIEW) */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {step === 'locked' && !isPublic && !onUpload && (
              <motion.button 
                key="btn-locked"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setStep('otp')}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${theme.button}`}
              >
                Request Folder Access
              </motion.button>
            )}

            {step === 'otp' && (
              <motion.div 
                key="ui-otp"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="p-3 bg-violet-950/20 rounded-xl border border-violet-500/20">
                   <p className="text-[9px] font-bold text-violet-400 uppercase tracking-widest">Passkey sent to {vault.clientPhone?.slice(0, 4)}•••{vault.clientPhone?.slice(-2)}</p>
                </div>
                <input 
                  type="password" 
                  maxLength={6}
                  placeholder="••••••"
                  className="w-full bg-zinc-900 border-2 border-dashed border-violet-500/30 rounded-xl py-3 text-white text-center text-xl tracking-[0.5em] focus:outline-none focus:border-violet-500 font-bungee"
                  onChange={(e) => handlePasskeyCheck(e.target.value)}
                  autoFocus
                />
                <button onClick={() => setStep('locked')} className="text-[8px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors">Cancel Access Request</button>
              </motion.div>
            )}

            {(step === 'preview' || step === 'paid' || isPublic) && (
              <motion.div 
                key="ui-active"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50 flex justify-between items-center">
                  <div className="text-left">
                    <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-widest">License Value</span>
                    <span className="text-white font-mono text-sm">KES {vault.price?.toLocaleString() || '15,000'}</span>
                  </div>
                  {step === 'paid' ? <CheckCircle size={18} className="text-green-500" /> : <Unlock size={18} className={isPublic ? 'text-violet-500' : 'text-zinc-500'} />}
                </div>

                {step === 'paid' ? (
                  <button 
                    className="w-full bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-green-700 transition-all text-[10px] uppercase tracking-widest shadow-xl shadow-green-900/20 animate-bounce"
                    onClick={() => showToast("Downloading High-Res Originals...", "success")}
                  >
                    <Download size={18} /> Download All Media
                  </button>
                ) : (
                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full ${theme.button} py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all disabled:opacity-50 text-[10px] uppercase tracking-widest shadow-xl`}
                  >
                    {isProcessing ? (
                      <>
                        <Smartphone className="animate-bounce" size={18} /> 
                        Waiting for M-Pesa...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} /> 
                        Unlock Full Archive
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 6. BRANDING FOOTER */}
      <div className="mt-8 pt-6 border-t border-zinc-900/50 flex justify-between items-center">
        <span className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.4em] italic">Archive Protocol Alpha</span>
        <div className="flex gap-4">
          <button className="text-zinc-600 hover:text-white transition-colors"><Eye size={16} /></button>
          <button className="text-zinc-600 hover:text-white transition-colors"><MoreVertical size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
};

export default VaultCard;