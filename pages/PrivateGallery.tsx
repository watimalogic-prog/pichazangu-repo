import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ShoppingCart, Heart, Shield, Eye, CreditCard, 
  CheckCircle, ArrowLeft, X, Smartphone, Wallet, Key,
  Lock, Loader2, ShieldCheck, ExternalLink, FileText, QrCode,
  LayoutGrid, List, Filter, Star, MessageSquare, History,
  Sparkles, Layers, ChevronRight, Send, Camera, ShieldAlert,
  Plus
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS } from '../constants';
import { Photo } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import { useToastStore } from '../store/useAppStore';

const PrivateGallery: React.FC = () => {
  const { vaultId } = useParams();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  
  // Commercial Logic State
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [purchasedPhotos, setPurchasedPhotos] = useState<string[]>([]);
  const [isStkActive, setIsStkActive] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 Minutes Inactivity Reset

  const vault = MOCK_VAULTS.find(v => v.id === vaultId) || MOCK_VAULTS[0];
  const [photos] = useState<Photo[]>(
    MOCK_PHOTOS.map(p => ({
      ...p,
      discountedPrice: vault.price || 1500, // Dynamic pricing for public/private
      isPaid: false
    }))
  );

  // Auto-Lock Inactivity Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/vault-access');
          showToast("Session Timed Out. Vault Re-Locked.", "info");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate, showToast]);

  const toggleSelect = (id: string) => {
    if (purchasedPhotos.includes(id)) return; // Already owned
    setSelectedPhotos(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleMpesaCheckout = () => {
    if (selectedPhotos.length === 0) return;
    setIsStkActive(true);
    
    // Simulate STK Handshake
    setTimeout(() => {
      setIsStkActive(false);
      setPurchasedPhotos([...purchasedPhotos, ...selectedPhotos]);
      setSelectedPhotos([]);
      showToast("Transaction Approved. Archive Synchronized.", "success");
    }, 5000);
  };

  const triggerDownload = (photo: Photo) => {
    // Functional Download Simulator
    const link = document.createElement('a');
    link.href = photo.url;
    link.download = `Pichazangu_${photo.title.replace(/\s+/g, '_')}_HighRes.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading High-Res Original: ${photo.title}`, "success");
  };

  const totalAmount = selectedPhotos.length * (vault.price || 1500);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E63946]">
      
      {/* 1. VAULT COMMAND BAR */}
      <nav className="h-24 bg-black/80 backdrop-blur-3xl border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link to="/vault-access" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#E63946] transition-all">
             <ArrowLeft size={20} />
           </Link>
           <div className="hidden md:block">
              <div className="flex items-center gap-3">
                 <h1 className="font-embroidery text-3xl italic tracking-tight">{vault.clientName.toUpperCase()} <span className="text-[#E63946] font-embroidery-sketch">VAULT</span></h1>
                 <div className="bg-[#E63946]/10 text-[#E63946] px-3 py-1 rounded-full text-[8px] font-black uppercase border border-[#E63946]/20">Authorized Node</div>
              </div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">Session Expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</p>
           </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-right">
              <span className="block text-[8px] font-black text-gray-500 uppercase leading-none mb-1">Archive Integrity</span>
              <span className="text-xs font-black text-green-500 uppercase">BIT_PERFECT</span>
           </div>
           <div className="w-[2px] h-10 bg-white/5" />
           <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4">
              <Smartphone size={18} className="text-[#E63946]" />
              <span className="text-sm font-bungee uppercase">MPESA ACTIVE</span>
           </div>
        </div>
      </nav>

      {/* 2. MAIN BENTO GALLERY */}
      <main className="max-w-[1600px] mx-auto p-6 md:p-12 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {photos.map((photo) => {
            const isSelected = selectedPhotos.includes(photo.id);
            const isPurchased = purchasedPhotos.includes(photo.id);
            
            return (
              <motion.div 
                key={photo.id}
                layout
                className={`group relative aspect-[3/4] bg-zinc-950 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-[#E63946] scale-[0.98]' : isPurchased ? 'border-green-500' : 'border-white/5 hover:border-[#E63946]/30'}`}
              >
                <ProtectedImage 
                  src={photo.url} 
                  photographerName={photo.photographer} 
                  isPurchased={isPurchased} 
                />

                {/* Commercial Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col p-6 pointer-events-none">
                  {/* Select/Download Circular Button */}
                  <div className="flex justify-between items-start pointer-events-auto">
                    {isPurchased ? (
                      <motion.button 
                        key="download"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => triggerDownload(photo)}
                        className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
                      >
                        <Download size={20} strokeWidth={3} />
                      </motion.button>
                    ) : (
                      <button 
                        onClick={() => toggleSelect(photo.id)}
                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${isSelected ? 'bg-[#E63946] border-white shadow-[0_0_20px_#E63946]' : 'bg-black/60 border-white/20 hover:border-[#E63946]'}`}
                      >
                        {isSelected ? <CheckCircle size={20} className="text-white" /> : <Plus size={20} className="text-white" />}
                      </button>
                    )}

                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black uppercase text-white tracking-widest">KES {vault.price || 1500}</span>
                    </div>
                  </div>

                  <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                     <h3 className="font-embroidery text-2xl text-white mb-1 italic leading-none truncate">{photo.title}</h3>
                     <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isPurchased ? 'text-green-500' : 'text-[#E63946]'}`}>
                       License: {isPurchased ? 'UNLOCKED RAW' : 'PREVIEW ONLY'}
                     </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* 3. STICKY CHECKOUT TERMINAL */}
      <AnimatePresence>
        {selectedPhotos.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-10 py-6 rounded-full shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex items-center gap-12 z-[100] border-[6px] border-[#E63946]"
          >
             <div className="flex items-center gap-8 border-r border-gray-200 pr-10">
                <div className="flex -space-x-4">
                  {selectedPhotos.slice(0, 3).map(id => (
                    <div key={id} className="w-12 h-12 rounded-full border-2 border-white bg-black overflow-hidden shadow-xl">
                       <img src={photos.find(p=>p.id===id)?.url} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                  {selectedPhotos.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-[#E63946] text-white flex items-center justify-center text-xs font-black shadow-xl">+{selectedPhotos.length-3}</div>
                  )}
                </div>
                <div>
                   <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">M-Pesa Selection</span>
                   <span className="text-2xl font-black leading-none">{selectedPhotos.length} ASSETS</span>
                </div>
             </div>

             <div className="flex items-center gap-10">
                <div>
                  <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Commercial Total</span>
                  <span className="text-3xl font-bungee text-[#E63946]">KES {totalAmount.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleMpesaCheckout}
                  className="bg-[#E63946] text-white font-black px-12 py-5 rounded-full flex items-center gap-4 hover:bg-black transition-all shadow-2xl shadow-red-900/40 text-xs uppercase tracking-widest"
                >
                   <Smartphone size={20} /> EXECUTE STK PUSH
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. M-PESA STK OVERLAY */}
      <AnimatePresence>
        {isStkActive && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-[#000000] border-4 border-[#E63946] rounded-[4rem] p-16 text-center max-w-lg w-full shadow-[0_0_100px_rgba(230,57,70,0.4)]"
             >
                <div className="w-24 h-24 bg-[#E63946] rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl animate-pulse">
                   <Smartphone size={48} className="text-white" />
                </div>
                <h2 className="font-embroidery text-5xl text-white mb-4 italic uppercase">SECURE HANDSHAKE</h2>
                <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10 uppercase tracking-tight">
                  A payment prompt has been dispatched to your Safaricom handset.<br/><br/>
                  <span className="text-[#E63946] font-black tracking-widest">PLEASE ENTER YOUR PIN</span>
                </p>
                <div className="flex flex-col items-center gap-4">
                   <Loader2 size={32} className="animate-spin text-[#E63946]" />
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Awaiting Provider Confirmation...</span>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PrivateGallery;