import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Calendar, Plus, Filter, Search, 
  ChevronRight, Star, ShieldCheck, Zap, ArrowRight, 
  Info, MessageSquare, DollarSign, Camera, CheckCircle,
  Clock, Award, LayoutGrid, List, X, Map as MapIcon,
  Navigation as NavigationIcon, Sparkles, Send, PlusCircle,
  FileText, User, ChevronLeft, Loader2
} from 'lucide-react';
import { MOCK_GIGS, MOCK_BIDS, CURRENCY_SYMBOLS, COLORS } from '../constants';
import { UserRole, Gig, Bid } from '../types';
import { useUserStore, useToastStore } from '../store/useAppStore';

const Gigz: React.FC = () => {
  const { user } = useUserStore();
  const userRole = user?.role || 'client';
  const showToast = useToastStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<'find' | 'my-gigs' | 'history'>('find');
  const [showWizard, setShowWizard] = useState(false);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter Logic
  const filteredGigs = MOCK_GIGS.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          gig.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || gig.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-20 space-y-10 animate-in fade-in duration-500 pt-20">
      {/* 1. DYNAMIC HEADER */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="text-red-600" size={20} />
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Opportunity Network</span>
          </div>
          <h1 className="font-embroidery text-6xl text-white leading-none">
            GIGS & <span className="font-embroidery-sketch text-red-600">PROPOSALS</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">East Africa's premier portal for custom photography commissions.</p>
        </div>

        {userRole !== 'photographer' && (
          <button 
            onClick={() => setShowWizard(true)}
            className="group relative bg-red-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-red-600 transition-all flex items-center gap-3"
          >
            <Plus size={20} /> Post New Gig
            <div className="absolute inset-x-10 bottom-2 h-[1px] border-b border-dashed border-white/30" />
          </button>
        )}
      </header>

      {/* 2. NAVIGATION & SEARCH BAR */}
      <div className="sticky top-20 z-40 space-y-6 bg-black/80 backdrop-blur-xl py-4 -mx-4 px-4 md:-mx-0 md:px-0 border-b border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex bg-white/5 p-2 rounded-[1.8rem] border border-white/10 shadow-sm">
            <NavBtn active={activeTab === 'find'} label="Find Gigs" onClick={() => setActiveTab('find')} />
            {userRole !== 'photographer' && <NavBtn active={activeTab === 'my-gigs'} label="My Posted Gigs" onClick={() => setActiveTab('my-gigs')} />}
            <NavBtn active={activeTab === 'history'} label="History" onClick={() => setActiveTab('history')} />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={18} />
                <input 
                  type="text" 
                  placeholder="Location or keywords..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-red-600/10 focus:border-red-600/50 transition-all text-sm font-medium text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-red-600 transition-colors shadow-sm">
               <Filter size={20} />
             </button>
             <div className="hidden sm:flex bg-white/5 border border-white/10 rounded-2xl p-1 shadow-sm">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400'}`}><LayoutGrid size={18}/></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400'}`}><List size={18}/></button>
             </div>
          </div>
        </div>

        {/* Quick Filters */}
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
        {activeTab === 'find' && (
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
        )}
        
        {activeTab === 'my-gigs' && (
          <div className="flex flex-col gap-6">
             {MOCK_GIGS.filter(g => g.postedBy.includes(user?.name || '')).length === 0 ? (
               <div className="py-20 text-center bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
                  <Briefcase size={48} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">You haven't posted any gigs yet.</p>
                  <button onClick={() => setShowWizard(true)} className="mt-6 text-red-600 font-black uppercase text-[10px] tracking-widest hover:underline">Post Your First Gig</button>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_GIGS.filter(g => g.postedBy.includes(user?.name || '')).map(gig => (
                    <GigCard key={gig.id} gig={gig} viewMode="grid" onClick={() => setSelectedGig(gig)} />
                  ))}
               </div>
             )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="py-20 text-center text-gray-500">
             <Clock size={48} className="mx-auto mb-4 opacity-20" />
             <p className="font-black text-xs uppercase tracking-widest">No completed gigs in your history.</p>
          </div>
        )}
      </main>

      {/* 4. MODALS: DETAIL & WIZARD */}
      <AnimatePresence>
        {selectedGig && (
          <GigDetailModal 
            gig={selectedGig} 
            userRole={userRole} 
            onClose={() => setSelectedGig(null)} 
          />
        )}
        {showWizard && (
          <PostGigWizard 
            onClose={() => setShowWizard(false)} 
          />
        )}
      </AnimatePresence>

      {/* 5. GIG LEADERBOARD MINI-PANEL */}
      <section className="mt-20 p-12 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] text-white relative overflow-hidden group mx-4 md:mx-0">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <div className="flex items-center gap-2 mb-4">
                 <Award className="text-red-600" size={24} />
                 <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Leaderboard</span>
               </div>
               <h2 className="font-embroidery text-5xl italic leading-none mb-6">MOST HIRED <br/><span className="text-red-600 font-embroidery-sketch">THIS MONTH</span></h2>
               <p className="text-gray-400 text-sm max-w-md leading-relaxed mb-10">Meet the professionals consistently delivering high-quality assets across East Africa.</p>
               
               <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-all">
                       <div className="flex items-center gap-4">
                          <span className="font-bungee text-red-600">#{i}</span>
                          <div className="w-10 h-10 rounded-full bg-gray-800" />
                          <div>
                             <span className="block font-bold">Ali Studio</span>
                             <span className="text-[10px] text-gray-500 uppercase tracking-widest">Nairobi • 4.9 <Star size={10} className="inline fill-current"/></span>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="block font-bungee text-red-600">14 GIGS</span>
                          <span className="text-[10px] text-gray-500 uppercase">Booked</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
               <Zap className="text-red-600 mb-6 animate-pulse" size={40} />
               <h3 className="font-embroidery text-4xl mb-4 italic">INSTANT <br/>RECRUITMENT</h3>
               <p className="text-gray-400 text-sm leading-relaxed mb-8">Verified Pros can be hired in one click without the bidding process. Direct access to elite talent.</p>
               <button className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-900/40 hover:bg-white hover:text-red-600 transition-all text-[10px] uppercase tracking-widest">
                 Browse Top Talent
               </button>
               <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 translate-x-10">
                  <ShieldCheck size={200} />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

// --- SUBCOMPONENTS ---

interface GigCardProps {
  gig: Gig;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const GigCard: React.FC<GigCardProps> = ({ gig, viewMode, onClick }) => {
  const isFlash = gig.urgency === 'Flash';

  if (viewMode === 'list') {
    return (
      <motion.div 
        layout
        onClick={onClick}
        className={`flex flex-col md:flex-row items-center gap-6 p-6 bg-[#111] border border-white/5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group ${isFlash ? 'border-l-8 border-red-600' : ''}`}
      >
        <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-black shrink-0 relative">
           <div className="absolute inset-0 bg-red-600/5 flex items-center justify-center">
              <Camera className="text-red-600/20" size={40} />
           </div>
           {isFlash && <div className="absolute inset-0 bg-red-600/10 animate-pulse" />}
        </div>
        
        <div className="flex-1 min-w-0">
           <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{gig.category}</span>
              <span className="w-1 h-1 bg-white/10 rounded-full" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{gig.location}</span>
           </div>
           <h3 className="text-xl font-bold text-white truncate group-hover:text-red-600 transition-colors">{gig.title}</h3>
           <p className="text-gray-500 text-sm mt-1 line-clamp-1">{gig.description}</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
           <span className="text-xl font-bungee text-white">
             {CURRENCY_SYMBOLS[gig.currency]} {gig.budgetMin.toLocaleString()}
           </span>
           <button className="bg-white/5 text-gray-400 group-hover:bg-red-600 group-hover:text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">View</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`bg-[#111] rounded-[2.5rem] border border-white/5 shadow-sm overflow-hidden hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full ${isFlash ? 'ring-2 ring-red-600' : ''}`}
    >
      <div className="p-8 pb-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
           <div className={`p-3 rounded-2xl ${isFlash ? 'bg-red-600 text-white animate-pulse' : 'bg-red-600/10 text-red-600'}`}>
              {isFlash ? <Zap size={24}/> : <Camera size={24}/>}
           </div>
           <div className="text-right">
              <span className="block text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Max Budget</span>
              <span className="font-bungee text-lg text-white leading-none">
                 {CURRENCY_SYMBOLS[gig.currency]} {gig.budgetMax.toLocaleString()}
              </span>
           </div>
        </div>

        <div className="mb-6">
           <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] block mb-1">{gig.category}</span>
           <h3 className="text-xl font-bold text-white group-hover:text-red-600 transition-colors leading-tight line-clamp-2">{gig.title}</h3>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
          {gig.description}
        </p>

        <div className="space-y-3 mt-auto mb-4">
           <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={16} className="text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest">{gig.location}</span>
           </div>
           <div className="flex items-center gap-3 text-gray-400">
              <Clock size={16} className="text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest">Deadline: {gig.deadline}</span>
           </div>
        </div>
      </div>

      <div className="p-8 pt-0 flex gap-2">
         <button className="flex-1 bg-white/5 hover:bg-red-600 hover:text-white text-gray-400 font-black py-4 rounded-2xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/5">
            View Details <Info size={14}/>
         </button>
      </div>
    </motion.div>
  );
};

