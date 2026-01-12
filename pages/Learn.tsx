import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, BookOpen, Briefcase, Camera, CheckCircle2, ChevronRight, 
  Download, FileText, Globe, GraduationCap, HardDrive, 
  PlayCircle, Sparkles, Star, Users, Video, Zap, ArrowLeft,
  Lock, Clock, Trophy, Target, Book, Layout, Info, Play,
  Search, Bookmark, Share2, History, Compass, BrainCircuit
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

// --- CONTENT ARCHITECTURE ---

const ModuleOneContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Philosophy of Sight</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Photography is more than just pressing a button; it is the art of "writing with light." In the context of East Africa, photography serves as a tool for preservation and progress. Whether it’s capturing the vibrant energy of a Nairobi street market or the serene beauty of the Serengeti, a photographer is a historian of the present. 
        Before you ever press a shutter, you must shift your mindset from "taking a snap" to "composing a legacy."
      </p>
    </div>

    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <History size={24} className="text-red-600" />
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">History of the Lens</span>
          </div>
          <h3 className="font-embroidery text-4xl italic text-white mb-6">The Camera Obscura</h3>
          <p className="text-lg leading-relaxed text-gray-400">
             Centuries ago, philosophers noticed that light passing through a tiny hole into a dark room would project an inverted image of the outside world onto the wall. This was the Camera Obscura. Imagine a traditional mud-walled hut with a single tiny gap in the thatch; during a bright midday sun, the vibrant activity outside is projected onto the dark floor inside. 
             This is the fundamental origin of every image you will capture on Pichazangu.
          </p>
       </div>
    </div>

    <div className="p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl shadow-red-900/40 relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">Master Protocol</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Your camera is just a tool; your eye is the actual lens. Start by looking for 'stories' before you look for 'settings.'"</p>
       </div>
       <Trophy size={180} className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="space-y-6">
          <h3 className="text-2xl font-black uppercase text-white">II. Regional Career Path</h3>
          <p className="text-base text-gray-400 leading-relaxed font-medium uppercase">
             In East Africa, high-quality visuals drive the economy. Real estate agents need photos for Upper Hill developments; fashion brands in Dar es Salaam need lookbooks; and NGOs need powerful imagery to tell stories of impact. This certificate isn't just about art—it's about becoming a participant in the regional media market.
          </p>
       </div>
       <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center">
          <Target size={48} className="text-red-600 mb-6" />
          <h4 className="font-bold text-white mb-2 uppercase">Technical Milestone</h4>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Master local contrast curves and regional color science.</p>
       </div>
    </div>

    <div className="space-y-10 py-10">
       <div className="flex items-center gap-4 text-gray-500"><Layout size={20} /><span className="text-[10px] font-black uppercase tracking-widest">Diagram Reference Node</span></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
             <div className="aspect-square bg-[#111] rounded-[3rem] border border-white/5 flex items-center justify-center group overflow-hidden">
                <p className="text-gray-700 text-[10px] font-black uppercase text-center px-10">[Diagram 1.1: The Human Eye vs The Optical Lens. Showing Cornea/Iris vs Aperture/Elements.]</p>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Biological vs Digital Sight</p>
          </div>
          <div className="space-y-4">
             <div className="aspect-square bg-[#111] rounded-[3rem] border border-white/5 flex items-center justify-center group overflow-hidden">
                <p className="text-gray-700 text-[10px] font-black uppercase text-center px-10">[Visual 1.2: High-Contrast Portrait in Kariakoo Market. Half face in shadow, half in golden-hour sun.]</p>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Mastering Regional Textures</p>
          </div>
       </div>
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">III. Student Protocol: The Observation Challenge</h3>
       <div className="space-y-4">
          <Step num="01" text="Find a single subject (a boda-boda, a fruit vendor, or a tree)." />
          <Step num="02" text="Walk around it 360 degrees without holding your camera." />
          <Step num="03" text="Watch how the shadows move. Where does the light reveal the most detail?" />
          <Step num="04" text="Blink rapidly. Imagine each 'blink' is a shutter press. Which moment was the winner?" />
       </div>
    </div>
  </div>
);

const ModuleTwoContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Evolution of the Gear</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        The first cameras were heavy, wooden boxes that required glass plates and toxic chemicals. It wasn't until the late 1800s that George Eastman introduced Film, leading to the slogan: "You press the button, we do the rest." Understanding your modern digital camera requires respecting the mechanical heritage of these early workhorses.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-6">
          <h3 className="font-embroidery text-3xl italic text-white uppercase">DSLR vs Mirrorless</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
             DSLRs use a physical mirror to reflect light into your eye. They are the rugged workhorses of East African journalism. Mirrorless cameras are the new standard—smaller, faster, and smarter, using electronic viewfinders to show you exactly how your RAW file will look before you shoot.
          </p>
       </div>
       <div className="bg-white/5 p-8 rounded-[3.5rem] border border-white/10 flex flex-col items-center justify-center text-center">
          <BrainCircuit size={48} className="text-red-600 mb-6" />
          <h4 className="font-bold text-white mb-2 uppercase">Pro Hardware Note</h4>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
             For high-res delivery in Nairobi/Kampala, implement AWS S3 Multipart Uploads with regional CloudFront caching to handle intermittent 4G/5G uploads.
          </p>
       </div>
    </div>

    <div className="p-12 bg-black border-2 border-red-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="text-red-600 fill-red-600" /><span className="text-[10px] font-black uppercase tracking-widest">The Red Advice</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Don't buy the most expensive camera first; buy a used entry-level body and spend the rest on a superior 50mm prime lens."</p>
       </div>
    </div>

    <div className="space-y-10 py-10">
       <div className="flex items-center gap-4 text-gray-500"><Layout size={20} /><span className="text-[10px] font-black uppercase tracking-widest">Diagram Reference Node</span></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
             <div className="aspect-square bg-[#111] rounded-[3rem] border border-white/5 flex items-center justify-center group overflow-hidden">
                <p className="text-gray-700 text-[10px] font-black uppercase text-center px-10">[Diagram 2.1: Mechanical cross-section of a DSLR showing Mirror Flip.]</p>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">The Mirror Shutter Cycle</p>
          </div>
          <div className="space-y-4">
             <div className="aspect-square bg-[#111] rounded-[3rem] border border-white/5 flex items-center justify-center group overflow-hidden">
                <p className="text-gray-700 text-[10px] font-black uppercase text-center px-10">[Visual 2.2: Comparison of a RAW vs JPEG sensor output in Maasai Mara lighting.]</p>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight text-center">Dynamic Range Potential</p>
          </div>
       </div>
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">II. Student Protocol: The Tactile Discovery</h3>
       <div className="space-y-4">
          <Step num="01" text="Pick up your camera. Close your eyes and identify every dial by touch." />
          <Step num="02" text="Locate the shutter button. Feel the two stages: focus vs. fire." />
          <Step num="03" text="Try to take a photo of something in front of you without looking at the screen." />
          <Step num="04" text="This builds muscle memory for the decisive moments on the street." />
       </div>
    </div>
  </div>
);

const Step = ({num, text}: any) => (
  <div className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-red-600/5 transition-colors group">
     <span className="font-bungee text-2xl text-red-600 group-hover:scale-110 transition-transform">{num}</span>
     <p className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-tight leading-relaxed">{text}</p>
  </div>
);

export default Learn;