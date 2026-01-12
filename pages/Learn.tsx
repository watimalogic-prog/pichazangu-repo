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
  Wind, Ghost, Palette, Lightbulb, UserCheck, Flame, Scale, Scissors,
  // Fixed 'Cannot find name ScanFace' and 'Cannot find name BarChart3' by adding them to the lucide-react import list.
  ScanFace, BarChart3
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
  <div className="space-y-24 pb-40">
    {/* HERO SECTION */}
    <div className="space-y-10">
      <div className="relative h-[600px] rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt="Vintage Camera Mechanism" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="flex items-center gap-4 mb-6">
            <History size={32} className="text-red-600" />
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">Heritage Node 03.1</span>
          </div>
          <h2 className="font-embroidery text-7xl md:text-9xl text-white italic leading-none">OLD FEATURES <br/> <span className="font-embroidery-sketch">MODERN MASTERY</span></h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-10">
        <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
          To master a modern camera, you must respect its ancestors. Every digital setting you see today is a digital simulation of a physical, mechanical process from the 20th century. In the "Old World," features were tactile. To change your "ISO" (sensitivity), you had to physically open the back of the camera and swap the roll of film. To change your shutter speed, you turned a heavy metal dial that wound a spring.
        </p>
        <p className="text-xl text-gray-400 leading-relaxed uppercase">
          In East Africa, many of our legendary photojournalists started on these mechanical beasts. They learned the "feel" of the camera. As a Pichazangu student, understanding these features helps you troubleshoot. When your digital camera fails to focus, knowing how a manual "Rangefinder" worked helps you understand how to fix it yourself.
        </p>
      </div>
    </div>

    {/* SECTION 1: THE TACTILE ANCESTORS */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.4)]">
              <Scale size={36} />
           </div>
           <h3 className="font-embroidery text-5xl italic text-white uppercase">The Tactile Ancestors</h3>
        </div>
        <div className="space-y-8">
           <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase">
              The history of the camera is a history of physical movement. Before touchscreens and menus, every change required a mechanical action.
           </p>
           <div className="grid grid-cols-1 gap-6">
              <LegacyFeature 
                icon={<CircleIcon size={24}/>} 
                title="The Aperture Ring" 
                desc="On old lenses, you twisted a ring on the lens itself to physically move the 'blades.' Today, most cameras control this via a thumbwheel on the body." 
              />
              <LegacyFeature 
                icon={<Binary size={24}/>} 
                title="The ISO/ASA Dial" 
                desc="Previously fixed by the film type (e.g., Kodak 400). Modern cameras have 'Auto-ISO,' allowing the camera to adjust sensitivity instantly." 
              />
              <LegacyFeature 
                icon={<Activity size={24}/>} 
                title="The Film Advance Lever" 
                desc="That satisfying 'crank' sound after every shot. Today, we have 'Burst Mode,' taking 30 photos in a single second." 
              />
           </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative group">
           <img src="https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Vintage Dial" />
           <div className="absolute inset-0 bg-black/40" />
           <div className="absolute inset-0 flex items-center justify-center">
              <History size={120} className="text-white/10" />
           </div>
        </div>
        <p className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] text-center">[Visual Node 3.2: Mechanical Dial Architecture of a 1970s SLR]</p>
      </div>
    </div>

    {/* SECTION 2: THE DIGITAL BRAIN */}
    <div className="bg-white text-black p-16 rounded-[4.5rem] relative overflow-hidden">
       <div className="relative z-10 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <div className="flex items-center gap-4 mb-4">
                   <Cpu size={32} className="text-red-600" />
                   <span className="text-red-600 font-black text-[11px] uppercase tracking-[0.5em]">Silicon Evolution</span>
                </div>
                <h2 className="font-embroidery text-6xl md:text-8xl italic leading-tight">MODERN FEATURES: <br/><span className="font-embroidery-sketch text-red-600">THE BRAIN</span></h2>
             </div>
             <p className="max-w-xl text-lg font-medium text-gray-500 leading-relaxed uppercase">
                Modern cameras like the ones used by Pichazangu Pros have features the pioneers never dreamed of. We have moved from physics to computation.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <ModernFeatureCard 
                icon={<Activity/>}
                title="IBIS"
                desc="In-Body Image Stabilization. A floating sensor that cancels out hand tremors, allowing for sharp shots even in low light."
             />
             <ModernFeatureCard 
                icon={<ScanFace/>}
                title="EYE-TRACKING AF"
                desc="The camera uses AI to find the eye of a lion or a bride and keeps it sharp, even if they are moving at high speed."
             />
             <ModernFeatureCard 
                icon={<BarChart3/>}
                title="HISTOGRAM"
                desc="A digital graph that tells you if your photo is too dark or too bright before you even take the shot. No more guesswork."
             />
          </div>
       </div>
       <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none text-[35rem] font-embroidery whitespace-nowrap rotate-12">
          シリコン
       </div>
    </div>

    {/* PRO TIP: RED PROTOCOL */}
    <div className="p-16 bg-red-600 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
       <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
             <Zap size={32} className="fill-current" />
             <span className="text-xs font-black uppercase tracking-[0.5em]">The Pro Tip (RED)</span>
          </div>
          <h3 className="font-embroidery text-6xl md:text-8xl italic leading-none mb-10">DON'T BE A <br/><span className="font-embroidery-sketch text-black">TOURIST.</span></h3>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-relaxed mb-12">
             Don't get distracted by "Scene Modes" (like Portrait or Sports mode). These are for tourists. A Pichazangu Pro uses 'Aperture Priority' or 'Manual' to take full creative control of the narrative.
          </p>
       </div>
       <Globe size={400} className="absolute -right-20 -bottom-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
    </div>

    {/* EXPERIMENTAL TIP */}
    <div className="space-y-12">
       <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] relative overflow-hidden group">
          <div className="relative z-10 max-w-4xl">
             <div className="flex items-center gap-4 mb-10">
                <Volume2 size={32} className="text-red-600 animate-pulse" />
                <h2 className="font-embroidery text-5xl text-white italic">PRACTICAL: <span className="text-red-600">SOUND OF SPEED</span></h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-gray-400 text-lg uppercase font-medium leading-relaxed">
                      Set your camera to "Shutter Priority" (S or Tv mode). Take a photo at 1/10th of a second, then take one at 1/1000th of a second.
                   </p>
                   <div className="space-y-4">
                      <Step num="01" text="Listen to the click. The first will be a slow, 'ker-thunk'." />
                      <Step num="02" text="The second will be a sharp, 'tick'." />
                      <Step num="03" text="This exercise trains your ears to recognize shutter speed without looking at the screen." />
                   </div>
                </div>
                <div className="bg-black p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center">
                   <Clock size={64} className="text-red-600 mx-auto mb-8" />
                   <h4 className="text-2xl font-black text-white mb-4 uppercase">BUILD SONIC MEMORY</h4>
                   <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-widest">
                      "A master knows the state of the machine by the rhythm of its mechanics. Listen to the light."
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  </div>
);

