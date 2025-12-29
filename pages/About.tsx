
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldCheck, Newspaper, Camera, TrendingUp, Users, 
  Mail, Phone, MapPin, Play, Download, ArrowRight, Shield, 
  Zap, Heart, Award, FileText, Share2, MessageCircle, Languages
} from 'lucide-react';
import Logo from '../components/Logo';

const About: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'photographer' | 'media'>('photographer');
  const [language, setLanguage] = useState<'EN' | 'SW' | 'FR'>('EN');

  const stats = [
    { label: "Total Vaults Created", value: "12,402" },
    { label: "Photos Sold Today", value: "482" },
    { label: "Photographers Graduated", value: "3,150" }
  ];

  const roadmap = [
    { year: "2023", event: "Platform Alpha Launch in Nairobi" },
    { year: "2024", event: "Expansion to Kampala and Dar Es Salaam" },
    { year: "2025", event: "Decentralized 30-Year Archive Live" },
    { year: "2026", event: "Regional Hegemony & Global API Integration" }
  ];

  const partners = [
    "The Standard", "Nation Media", "Citizen TV", "BBC Africa", "Al Jazeera"
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E31E24] selection:text-white font-inter">
      {/* 1. THE BIG BANG HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b-8 border-[#E31E24]">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-40 ken-burns-right"
            poster="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="#" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Logo size="lg" className="mx-auto mb-16 scale-75 md:scale-110" />
            <h1 className="font-embroidery text-6xl md:text-9xl italic leading-none mb-8 stitched-text uppercase">
              Capturing the <br/><span className="text-[#E31E24]">African Narrative.</span>
            </h1>
            <p className="text-xl md:text-3xl font-bold uppercase tracking-[0.3em] text-gray-300 mb-4">
              One Vault at a Time.
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
              The first decentralized 30-year media archive and real-time news wire for East Africa. We don't just store photos; we protect history.
            </p>
          </motion.div>
        </div>

        {/* Language Toggle */}
        <div className="absolute top-10 right-10 flex gap-2 z-20">
          <button onClick={() => setLanguage('EN')} className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${language === 'EN' ? 'bg-[#E31E24] border-[#E31E24]' : 'bg-white/5 border-white/10 text-gray-500'}`}>EN</button>
          <button onClick={() => setLanguage('SW')} className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${language === 'SW' ? 'bg-[#E31E24] border-[#E31E24]' : 'bg-white/5 border-white/10 text-gray-500'}`}>SW</button>
          <button onClick={() => setLanguage('FR')} className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${language === 'FR' ? 'bg-[#E31E24] border-[#E31E24]' : 'bg-white/5 border-white/10 text-gray-500'}`}>FR</button>
        </div>
      </section>

      {/* 2. THE POWER OF THREE */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ValueCard 
            title="For Media"
            desc="Eliminate the cost of dispatches. Buy verified, high-res breaking news photos from photographers already on the ground."
            icon={<Newspaper />}
          />
          <ValueCard 
            title="For Photographers"
            desc="Stop losing your work to social media compression. Store your legacy in 30-year high-res vaults and earn from every download."
            icon={<Camera />}
          />
          <ValueCard 
            title="For Investors"
            desc="A scalable, transaction-based ecosystem with a 99% profit margin and zero physical inventory costs."
            icon={<TrendingUp />}
          />
        </div>
      </section>

      {/* 3. CORPORATE PROOF */}
      <section className="py-24 bg-white/5 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
           <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Global Validation</span>
              <div className="flex-1 h-[1px] bg-white/5" />
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="font-embroidery text-6xl italic mb-10">TRUSTED BY THE <br/><span className="text-[#E31E24]">FREE PRESS</span></h3>
                <div className="flex flex-wrap gap-12 opacity-40 grayscale group hover:opacity-100 transition-all duration-700">
                   {partners.map(p => (
                     <div key={p} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="font-bungee text-2xl group-hover:text-white">{p.toUpperCase()}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                 {stats.map((s, i) => (
                   <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-center group hover:border-[#E31E24] transition-all">
                      <div className="font-bungee text-4xl text-[#E31E24] mb-2 group-hover:scale-110 transition-transform">{s.value}</div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-tight">{s.label}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 4. VISION & FEATURES (THE 15 PRO FEATURES) */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Founder Reel & Manifesto */}
            <div className="space-y-20">
               <div className="relative aspect-video rounded-[3rem] bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center group overflow-hidden cursor-pointer shadow-2xl">
                  <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black z-10 group-hover:scale-110 transition-transform">
                     <Play size={40} className="ml-2" />
                  </div>
                  <span className="mt-8 font-black uppercase tracking-[0.4em] text-xs z-10">FOUNDER'S VISION REEL</span>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] font-bold">60 SECONDS OF FUTURE HISTORY</div>
               </div>

               <div className="space-y-8">
                  <h3 className="font-embroidery text-6xl italic leading-none">THE <span className="text-[#E31E24]">MANIFESTO</span></h3>
                  <p className="text-2xl text-gray-300 font-serif italic leading-relaxed">
                    "For too long, the African story has been sold through foreign lenses. Pichazangu exists to reclaim that narrative, decentralize the archive, and ensure every click supports the soil it captured."
                  </p>
                  <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                     <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10" />
                     <div>
                        <span className="block font-black text-white uppercase tracking-widest">ALEXANDER COMMANDER</span>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em]">CHIEF ARCHIVIST & FOUNDER</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <FeatureIconBox icon={<Shield/>} title="Data Guarantee" text="Block-screenshot & Face-Find encryption active." />
               <FeatureIconBox icon={<Heart/>} title="Impact Tracker" text="Academy grads hired by global newsrooms." />
               <FeatureIconBox icon={<Download/>} title="Media Kit" text="Press assets & brand guidelines." />
               <FeatureIconBox icon={<Languages/>} title="Multilingual" text="Regional support in 4 major languages." />
               <FeatureIconBox icon={<FileText/>} title="Annual Report" text="Transparency data for 2024 stakeholders." />
               <FeatureIconBox icon={<Users/>} title="Partner Portal" text="Dedicated portal for Nikon & Canon." />
               <FeatureIconBox icon={<ShieldCheck/>} title="Social Impact" text="5% profit goes to the Picha Foundation." />
               <FeatureIconBox icon={<Globe/>} title="Global Sync" text="API endpoints for real-time news wires." />
            </div>
         </div>

         {/* Roadmap Visualization */}
         <div className="mt-32 p-16 bg-white/5 rounded-[4rem] border border-white/5">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em] mb-16 text-center">Development Roadmap</h4>
            <div className="flex flex-col md:flex-row justify-between gap-12 relative">
               <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-white/10 hidden md:block" />
               {roadmap.map((item, i) => (
                 <div key={i} className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-black border-4 border-[#E31E24] rounded-2xl flex items-center justify-center font-bungee text-[#E31E24] mb-6 shadow-xl shadow-red-900/20">{i+1}</div>
                    <span className="text-xl font-black text-white mb-2">{item.year}</span>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">{item.event}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. CONTACT & HQ */}
      <section className="py-32 bg-[#E31E24]/5 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
              <div className="lg:col-span-1">
                 <h2 className="font-embroidery text-6xl italic leading-none mb-8 uppercase">Direct <br/><span className="text-[#E31E24]">Command</span></h2>
                 <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">
                   Connect with our leadership team for investment inquiries or corporate partnerships.
                 </p>
                 <div className="space-y-6">
                    <ContactItem icon={<Mail/>} text="pichazanguapp@gmail.com" />
                    <ContactItem icon={<Phone/>} text="+254 715 458 044" />
                    <ContactItem icon={<MapPin/>} text="Nairobi HQ, Westlands District" />
                 </div>
              </div>

              <div className="lg:col-span-2 relative">
                 <div className="aspect-video bg-black rounded-[4rem] border-8 border-black shadow-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000 group">
                    <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity" alt="Nairobi Map" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#E31E24] rounded-full">
                       <div className="w-full h-full bg-[#E31E24] rounded-full animate-ping" />
                    </div>
                    <div className="absolute bottom-10 left-10 p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10">
                       <span className="block text-[10px] font-black text-[#E31E24] uppercase mb-1">HQ STATUS</span>
                       <span className="text-2xl font-bold uppercase tracking-tighter">Nairobi, Kenya</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. BRAND COLORS & FOOTER */}
      <section className="py-24 px-8 border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
            <div>
               <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Corporate Palette</h5>
               <div className="flex gap-4">
                  <ColorBox hex="#E31E24" name="Zangu Red" />
                  <ColorBox hex="#000000" name="Deep Void" />
                  <ColorBox hex="#FF69B4" name="Client Pink" />
                  <ColorBox hex="#D4AF37" name="Vault Gold" />
               </div>
            </div>

            <div className="text-center md:text-right">
               <div className="flex gap-4 justify-center md:justify-end mb-8">
                  <button onClick={() => setActiveRole('photographer')} className={`px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest border-2 transition-all ${activeRole === 'photographer' ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-xl shadow-red-900/40' : 'border-white/10 text-gray-500'}`}>I AM A PHOTOGRAPHER</button>
                  <button onClick={() => setActiveRole('media')} className={`px-12 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-widest border-2 transition-all ${activeRole === 'media' ? 'bg-white border-white text-black' : 'border-white/10 text-gray-500'}`}>I AM A MEDIA HOUSE</button>
               </div>
               <button className="bg-[#E31E24] text-white font-black px-20 py-8 rounded-[3rem] text-2xl shadow-2xl hover:scale-105 transition-transform group uppercase font-embroidery">
                  JOIN THE REVOLUTION <ArrowRight className="inline ml-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
         </div>
      </section>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/254715458044" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 group border-4 border-black"
      >
        <MessageCircle size={32} className="text-white" />
        <div className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-xl font-black text-[10px] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
           Chat Support
        </div>
      </a>
    </div>
  );
};

