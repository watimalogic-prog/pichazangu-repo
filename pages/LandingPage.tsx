import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { UserRole } from '../types';
import Logo from '../components/Logo';
// Added missing Smartphone and Database imports from lucide-react
import { 
  Camera, ArrowRight, Building2, UserCircle, Check, X, ShieldCheck, 
  Zap, Globe, Award, Sparkles, ChevronRight, Layers, Target, Heart,
  TrendingUp, Activity, BookOpen, Briefcase, User, MapPin, Radio,
  Smartphone, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const REASONS = [
  "99% Revenue Share", "30-Year Archive Guarantee", "Zero Image Compression",
  "Military-Grade Watermarking", "M-Pesa STK Integration", "Regional KRA Compliance",
  "Gemini-Powered AI Metadata", "Anti-Screenshot Protection", "Live News Wire Access",
  "Picha Academy Accreditation", "Geotagged Discovery Nodes", "Decentralized Node Storage",
  "Instant Mobile Money Payouts", "Smart-Contract Rights System", "High-Res RAW Availability",
  "Community-Led Media Bounties", "Cultural Heritage Preservation", "Native Mobile-Web UX",
  "AI Signature Style Lab", "Biometric Vault Passkeys", "Multi-Currency Node Support",
  "Direct FTP Media Gateway", "Fraud-Proof Pixel Signature", "Zero Portfolio Hosting Fees",
  "400MP Sensor Optimization", "Facial Retrieval Engine", "Cross-Border Payout Nodes",
  "Verified Pro Identity Tiers", "Exclusive IPPO Auctions", "Reclaiming the African Lens"
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const [showTerms, setShowTerms] = useState<UserRole | null>(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  
  const { scrollY } = useScroll();
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 600], [1, 0.9]);

  const backgrounds = [
    { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=90' },
    { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=90' },
    { url: 'https://images.unsplash.com/photo-1544621150-45308605330a?auto=format&fit=crop&w=1920&q=90' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentBg((prev) => (prev + 1) % backgrounds.length), 8000);
    return () => clearInterval(timer);
  }, [backgrounds.length]);

  const finalizeLogin = () => {
    if (showTerms && hasAccepted) {
      onLogin(showTerms);
      setShowTerms(null);
    }
  };

  return (
    <div className="bg-black text-white selection:bg-[#E31E24] min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION (DARK) --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentBg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} className="absolute inset-0 z-0">
            <img src={backgrounds[currentBg].url} className="w-full h-full object-cover grayscale opacity-50" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </motion.div>
        </AnimatePresence>

        <motion.div style={{ opacity: opacityHero, scale: scaleHero }} className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
           <h1 className="brand-title italic text-white mb-4">
              PICH<span className="text-[#E31E24]">azangu</span>
           </h1>
           <div className="h-[2px] w-24 bg-red-600 mb-8" />
           <p className="font-embroidery text-3xl md:text-5xl text-white/40 uppercase tracking-tighter mb-12">Stitching the soul of Africa</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
              <RoleCard icon={<Camera size={32} />} title="Photographer" onClick={() => setShowTerms('photographer')} accent />
              <RoleCard icon={<Building2 size={32} />} title="Media House" onClick={() => setShowTerms('media')} />
              <RoleCard icon={<UserCircle size={32} />} title="Client" onClick={() => setShowTerms('client')} />
           </div>
        </motion.div>
      </section>

      {/* --- THE WHITE ROOM: 30 PILLARS (SLOW MARQUEE) --- */}
      <section className="py-32 bg-stitched-white text-black relative min-h-screen flex flex-col items-center overflow-hidden">
        {/* Massive Brand Watermark Overlay */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03]">
           <h2 className="font-embroidery text-[45vw] text-black italic">ZANGU</h2>
        </div>

        <div className="max-w-7xl w-full px-6 relative z-10">
           <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-full mb-6 shadow-2xl">
                 <Award size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Master Protocol</span>
              </div>
              <h2 className="font-embroidery text-6xl md:text-9xl italic leading-none uppercase tracking-tighter">30 Reasons <br/><span className="text-[#E31E24] font-embroidery-sketch">to Sync</span></h2>
              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Archival Preservation Synchronized</p>
           </div>

           {/* VERTICAL MARQUEE CONTAINER - SLOWED FOR READABILITY */}
           <div className="relative h-[900px] w-full mask-fade-vertical overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                 
                 {/* Column 1 - Normal Slow */}
                 <div className="flex flex-col gap-6 animate-marquee-vertical">
                    {[...REASONS, ...REASONS, ...REASONS].map((reason, i) => (
                      <ReasonBubble key={`c1-${i}`} index={i % 30 + 1} text={reason} />
                    ))}
                 </div>

                 {/* Column 2 - Fast Slow / Red Accents */}
                 <div className="hidden md:flex flex-col gap-6 animate-marquee-vertical-fast">
                    {[...REASONS.slice(15), ...REASONS, ...REASONS.slice(0, 15)].map((reason, i) => (
                      <ReasonBubble key={`c2-${i}`} index={(i + 15) % 30 + 1} text={reason} color="red" />
                    ))}
                 </div>

                 {/* Column 3 - Normal Slow */}
                 <div className="hidden md:flex flex-col gap-6 animate-marquee-vertical">
                    {[...REASONS.slice(10), ...REASONS, ...REASONS.slice(0, 10)].map((reason, i) => (
                      <ReasonBubble key={`c3-${i}`} index={(i + 10) % 30 + 1} text={reason} />
                    ))}
                 </div>

              </div>
           </div>
        </div>

        {/* Dynamic Stitched Line at bottom of white section */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex gap-1 opacity-20">
           {Array.from({length: 200}).map((_, i) => (
              <div key={i} className="flex-1 h-full bg-red-600" />
           ))}
        </div>
      </section>

      {/* --- THE CAMERA IDENTITY SECTION --- */}
      <section className="py-32 bg-black text-white relative">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="flex items-center gap-4">
                    <ShieldCheck className="text-[#E31E24]" size={48} />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.8em]">Identity Node terminal active</span>
                 </div>
                 <h2 className="font-embroidery text-6xl md:text-[8rem] italic leading-[0.85] uppercase">Reclaiming <br/><span className="text-[#E31E24] font-embroidery-sketch">The Lens</span></h2>
                 <p className="text-xl md:text-3xl text-gray-400 font-medium leading-relaxed uppercase tracking-tighter">
                    Built for the elite professional. Every capture is a secure <span className="text-white">IPPO (Initial Public Pixel Offering)</span> distributed through our regional cluster.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FeatureBox icon={<Layers size={24}/>} title="30-Yr Archiving" desc="Immutable Regional Storage" />
                    <FeatureBox icon={<Zap size={24}/>} title="99% Payouts" desc="Decentralized Royalty Node" />
                 </div>
              </div>

              {/* The Interactive Central Camera Logo */}
              <div className="relative group p-4 md:p-8 rounded-[4rem] border-2 border-dashed border-white/10 hover:border-red-600/30 transition-all duration-700">
                 <div className="absolute inset-0 bg-red-600/5 blur-[100px] rounded-full animate-pulse" />
                 <Logo size="lg" className="relative z-10 transition-transform duration-700 group-hover:scale-105" />
                 
                 <div className="absolute -top-6 -right-6 bg-white text-black px-8 py-4 rounded-full font-black text-[10px] uppercase shadow-[0_20px_50px_rgba(255,255,255,0.2)] z-20 border-4 border-red-600 animate-bounce">
                    Interactive 400MP Node
                 </div>
                 
                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 text-gray-500">
                    <div className="w-12 h-0.5 bg-white/10" />
                    <span className="text-[8px] font-black uppercase tracking-[0.6em] whitespace-nowrap">Hardware Synchronization: v4.0.9</span>
                    <div className="w-12 h-0.5 bg-white/10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- SITEMAP SHORTCUTS: QUICK NAVIGATION FOOTER --- */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
              <ShortcutNode to="/trending" icon={<TrendingUp size={18}/>} label="Trending" />
              <ShortcutNode to="/stock" icon={<Activity size={18}/>} label="Market" />
              <ShortcutNode to="/sports" icon={<Award size={18}/>} label="Sports" />
              <ShortcutNode to="/fashion" icon={<Smartphone size={18}/>} label="Fashion" />
              <ShortcutNode to="/wildlife" icon={<Globe size={18}/>} label="Wildlife" />
              <ShortcutNode to="/street" icon={<MapPin size={18}/>} label="Street" />
              <ShortcutNode to="/learn" icon={<BookOpen size={18}/>} label="Academy" />
              <ShortcutNode to="/gigz" icon={<Briefcase size={18}/>} label="Gigz" />
              <ShortcutNode to="/vault-access" icon={<Database size={18}/>} label="Vaults" />
              <ShortcutNode to="/media-house" icon={<Radio size={18}/>} label="News Wire" />
              <ShortcutNode to="/style-lab" icon={<Sparkles size={18}/>} label="Style Lab" />
              <ShortcutNode to="/about" icon={<ChevronRight size={18}/>} label="The Vision" />
           </div>
           
           <div className="mt-20 pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                 <Logo size="sm" />
                 <div className="font-embroidery text-xl tracking-tighter uppercase italic text-white">
                    PICHA<span className="text-red-600">ZANGU</span>
                 </div>
              </div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-[1em]">Reclaiming the narrative</span>
              <div className="flex gap-6">
                 <Link to="/about" className="text-[10px] font-black uppercase hover:text-red-600 transition-colors">Privacy</Link>
                 <Link to="/about" className="text-[10px] font-black uppercase hover:text-red-600 transition-colors">Terms</Link>
                 <Link to="/about" className="text-[10px] font-black uppercase hover:text-red-600 transition-colors">Nodes</Link>
              </div>
           </div>
        </div>
      </section>

      {/* --- TERMS MODAL --- */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-[500] flex items-end md:items-center justify-center bg-black/95 backdrop-blur-3xl md:p-6">
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-white text-black w-full max-w-3xl rounded-t-[4rem] md:rounded-[4rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-[#E31E24] p-10 text-white flex justify-between items-center">
                 <h2 className="font-embroidery text-4xl italic uppercase">PROTOCOL CONSENT</h2>
                 <button onClick={() => setShowTerms(null)} className="p-4 hover:bg-black/20 rounded-full transition-all"><X size={28} /></button>
              </div>

              <div className="flex-1 p-10 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                   {REASONS.slice(0, 5).map((r, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-red-600/30 transition-all">
                      <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bungee shadow-lg">{i+1}</div>
                      <p className="text-sm font-black uppercase tracking-tight text-gray-700">{r}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-white border-t border-gray-100">
                 <label className="flex items-center gap-4 cursor-pointer mb-10 group">
                   <div className={`w-10 h-10 rounded-2xl border-4 flex items-center justify-center transition-all shrink-0 ${hasAccepted ? 'bg-[#E31E24] border-[#E31E24] shadow-xl' : 'border-gray-200'}`}>
                      <input type="checkbox" className="hidden" checked={hasAccepted} onChange={() => setHasAccepted(!hasAccepted)} />
                      {hasAccepted && <Check size={24} className="text-white" />}
                   </div>
                   <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">I agree to the 99% revenue protocol and the 30-year regional data preservation terms.</p>
                 </label>

                 <button disabled={!hasAccepted} onClick={finalizeLogin} className={`w-full py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] transition-all ${hasAccepted ? 'bg-black text-white hover:bg-red-600 shadow-2xl shadow-red-900/40' : 'bg-gray-100 text-gray-400'}`}>
                   ACTIVATE SECTOR ACCESS
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-black py-24 px-6 border-t-8 border-red-600 text-center relative overflow-hidden">
         <div className="app-container relative z-10">
            <span className="text-[10px] font-black text-gray-800 uppercase tracking-[1em] block mb-4">REGION: EAST AFRICA CLUSTER NBI_01</span>
            <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.5em]">© 2025 PICHA ZANGU PLC • ALL ARCHIVES ENCRYPTED</span>
         </div>
         <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center font-bungee text-[30vw] select-none pointer-events-none text-white italic">ZANGU</div>
      </footer>
    </div>
  );
};

/**
 * REASON BUBBLE COMPONENT
 * Fixed with explicit interface and React.FC typing to resolve 'key' prop issues in .map calls.
 */
interface ReasonBubbleProps {
  index: number;
  text: string;
  color?: string;
}

const ReasonBubble: React.FC<ReasonBubbleProps> = ({ index, text, color = "black" }) => (
  <div className={`p-8 rounded-[3rem] border-2 flex flex-col transition-all hover:scale-105 group cursor-default ${color === 'red' ? 'bg-red-600 border-red-600 text-white shadow-red-900/30' : 'bg-white border-gray-100 text-black shadow-lg'}`}>
    <span className={`font-bungee text-2xl mb-4 ${color === 'red' ? 'text-white/40' : 'text-red-600'}`}>{index.toString().padStart(2, '0')}</span>
    <p className="font-bold text-sm uppercase tracking-tight leading-snug">{text}</p>
    <div className="mt-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
       <Sparkles size={16} className={color === 'red' ? 'text-white' : 'text-red-600'} />
       <div className={`h-1 flex-1 mx-4 rounded-full ${color === 'red' ? 'bg-white/20' : 'bg-red-50'}`} />
    </div>
  </div>
);

/**
 * ROLE CARD COMPONENT
 * Typed props to ensure compatibility with Landing Page login logic.
 */
interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  accent?: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, onClick, accent = false }) => (
  <button onClick={onClick} className={`p-10 rounded-[3.5rem] text-left transition-all duration-500 border-2 overflow-hidden flex flex-col h-full hover:scale-[1.03] shadow-2xl active:scale-95 group relative ${accent ? 'bg-[#E31E24] border-[#E31E24] text-white' : 'bg-white/5 border-white/10 text-white hover:border-[#E31E24]'}`}>
    {/* Stitched effect overlay */}
    <div className="absolute inset-2 border border-dashed border-white/10 rounded-[3rem] pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity" />
    
    <div className={`mb-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${accent ? 'bg-white text-[#E31E24] rotate-6 group-hover:rotate-0' : 'bg-[#E31E24] text-white group-hover:rotate-12'}`}>
       {icon}
    </div>
    <h3 className="font-embroidery italic font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none">{title}</h3>
    <div className="mt-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
      Initialize Handshake <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
    </div>
  </button>
);

/**
 * FEATURE BOX COMPONENT
 * Static detail node for brand value proposition.
 */
interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, desc }) => (
  <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 group hover:bg-white hover:text-black transition-all duration-500">
     <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform">{icon}</div>
     <h4 className="font-black text-sm uppercase tracking-widest mb-1 group-hover:text-black transition-colors">{title}</h4>
     <p className="text-[10px] opacity-60 font-bold uppercase group-hover:text-gray-600 transition-colors">{desc}</p>
  </div>
);

/**
 * SHORTCUT NODE COMPONENT
 * Functional navigation Link for the sitemap footer.
 */
const ShortcutNode: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex flex-col items-center gap-4 group p-6 rounded-[2rem] hover:bg-white/5 transition-all"
  >
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
       {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">{label}</span>
  </Link>
);

export default LandingPage;