const ModuleFourContent = () => (
  <div className="space-y-24 pb-40">
    {/* HERO SECTION */}
    <div className="space-y-10">
      <div className="relative h-[600px] rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="Professional Grip" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="flex items-center gap-4 mb-6">
            <Hand size={32} className="text-red-600" />
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">Biomechanics Node 04.1</span>
          </div>
          <h2 className="font-embroidery text-7xl md:text-9xl text-white italic leading-none">THE HANDSHAKE: <br/> <span className="font-embroidery-sketch">THE GRIP</span></h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none space-y-10">
        <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
          The most common mistake amateurs make is holding the camera like a smartphone. To shoot for Pichazangu, you need stability. You are not just holding a device; you are anchoring a scientific instrument to your skeleton.
        </p>
        <p className="text-xl text-gray-400 leading-relaxed uppercase">
          Stability is the foundation of sharpness. In a busy Nairobi street or a dark event hall, you cannot always rely on high ISO. You must rely on your bones. This module teaches you the physical protocols for turning your body into a solid media node.
        </p>
      </div>
    </div>

    {/* SECTION 1: THE PROFESSIONAL GRIP */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.4)]">
              <Crosshair size={36} />
           </div>
           <h3 className="font-embroidery text-5xl italic text-white uppercase">The Human Tripod</h3>
        </div>
        <div className="space-y-6">
           <GripPoint 
              num="01" 
              title="The Left Hand: The Cradle" 
              desc="This is your primary support. It should sit underneath the lens, supporting the full weight of the glass and allowing your fingers to zoom or focus." 
           />
           <GripPoint 
              num="02" 
              title="The Right Hand: The Trigger" 
              desc="Your palm should wrap firmly around the grip, with your index finger resting lightly on the shutter. Do not 'clutch' too hard; stay fluid." 
           />
           <GripPoint 
              num="03" 
              title="The Anchor: The Chassis" 
              desc="Tuck your elbows into your ribs and stand with your feet shoulder-width apart. You have now turned your skeletal system into a human tripod." 
           />
        </div>
      </div>
      <div className="relative">
         <div className="aspect-[3/4] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative group bg-[#0a0a0a]">
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover opacity-20" alt="Grip Diagram" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="space-y-8 w-full px-12">
                  <div className="h-0.5 bg-red-600/50 w-full relative"><div className="absolute -top-1.5 left-0 w-3 h-3 bg-red-600 rounded-full" /></div>
                  <div className="h-0.5 bg-red-600/50 w-2/3 relative"><div className="absolute -top-1.5 left-0 w-3 h-3 bg-red-600 rounded-full" /></div>
                  <div className="h-0.5 bg-red-600/50 w-full relative"><div className="absolute -top-1.5 left-0 w-3 h-3 bg-red-600 rounded-full" /></div>
               </div>
            </div>
         </div>
         <p className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] text-center mt-6">[Visual Node 4.2: Biomechanical Anchor Points for Handheld Stability]</p>
      </div>
    </div>

    {/* SECTION 2: NAVIGATING THE MENU */}
    <div className="bg-white text-black p-16 rounded-[4.5rem] relative overflow-hidden">
       <div className="relative z-10 space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
             <div>
                <div className="flex items-center gap-4 mb-4">
                   <Settings size={32} className="text-red-600" />
                   <span className="text-red-600 font-black text-[11px] uppercase tracking-[0.5em]">Command Logic</span>
                </div>
                <h2 className="font-embroidery text-6xl md:text-8xl italic leading-tight">THE MENU <br/><span className="font-embroidery-sketch text-red-600">SYSTEM</span></h2>
             </div>
             <p className="max-w-xl text-lg font-medium text-gray-500 leading-relaxed uppercase">
                Every camera brand (Canon, Nikon, Sony, Fujifilm) has a different "language," but they all share a core menu structure. You must learn to find three things instantly.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <MenuNode 
                icon={<HardDrive/>}
                title="FORMAT CARD"
                desc="The most important button before any session. It deletes everything and resets the file structure. Use with extreme caution."
             />
             <MenuNode 
                icon={<ImageIcon/>}
                title="IMAGE QUALITY"
                desc="Always ensure you are set to RAW for the highest fidelity. JPEGs are for social media; RAW files are for the Pichazangu Archive."
             />
             <MenuNode 
                icon={<Crosshair/>}
                title="FOCUS MODE"
                desc="Switching between 'Single' for portraits and 'Continuous' (AF-C/Servo) for action or sports. Know this toggle by touch."
             />
          </div>
       </div>
       <div className="absolute top-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none text-[35rem] font-embroidery whitespace-nowrap rotate-12">
          MENU
       </div>
    </div>

    {/* SECTION 3: THE WORKFLOW CHECKLIST */}
    <div className="space-y-16">
       <div className="text-center space-y-6">
          <h3 className="font-embroidery text-6xl italic text-white uppercase">THE <span className="text-red-600 font-embroidery-sketch">WORKFLOW</span> CHECKLIST</h3>
          <p className="text-gray-500 font-black text-xs uppercase tracking-[0.6em]">Zero-Error Protocol for Regional Assignments</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-12 space-y-10">
             <div className="space-y-8">
                <ChecklistItem num="01" title="Power & Storage" desc="Check your battery and card. Nothing is worse than arriving at a wedding with a dead battery." />
                <ChecklistItem num="02" title="Light Temperature" desc="Set your White Balance. Match the camera to the light (Sun, Shade, or Fluorescent)." />
                <ChecklistItem num="03" title="Calibration" desc="Check your Exposure. Look at the meter in your viewfinder. Is it sitting at '0'?" />
                <ChecklistItem num="04" title="Composition" desc="Focus, Recompose, Shoot. Focus on the eyes, move for a better crop, then squeeze." />
             </div>
          </div>
          <div className="relative rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
             <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover grayscale opacity-30" alt="Workflow Context" />
             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
             <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-red-600 p-6 rounded-3xl shadow-2xl">
                   <h4 className="text-white font-black text-xs uppercase mb-2">Pichazangu Field Protocol</h4>
                   <p className="text-white/80 text-xs font-bold leading-relaxed uppercase">"A pro is someone who makes the machine invisible so the story can shine. Follow the checklist, then forget the gear."</p>
                </div>
             </div>
          </div>
       </div>
    </div>

    {/* PRO TIP: RED PROTOCOL */}
    <div className="p-16 bg-red-600 rounded-[4rem] text-white shadow-3xl relative overflow-hidden group">
       <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
             <Zap size={32} className="fill-current" />
             <span className="text-xs font-black uppercase tracking-[0.5em]">The Pro Tip (RED)</span>
          </div>
          <h3 className="font-embroidery text-6xl md:text-8xl italic leading-none mb-10">THE <br/><span className="font-embroidery-sketch text-black">HEARTBEAT.</span></h3>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-relaxed mb-12">
             Treat your shutter button like a heartbeat. A gentle squeeze produces a sharp image; a violent poke produces a blurry one. Sync your press with your exhale for the ultimate stability.
          </p>
       </div>
       <Zap size={400} className="absolute -right-20 -bottom-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
    </div>

    {/* EXPERIMENTAL TIP */}
    <div className="space-y-12">
       <div className="bg-white/5 border border-white/10 p-16 rounded-[4rem] relative overflow-hidden group">
          <div className="relative z-10 max-w-4xl">
             <div className="flex items-center gap-4 mb-10">
                <Fingerprint size={32} className="text-red-600 animate-pulse" />
                <h2 className="font-embroidery text-5xl text-white italic">PRACTICAL: <span className="text-red-600">THE BLIND CHALLENGE</span></h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <p className="text-gray-400 text-lg uppercase font-medium leading-relaxed">
                      In professional photography, things happen fast. If you have to look down at your buttons, you will miss the shot.
                   </p>
                   <div className="space-y-4">
                      <Step num="01" text="In a dimly lit room, try to change your ISO and Aperture settings without looking." />
                      <Step num="02" text="Use the dials and feel the 'clicks'. Memorize the geography of your body." />
                      <Step num="03" text="Try to navigate to 'Format Card' within the menu system with your eyes closed." />
                   </div>
                </div>
                <div className="bg-black p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center">
                   <Target size={64} className="text-red-600 mx-auto mb-8" />
                   <h4 className="text-2xl font-black text-white mb-4 uppercase">BUILD MUSCLE MEMORY</h4>
                   <p className="text-gray-500 text-sm font-bold leading-relaxed uppercase tracking-widest">
                      "If you can't operate your camera in total darkness, you are not yet a master of the machine. The handshake must be instinctual."
                   </p>
                </div>
             </div>
          </div>
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
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Art of the Human Soul</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Portraiture is the foundation of the Pichazangu Private Vault system. It is the most consistent way to earn a living in the region.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 space-y-6">
          <h3 className="font-embroidery text-3xl italic text-white uppercase">The Director's Role</h3>
          <p className="text-gray-400 text-sm leading-relaxed">In the studio, you are the Director. You aren't just taking a picture; you are managing the subject’s emotions.</p>
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

