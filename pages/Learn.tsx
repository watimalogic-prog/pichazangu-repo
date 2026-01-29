import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, BookOpen, Camera, CheckCircle2, ChevronRight, 
  Download, FileText, Globe, GraduationCap, HardDrive, 
  PlayCircle, Sparkles, Star, Users, Video, Zap, ArrowLeft,
  Lock, Clock, Trophy, Target, Book, Layout, Info, Play,
  Search, Bookmark, Share2, History, Compass, BrainCircuit,
  Volume2, Fingerprint, Crosshair, Hand, Smile, Box, Timer, Leaf,
  Image as ImageIcon, HelpCircle, Activity, ShieldCheck,
  Settings, Layers, Cpu, Database, Eye, ZapOff, FlaskConical, Binary, Microscope,
  Wind, Ghost, Palette, Lightbulb, UserCheck, Flame, Scale, Scissors,
  ScanFace, BarChart3, CheckCircle, Upload, Loader2, RefreshCw, QrCode
} from 'lucide-react';
import { MOCK_ACADEMY_COURSES, MOCK_QUIZ_DATA } from '../constants';
import { AcademyCourse, Lesson } from '../types';
import { useToastStore } from '../store/useAppStore';
import { GoogleGenAI } from "@google/genai";

const Learn: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [localCourseData, setLocalCourseData] = useState<AcademyCourse[]>(MOCK_ACADEMY_COURSES);
  
  const showToast = useToastStore((state) => state.showToast);

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
    const course = localCourseData.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      if (!activeLesson) {
        setActiveLesson(course.modules[0].lessons[0]);
      }
      showToast(`Entering ${course.title} Node`, "info");
    }
  };

  const handleLessonComplete = (lessonId: string) => {
    if (!selectedCourse) return;

    const updatedCourses = localCourseData.map(course => {
      if (course.id === selectedCourse.id) {
        const updatedModules = course.modules.map(mod => ({
          ...mod,
          lessons: mod.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
          )
        }));

        const totalLessons = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
        const completedLessons = updatedModules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);
        const newProgress = Math.round((completedLessons / totalLessons) * 100);

        const updatedCourse = { ...course, modules: updatedModules, progress: newProgress };
        setSelectedCourse(updatedCourse);
        
        if (activeLesson?.id === lessonId) {
          setActiveLesson(updatedCourse.modules.flatMap(m => m.lessons).find(l => l.id === lessonId) || null);
        }

        return updatedCourse;
      }
      return course;
    });

    setLocalCourseData(updatedCourses);
    showToast("Node Mastery Synchronized", "success");
  };

  const isGraduated = selectedCourse?.progress === 100;

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
                               {lesson.type === 'video' ? <Play size={12} /> : lesson.type === 'quiz' ? <Trophy size={12} /> : lesson.type === 'practical' ? <Activity size={12} /> : <Book size={12} />}
                            </button>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </aside>

            <main className="flex-1 bg-black overflow-y-auto custom-scrollbar relative">
               <AnimatePresence mode="wait">
                  {isGraduated ? (
                    <GraduationPortal course={selectedCourse} onExit={() => setSelectedCourse(null)} />
                  ) : activeLesson ? (
                    <motion.div key={activeLesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto p-20 space-y-12">
                       <div className="flex items-center justify-between border-b border-white/5 pb-10">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/40"><Camera size={28} /></div>
                            <div>
                               <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] block">NODE {activeLesson.id.replace('l','')}</span>
                               <h1 className="font-embroidery text-6xl text-white italic leading-none">{activeLesson.title}</h1>
                            </div>
                          </div>
                          <div className="flex gap-2">
                             <button onClick={() => showToast("Content Bookmarked", "info")} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-red-600 transition-colors"><Bookmark size={20}/></button>
                             <button onClick={() => showToast("Sharing Academy Node...", "info")} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-red-600 transition-colors"><Share2 size={20}/></button>
                          </div>
                       </div>
                       <div className="text-gray-300 font-medium">
                          <LessonController lesson={activeLesson} onComplete={() => handleLessonComplete(activeLesson.id)} />
                       </div>
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

// --- CORE FEATURE COMPONENTS ---

const LessonController = ({ lesson, onComplete }: { lesson: Lesson, onComplete: () => void }) => {
  if (lesson.id === 'l1' || lesson.id === 'l30') return <ReadingNode lesson={lesson} onComplete={onComplete} />;
  if (lesson.type === 'video') return <VideoNode lesson={lesson} onComplete={onComplete} />;
  if (lesson.type === 'quiz') return <QuizNode lesson={lesson} onComplete={onComplete} />;
  if (lesson.type === 'practical') return <PracticalNode lesson={lesson} onComplete={onComplete} />;
  
  return null;
};

const ReadingNode = ({ lesson, onComplete }: any) => (
  <div className="space-y-12 pb-20">
    <div className="space-y-6">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-white">I. The Philosophy of the Lens</h2>
      <p className="text-lg leading-relaxed text-gray-400 uppercase">
        Photography is more than just pressing a button; it is the art of "writing with light." Derived from the Greek words <i>phos</i> (light) and <i>graphē</i> (drawing), photography is a universal language. In the context of East Africa, photography serves as a tool for preservation and progress.
      </p>
    </div>
    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 space-y-8">
       <h3 className="font-embroidery text-4xl italic text-white">The Decisive Moment</h3>
       <p className="text-lg leading-relaxed text-gray-400 italic">"To take a photograph is to align the head, the eye and the heart. It's a way of life." — Henri Cartier-Bresson</p>
    </div>
    <button 
      onClick={onComplete}
      className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${lesson?.isCompleted ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-600 text-white shadow-xl hover:bg-black'}`}
    >
      {lesson?.isCompleted ? <CheckCircle size={20} /> : <Zap size={20} />}
      {lesson?.isCompleted ? 'MASTERY VERIFIED' : 'MARK READING AS COMPLETE'}
    </button>
  </div>
);

const VideoNode = ({ lesson, onComplete }: any) => {
  const [isWatching, setIsWatching] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isWatching && watchProgress < 100) {
      interval = setInterval(() => {
        setWatchProgress(prev => Math.min(prev + 1, 100));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isWatching, watchProgress]);

  return (
    <div className="space-y-12">
      <div className="relative aspect-video rounded-[3rem] bg-[#111] border border-white/5 overflow-hidden group shadow-2xl">
         {!isWatching ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10">
              <button onClick={() => setIsWatching(true)} className="p-10 bg-red-600 rounded-full text-white shadow-2xl hover:scale-110 transition-transform">
                <Play size={40} fill="currentColor" />
              </button>
              <p className="mt-6 font-black uppercase text-xs tracking-widest text-gray-400">Initialize Academy Stream</p>
           </div>
         ) : (
           <div className="w-full h-full bg-black relative flex items-center justify-center">
              <div className="text-center space-y-4">
                 <Loader2 size={48} className="animate-spin text-red-600 mx-auto" />
                 <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Streaming Node {lesson.id}</span>
              </div>
           </div>
         )}
         <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/5">
            <motion.div animate={{ width: `${watchProgress}%` }} className="h-full bg-red-600" />
         </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-3xl font-black uppercase tracking-tighter">Verified Visual Stream</h3>
        <p className="text-gray-400 font-medium leading-relaxed uppercase">
          {lesson.title}: Regional technique demonstration for high-speed synchronization.
        </p>
        <button 
          disabled={watchProgress < 100}
          onClick={onComplete}
          className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${lesson?.isCompleted ? 'bg-green-500/10 text-green-500' : watchProgress === 100 ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
        >
          {lesson?.isCompleted ? <CheckCircle size={20} /> : <Zap size={20} />}
          {lesson?.isCompleted ? 'MASTERY VERIFIED' : watchProgress === 100 ? 'SYNCHRONIZE NODE' : `WATCHING: ${watchProgress}%`}
        </button>
      </div>
    </div>
  );
};

const QuizNode = ({ lesson, onComplete }: any) => {
  const quiz = MOCK_QUIZ_DATA[lesson.id];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [failed, setFailed] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleAnswer = (idx: number) => {
    if (idx === quiz.questions[currentIdx].correct) {
      const next = currentIdx + 1;
      if (next < quiz.questions.length) {
        setCurrentIdx(next);
      } else {
        setComplete(true);
      }
    } else {
      setFailed(true);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setFailed(false);
    setComplete(false);
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-12 min-h-[400px] flex flex-col">
         <AnimatePresence mode="wait">
           {failed ? (
             <motion.div key="fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <ZapOff size={64} className="text-red-600 animate-pulse" />
                <h3 className="font-embroidery text-5xl text-white italic">KNOWLEDGE GAP <br/> DETECTED</h3>
                <button onClick={reset} className="px-12 py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Re-Calibrate</button>
             </motion.div>
           ) : complete ? (
             <motion.div key="win" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="w-24 h-24 bg-green-500 rounded-[2rem] flex items-center justify-center shadow-2xl animate-bounce">
                   <ShieldCheck size={48} className="text-white" />
                </div>
                <h3 className="font-embroidery text-5xl text-white italic">SYNCHRONIZATION <br/> COMPLETE</h3>
                <button onClick={onComplete} className="w-full py-6 bg-red-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl">PROCEED TO NEXT NODE</button>
             </motion.div>
           ) : (
             <motion.div key="q" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
                   <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white leading-tight tracking-tighter">
                   {quiz.questions[currentIdx].q}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                   {quiz.questions[currentIdx].options.map((opt: string, i: number) => (
                     <button 
                       key={i} 
                       onClick={() => handleAnswer(i)}
                       className="p-6 bg-white/5 border border-white/10 rounded-[1.8rem] text-left hover:bg-white hover:text-black transition-all font-bold text-sm uppercase tracking-tight"
                     >
                       {opt}
                     </button>
                   ))}
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
};

const PracticalNode = ({ lesson, onComplete }: any) => {
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    setFeedback(null);
    
    // Simulate Gemini Vision Analysis
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // In a real app, we'd send the actual image bytes here.
      // We simulate the response for the demo UX.
      setTimeout(() => {
        setUploading(false);
        setFeedback("AI ANALYSIS: Composition follows the Golden Ratio. Lighting shows good dynamic range in highlights. Color correction node matches regional 'Nairobi Afternoon' profile.");
        setSuccess(true);
      }, 3500);
    } catch (e) {
      setUploading(false);
      setSuccess(true);
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-16 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
         <div className="relative z-10">
           {success ? (
             <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                   <CheckCircle size={40} className="text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-left max-w-md mx-auto">
                   <div className="flex items-center gap-2 mb-4 text-red-600">
                      <BrainCircuit size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Neural Feedback Node</span>
                   </div>
                   <p className="text-sm font-medium leading-relaxed text-gray-300 italic">"{feedback}"</p>
                </div>
                <button onClick={onComplete} className="px-12 py-5 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">SYNCHRONIZE MASTERY</button>
             </motion.div>
           ) : uploading ? (
             <div className="space-y-6">
                <Loader2 size={64} className="animate-spin text-red-600 mx-auto" />
                <h3 className="font-embroidery text-4xl italic text-white uppercase tracking-tighter">ANALYZING PIXELS...</h3>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Running Neural Composition Check</p>
             </div>
           ) : (
             <div className="space-y-8">
                <div className="w-24 h-24 bg-red-600/10 border border-red-600/20 rounded-[2.5rem] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                   <Upload size={48} className="text-red-600" />
                </div>
                <h3 className="font-embroidery text-4xl italic text-white uppercase">SUBMIT PRACTICAL ASSET</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase max-w-xs mx-auto">
                   Assignment: {lesson.title}. <br/> Upload your uncompressed RAW/JPEG for AI-powered composition review.
                </p>
                <button onClick={handleUpload} className="px-12 py-5 bg-red-600 text-white font-black rounded-[2rem] text-[10px] uppercase tracking-widest shadow-2xl hover:bg-white hover:text-black transition-all">Select Local Archive</button>
             </div>
           )}
         </div>
         <Fingerprint size={250} className="absolute -bottom-20 -right-20 opacity-[0.02] text-red-600" />
      </div>
    </div>
  );
};

const GraduationPortal = ({ course, onExit }: any) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      useToastStore.getState().showToast("Regional Archive Diploma Saved", "success");
    }, 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center p-20 text-center space-y-12">
       <div className="relative">
          <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-20 animate-pulse" />
          <div className="w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center shadow-2xl relative z-10">
             <GraduationCap size={80} className="text-red-600" />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute -inset-6 border-2 border-dashed border-red-600/30 rounded-full" />
       </div>

       <div className="space-y-6 relative z-10">
          <h1 className="font-embroidery text-7xl md:text-[10rem] italic leading-none text-white uppercase">ACADEMY <br/><span className="text-red-600">COMPLETE</span></h1>
          <p className="text-2xl text-gray-400 font-medium leading-relaxed uppercase tracking-widest max-w-2xl mx-auto">
            You are now a verified archival node in the East African media network.
          </p>
       </div>

       {/* DIPLOMA PREVIEW */}
       <div className="mt-12 w-full max-w-2xl aspect-[1.414/1] bg-white text-black rounded-xl p-16 flex flex-col items-center justify-between border-8 border-red-600 relative group shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="w-full flex justify-between items-start">
             <div className="bg-red-600 p-4 rounded-2xl text-white"><Camera size={32}/></div>
             <div className="text-right flex flex-col items-end">
                <QrCode size={80} className="opacity-80 mb-2" />
                <span className="text-[8px] font-black uppercase text-gray-400">Scan to Verify Identity Node</span>
             </div>
          </div>
          <div className="text-center space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-600">Official Certification of Mastery</span>
             <h4 className="font-embroidery text-6xl uppercase italic tracking-tighter">ZANGU CERTIFIED PRO</h4>
             <p className="font-serif text-xl italic opacity-70">This verifies that the recipient has mastered the technical <br/> and philosophical fundamentals of regional media archiving.</p>
          </div>
          <div className="w-full flex justify-between items-end border-t-2 border-gray-200 pt-8">
             <div className="text-left">
                <span className="block text-[8px] font-black uppercase text-gray-400">Registry ID</span>
                <span className="text-[12px] font-bold">PZ-NODE-2025-ALPHA-911</span>
             </div>
             <div className="text-right">
                <span className="block text-[8px] font-black uppercase text-gray-400">Issued Date</span>
                <span className="text-[12px] font-bold uppercase">{new Date().toLocaleDateString()}</span>
             </div>
          </div>
       </div>

       <div className="flex gap-6 relative z-10 pt-10">
          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="px-16 py-6 bg-red-600 text-white font-black rounded-full shadow-2xl shadow-red-900/50 flex items-center gap-4 hover:bg-white hover:text-red-600 transition-all text-xs uppercase tracking-widest"
          >
             {downloading ? <Loader2 className="animate-spin" /> : <Download />}
             {downloading ? 'SYNCING ARCHIVE...' : 'SAVE TO SYSTEM GALLERY'}
          </button>
          <button onClick={onExit} className="px-16 py-6 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
             EXIT ACADEMY HUB
          </button>
       </div>
    </motion.div>
  );
};

export default Learn;