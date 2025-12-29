import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { UserRole } from '../types';
import Logo from '../components/Logo';
import { 
  Camera, DollarSign, Smartphone, Globe, ShieldCheck, Zap, Users, 
  ArrowRight, ArrowDown, BookOpen, Newspaper,
  Lock, Radio, FileText, Send, Sparkles, CreditCard, 
  Target, Globe2, Layers, Repeat, Clock, HelpCircle,
  Play, ChevronRight, Share2, Award, X, Check, Eye, TrendingUp, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const TERMS = {
  photographer: [
    "70% Royalty Guarantee: Earn the highest creator share in East Africa.",
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
    "Academy Path: Access requires progress in Picha Academy curriculum.",
    "Escrow Security: Payments held until buyer successfully unlocks the asset.",
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

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [currentBg, setCurrentBg] = useState(0);
  const [showTerms, setShowTerms] = useState<UserRole | null>(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const backgrounds = [
    { url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=90', title: 'Serengeti Wildlife', effect: 'animate-kenburns-zoom-in' },
    { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=90', title: 'Savannah Horizon', effect: 'animate-kenburns-pan-right' },
    { url: 'https://images.unsplash.com/photo-1544621150-45308605330a?auto=format&fit=crop&w=1920&q=90', title: 'Urban Nairobi', effect: 'animate-kenburns-zoom-out' },
    { url: 'https://images.unsplash.com/photo-1523805081446-99b2566d9ffb?auto=format&fit=crop&w=1920&q=90', title: 'Mombasa Streets', effect: 'animate-kenburns-pan-left' },
  ];

  const benefits = [
    { title: "M-Pesa STK", desc: "Instant mobile money integration.", icon: <Smartphone /> },
    { title: "MTN MoMo", desc: "Seamless regional payouts.", icon: <CreditCard /> },
    { title: "70% Royalties", desc: "Highest creator share.", icon: <DollarSign /> },
    { title: "Picha Academy", desc: "Pro diploma tracks.", icon: <BookOpen /> },
    { title: "Glass Shield", desc: "Military watermarking.", icon: <ShieldCheck /> },
    { title: "30-Year Archive", desc: "Decades of secure storage.", icon: <Layers /> },
    { title: "KRA Ready", desc: "Automated tax compliance.", icon: <FileText /> },
    { title: "AI Tagging", desc: "Gemini-powered discovery.", icon: <Sparkles /> },
    { title: "News Wire", desc: "Direct media pipelines.", icon: <Radio /> },
    { title: "Geotagged", desc: "Local neighborhood search.", icon: <Globe2 /> },
    { title: "Bulk Media", desc: "Agency-scale volume deals.", icon: <Layers /> },
    { title: "Exclusive Rights", desc: "Bidding for breaking news.", icon: <Lock /> },
    { title: "Authentic Africa", desc: "Zero stock-photo cliches.", icon: <Globe /> },
    { title: "Smart Contracts", desc: "Escrow for every gig.", icon: <ShieldCheck /> },
    { title: "Live Analytics", desc: "Real-time market velocity.", icon: <Zap /> },
    { title: "FTP Sync", desc: "Automated media house feeds.", icon: <Repeat /> },
    { title: "Flash Gigs", desc: "Instant assignment alerts.", icon: <Clock /> },
    { title: "Peer Review", desc: "Professional quality control.", icon: <Award /> },
    { title: "Regional Relevance", desc: "Built for local culture.", icon: <Globe /> },
    { title: "Mobile Field", desc: "Upload while on assignment.", icon: <Smartphone /> },
    { title: "Whale Alerts", desc: "Track high-volume buyers.", icon: <Target /> },
    { title: "Archive Insurance", desc: "Protected legacy storage.", icon: <Lock /> },
    { title: "Gig Board", desc: "Direct client connections.", icon: <Users /> },
    { title: "Discovery", desc: "AI-enhanced exploration.", icon: <Eye /> },
    { title: "Instant STK", desc: "Fastest checkout in Africa.", icon: <Smartphone /> },
    { title: "Safe Store", desc: "High-res raw protection.", icon: <ShieldCheck /> },
    { title: "Global API", desc: "Sync to world media outlets.", icon: <Globe2 /> },
    { title: "Pro Badging", desc: "Verified elite status.", icon: <Award /> },
    { title: "Tax-Free Payouts", desc: "Smart regional compliance.", icon: <DollarSign /> },
    { title: "24/7 AI Tutor", desc: "On-demand tech support.", icon: <HelpCircle /> }
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
    <div className="bg-black text-white overflow-x-hidden selection:bg-[#E31E24]">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 h-20 glass z-[100] px-6 md:px-12 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-[#E31E24] text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(227,30,36,0.4)]">
              <Camera size={24} />
            </div>
            <div className="font-embroidery text-3xl text-white tracking-tighter uppercase italic">
              PICHA<span className="text-[#E31E24]">ZANGU</span>
            </div>
          </Link>
          <div className="hidden xl:flex gap-1.5 items-center">
            <LandingNavLink to="/trending" icon={<TrendingUp size={14}/>} label="Discovery" />
            <LandingNavLink to="/stock" icon={<Zap size={14}/>} label="Market" />
            <LandingNavLink to="/gigz" icon={<Briefcase size={14}/>} label="Gigz" />
            <LandingNavLink to="/about" icon={<Eye size={14}/>} label="Vision" />
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => handlePortalAction('client')}
            className="bg-[#E31E24] text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-900/40 hover:bg-white hover:text-black transition-all"
           >
             Login Portal
           </button>
        </div>
      </nav>

      {/* --- HERO: IMMERSIVE CINEMATIC SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={backgrounds[currentBg].url} 
              className={`w-full h-full object-cover will-change-transform ${backgrounds[currentBg].effect}`} 
              alt="Pichazangu Cinematic"
            />
            {/* Ultra-dark overlays for maximum text legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/40 to-black/95" />
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        <motion.div style={{ opacity, y: y1 }} className="relative z-10 text-center px-6 max-w-6xl flex flex-col items-center">
          {/* Logo container adjusted for full visibility with deeper backdrop shadow */}
          <div className="mb-16 relative flex items-center justify-center w-full max-w-[90vw]">
             <div className="absolute inset-0 bg-black/90 blur-[130px] scale-125 rounded-full" />
             <div className="relative transform-gpu scale-90 md:scale-100 lg:scale-110">
                <Logo size="lg" className="drop-shadow-[0_0_120px_rgba(227,30,36,1)] transition-all duration-700 hover:brightness-125" />
             </div>
          </div>
          
          <h1 className="font-embroidery text-6xl md:text-[10rem] italic leading-[0.8] stitched-text mb-10 text-glow drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">
            STITCHING <br/> <span className="font-embroidery-sketch text-[#E31E24]">AFRICAN</span> STORIES
          </h1>
          <p className="text-xl md:text-3xl font-black uppercase tracking-[0.4em] text-white/95 mb-16 drop-shadow-[0_8px_16px_rgba(0,0,0,1)]">
            The Premier <span className="text-[#E31E24] text-glow">Media Hub</span> for East Africa
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/trending"
              className="group relative px-12 py-6 bg-white text-black font-black rounded-full overflow-hidden hover:pr-16 transition-all shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-xs">Explore Archive <ChevronRight size={18} /></span>
              <div className="absolute top-0 right-0 h-full w-0 bg-[#E31E24] group-hover:w-12 transition-all duration-300" />
            </Link>
            <button 
              onClick={() => handlePortalAction('photographer')}
              className="group px-12 py-6 bg-transparent border-2 border-white/50 text-white font-black rounded-full hover:border-[#E31E24] hover:bg-[#E31E24]/10 transition-all flex items-center gap-3 uppercase tracking-widest text-xs"
            >
              Upload Legacy <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Scroll to Explore</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-[#E31E24] to-transparent rounded-full animate-bounce shadow-[0_0_10px_rgba(227,30,36,0.8)]" />
        </motion.div>
      </section>

      {/* --- APP PORTAL CARDS WITH LOGIN BUTTONS --- */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           <AppPortalCard 
              icon={<Newspaper size={40} />}
              title="MEDIA HOUSE"
              desc="Verified high-res breaking news wire with direct FTP sync."
              cta="MEDIA LOGIN"
              onClick={() => handlePortalAction('media')}
              delay={0.2}
           />
           <AppPortalCard 
              icon={<Camera size={40} />}
              title="CREATORS"
              desc="70% Royalties, 30-year archival protection, and AI metadata."
              cta="CREATOR LOGIN"
              onClick={() => handlePortalAction('photographer')}
              accent
              delay={0.4}
           />
           <AppPortalCard 
              icon={<Smartphone size={40} />}
              title="BUYERS"
              desc="Authentic stock assets with M-Pesa & MoMo integrated payments."
              cta="CLIENT LOGIN"
              onClick={() => handlePortalAction('client')}
              delay={0.6}
           />
        </div>
      </section>

      {/* --- TERMS & CONDITIONS MODAL --- */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white text-black w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden my-auto"
            >
              <div className="bg-[#E31E24] p-10 text-white flex justify-between items-center">
                 <div>
                    <h2 className="font-embroidery text-4xl italic mb-1 uppercase">Protocol Acceptance</h2>
                    <p className="text-red-100 text-[10px] font-black uppercase tracking-widest">Registration v2025.1 • Verification Track</p>
                 </div>
                 <button onClick={() => setShowTerms(null)} className="p-4 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
                    <X size={24}/>
                 </button>
              </div>

              <div className="p-10 max-h-[50vh] overflow-y-auto custom-scrollbar bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
                   <div className="w-12 h-12 bg-[#E31E24] rounded-2xl flex items-center justify-center text-white shrink-0">
                      {showTerms === 'photographer' ? <Camera /> : showTerms === 'media' ? <Newspaper /> : <Users />}
                   </div>
                   <div>
                      <span className="text-[10px] font-black uppercase text-gray-400">Accepting as</span>
                      <h3 className="font-bold text-xl uppercase tracking-tighter">{showTerms} PORTAL</h3>
                   </div>
                </div>

                <div className="space-y-6">
                  {TERMS[showTerms].map((point, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-[#E31E24] flex items-center justify-center text-[10px] font-black shrink-0 group-hover:bg-[#E31E24] group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-white space-y-6">
                 <label className="flex items-start gap-4 cursor-pointer group">
                   <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${hasAccepted ? 'bg-[#E31E24] border-[#E31E24]' : 'border-gray-200 group-hover:border-[#E31E24]'}`}>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={hasAccepted}
                        onChange={() => setHasAccepted(!hasAccepted)}
                      />
                      {hasAccepted && <Check size={16} className="text-white" />}
                   </div>
                   <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">
                     I acknowledge that I have read and agree to all 15 protocol points for the {showTerms} portal. I understand my role in safeguarding the regional African image.
                   </p>
                 </label>

                 <button 
                  disabled={!hasAccepted}
                  onClick={finalizeLogin}
                  className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${hasAccepted ? 'bg-[#E31E24] text-white hover:bg-black' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                 >
                   Initialize Access <ArrowRight className="inline ml-2" size={16} />
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CYCLING REASONS: COMPACT & VISIBLE --- */}
      <section className="py-40 bg-white text-black relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none overflow-hidden">
          <span className="text-[25rem] font-embroidery-sketch whitespace-nowrap rotate-12">AUTHENTIC</span>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
           <div className="text-center mb-24">
              <h2 className="font-embroidery text-7xl md:text-[10rem] italic leading-[0.8] stitched-text mb-8">
                30 REASONS <br/> <span className="text-[#E31E24]">TO JOIN</span>
              </h2>
              <div className="w-24 h-2 bg-[#E31E24] mx-auto rounded-full" />
           </div>

           <div className="relative h-[550px] edge-fade overflow-hidden">
             <div className="flex flex-col gap-4 animate-benefits-scroll">
               {[...benefits, ...benefits].map((benefit, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 1.02 }}
                   className="group flex items-center gap-8 p-5 bg-gray-50 hover:bg-[#E31E24] hover:text-white rounded-[2.2rem] transition-all duration-500 border border-gray-100 shadow-md"
                 >
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#E31E24] shadow-md group-hover:rotate-6 transition-transform shrink-0">
                     {React.isValidElement(benefit.icon) ? React.cloneElement(benefit.icon as React.ReactElement, { size: 24 }) : <Sparkles size={24} />}
                   </div>
                   <div className="flex-1">
                     <h3 className="font-embroidery text-3xl mb-0.5 italic uppercase tracking-tighter leading-none">{benefit.title}</h3>
                     <p className="text-xs opacity-70 font-black uppercase tracking-widest leading-none">{benefit.desc}</p>
                   </div>
                   <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                     <ArrowRight size={28} />
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-16">
          <div className="space-y-8">
            <Logo size="md" className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
               {["Nairobi", "Kampala", "Dar Es Salaam", "Kigali"].map(city => (
                 <span key={city} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#E31E24] rounded-full" /> {city}
                 </span>
               ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-8">
             <div className="flex gap-10 text-[11px] font-black uppercase tracking-widest">
                <a href="#" className="hover:text-[#E31E24] transition-colors">Press Room</a>
                <a href="#" className="hover:text-[#E31E24] transition-colors">Investor Relations</a>
                <a href="#" className="hover:text-[#E31E24] transition-colors">Privacy</a>
             </div>
             <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">© 2025 Picha Zangu PLC • Built for Africa</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes benefits-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-benefits-scroll {
          animation: benefits-scroll 35s linear infinite;
        }
        .animate-benefits-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const LandingNavLink = ({ to, icon, label }: { to: string, icon: any, label: string }) => (
  <Link 
    to={to} 
    className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
  >
    {icon} {label}
  </Link>
);

const AppPortalCard = ({ icon, title, desc, cta, onClick, accent = false, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`group relative p-12 rounded-[4rem] cursor-pointer transition-all duration-500 border-2 overflow-hidden flex flex-col h-full ${accent ? 'bg-[#E31E24] border-[#E31E24] text-white' : 'glass-light border-white/10 text-white hover:border-white/30'}`}
  >
    <div className={`mb-10 w-20 h-20 rounded-3xl flex items-center justify-center transition-all ${accent ? 'bg-black text-white' : 'bg-[#E31E24] text-white group-hover:scale-110 shadow-lg'}`}>
       {icon}
    </div>
    <h3 className="font-bungee text-3xl mb-4 tracking-tighter">{title}</h3>
    <p className={`text-lg mb-12 leading-relaxed font-medium ${accent ? 'text-white/80' : 'text-white/50'}`}>{desc}</p>
    
    {/* Dedicated Login Button Style */}
    <div className="mt-auto">
      <button 
        className={`w-full py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all ${accent ? 'bg-white text-[#E31E24] hover:bg-black hover:text-white' : 'bg-[#E31E24] text-white hover:bg-white hover:text-black'}`}
      >
        {cta} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>

    <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-[3] pointer-events-none">
       {icon}
    </div>
  </motion.div>
);

export default LandingPage;