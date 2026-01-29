import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Activity, Search, Filter, 
  Layers, ShoppingCart, RefreshCcw, X, Maximize2, Share2,
  ArrowUpRight, ArrowDownRight, Zap, ShieldCheck, Loader2,
  BarChart3, LayoutGrid, Heart, Eye, ArrowDown, ArrowUp,
  LineChart, History, Globe, ShieldAlert, Binary
} from 'lucide-react';
import { 
  MOCK_PHOTOS 
} from '../constants';
import { Photo } from '../types';
import { useCartStore, useMarketStore, useToastStore } from '../store/useAppStore';

const StockMarket: React.FC<{ userRole?: string | null }> = ({ userRole }) => {
  const [activeSector, setActiveSector] = useState('Global');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'change' | 'volatility'>('price');
  const [riskFilter, setRiskFilter] = useState<'all' | 'blue' | 'penny'>('all');
  const [selectedAsset, setSelectedAsset] = useState<Photo | null>(null);
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell' | 'short'>('buy');
  const [multiWindow, setMultiWindow] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'market' | 'watchlist'>('market');
  
  const { vix, tickerMessages, updateVix } = useMarketStore();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const interval = setInterval(updateVix, 3000);
    return () => clearInterval(interval);
  }, [updateVix]);

  const sectors = ['Global', 'Sports', 'Fashion', 'Wildlife', 'Media', 'Street'];

  const filteredAssets = useMemo(() => {
    let list = MOCK_PHOTOS.filter(p => {
      const inSector = activeSector === 'Global' || p.category.includes(activeSector);
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.photographer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesWatchlist = activeTab === 'market' || watchlist.includes(p.id);
      
      // Simulated Risk Filter
      const isBlueChip = p.price > 2000;
      const matchesRisk = riskFilter === 'all' || 
                          (riskFilter === 'blue' && isBlueChip) || 
                          (riskFilter === 'penny' && !isBlueChip);

      return inSector && matchesSearch && matchesWatchlist && matchesRisk;
    });

    return list.sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return (b.priceChange24h || 0) - (a.priceChange24h || 0);
      return (b.volume24h || 0) - (a.volume24h || 0);
    });
  }, [activeSector, searchQuery, sortBy, activeTab, watchlist, riskFilter]);

  const handleExecuteTrade = () => {
    if (!selectedAsset) return;
    setIsClearing(true);
    const actionLabel = tradeMode === 'buy' ? 'Clearing Transaction' : tradeMode === 'sell' ? 'Liquidity Extraction' : 'Hedging Position';
    showToast(`${actionLabel} at Node...`, "info");
    
    setTimeout(() => {
      if (tradeMode === 'buy') addItem(selectedAsset);
      setIsClearing(false);
      setSelectedAsset(null);
      showToast(tradeMode === 'buy' ? "Position Locked in Your Portfolio" : "Liquidity Transferred to Wallet", "success");
    }, 2000);
  };

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist(prev => {
      const active = prev.includes(id);
      showToast(active ? "Asset Removed from Watchlist" : "Asset added to Watchlist", "info");
      return active ? prev.filter(x => x !== id) : [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-white text-black -mt-6">
      
      {/* 1. TOP LIVE TERMINAL TICKER */}
      <div className="bg-[#E31E24] text-white h-10 flex items-center overflow-hidden border-b border-white/20 sticky top-16 md:top-0 z-50 shadow-lg">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap text-[10px] font-black uppercase tracking-widest"
        >
          {tickerMessages.map((news, i) => (
            <span key={i} className="flex items-center gap-4">
              <Activity size={12} /> {news} 
            </span>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* SIDEBAR / SECTOR PICKER */}
        <aside className="w-full lg:w-72 bg-gray-50 border-r border-gray-200 p-6 lg:p-8 flex flex-col gap-8">
           <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 bg-[#E31E24] rounded-full animate-pulse" />
                 <span className="text-[10px] font-black uppercase text-gray-400">Terminal Active</span>
              </div>
              <h2 className="text-2xl font-embroidery italic text-black">MARKET <span className="text-[#E31E24]">HUB</span></h2>
           </div>

           <div className="flex bg-gray-100 p-1 rounded-2xl">
              <button onClick={() => setActiveTab('market')} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'market' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}>Market</button>
              <button onClick={() => setActiveTab('watchlist')} className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'watchlist' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}>Watchlist ({watchlist.length})</button>
           </div>

           <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {sectors.map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`whitespace-nowrap lg:w-full text-left px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${activeSector === s ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-lg' : 'bg-white border-transparent text-gray-400 hover:border-gray-200'}`}
                >
                  {s} SECTOR
                </button>
              ))}
           </div>

           <div className="hidden lg:block p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <h3 className="text-[9px] font-black uppercase mb-4 text-gray-400">Market VIX</h3>
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-3xl font-bungee">{vix.toFixed(1)}</span>
                 <span className="text-[8px] font-black text-red-600 mb-1">VOLATILE</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                 <motion.div animate={{ width: `${vix}%` }} className="h-full bg-[#E31E24]" />
              </div>
           </div>
        </aside>

        {/* MAIN TERMINAL */}
        <main className="flex-1 flex flex-col min-w-0">
           <header className="p-6 md:p-10 border-b border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-center bg-white/80 backdrop-blur-md sticky top-[6.5rem] md:top-10 z-40">
              <div className="flex flex-1 items-center gap-4 w-full md:w-auto">
                 <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#E31E24]" size={18} />
                    <input 
                      type="text" 
                      placeholder="SCAN ASSETS..." 
                      className="bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-xs font-bold text-black outline-none focus:border-[#E31E24] w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
                 <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <RiskTab active={riskFilter==='all'} label="ALL" onClick={()=>setRiskFilter('all')} />
                    <RiskTab active={riskFilter==='blue'} label="BLUE CHIP" onClick={()=>setRiskFilter('blue')} />
                    <RiskTab active={riskFilter==='penny'} label="PENNY" onClick={()=>setRiskFilter('penny')} />
                 </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                 <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-3 bg-gray-50 border border-gray-200 text-[10px] font-black uppercase rounded-xl outline-none"
                 >
                    <option value="price">Sort by Price</option>
                    <option value="change">Sort by Growth</option>
                    <option value="volatility">Sort by Volume</option>
                 </select>
                 <button 
                  onClick={() => setMultiWindow(!multiWindow)}
                  className={`p-3 rounded-xl transition-all ${multiWindow ? 'bg-black text-white' : 'bg-gray-50 text-gray-400'}`}
                  title="Toggle Grid View"
                 >
                   <LayoutGrid size={20} />
                 </button>
              </div>
           </header>

           <div className="flex-1 p-4 md:p-10 bg-[#fbfbfb]">
              <div className={multiWindow ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4 max-w-4xl mx-auto'}>
                 {filteredAssets.map((asset) => (
                   <AssetRow 
                     key={asset.id} 
                     asset={asset} 
                     compact={multiWindow} 
                     isWatched={watchlist.includes(asset.id)}
                     onWatch={(e: any) => toggleWatchlist(asset.id, e)}
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
           <div className="fixed inset-0 z-[400] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-md">
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white rounded-t-[3rem] md:rounded-[4rem] shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row h-[90vh] md:h-auto"
              >
                 {/* Asset Visual */}
                 <div className="w-full md:w-1/2 bg-black relative flex flex-col overflow-hidden">
                    <img src={selectedAsset.url} className="w-full h-full object-cover opacity-80" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <button onClick={() => setSelectedAsset(null)} className="absolute top-6 right-6 p-3 bg-black/40 rounded-full text-white md:hidden z-20"><X size={20}/></button>
                    
                    <div className="absolute top-10 left-10 flex gap-2">
                       <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">LIVE NODE</span>
                       {watchlist.includes(selectedAsset.id) && <span className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">WATCHING</span>}
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                       <h2 className="text-4xl font-embroidery italic text-white mb-2 leading-none">{selectedAsset.title}</h2>
                       <p className="text-red-500 font-black text-xs uppercase tracking-widest">Regional ID: {selectedAsset.id}</p>
                    </div>
                 </div>

                 {/* Trade Controls */}
                 <div className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-10 w-fit">
                       <TradeTab active={tradeMode==='buy'} label="BUY" onClick={()=>setTradeMode('buy')} />
                       <TradeTab active={tradeMode==='sell'} label="SELL" onClick={()=>setTradeMode('sell')} />
                       <TradeTab active={tradeMode==='short'} label="SHORT" onClick={()=>setTradeMode('short')} />
                    </div>

                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1 block">Live Performance</span>
                          <div className="flex items-center gap-3">
                             <h4 className="text-5xl font-bungee">KES {selectedAsset.price}</h4>
                             <div className={`flex items-center gap-1 text-sm font-black ${selectedAsset.priceChange24h! > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {selectedAsset.priceChange24h! > 0 ? <ArrowUpRight size={20}/> : <ArrowDownRight size={20}/>}
                                {Math.abs(selectedAsset.priceChange24h!)}%
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="h-40 w-full mb-10 border border-gray-100 rounded-3xl overflow-hidden p-2 bg-gray-50/50">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedAsset.historicalPrices || []}>
                             <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor={tradeMode==='buy'?'#E31E24':'#000'} stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor={tradeMode==='buy'?'#E31E24':'#000'} stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                             <XAxis dataKey="time" hide />
                             <YAxis hide domain={['auto', 'auto']} />
                             <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold' }}
                                labelStyle={{ color: '#E31E24' }}
                             />
                             <Area type="monotone" dataKey="value" stroke={tradeMode==='buy'?'#E31E24':'#000'} fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>

                    {/* LIVE ORDER BOOK SIMULATION */}
                    <div className="mb-10 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                       <div className="flex items-center gap-2 mb-6">
                          <Binary size={14} className="text-red-600" />
                          <h5 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">LIVE ORDER BOOK (NBI_01)</h5>
                       </div>
                       <div className="space-y-2">
                          {[
                            { p: selectedAsset.price + 20, v: '14.5K', t: 'sell' },
                            { p: selectedAsset.price + 5, v: '8.2K', t: 'sell' },
                            { p: selectedAsset.price - 2, v: '12.4K', t: 'buy' },
                            { p: selectedAsset.price - 15, v: '45.1K', t: 'buy' }
                          ].map((ord, i) => (
                            <div key={i} className="flex justify-between items-center text-[10px] font-black font-mono">
                               <span className={ord.t === 'sell' ? 'text-red-500' : 'text-green-600'}>{ord.p} KES</span>
                               <div className="flex-1 mx-4 h-1 bg-gray-100 rounded-full relative">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.random() * 80 + 20}%` }}
                                    className={`h-full rounded-full ${ord.t === 'sell' ? 'bg-red-200' : 'bg-green-200'}`} 
                                  />
                               </div>
                               <span className="text-gray-400">{ord.v}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                       <MetricBox label="Volume 24H" val={`${selectedAsset.volume24h} Units`} />
                       <MetricBox label="Trade Rating" val={selectedAsset.priceChange24h! > 0 ? "BULLISH" : "BEARISH"} />
                    </div>

                    <button 
                      disabled={isClearing}
                      onClick={handleExecuteTrade}
                      className={`w-full text-white font-black py-6 rounded-2xl shadow-xl shadow-red-900/20 text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${tradeMode==='buy'?'bg-[#E31E24] hover:bg-black':'bg-black hover:bg-red-600'}`}
                    >
                      {isClearing ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                      {isClearing ? 'CLEARING...' : `EXECUTE ${tradeMode.toUpperCase()}`}
                    </button>
                    
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                       <ShieldCheck size={14} />
                       <span className="text-[9px] font-black uppercase tracking-widest">KRA COMPLIANT TRADE HANDSHAKE</span>
                    </div>
                 </div>
              </motion.div>
           </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AssetRow = ({ asset, compact, onTrade, isWatched, onWatch }: any) => {
  const isUp = asset.priceChange24h! > 0;
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      onClick={onTrade}
      className={`group cursor-pointer bg-white border border-gray-100 transition-all shadow-sm hover:shadow-xl ${compact ? 'rounded-[2.5rem] overflow-hidden flex flex-col' : 'rounded-2xl p-4 flex items-center gap-6'}`}
    >
      <div className={`${compact ? 'w-full h-44' : 'w-24 h-24 rounded-xl'} bg-gray-100 overflow-hidden shrink-0 relative`}>
         <img src={asset.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
         <button 
            onClick={onWatch}
            className={`absolute top-2 left-2 p-2 rounded-lg transition-all ${isWatched ? 'bg-red-600 text-white' : 'bg-black/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black'}`}
          >
            <Heart size={14} className={isWatched ? 'fill-current' : ''} />
         </button>
         {isUp && <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full"><ArrowUpRight size={12}/></div>}
      </div>
      <div className={`flex-1 ${compact ? 'p-6' : ''}`}>
         <div className="flex justify-between items-start">
            <div>
               <h4 className="font-black text-sm uppercase tracking-tighter text-black truncate max-w-[150px]">{asset.title}</h4>
               <p className="text-[8px] font-black text-gray-400 uppercase">{asset.photographer}</p>
            </div>
            <div className={`text-right ${compact ? '' : 'hidden md:block'}`}>
               <span className="block font-bungee text-lg">KES {asset.price}</span>
               <span className={`text-[9px] font-black flex items-center justify-end gap-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                 {isUp ? <ArrowUpRight size={10}/> : <ArrowDownRight size={10}/>}
                 {Math.abs(asset.priceChange24h!)}%
               </span>
            </div>
         </div>
         {compact && (
            <div className="mt-6 flex justify-between items-center">
               <div className="w-24 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={asset.historicalPrices || []}>
                        <Area type="monotone" dataKey="value" stroke={isUp ? '#22c55e' : '#ef4444'} fill="transparent" strokeWidth={2} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               <button className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#E31E24] group-hover:text-white transition-all"><Maximize2 size={16}/></button>
            </div>
         )}
      </div>
    </motion.div>
  );
};

const MetricBox = ({label, val}: any) => (
  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
     <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">{label}</span>
     <span className="text-xl font-bold uppercase">{val}</span>
  </div>
);

const RiskTab = ({active, label, onClick}: any) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}>
     {label}
  </button>
);

const TradeTab = ({active, label, onClick}: any) => (
  <button onClick={onClick} className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-black text-white shadow-xl' : 'text-gray-400 hover:text-black'}`}>
     {label}
  </button>
);

export default StockMarket;