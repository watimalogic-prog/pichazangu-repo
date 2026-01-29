import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { UserRole } from '../types';
import Logo from '../components/Logo';
import { 
  Camera, DollarSign, Smartphone, Globe, ShieldCheck, Zap, Users, 
  ArrowRight, ArrowDown, BookOpen, Newspaper,
  Lock, Radio, FileText, Send, Sparkles, CreditCard, 
  Target, Globe2, Layers, Repeat, Clock, HelpCircle,
  Play, ChevronRight, Share2, Award, X, Check, Eye, TrendingUp, Briefcase,
  Flame, ShieldAlert, Cpu, Database, Fingerprint, History, Building2, UserCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const TERMS = {
  photographer: [
    "99% Royalty Guarantee: You keep almost everything you earn.",
    "Decide Your Price: You have full control over the base price of your assets.",
    "Fixed Service Fees: Only 10 KES (Private), 20 KES (Public Market), or 50 KES (Live Wire) added per license.",
    "30-Year Archive: We commit to storing high-res originals for three decades.",
    "Zero Compression: Your work is served exactly as uploaded, no pixel loss.",
    "Glass-Shield Protection: Automatic military-grade watermarking on all previews.",
    "KRA Tax Compliance: Automated VAT and tax reporting for all transactions.",
    "AI Metadata: Mandatory verification of Gemini-powered tagging for discovery.",
    "Anti-Screenshot Shield: Active platform blocking of screen capture attempts.",
    "Breaking News Exclusivity: 24-hour exclusive window for verified media houses.",
    "IP Ownership: You retain copyright; Picha Zangu acts as your licensing agent.",
    "Prohibited Content: Zero tolerance for non-consensual or illegal imagery.",
    "Regional Payouts: Minimum withdrawal limits for M-Pesa, MTN, and Airtel.",
    "Metadata Integrity: Photographers are responsible for GPS accuracy.",
    "Legacy Rights: Ability to designate an heir for long-term archive royalties."
  ],
  media: [
    "Verified Accreditation: Requires valid corporate tax ID and media license.",
    "Editorial License Scope: Assets limited to news/editorial, no ad use.",
    "Direct FTP Protocol: Agreement to secure configuration of receiving servers.",
    "Embargo Compliance: Respecting mandatory news release delay periods.",
    "Mandatory Attribution: Visible credit required for photographer and platform.",
    "Credit Line Maintenance: Active balances required for instant wire downloads.",
    "Bulk Licensing: Access to tiered volume pricing for media conglomerates.",
    "Source Verification: Media houses are responsible for final fact-checking.",
    "Non-Transferability: Licenses are entity-specific and cannot be sub-licensed.",
    "Tax Invoicing: Automated KRA-ready invoices for all corporate purchases.",
    "API Security: No unauthorized scraping or automated indexing of the archive.",
    "First Rights Bidding: Eligibility to bid on exclusive IPPO trending assets.",
    "Permanent Access: Licensed assets remain accessible in the corporate vault.",
    "Annual Audit: Picha Zangu reserves the right to audit license usage yearly.",
    "Refund Policy: Refunds limited to technical file corruption verified by AI."
  ],
  client: [
    "Secure Checkout: Agreement to Safaricom/MTN/Airtel STK Push prompts.",
    "Personal Use Scope: Licenses limited to personal display and social sharing.",
    "Vault Security: Client responsibility for the 6-digit private vault PIN.",
    "No Redistribution: Strict ban on sharing unlocked files with third parties.",
    "Final Sale Policy: Digital delivery is final once asset is unlocked in vault.",
    "Privacy Encryption: Browsing and purchase history is end-to-end encrypted.",
    "Verified Referrals: Credits earned only through verified user onboarding.",
    "Regional Support: Support active during EAT business hours (8AM-8PM).",
    "Device Authorization: Limited to 5 concurrent devices for high-res access.",
    "KRA Receipts: Automated digital receipts provided for every transaction.",
    "File Authenticity: Guarantee of high-resolution delivery as advertised.",
    "Preview Restrictions: Low-res watermarked images are for selection only.",
    "No Bot Usage: Prohibition of automated scripts to scan discovery feeds.",
    "One Person One Account: Individual account usage only for vault integrity.",
    "Dispute Resolution: Acceptance of platform-mediated regional arbitration."
  ]
};

const NAV_MAP: Record<string, string> = {
  "Discovery": "/trending",
  "Market": "/stock",
  "Academy": "/learn",
  "Gigz": "/gigz",
  "Vision": "/about",
  "Nairobi": "/trending",
  "Kampala": "/trending",
  "Dar": "/trending",
  "Kigali": "/trending",
  "WILDLIFE": "/wildlife",
  "URBAN STREET": "/street",
  "FASHION": "/fashion",
  "MEDIA WIRE": "/trending",
  "Privacy": "/about",
  "Protocol": "/about",
  "KRA Invoicing": "/client-profile",
  "NDPA": "/about"
};

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);
  const [showTerms, setShowTerms] = useState<UserRole | null>(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  const backgrounds = [
    { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=90', title: 'Serengeti Wildlife', effect: 'animate-kenburns-zoom-in' },
    { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=90', title: 'Savannah Horizon', effect: 'animate-kenburns-pan-right' },
    { url: 'https://images.unsplash.com/photo-1544621150-45308605330a?auto=format&fit=crop&w=1920&q=90', title: 'Urban Nairobi', effect: 'animate-kenburns-zoom-out' },
    { url: 'https://images.unsplash.com/photo-1523805081446-99b2566d9ffb?auto=format&fit=crop&w=1920&q=90', title: 'Mombasa Streets', effect: 'animate-kenburns-pan-left' },
  ];

  const benefits = [
    { title: "M-Pesa STK", desc: "Instant mobile money integration.", icon: <Smartphone />, link: "/stock" },
    { title: "MTN MoMo", desc: "Seamless regional payouts.", icon: <CreditCard />, link: "/stock" },
    { title: "99% Royalties", desc: "Keep almost everything.", icon: <DollarSign />, link: "/about" },
    { title: "Picha Academy", desc: "Pro diploma tracks.", icon: <BookOpen />, link: "/learn" },
    { title: "Glass Shield", desc: "Military watermarking.", icon: <ShieldCheck />, link: "/about" },
    { title: "30-Year Archive", desc: "Decades of secure storage.", icon: <Layers />, link: "/about" },
    { title: "KRA Ready", desc: "Automated tax compliance.", icon: <FileText />, link: "/about" },
    { title: "AI Tagging", desc: "Gemini-powered discovery.", icon: <Sparkles />, link: "/trending" },
    { title: "News Wire", desc: "Direct media pipelines.", icon: <Radio />, link: "/trending" },
    { title: "Geotagged", desc: "Local neighborhood search.", icon: <Globe2 />, link: "/trending" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePortalAction = (role: UserRole) => {
    setShowTerms(role);
    setHasAccepted(false);
  };

  const finalizeLogin = () => {
    if (showTerms && hasAccepted) {
      onLogin(showTerms);
      setShowTerms(null);
    }
  };

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#E31E24] font-modern">
      
      <nav className="fixed top-0 left-0 right-0 h-24 glass z-[100] px-8 md:px-16 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="bg-[#E31E24] text-white p-3 rounded-2xl group-hover:rotate-12 transition-all duration-500 shadow-[0_0_30px_rgba(227,30,36,0.6)]">
              <Camera size={28} />
            </div>
            <div className="font-embroidery text-4xl text-white tracking-tighter uppercase italic leading-none">
              PICHA<span className="text-[#E31E24]">zangu</span>
            </div>
          </Link>
          <div className="hidden xl:flex gap-4 items-center">
            <LandingNavLink to="/trending" icon={<TrendingUp size={16}/>} label="The Feed" />
            <LandingNavLink to="/stock" icon={<Zap size={16}/>} label="The Market" />
            <LandingNavLink to="/learn" icon={<BookOpen size={16}/>} label="The Academy" />
            <LandingNavLink to="/gigz" icon={<Briefcase size={16}/>} label="Opportunities" />
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={backgrounds[currentBg].url} 
              className={`w-full h-full object-cover will-change-transform ${backgrounds[currentBg].effect}`} 
              alt="Cinematic Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/100" />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        <motion.div style={{ opacity: opacityHero, y: yHero }} className="relative z-10 text-center px-6 max-w-7xl flex flex-col items-center">
          <div className="mb-12 relative">
             <div className="absolute inset-0 bg-[#E31E24]/10 blur-[150px] rounded-full scale-150 animate-pulse" />
             <Logo size="lg" className="relative drop-shadow-[0_0_120px_rgba(227,30,36,0.8)]" />
             <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-[0.6em] animate-pulse">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                SYSTEM_LIVE_V4
             </div>
          </div>
          
          <div className="mb-8 relative">
            <h1 className="font-embroidery text-8xl md:text-[14rem] italic leading-[0.75] uppercase text-white drop-shadow-[0_20px_80px_rgba(0,0,0,1)] text-glow-red select-none">
              PICH<span className="text-[#E31E24] text-outline-white">azangu</span>
            </h1>
            <h2 className="font-embroidery text-4xl md:text-6xl text-white/40 -mt-4 uppercase tracking-tight relative z-20">STITCHING THE SOUL OF AFRICA</h2>
          </div>
          
          <p className="text-xl md:text-2xl font-medium uppercase tracking-[0.4em] text-white/80 mb-12 max-w-4xl leading-relaxed">
            The Premier <span className="text-[#E31E24] font-embroidery-sketch text-4xl">Decentralized</span> Media Archive.
          </p>

          {/* SIGN UP CARDS DIRECTLY ON LANDING */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
            <RoleCard 
              icon={<Camera size={32} />} 
              title="Photographer" 
              desc="99% Royaltes. You set the price."
              onClick={() => handlePortalAction('photographer')}
              accent
            />
            <RoleCard 
              icon={<Building2 size={32} />} 
              title="Media" 
              desc="Instant high-res news wire."
              onClick={() => handlePortalAction('media')}
            />
            <RoleCard 
              icon={<UserCircle size={32} />} 
              title="Client" 
              desc="Authentic regional stock."
              onClick={() => handlePortalAction('client')}
            />
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 opacity-40">
          <span className="text-[9px] font-black uppercase tracking-[0.8em]">Deep Exploration</span>
          <div className="w-[2px] h-20 bg-gradient-to-b from-[#E31E24] to-transparent rounded-full animate-bounce" />
        </div>
      </section>

      <section className="py-40 bg-white text-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 relative z-10 space-y-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12 sticky top-40">
                 <div className="flex items-center gap-4">
                    <History size={32} className="text-[#E31E24]" />
                    <span className="text-[#E31E24] font-black text-xs uppercase tracking-[0.6em]">The Philosophy of the Archive</span>
                 </div>
                 <h2 className="font-embroidery text-7xl md:text-9xl italic leading-[0.8] uppercase">RECLAIMING <br/><span className="text-[#E31E24]">OUR LENS</span></h2>
                 <p className="text-2xl text-gray-800 font-medium leading-relaxed uppercase tracking-tight">
                    For over a century, the visual identity of East Africa has been curated by outsiders.
                 </p>
                 <div className="p-10 bg-[#E31E24] text-white rounded-[3.5rem] shadow-2xl shadow-red-200">
                    <h4 className="font-bungee text-2xl mb-4 text-white">THE ZANGU MANIFESTO</h4>
                    <p className="text-lg font-bold uppercase leading-relaxed text-red-50">
                       "Every click captured by a local pro is a brick in the wall of our digital heritage."
                    </p>
                 </div>
              </div>

              <div className="prose prose-xl prose-red max-w-none space-y-16 py-10">
                 <div className="space-y-8">
                    <h3 className="font-modern font-black text-2xl text-[#E31E24] uppercase tracking-tighter">I. 99% Creator Economy</h3>
                    <p className="text-gray-600 leading-relaxed font-medium uppercase text-sm tracking-wide">
                       We flipped the agency model. Photographers now keep 99% of their revenue. We only add a tiny service fee (10/20/50 KES) to facilitate the decentralized node storage and M-Pesa distribution.
                    </p>
                 </div>
              </div>
           </div>

           <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <Link to={b.link} className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] hover:bg-black hover:text-white transition-all duration-500 group cursor-pointer block h-full">
                    <div className="text-[#E31E24] mb-6 group-hover:scale-110 transition-transform">{b.icon}</div>
                    <h5 className="font-modern font-black text-sm mb-2">{b.title}</h5>
                    <p className="text-[10px] font-black uppercase opacity-60 leading-tight">{b.desc}</p>
                  </Link>
                </motion.div>
              ))}
           </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="bg-white text-black w-full max-w-3xl rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-[#E31E24] p-12 text-white flex justify-between items-center">
                 <div>
                    <h2 className="font-embroidery text-5xl italic mb-1 uppercase tracking-tighter">PROTOCOL CONSENT</h2>
                    <p className="text-red-100 text-[10px] font-black uppercase tracking-[0.5em]">Sector: {showTerms.toUpperCase()}</p>
                 </div>
                 <button onClick={() => setShowTerms(null)} className="p-4 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
                    <X size={28} className="text-white" />
                 </button>
              </div>

              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar bg-gray-50 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   {TERMS[showTerms].map((point, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-8 h-8 rounded-2xl bg-white border border-gray-200 text-[#E31E24] flex items-center justify-center text-[11px] font-black shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-all shadow-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-bold uppercase tracking-tight">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-12 bg-white flex flex-col gap-8">
                 <label className="flex items-center gap-6 cursor-pointer group p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-[#E31E24]/30 transition-all">
                   <div className={`w-10 h-10 rounded-2xl border-4 flex items-center justify-center transition-all shrink-0 ${hasAccepted ? 'bg-[#E31E24] border-[#E31E24]' : 'border-gray-200 group-hover:border-[#E31E24]'}`}>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={hasAccepted}
                        onChange={() => setHasAccepted(!hasAccepted)}
                      />
                      {hasAccepted && <Check size={24} className="text-white" />}
                   </div>
                   <p className="text-xs text-gray-500 font-black uppercase tracking-widest leading-relaxed">
                     I agree to the 99% revenue protocol and regional preservation terms.
                   </p>
                 </label>

                 <button 
                  disabled={!hasAccepted}
                  onClick={finalizeLogin}
                  className={`w-full py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all ${hasAccepted ? 'bg-[#E31E24] text-white hover:bg-black shadow-red-900/40' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                 >
                   ACTIVATE SECTOR ACCESS <ArrowRight className="inline ml-4" size={20} />
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-black py-32 px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
           <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.8em]">© 2025 PICHA ZANGU PLC • RECLAIMING THE NARRATIVE</span>
              <div className="flex items-center gap-4 text-[9px] font-black text-gray-700 uppercase tracking-widest">
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> SYSTEM STABLE</div>
                 <span>SAT-LINK v4.2 ACTIVE</span>
              </div>
           </div>
        </div>
      </footer>

    </div>
  );
};

const RoleCard = ({ icon, title, desc, onClick, accent = false }: any) => (
  <button 
    onClick={onClick}
    className={`p-8 rounded-[2.5rem] text-left transition-all duration-500 border-2 overflow-hidden flex flex-col h-full hover:scale-[1.02] shadow-2xl ${accent ? 'bg-[#E31E24] border-[#E31E24] text-white' : 'bg-black/60 backdrop-blur-md border-white/10 text-white hover:border-[#E31E24]'}`}
  >
    <div className={`mb-6 w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all ${accent ? 'bg-white text-[#E31E24]' : 'bg-[#E31E24] text-white'}`}>
       {icon}
    </div>
    <h3 className="font-modern font-black text-2xl mb-2 tracking-tighter uppercase">{title}</h3>
    <p className={`text-xs leading-relaxed font-bold uppercase tracking-tight ${accent ? 'text-white/80' : 'text-white/40'}`}>{desc}</p>
    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
      Login Now <ChevronRight size={14} />
    </div>
  </button>
);

const LandingNavLink = ({ to, icon, label }: { to: string, icon: any, label: string }) => (
  <Link 
    to={to} 
    className="flex items-center gap-2.5 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
  >
    {icon} {label}
  </Link>
);

export default LandingPage;