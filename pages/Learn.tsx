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
  Settings, Layers, Cpu, Database, Eye, ZapOff, FlaskConical, Binary, Microscope,
  Wind, Ghost, Palette, Lightbulb, UserCheck, Flame
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
    const contentMap: Record<string, React.ReactNode> = {
      'l1': <ModuleOneContent />,
      'l2': <ModuleOneContent />,
      'l13': <ModuleThreeContent />,
      'l16': <ModuleFourContent />,
      'l30': <ModuleFiveContent />,
      'l24': <ModuleSixContent />,
    };
    return contentMap[id] || <ModuleSixContent />; 
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
    </div>
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8">
       <h3 className="font-embroidery text-4xl italic text-white">When Did It Start?</h3>
       <p className="text-lg leading-relaxed text-gray-400">Centuries ago, philosophers noticed that light passing through a tiny hole into a dark room would project an inverted image. This was the Camera Obscura.</p>
    </div>
  </div>
);

const ModuleThreeContent = () => (
  <div className="space-y-20 pb-32">
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
      <div className="prose prose-invert max-w-none space-y-8 mt-10">
        <p className="text-xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">Every dial, slider, and menu item in a modern Nikon, Sony, or Canon body is a digital simulation of a physical process that photographers used for over a century. In the "Old World," there was no "Auto" mode; there were only the physical properties of light, metal, and glass.</p>
      </div>
    </div>
  </div>
);

const ModuleFourContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Professional Grip</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">The most common mistake amateurs make is holding the camera like a smartphone. To shoot for Pichazangu, you need stability.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 text-center">
          <Hand className="text-red-600 mx-auto mb-4" />
          <h4 className="font-black text-xs uppercase tracking-widest text-white">The Cradle</h4>
          <p className="text-[10px] text-gray-500 uppercase mt-2">Left hand underneath the lens, supporting the weight.</p>
       </div>
    </div>
  </div>
);

const ModuleFiveContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6 text-center">
      <h2 className="font-embroidery text-8xl md:text-9xl text-white italic leading-none">FIND YOUR <br/><span className="font-embroidery-sketch text-red-600">FIELD</span></h2>
      <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight max-w-4xl mx-auto mt-10">Photography is not a single job; it is a galaxy of specializations. The highest-paid creators on Pichazangu are Specialists.</p>
    </div>
  </div>
);

