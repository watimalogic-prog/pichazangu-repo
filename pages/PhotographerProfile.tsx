import React, { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { 
  Upload, DollarSign, Image as ImageIcon, TrendingUp, Settings, Lock, 
  ShieldAlert, User, Phone, Zap, Calendar, MessageSquare, QrCode, 
  BookOpen, Heart, HardDrive, RefreshCcw, Bell, 
  MinusCircle, PlusCircle, Smartphone, Camera, Edit3, X, Check, Loader2, MapPin, Save,
  Globe, ShieldCheck, Mail, Trash2, Plus, LayoutGrid, Layers, CloudUpload, CheckCircle,
  MoreVertical, Share2, Key, Database, Activity, Sparkles, BrainCircuit, Shield, Clock
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_VAULTS, MOCK_CLIENTS, MOCK_TRANSACTIONS } from '../constants';
import { Photo } from '../types';
import VerificationBadge from '../components/VerificationBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from "@google/genai";
import { useToastStore } from '../store/useAppStore';

const data = [
  { name: 'Mon', sales: 4200, velocity: 12 },
  { name: 'Tue', sales: 3800, velocity: 15 },
  { name: 'Wed', sales: 5100, velocity: 22 },
  { name: 'Thu', sales: 4800, velocity: 18 },
  { name: 'Fri', sales: 7200, velocity: 35 },
  { name: 'Sat', sales: 8500, velocity: 42 },
  { name: 'Sun', sales: 6100, velocity: 28 },
];

interface UploadTask {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  size: string;
  aiMetadata?: {
    title: string;
    tags: string[];
    category: string;
  };
}

const PhotographerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'vaults' | 'wallet' | 'tools'>('overview');
  const [profilePhoto, setProfilePhoto] = useState('https://picsum.photos/seed/p1/200');
  const [coverBanner, setCoverBanner] = useState('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=1600&q=80');
  const [bio, setBio] = useState('Capturing the soul of East Africa through the lens. Award-winning visual storyteller based in Nairobi.');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const showToast = useToastStore((state) => state.showToast);
  
  // Portfolio state
  const [portfolioPhotos, setPortfolioPhotos] = useState<Photo[]>(
    MOCK_PHOTOS.filter(p => p.photographer === 'Ali Studio')
  );

  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const portfolioUploadRef = useRef<HTMLInputElement>(null);
  const bioTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Security layer
  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '4' || e.key === '3')) {
        alert("Picha Zangu Glass-Shield: Screenshots are actively blocked on this platform.");
        e.preventDefault();
      }
    };
    window.addEventListener('contextmenu', handleContext);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const processRealUploads = async (files: FileList | File[]) => {
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const newTasks: UploadTask[] = fileArray.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
      status: 'uploading',
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));

    setUploadTasks(prev => [...newTasks, ...prev]);

    for (const [index, file] of fileArray.entries()) {
      const taskId = newTasks[index].id;

      try {
        setUploadTasks(prev => prev.map(t => t.id === taskId ? { ...t, progress: 40 } : t));
        setUploadTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'analyzing', progress: 70 } : t));
        const base64 = await fileToBase64(file);

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: {
            parts: [
              { inlineData: { data: base64, mimeType: file.type || 'image/jpeg' } },
              { text: 'Analyze this photo taken in East Africa. Return a JSON object with: title (string), tags (array of 5 strings), and category (one of: Wildlife, Stock, Sports, Wedding, Portrait, Street, Fashion).' }
            ]
          },
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                category: { type: Type.STRING }
              },
              required: ['title', 'tags', 'category']
            }
          }
        });

        const aiResult = JSON.parse(response.text);

        setUploadTasks(prev => 
          prev.map(t => t.id === taskId ? { 
            ...t, 
            status: 'completed', 
            progress: 100, 
            aiMetadata: aiResult 
          } : t)
        );

        showToast(`AI metadata generated for ${file.name}`, 'success');

      } catch (error) {
        console.error("Upload error:", error);
        setUploadTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'error' } : t));
        showToast(`Error processing ${file.name}`, 'error');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') setProfilePhoto(reader.result as string);
        else setCoverBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePortfolioPhoto = (id: string) => {
    setPortfolioPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleAddPortfolioPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processRealUploads(e.target.files);
    }
  };

  const handleVaultUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processRealUploads(e.target.files);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processRealUploads(e.dataTransfer.files);
    }
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Profile changes synced to regional node", "success");
    }, 1500);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign/>} label="Wallet Balance" val="KSh 24,580" color="green" />
        <StatCard icon={<ImageIcon/>} label="Archived Files" val="2,840" color="blue" />
        <StatCard icon={<TrendingUp/>} label="99% Profit Margin" val="KSh 122,000" color="red" />
        <StatCard icon={<Bell/>} label="Recent Sales" val="8 Today" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#1a1a1a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-embroidery text-3xl text-white">SALES VELOCITY</h3>
            <div className="flex gap-2">
              <span className="text-[10px] bg-red-600/20 text-red-500 px-3 py-1 rounded-full border border-red-500/30">LIVE FEED</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E31E24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E31E24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis hide />
                <Tooltip contentStyle={{backgroundColor: '#111', border: 'none', borderRadius: '12px', color: '#fff'}} />
                <Area type="monotone" dataKey="sales" stroke="#E31E24" fillOpacity={1} fill="url(#colorRed)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <h3 className="font-embroidery text-2xl text-white mb-6">REPEAT BUYERS</h3>
          <div className="space-y-4">
            {MOCK_CLIENTS.map((client, idx) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-red-600/50 p-0.5 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${client.id}`} className="w-full h-full object-cover rounded-full" alt="Client Face" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></div>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">
                      {client.name} {client.verified && <VerificationBadge type="client" size={14} />}
                    </span>
                    <span className="text-[10px] text-gray-500">{client.phone}</span>
                  </div>
                </div>
                {client.isReturning && <span className="text-[10px] text-green-400 font-black">LOYALTY -50%</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-embroidery text-4xl text-white uppercase italic">MY <span className="text-red-600">PORTFOLIO</span></h2>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Public facing assets for licensing</p>
        </div>
        
        <div className="flex gap-4">
          <input 
            type="file" 
            ref={portfolioUploadRef} 
            multiple 
            className="hidden" 
            onChange={handleAddPortfolioPhoto}
            accept="image/*"
          />
          <button 
            onClick={() => portfolioUploadRef.current?.click()}
            className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-red-900/40 hover:bg-red-700 transition-all"
          >
            <Plus size={20} /> ADD TO PORTFOLIO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {portfolioPhotos.map((photo) => (
          <div key={photo.id} className="group relative bg-[#1a1a1a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-red-600/30 transition-all shadow-xl">
            <div className="aspect-[4/5] overflow-hidden relative">
              <img src={photo.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={photo.title} />
              
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <button 
                  onClick={() => handleRemovePortfolioPhoto(photo.id)}
                  className="p-3 bg-red-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black"
                  title="Remove from portfolio"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-black/60 backdrop-blur-md text-white text-[8px] px-3 py-1.5 rounded-full uppercase font-black">
                  {photo.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-embroidery text-xl text-white mb-4 italic truncate">{photo.title}</h3>
              <div className="flex justify-between items-center">
                 <span className="text-red-500 font-bungee text-lg">KES {photo.price}</span>
                 <button className="text-gray-500 hover:text-white transition-colors">
                    <Edit3 size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}

        {portfolioPhotos.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10">
            <ImageIcon size={64} className="mx-auto text-white/10 mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">Your portfolio is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderVaultSystem = () => (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-embroidery text-4xl text-white italic">VAULT <span className="text-red-600 font-embroidery-sketch text-2xl">ARCHIVE</span></h2>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Secure storage for your clients (30-Year Guarantee)</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2.5rem] border border-white/10 shadow-lg">
             <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${!isBulkMode ? 'text-red-600' : 'text-gray-500'}`}>Single Mode</span>
                <button 
                  onClick={() => setIsBulkMode(!isBulkMode)}
                  className="w-16 h-8 bg-black/50 border border-white/10 rounded-full relative p-1 transition-all group overflow-hidden"
                >
                  <motion.div 
                    animate={{ x: isBulkMode ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`w-6 h-6 rounded-full shadow-lg flex items-center justify-center transition-colors ${isBulkMode ? 'bg-red-600' : 'bg-gray-400'}`}
                  >
                    {isBulkMode ? <Layers size={12} className="text-white" /> : <ImageIcon size={12} className="text-black" />}
                  </motion.div>
                </button>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isBulkMode ? 'text-red-600' : 'text-gray-500'}`}>Bulk/Batch Mode</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`relative p-10 rounded-[3rem] border-4 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer min-h-[400px] shadow-2xl ${
              isDragging ? 'bg-red-600/10 border-red-600 scale-[0.98]' : 'bg-white/5 border-white/10 hover:border-red-600/40 hover:bg-white/5'
            }`}
            onClick={() => fileUploadRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileUploadRef} 
              multiple={isBulkMode} 
              className="hidden" 
              onChange={handleVaultUpload} 
              accept="image/*"
            />
            <div className={`p-8 rounded-[2.5rem] mb-6 transition-all transform group-hover:scale-110 ${isBulkMode ? 'bg-red-600 text-white shadow-xl shadow-red-900/40 rotate-12' : 'bg-white/10 text-red-600'}`}>
              {isBulkMode ? <Layers size={54} /> : <CloudUpload size={54} />}
            </div>
            <h3 className="font-embroidery text-4xl text-white italic mb-2 tracking-tighter">
              {isBulkMode ? 'BATCH ARCHIVE' : 'SINGLE DROP'}
            </h3>
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest leading-relaxed max-w-[240px]">
              {isBulkMode 
                ? 'Multiple selection enabled. Drag & drop your high-res folders or zip files here.' 
                : 'Select a masterpiece to safely archive in your client\'s private vault.'}
            </p>
          </div>

          <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 shadow-inner">
             <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-green-500" />
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Security Layers</h4>
             </div>
             <div className="space-y-4">
                <SecurityStat label="Military Grade Watermark" active />
                <SecurityStat label="Glass-Shield Screen Blocking" active />
                <SecurityStat label="AI-Steganographic Tracking" active />
                <SecurityStat label="Decentralized IPFS Sync" active />
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {uploadTasks.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1a1a1a] rounded-[3rem] border-2 border-red-600/30 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-10 relative z-10">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-red-600/20 text-red-600 rounded-2xl flex items-center justify-center shadow-inner">
                       <CloudUpload className="animate-bounce" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tighter">
                        Active Upload Queue ({uploadTasks.filter(t=>t.status!=='completed').length} pending)
                      </h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => setUploadTasks([])} 
                    className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-2xl text-gray-500 transition-all border border-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 relative z-10 max-h-[450px] overflow-y-auto pr-3 custom-scrollbar">
                  {uploadTasks.map(task => (
                    <div key={task.id} className="bg-white/5 p-5 rounded-3xl border border-white/10 flex flex-col gap-4">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${task.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-red-600/10 text-red-600'}`}>
                          {task.status === 'completed' ? <CheckCircle size={28} /> : task.status === 'analyzing' ? <BrainCircuit size={28} /> : <ImageIcon size={28} />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-end mb-2.5">
                            <span className="block text-xs text-white font-bold truncate">{task.name}</span>
                            <span className="text-[11px] font-black text-red-600 uppercase tabular-nums">{Math.round(task.progress)}%</span>
                          </div>
                          <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              className={`h-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-red-600'}`} 
                              animate={{ width: `${task.progress}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, i) => {
              const capacity = Math.floor(Math.random() * 80) + 10;
              return (
                <div key={i} className="group relative min-h-[420px] bg-[#1a1a1a] rounded-[3rem] border border-white/5 overflow-hidden hover:border-red-600/50 transition-all shadow-xl flex flex-col">
                   <div className="p-6 flex justify-between items-start">
                      <div className="w-12 h-12 rounded-[1.2rem] border border-red-600/40 p-0.5 overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?u=${i + 50}`} className="w-full h-full object-cover" alt="" />
                      </div>
                      <button className="p-2.5 bg-black/40 hover:bg-red-600 rounded-xl transition-all border border-white/5 text-gray-500 hover:text-white">
                         <MoreVertical size={16} />
                      </button>
                   </div>
                   <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
                      <HardDrive size={54} className="text-gray-800 group-hover:text-red-600 transition-all duration-700" />
                      <span className="font-bungee text-2xl text-white mb-1">VAULT-00{100-i}</span>
                   </div>
                   <div className="p-8 pt-0">
                      <div className="mb-6">
                         <div className="flex justify-between items-end mb-2.5">
                            <span className="text-[9px] font-black text-gray-500 uppercase">Archival Health</span>
                            <span className="text-[10px] font-bungee text-white">99.8%</span>
                         </div>
                         <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${capacity}%` }} className="h-full bg-red-600" />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-all">
                         <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[9px] font-black uppercase">
                            <Key size={14} className="text-red-600" /> PASSKEY
                         </button>
                         <button className="flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 rounded-2xl text-[9px] font-black text-white uppercase shadow-xl">
                            <Share2 size={14} /> SHARE
                         </button>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in zoom-in duration-500">
       <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-embroidery text-4xl text-white mb-2 uppercase">My Secure Wallet</h2>
            <div className="mb-12">
               <span className="text-sm text-gray-400 uppercase tracking-[0.3em] block mb-2">Available Balance</span>
               <h3 className="text-6xl font-bungee text-white">KSh 24,580.00</h3>
            </div>
            <div className="flex gap-4">
               <button className="flex-1 bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-100 transition-all">DEPOSIT</button>
               <button className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl hover:bg-red-700 transition-all">WITHDRAW</button>
            </div>
          </div>
       </div>
       <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
         <h3 className="font-embroidery text-3xl text-white mb-6 italic">TRANSACTION LOG</h3>
         <div className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
           {MOCK_TRANSACTIONS.map(tx => (
             <div key={tx.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
               <div>
                 <span className="block font-bold text-white uppercase tracking-wider">{tx.type}</span>
                 <span className="text-[10px] text-gray-500">{tx.date}</span>
               </div>
               <span className={`block font-black ${tx.type === 'Sale' ? 'text-green-500' : 'text-red-500'}`}>
                 {tx.type === 'Sale' ? '+' : '-'}{tx.amount.toLocaleString()}
               </span>
             </div>
           ))}
         </div>
       </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <Shield className="text-red-600" size={32} />
            <h3 className="font-embroidery text-3xl text-white">SECURITY & DRM</h3>
          </div>
          
          <div className="space-y-6">
            <ToolOption 
              icon={<ShieldAlert/>} 
              title="Active Screen Blur" 
              desc="Engagement: Blurs content when app focus is lost."
              active 
            />
            <ToolOption 
              icon={<FingerprintIcon/>} 
              title="AI Steganography" 
              desc="Embedding invisible ownership tokens in every pixel."
              active 
            />
            <ToolOption 
              icon={<Clock/>} 
              title="Expirable Delivery" 
              desc="Signed URLs automatically expire after 10 minutes."
              active 
            />
            
            <div className="pt-8 border-t border-white/5">
               <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Screen Capture Violations (Last 24h)</h4>
               <div className="flex items-center justify-between p-4 bg-red-600/10 border border-red-600/20 rounded-2xl text-red-500">
                  <div className="flex items-center gap-3">
                     <ShieldAlert size={16} />
                     <span className="text-xs font-bold">2 Attempts Blocked Successfully</span>
                  </div>
                  <button className="text-[10px] font-black uppercase underline">View Logs</button>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <Settings className="text-red-600" size={32} />
            <h3 className="font-embroidery text-3xl text-white">PORTFOLIO DEPLOYMENT</h3>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global CDN Endpoint</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-mono text-xs">
                https://cdn.pichazangu.com/ali_studio/
              </div>
            </div>
            <button 
              onClick={handleSaveSettings}
              className="w-full bg-red-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs"
            >
              Update Cloud Headers
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white p-6 md:p-12 overflow-x-hidden">
      <div className="relative h-96 rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-white/5">
        <img src={coverBanner} className="w-full h-full object-cover opacity-60" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        
        <div className="absolute bottom-8 left-12 flex flex-col md:flex-row items-end gap-8 w-full pr-12">
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 border-4 border-[#0a0a0a] shadow-2xl overflow-hidden">
              <img src={profilePhoto} className="w-full h-full object-cover rounded-[2.2rem]" alt="" />
            </div>
          </div>
          
          <div className="flex-1 pb-2">
            <h1 className="font-embroidery text-5xl md:text-6xl uppercase italic">
              ALI COMMAND CENTER <VerificationBadge type="photographer" size={40} />
            </h1>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
                <MapPin size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        <TabBtn icon={<Zap/>} active={activeTab==='overview'} label="Overview" onClick={()=>setActiveTab('overview')} />
        <TabBtn icon={<LayoutGrid/>} active={activeTab==='portfolio'} label="Portfolio" onClick={()=>setActiveTab('portfolio')} />
        <TabBtn icon={<Lock/>} active={activeTab==='vaults'} label="Vaults" onClick={()=>setActiveTab('vaults')} />
        <TabBtn icon={<DollarSign/>} active={activeTab==='wallet'} label="Wallet" onClick={()=>setActiveTab('wallet')} />
        <TabBtn icon={<Shield/>} active={activeTab==='tools'} label="Security" onClick={()=>setActiveTab('tools')} />
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'portfolio' && renderPortfolio()}
      {activeTab === 'vaults' && renderVaultSystem()}
      {activeTab === 'wallet' && renderWallet()}
      {activeTab === 'tools' && renderTools()}
    </div>
  );
};

const ToolOption = ({ icon, title, desc, active }: { icon: any, title: string, desc: string, active?: boolean }) => (
  <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${active ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-500'}`}>
        {icon}
      </div>
      <div>
        <span className="block font-bold text-white text-xs uppercase tracking-widest mb-0.5">{title}</span>
        <span className="text-[9px] text-gray-500 uppercase leading-none">{desc}</span>
      </div>
    </div>
    <div className="relative w-10 h-5 bg-gray-800 rounded-full p-1 cursor-pointer">
      <div className={`w-3 h-3 rounded-full transition-transform ${active ? 'translate-x-5 bg-red-600' : 'translate-x-0 bg-gray-500'}`} />
    </div>
  </div>
);

const FingerprintIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 0 1 13-9.54"/><path d="M7 19a10 10 0 0 1 0-14"/><path d="M11 20a10 10 0 0 1 0-16"/><path d="M15 20a10 10 0 0 1 0-16"/><path d="M19 20a10 10 0 0 1 0-16"/><circle cx="12" cy="12" r="10"/><path d="M12 12a10 10 0 0 1 10-10"/></svg>
);

const SecurityStat = ({ label, active }: { label: string, active?: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-[10px] font-bold text-gray-500 uppercase">{label}</span>
    {active ? <CheckCircle size={14} className="text-green-500" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/10" />}
  </div>
);

const StatCard = ({icon, label, val, color}: {icon: any, label: string, val: string, color: string}) => {
  const colors: any = {
    red: 'text-red-500 bg-red-600/10 border-red-600/20',
    green: 'text-green-500 bg-green-600/10 border-green-600/20',
    blue: 'text-blue-500 bg-blue-600/10 border-blue-600/20',
    purple: 'text-purple-500 bg-purple-600/10 border-purple-600/20'
  };
  return (
    <div className={`p-8 rounded-[2rem] border ${colors[color]} backdrop-blur-md shadow-lg transition-transform hover:-translate-y-2`}>
      <div className="mb-4">{icon}</div>
      <span className="text-xs font-bold uppercase tracking-widest opacity-60 block mb-2">{label}</span>
      <span className="text-2xl font-bungee">{val}</span>
    </div>
  );
};

const TabBtn = ({icon, label, active, onClick}: {icon: any, label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-black text-sm uppercase tracking-widest border ${
      active ? 'bg-red-600 border-red-600 text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
    }`}
  >
    {icon} {label}
  </button>
);

export default PhotographerProfile;