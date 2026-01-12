import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, BookOpen, Briefcase, Camera, CheckCircle2, ChevronRight, 
  Download, FileText, Globe, GraduationCap, HardDrive, 
  PlayCircle, Sparkles, Star, Users, Video, Zap, ArrowLeft,
  Lock, Clock, Trophy, Target, Book, Layout, Info, Play,
  Search, Bookmark, Share2, History, Compass, BrainCircuit,
  Volume2, Fingerprint, Crosshair, Hand, Smile, Box, Timer, Leaf,
  Image as ImageIcon, HelpCircle, Activity, ShieldCheck,
  Settings, Layers, Cpu, Database, Eye, ZapOff, FlaskConical, Binary, Microscope
} from 'lucide-react';
import { MOCK_ACADEMY_COURSES } from '../constants';
import { AcademyCourse, Lesson } from '../types';

const Learn: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const tiers = [
    {
      id: 'tier-1',
      title: 'ZANGU CERTIFICATE',
      duration: '3 MONTHS',
      level: 'BASIC',
      price: 'Free',
      courseId: 'c-cert',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
      features: ['Exposure Triangle Fundamentals', 'Mobile Photography for Business', 'M-Pesa Storefront Setup', 'Basic Post-Processing'],
      accent: 'bg-white',
      text: 'text-black'
    },
    {
      id: 'tier-2',
      title: 'PROFESSIONAL DIPLOMA',
      duration: '6 MONTHS',
      level: 'INTERMEDIATE',
      price: 'KES 15,000',
      courseId: 'c-cert', 
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=800&q=80',
      features: ['Advanced Portrait Lighting', 'Sports & Action Mastery', 'RAW Data Archiving', 'Client Management Skills'],
      accent: 'bg-red-600',
      text: 'text-white',
      popular: true
    },
    {
      id: 'tier-3',
      title: 'PRO BATCH LICENSE',
      duration: '12 MONTHS',
      level: 'ELITE PRO',
      price: 'KES 45,000',
      courseId: 'c-cert', 
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      features: ['Global Editorial Standards', 'High-Speed FTP Workflows', 'Business of Fashion Photography', 'Lifetime Archive Insurance'],
      accent: 'bg-black',
      text: 'text-white',
      border: 'border-red-600'
    }
  ];

  const handleEnterCourse = (courseId: string) => {
    const course = MOCK_ACADEMY_COURSES.find(c => c.id === courseId);
    if (course) setSelectedCourse(course);
  };

  const getLessonContent = (id: string) => {
    switch (id) {
      case 'l1': return <ModuleOneContent />;
      case 'l2': return <ModuleTwoContent />;
      case 'l13': return <ModuleThreeContent />;
      case 'l16': return <ModuleFourContent />;
      case 'l30': return <ModuleFiveContent />;
      case 'l24': return <ModuleSixContent />;
      default: return (
        <div className="py-20 text-center opacity-50">
           <Lock size={48} className="mx-auto mb-4" />
           <p className="font-black uppercase text-xs tracking-widest">Archival node offline. Complete previous modules to sync.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 font-sans">
      <AnimatePresence mode="wait">
        {!selectedCourse ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-32">
            <section className="max-w-7xl mx-auto px-6 text-center mb-32">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600/10 border border-red-600/20 rounded-full">
                  <Zap size={14} className="text-red-600 animate-pulse" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Enrolling for Q3 2025</span>
                </div>
                <h1 className="font-embroidery text-7xl md:text-[10rem] italic leading-none mb-10 text-white">THE <span className="text-red-600">ACADEMY</span></h1>
                <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 font-medium leading-relaxed uppercase">Built by regional masters to turn amateur clicks into a dominant professional media career.</p>
              </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
              {tiers.map((tier, i) => (
                <motion.div key={tier.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`relative group h-full flex flex-col ${tier.accent} ${tier.text} rounded-[3.5rem] overflow-hidden shadow-2xl ${tier.border ? `border-4 ${tier.border}` : 'border border-white/5'}`}>
                  <div className="h-64 relative overflow-hidden">
                    <img src={tier.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <div className="mb-10">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2 block`}>{tier.level} • {tier.duration}</span>
                      <h3 className="font-embroidery text-4xl italic leading-none">{tier.title}</h3>
                    </div>
                    <div className="space-y-6 mb-12 flex-1">
                      {tier.features.map(f => (
                        <div key={f} className="flex items-start gap-4">
                          <CheckCircle2 size={18} className={tier.text.includes('black') ? 'text-red-600' : 'text-red-500'} />
                          <span className="text-xs font-bold uppercase tracking-tight opacity-80 leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-10 border-t border-current/10">
                      <button onClick={() => handleEnterCourse(tier.courseId)} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 ${tier.accent.includes('red') ? 'bg-white text-red-600 hover:bg-black hover:text-white' : 'bg-red-600 text-white hover:bg-black'}`}>Secure My Seat <ChevronRight size={16} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </section>
          </motion.div>
        ) : (
          <motion.div key="terminal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex h-screen overflow-hidden pt-20">
            <aside className="w-96 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
               <div className="p-8 border-b border-white/5">
                  <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase hover:text-red-600 transition-colors mb-6"><ArrowLeft size={14} /> Exit Academy</button>
                  <h2 className="font-embroidery text-4xl italic text-white leading-none">{selectedCourse.title}</h2>
                  <div className="mt-6 space-y-2">
                     <div className="flex justify-between text-[8px] font-black uppercase text-gray-500"><span>Course Progress</span><span>{selectedCourse.progress}%</span></div>
                     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${selectedCourse.progress}%` }} className="h-full bg-red-600 shadow-[0_0_10px_rgba(227,30,36,0.5)]" />
                     </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10">
                  {selectedCourse.modules.map((mod) => (
                    <div key={mod.id} className="space-y-4">
                       <h4 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] px-2">{mod.title}</h4>
                       <div className="space-y-1">
                          {mod.lessons.map(lesson => (
                            <button key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group ${activeLesson?.id === lesson.id ? 'bg-white text-black' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
                               <div className="flex items-center gap-4">
                                  <div className={`w-2 h-2 rounded-full ${lesson.isCompleted ? 'bg-green-500' : 'bg-gray-800'}`} />
                                  <span className="text-[11px] font-black uppercase tracking-tight line-clamp-1">{lesson.title}</span>
                               </div>
                               {lesson.type === 'video' ? <Play size={12} /> : lesson.type === 'quiz' ? <Trophy size={12} /> : <Book size={12} />}
                            </button>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </aside>

            <main className="flex-1 bg-black overflow-y-auto custom-scrollbar relative">
               <AnimatePresence mode="wait">
                  {activeLesson ? (
                    <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto p-20 space-y-12">
                       <div className="flex items-center justify-between border-b border-white/5 pb-10">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/40"><Camera size={28} /></div>
                            <div>
                               <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block">MODULE {activeLesson.id.replace('l','')}</span>
                               <h1 className="font-embroidery text-6xl text-white italic leading-none">{activeLesson.title}</h1>
                            </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-red-600 transition-colors"><Bookmark size={20}/></button>
                             <button className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-red-600 transition-colors"><Share2 size={20}/></button>
                          </div>
                       </div>
                       <div className="text-gray-300 font-medium">{getLessonContent(activeLesson.id)}</div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-20 opacity-30">
                       <Compass size={80} className="mb-8 text-red-600 animate-spin-slow" />
                       <h2 className="font-embroidery text-5xl italic text-white leading-tight">SELECT A NODE TO <br/>BEGIN YOUR TRANSFORMATION</h2>
                    </div>
                  )}
               </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MODULE CONTENT ---

const ModuleOneContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Philosophy of the Lens</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Photography is more than just pressing a button; it is the art of "writing with light." Derived from the Greek words <i>phos</i> (light) and <i>graphē</i> (drawing), photography is a universal language. In the context of East Africa, photography serves as a tool for preservation and progress. Whether it’s capturing the vibrant energy of a Nairobi street market or the serene beauty of the Serengeti, a photographer is a historian of the present.
      </p>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        For an amateur who has never touched a camera, the first lesson is internalizing the "Why." Why do we take pictures? We take them to remember, to sell, to advocate, and to express. In the Pichazangu ecosystem, your journey starts by shifting your mindset from "taking a snap" to "composing a masterpiece."
      </p>
    </div>

    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <History size={24} className="text-red-600" />
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">The Historical Node</span>
          </div>
          <h3 className="font-embroidery text-4xl italic text-white mb-6">When Did It Start?</h3>
          <p className="text-lg leading-relaxed text-gray-400 mb-6">
             The journey of photography didn’t begin with digital sensors or even film; it began with the observation of light. Centuries ago, philosophers noticed that light passing through a tiny hole into a dark room would project an inverted image of the outside world onto the wall. This was the <b>Camera Obscura</b>.
          </p>
          <p className="text-lg leading-relaxed text-gray-400">
             However, it wasn't until the early 19th century that scientists found a way to "freeze" that projected image. In 1826, Joseph Nicéphore Niépce created the first permanent photograph using a polished pewter plate and a chemical called bitumen. The exposure took eight hours! Imagine having to stand still for a whole day just for one blurry photo. By 1839, Louis Daguerre introduced the Daguerreotype, which shortened exposure times and made photography more accessible to the elite.
          </p>
       </div>
    </div>

    <div className="p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl shadow-red-900/40 relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">Pro Tip (RED)</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Never look at your subject as just an object. Look at the light hitting them. If the light is bad, the most expensive camera in the world won’t save the photo."</p>
       </div>
       <Trophy size={180} className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform" />
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">Practical Experimental Tip: The Human Camera Obscura</h3>
       <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-6">
          <p className="text-gray-400 text-sm leading-relaxed uppercase font-medium">
             Find a room in your house that has a single window. Completely cover the window with black sugar paper or heavy bin bags so the room is pitch black. Poke one tiny, clean hole (the size of a pencil lead) in the center of the covering. Wait for your eyes to adjust. On the opposite wall, you will see the outside world—cars, trees, and people—projected upside down and in color. This is the fundamental soul of your camera.
          </p>
       </div>
    </div>
  </div>
);

const ModuleTwoContent = () => (
  <div className="space-y-24 pb-40">
    {/* HERO SECTION: THE ALCHEMY OF GEAR */}
    <div className="space-y-10">
      <div className="relative h-[600px] rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Vintage Camera Hardware" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="flex items-center gap-4 mb-6">
            <FlaskConical size={32} className="text-red-600" />
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">Hardware Node 02.1</span>
          </div>
          <h2 className="font-embroidery text-7xl md:text-9xl text-white italic leading-none">THE ALCHEMY OF <br/> <span className="font-embroidery-sketch">THE MACHINE</span></h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-10">
        <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
          To master the digital marketplace of Pichazangu, you must first understand that your modern camera is a computational miracle born from a century of chemical alchemy. Before the first digital sensor was ever conceived in a lab, photography was a matter of physical sacrifice. Photographers carried heavy glass plates, toxic silver-nitrate baths, and waited hours for a single exposure.
        </p>
        <p className="text-xl text-gray-400 leading-relaxed uppercase">
          In East Africa, the first "Media Nodes" were mobile darkrooms—tents set up in the savannah or the city square. Understanding how light transitions from a physical photon to a digital bit is the difference between a "snap-taker" and a "Visual Architect." In this module, we bridge the gap between the chemical past and the silicon future.
        </p>
      </div>
    </div>

    {/* SECTION 1: THE SILICON REVOLUTION */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.4)]">
              <Microscope size={36} />
           </div>
           <h3 className="font-embroidery text-5xl italic text-white uppercase">The Digital Retina</h3>
        </div>
        <div className="space-y-8">
           <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase">
              The heart of your modern camera is the <b>Image Sensor</b>. Imagine a vast, microscopic grid of millions of tiny "buckets." When you press the shutter, you open the "gate" and let photons (particles of light) rain down into these buckets.
           </p>
           <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] relative overflow-hidden group">
              <Binary size={24} className="text-red-600 mb-6" />
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">The Photon-to-Bit Pipeline</h4>
              <p className="text-xs text-gray-500 uppercase font-bold leading-relaxed">
                1. Photons hit the Photodiode (Bucket).<br/>
                2. Light is converted into an electrical charge.<br/>
                3. The Processor maps the intensity to a numeric value (0-255).<br/>
                4. A RAW file is generated, capturing the pure mathematical soul of the light.
              </p>
           </div>
           <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase">
              In the regional market, where the noon sun is harsh and the shadows are deep, understanding the "Quantum Efficiency" of your sensor allows you to preserve details that others lose. You aren't just taking a picture; you are collecting data points.
           </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
           <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Sensor Close-up" />
           <div className="absolute inset-0 bg-black/40" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-2 border-red-600 rounded-full animate-ping opacity-20" />
           </div>
        </div>
        <p className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] text-center">[Visual Node 2.2: Computational mapping of a Full-Frame CMOS Sensor]</p>
      </div>
    </div>

    {/* SECTION 2: DSLR VS MIRRORLESS - THE MECHANICAL DEBATE */}
    <div className="space-y-16">
       <div className="text-center space-y-6">
          <h3 className="font-embroidery text-6xl italic text-white uppercase">THE EVOLUTION OF <span className="text-red-600 font-embroidery-sketch">THE VIEW</span></h3>
          <p className="text-gray-500 font-black text-xs uppercase tracking-[0.6em]">Two Philosophies of Sight</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* DSLR PANEL */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-12 space-y-10 group hover:border-red-600/30 transition-all">
             <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-red-600 border border-white/10">
                   <Activity size={28} />
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Heritage Mechanism</span>
             </div>
             <div>
                <h4 className="font-embroidery text-4xl text-white italic mb-6">DSLR: THE ANALOG ECHO</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium uppercase">
                   The Digital Single Lens Reflex is a beast of physics. It uses a <b>physical mirror</b> sitting at a 45-degree angle. When you look through the glass, you are seeing real, bouncing photons. 
                </p>
             </div>
             <div className="space-y-4">
                <div className="flex items-start gap-4">
                   <Zap size={16} className="text-red-600 shrink-0 mt-1" />
                   <p className="text-xs text-gray-400 font-bold uppercase">Battery Dominance: Mechanical viewfinders consume zero power.</p>
                </div>
                <div className="flex items-start gap-4">
                   <Zap size={16} className="text-red-600 shrink-0 mt-1" />
                   <p className="text-xs text-gray-400 font-bold uppercase">Tactile Feedback: The "Mirror Slap" provides physical confirmation of the capture.</p>
                </div>
             </div>
             <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] text-gray-600 font-black uppercase italic">Best for: Rugged field work, long wildlife dispatches, journalism.</p>
             </div>
          </div>

          {/* MIRRORLESS PANEL */}
          <div className="bg-red-600 rounded-[4rem] p-12 space-y-10 group shadow-2xl shadow-red-900/40 relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center text-white border border-white/20">
                     <Cpu size={28} />
                  </div>
                  <span className="text-[10px] font-black text-red-100 uppercase tracking-widest">Computational Logic</span>
               </div>
               <div>
                  <h4 className="font-embroidery text-4xl text-white italic mb-6">MIRRORLESS: THE SENSOR-DIRECT</h4>
                  <p className="text-red-100 text-sm leading-relaxed font-medium uppercase">
                     Mirrorless systems remove the glass barrier. Light hits the sensor directly and is projected onto a 120Hz micro-display inside the viewfinder. What you see is exactly what the file will look like.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <CheckCircle2 size={16} className="text-white shrink-0 mt-1" />
                     <p className="text-xs text-white font-bold uppercase">Exposure Preview: See the final brightness before you press the button.</p>
                  </div>
                  <div className="flex items-start gap-4">
                     <CheckCircle2 size={16} className="text-white shrink-0 mt-1" />
                     <p className="text-xs text-white font-bold uppercase">Silent Shutter: Perfect for intimate weddings and quiet studio sessions.</p>
                  </div>
               </div>
             </div>
             <Cpu size={300} className="absolute -right-20 -bottom-20 opacity-10 -rotate-12 pointer-events-none" />
          </div>
       </div>
    </div>

    {/* SECTION 3: THE GLASS (OPTICS) */}
    <div className="bg-white text-black p-16 rounded-[4.5rem] relative overflow-hidden">
       <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="max-w-2xl space-y-8">
             <div className="flex items-center gap-4">
                <Eye size={32} className="text-red-600" />
                <span className="text-red-600 font-black text-[11px] uppercase tracking-[0.5em]">The Lens Authority</span>
             </div>
             <h2 className="font-embroidery text-6xl md:text-8xl italic leading-tight">INVEST IN <br/><span className="font-embroidery-sketch">THE GLASS</span>, NOT THE BODY.</h2>
             <p className="text-xl font-medium text-gray-500 leading-relaxed uppercase">
                The most expensive sensor in the world is useless if the light is being bent by cheap plastic optics. For the Pichazangu marketplace, <b>Sharpness</b> is your primary currency. 
             </p>
             <p className="text-lg font-medium text-gray-400 leading-relaxed uppercase">
                In East Africa, we deal with intense humidity in Mombasa and fine dust in Turkana. Your "Mount" must be robust. We recommend the "Prime Hierarchy": Start with a 50mm, master the light, and only then move to specialized zooms. Lenses retain 90% of their value over a decade; camera bodies lose 50% in two years.
             </p>
             <button className="bg-black text-white font-black px-12 py-5 rounded-[2rem] text-[10px] uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-all flex items-center gap-3">
                <Layout size={18} /> View Regional Lens Guide
             </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 group">
                <img src="https://images.unsplash.com/photo-1616423641454-da90637cc8e7?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Lens Elements" />
             </div>
             <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 group mt-12">
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Vintage Lens" />
             </div>
          </div>
       </div>
       <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none text-[35rem] font-embroidery whitespace-nowrap rotate-12">
          OPTIC
       </div>
    </div>

    {/* SECTION 4: THE REGIONAL STRATEGY */}
    <div className="space-y-12">
       <div className="flex items-center gap-4">
          <Globe className="text-red-600" size={32} />
          <h3 className="font-embroidery text-5xl italic text-white uppercase">THE MARKET <span className="text-red-600">STRATEGY</span></h3>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StrategyCard 
             num="01" 
             title="Buy Used" 
             desc="In Nairobi and Kampala, vibrant used gear markets (like the 'Nikon Tribe' groups) allow you to access pro bodies for 30% of the retail price. Use the savings for storage." 
          />
          <StrategyCard 
             num="02" 
             title="Redundancy" 
             desc="One camera is zero cameras. A Pichazangu Pro always has a backup body, even if it is an older model. Mechanical failure is a career-ender." 
          />
          <StrategyCard 
             num="03" 
             title="Neural Backup" 
             desc="Don't just trust your SD cards. Implement a workflow where files are synced to a secure local node as soon as the session ends." 
          />
       </div>
    </div>

    {/* PRACTICAL NODE: THE GEAR AUDIT */}
    <div className="space-y-12">
       <div className="bg-red-600/5 border border-red-600/20 p-16 rounded-[4rem] relative overflow-hidden group">
          <div className="relative z-10 max-w-4xl">
             <div className="flex items-center gap-4 mb-10">
                <Target size={32} className="text-red-600 animate-pulse" />
                <h2 className="font-embroidery text-5xl text-white italic">MODULE 2: <span className="text-red-600">THE GEAR AUDIT</span></h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-gray-400 text-lg uppercase font-medium leading-relaxed">
                      Your final challenge for Module 2 is the <b>Tactile Identification Test</b>. Completion of this node is mandatory to unlock the Exposure Triangle in Module 3.
                   </p>
                   <div className="space-y-4">
                      <Step num="01" text="Remove your lens. Identify the sensor type (Full Frame, APS-C, or Micro 4/3)." />
                      <Step num="02" text="Locate your SD/CFexpress card slot. Check the 'Write Speed' rating on your card." />
                      <Step num="03" text="Find the 'Diopter' wheel next to your viewfinder. Adjust it until the numeric grid is sharp for YOUR eyes." />
                      <Step num="04" text="Identify every custom (Fn) button on your body. Map one to 'Eye-Tracking' and another to 'ISO'." />
                   </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center">
                   <ZapOff size={64} className="text-red-600 mx-auto mb-8" />
                   <h4 className="text-2xl font-black text-white mb-4 uppercase">SHUT DOWN THE SCREEN</h4>
                   <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-widest">
                      "If you cannot change your lens and check your battery levels in total darkness, you are not ready for the street. Mastery of the hardware is mastery of the moment."
                   </p>
                </div>
             </div>
          </div>
          <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 translate-x-12 translate-y-12 group-hover:rotate-0 transition-transform">
             <HardDrive size={300} />
          </div>
       </div>
    </div>
  </div>
);

const ModuleThreeContent = () => (
  <div className="space-y-20 pb-32">
    {/* SECTION 1: THE TACTILE GHOST */}
    <div className="space-y-10">
      <div className="relative h-[500px] rounded-[4rem] overflow-hidden group shadow-2xl border border-white/5">
        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Vintage Camera Mechanism" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center gap-3 mb-4">
            <History size={24} className="text-red-600" />
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Heritage Node 03.1</span>
          </div>
          <h2 className="font-embroidery text-6xl text-white italic leading-none">THE TACTILE GHOSTS OF THE <br/> <span className="font-embroidery-sketch">MECHANICAL AGE</span></h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <p className="text-xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
          To truly master the Pichazangu marketplace, you must understand that your mirrorless camera is not just a computer—it is a collection of mechanical ghosts. Every dial, slider, and menu item in a modern Nikon, Sony, or Canon body is a digital simulation of a physical process that photographers used for over a century. In the "Old World," there was no "Auto" mode; there were only the physical properties of light, metal, and glass.
        </p>
        <p className="text-lg text-gray-400 leading-relaxed uppercase">
          In East Africa, the legendary photojournalists who captured the independence movements and the growth of our cities didn't have histograms or eye-tracking autofocus. They had a "feel" for the machine. They could change their shutter speed by the sound of the spring tension and adjust their focus by the weight of the glass. By understanding the mechanical origin of these controls, you move from being a user of technology to being a master of the physics of sight.
        </p>
      </div>
    </div>

    {/* SECTION 2: APERTURE - THE DIAL OF DEPTH */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]">
              <Eye size={32} />
           </div>
           <h3 className="font-embroidery text-4xl italic text-white uppercase">Aperture: The Iris of Steel</h3>
        </div>
        <div className="prose prose-invert space-y-6">
           <p className="text-gray-400 leading-relaxed font-medium uppercase">
              Imagine the iris of your eye. When you walk into a bright Nairobi afternoon sun, your iris shrinks to protect your vision. When you step into a dimly lit jazz bar in Kampala, it dilates to catch every available photon. In photography, the <b>Aperture</b> is this physical opening.
           </p>
           <p className="text-gray-400 leading-relaxed font-medium uppercase">
              Old lenses had a physical "Aperture Ring." You would twist it, and inside the lens, a series of curved metal blades would physically slide across each other. This opening (measured in f-stops) does two things: it controls the <b>Volume of Light</b> and the <b>Depth of Field</b>. A wide opening (like f/1.8) lets in massive amounts of light but makes the background "blur" into beautiful bokeh. A tiny opening (like f/16) lets in very little light but keeps everything from your toes to the horizon sharp.
           </p>
        </div>
        <div className="bg-red-600/5 border border-red-600/20 p-8 rounded-[3rem] relative overflow-hidden group">
           <Zap size={24} className="text-red-600 mb-4" />
           <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Red Protocol Advice</h4>
           <p className="text-xs text-gray-500 uppercase font-bold leading-relaxed">
             "Amateurs use f/11 for everything. Pros use f/1.8 to isolate the soul of the subject. Learn to shoot 'Wide Open' to give your Pichazangu assets that high-end editorial look."
           </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
           <img src="https://images.unsplash.com/photo-1616423641454-da90637cc8e7?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Lens Aperture Blades" />
           <div className="absolute inset-0 bg-black/20" />
        </div>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] text-center">[Visual Node 3.2: Close-up of physical aperture blades at f/2.8]</p>
      </div>
    </div>

    {/* SECTION 3: SHUTTER SPEED - THE FREEZING OF TIME */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 space-y-6">
        <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
           <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Shutter Mechanism" />
           <div className="absolute inset-0 bg-black/20" />
        </div>
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] text-center">[Visual Node 3.3: High-speed shutter curtain frozen at 1/8000s]</p>
      </div>
      <div className="order-1 lg:order-2 space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]">
              <Timer size={32} />
           </div>
           <h3 className="font-embroidery text-4xl italic text-white uppercase">Shutter: The Clockwork Gate</h3>
        </div>
        <div className="prose prose-invert space-y-6">
           <p className="text-gray-400 leading-relaxed font-medium uppercase">
              In the film days, the <b>Shutter</b> was a physical curtain made of cloth or titanium. When you pressed the button, a spring would pull this curtain across the film. The faster it moved, the less light hit the film, but the more "frozen" the action became. 
           </p>
           <p className="text-gray-400 leading-relaxed font-medium uppercase">
              Today, we have electronic shutters that operate at speeds up to 1/32,000 of a second. This allows you to freeze a footballer's mid-air header at Kasarani Stadium or the splash of a Serengeti river crossing. On the other hand, a slow shutter (like 30 seconds) allows you to "paint with light," turning the headlamps of Nairobi traffic into glowing rivers of gold. Mastery of the shutter means mastery over the dimension of <b>Time</b>.
           </p>
        </div>
        <div className="p-8 bg-black border-2 border-red-600 rounded-[3rem] relative overflow-hidden group">
           <Volume2 size={24} className="text-red-600 mb-4" />
           <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Sonic Mastery Node</h4>
           <p className="text-xs text-gray-500 uppercase font-bold leading-relaxed">
             "Listen to your camera. A mechanical DSLR has a distinct 'clack'—that's the mirror and shutter dance. A mirrorless is silent. Learn to trust your eyes when the machine stops making noise."
           </p>
        </div>
      </div>
    </div>

    {/* SECTION 4: ISO - THE CHEMISTRY OF THE SENSOR */}
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-16 space-y-12 relative overflow-hidden">
       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                   <Zap size={32} />
                </div>
                <h3 className="font-embroidery text-4xl italic text-white uppercase">ISO: From Grain to Gain</h3>
             </div>
             <p className="text-lg text-gray-400 font-medium leading-relaxed uppercase">
                Back in the day, if you wanted to shoot at night, you had to physically buy a different roll of film. <b>ISO 100</b> was for bright days (very fine grain); <b>ISO 1600</b> was for dark alleys (very chunky, artistic grain). Today, ISO is simply an "Amplifier" for your digital sensor.
             </p>
             <p className="text-lg text-gray-400 font-medium leading-relaxed uppercase">
                However, there is no free lunch in physics. As you crank up your ISO to see in the dark, you introduce "Digital Noise"—the electronic static that degrades your image quality. A Pichazangu Pro understands the **Base ISO** of their camera to ensure the cleanest possible RAW files for the marketplace.
             </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
             <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5 group relative">
                <img src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-opacity" alt="Film Grain" />
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">Heritage Grain</div>
             </div>
             <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden border border-white/5 group relative">
                <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Digital Noise" />
                <div className="absolute bottom-4 left-4 bg-red-600 px-3 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">Modern Silicon</div>
             </div>
          </div>
       </div>
       <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none select-none text-[30rem] font-embroidery whitespace-nowrap rotate-12">
          RAW
       </div>
    </div>

    {/* SECTION 5: THE COMPARISON TABLE */}
    <div className="space-y-12">
       <div className="text-center space-y-4">
          <h3 className="font-embroidery text-5xl italic text-white uppercase">THE EVOLUTION OF <span className="text-red-600">COMMAND</span></h3>
          <p className="text-gray-500 font-black text-xs uppercase tracking-[0.4em]">Bridging the gap between two eras</p>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full border-collapse">
             <thead>
                <tr className="border-b-2 border-white/10 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                   <th className="p-6 text-left">Control Node</th>
                   <th className="p-6 text-left">The Mechanical Age (Legacy)</th>
                   <th className="p-6 text-left">The Computational Age (Today)</th>
                </tr>
             </thead>
             <tbody className="text-xs font-bold uppercase tracking-tight text-gray-400">
                <TableRow icon={<Layers size={14}/>} label="Focusing" legacy="Manual Twist of Glass" modern="Neural-AI Eye Tracking" />
                <TableRow icon={<Activity size={14}/>} label="Stabilization" legacy="Heavy Cast-Iron Tripods" modern="In-Body 5-Axis Floating Sensor" />
                <TableRow icon={<Database size={14}/>} label="Verification" legacy="Developed Negatives" modern="Blockchain Metadata & AI Scan" />
                <TableRow icon={<Zap size={14}/>} label="Exposure" legacy="Handheld Light Meters" modern="Real-time Live Histogram" />
                <TableRow icon={<Share2 size={14}/>} label="Distribution" legacy="Physical Prints & Couriers" modern="Instant Private Vault Uplink" />
             </tbody>
          </table>
       </div>
    </div>

    {/* SECTION 6: PRACTICAL PROTOCOL */}
    <div className="space-y-10">
       <div className="flex items-center gap-4">
          <Target className="text-red-600" size={32} />
          <h3 className="font-embroidery text-4xl italic text-white uppercase">Module 3 Final protocol</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Step num="01" text="Pick up your camera. Close your eyes. Find every manual control by touch alone. Your fingers must learn the geometry of the dials." />
          <Step num="02" text="Set your camera to 'Manual' (M). Change your Aperture to f/2.8, then f/16. Listen for the subtle sound of the lens communicating." />
          <Step num="03" text="Take a photo at 1/10s and 1/1000s. Notice the different 'energy' in the shutter cycle." />
          <Step num="04" text="Upload your results to your trainee vault for AI review. Completion of this node unlocks Module 4." />
       </div>
    </div>
  </div>
);

const ModuleFourContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Professional Grip</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        The most common mistake amateurs make is holding the camera like a smartphone. To shoot for Pichazangu, you need stability. In a busy Nairobi street or at the edge of a football pitch, camera shake is your worst enemy. Stability isn't just about hands; it's about your entire skeletal structure.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <GripCard 
          icon={<Hand/>} 
          label="The Left Hand: The Cradle" 
          desc="This is your support system. It should sit underneath the lens, supporting the weight and allowing your fingers to zoom or focus. Never grip from the side; always from below."
       />
       <GripCard 
          icon={<Crosshair/>} 
          label="The Right Hand: The Trigger" 
          desc="Your palm should wrap firmly around the grip, with your index finger resting lightly on the shutter. Your thumb should be ready for the back-dial or AF-ON buttons."
       />
       <GripCard 
          icon={<Zap/>} 
          label="The Anchor: Human Tripod" 
          desc="Tuck your elbows into your ribs and stand with your feet shoulder-width apart. Bracing your elbows against your torso creates a solid frame for long exposures."
       />
    </div>

    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8">
       <h3 className="font-embroidery text-4xl italic text-white">Navigating the Menu System</h3>
       <p className="text-gray-400 text-sm leading-relaxed uppercase">
          Every camera brand (Canon, Nikon, Sony, Fujifilm) has a different "language," but they all share a core menu structure. In a high-stakes environment like a regional wedding or a political rally, you must find these three things instantly:
       </p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MenuNode icon={<HardDrive/>} label="Format Card" desc="DANGER: Deletes all node data. Use only before a session begins." />
          <MenuNode icon={<ImageIcon/>} label="Image Quality" desc="SET TO RAW. This is the uncompressed soul of your image." />
          <MenuNode icon={<Target/>} label="Focus Mode" desc="Switch between 'Single' for portraits and 'Continuous' for action." />
          <MenuNode icon={<Settings/>} label="Custom Buttons" desc="Map your ISO to a wheel you can reach without looking." />
       </div>
    </div>

    <div className="p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">Pro Tip (RED)</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Treat your shutter button like a heartbeat. A gentle squeeze produces a sharp image; a violent poke produces a blurry one."</p>
       </div>
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">Practical Experimental Tip: The Blind Focus Challenge</h3>
       <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-6">
          <p className="text-gray-400 text-sm leading-relaxed uppercase font-medium">
             In a dimly lit room, try to change your ISO and Aperture settings without looking at the buttons. Use the dials and feel the "clicks." In professional photography, things happen fast. If you have to look down at your buttons during a "Grip and Grin" moment at a high-end corporate event, you will miss the shot and lose the client. This builds muscle memory—the difference between an amateur and a Pichazangu Pro.
          </p>
       </div>
    </div>

    <div className="pt-10 border-t border-white/5">
       <h3 className="text-2xl font-black uppercase text-white mb-8">II. The Shooting Workflow</h3>
       <p className="text-lg leading-relaxed text-gray-400 uppercase mb-10">
         Before you press that shutter at a live assignment, follow the Pichazangu Checklist. This protocol ensures zero technical failure in the field.
       </p>
       <div className="space-y-4">
          <Step num="01" text="Check your battery and card: Nothing is worse than arriving at a wedding with a dead battery." />
          <Step num="02" text="Set your White Balance: Match the camera to the regional light (Sun, Shade, or Fluorescent)." />
          <Step num="03" text="Check your Exposure: Look at the meter in your viewfinder. Is it at '0'?" />
          <Step num="04" text="Focus, Recompose, Shoot: Focus on the eyes, move slightly for a better crop, then squeeze." />
       </div>
    </div>
  </div>
);

const ModuleFiveContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. Finding Your Field of Play</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Photography is not a single job; it is a galaxy of specializations. In the East African market, being a "generalist" (someone who shoots everything) is common when starting, but the highest-paid photographers on Pichazangu are specialists. When you specialize, you become the "go-to" person for that specific niche. Clients don't want a wedding photographer to take photos of their new real estate development; they want an architectural specialist.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <NicheCard icon={<Smile/>} label="Portrait & Studio" desc="The art of people. This involves controlled lighting and high levels of human interaction." />
       <NicheCard icon={<Box/>} label="Commercial & Product" desc="Shooting for brands. It requires extreme attention to detail and technical perfection." />
       <NicheCard icon={<Trophy/>} label="Event & Wedding" labelColor="text-red-600" desc="High-stakes storytelling. You must be fast, social, and work in unpredictable lighting." />
       <NicheCard icon={<Timer/>} label="Motion & Sports" desc="For those who love the action. Fast cameras and the ability to anticipate moments." />
       <NicheCard icon={<Leaf/>} label="Wildlife & Landscape" desc="The 'patience' niche. Travel, long hours in the field, and deep respect for nature." />
       <NicheCard icon={<Briefcase/>} label="Architectural" desc="Precision and perspective. Shooting the changing skylines of our regional cities." />
    </div>

    <div className="p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">Master Wisdom</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Don't choose a niche based on gear. Choose it based on what you enjoy doing on a Tuesday at 2:00 PM when nobody is watching."</p>
       </div>
       <Globe size={180} className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform" />
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">II. Student Protocol: The Niche Rotation</h3>
       <div className="space-y-4">
          <Step num="01" text="Over the next 7 days, spend 1 hour shooting three different subjects." />
          <Step num="02" text="Subject A: A person (Portrait). Subject B: A small object like a shoe (Product). Subject C: A moving car (Motion)." />
          <Step num="03" text="Note which one made you feel frustrated and which one made you lose track of time." />
          <Step num="04" text="The one where you lost track of time is your calling." />
       </div>
    </div>
  </div>
);

const ModuleSixContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Art of the Human Soul</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Portraiture is the foundation of the Pichazangu Private Vault system. It is the most consistent way to earn a living in the region. Whether it is corporate headshots in Westlands or family heritage shoots in Entebbe, your job is to make the subject feel like the best version of themselves.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 space-y-6">
          <h3 className="font-embroidery text-3xl italic text-white uppercase">The Director's Role</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
             In the studio, you are the Director. You aren't just taking a picture; you are managing the subject’s emotions. The most important skill in portraiture isn't knowing your camera settings—it’s knowing how to talk to people so they relax their shoulders and show their true character.
          </p>
       </div>
       <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 flex flex-col justify-center gap-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-widest border-l-2 border-red-600 pl-3">Studio Essentials</h4>
          <ul className="space-y-3">
             <li className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Key Light: The main source defining the face shape.</li>
             <li className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Fill Light: Softens shadows to avoid scary contrast.</li>
             <li className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Backdrop: Isolating the narrative from distractions.</li>
             <li className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2"><div className="w-1 h-1 bg-red-600 rounded-full"/> Posing: Directing chins, hands, and eyes.</li>
          </ul>
       </div>
    </div>

    <div className="p-12 bg-black border-2 border-red-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="text-red-600 fill-red-600" /><span className="text-[10px] font-black uppercase tracking-widest">Master Advice</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"The eyes are the 'hook'. Always ensure the catchlight (the tiny white reflection in the eye) is sharp. If the eyes are dead, the portrait is dead."</p>
       </div>
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">II. Student Protocol: The One-Light Challenge</h3>
       <div className="space-y-4">
          <Step num="01" text="Take a friend into a dark room with a single torch or lamp." />
          <Step num="02" text="Move the light around their face—above, beside, and below them." />
          <Step num="03" text="Observe how shadows change their personality (e.g. Butterfly vs Side lighting)." />
          <Step num="04" text="Mastery of one light is better than confusion with five." />
       </div>
    </div>
  </div>
);

// --- COMPONENTS ---

const Step = ({num, text}: any) => (
  <div className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-red-600/5 transition-colors group">
     <span className="font-bungee text-2xl text-red-600 group-hover:scale-110 transition-transform">{num}</span>
     <p className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-tight leading-relaxed">{text}</p>
  </div>
);

const MenuNode = ({icon, label, desc}: any) => (
  <div className="flex items-start gap-4 p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:bg-white/5 transition-all">
     <div className="text-red-600 p-2">{React.cloneElement(icon, { size: 20 })}</div>
     <div>
        <h5 className="font-bold text-white text-xs uppercase mb-1">{label}</h5>
        <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">{desc}</p>
     </div>
  </div>
);

const NicheCard = ({icon, label, labelColor, desc}: any) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem] hover:border-red-600/30 transition-all group">
     <div className="text-red-600 mb-4 group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 28 })}</div>
     <h4 className={`font-bold text-sm uppercase tracking-tighter mb-2 ${labelColor || 'text-white'}`}>{label}</h4>
     <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase">{desc}</p>
  </div>
);

const GripCard = ({icon, label, desc}: any) => (
  <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 text-center group hover:border-red-600/30 transition-all">
     <div className="mx-auto text-red-600 mb-6 flex justify-center">
        {React.cloneElement(icon, { size: 32 })}
     </div>
     <h4 className="font-bold text-white uppercase text-xs mb-2">{label}</h4>
     <p className="text-[10px] text-gray-500 leading-relaxed uppercase">{desc}</p>
  </div>
);

const TableRow = ({icon, label, legacy, modern}: {icon: any, label: string, legacy: string, modern: string}) => (
   <tr className="border-b border-white/5 hover:bg-white/5 transition-all group">
      <td className="p-6">
         <div className="flex items-center gap-3">
            <div className="text-red-600 opacity-50 group-hover:opacity-100">{icon}</div>
            <span className="font-black text-white">{label}</span>
         </div>
      </td>
      <td className="p-6 text-gray-500">{legacy}</td>
      <td className="p-6 text-white">{modern}</td>
   </tr>
);

const StrategyCard = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all group">
    <span className="font-bungee text-3xl text-red-600 block mb-6">{num}</span>
    <h4 className="text-white font-black uppercase text-xl mb-4 tracking-tighter group-hover:text-red-600 transition-colors">{title}</h4>
    <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-tight">{desc}</p>
  </div>
);

export default Learn;
