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
  Settings
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
  <div className="space-y-16 pb-32">
    <div className="space-y-6">
      <h2 className="text-5xl font-black uppercase tracking-tighter text-white">I. From Chemistry to Silicon: The Great Shift</h2>
      <p className="text-xl leading-relaxed text-gray-400 uppercase font-medium">
        To understand the modern professional rig, you must understand that every button on a Nikon Z9 or a Canon R3 is a digital ghost of a mechanical ancestor. For a hundred years, photography was a matter of chemistry. Light hit silver-halide crystals on a strip of plastic (film), creating a latent image that had to be "developed" in a darkroom with toxic liquids. 
      </p>
      <p className="text-xl leading-relaxed text-gray-400 uppercase font-medium">
        Today, silicon has replaced silver. The image sensor is a grid of millions of microscopic light-sensitive "wells" that convert photons into electrical signals. This transition from the mechanical age to the computational age has completely changed the "barrier to entry" for photographers in East Africa. You no longer need to import expensive rolls of Kodak film from abroad; you only need light and a memory card.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
       <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-12 space-y-8 relative overflow-hidden group">
          <div className="relative z-10">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                   <Activity size={32} />
                </div>
                <h3 className="font-embroidery text-4xl italic text-white uppercase">The DSLR Era: The Mirror Slap</h3>
             </div>
             <p className="text-gray-400 text-lg leading-relaxed mb-6">
                For the last 20 years, the Digital Single Lens Reflex (DSLR) has been the king of the newsroom. Inside, a physical mirror sits at a 45-degree angle. When you look through the viewfinder, you are seeing the actual light coming through the lens, reflected up into your eye via a pentaprism.
             </p>
             <p className="text-gray-400 text-lg leading-relaxed font-bold border-l-4 border-red-600 pl-6">
                The "Slap": When you press the shutter, that mirror must physically flip up out of the way so light can hit the sensor. That "clack-clack" sound is the heartbeat of a DSLR. It’s rugged, mechanical, and reliable in the dusty streets of CBD.
             </p>
          </div>
       </div>

       <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-12 space-y-8 flex flex-col justify-center relative group overflow-hidden">
          <div className="relative z-10">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center">
                   <Zap size={32} />
                </div>
                <h3 className="font-embroidery text-4xl italic text-white uppercase">The Mirrorless Revolution</h3>
             </div>
             <p className="text-gray-400 text-lg leading-relaxed">
                Modern Pichazangu Pros are moving to Mirrorless. There is no physical mirror. The light hits the sensor directly and is projected onto a tiny TV screen inside the viewfinder (the EVF). 
             </p>
             <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black text-red-600 uppercase block mb-1">Benefit A</span>
                   <span className="text-xs font-bold text-white uppercase tracking-tight">Silent Shutter for sensitive events (Weddings).</span>
                </div>
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black text-red-600 uppercase block mb-1">Benefit B</span>
                   <span className="text-xs font-bold text-white uppercase tracking-tight">What You See Is What You Get (Exposure Preview).</span>
                </div>
             </div>
          </div>
          <Zap size={300} className="absolute -right-20 -bottom-20 opacity-[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
       </div>
    </div>

    <div className="space-y-12">
       <h3 className="text-3xl font-black uppercase text-white border-b border-white/10 pb-6">II. Anatomy of the Modern Pro Rig</h3>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HardwareNode 
             icon={<Crosshair/>}
             title="The Optics (Lens)"
             desc="The lens is more important than the camera. In East Africa, we recommend starting with a 'Nifty Fifty' (50mm f/1.8). It is sharp, cheap, and mimics the human eye."
          />
          <HardwareNode 
             icon={<BrainCircuit/>}
             title="The Image Sensor"
             desc="The 'Bucket' analogy: A Full Frame sensor has bigger buckets than an APS-C (Crop) sensor. Bigger buckets catch more light, meaning cleaner photos at night."
          />
          <HardwareNode 
             icon={<HardDrive/>}
             title="Storage Nodes"
             desc="Always use high-speed SD cards (UHS-II). A slow card will 'choke' your camera when shooting burst mode at a football match in Nyayo Stadium."
          />
       </div>
    </div>

    <div className="p-16 bg-red-600 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
       <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
             <Star size={32} className="fill-current" />
             <span className="text-xs font-black uppercase tracking-[0.5em]">The Command Center Protocol</span>
          </div>
          <h3 className="font-embroidery text-6xl md:text-8xl italic leading-none mb-10">NEVER BUY <br/><span className="font-embroidery-sketch">NEW GEAR</span> FIRST.</h3>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-relaxed mb-12">
             The biggest amateur mistake is thinking a 400,000 KES camera makes you a pro. An entry-level body from 2018 with a professional lens will outperform a 2024 body with a 'kit' lens every single time. Master the light before you master the catalog.
          </p>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-black/20 rounded-xl border border-white/30 text-[10px] font-black uppercase tracking-widest">Rule #1: Optics Over Body</div>
             <div className="px-6 py-3 bg-black/20 rounded-xl border border-white/30 text-[10px] font-black uppercase tracking-widest">Rule #2: Buy Used, Shoot More</div>
          </div>
       </div>
       <Trophy size={400} className="absolute -right-20 -bottom-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
    </div>

    <div className="space-y-10 py-10">
       <div className="flex items-center gap-4 text-gray-500"><Layout size={24} /><span className="text-xs font-black uppercase tracking-[0.4em]">Hardware Reference Node</span></div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
             <div className="aspect-[16/9] bg-[#111] rounded-[3rem] border border-white/10 flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent" />
                <p className="text-gray-600 text-[11px] font-black uppercase text-center px-12 leading-relaxed relative z-10">
                   [Diagram 2.3: Mechanical Cross-section of a DSLR showing the 45-degree mirror and the Pentaprism housing.]
                </p>
             </div>
             <div className="px-4">
                <h4 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">The Optical Path</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase">Notice the complexity. More moving parts means more chances for mechanical failure in humid or sandy environments.</p>
             </div>
          </div>
          <div className="space-y-6">
             <div className="aspect-[16/9] bg-[#111] rounded-[3rem] border border-white/10 flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent" />
                <p className="text-gray-600 text-[11px] font-black uppercase text-center px-12 leading-relaxed relative z-10">
                   [Visual 2.4: Mirrorless Mount Comparison. Showing the shorter 'Flange Distance' which allows for sharper wide-angle optics.]
                </p>
             </div>
             <div className="px-4">
                <h4 className="text-white font-bold uppercase text-sm mb-2 tracking-tight">The Computational Future</h4>
                <p className="text-gray-500 text-xs leading-relaxed uppercase">By removing the mirror, engineers can place the glass closer to the sensor, resulting in unmatched corner-to-corner sharpness.</p>
             </div>
          </div>
       </div>
    </div>

    <div className="space-y-10">
       <h3 className="text-3xl font-black uppercase text-white">III. Student Protocol: The Tactile Discovery</h3>
       <p className="text-gray-400 text-lg max-w-2xl font-medium leading-relaxed uppercase">
          In professional photography, things happen fast. If you have to look down at your camera to find the ISO button while a lion is lunging or a bride is walking down the aisle, you have already lost the shot. 
       </p>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Step num="01" text="Pick up your camera. Close your eyes and identify the main dial (usually near your right index finger)." />
          <Step num="02" text="Still with eyes closed, locate the shutter button. Feel the 'half-press' vs 'full-press' depth." />
          <Step num="03" text="Find the lens release button. Practice changing a lens in the dark. In our region, we do this often under 'Matatu' or stadium lighting." />
          <Step num="04" text="Turn on your camera. Practice switching from Auto to Manual mode using only your thumb, without looking at the dial." />
       </div>
       <div className="mt-12 bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] flex items-center gap-10">
          <Fingerprint size={64} className="text-red-600 shrink-0" />
          <div>
             <h4 className="text-white font-black uppercase tracking-widest text-lg mb-2">Build Muscle Memory</h4>
             <p className="text-gray-500 text-sm font-medium uppercase leading-relaxed">
                Your camera should be an extension of your nervous system. Module 2 ends when you can change your Aperture and Shutter speed while carrying a conversation with a client.
             </p>
          </div>
       </div>
    </div>
  </div>
);

