import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Calendar, Plus, Filter, Search, 
  ChevronRight, Star, ShieldCheck, Zap, ArrowRight, 
  Info, MessageSquare, DollarSign, Camera, CheckCircle,
  Clock, Award, LayoutGrid, List, X, 
  PlusCircle, FileText, User, ChevronLeft, Loader2,
  Smartphone, Send, Target, Users, Map as MapIcon,
  Trophy, Heart, ExternalLink
} from 'lucide-react';
import { CURRENCY_SYMBOLS } from '../constants';
import { UserRole, Gig, Bid } from '../types';
import { useUserStore, useToastStore, useGigStore } from '../store/useAppStore';

const Gigz: React.FC = () => {
  const { user } = useUserStore();
  const { gigs, addGig, bids } = useGigStore();
  const showToast = useToastStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<'find' | 'my-gigs' | 'history'>('find');
  const [showWizard, setShowWizard] = useState(false);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Logic: Filter gigs based on active tab and search/category criteria
  const filteredGigs = useMemo(() => {
    let list = [...gigs];
    
    // Tab filtering
    if (activeTab === 'find') {
      list = list.filter(g => g.status === 'Open');
    } else if (activeTab === 'my-gigs') {
      // Show gigs the current user posted
      list = list.filter(g => g.postedBy === user?.name);
    } else if (activeTab === 'history') {
      list = list.filter(g => g.status === 'Completed' || g.status === 'Booked');
    }

    // Search and Category filtering
    return list.filter(gig => {
      const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            gig.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || gig.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [gigs, activeTab, searchQuery, categoryFilter, user?.name]);

  return (
    <div className="min-h-screen pb-20 space-y-10 animate-in fade-in duration-500 pt-20">
      
      {/* 1. DYNAMIC HEADER */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Global Opportunity Feed</span>
          </div>
          <h1 className="font-embroidery text-6xl text-white leading-none">
            GIGS & <span className="font-embroidery-sketch text-red-600">PROPOSALS</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">Connect with East Africa's elite creators for unique assignments.</p>
        </div>

        {user?.role !== 'photographer' && (
          <button 
            onClick={() => setShowWizard(true)}
            className="group relative bg-red-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-red-600 transition-all flex items-center gap-3"
          >
            <Plus size={20} /> Commission a Pro
            <div className="absolute inset-x-10 bottom-2 h-[1px] border-b border-dashed border-white/30" />
          </button>
        )}
      </header>

      {/* 2. NAVIGATION & SEARCH BAR */}
      <div className="sticky top-16 md:top-20 z-40 space-y-6 bg-black/80 backdrop-blur-xl py-4 -mx-4 px-4 md:-mx-0 md:px-0 border-b border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex bg-white/5 p-2 rounded-[1.8rem] border border-white/10 shadow-sm overflow-x-auto scrollbar-hide max-w-full">
            <NavBtn active={activeTab === 'find'} label="Explore Feed" onClick={() => setActiveTab('find')} />
            {user?.role === 'client' && <NavBtn active={activeTab === 'my-gigs'} label="My Commissions" onClick={() => setActiveTab('my-gigs')} />}
            <NavBtn active={activeTab === 'history'} label="Archive" onClick={() => setActiveTab('history')} />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={18} />
                <input 
                  type="text" 
                  placeholder="Location or keywords..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/10 focus:border-red-600/50 transition-all text-sm font-medium text-white uppercase tracking-widest"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="hidden sm:flex bg-white/5 border border-white/10 rounded-2xl p-1 shadow-sm">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400'}`}><LayoutGrid size={18}/></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400'}`}><List size={18}/></button>
             </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Wedding', 'News', 'Sports', 'Fashion', 'Corporate'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-red-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white shadow-sm'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN GIGS FEED */}
      <main className="px-4 md:px-0">
        {filteredGigs.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'}>
            {filteredGigs.map((gig) => (
              <GigCard 
                key={gig.id} 
                gig={gig} 
                viewMode={viewMode}
                onClick={() => setSelectedGig(gig)}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white/5 rounded-[4rem] border-2 border-dashed border-white/10">
             <Briefcase size={64} className="mx-auto mb-6 text-gray-800 opacity-20" />
             <h3 className="text-xl font-black text-gray-500 uppercase tracking-widest">No active nodes found</h3>
             <p className="text-gray-600 text-xs font-bold uppercase mt-2">Adjust your filters or query to expand search.</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedGig && (
          <GigDetailModal 
            gig={selectedGig} 
            userRole={user?.role || 'client'} 
            onClose={() => setSelectedGig(null)} 
          />
        )}
        {showWizard && (
          <PostGigWizard 
            onClose={() => setShowWizard(false)} 
            onGigAdded={(g) => { addGig(g); showToast("Commission Node Live", "success"); }}
          />
        )}
      </AnimatePresence>

      {/* 5. SECTOR LEADERS */}
      <section className="mt-20 p-12 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] text-white relative overflow-hidden group mx-4 md:mx-0">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="flex items-center gap-2 mb-4">
                 <Award className="text-red-600" size={24} />
                 <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Hiring Authority</span>
               </div>
               <h2 className="font-embroidery text-5xl italic leading-none mb-6">MOST HIRED <br/><span className="text-red-600 font-embroidery-sketch">THIS MONTH</span></h2>
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/item">
                       <div className="flex items-center gap-4">
                          <span className="font-bungee text-red-600">#{i}</span>
                          <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?u=hired-${i}`} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div>
                             <span className="block font-bold">Ali Studio</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-widest">4.9 <Star size={10} className="inline fill-current text-red-600"/> • Nairobi</span>
                          </div>
                       </div>
                       <button className="bg-red-600 text-white p-2 rounded-lg group-hover/item:bg-white group-hover/item:text-red-600 transition-colors"><ChevronRight size={14}/></button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
               <Zap className="text-red-600 mb-6 animate-pulse" size={40} />
               <h3 className="font-embroidery text-4xl mb-4 italic">INSTANT <br/>HIRING</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-8">Verified Pros can be hired immediately without bidding. Escrow payments apply.</p>
               <button onClick={() => showToast("Direct Hire Terminal Initializing...", "info")} className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-white hover:text-red-600 transition-all text-[10px] uppercase tracking-widest">
                 RECRUIT VERIFIED TALENT
               </button>
               <ShieldCheck size={200} className="absolute -right-10 -top-10 opacity-5 -rotate-12" />
            </div>
         </div>
      </section>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const GigCard: React.FC<{ gig: Gig, viewMode: 'grid' | 'list', onClick: () => void }> = ({ gig, viewMode, onClick }) => {
  const isFlash = gig.urgency === 'Flash';
  const { bids } = useGigStore();
  const bidCount = bids.filter(b => b.gigId === gig.id).length;
  
  // Simulation: Distance from current node
  const distance = useMemo(() => (Math.random() * 15 + 1).toFixed(1), [gig.id]);

  return (
    <motion.div 
      layout
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`bg-[#111] rounded-[2.5rem] border border-white/5 shadow-sm overflow-hidden hover:border-red-600/30 transition-all cursor-pointer group flex flex-col h-full ${isFlash ? 'ring-2 ring-red-600' : ''}`}
    >
      <div className="p-8 pb-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
           <div className={`p-3 rounded-2xl ${isFlash ? 'bg-red-600 text-white animate-pulse' : 'bg-red-600/10 text-red-600'}`}>
              {isFlash ? <Zap size={24}/> : <Camera size={24}/>}
           </div>
           <div className="text-right">
              <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Max Budget</span>
              <span className="font-bungee text-xl text-white leading-none">
                 KES {gig.budgetMax.toLocaleString()}
              </span>
           </div>
        </div>

        <div className="mb-6">
           <div className="flex items-center gap-2 mb-1">
             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{gig.category}</span>
             <span className={`text-[10px] font-bold uppercase ${gig.status === 'Booked' ? 'text-green-500' : 'text-gray-600'}`}>• {gig.status}</span>
           </div>
           <h3 className="text-xl font-bold text-white group-hover:text-red-600 transition-colors leading-tight line-clamp-2">{gig.title}</h3>
        </div>

        <div className="space-y-3 mt-auto mb-4">
           <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={16} className="text-red-600" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest">{gig.location}</span>
                <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{distance} KM FROM YOUR NODE</span>
              </div>
           </div>
           <div className="flex items-center gap-3 text-gray-400">
              <Clock size={16} className="text-red-600" />
              <span className="text-[9px] font-black uppercase tracking-widest">Deadline: {gig.deadline}</span>
           </div>
        </div>
      </div>

      <div className="p-8 pt-0 flex gap-2">
         <div className="flex-1 bg-white/5 px-4 py-4 rounded-2xl flex items-center justify-between group-hover:bg-white transition-all">
            <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-black">Active Bids</span>
            <span className="font-bungee text-red-600">{bidCount}</span>
         </div>
      </div>
    </motion.div>
  );
};

const GigDetailModal = ({ gig, userRole, onClose }: { gig: Gig, userRole: UserRole, onClose: any }) => {
  const { user } = useUserStore();
  const { addBid, bids, updateGigStatus } = useGigStore();
  const [pitch, setPitch] = useState('');
  const [quote, setQuote] = useState(gig.budgetMin);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const [activeBidDetail, setActiveBidDetail] = useState<Bid | null>(null);
  const showToast = useToastStore(s => s.showToast);

  const gigBids = bids.filter(b => b.gigId === gig.id);
  const isMyGig = gig.postedBy === user?.name;
  const alreadyBid = bids.some(b => b.gigId === gig.id && b.photographerId === user?.id);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadyBid) {
      showToast("You have already submitted a bid for this node.", "error");
      return;
    }
    const bid: Bid = {
      id: `bid-${Date.now()}`,
      gigId: gig.id,
      photographerId: user?.id || 'anon',
      photographerName: user?.name || 'Anonymous Pro',
      photographerRating: 5.0,
      pitch,
      quote,
      status: 'Pending',
      portfolioUrl: '#'
    };
    addBid(bid);
    setIsSuccess(true);
    showToast("Proposal Transmitted Successfully", "success");
    setTimeout(onClose, 2000);
  };

  const handleHire = (bid: Bid) => {
    setIsHiring(true);
    showToast(`Authorizing Escrow release to ${bid.photographerName}...`, "info");
    
    // Simulate smart contract locking
    setTimeout(() => {
      updateGigStatus(gig.id, 'Booked');
      setIsHiring(false);
      showToast("Talent Booked. Project Hub Active.", "success");
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* LEFT PANEL: JOB DETAILS */}
        <div className="w-full md:w-[40%] bg-gray-900 p-8 md:p-12 text-white flex flex-col overflow-y-auto custom-scrollbar">
           <button onClick={onClose} className="mb-10 text-gray-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all"><ChevronLeft size={16}/> Back to feed</button>
           
           <div className="mb-8">
              <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">{gig.category} MISSION</span>
              <h2 className="font-embroidery text-5xl italic leading-none">{gig.title}</h2>
           </div>

           <div className="space-y-6 flex-1">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                 <h4 className="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Job Narrative</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">{gig.description}</p>
              </div>
              <div className="space-y-4">
                 <DetailItem icon={<MapPin size={18}/>} label="Location" val={gig.location} />
                 <DetailItem icon={<Calendar size={18}/>} label="Shoot Date" val={gig.deadline} />
                 <DetailItem icon={<DollarSign size={18}/>} label="Budget Limit" val={`KES ${gig.budgetMax.toLocaleString()}`} />
              </div>
           </div>

           <div className="mt-10 p-6 bg-red-600/10 rounded-2xl border border-red-600/20">
              <div className="flex items-center gap-3 mb-2">
                 <ShieldCheck size={20} className="text-red-600" />
                 <span className="text-[10px] font-black uppercase text-red-600">Secure Escrow</span>
              </div>
              <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed">Picha Zangu holds the funds in a secure node until you confirm the delivery of high-res assets.</p>
           </div>
        </div>

        {/* RIGHT PANEL: ACTIONS / BIDS */}
        <div className="flex-1 p-8 md:p-12 flex flex-col bg-white text-black overflow-y-auto custom-scrollbar relative">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-embroidery text-4xl text-gray-900 italic">
                {isMyGig ? 'PROPOSALS' : userRole === 'photographer' ? 'SEND PITCH' : 'CLIENT VIEW'}
              </h3>
              <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={20}/></button>
           </div>

           {/* IF CLIENT REVIEWING THEIR OWN GIG */}
           {isMyGig ? (
             <div className="space-y-8">
                <AnimatePresence mode="wait">
                   {activeBidDetail ? (
                     <motion.div 
                        key="bid-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                     >
                        <button onClick={() => setActiveBidDetail(null)} className="text-red-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-6"><ChevronLeft size={16}/> Back to list</button>
                        <div className="flex items-center gap-6 mb-8">
                           <div className="w-20 h-20 bg-gray-100 rounded-3xl overflow-hidden border border-gray-100">
                              <img src={`https://i.pravatar.cc/150?u=${activeBidDetail.photographerId}`} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                              <h4 className="text-3xl font-black uppercase tracking-tighter">{activeBidDetail.photographerName}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                 <Star size={14} className="text-yellow-500 fill-current" />
                                 <span className="font-bold text-sm">{activeBidDetail.photographerRating} Rating</span>
                              </div>
                           </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Photographer's Pitch</span>
                           <p className="text-lg font-medium leading-relaxed italic">"{activeBidDetail.pitch}"</p>
                        </div>

                        <div className="flex items-center justify-between p-8 bg-black text-white rounded-[2.5rem]">
                           <div>
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Quoted Price</span>
                              <span className="text-4xl font-bungee text-red-600">KES {activeBidDetail.quote.toLocaleString()}</span>
                           </div>
                           <button 
                            onClick={() => handleHire(activeBidDetail)}
                            className="bg-red-600 hover:bg-white hover:text-black text-white px-10 py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl"
                           >
                              HIRE NOW
                           </button>
                        </div>
                     </motion.div>
                   ) : (
                     <div className="space-y-4">
                        {gigBids.length === 0 ? (
                          <div className="py-20 text-center text-gray-300 uppercase">
                             <Users size={48} className="mx-auto mb-4 opacity-10" />
                             <p className="text-[10px] font-black tracking-[0.4em]">No bids received for this node yet.</p>
                          </div>
                        ) : (
                          gigBids.map(bid => (
                            <div key={bid.id} className="p-6 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-between group hover:border-red-600/20 transition-all">
                               <div className="flex items-center gap-6">
                                  <div className="w-14 h-14 bg-gray-200 rounded-2xl overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${bid.photographerId}`} className="w-full h-full object-cover" alt="" />
                                  </div>
                                  <div>
                                     <h4 className="font-black text-sm uppercase">{bid.photographerName}</h4>
                                     <p className="text-[10px] text-gray-400 uppercase font-bold">Proposal Quote: KES {bid.quote.toLocaleString()}</p>
                                  </div>
                               </div>
                               <div className="flex gap-2">
                                  <button 
                                    onClick={() => setActiveBidDetail(bid)}
                                    className="px-6 py-3 bg-white text-black border border-gray-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50"
                                  >
                                    Review
                                  </button>
                                  <button 
                                    disabled={isHiring}
                                    onClick={() => handleHire(bid)} 
                                    className="px-6 py-3 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
                                  >
                                     {isHiring ? <Loader2 size={12} className="animate-spin" /> : null}
                                     Hire Now
                                  </button>
                               </div>
                            </div>
                          ))
                        )}
                     </div>
                   )}
                </AnimatePresence>
             </div>
           ) : userRole === 'photographer' ? (
             /* IF PHOTOGRAPHER SUBMITTING A PITCH */
             <AnimatePresence mode="wait">
               {isSuccess ? (
                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center py-20">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl mb-8 animate-bounce">
                       <CheckCircle size={48} />
                    </div>
                    <h3 className="font-embroidery text-4xl mb-2 italic">PROPOSAL SENT</h3>
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Satellite dispatch confirmed.</p>
                 </motion.div>
               ) : alreadyBid ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6">
                       <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">Proposal Active</h3>
                    <p className="text-gray-500 text-sm mt-2">You have already submitted a pitch for this mission. Await client review.</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmitProposal} className="space-y-8 flex-1">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Mission Pitch</label>
                          <span className="text-[9px] font-black text-gray-300 uppercase">{pitch.length}/500</span>
                       </div>
                       <textarea 
                          required
                          maxLength={500}
                          value={pitch}
                          onChange={(e) => setPitch(e.target.value)}
                          placeholder="Tell the client why your lens is the best for this assignment..."
                          className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] outline-none focus:border-red-600 transition-all font-medium text-sm min-h-[200px] resize-none"
                       />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Quote (KES)</label>
                          <div className="relative">
                             <input 
                                type="number" 
                                required
                                value={quote}
                                onChange={(e) => setQuote(Number(e.target.value))}
                                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-black text-2xl"
                             />
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300 text-xs">KES</div>
                          </div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">Requested Budget: {gig.budgetMin} - {gig.budgetMax}</p>
                       </div>
                       <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
                          <Target className="text-red-600 mb-2" size={24} />
                          <span className="block text-[10px] font-black text-red-600 uppercase mb-1">Portfolio Link</span>
                          <p className="text-[10px] font-medium text-red-700 leading-relaxed uppercase">We will automatically attach your verified stats and top-selling assets to this bid.</p>
                       </div>
                    </div>

                    <button type="submit" className="w-full bg-red-600 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-red-900/40 hover:bg-black transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                       TRANSMIT PROPOSAL <Send size={18} />
                    </button>
                 </form>
               )}
             </AnimatePresence>
           ) : (
             <div className="space-y-8 py-10 text-center">
                <ShieldCheck size={64} className="mx-auto text-gray-200" />
                <h3 className="font-embroidery text-4xl italic text-gray-900 uppercase">Pro Access Required</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">Switch to a Photographer persona to bid on this opportunity.</p>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

const PostGigWizard = ({ onClose, onGigAdded }: { onClose: any, onGigAdded: (g: Gig) => void }) => {
  const { user } = useUserStore();
  const [step, setStep] = useState(1);
  const [isStkProcessing, setIsStkProcessing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    location: '',
    deadline: '',
    budget: 15000,
  });

  const next = () => setStep(s => Math.min(s + 1, 4));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handleMpesaEscrow = () => {
    if (!formData.title || !formData.description) return;
    setIsStkProcessing(true);
    // Simulate Safaricom STK Push Delay
    setTimeout(() => {
      setIsStkProcessing(false);
      const newGig: Gig = {
        id: `gig-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        location: formData.location || 'Nairobi',
        deadline: formData.deadline || 'Flex-Date',
        budgetMin: formData.budget * 0.8,
        budgetMax: formData.budget,
        currency: 'KES',
        postedBy: user?.name || 'Anonymous Client',
        status: 'Open',
        type: 'Public',
        urgency: formData.budget > 50000 ? 'Flash' : 'Normal',
        requirements: ['Verified Pro', 'Raw Files'],
      };
      onGigAdded(newGig);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white text-black rounded-[4rem] shadow-2xl overflow-hidden max-w-2xl w-full"
      >
        <div className="bg-red-600 p-10 text-white flex justify-between items-center">
           <h3 className="font-embroidery text-4xl italic uppercase">COMMISSION HUB</h3>
           <button onClick={onClose} className="hover:bg-black/20 p-2 rounded-full"><X size={24}/></button>
        </div>

        <div className="p-8 md:p-12">
          {/* Stepper Dots */}
          <div className="flex gap-2 mb-12">
            {[1,2,3,4].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? 'bg-red-600' : 'bg-gray-100'}`} />
            ))}
          </div>

          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h4 className="font-embroidery text-4xl italic">MISSION TITLE</h4>
                  <input 
                    type="text" 
                    placeholder="e.g. Traditional Swahili Wedding - 2 Days"
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-red-600 font-bold text-xl"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {['Wedding', 'News', 'Fashion'].map(c => (
                      <button 
                        key={c}
                        type="button"
                        onClick={() => setFormData({...formData, category: c})}
                        className={`p-4 rounded-2xl border-2 transition-all font-black uppercase text-[10px] ${formData.category === c ? 'bg-red-600 border-red-600 text-white' : 'border-gray-100 text-gray-400'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h4 className="font-embroidery text-4xl italic">THE BRIEF</h4>
                  <textarea 
                    rows={6}
                    placeholder="Details about style, expected delivery, and specific shots..."
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-3xl outline-none focus:border-red-600 font-medium text-lg leading-relaxed"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                  <h4 className="font-embroidery text-4xl italic">LOGISTICS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Location"
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-bold"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                    <input 
                      type="date" 
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl font-bold uppercase"
                      value={formData.deadline}
                      onChange={e => setFormData({...formData, deadline: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8 text-center">
                  <div>
                    <h4 className="font-embroidery text-4xl italic mb-4">AUTHORIZE BUDGET</h4>
                    <p className="text-gray-500 text-sm mb-10 font-medium uppercase tracking-widest">Authorize the Escrow deposit via M-Pesa</p>
                    <span className="text-7xl font-bungee text-red-600">KES {formData.budget.toLocaleString()}</span>
                    <input 
                      type="range" min="5000" max="150000" step="5000"
                      className="w-full h-2 bg-gray-100 rounded-full accent-red-600 mt-12"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: Number(e.target.value)})}
                    />
                  </div>
                  <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-4 text-left">
                    <Smartphone size={24} className="text-red-600 shrink-0" />
                    <p className="text-[10px] font-bold text-red-700 uppercase leading-relaxed">By finalizing, a PIN request will be sent to your Safaricom handset to secure the funds in the Picha Zangu Escrow Node.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <button onClick={prev} className="flex-1 py-5 bg-gray-100 text-black rounded-2xl font-black uppercase text-xs tracking-widest">Back</button>
            )}
            {step < 4 ? (
              <button 
                onClick={next} 
                disabled={step === 1 && !formData.title}
                className="flex-[2] py-5 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-30"
              >
                Continue <ChevronRight className="inline ml-2" size={16}/>
              </button>
            ) : (
              <button 
                onClick={handleMpesaEscrow}
                disabled={isStkProcessing}
                className="flex-[2] py-5 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl flex items-center justify-center gap-3"
              >
                {isStkProcessing ? <Loader2 size={20} className="animate-spin" /> : <Smartphone size={20} />}
                {isStkProcessing ? 'WAITING FOR PIN...' : 'EXECUTE AUTHORIZATION'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- UTILS ---

const NavBtn = ({ active, label, onClick }: { active: boolean, label: string, onClick: any }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${active ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-400 hover:text-white'}`}
  >
    {label}
  </button>
);

const DetailItem = ({icon, label, val}: any) => (
  <div className="flex items-center gap-4">
     <div className="text-red-500">{icon}</div>
     <div>
        <span className="block text-[8px] font-black text-gray-500 uppercase">{label}</span>
        <span className="text-sm font-bold">{val}</span>
     </div>
  </div>
);

export default Gigz;