const ModuleSixContent = () => (
  <div className="space-y-24 pb-40">
    {/* HERO SECTION: THE PSYCHOLOGICAL HANDSHAKE */}
    <div className="space-y-10">
      <div className="relative h-[600px] rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Emotive Portrait" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="flex items-center gap-4 mb-6">
            <Smile size={32} className="text-red-600" />
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">Psychology Node 06.1</span>
          </div>
          <h2 className="font-embroidery text-7xl md:text-9xl text-white italic leading-none">ENGAGING THE <br/> <span className="font-embroidery-sketch">HUMAN SOUL</span></h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-10">
        <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
          A portrait is not a picture of a face; it is a document of an interaction. To be a portraitist in the Pichazangu ecosystem is to be a <b>Director of Emotion</b>. Whether you are shooting a corporate CEO in Upper Hill or a traditional elder in the Great Rift Valley, your camera is secondary to your presence.
        </p>
        <p className="text-xl text-gray-400 leading-relaxed uppercase">
          In East Africa, people are naturally vibrant and expressive, but the "black box" of a professional lens can cause subjects to freeze. This module teaches you how to dissolve the barrier between the sensor and the soul, ensuring your Private Vaults are filled with authentic, high-value human connections.
        </p>
      </div>
    </div>

    {/* SECTION 1: THE CATCHLIGHT PROTOCOL */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.4)]">
              <Eye size={36} />
           </div>
           <h3 className="font-embroidery text-5xl italic text-white uppercase">The Hook: Catchlights</h3>
        </div>
        <div className="space-y-8">
           <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase">
              The "Catchlight" is the tiny white reflection of a light source in the subject's eyes. In the professional world, this reflection is the signal of life. Without it, the eyes look flat, "dead," and the portrait fails to connect with the viewer.
           </p>
           <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] relative overflow-hidden group">
              <Lightbulb size={24} className="text-red-600 mb-6" />
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Geometric Placement</h4>
              <p className="text-xs text-gray-500 uppercase font-bold leading-relaxed">
                For a natural look, aim for the catchlight to be at the "10 o'clock" or "2 o'clock" position in the pupil. This simulates natural sky-light and gives the face a three-dimensional, intelligent quality.
              </p>
           </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group bg-[#0a0a0a] flex items-center justify-center">
           <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Detail Eye" />
           </div>
           <div className="relative z-10 text-center p-12">
              <div className="w-4 h-4 bg-white rounded-full mx-auto mb-4 blur-[1px] animate-pulse" />
              <p className="text-gray-400 text-[11px] font-black uppercase leading-relaxed tracking-widest">
                 [Visual Node 6.2: High-resolution catchlight analysis at f/1.4]
              </p>
           </div>
        </div>
      </div>
    </div>

    {/* SECTION 2: MELANIN & THE GLOW PROTOCOL */}
    <div className="bg-white text-black p-16 rounded-[4.5rem] relative overflow-hidden">
       <div className="relative z-10 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <div className="flex items-center gap-4 mb-4">
                   <Palette size={32} className="text-red-600" />
                   <span className="text-red-600 font-black text-[11px] uppercase tracking-[0.5em]">The Skin Authority</span>
                </div>
                <h2 className="font-embroidery text-6xl md:text-8xl italic leading-tight">THE <span className="text-red-600">GLOW</span> PROTOCOL</h2>
             </div>
             <p className="max-w-xl text-lg font-medium text-gray-500 leading-relaxed uppercase">
                Global camera sensors are often calibrated for lighter skin tones, which can lead to "muddiness" or graying when shooting African subjects. A Pichazangu Pro masters <b>Spectral Reflectance</b>. 
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <StrategyCard 
                num="01" 
                title="Expose for Highlights" 
                desc="Deep melanin reflects light beautifully. Watch your 'Specular Highlights'—the shine on the forehead or cheekbones. Don't let them blow out to pure white." 
             />
             <StrategyCard 
                num="02" 
                title="Golden White Balance" 
                desc="Avoid 'Auto' WB. Manually set your camera to 5600K or 6000K to preserve the natural warmth and rich undertones of the skin." 
             />
             <StrategyCard 
                num="03" 
                title="Large Light Sources" 
                desc="Small lights create harsh, oily-looking reflections. Use the largest softbox possible to wrap the light around the facial structure." 
             />
          </div>
       </div>
       <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none text-[35rem] font-embroidery whitespace-nowrap rotate-12">
          MELANIN
       </div>
    </div>

    {/* SECTION 3: THE FOUR PILLARS OF LIGHTING */}
    <div className="space-y-16">
       <div className="text-center space-y-6">
          <h3 className="font-embroidery text-6xl italic text-white uppercase">THE <span className="text-red-600 font-embroidery-sketch">DIRECTOR'S</span> PATTERNS</h3>
          <p className="text-gray-500 font-black text-xs uppercase tracking-[0.6em]">Foundational Geometry of the Face</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <LightingPatternCard 
             title="Rembrandt Lighting" 
             desc="Identified by the tiny triangle of light on the shadowed cheek. It is the gold standard for dramatic, editorial portraits." 
             image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
          />
          <LightingPatternCard 
             title="Butterfly Lighting" 
             desc="Light is placed directly above the lens. It creates a small shadow under the nose, perfect for glamour and high-end fashion." 
             image="https://images.unsplash.com/photo-1531746020798-e7953e3e8c5c?auto=format&fit=crop&w=800&q=80"
          />
       </div>
    </div>

    {/* PRO TIP SECTION */}
    <div className="p-16 bg-red-600 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
       <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
             <Zap size={32} className="fill-current" />
             <span className="text-xs font-black uppercase tracking-[0.5em]">The Pro Tip (RED)</span>
          </div>
          <h3 className="font-embroidery text-6xl md:text-8xl italic leading-none mb-10">BE THE <br/><span className="font-embroidery-sketch text-black">DIRECTOR</span>, NOT THE BUTTON.</h3>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-relaxed mb-12">
             Don't hide behind the camera. Lower it. Talk to your subject. Ask them about their childhood or their favorite Nairobi meal. Capture the moment <b>after</b> they finish answering—when the natural smile fades and the authentic soul remains.
          </p>
       </div>
       <Users size={400} className="absolute -right-20 -bottom-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
    </div>

    {/* PRACTICAL NODE: THE ONE-LIGHT CHALLENGE */}
    <div className="space-y-12">
       <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] relative overflow-hidden group">
          <div className="relative z-10 max-w-4xl">
             <div className="flex items-center gap-4 mb-10">
                <Target size={32} className="text-red-600" />
                <h2 className="font-embroidery text-5xl text-white italic uppercase">PRACTICAL: <span className="text-red-600">ONE LIGHT MASTERY</span></h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-gray-400 text-lg uppercase font-medium leading-relaxed">
                      Confusion arises with too many lights. Mastery arises with one.
                   </p>
                   <div className="space-y-4">
                      <Step num="01" text="Find a subject and a single lamp or window." />
                      <Step num="02" text="Rotate the subject 360 degrees. Watch how the shadow 'slips' across the nose and jaw." />
                      <Step num="03" text="Find the Rembrandt triangle. Take the shot." />
                      <Step num="04" text="Upload to your trainee node for AI structural review." />
                   </div>
                </div>
                <div className="bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center">
                   <Ghost size={64} className="text-red-600 mx-auto mb-8" />
                   <h4 className="text-2xl font-black text-white mb-4 uppercase">MASTER THE VOID</h4>
                   <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-widest">
                      "Shadow is the only thing that gives light meaning. Learn to love the dark parts of the face."
                   </p>
                </div>
             </div>
          </div>
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

const LightingPatternCard = ({ title, desc, image }: { title: string, desc: string, image: string }) => (
  <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden group hover:border-red-600/30 transition-all">
    <div className="h-64 overflow-hidden relative">
       <img src={image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={title} />
       <div className="absolute inset-0 bg-black/20" />
    </div>
    <div className="p-8">
       <h4 className="font-black text-xl text-white uppercase mb-2 tracking-tighter">{title}</h4>
       <p className="text-gray-500 text-xs font-medium leading-relaxed uppercase tracking-tight">{desc}</p>
    </div>
  </div>
);

const StrategyCard = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all group">
    <span className="font-bungee text-3xl text-red-600 block mb-6">{num}</span>
    <h4 className="text-white font-black uppercase text-xl mb-4 tracking-tighter group-hover:text-red-600 transition-colors">{title}</h4>
    <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-tight">{desc}</p>
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

export default Learn;