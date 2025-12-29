import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Search, Filter, Camera, ShoppingCart, 
  MapPin, Clock, Users, Zap, Shield, Share2, 
  ChevronRight, Play, Info, Target, 
  Dribbble, Flame, X, Download, Heart,
  Dna, Briefcase, Map, Radio, Award, Eye,
  Globe
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_MATCHES, MOCK_PLAYERS, CURRENCY_SYMBOLS } from '../constants';
import { Photo, Match, PlayerStats } from '../types';
import ProtectedImage from '../components/ProtectedImage';
import VerificationBadge from '../components/VerificationBadge';
import { useCartStore } from '../store/useAppStore';

type LeagueTier = 'KPL' | 'NSL' | 'Div 1' | 'Div 2' | 'Regional' | 'County' | 'Women';

const SportsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'players' | 'bounties' | 'fans' | 'scout'>('feed');
  const [activeLeague, setActiveLeague] = useState<LeagueTier>('KPL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTradingCardOpen, setIsTradingCardOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  const addItem = useCartStore((state) => state.addItem);
  const sportsPhotos = MOCK_PHOTOS.filter(p => p.category === 'Sports');
  const filteredPhotos = sportsPhotos.filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const leagueTiers: LeagueTier[] = ['KPL', 'NSL', 'Div 1', 'Div 2', 'Regional', 'County', 'Women'];

  const renderScoreboard = () => (
    <div className="bg-[#111] border-b border-red-600/20 overflow-hidden sticky top-20 z-40">
      <div className="flex overflow-x-auto scrollbar-hide py-3 px-4 gap-6">
        <div className="flex items-center gap-2 px-4 border-r border-white/10 shrink-0">
           <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
           <span className="text-[10px] font-black uppercase text-white tracking-widest">Live Updates</span>
        </div>
        {MOCK_MATCHES.map((match) => (
          <motion.div 
            key={match.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`shrink-0 flex items-center gap-6 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 ${match.status === 'Live' ? 'border-red-600/40' : ''}`}
          >
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">
                {match.status === 'Live' ? match.minute + "'" : match.status}
              </span>
              <span className="text-[10px] font-bold text-gray-500">{match.league}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{match.homeTeam}</span>
                <span className="font-bungee text-lg text-red-600">{match.homeScore}</span>
              </div>
              <span className="text-gray-600 font-bold">-</span>
              <div className="flex items-center gap-2">
                <span className="font-bungee text-lg text-red-600">{match.awayScore}</span>
                <span className="font-bold text-white text-sm">{match.awayTeam}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFeed = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {filteredPhotos.map((photo) => (
        <SportsPhotoCard key={photo.id} photo={photo} onBuy={() => addItem(photo)} />
      ))}
    </motion.div>
  );

  const renderPlayers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {MOCK_PLAYERS.map((player) => (
        <motion.div 
          layout
          key={player.id} 
          className="bg-[#1a1a1a] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl group hover:border-red-600/30 transition-all cursor-pointer relative overflow-hidden"
          onClick={() => { setSelectedPlayer(player); setIsTradingCardOpen(true); }}
        >
          <div className="flex gap-6 mb-8 relative z-10">
             <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-red-600 transition-colors">
                <img src={player.image} className="w-full h-full object-cover" alt={player.name} />
             </div>
             <div>
                <h3 className="font-embroidery text-3xl text-white italic">{player.name}</h3>
                <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">{player.team} • #{player.jerseyNumber}</p>
                <div className="mt-2 flex items-center gap-2">
                   <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-gray-400">{player.position}</span>
                </div>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
             <StatBox label="Matches" val={player.matches} />
             <StatBox label="Goals" val={player.goals} />
             <StatBox label="Assists" val={player.assists} />
          </div>
          <button className="w-full bg-white/5 border border-white/10 group-hover:bg-red-600 group-hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10">
             View Player Vault
          </button>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Dna size={120} />
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 -mt-6 -mx-4 md:-mx-0">
      {renderScoreboard()}

      <div className="px-6 md:px-12 py-10 space-y-12">
        <header className="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="w-full lg:w-auto">
            <div className="flex items-center gap-3 mb-2">
               <Trophy className="text-red-600" size={24} />
               <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Kenyan Football Ecosystem</span>
            </div>
            <h1 className="font-embroidery text-6xl md:text-8xl leading-none text-white italic">MATCH <span className="text-red-600 font-embroidery-sketch">HUB</span></h1>
            
            <div className="flex flex-wrap gap-2 mt-8">
               {leagueTiers.map(tier => (
                 <button 
                  key={tier}
                  onClick={() => setActiveLeague(tier)}
                  className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${activeLeague === tier ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-white/5 border-white/10 text-gray-500 hover:border-red-600/50 hover:text-red-600'}`}
                 >
                   {tier}
                 </button>
               ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
             <div className="relative flex-1 sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600" size={20} />
                <input 
                  type="text" 
                  placeholder="JERSEY #, CLUB OR PLAYER..." 
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-[2rem] outline-none focus:border-red-600/50 transition-all font-bold text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <button className="p-4 bg-red-600 text-white rounded-[2rem] shadow-xl hover:bg-red-500 transition-all font-black">
                <Filter size={20} />
             </button>
          </div>
        </header>

        <div className="flex flex-wrap bg-white/5 p-2 rounded-[2.5rem] border border-white/10 w-fit">
           <TabBtn active={activeTab==='feed'} label="Live Match Feed" onClick={()=>setActiveTab('feed')} />
           <TabBtn active={activeTab==='players'} label="Player Market" onClick={()=>setActiveTab('players')} />
           <TabBtn active={activeTab==='bounties'} label="Bounty Board" onClick={()=>setActiveTab('bounties')} />
           <TabBtn active={activeTab==='fans'} label="Fan Zone" onClick={()=>setActiveTab('fans')} />
           <TabBtn active={activeTab==='scout'} label="Scout Portal" onClick={()=>setActiveTab('scout')} />
        </div>

        <main className="min-h-[500px]">
           {activeTab === 'feed' && renderFeed()}
           {activeTab === 'players' && renderPlayers()}
           
           {activeTab === 'bounties' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Gor Mahia Fans", desc: "Wanted: High-res wide shot of the green army in 'K'Ogalo' regalia.", prize: "KSH 5,000", urgency: 'Normal' },
                  { title: "AFC Leopards Goal", desc: "Urgent: Need the goal celebration from the 78th minute of the derby.", prize: "KSH 12,000", urgency: 'Flash' }
                ].map((b, i) => (
                  <div key={i} className="bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all group">
                    <div className="flex justify-between items-center mb-6">
                      <div className={`px-4 py-1 rounded-full text-[8px] font-black uppercase ${b.urgency === 'Flash' ? 'bg-red-600 animate-pulse' : 'bg-red-600/40'}`}>
                        {b.urgency} BOUNTY
                      </div>
                      <span className="font-bungee text-2xl text-white">{b.prize}</span>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-red-600 transition-colors">{b.title}</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">{b.desc}</p>
                    <button className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all">Submit Asset</button>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'fans' && (
              <div className="space-y-12">
                 <div className="bg-gradient-to-r from-red-600 to-red-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                    <div className="relative z-10">
                       <h2 className="font-embroidery text-5xl italic mb-4 text-white">FIND YOURSELF <br/>IN THE CROWD</h2>
                       <p className="text-red-100 text-sm max-w-md mb-8">Search through thousands of high-res crowd shots. Tag yourself and buy the memory.</p>
                       <div className="flex gap-4">
                          <input type="text" placeholder="Search by Stadium or Date..." className="bg-white/20 border border-white/30 rounded-2xl px-6 py-3 text-white placeholder-red-100 outline-none w-64 backdrop-blur-md" />
                          <button className="bg-white text-red-600 px-8 py-3 rounded-2xl font-black text-xs uppercase hover:bg-black hover:text-white transition-all">Scan Crowd</button>
                       </div>
                    </div>
                    <Users size={200} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sportsPhotos.map(p => (
                      <div key={p.id} className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer border border-white/5 hover:border-red-600/50">
                         <img src={p.url} className="w-full h-full object-cover" alt="" />
                      </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === 'scout' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-2 space-y-8">
                    <h3 className="font-embroidery text-4xl italic">RAW TALENT ARCHIVE</h3>
                    <p className="text-gray-500 text-sm">Professional scouts use our high-res "decisive moment" shots to analyze player form, positioning, and biomechanics.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       {MOCK_PLAYERS.map(p => (
                         <div key={p.id} className="bg-white/5 rounded-3xl p-6 border border-white/5 flex gap-4">
                            <div className="w-20 h-20 bg-gray-800 rounded-2xl shrink-0 overflow-hidden">
                               <img src={p.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                               <h4 className="font-bold text-white">{p.name}</h4>
                               <span className="text-[10px] font-black text-red-600 uppercase">{p.position}</span>
                               <button className="flex items-center gap-2 mt-4 text-[9px] font-black uppercase text-gray-500 hover:text-white transition-colors">
                                  <Eye size={14}/> Full Analysis Gallery
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-[#111] p-10 rounded-[3rem] border border-red-600/20">
                    <Target size={48} className="text-red-600 mb-6" />
                    <h4 className="font-embroidery text-3xl mb-4 italic text-white">HIRE SCOUT PHOTOGRAPHER</h4>
                    <p className="text-gray-400 text-xs mb-8 leading-relaxed font-medium">Get dedicated coverage for your academy's upcoming trials. High-res technical shots for player portfolios.</p>
                    <button className="w-full bg-red-600 text-white font-black py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl shadow-red-900/40">Book Scout Coverage</button>
                 </div>
              </div>
           )}
        </main>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20 border-t border-white/5 pt-20">
           <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Map size={20} className="text-red-600" />
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Stadium Heatmaps</span>
                 </div>
                 <h3 className="font-embroidery text-4xl mb-2 text-white italic">WHERE THE <br/>ACTION IS</h3>
                 <p className="text-gray-500 text-xs mb-8">Real-time data on photographer positioning at Nyayo & Kasarani stadiums.</p>
                 <button className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 transition-colors">Open Map View</button>
              </div>
              <Globe size={150} className="absolute -right-10 -bottom-10 opacity-5" />
           </div>

           <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5">
              <div className="flex items-center gap-2 mb-8">
                 <Award size={20} className="text-red-600" />
                 <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Sports Elite</span>
              </div>
              <div className="space-y-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl group hover:border-red-600/30 border border-transparent transition-all">
                      <div className="flex items-center gap-3">
                         <span className="font-bungee text-red-600">#{i}</span>
                         <div className="w-8 h-8 rounded-full bg-gray-800" />
                         <span className="text-xs font-bold text-white">Action Shots KE</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase">2.4K SALES</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-red-600 text-white p-10 rounded-[3rem] relative overflow-hidden group">
              <Radio size={40} className="mb-6 group-hover:scale-125 transition-transform" />
              <h3 className="font-embroidery text-4xl mb-4 italic">MEDIA HOUSE <br/>DIRECT SYNC</h3>
              <p className="text-red-100 text-sm font-medium mb-10">Instant high-res wire for verified press outlets. Auto-FTP purchased match day assets.</p>
              <button className="bg-black text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">Connect Server</button>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Shield size={200} />
              </div>
           </div>
        </section>
      </div>

      <AnimatePresence>
        {isTradingCardOpen && selectedPlayer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
             <motion.div 
               initial={{ scale: 0.8, rotateY: 90, opacity: 0 }}
               animate={{ scale: 1, rotateY: 0, opacity: 1 }}
               exit={{ scale: 0.8, rotateY: -90, opacity: 0 }}
               className="relative w-full max-w-sm aspect-[5/7] bg-gradient-to-br from-red-600 to-red-900 rounded-[3rem] p-1 shadow-[0_0_80px_rgba(227,30,36,0.3)] border-4 border-white/20 overflow-hidden"
             >
                <div className="relative h-full bg-[#111] rounded-[2.8rem] flex flex-col p-8 overflow-hidden">
                   <button onClick={() => setIsTradingCardOpen(false)} className="absolute top-6 right-6 p-2 bg-white/5 rounded-full text-white/50 hover:text-white"><X size={20}/></button>
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-16 h-16 bg-white p-1 rounded-2xl shadow-xl">
                         <img src={selectedPlayer.image} className="w-full h-full object-cover rounded-xl" alt="" />
                      </div>
                      <div className="text-right">
                         <span className="block text-red-600 font-bungee text-4xl">#{selectedPlayer.jerseyNumber}</span>
                         <span className="block text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">PICHA ZANGU PRO CARD</span>
                      </div>
                   </div>
                   <div className="flex-1 flex flex-col items-center justify-center text-center">
                      <h2 className="font-embroidery text-5xl text-white mb-2 italic">{selectedPlayer.name}</h2>
                      <p className="text-red-600 font-black text-xs uppercase tracking-widest mb-10">{selectedPlayer.team} • {selectedPlayer.position}</p>
                      <div className="w-full grid grid-cols-2 gap-4">
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Career Goals</span>
                            <span className="text-xl font-bungee text-white">{selectedPlayer.goals}</span>
                         </div>
                         <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Career Assists</span>
                            <span className="text-xl font-bungee text-white">{selectedPlayer.assists}</span>
                         </div>
                      </div>
                   </div>
                   <div className="mt-8 pt-8 border-t border-white/5 flex gap-2">
                      <button className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700 transition-all">
                        <Download size={14}/> Download Card
                      </button>
                      <button className="flex-1 bg-white/5 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10">
                        <ShoppingCart size={14}/> Licensing
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SportsPhotoCardProps {
  photo: Photo;
  onBuy: () => void;
}

const SportsPhotoCard: React.FC<SportsPhotoCardProps> = ({ photo, onBuy }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-[#111] rounded-[3rem] overflow-hidden border border-white/5 shadow-xl hover:border-red-600/30 transition-all flex flex-col h-full"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-black">
        <ProtectedImage src={photo.url} photographerName={photo.photographer} alt={photo.title} />
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-xl z-20">
           <Zap size={12} fill="currentColor" />
           <span className="text-[10px] font-black uppercase tracking-widest">Match Action</span>
        </div>
        <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
           <button onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} className={`p-3 rounded-2xl backdrop-blur-md transition-all ${isLiked ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
           </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
           <div className="flex justify-between items-center mb-6 text-white">
              <div>
                <span className="block text-[8px] font-black text-red-600 uppercase tracking-widest mb-1">Fan License</span>
                <span className="font-bungee text-2xl">KES {photo.price}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                 <Target size={14} className="text-red-600" /> #{photo.jerseyNumber || '?'}
              </div>
           </div>
           <button 
             onClick={(e) => { e.stopPropagation(); onBuy(); }}
             className="w-full bg-red-600 text-white font-black py-4 rounded-2xl shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
            >
              <ShoppingCart size={18}/> Unlock High-Res
           </button>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-embroidery text-2xl text-white mb-2 italic truncate group-hover:text-red-600 transition-colors">{photo.title}</h3>
        <div className="flex justify-between items-center text-gray-500 text-[9px] font-black uppercase tracking-widest mt-auto pt-6 border-t border-white/5">
           <span className="flex items-center gap-1"><MapPin size={10} className="text-red-600" /> {photo.location}</span>
           <span className="flex items-center gap-1">by {photo.photographer}</span>
        </div>
      </div>
    </motion.div>
  );
};

const TabBtn = ({label, active, onClick}: {label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-[1.8rem] transition-all font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap ${active ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-400 hover:text-white'}`}
  >
    {label}
  </button>
);

const StatBox = ({label, val}: {label: string, val: number}) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
    <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">{label}</span>
    <span className="text-xl font-bungee text-white">{val}</span>
  </div>
);

export default SportsHub;