import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ShoppingCart, Heart, Shield, Eye, CreditCard, 
  CheckCircle, ArrowLeft, X, Smartphone, Wallet, Key,
  Lock, Loader2, ShieldCheck, ExternalLink, FileText, QrCode,
  LayoutGrid, List, Filter, Star, MessageSquare, History,
  Sparkles, Layers, ChevronRight, Send, Camera, ShieldAlert,
  Plus
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS, CURRENCY_SYMBOLS } from '../constants';
import { Photo, VaultCollection } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import { useCartStore, useToastStore, useUserStore } from '../store/useAppStore';
import { calculateTax, getPrivacyClause } from '../services/taxService';
import { GoogleGenAI, Type } from "@google/genai";

const PrivateGallery: React.FC = () => {
  const { vaultId } = useParams();
  const { user } = useUserStore();
  const { items: cartItems, addItem, removeItem, clearCart } = useCartStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const [activeView, setActiveView] = useState<'all' | 'collections' | 'proofs'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isAiSorting, setIsAiSorting] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'success'>('method');
  
  // Vault logic
  const vault = MOCK_VAULTS.find(v => v.id === vaultId) || MOCK_VAULTS[0];
  const [photos, setPhotos] = useState<Photo[]>(
    MOCK_PHOTOS.map(p => ({
      ...p,
      discountedPrice: Math.floor(p.price * 0.5) + 7,
      isStarred: false,
      feedback: []
    }))
  );

  const [collections, setCollections] = useState<VaultCollection[]>([
    { id: 'c1', name: 'Ceremony Highlights', description: 'The official vows and ring exchange.', coverUrl: photos[0].url },
    { id: 'c2', name: 'Guest Candids', description: 'Smiles and laughter from the crowd.', coverUrl: photos[1].url }
  ]);

  const [activePhotoDetail, setActivePhotoDetail] = useState<Photo | null>(null);

  const toggleStar = (id: string) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, isStarred: !p.isStarred } : p));
    showToast("Proofing status updated", "success");
  };

  const submitFeedback = (photoId: string, comment: string) => {
    setPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        const newFeedback = {
          id: Date.now().toString(),
          userId: user?.id || 'guest',
          userName: user?.name || 'Guest',
          comment,
          timestamp: new Date().toISOString()
        };
        return { ...p, feedback: [...(p.feedback || []), newFeedback] };
      }
      return p;
    }));
    showToast("Feedback submitted to photographer", "success");
  };

  const handleAiSort = async () => {
    setIsAiSorting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const photoTitles = photos.map(p => p.title).join(", ");
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create 3 thematic collections for a photography vault containing these assets: [${photoTitles}]. Return JSON: {collections: [{name, description}]}`
      });
      
      // DO add comment above each fix.
      // Fallback to empty collections array to ensure result is valid and avoid JSON.parse error with undefined.
      const result = JSON.parse(response.text || '{"collections":[]}');
      const newCollections = result.collections.map((c: any, i: number) => ({
        id: `ai-${i}`,
        name: c.name,
        description: c.description,
        coverUrl: photos[i % photos.length].url
      }));
      
      setCollections(newCollections);
      setActiveView('collections');
      showToast("AI Curation Complete", "success");
    } catch (err) {
      console.error(err);
      showToast("AI Sorting failed", "error");
    } finally {
      setIsAiSorting(false);
    }
  };

  const netTotal = cartItems.reduce((acc, item) => acc + (item.discountedPrice || 0), 0);
  const taxInfo = calculateTax(netTotal, 'KES');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600">
      
      {/* 1. VAULT COMMAND BAR */}
      <nav className="h-24 bg-black/80 backdrop-blur-2xl border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
           <Link to="/vault-access" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all">
             <ArrowLeft size={20} />
           </Link>
           <div>
              <div className="flex items-center gap-3">
                 <h1 className="font-embroidery text-3xl italic tracking-tight">{vault.photographerName} <span className="text-red-600 font-embroidery-sketch">VAULT</span></h1>
                 <div className="bg-red-600/10 text-red-600 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-red-600/20">Archived 2024</div>
              </div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-0.5">Asset ID: {vault.id}</p>
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden lg:flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <NavBtn active={activeView === 'all'} label="Everything" onClick={() => setActiveView('all')} />
              <NavBtn active={activeView === 'collections'} label="Collections" onClick={() => setActiveView('collections')} />
              <NavBtn active={activeView === 'proofs'} label="My Proofs" onClick={() => setActiveView('proofs')} />
           </div>
           
           <button 
             onClick={handleAiSort}
             disabled={isAiSorting}
             className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all text-red-500 disabled:opacity-50"
             title="AI Curation"
           >
              {isAiSorting ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
           </button>

           <button onClick={() => setShowCheckout(true)} className="relative bg-red-600 p-4 rounded-2xl shadow-xl shadow-red-900/40 hover:bg-white hover:text-red-600 transition-all group">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-red-600 text-red-600 rounded-full text-[10px] font-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cartItems.length}
                </span>
              )}
           </button>
        </div>
      </nav>

      {/* 2. MAIN GALLERY WORKSPACE */}
      <main className="max-w-[1600px] mx-auto p-8 md:p-12 space-y-16">
        
        {/* Collections Header View */}
        {activeView === 'collections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in zoom-in duration-500">
             {collections.map(col => (
               <motion.div 
                key={col.id} 
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCollection(col.id)}
                className="group relative h-[450px] rounded-[3.5rem] overflow-hidden cursor-pointer border border-white/10"
               >
                  <img src={col.coverUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center">
                           <Layers size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Collection</span>
                     </div>
                     <h3 className="font-embroidery text-5xl italic leading-none mb-3">{col.name}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed mb-8">{col.description}</p>
                     <button className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Explore Set <ChevronRight size={14}/>
                     </button>
                  </div>
               </motion.div>
             ))}
             <div className="h-[450px] border-4 border-dashed border-white/5 rounded-[3.5rem] flex flex-col items-center justify-center text-center p-12 group hover:border-red-600/30 transition-all">
                <Plus size={48} className="text-gray-800 group-hover:text-red-600 transition-colors mb-4" />
                <h4 className="text-xl font-bold text-gray-700">Custom Set</h4>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">Manual grouping active</p>
             </div>
          </div>
        )}

        {/* Assets Grid */}
        {(activeView === 'all' || activeView === 'proofs') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12">
             {(activeView === 'proofs' ? photos.filter(p => p.isStarred) : photos).map((photo, i) => (
               <motion.div 
                 key={photo.id}
                 layout
                 className="group flex flex-col h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl hover:border-red-600/30 transition-all"
               >
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-900">
                     <ProtectedImage src={photo.url} photographerName={photo.photographer} />
                     
                     {/* Interaction Overlay */}
                     <div className="absolute top-6 left-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button 
                          onClick={() => toggleStar(photo.id)}
                          className={`p-3 rounded-2xl backdrop-blur-md transition-all ${photo.isStarred ? 'bg-yellow-500 text-black' : 'bg-black/40 text-white hover:bg-yellow-500'}`}
                        >
                           <Star size={20} fill={photo.isStarred ? 'currentColor' : 'none'} />
                        </button>
                        <button 
                          onClick={() => setActivePhotoDetail(photo)}
                          className="p-3 rounded-2xl bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all"
                        >
                           <MessageSquare size={20} />
                        </button>
                     </div>

                     <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-transparent to-transparent translate-y-full group-hover:translate-y-0 transition-transform z-30">
                        <button 
                          onClick={() => addItem(photo, photo.discountedPrice)}
                          className="w-full bg-red-600 hover:bg-white hover:text-red-600 text-white font-black py-4 rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest"
                        >
                           <ShoppingCart size={18} /> UNLOCK ORIGINAL
                        </button>
                     </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                     <div className="flex justify-between items-start mb-4">
                        <h4 className="font-embroidery text-2xl italic leading-tight truncate">{photo.title}</h4>
                        {photo.isStarred && (
                          <div className="bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded text-[7px] font-black uppercase border border-yellow-500/20">Final Selection</div>
                        )}
                     </div>
                     <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
                        <span className="font-bungee text-red-600">KES {photo.discountedPrice}</span>
                        <div className="flex items-center gap-4 text-gray-500">
                           <div className="flex items-center gap-1.5"><MessageSquare size={12}/> <span className="text-[10px] font-black">{photo.feedback?.length || 0}</span></div>
                           <div className="flex items-center gap-1.5"><Download size={12}/> <span className="text-[10px] font-black">RAW</span></div>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
        )}
      </main>

      {/* 3. PROOFING MODAL DETAIL */}
      <AnimatePresence>
         {activePhotoDetail && (
           <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0a0a0a] rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col lg:flex-row border border-white/10"
              >
                 <div className="w-full lg:w-2/3 aspect-[4/5] lg:aspect-auto relative group overflow-hidden">
                    <img src={activePhotoDetail.url} className="w-full h-full object-cover" alt="" />
                    <button onClick={() => setActivePhotoDetail(null)} className="absolute top-8 left-8 p-4 bg-black/60 rounded-2xl text-white hover:bg-red-600 transition-all border border-white/10 z-30"><X size={24}/></button>
                 </div>

                 <div className="flex-1 p-12 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-10">
                       <div>
                          <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block mb-2">Proofing Terminal</span>
                          <h2 className="font-embroidery text-5xl italic leading-none">{activePhotoDetail.title}</h2>
                       </div>
                       <button 
                         onClick={() => toggleStar(activePhotoDetail.id)}
                         className={`p-4 rounded-2xl border transition-all ${activePhotoDetail.isStarred ? 'bg-yellow-500 border-yellow-500 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                       >
                          <Star size={24} fill={activePhotoDetail.isStarred ? 'currentColor' : 'none'} />
                       </button>
                    </div>

                    <div className="flex-1 space-y-8">
                       <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Client Feedback Log</h4>
                          <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                             {activePhotoDetail.feedback?.map(f => (
                               <div key={f.id} className="flex gap-4">
                                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                                     {f.userName[0]}
                                  </div>
                                  <div>
                                     <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black">{f.userName}</span>
                                        <span className="text-[8px] font-bold text-gray-600 uppercase">{new Date(f.timestamp).toLocaleTimeString()}</span>
                                     </div>
                                     <p className="text-xs text-gray-400 font-medium leading-relaxed">{f.comment}</p>
                                  </div>
                               </div>
                             ))}
                             {!activePhotoDetail.feedback?.length && (
                               <div className="text-center py-10 text-gray-600 italic text-xs">No comments yet.</div>
                             )}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Quick Request Type</label>
                          <div className="flex flex-wrap gap-2">
                             {['Retouch Skin', 'Black & White', 'Crop Square', 'Sharpen'].map(tag => (
                               <button key={tag} className="px-4 py-2 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-[9px] font-black uppercase transition-all border border-white/10">{tag}</button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5">
                       <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Add specific instruction for photographer..." 
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs font-medium outline-none focus:border-red-600 transition-all"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                submitFeedback(activePhotoDetail.id, (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600 hover:scale-110 transition-transform">
                             <Send size={18}/>
                          </button>
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* 4. CHECKOUT OVERLAY (REFINED) */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-lg w-full text-black p-12">
                <div className="flex justify-between items-center mb-12">
                   <h2 className="font-embroidery text-4xl text-gray-900 italic">SECURE <span className="text-red-600">UNLOCK</span></h2>
                   <button onClick={() => setShowCheckout(false)} className="p-3 bg-gray-50 rounded-full hover:bg-red-600 hover:text-white transition-all"><X size={20}/></button>
                </div>
                
                <div className="space-y-8">
                   <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-[10px] font-black text-gray-400 uppercase">Archive Assets ({cartItems.length})</span>
                         <span className="font-bold">KES {netTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-red-600">
                         <span className="text-[10px] font-black uppercase">Regional VAT (16%)</span>
                         <span className="font-bold">KES {taxInfo.vatAmount.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                         <span className="text-sm font-black uppercase">Grand Total</span>
                         <span className="font-bungee text-3xl text-red-600">KES {taxInfo.totalAmount.toLocaleString()}</span>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 bg-red-50 p-6 rounded-3xl border border-red-100">
                      <ShieldAlert size={24} className="text-red-600 shrink-0" />
                      <p className="text-[10px] font-bold text-red-700 leading-relaxed uppercase tracking-widest">
                         Unlock triggers a 30-year archival certificate. Assets are legally licensed for personal display and social sharing.
                      </p>
                   </div>

                   <button className="w-full bg-red-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-red-900/30 hover:bg-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em]">
                      <Smartphone size={20} /> PAY VIA MPESA / MOMO
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// --- SUBCOMPONENTS ---

const NavBtn = ({active, label, onClick}: any) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${active ? 'bg-red-600 text-white shadow-xl' : 'text-gray-400 hover:text-white'}`}
  >
    {label}
  </button>
);

export default PrivateGallery;