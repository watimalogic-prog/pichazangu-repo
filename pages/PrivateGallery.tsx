import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ShoppingCart, Heart, Shield, Eye, CreditCard, 
  CheckCircle, ArrowLeft, X, Smartphone, Wallet, Key,
  Lock, Loader2, ShieldCheck, ExternalLink, FileText, QrCode
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS, CURRENCY_SYMBOLS } from '../constants';
import ProtectedImage from '../components/ProtectedImage';
import { useCartStore, useToastStore } from '../store/useAppStore';
import { calculateTax, getPrivacyClause } from '../services/taxService';

const PrivateGallery: React.FC = () => {
  const { vaultId } = useParams();
  const { items: cartItems, addItem, removeItem, clearCart } = useCartStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isReturning, setIsReturning] = useState(true); 
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});
  const [isGeneratingLink, setIsGeneratingLink] = useState<string | null>(null);

  const vault = MOCK_VAULTS.find(v => v.id === vaultId) || MOCK_VAULTS[0];
  
  const photos = MOCK_PHOTOS.map(p => ({
    ...p,
    discountedPrice: isReturning ? Math.floor(p.price * 0.5) + 7 : p.price + 7
  }));

  useEffect(() => {
    const block = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', block);
    return () => document.removeEventListener('contextmenu', block);
  }, []);

  const toggleCart = (photo: any) => {
    const isInCart = cartItems.some(item => item.id === photo.id);
    if (isInCart) {
      removeItem(photo.id);
    } else {
      addItem(photo, photo.discountedPrice);
    }
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      const currentCartIds = cartItems.map(i => i.id);
      setPurchasedIds(prev => [...prev, ...currentCartIds]);
      clearCart();
    }, 2500);
  };

  const generateSecureLink = (photoId: string) => {
    setIsGeneratingLink(photoId);
    setTimeout(() => {
      const secureToken = Math.random().toString(36).substring(2, 15);
      const expiringUrl = `https://cdn.pichazangu.com/originals/${photoId}.jpg?token=${secureToken}&expires=${Date.now() + 600000}`;
      setSignedUrls(prev => ({ ...prev, [photoId]: expiringUrl }));
      setIsGeneratingLink(null);
      showToast("Expiring download link generated", "success");
    }, 1800);
  };

  const netTotal = cartItems.reduce((acc, item) => acc + (item.discountedPrice || 0), 0);
  const taxInfo = calculateTax(netTotal, 'KES');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b border-gray-100 py-10 px-6 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <Link to="/vault-access" className="p-3 bg-gray-100 rounded-2xl text-gray-500 hover:text-red-600 transition-all">
               <ArrowLeft size={20} />
             </Link>
             <div>
               <h1 className="font-embroidery text-4xl text-gray-900">{vault.photographerName} Gallery</h1>
               <div className="flex items-center gap-3 mt-1">
                 <span className="text-[10px] font-black bg-red-600 text-white px-3 py-1 rounded-full uppercase">30-Year Storage</span>
                 <ShieldCheck size={14} className="text-green-500" />
                 <span className="text-xs font-bold text-gray-500">Legal Compliance Active</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             {isReturning && (
               <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-2xl border border-green-100">
                 <CheckCircle size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Loyalty: 50% OFF Applied</span>
               </div>
             )}
             <button onClick={() => setShowCheckout(true)} className="relative group p-4 bg-gray-900 text-white rounded-3xl shadow-xl hover:bg-red-600 transition-all overflow-hidden">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-600 border-2 border-white rounded-full text-[10px] font-black flex items-center justify-center animate-bounce z-20">
                    {cartItems.length}
                  </span>
                )}
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {photos.map((photo) => {
          const isPurchased = purchasedIds.includes(photo.id);
          const inCart = cartItems.some(item => item.id === photo.id);
          const hasUrl = signedUrls[photo.id];
          const isBusy = isGeneratingLink === photo.id;
          
          return (
            <motion.div 
              key={photo.id}
              layout
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                <ProtectedImage 
                  src={photo.url} 
                  photographerName={photo.photographer} 
                  alt={photo.title} 
                  className="opacity-90"
                  isPurchased={isPurchased}
                />
                
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                   <button onClick={() => setFavorites(prev => prev.includes(photo.id) ? prev.filter(f=>f!==photo.id) : [...prev, photo.id])} className={`p-3 rounded-2xl backdrop-blur-md transition-all ${favorites.includes(photo.id) ? 'bg-red-600 text-white' : 'bg-black/40 text-white hover:bg-white hover:text-red-600'}`}>
                     <Heart size={20} fill={favorites.includes(photo.id) ? "currentColor" : "none"} />
                   </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform z-20">
                   <div className="flex justify-between items-center text-white">
                      <div>
                        <span className="block text-[10px] font-black opacity-60 uppercase mb-1">Status</span>
                        <span className="font-bungee text-2xl uppercase">{isPurchased ? 'Unlocked' : `KES ${photo.discountedPrice}`}</span>
                      </div>
                      {!isPurchased && (
                        <button className="p-3 bg-white/20 rounded-xl backdrop-blur-md hover:bg-white/40">
                           <Eye size={20} />
                        </button>
                      )}
                   </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-embroidery text-2xl text-gray-900 leading-tight">{photo.title}</h3>
                  {isPurchased && <CheckCircle size={20} className="text-green-500 shrink-0 mt-1" />}
                </div>
                
                {isPurchased ? (
                  <div className="space-y-3">
                    {!hasUrl ? (
                      <button 
                        disabled={isBusy}
                        onClick={() => generateSecureLink(photo.id)}
                        className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:bg-black transition-all"
                      >
                        {isBusy ? <Loader2 className="animate-spin" size={20} /> : <Key size={20} />}
                        {isBusy ? 'GENERATING SIGNED LINK...' : 'GENERATE SECURE LINK'}
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                           <div className="flex items-center gap-2 mb-2">
                             <Shield size={14} className="text-green-600" />
                             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Link Expires in 10m</span>
                           </div>
                           <p className="text-[10px] font-mono text-gray-500 truncate">{hasUrl}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-[2] bg-red-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-100 transition-all">
                            <Download size={20} /> DOWNLOAD
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-900 py-4 rounded-2xl flex items-center justify-center border border-gray-200">
                             <FileText size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => toggleCart(photo)}
                    className={`w-full font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                      inCart ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-100'
                    }`}
                  >
                    {inCart ? <CheckCircle size={20} /> : <ShoppingCart size={20} />}
                    {inCart ? 'IN CART' : 'ADD TO SELECTION'}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden max-w-lg w-full p-10"
            >
              <div className="flex justify-between items-center mb-8">
                 <h2 className="font-embroidery text-3xl">SECURE CHECKOUT</h2>
                 <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24}/></button>
              </div>
              
              {paymentStep === 'method' && (
                <div className="space-y-6">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-400 uppercase tracking-widest text-[9px]">Items Net</span>
                          <span className="font-bold text-gray-700">KES {netTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-400 uppercase tracking-widest text-[9px]">{taxInfo.authority} {taxInfo.label} ({taxInfo.rate}%)</span>
                          <span className="font-bold text-gray-700">KES {taxInfo.vatAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                          <span className="font-black text-gray-900 uppercase text-xs">Total Amount</span>
                          <span className="font-bungee text-2xl text-red-600">KES {taxInfo.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100 space-y-3">
                         <div className="flex items-start gap-3">
                            <Shield size={16} className="text-red-600 mt-0.5 shrink-0" />
                            <p className="text-[9px] font-bold text-red-700 uppercase tracking-widest leading-relaxed">
                               Purchase triggers a legally binding 30-year archival contract. Assets are stored in sovereign regional nodes.
                            </p>
                         </div>
                         <div className="flex items-center gap-2 pt-2 border-t border-red-100/50">
                            <QrCode size={14} className="text-red-300" />
                            <span className="text-[8px] font-black text-red-400 uppercase">KRA PIN Compliance Active</span>
                         </div>
                      </div>

                      <button 
                        onClick={handlePayment}
                        className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-200 flex items-center justify-center gap-3"
                      >
                         <Smartphone size={20} /> AUTHORIZE STK PUSH
                      </button>

                      <p className="text-[8px] text-gray-400 text-center px-4 leading-relaxed italic">
                        {getPrivacyClause()}
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-400 font-bold uppercase tracking-widest mb-6">Your cart is empty.</p>
                      <button onClick={() => setShowCheckout(false)} className="w-full bg-black text-white font-black py-4 rounded-2xl">CLOSE</button>
                    </div>
                  )}
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-20 space-y-6">
                   <div className="relative">
                      <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
                      <Lock size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
                   </div>
                   <div>
                     <p className="font-black uppercase tracking-widest text-xs">Authenticating STK Push...</p>
                     <p className="text-[10px] text-gray-400 mt-2">Connecting to Safaricom/URA Regional Node</p>
                   </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-10 space-y-6">
                   <div className="w-20 h-20 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-green-100 rotate-12">
                      <ShieldCheck size={40} />
                   </div>
                   <h3 className="font-embroidery text-3xl text-gray-900">TAX COMPLIANT SUCCESS</h3>
                   <p className="text-xs text-gray-500 font-medium px-6">
                     Transactions verified. Your 30-year archival contract has been generated and original files are unlocked.
                   </p>
                   <button 
                     onClick={() => { setShowCheckout(false); setPaymentStep('method'); }}
                     className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl mt-6 shadow-xl"
                   >
                      RETURN TO SECURE VAULT
                   </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrivateGallery;