import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, ShoppingBag, UserCheck, Star, Calendar, 
  MapPin, Video, Info, Tag, Download, Pin, 
  ChevronRight, ArrowUpRight, Search, Filter, 
  CheckCircle2, PlusCircle, Briefcase, Heart, X
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_MODELS, MOCK_CASTING_CALLS, CURRENCY_SYMBOLS } from '../constants';
import { Photo, Model, CastingCall } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import { useCartStore } from '../store/useAppStore';

const FashionHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lookbook' | 'models' | 'casting'>('lookbook');
  const [selectedFilter, setSelectedFilter] = useState('High Fashion');
  const [isCastingModalOpen, setIsCastingModalOpen] = useState(false);
  const [isModelBookingOpen, setIsModelBookingOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const fashionPhotos = MOCK_PHOTOS.filter(p => p.category === 'Fashion');

  const renderLookbook = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {fashionPhotos.map((photo, i) => (
          <motion.div 
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white break-inside-avoid overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-100"
          >
            <div className="relative overflow-hidden aspect-auto">
              <img 
                src={photo.url} 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                alt={photo.title} 
              />
              
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-white/40 backdrop-blur-sm rounded-full border border-white flex items-center justify-center cursor-pointer group-hover:scale-150 transition-transform">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                <div className="absolute left-6 bg-white px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-[10px] font-black uppercase text-gray-900 tracking-widest">Silk Couture • KSH 12,000</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <div className="flex justify-between items-end text-white">
                  <div>
                    <h3 className="font-embroidery text-3xl mb-1 italic">{photo.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Photo by {photo.photographer}</p>
                  </div>
                  <button 
                    onClick={() => addItem(photo)}
                    className="p-3 bg-red-600 rounded-2xl shadow-xl hover:bg-red-700 transition-all"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-50 flex justify-between items-center">
               <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-red-600 transition-colors"><Heart size={18} /></button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors"><Pin size={18} /></button>
               </div>
               <span className="font-bungee text-gray-900">KES {photo.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderModels = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {MOCK_MODELS.map((model) => (
          <div key={model.id} className="group flex flex-col">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 shadow-xl border border-gray-100">
               <img src={model.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={model.name} />
               {model.verified && (
                 <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-white">
                   <VerificationBadge type="client" size={16} />
                   <span className="text-[9px] font-black uppercase text-gray-900 tracking-widest">Zangu Verified</span>
                 </div>
               )}
               <div className="absolute bottom-6 left-6 right-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button 
                    onClick={() => { setSelectedModel(model); setIsModelBookingOpen(true); }}
                    className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-2xl shadow-red-900/40 text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all"
                  >
                    BOOK FOR CASTING
                  </button>
               </div>
               <div className="absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-red-600 p-0.5 bg-white cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                    <Video size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-bold px-1 rounded-sm">BTS</div>
               </div>
            </div>
            <div className="px-2">
              <div className="flex justify-between items-center mb-1">
                 <h3 className="font-embroidery text-2xl text-gray-900 italic">{model.name} {model.verified && <VerificationBadge type="client" size={14} />}</h3>
                 <div className="flex items-center gap-1 text-red-600">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black">{model.rating}</span>
                 </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{model.style} • {model.agency || 'Freelance'}</p>
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="block text-[8px] font-black text-gray-400 uppercase mb-0.5">Height</span>
                    <span className="text-xs font-bold">{model.height}</span>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="block text-[8px] font-black text-gray-400 uppercase mb-0.5">Stats</span>
                    <span className="text-xs font-bold">{model.measurements}</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCasting = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-embroidery text-4xl italic">CASTING CALLS</h2>
          <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1">Direct opportunities for models & photographers</p>
        </div>
        <button 
          onClick={() => setIsCastingModalOpen(true)}
          className="bg-black text-white font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-red-600 transition-all text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <PlusCircle size={18} /> POST CALL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_CASTING_CALLS.map((call) => (
          <div key={call.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">{call.agency}</span>
                <h3 className="font-embroidery text-3xl italic group-hover:text-red-600 transition-colors">{call.title}</h3>
              </div>
              <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl border border-red-100 font-bungee text-lg">
                KES {call.budget.toLocaleString()}
              </div>
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
              {call.description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <MapPin size={18} className="text-red-600 mb-2" />
                  <span className="block text-[9px] font-black text-gray-400 uppercase">Location</span>
                  <span className="text-xs font-bold">{call.location}</span>
               </div>
               <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <Calendar size={18} className="text-red-600 mb-2" />
                  <span className="block text-[9px] font-black text-gray-400 uppercase">Deadline</span>
                  <span className="text-xs font-bold">{call.deadline}</span>
               </div>
               <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <Briefcase size={18} className="text-red-600 mb-2" />
                  <span className="block text-[9px] font-black text-gray-400 uppercase">Contract</span>
                  <span className="text-xs font-bold">Standard</span>
               </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-gray-900 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Apply Now</button>
              <button className="px-6 py-4 bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 hover:text-red-600 transition-all"><Tag size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 space-y-20 -mx-4 md:-mx-0">
      <section className="relative h-[450px] md:h-[600px] overflow-hidden md:rounded-[4rem] shadow-2xl bg-black">
         <div className="absolute inset-0 opacity-60">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover ken-burns" alt="Hero" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Editorial Excellence</span>
            <h1 className="font-embroidery text-6xl md:text-9xl text-white italic leading-none mb-8">FASHION & <br/><span className="font-embroidery-sketch text-red-600">CASTING</span></h1>
            <div className="flex gap-6">
               <button onClick={() => setActiveTab('lookbook')} className="bg-white text-gray-900 font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest">View Lookbook</button>
               <button onClick={() => setActiveTab('casting')} className="bg-red-600 text-white font-black px-12 py-5 rounded-[2.5rem] shadow-2xl hover:bg-white hover:text-gray-900 transition-all text-xs uppercase tracking-widest">Join Casting</button>
            </div>
         </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex bg-gray-50 p-2 rounded-[2rem] border border-gray-100">
            <TabBtn active={activeTab==='lookbook'} label="The Lookbook" onClick={()=>setActiveTab('lookbook')} />
            <TabBtn active={activeTab==='models'} label="Model Market" onClick={()=>setActiveTab('models')} />
            <TabBtn active={activeTab==='casting'} label="Casting Calls" onClick={()=>setActiveTab('casting')} />
          </div>

          {activeTab === 'lookbook' && (
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
              {['High Fashion', 'Streetwear', 'Lingerie', 'Commercial', 'Fitness'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedFilter === cat ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === 'lookbook' && renderLookbook()}
        {activeTab === 'models' && renderModels()}
        {activeTab === 'casting' && renderCasting()}

        <section className="mt-32 bg-gray-900 rounded-[3.5rem] p-16 text-white overflow-hidden relative group">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="font-embroidery text-5xl mb-6 italic">TREND <br/><span className="text-red-600">FORECASTING</span></h2>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
                  AI-driven insights on regional aesthetic shifts. High Fashion is seeing a 35% growth in commercial licensing this month.
                </p>
                <div className="space-y-6">
                   <TrendBar label="High Fashion" percentage={88} color="bg-red-600" />
                   <TrendBar label="Streetwear" percentage={72} color="bg-white" />
                   <TrendBar label="Fitness" percentage={45} color="bg-gray-600" />
                </div>
             </div>
             <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/10 relative overflow-hidden">
                <div className="h-64 flex items-end justify-between gap-4">
                   {Array.from({length: 12}).map((_, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                        className="w-full bg-red-600/40 rounded-t-xl group-hover:bg-red-600 transition-colors"
                     />
                   ))}
                </div>
                <div className="mt-8 flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                   <span>Jan</span>
                   <span>Mar</span>
                   <span>May</span>
                   <span>Jul</span>
                   <span>Sep</span>
                   <span>Dec</span>
                </div>
             </div>
           </div>
           <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none select-none text-[25rem] font-embroidery whitespace-nowrap -rotate-12">
             STYLE
           </div>
        </section>

        <section className="mt-32 py-20 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-20">
           <div className="space-y-8">
              <h3 className="font-embroidery text-4xl italic">AGENCY PORTAL</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Management tools for established agencies. Sync multiple portfolios, track earnings across your talent pool, and handle global casting requests.
              </p>
              <button className="flex items-center gap-3 bg-gray-50 text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest border border-gray-100">
                Register Agency <ArrowUpRight size={18}/>
              </button>
           </div>
           <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 text-center">
              <Camera size={40} className="text-red-600 mx-auto mb-6" />
              <h3 className="font-embroidery text-4xl mb-4 italic">GET DISCOVERED</h3>
              <p className="text-red-700/70 text-sm mb-10 font-medium">
                Aspiring model? Upload 3 raw polaroids (no makeup, natural light) to enter our regional scouting pool.
              </p>
              <button className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all text-xs uppercase tracking-widest">UPLOAD POLAROIDS</button>
           </div>
        </section>
      </div>

      <AnimatePresence>
        {isCastingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden max-w-2xl w-full"
            >
               <div className="bg-gray-900 p-8 text-white flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Briefcase size={24} className="text-red-600" />
                    <h3 className="font-embroidery text-3xl italic">NEW CASTING CALL</h3>
                  </div>
                  <button onClick={() => setIsCastingModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={24}/></button>
               </div>
               <div className="p-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Project Title</label>
                      <input type="text" placeholder="e.g. Lookbook 2024" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Budget (KES)</label>
                      <input type="number" placeholder="50,000" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-bold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Description & Requirements</label>
                    <textarea rows={4} placeholder="Specific requirements (Height, style, etc.)" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-red-600 transition-all font-medium" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <CheckCircle2 size={18} className="text-red-600" />
                    <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Escrow Protection: We hold the funds until images are delivered.</p>
                  </div>
                  <button className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all">PUBLISH CASTING CALL</button>
               </div>
            </motion.div>
          </div>
        )}

        {isModelBookingOpen && selectedModel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[4rem] shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row"
            >
               <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
                  <img src={selectedModel.thumbnail} className="w-full h-full object-cover" alt={selectedModel.name} />
               </div>
               <div className="flex-1 p-12 flex flex-col">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h3 className="font-embroidery text-5xl text-gray-900 italic mb-2">{selectedModel.name} <VerificationBadge type="client" size={24} /></h3>
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">{selectedModel.style} PRO</p>
                    </div>
                    <button onClick={() => setIsModelBookingOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"><X size={20}/></button>
                  </div>

                  <div className="space-y-8 flex-1">
                     <div className="grid grid-cols-2 gap-4">
                        <StatItem label="Height" val={selectedModel.height} />
                        <StatItem label="Stats" val={selectedModel.measurements} />
                        <StatItem label="Tone" val={selectedModel.skinTone} />
                        <StatItem label="Rating" val={selectedModel.rating.toString()} />
                     </div>
                     <div>
                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Professional Comp Card</span>
                        <button className="w-full bg-gray-50 text-gray-900 font-black py-4 rounded-2xl border border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-100 transition-all">
                           <Download size={20} /> <span className="text-[10px] uppercase tracking-widest">Download Full Resume</span>
                        </button>
                     </div>
                  </div>

                  <div className="mt-12 space-y-4">
                     <button className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all uppercase tracking-[0.2em] text-xs">Request Booking</button>
                     <p className="text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">30% Deposit required to secure date</p>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TabBtn = ({label, active, onClick}: {label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.5rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] ${active ? 'bg-white text-red-600 shadow-xl' : 'text-gray-400 hover:text-gray-900'}`}
  >
    {label}
  </button>
);

const TrendBar = ({label, percentage, color}: {label: string, percentage: number, color: string}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
       <span className="text-[10px] font-black opacity-60">{percentage}%</span>
    </div>
    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
       <motion.div 
         initial={{ width: 0 }}
         whileInView={{ width: `${percentage}%` }}
         viewport={{ once: true }}
         className={`h-full ${color}`} 
       />
    </div>
  </div>
);

const StatItem = ({label, val}: {label: string, val: string}) => (
  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
    <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-sm font-bold text-gray-900">{val}</span>
  </div>
);

export default FashionHub;