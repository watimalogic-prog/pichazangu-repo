
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, PlayCircle, Star, Award, CheckCircle2, 
  ChevronRight, Lock, Users, MessageSquare, Download, 
  HardDrive, Smartphone, Video, FileText, BarChart3, 
  MapPin, Clock, Search, Filter, Info, X, Zap, 
  Sparkles, Camera, Mic, Send, Globe
} from 'lucide-react';
import { MOCK_ACADEMY_COURSES, MOCK_GRADES } from '../constants';
import { AcademyCourse, Module, Lesson, Grade } from '../types';

const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'courses' | 'grades' | 'certificates'>('roadmap');
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Focus-Mode Sidebar
  const Sidebar = () => (
    <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 p-6 flex flex-col gap-10 sticky top-16 h-[calc(100vh-4rem)]">
      <div>
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
             <BookOpen size={24} className="text-white" />
           </div>
           <div className="font-embroidery text-lg leading-none">
             ACADEMY<br/><span className="text-red-600 text-[10px] font-black uppercase">Learning Hub</span>
           </div>
        </div>

        <nav className="space-y-2">
           <SidebarBtn icon={<MapPin/>} label="Roadmap" active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} />
           <SidebarBtn icon={<Video/>} label="My Courses" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
           <SidebarBtn icon={<BarChart3/>} label="My Grades" active={activeTab === 'grades'} onClick={() => setActiveTab('grades')} />
           <SidebarBtn icon={<Award/>} label="Certificates" active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
        </nav>
      </div>

      <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
         <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Student Plan</h4>
         <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-xs text-white">B</div>
            <span className="text-xs font-bold">Basic Tier</span>
         </div>
         <button className="w-full text-[9px] font-black text-red-600 uppercase tracking-widest hover:text-white transition-colors text-left">Upgrade to Diploma</button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 -mt-6 -mx-4 md:-mx-0 flex flex-col md:flex-row font-sans selection:bg-red-600">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 p-8 md:p-12 custom-scrollbar">
         {/* Live Saturday Workshop Ticker */}
         <div className="mb-12 bg-red-600/10 border border-red-600/20 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center animate-pulse">
                  <Video size={32} className="text-white" />
               </div>
               <div>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] block mb-1">Live Workshop Tomorrow</span>
                  <h3 className="font-embroidery text-3xl italic">Low-Light Sports Practical</h3>
                  <p className="text-gray-400 text-xs mt-1">Join Ali Studio for a live shoot at Nyayo Stadium. 4PM EAT.</p>
               </div>
            </div>
            <button className="bg-red-600 text-white font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-900/40">Set Reminder</button>
         </div>

         {activeTab === 'roadmap' && <AcademyRoadmap courses={MOCK_ACADEMY_COURSES} onSelectCourse={(c) => {setSelectedCourse(c); setActiveTab('courses');}} />}
         {activeTab === 'courses' && <MyCourses courses={MOCK_ACADEMY_COURSES} onOpenLesson={(l) => {setCurrentLesson(l); setShowPlayer(true);}} />}
         {activeTab === 'grades' && <GradesDashboard grades={MOCK_GRADES} />}
         {activeTab === 'certificates' && <CertificatesPortal />}

      </main>

      {/* Course Player Overlay */}
      <AnimatePresence>
        {showPlayer && currentLesson && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
            <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <button onClick={() => setShowPlayer(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-400 hover:text-white"><X size={20}/></button>
                  <h2 className="font-embroidery text-2xl italic">{currentLesson.title}</h2>
               </div>
               <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-black uppercase hover:bg-white/10"><Download size={14}/> Download lesson</button>
                  <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                     <button className="px-3 py-1 text-[10px] font-black uppercase bg-red-600 rounded-lg">EN</button>
                     <button className="px-3 py-1 text-[10px] font-black uppercase text-gray-500">SW</button>
                  </div>
               </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
               {/* Video Area */}
               <div className="flex-1 bg-black flex items-center justify-center p-8 relative group">
                  <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden flex items-center justify-center relative">
                     <PlayCircle size={80} className="text-white/20" />
                     <div className="absolute bottom-10 left-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                           <div className="h-full bg-red-600 w-1/3" />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-500">
                           <span>04:12 / {currentLesson.duration}</span>
                           <div className="flex gap-4">
                              <span>HD</span>
                              <span>CC</span>
                              <span>Speed: 1x</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Assignments Sidebar */}
               <div className="w-80 bg-[#0a0a0a] border-l border-white/5 p-8 overflow-y-auto custom-scrollbar">
                  <h3 className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-8">Practical Assignment</h3>
                  <div className="space-y-8">
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <h4 className="font-bold text-sm mb-2">Subject: The Serengeti Morning</h4>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4 italic">"Upload 3 shots demonstrating your use of Golden Hour lighting in a regional context."</p>
                        <button className="w-full bg-red-600 text-white font-black py-3 rounded-xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-900/40">Submit Photos</button>
                     </div>
                     
                     <div className="border-t border-white/5 pt-8">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Lesson Resources</h4>
                        <div className="space-y-3">
                           <ResourceItem icon={<FileText/>} label="Lighting Study Guide (PDF)" />
                           <ResourceItem icon={<HardDrive/>} label="Raw Practice Files" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* AI TUTOR WIDGET */}
      <div className="fixed bottom-10 right-10 z-50">
         <button 
           onClick={() => setAiChatOpen(!aiChatOpen)}
           className="w-16 h-16 bg-red-600 rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 transition-all border-4 border-black group"
         >
            {aiChatOpen ? <X size={24} className="text-white" /> : <Sparkles size={24} className="text-white group-hover:animate-pulse" />}
         </button>

         <AnimatePresence>
            {aiChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                className="absolute bottom-20 right-0 w-96 bg-[#111] rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden"
              >
                 <div className="bg-red-600 p-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                       <Sparkles size={20} />
                       <h3 className="font-embroidery text-2xl italic">AI ACADEMY TUTOR</h3>
                    </div>
                    <p className="text-red-100 text-[10px] font-bold uppercase tracking-widest opacity-80">Online 24/7 • Technical Expert</p>
                 </div>
                 <div className="h-96 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                    <AiMsg text="Habari! I am your Picha Zangu AI Technical Tutor. Ask me anything about aperture, ISO, or lighting for the East African climate." isBot />
                    <AiMsg text="What is the best aperture for a night football match at Nyayo Stadium?" />
                    <AiMsg text="For a night match under stadium floodlights, I recommend an aperture of f/2.8 or wider to maximize light intake. Pair this with a shutter speed of at least 1/500s to freeze the action. Would you like to see a sample setup?" isBot />
                 </div>
                 <div className="p-6 border-t border-white/5 bg-black/40">
                    <div className="relative">
                       <input type="text" placeholder="Type your question..." className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-xs outline-none focus:border-red-600 transition-all" />
                       <button className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600 p-2"><Send size={18}/></button>
                    </div>
                 </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const AcademyRoadmap = ({ courses, onSelectCourse }: { courses: AcademyCourse[], onSelectCourse: (c: AcademyCourse) => void }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
    <header>
      <h2 className="font-embroidery text-5xl italic mb-4">CERTIFICATION <br/><span className="text-red-600">ROADMAP</span></h2>
      <p className="text-gray-400 text-sm max-w-md">The path to becoming a Picha Zangu Pro. Finish all 3 tiers to unlock priority attachment status.</p>
    </header>

    <div className="relative pt-12 space-y-24">
       {/* Roadmap vertical line */}
       <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-white/5 hidden md:block" />

       {courses.map((course, idx) => (
         <motion.div 
           key={course.id}
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className={`relative flex flex-col md:flex-row items-center gap-12 ${!course.isUnlocked ? 'opacity-40 grayscale' : ''}`}
         >
            {/* Tier Indicator Circle */}
            <div className={`w-20 h-20 rounded-[2rem] border-4 flex items-center justify-center z-10 shrink-0 ${course.isUnlocked ? 'bg-black border-red-600 text-red-600 shadow-xl shadow-red-900/40' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
               <span className="font-bungee text-2xl">{course.tier}</span>
            </div>

            <div className="flex-1 bg-white/5 border border-white/5 p-10 rounded-[3rem] group hover:border-red-600/30 transition-all relative overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">{course.durationMonths} MONTHS</span>
                    <h3 className="font-embroidery text-4xl italic mb-4 group-hover:text-red-600 transition-colors">{course.title}</h3>
                  </div>
                  {course.progress > 0 && (
                    <div className="bg-red-600/20 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
                       {course.progress}% Completed
                    </div>
                  )}
               </div>
               <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">{course.description}</p>
               
               <div className="flex items-center gap-6">
                  {course.isUnlocked ? (
                    <button onClick={() => onSelectCourse(course)} className="bg-red-600 text-white font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-all">
                       Continue Learning <ChevronRight size={14}/>
                    </button>
                  ) : (
                    <button className="bg-white/5 text-gray-500 font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest flex items-center gap-2 cursor-not-allowed">
                       <Lock size={14}/> Locked Tier
                    </button>
                  )}
                  <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">
                     {course.tier === 1 ? 'Fundamentals' : course.tier === 2 ? 'Specialist' : 'Business'}
                  </span>
               </div>
            </div>
         </motion.div>
       ))}
    </div>
  </div>
);

const MyCourses = ({ courses, onOpenLesson }: { courses: AcademyCourse[], onOpenLesson: (l: Lesson) => void }) => (
  <div className="space-y-12 animate-in slide-in-from-right duration-700">
     <h2 className="font-embroidery text-5xl italic mb-10">MY <span className="text-red-600">COURSES</span></h2>
     
     {courses.filter(c => c.isUnlocked).map(course => (
       <div key={course.id} className="space-y-8">
          <div className="flex items-center justify-between">
             <h3 className="font-embroidery text-3xl italic text-red-600">{course.title}</h3>
             <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{course.modules.length} Modules</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {course.modules.map(module => (
                <div key={module.id} className="bg-white/5 rounded-[2.5rem] border border-white/5 overflow-hidden">
                   <div className="p-8 border-b border-white/5 flex items-center justify-between">
                      <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400">{module.title}</h4>
                      <CheckCircle2 size={16} className="text-green-500" />
                   </div>
                   <div className="p-2 space-y-1">
                      {module.lessons.map(lesson => (
                         <button 
                           key={lesson.id}
                           onClick={() => onOpenLesson(lesson)}
                           className="w-full flex items-center justify-between p-6 rounded-2xl hover:bg-white/5 transition-all group"
                         >
                            <div className="flex items-center gap-6">
                               <div className={`p-3 rounded-xl ${lesson.isCompleted ? 'bg-green-500/10 text-green-500' : 'bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all'}`}>
                                  {lesson.type === 'video' ? <PlayCircle size={20}/> : lesson.type === 'quiz' ? <FileText size={20}/> : <Camera size={20}/>}
                               </div>
                               <div className="text-left">
                                  <span className="block font-bold text-sm mb-0.5">{lesson.title}</span>
                                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{lesson.duration} • {lesson.type}</span>
                               </div>
                            </div>
                            {lesson.isCompleted && (
                               <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">Finished</div>
                            )}
                         </button>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>
     ))}
  </div>
);

const GradesDashboard = ({ grades }: { grades: Grade[] }) => (
  <div className="space-y-12 animate-in fade-in duration-700">
     <h2 className="font-embroidery text-5xl italic mb-10">MY <span className="text-red-600">GRADES</span></h2>
     <div className="grid grid-cols-1 gap-6">
        {grades.map(grade => (
           <div key={grade.id} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 hover:border-red-600/30 transition-all flex flex-col md:flex-row gap-10">
              <div className="w-24 h-24 rounded-[2rem] border-4 border-red-600 flex flex-col items-center justify-center shrink-0 shadow-2xl shadow-red-900/20">
                 <span className="font-bungee text-3xl">{grade.score}</span>
                 <span className="text-[10px] font-black text-red-600 uppercase">Score</span>
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="font-embroidery text-3xl italic">{grade.assignmentName}</h3>
                    <span className="text-[10px] font-black text-gray-500 uppercase">{grade.date}</span>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{grade.feedback}"</p>
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center">
                       <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Graded by {grade.gradedBy}</span>
                 </div>
              </div>
           </div>
        ))}
     </div>
  </div>
);

const CertificatesPortal = () => (
  <div className="text-center py-20 animate-in zoom-in duration-700">
     <div className="relative inline-block mb-12">
        <div className="w-48 h-48 rounded-full border-4 border-white/10 border-dashed animate-spin duration-10000 flex items-center justify-center" />
        <Award size={64} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
     </div>
     <h2 className="font-embroidery text-6xl italic mb-6 leading-none">THE ROAD TO <br/><span className="text-red-600">GRADUATION</span></h2>
     <p className="text-gray-400 text-sm max-w-md mx-auto mb-12 leading-relaxed">
        Your Tier 1 Certificate will be generated automatically once you reach 100% progress in Visual Fundamentals.
     </p>
     <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-left group hover:bg-red-600/5 transition-all">
           <Smartphone className="text-red-600 mb-4" />
           <h4 className="font-bold text-sm mb-1">Gear Discount</h4>
           <p className="text-[10px] text-gray-500 uppercase">20% Off Rental Market</p>
        </button>
        <button className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] text-left group hover:bg-red-600/5 transition-all">
           <Users className="text-red-600 mb-4" />
           <h4 className="font-bold text-sm mb-1">Peer Review</h4>
           <p className="text-[10px] text-gray-500 uppercase">Unlock your next grade</p>
        </button>
     </div>
  </div>
);

const SidebarBtn = ({icon, label, active, onClick}: {icon: any, label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest border ${
      active 
        ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-900/40' 
        : 'text-gray-500 border-transparent hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

const ResourceItem = ({icon, label}: {icon: any, label: string}) => (
  <button className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all text-left">
     <div className="text-red-600">{icon}</div>
     <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

const AiMsg = ({ text, isBot }: { text: string, isBot?: boolean }) => (
  <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
     <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed ${isBot ? 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-none' : 'bg-red-600 text-white rounded-tr-none shadow-xl shadow-red-900/20'}`}>
        {text}
     </div>
     <span className="text-[8px] font-black uppercase text-gray-600 mt-2 tracking-widest">{isBot ? 'Academy Tutor' : 'Me'}</span>
  </div>
);

export default Learn;