// Sub-sub-components
const ValueCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-12 bg-white/5 rounded-[3.5rem] border border-white/5 hover:border-[#E31E24]/30 transition-all group">
    <div className="w-16 h-16 bg-[#E31E24]/10 text-[#E31E24] rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
       {React.cloneElement(icon as React.ReactElement, { size: 32 })}
    </div>
    <h3 className="font-embroidery text-4xl mb-6 italic">{title}</h3>
    <p className="text-gray-400 leading-relaxed font-medium">{desc}</p>
  </div>
);

const FeatureIconBox = ({ icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
     <div className="text-[#E31E24] shrink-0">{React.cloneElement(icon as React.ReactElement, { size: 24 })}</div>
     <div>
        <h5 className="font-black text-xs uppercase tracking-widest mb-1 text-white">{title}</h5>
        <p className="text-[10px] text-gray-500 uppercase font-bold leading-relaxed">{text}</p>
     </div>
  </div>
);

const ContactItem = ({ icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-6 group cursor-pointer">
     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#E31E24] group-hover:bg-[#E31E24] group-hover:text-white transition-all">
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
     </div>
     <span className="font-black text-sm text-gray-300 group-hover:text-white transition-colors">{text}</span>
  </div>
);

const ColorBox = ({ hex, name }: { hex: string, name: string }) => (
  <div className="flex flex-col items-center gap-2">
     <div className="w-12 h-12 rounded-xl border border-white/10 shadow-lg" style={{ backgroundColor: hex }} />
     <span className="text-[8px] font-black uppercase text-gray-500">{name}</span>
  </div>
);

export default About;