const CircleIcon = ({size}: any) => (
  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
    <div className="w-2 h-2 bg-current rounded-full" />
  </div>
);

const LegacyFeature = ({icon, title, desc}: any) => (
  <div className="flex gap-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group">
     <div className="text-red-600 mt-1">{icon}</div>
     <div>
        <h4 className="font-black text-white uppercase text-sm mb-2">{title}</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{desc}</p>
     </div>
  </div>
);

const ModernFeatureCard = ({icon, title, desc}: any) => (
  <div className="bg-gray-50 border border-gray-100 p-10 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all group">
     <div className="text-red-600 mb-8 group-hover:scale-110 transition-transform duration-500">{React.cloneElement(icon as React.ReactElement, { size: 36 })}</div>
     <h4 className="font-black text-gray-900 uppercase text-xl mb-4 tracking-tighter">{title}</h4>
     <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-tight">{desc}</p>
  </div>
);

const GripPoint = ({num, title, desc}: any) => (
  <div className="flex gap-6 items-start group">
     <span className="font-bungee text-2xl text-red-600 transition-transform group-hover:scale-110">{num}</span>
     <div>
        <h4 className="font-black text-white uppercase text-sm mb-2 tracking-widest">{title}</h4>
        <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">{desc}</p>
     </div>
  </div>
);

const MenuNode = ({icon, title, desc}: any) => (
  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
     <div className="text-red-600 mb-6">{React.cloneElement(icon as React.ReactElement, { size: 28 })}</div>
     <h4 className="font-black text-gray-900 uppercase text-sm mb-3 tracking-widest">{title}</h4>
     <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-tight">{desc}</p>
  </div>
);

const ChecklistItem = ({num, title, desc}: any) => (
  <div className="flex gap-6 group">
     <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center font-bungee text-sm shrink-0">{num}</div>
     <div>
        <h4 className="font-black text-white uppercase text-sm mb-1 tracking-widest group-hover:text-red-600 transition-colors">{title}</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{desc}</p>
     </div>
  </div>
);

export default Learn;