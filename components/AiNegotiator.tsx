
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Send, Cpu, Scale, 
  AlertCircle, ShieldCheck, Zap, 
  MessageSquare, History, DollarSign,
  TrendingUp, Loader2, ArrowRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Photo, UserProfile } from '../types';
import { useToastStore } from '../store/useAppStore';

interface Message {
  role: 'agent' | 'user' | 'system';
  text: string;
}

interface AiNegotiatorProps {
  photo: Photo;
  user: UserProfile;
  onClose: () => void;
}

const AiNegotiator: React.FC<AiNegotiatorProps> = ({ photo, user, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: 'DEAL ROOM INITIALIZED: AI-NEGOTIATOR NODE ACTIVE.' },
    { role: 'agent', text: `Welcome to the Secure Deal Room. I am the Gemini-based Arbitrator. You are negotiating for exclusive rights to "${photo.title}" by ${photo.photographer}. Current base price is KES ${photo.price}. What is your opening offer?` }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [dealSentiment, setDealSentiment] = useState(50);
  const scrollRef = useRef<HTMLDivElement>(null);
  const showToast = useToastStore(s => s.showToast);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNegotiate = async () => {
    if (!input.trim() || isThinking) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a high-stakes photography talent agent. 
        A media house editor is negotiating for "Exclusive Editorial Rights" to an image titled "${photo.title}".
        Photographer: ${photo.photographer}.
        Current Base: KES ${photo.price}.
        The user says: "${userMsg}".
        History: ${messages.map(m => m.text).join('\n')}
        Respond as a professional negotiator. Be firm but fair. 
        If the offer is too low, explain why based on current market trends.
        If it's good, suggest a final closing price.
        Keep it under 60 words. 
        Start response with sentiment value (0-100) then | then your response.`
      });

      const fullText = response.text || "50|Protocol buffer error. Re-negotiating link...";
      const [sentiment, ...msgParts] = fullText.split('|');
      setDealSentiment(parseInt(sentiment) || 50);
      setMessages(prev => [...prev, { role: 'agent', text: msgParts.join('|').trim() }]);
    } catch (e) {
      showToast("Neural link unstable. Retry offer.", "error");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-2xl"
    >
      <div className="w-full max-w-4xl h-[80vh] bg-[#0a0a0a] border-2 border-white/5 rounded-[3.5rem] shadow-[0_0_100px_rgba(227,30,36,0.15)] flex flex-col overflow-hidden relative">
        {/* TELEMETRY OVERLAY */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
           <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-1/3 h-full bg-red-600 shadow-[0_0_20px_red]"
           />
        </div>

        {/* HEADER */}
        <header className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                 <Bot size={32} />
              </div>
              <div>
                 <h2 className="font-embroidery text-3xl italic uppercase tracking-tighter">THE DEAL <span className="text-red-600">ROOM</span></h2>
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={10} className="text-yellow-500" /> SECURE AI ARBITRATION NODE
                 </p>
              </div>
           </div>
           <button onClick={onClose} className="p-4 bg-white/5 rounded-full hover:bg-red-600 transition-all">
             <X size={24} />
           </button>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
           {/* DEAL HUD (LEFT) */}
           <aside className="w-full lg:w-72 bg-black border-r border-white/5 p-8 space-y-10">
              <div>
                 <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-4">Deal Sentiment</span>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${dealSentiment}%`, backgroundColor: dealSentiment > 70 ? '#22c55e' : dealSentiment > 40 ? '#f59e0b' : '#ef4444' }}
                      className="h-full" 
                    />
                 </div>
                 <div className="flex justify-between mt-2 text-[8px] font-black uppercase text-gray-600">
                    <span>Hostile</span>
                    <span>Closing</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <HudStat label="Photographer" val={photo.photographer} />
                 <HudStat label="Base Value" val={`KES ${photo.price}`} />
                 <HudStat label="Rights" val="Exclusive Editorial" />
              </div>

              <div className="pt-10 border-t border-white/5">
                 <div className="p-4 bg-red-600/5 rounded-2xl border border-red-600/20">
                    <History size={16} className="text-red-600 mb-2" />
                    <p className="text-[9px] font-medium text-gray-400 leading-relaxed uppercase">
                      Gemini analyzes 14,000+ regional news transactions to provide fair market guidance.
                    </p>
                 </div>
              </div>
           </aside>

           {/* CHAT INTERFACE (RIGHT) */}
           <div className="flex-1 flex flex-col bg-[#050505] p-8 overflow-hidden">
              <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-6 mb-8 pr-4">
                 {messages.map((m, i) => (
                   <motion.div 
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                      <div className={`max-w-[80%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                        m.role === 'agent' ? 'bg-white/5 text-gray-200 border border-white/10' :
                        m.role === 'system' ? 'bg-red-600/10 text-red-600 text-[10px] font-black uppercase tracking-widest' :
                        'bg-red-600 text-white shadow-xl'
                      }`}>
                         {m.text}
                      </div>
                   </motion.div>
                 ))}
                 {isThinking && (
                   <div className="flex gap-2 p-2">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-75" />
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-150" />
                   </div>
                 )}
              </div>

              <div className="relative group">
                 <input 
                   type="text" 
                   value={input}
                   onChange={e => setInput(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleNegotiate()}
                   placeholder="Submit Counter Offer (e.g. KES 15,000)..."
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pr-20 outline-none focus:border-red-600 transition-all font-bold text-xs uppercase tracking-widest text-white"
                 />
                 <button 
                  onClick={handleNegotiate}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-red-600 text-white rounded-xl hover:bg-white hover:text-red-600 transition-all"
                 >
                   <Send size={20} />
                 </button>
              </div>
           </div>
        </div>

        <footer className="p-6 bg-black border-t border-white/5 flex items-center justify-center gap-3">
           <ShieldCheck size={16} className="text-green-500" />
           <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
             Negotiations are binding upon "Accept" handshake. KRA-compliant invoicing active.
           </span>
        </footer>
      </div>
    </motion.div>
  );
};

const HudStat = ({label, val}: any) => (
  <div>
     <span className="block text-[8px] font-black text-gray-500 uppercase mb-1">{label}</span>
     <span className="text-xs font-bold text-white uppercase">{val}</span>
  </div>
);

export default AiNegotiator;