const ModuleThreeContent = () => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Legacy of the Mechanical Age</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        To master a modern camera, you must respect its ancestors. Every digital setting you see today is a digital simulation of a physical, mechanical process from the 20th century. In the "Old World," features were tactile. To change your "ISO" (sensitivity), you had to physically open the back of the camera and swap the roll of film. To change your shutter speed, you turned a heavy metal dial that wound a spring.
      </p>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        In East Africa, many of our legendary photojournalists started on these mechanical beasts. They learned the "feel" of the camera. As a Pichazangu student, understanding these features helps you troubleshoot. When your digital camera fails to focus, knowing how a manual "Rangefinder" worked helps you understand how to fix it yourself.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden group">
          <div className="relative z-10">
             <div className="flex items-center gap-3 mb-6">
                <History size={24} className="text-red-600" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Key Features Comparison</span>
             </div>
             <div className="space-y-6">
                <div>
                   <h4 className="font-bold text-white uppercase text-sm mb-2">The Aperture Ring</h4>
                   <p className="text-gray-400 text-xs leading-relaxed uppercase">On old lenses, you twisted a ring on the lens itself to open the "blades." Today, most cameras control this via a thumbwheel on the body.</p>
                </div>
                <div>
                   <h4 className="font-bold text-white uppercase text-sm mb-2">The ISO/ASA Dial</h4>
                   <p className="text-gray-400 text-xs leading-relaxed uppercase">Previously fixed by the film type (e.g., Kodak 400). Modern cameras have "Auto-ISO," allowing instant adjustment from bright sun to dim locker rooms.</p>
                </div>
                <div>
                   <h4 className="font-bold text-white uppercase text-sm mb-2">The Film Advance Lever</h4>
                   <p className="text-gray-400 text-xs leading-relaxed uppercase">That satisfying "crank" sound after every shot. Today, we have "Burst Mode," taking 30 photos in a single second.</p>
                </div>
             </div>
          </div>
       </div>

       <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 space-y-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
             <BrainCircuit size={24} className="text-red-600" />
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Modern Features: The Digital Brain</span>
          </div>
          <ul className="space-y-6">
             <li className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight leading-snug"><b>IBIS:</b> In-Body Image Stabilization. A floating sensor that cancels tremors for sharp shots in low light.</p>
             </li>
             <li className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight leading-snug"><b>Eye-Tracking AF:</b> AI identifying the eye of a lion or a bride to keep them sharp during motion.</p>
             </li>
             <li className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight leading-snug"><b>Histogram:</b> A real-time digital graph showing your exposure balance before you fire.</p>
             </li>
          </ul>
       </div>
    </div>

    <div className="p-12 bg-red-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4"><Zap size={24} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">Pro Tip (RED)</span></div>
          <p className="text-4xl font-embroidery italic leading-snug">"Don't get distracted by 'Scene Modes' (like Portrait or Sports mode). These are for tourists. A Pichazangu Pro uses 'Aperture Priority' or 'Manual' to take full creative control."</p>
       </div>
    </div>

    <div className="space-y-8">
       <h3 className="text-2xl font-black uppercase text-white">Practical Experimental Tip: The Sound of Speed</h3>
       <div className="bg-[#111] p-10 rounded-[3rem] border border-white/5 space-y-6">
          <p className="text-gray-400 text-sm leading-relaxed uppercase font-medium">
             Set your camera to "Shutter Priority" (S or Tv mode). Take a photo at 1/10th of a second, then take one at 1/1000th of a second. Listen to the click. The first will be a slow, "ker-thunk"; the second will be a sharp, "tick." This exercise trains your ears to recognize shutter speed without looking at the screen. Mastery of sound is the first step to shooting with your eyes on the subject, not the dials.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
             <Volume2 size={24} className="text-red-600" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ear Training Node Active</span>
          </div>
       </div>
    </div>

    <div className="pt-10 border-t border-white/5 space-y-8">
      <h3 className="text-2xl font-black uppercase text-white">II. The Anatomy of Modern Optics</h3>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Every lens you attach to your camera is a masterpiece of physics. In the regional East African market, we often deal with high heat and dust. Understanding the "Mount" and the "Weather Sealing" is vital. Whether you shoot with a prime 50mm or a wide 24-70mm, you are controlling how photons are bent to reach your sensor.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="aspect-square bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center p-12 text-center group overflow-hidden">
             <p className="text-gray-600 text-[10px] font-black uppercase leading-relaxed group-hover:scale-110 transition-transform">[Visual Node: 3.4 - Optical cross-section of a mirrorless sensor showing pixel wells and microlenses capturing high-contrast East African noon-day light.]</p>
         </div>
         <div className="flex flex-col justify-center space-y-6">
            <h4 className="text-xl font-bold uppercase text-red-600">The Sensor Node</h4>
            <p className="text-gray-400 text-xs leading-relaxed uppercase font-medium">
               Think of your sensor as a million tiny buckets waiting for rain (photons). If you keep the bucket open too long (slow shutter), it overflows (blown highlights). If you close it too early, you get noise. Module 3 teaches you to balance the overflow vs. the drought.
            </p>
         </div>
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

const HardwareNode = ({icon, title, desc}: {icon: any, title: string, desc: string}) => (
  <div className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all group">
     <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-500">{React.cloneElement(icon, { size: 32 })}</div>
     <h4 className="text-white font-black uppercase text-sm mb-3 tracking-widest">{title}</h4>
     <p className="text-gray-500 text-[10px] font-bold leading-relaxed uppercase tracking-tight">{desc}</p>
  </div>
);

export default Learn;