const GigDetailModal = ({ gig, userRole, onClose }: { gig: Gig, userRole: UserRole, onClose: any }) => {
  const [pitch, setPitch] = useState('');
  const [quote, setQuote] = useState(gig.budgetMin);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(onClose, 2000);
  };

  const isMyGig = gig.postedBy.includes(user?.name || '');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Left Info Panel */}
        <div className="w-full md:w-[40%] bg-gray-900 p-12 text-white flex flex-col overflow-y-auto custom-scrollbar">
           <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${gig.urgency === 'Flash' ? 'bg-red-600' : 'bg-white/10'}`}>
                {gig.urgency === 'Flash' ? <Zap size={32}/> : <Briefcase size={32}/>}
              </div>
              <span className="text-red-500 font-bungee text-2xl">
                 {CURRENCY_SYMBOLS[gig.currency]} {gig.budgetMax.toLocaleString()}
              </span>
           </div>

           <h2 className="font-embroidery text-5xl mb-6 italic leading-tight">{gig.title}</h2>
           
           <div className="space-y-6 flex-1">
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5">
                 <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-4">Requirements</h4>
                 <div className="flex flex-wrap gap-2">
                    {gig.requirements.map(req => (
                      <span key={req} className="px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-red-900/40">{req}</span>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4">
                    <MapPin className="text-red-600" size={20} />
                    <div>
                       <span className="block text-[8px] font-black text-gray-500 uppercase">Location</span>
                       <span className="text-sm font-bold">{gig.location}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Calendar className="text-red-600" size={20} />
                    <div>
                       <span className="block text-[8px] font-black text-gray-500 uppercase">Event Date</span>
                       <span className="text-sm font-bold">{gig.deadline}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <User className="text-red-600" size={20} />
                    <div>
                       <span className="block text-[8px] font-black text-gray-500 uppercase">Posted By</span>
                       <span className="text-sm font-bold">{gig.postedBy}</span>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                 <ShieldCheck className="text-green-500" size={24} />
                 <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase">
                    Escrow Protection Enabled: Your funds are held by Picha Zangu until files are delivered.
                 </p>
              </div>
           </div>
        </div>

        {/* Right Bidding Panel / Management Panel */}
        <div className="flex-1 p-12 flex flex-col bg-white overflow-y-auto custom-scrollbar text-black">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-embroidery text-4xl text-gray-900 italic">
                {isMyGig ? 'MANAGE GIG' : userRole === 'photographer' ? 'SUBMIT PROPOSAL' : 'GIG DETAILS'}
              </h3>
              <button onClick={onClose} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100"><X size={20}/></button>
           </div>

           {isMyGig ? (
             <div className="space-y-8">
                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                   <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Bids Received (8)</h4>
                   <div className="space-y-4">
                      {[1,2].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                              <div>
                                 <span className="block font-bold">Ali Studio</span>
                                 <span className="text-[10px] text-gray-400 uppercase">4.9 Star Pro</span>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="block font-bungee text-red-600">KES 18,000</span>
                              <button className="text-[10px] font-black text-red-600 uppercase underline">Review Pitch</button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <button className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest">Close Bidding</button>
             </div>
           ) : userRole === 'photographer' ? (
             <AnimatePresence mode="wait">
               {isSuccess ? (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex-1 flex flex-col items-center justify-center text-center py-20"
                 >
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl mb-8 animate-bounce">
                       <CheckCircle size={48} />
                    </div>
                    <h3 className="font-embroidery text-4xl mb-2 italic text-black">PROPOSAL SENT</h3>
                    <p className="text-gray-500 text-sm font-medium">The client will review your pitch and portfolio.</p>
                 </motion.div>
               ) : (
                 <motion.form onSubmit={handleSubmit} className="space-y-8 flex-1">
                    <div className="space-y-4">
                       <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Pitch</label>
                       <textarea 
                          required
                          value={pitch}
                          onChange={(e) => setPitch(e.target.value)}
                          placeholder="Why are you the perfect pro for this job?"
                          className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-red-600 transition-all font-medium text-sm min-h-[150px] resize-none"
                       />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Requested Quote (KES)</label>
                          <div className="relative">
                             <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                             <input 
                                type="number" 
                                required
                                value={quote}
                                onChange={(e) => setQuote(Number(e.target.value))}
                                className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-black text-xl"
                             />
                          </div>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">Client Budget: KSH {gig.budgetMin} - {gig.budgetMax}</p>
                       </div>
                       <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
                          <Sparkles className="text-red-600 mb-2" size={24} />
                          <span className="block text-[10px] font-black text-red-600 uppercase mb-2">Portfolio Integration</span>
                          <p className="text-[10px] font-medium text-red-700 leading-relaxed uppercase">
                             We will automatically attach your verified portfolio and top-selling assets to this bid.
                          </p>
                       </div>
                    </div>

                    <div className="mt-auto pt-10">
                       <button type="submit" className="w-full bg-red-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-red-900/40 hover:bg-red-700 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                          SUBMIT OFFICIAL PROPOSAL <Send size={18} />
                       </button>
                       <p className="text-center text-[9px] font-black text-gray-400 uppercase mt-4 tracking-[0.2em]">Platform fee deducted upon successful completion</p>
                    </div>
                 </motion.form>
               )}
             </AnimatePresence>
           ) : (
             <div className="space-y-8">
                <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                   <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-400 mb-4">Job Description</h4>
                   <p className="text-gray-800 leading-relaxed font-medium">
                      {gig.description}
                   </p>
                </div>
                <div className="bg-red-50 p-10 rounded-[3rem] border border-red-100 text-center">
                   <User className="text-red-600 mx-auto mb-4" size={40} />
                   <h4 className="font-bold text-xl mb-2">Join as Photographer?</h4>
                   <p className="text-gray-500 text-sm mb-6">Switch your persona to "Photographer" to bid on this and other available gigs.</p>
                </div>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
};

// --- WIZARD COMPONENT FOR POSTING A NEW GIG ---
const PostGigWizard = ({ onClose }: { onClose: any }) => {
  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    deadline: '',
    budget: 10000,
    requirements: [] as string[]
  });

  const next = () => setStep(s => Math.min(s + 5, 5));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[4rem] p-16 text-center max-w-lg w-full">
           <div className="w-24 h-24 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
              <CheckCircle size={48} />
           </div>
           <h3 className="font-embroidery text-5xl text-gray-900 italic mb-4 uppercase">GIG LIVE!</h3>
           <p className="text-gray-500 font-medium mb-10 leading-relaxed">Your request has been broadcast to the Picha Zangu network. You will receive bids shortly.</p>
           <button onClick={onClose} className="w-full bg-black text-white font-black py-5 rounded-2xl uppercase text-xs tracking-widest">Return to Dashboard</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-3xl w-full my-auto"
      >
         <div className="bg-red-600 p-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
               <PlusCircle size={32} />
               <h3 className="font-embroidery text-4xl italic uppercase">COMMISSION A PRO</h3>
            </div>
            <button onClick={onClose} className="hover:bg-black/20 p-3 rounded-full transition-colors"><X size={28}/></button>
         </div>

         <div className="p-12">
            {/* Progress Bar */}
            <div className="flex gap-3 mb-16">
               {[1,2,3,4,5].map(s => (
                 <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-red-600' : 'bg-gray-100'}`} />
               ))}
            </div>

            <div className="min-h-[400px] flex flex-col">
               {step === 1 && (
                 <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div>
                      <h4 className="font-embroidery text-5xl mb-2 italic uppercase text-gray-900">IDENTITY & <span className="text-red-600">SECTOR</span></h4>
                      <p className="text-gray-400 text-sm font-medium">Define your project title and professional category.</p>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Job Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Wedding Documentary in Karen" 
                            className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold text-lg text-black"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                          />
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['Wedding', 'News', 'Sports', 'Fashion', 'Corporate', 'Other'].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setFormData({...formData, category: cat})}
                                className={`p-4 rounded-2xl border-2 transition-all text-center ${formData.category === cat ? 'bg-red-600 border-red-600 text-white shadow-xl' : 'bg-white border-gray-100 text-gray-500 hover:border-red-600'}`}
                            >
                                <span className="text-sm font-black uppercase tracking-tighter">{cat}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
               )}

               {step === 2 && (
                 <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div>
                      <h4 className="font-embroidery text-5xl mb-2 italic uppercase text-gray-900">THE <span className="text-red-600">MISSION</span></h4>
                      <p className="text-gray-400 text-sm font-medium">Describe your vision and requirements for the photographer.</p>
                    </div>
                    <textarea 
                       rows={8}
                       placeholder="Detail your requirements. What are the key moments? What is the expected delivery time? Mention any specific gear needed (e.g. Drones)."
                       className="w-full p-8 bg-gray-50 border border-gray-100 rounded-[2.5rem] outline-none focus:border-red-600 transition-all font-medium text-black leading-relaxed"
                       value={formData.description}
                       onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                 </div>
               )}

               {step === 3 && (
                 <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div>
                      <h4 className="font-embroidery text-5xl mb-2 italic uppercase text-gray-900">LOGISTICS & <span className="text-red-600">TIME</span></h4>
                      <p className="text-gray-400 text-sm font-medium">Where and when is the assignment?</p>
                    </div>
                    <div className="space-y-6">
                       <div className="relative">
                          <MapIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input 
                            type="text" 
                            placeholder="Exact Location (e.g. Westlands, Nairobi)" 
                            className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold text-black"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                       </div>
                       <div className="relative">
                          <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input 
                            type="date" 
                            className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold text-black uppercase"
                            value={formData.deadline}
                            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>
               )}

               {step === 4 && (
                 <div className="space-y-8 animate-in slide-in-from-right duration-500">
                    <div>
                      <h4 className="font-embroidery text-5xl mb-2 italic uppercase text-gray-900">BUDGET & <span className="text-red-600">ESCROW</span></h4>
                      <p className="text-gray-400 text-sm font-medium">Set a fair market budget. Funds are held in escrow for safety.</p>
                    </div>
                    <div className="p-10 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden">
                       <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-8">
                             <Zap className="text-red-600 animate-pulse" size={28} />
                             <span className="text-red-600 font-black text-[10px] uppercase tracking-widest">AI Market Check Active</span>
                          </div>
                          <input 
                            type="range" 
                            min="5000" 
                            max="200000" 
                            step="5000"
                            value={formData.budget}
                            onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                            className="w-full accent-red-600 mb-10 h-2 bg-white/10 rounded-full"
                          />
                          <div className="text-center">
                             <span className="text-6xl font-bungee text-white">KSH {formData.budget.toLocaleString()}</span>
                             <p className="text-[10px] font-black text-gray-500 uppercase mt-4 tracking-[0.4em]">Suggested for {formData.category || 'High-End'} assignments</p>
                          </div>
                       </div>
                       <DollarSign size={200} className="absolute -right-10 -bottom-10 text-white/5 opacity-10" />
                    </div>
                 </div>
               )}

               {step === 5 && (
                 <div className="space-y-8 animate-in slide-in-from-right duration-500 flex-1 flex flex-col">
                    <div>
                      <h4 className="font-embroidery text-5xl mb-2 italic uppercase text-gray-900">FINAL <span className="text-red-600">REVIEW</span></h4>
                      <p className="text-gray-400 text-sm font-medium">Verify your details before broadcasting to the network.</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-[3rem] p-10 space-y-6 border border-gray-100 overflow-y-auto max-h-[300px] custom-scrollbar">
                       <ReviewItem label="TITLE" value={formData.title || 'Untitled Project'} />
                       <ReviewItem label="CATEGORY" value={formData.category || 'General'} />
                       <ReviewItem label="DESCRIPTION" value={formData.description || 'No details provided.'} />
                       <ReviewItem label="LOCATION" value={formData.location || 'Remote'} />
                       <ReviewItem label="DATE" value={formData.deadline || 'Flex-date'} />
                       <ReviewItem label="ESCROW BUDGET" value={`KSH ${formData.budget.toLocaleString()}`} accent />
                    </div>
                    <div className="p-6 bg-red-50 rounded-3xl border border-red-100 flex items-start gap-4">
                       <ShieldCheck className="text-red-600 mt-1 shrink-0" size={24} />
                       <p className="text-[10px] font-bold text-red-700 leading-relaxed uppercase tracking-widest">
                          By publishing, you agree to Picha Zangu's regional escrow protocols. Your payment will be authorized via STK push upon publication.
                       </p>
                    </div>
                 </div>
               )}
            </div>

            <div className="flex gap-4 mt-12 pt-10 border-t border-gray-100">
               {step > 1 && (
                 <button onClick={prev} className="flex-1 bg-gray-100 text-gray-900 font-black py-5 rounded-[2rem] hover:bg-gray-200 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                   <ChevronLeft size={18}/> Back
                 </button>
               )}
               {step < 5 ? (
                 <button 
                    disabled={step === 1 && !formData.title}
                    onClick={next} 
                    className="flex-[2] bg-red-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-red-900/20 hover:bg-black transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-2"
                 >
                    Continue <ChevronRight size={18}/>
                 </button>
               ) : (
                 <button 
                   onClick={handlePublish}
                   disabled={isPublishing}
                   className="flex-[2] bg-red-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-red-900/40 hover:bg-black transition-all uppercase text-xs tracking-widest flex items-center justify-center gap-3"
                 >
                    {/* // Fixed 'Cannot find name Loader2' by adding it to the lucide-react import list. */}
                    {isPublishing ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    {isPublishing ? 'PUBLISHING...' : 'PAY & BROADCAST GIG'}
                 </button>
               )}
            </div>
         </div>
      </motion.div>
    </div>
  );
};

const ReviewItem = ({label, value, accent}: {label: string, value: string, accent?: boolean}) => (
  <div className="border-b border-gray-200 pb-4 last:border-0">
     <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</span>
     <span className={`text-sm font-bold ${accent ? 'text-red-600 font-bungee text-xl' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const NavBtn = ({ active, label, onClick }: { active: boolean, label: string, onClick: any }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${active ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-400 hover:text-white'}`}
  >
    {label}
  </button>
);

export default Gigz;