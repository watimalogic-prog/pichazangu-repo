import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, ResponsiveContainer, YAxis, XAxis 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Zap, Globe, Search, Filter, 
  BarChart3, Activity, Briefcase, Award, ArrowRight, 
  ShoppingCart, DollarSign, Camera, Newspaper, 
  Maximize2, Share2, Info, ChevronRight, Gavel, 
  ShieldAlert, RefreshCcw, Bell, Layers, Clock, X
} from 'lucide-react';
import { 
  MOCK_PHOTOS, MOCK_PHOTOGRAPHER_MARKET_CAPS, 
  CURRENCY_SYMBOLS, COLORS 
} from '../constants';
import { Photo, PhotographerMarketStats } from '../types';
import { useCartStore, useMarketStore } from '../store/useAppStore';

const StockMarket: React.FC<{ userRole?: string | null }> = ({ userRole }) => {
  const [activeSector, setActiveSector] = useState('Global');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Photo | null>(null);
  const [multiWindow, setMultiWindow] = useState(false);
  
  const { vix, tickerMessages, updateVix } = useMarketStore();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const interval = setInterval(updateVix, 3000);
    return () => clearInterval(interval);
  }, [updateVix]);

  const sectors = ['Global', 'Sports', 'Fashion', 'Wildlife', 'Media', 'Street'];

  const filteredAssets = MOCK_PHOTOS.filter(p => 
    activeSector === 'Global' || p.category.includes(activeSector)
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans -mt-6 -mx-4 md:-mx-0 selection:bg-[#E31E24] selection:text-white">
      
      {/* 1. TOP LIVE TERMINAL TICKER */}
      <div className="bg-[#E31E24] text-white h-10 flex items-center overflow-hidden border-b border-white/20 sticky top-20 z-50 shadow-lg">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap text-xs font-black uppercase tracking-widest"
        >
          {tickerMessages.map((news, i) => (
            <span key={i} className="flex items-center gap-4">
              <Activity size={12} /> {news} 
              <span className="text-white">●</span>
            </span>
          ))}
          {filteredAssets.map(p => (
            <span key={p.id} className="flex items-center gap-2">
               {p.category.toUpperCase()}: {p.title} @ {p.price} KES 
               <span className={p.priceChange24h! > 0 ? 'text-white' : 'text-white/60'}>
                 {p.priceChange24h! > 0 ? '▲' : '▼'} {Math.abs(p.priceChange24h!)}%
               </span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-96 bg-gray-50 border-r border-gray-200 p-8 flex flex-col gap-10">
           <div>
              <div className="flex items-center gap-2 mb-8">
                 <div className="w-2.5 h-2.5 bg-[#E31E24] rounded-full animate-pulse" />
                 <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Terminal v4.0 Active</span>
              </div>
              <h2 className="text-3xl font-black mb-2 text-black font-embroidery italic">MARKET <span className="text-[#E31E24]">HUB</span></h2>
              <p className="text-[10px] text-gray-400 uppercase mb-10 font-black tracking-widest">Real-time Asset Exchange</p>

              <nav className="space-y-2">
                 {sectors.map(s => (
                   <button 
                     key={s}
                     onClick={() => setActiveSector(s)}
                     className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${activeSector === s ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-2xl shadow-red-200' : 'bg-white border-transparent text-gray-400 hover:border-gray-200 hover:text-black'}`}
                   >
                     {s} SECTOR
                   </button>
                 ))}
              </nav>
           </div>

           <div className="p-8 bg-white border border-gray-200 rounded-[2.5rem] shadow-sm">
              <h3 className="text-[10px] font-black uppercase mb-6 flex items-center justify-between text-gray-400">
                Market Heat (VIX) <Activity size={16} className="text-[#E31E24]" />
              </h3>
              <div className="flex items-end gap-3 mb-4">
                 <span className="text-5xl font-bungee text-black leading-none">{vix.toFixed(2)}</span>
                 <span className={`text-[10px] font-black mb-1 px-2 py-0.5 rounded ${vix > 30 ? 'bg-red-100 text-[#E31E24]' : 'bg-gray-100 text-gray-400'}`}>
                   {vix > 30 ? 'VOLATILE' : 'STABLE'}
                 </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                 <motion.div animate={{ width: `${vix}%` }} className={`h-full bg-[#E31E24] shadow-[0_0_10px_rgba(227,30,36,0.5)]`} />
              </div>
           </div>
           
           <div className="mt-auto pt-8 border-t border-gray-100">
              <button 
                onClick={() => setMultiWindow(!multiWindow)}
                className="w-full flex items-center justify-between p-5 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all group"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Multi-Panel View</span>
                <Layers size={18} className={multiWindow ? 'text-[#E31E24]' : 'text-gray-500'} />
              </button>
           </div>
        </aside>

        {/* MAIN TERMINAL */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative">
           <header className="p-10 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="relative group w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E31E24] transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="SCAN ASSETS, PHOTOGRAPHERS, TAGS..." 
                      className="bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-black outline-none focus:bg-white focus:border-[#E31E24] transition-all w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <div className="flex items-center gap-2">
                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-white hover:border-[#E31E24] hover:text-[#E31E24] border border-transparent transition-all">
                       <Filter size={20} />
                    </button>
                    <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-white hover:text-black border border-transparent transition-all">
                       <RefreshCcw size={20} />
                    </button>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-white border-2 border-black text-black px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    <TrendingDown size={18} /> Liquidation
                 </button>
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-[#E31E24] text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-red-200 hover:bg-red-700 transition-all">
                    <TrendingUp size={18} /> Market Entry
                 </button>
              </div>
           </header>

           <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[#fdfdfd]">
              <div className={multiWindow ? 'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8' : 'space-y-6 max-w-6xl mx-auto'}>
                 {filteredAssets.map((asset) => (
                   <AssetRow 
                     key={asset.id} 
                     asset={asset} 
                     compact={multiWindow} 
                     onTrade={() => setSelectedAsset(asset)}
                   />
                 ))}
              </div>
           </div>
        </main>
      </div>

      {/* TRADE MODAL */}
      <AnimatePresence>
        {selectedAsset && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                className="bg-white rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] max-w-6xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-100"
              >
                 <div className="w-full md:w-[55%] aspect-[4/5] md:aspect-auto bg-gray-50 relative overflow-hidden">
                    <img src={selectedAsset.url} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    <div className="absolute top-10 left-10 p-5 bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 text-white">
                       <Maximize2 size={24} />
                    </div>
                 </div>
                 
                 <div className="flex-1 p-16 flex flex-col text-black">
                    <div className="flex justify-between items-start mb-12">
                       <div>
                          <span className="text-[#E31E24] text-[11px] font-black uppercase tracking-[0.5em] block mb-3">{selectedAsset.category} MARKET ASSET</span>
                          <h2 className="text-5xl font-black text-black uppercase tracking-tighter leading-none font-embroidery italic">{selectedAsset.title}</h2>
                          <div className="mt-4 flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${selectedAsset.photographer}`} alt="" />
                             </div>
                             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{selectedAsset.photographer}</span>
                          </div>
                       </div>
                       <button onClick={() => setSelectedAsset(null)} className="p-4 bg-gray-100 rounded-full hover:bg-[#E31E24] hover:text-white transition-all"><X size={24}/></button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                       <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                          <span className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Spot Price</span>
                          <span className="text-4xl font-bungee text-black leading-none">KES {selectedAsset.price}</span>
                       </div>
                       <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                          <span className="block text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">24h Change</span>
                          <div className="flex items-center gap-2">
                             <span className={`text-4xl font-bungee leading-none ${selectedAsset.priceChange24h! > 0 ? 'text-green-500' : 'text-[#E31E24]'}`}>
                                {selectedAsset.priceChange24h! > 0 ? '+' : ''}{selectedAsset.priceChange24h}%
                             </span>
                             {selectedAsset.priceChange24h! > 0 ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-[#E31E24]" />}
                          </div>
                       </div>
                    </div>

                    <div className="flex-1 min-h-[200px] mb-12">
                       <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing History</span>
                          <span className="text-[10px] font-black text-[#E31E24] uppercase">Live Update</span>
                       </div>
                       <div className="h-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={selectedAsset.historicalPrices}>
                                <defs>
                                   <linearGradient id="tradeGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#E31E24" stopOpacity={0.2}/>
                                      <stop offset="95%" stopColor="#E31E24" stopOpacity={0}/>
                                   </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="value" stroke="#E31E24" fill="url(#tradeGradient)" strokeWidth={5} />
                             </AreaChart>
                          </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="mt-auto flex gap-4">
                       <button className="flex-1 bg-black text-white font-black py-6 rounded-3xl shadow-xl hover:bg-gray-800 transition-all text-[11px] uppercase tracking-widest flex items-center justify-center gap-3">
                          <Share2 size={20} /> Share Asset
                       </button>
                       <button 
                         onClick={() => { addItem(selectedAsset); setSelectedAsset(null); }}
                         className="flex-[2] bg-[#E31E24] text-white font-black py-6 rounded-3xl shadow-2xl shadow-red-200 hover:bg-red-700 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3"
                       >
                          <ShoppingCart size={22} /> Execute Global License
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

interface AssetRowProps {
  asset: Photo;
  compact: boolean;
  onTrade: () => void;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset, compact, onTrade }) => {
  const isUp = asset.priceChange24h! > 0;
  
  if (compact) {
    return (
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        onClick={onTrade}
        className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-[#E31E24]/30 transition-all cursor-pointer shadow-sm hover:shadow-2xl"
      >
        <div className="w-full h-56 relative overflow-hidden bg-gray-50">
           <img src={asset.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
           <div className="absolute top-4 left-4 p-2.5 bg-black/40 backdrop-blur-md rounded-xl text-white">
              <Activity size={16} />
           </div>
           <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-black font-bungee text-sm">
              KES {asset.price}
           </div>
        </div>
        <div className="p-8">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <span className="text-[9px] font-black text-[#E31E24] uppercase tracking-widest mb-1 block">{asset.category} SECTOR</span>
                 <h4 className="text-xl font-black text-black uppercase tracking-tighter leading-none">{asset.title}</h4>
              </div>
              <div className={`flex items-center gap-1 font-black text-sm ${isUp ? 'text-green-500' : 'text-[#E31E24]'}`}>
                 {isUp ? '▲' : '▼'} {Math.abs(asset.priceChange24h!)}%
              </div>
           </div>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">By {asset.photographer}</p>
           <button className="w-full py-4 bg-gray-50 group-hover:bg-[#E31E24] group-hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">Trade Asset</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className="group flex flex-col sm:flex-row items-center gap-10 p-8 bg-white border border-gray-100 rounded-[3rem] hover:border-[#E31E24]/40 transition-all cursor-pointer shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      onClick={onTrade}
    >
      <div className="w-full sm:w-64 h-44 overflow-hidden rounded-[2rem] border border-gray-100 shrink-0 bg-gray-50 shadow-inner relative">
         <img src={asset.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
         {isUp && (
            <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
         )}
      </div>
      
      <div className="flex-1 min-w-0 py-2">
         <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-red-50 text-[#E31E24] text-[9px] font-black uppercase tracking-widest rounded-lg border border-red-100">{asset.category}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Asset ID: #{asset.id.slice(0, 5)}</span>
         </div>
         <h4 className="text-3xl font-black text-black uppercase tracking-tighter truncate leading-tight group-hover:text-[#E31E24] transition-colors">{asset.title}</h4>
         <div className="flex items-center gap-4 mt-3">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">By <span className="text-gray-900">{asset.photographer}</span></p>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Vol: {asset.volume24h} Licenses</p>
         </div>
      </div>

      <div className="flex items-center gap-12 shrink-0 border-l border-gray-100 pl-12 h-full py-4">
         <div className="text-right">
            <span className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Exchange Spot</span>
            <span className="text-2xl font-bungee text-black leading-none">KES {asset.price}</span>
         </div>
         <div className="text-right w-24">
            <span className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">24H Velocity</span>
            <span className={`text-xl font-black flex items-center justify-end gap-1 ${isUp ? 'text-green-500' : 'text-[#E31E24]'}`}>
               {isUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />} {Math.abs(asset.priceChange24h!)}%
            </span>
         </div>
      </div>
    </motion.div>
  );
};

export default StockMarket;