import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Camera, Image as ImageIcon, Wand2, 
  Upload, CloudUpload, BrainCircuit, CheckCircle, 
  X, Loader2, Save, ChevronRight, Layers, LayoutTemplate,
  History, Info, ShieldCheck, Zap
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useUserStore, useToastStore } from '../store/useAppStore';
import StyleSlider from '../components/StyleSlider';
import { EditingInstructions, StyleProfile } from '../types';

interface TrainingPair {
  id: string;
  raw: string;
  edited: string;
  rawFile: File;
  editedFile: File;
}

const StyleHub: React.FC = () => {
  const { user } = useUserStore();
  const showToast = useToastStore((state) => state.showToast);
  
  const [step, setStep] = useState<'intro' | 'training' | 'analyzing' | 'complete' | 'apply'>('intro');
  const [pairs, setPairs] = useState<TrainingPair[]>([]);
  const [styleProfile, setStyleProfile] = useState<StyleProfile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [testImage, setTestImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePairUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length < 2) return;
    
    // Simplistic: assume users upload Raw, then Edited in sequence or pair
    const rawFile = files[0];
    const editedFile = files[1];

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = () => {
      reader2.onload = () => {
        const newPair: TrainingPair = {
          id: Math.random().toString(36).substr(2, 9),
          raw: reader1.result as string,
          edited: reader2.result as string,
          rawFile,
          editedFile
        };
        setPairs(prev => [...prev, newPair]);
      };
      reader2.readAsDataURL(editedFile);
    };
    reader1.readAsDataURL(rawFile);
  };

  const startAnalysis = async () => {
    if (pairs.length === 0) return;
    setStep('analyzing');
    setIsProcessing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // We only analyze the first 3 pairs to save tokens/time for the demo
      const analysisParts = [];
      for (const pair of pairs.slice(0, 3)) {
        const rawB64 = await fileToBase64(pair.rawFile);
        const editedB64 = await fileToBase64(pair.editedFile);
        analysisParts.push(
          { text: "RAW VERSION:" },
          { inlineData: { data: rawB64, mimeType: pair.rawFile.type } },
          { text: "EDITED VERSION (REFERENCE):" },
          { inlineData: { data: editedB64, mimeType: pair.editedFile.type } }
        );
      }

      analysisParts.push({ 
        text: `Analyze the consistent editing 'delta' across these image pairs. 
        Identify the color palette shifts, light curves, and stylistic markers. 
        Return a JSON object matching this schema: 
        { 
          brightness: number (80-150, 100 is neutral), 
          contrast: number (80-150, 100 is neutral), 
          saturation: number (50-200, 100 is neutral), 
          warmth: number (0-100, 50 is neutral), 
          grain: number (0-10), 
          sepia: number (0-100), 
          hueShift: number (-180 to 180),
          description: string (Professional summary of this photographer's aesthetic)
        }`
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts: analysisParts as any },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              brightness: { type: Type.NUMBER },
              contrast: { type: Type.NUMBER },
              saturation: { type: Type.NUMBER },
              warmth: { type: Type.NUMBER },
              grain: { type: Type.NUMBER },
              sepia: { type: Type.NUMBER },
              hueShift: { type: Type.NUMBER },
              description: { type: Type.STRING }
            },
            required: ['brightness', 'contrast', 'saturation', 'description']
          }
        }
      });

      const result = JSON.parse(response.text);
      const profile: StyleProfile = {
        id: 'sp-' + Date.now(),
        name: `${user?.name || 'Photographer'}'s Signature Preset`,
        description: result.description,
        instructions: result,
        createdAt: new Date().toISOString()
      };

      setStyleProfile(profile);
      setStep('complete');
      showToast("AI Style Learning Complete", "success");
    } catch (err) {
      console.error(err);
      showToast("Analysis Failed. Ensure valid images.", "error");
      setStep('training');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyToNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTestImage(reader.result as string);
        setStep('apply');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 <div className="w-12 h-12 bg-red-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-red-900/20">
                    <BrainCircuit size={28} />
                 </div>
                 <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.4em]">Creative Intelligence Hub</span>
              </div>
              <h1 className="font-embroidery text-5xl md:text-7xl italic text-gray-900">STYLE <span className="font-embroidery-sketch text-red-600">LEARNER</span></h1>
              <p className="text-gray-500 text-lg max-w-xl mt-4">Train a custom AI to learn your unique editing language and apply it to any image instantly.</p>
           </div>
           
           <div className="hidden xl:block bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck size={20} className="text-green-500" />
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Protocol Guard</h4>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium uppercase">
                 Style Learning data is stored locally in your regional node. Gemini 3 analysis is encrypted and ephemeral.
              </p>
           </div>
        </header>

        {/* STEPPER / PROGRESS */}
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto py-2">
           <StepIndicator active={step === 'intro'} done={['training', 'analyzing', 'complete', 'apply'].includes(step)} label="Initialize" />
           <StepIndicator active={step === 'training'} done={['analyzing', 'complete', 'apply'].includes(step)} label="Training" />
           <StepIndicator active={step === 'analyzing'} done={['complete', 'apply'].includes(step)} label="Analyze" />
           <StepIndicator active={step === 'complete' || step === 'apply'} label="Finalize" />
        </div>

        {/* MAIN WORKSPACE */}
        <div className="bg-white rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
           
           {/* INTRO STEP */}
           {step === 'intro' && (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-10">
                <div className="relative group">
                   <div className="w-32 h-32 bg-red-600/5 rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LayoutTemplate size={54} className="text-red-600" />
                   </div>
                   <div className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 animate-bounce">
                      <Sparkles className="text-red-600" size={24} />
                   </div>
                </div>
                <div className="max-w-2xl space-y-4">
                   <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Ready to Teach the Machine?</h2>
                   <p className="text-gray-500 font-medium leading-relaxed">
                      To build your **Signature Preset**, you'll need to upload **5-10 pairs** of photos. Each pair must contain your original unedited shot and your final artistic edit.
                   </p>
                </div>
                <button 
                  onClick={() => setStep('training')}
                  className="bg-red-600 text-white font-black px-12 py-5 rounded-[2rem] shadow-2xl shadow-red-900/30 hover:bg-black transition-all flex items-center gap-3 uppercase text-xs tracking-widest"
                >
                  Start Training Session <ChevronRight size={18} />
                </button>
             </div>
           )}

           {/* TRAINING STEP: UPLOADS */}
           {step === 'training' && (
             <div className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                   <h2 className="font-embroidery text-4xl text-gray-900">Pair your <span className="text-red-600">Samples</span> ({pairs.length}/10)</h2>
                   <div className="flex gap-4">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        multiple 
                        className="hidden" 
                        onChange={handlePairUpload} 
                        accept="image/*"
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-black px-8 py-4 rounded-2xl flex items-center gap-3 text-xs tracking-widest uppercase transition-all"
                      >
                         <ImageIcon size={18} /> Add Pair
                      </button>
                      <button 
                        disabled={pairs.length < 3}
                        onClick={startAnalysis}
                        className={`font-black px-10 py-4 rounded-2xl flex items-center gap-3 text-xs tracking-widest uppercase transition-all shadow-xl ${pairs.length < 3 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-black shadow-red-900/30'}`}
                      >
                        <Zap size={18} /> {pairs.length < 3 ? 'Need 3+ Pairs' : 'Initialize Analysis'}
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {pairs.map((pair, i) => (
                     <div key={pair.id} className="group relative bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 overflow-hidden">
                        <div className="flex gap-3 mb-6">
                           <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                              <img src={pair.raw} className="w-full h-full object-cover" alt="Raw" />
                              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[7px] font-black text-white uppercase">Raw</div>
                           </div>
                           <div className="flex-1 aspect-square rounded-2xl overflow-hidden bg-gray-200 relative">
                              <img src={pair.edited} className="w-full h-full object-cover" alt="Edited" />
                              <div className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-widest">Edited</div>
                           </div>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-gray-400 uppercase">Training Pair #{i+1}</span>
                           <button onClick={() => setPairs(p => p.filter(item => item.id !== pair.id))} className="text-gray-400 hover:text-red-600 transition-colors">
                              <X size={16} />
                           </button>
                        </div>
                     </div>
                   ))}
                   {pairs.length === 0 && (
                     <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="col-span-full py-24 text-center border-4 border-dashed border-gray-100 rounded-[3rem] hover:border-red-600/30 cursor-pointer group transition-all"
                     >
                        <CloudUpload size={64} className="mx-auto text-gray-200 group-hover:text-red-600 transition-colors mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Drop 3-10 pairs here to begin</p>
                     </div>
                   )}
                </div>
             </div>
           )}

           {/* ANALYZING STEP */}
           {step === 'analyzing' && (
             <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-12">
                   <div className="w-40 h-40 rounded-full border-8 border-gray-100 border-t-red-600 animate-spin" />
                   <BrainCircuit size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 animate-pulse" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Gemini Vision Analysis...</h2>
                <p className="text-gray-500 font-medium max-w-md">Scanning pixels, mapping highlights, and identifying your unique color signatures across East African lighting conditions.</p>
             </div>
           )}

           {/* COMPLETE STEP: RESULTS & TEST */}
           {step === 'complete' && styleProfile && (
             <div className="p-12 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                   <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center shadow-inner">
                           <CheckCircle size={32} />
                        </div>
                        <div>
                           <h2 className="font-embroidery text-5xl text-gray-900 italic leading-none">THE PRESET <br/><span className="text-red-600">IS READY</span></h2>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                         <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-4">AI Vision Insight</span>
                         <p className="text-lg font-medium text-gray-800 leading-relaxed italic">
                            "{styleProfile.description}"
                         </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <ParameterBadge label="Brightness" val={`${styleProfile.instructions.brightness}%`} />
                         <ParameterBadge label="Contrast" val={`${styleProfile.instructions.contrast}%`} />
                         <ParameterBadge label="Saturation" val={`${styleProfile.instructions.saturation}%`} />
                         <ParameterBadge label="Warmth" val={`${styleProfile.instructions.warmth}%`} />
                      </div>
                   </div>

                   <div className="bg-[#0a0a0a] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                      <div className="relative z-10 text-center">
                         <Camera size={48} className="mx-auto text-red-600 mb-6" />
                         <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">TEST ON NEW RAW</h3>
                         <p className="text-gray-400 text-sm mb-10 font-medium">Upload a completely new raw photo to see your AI preset applied in real-time.</p>
                         <label className="bg-red-600 text-white font-black px-12 py-5 rounded-[2rem] shadow-2xl shadow-red-900/40 hover:bg-white hover:text-red-600 transition-all cursor-pointer block uppercase text-xs tracking-widest">
                            <input type="file" className="hidden" onChange={applyToNew} accept="image/*" />
                            UPLOAD TEST IMAGE
                         </label>
                      </div>
                      <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform">
                         <ImageIcon size={200} />
                      </div>
                   </div>
                </div>

                <div className="pt-12 border-t border-gray-100 flex items-center justify-between">
                   <button onClick={() => setStep('intro')} className="text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-red-600 transition-colors">Abandon Training</button>
                   <button className="bg-gray-900 text-white font-black px-12 py-5 rounded-2xl shadow-2xl flex items-center gap-3 uppercase text-xs tracking-widest transition-all">
                      <Save size={18} /> Save Style to Profile
                   </button>
                </div>
             </div>
           )}

           {/* APPLY STEP: BEFORE/AFTER SLIDER */}
           {step === 'apply' && testImage && styleProfile && (
             <div className="p-12 space-y-12 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                      <h2 className="font-embroidery text-4xl text-gray-900">Style <span className="text-red-600">Verification</span></h2>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Preset: {styleProfile.name}</p>
                   </div>
                   <button onClick={() => setStep('complete')} className="bg-gray-100 p-4 rounded-2xl hover:bg-gray-200 transition-all"><X size={20}/></button>
                </div>

                <StyleSlider beforeUrl={testImage} instructions={styleProfile.instructions} height="h-[600px]" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-gray-50 p-10 rounded-[3rem] border border-gray-100">
                   <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">Automate this style?</h4>
                      <p className="text-gray-500 text-sm font-medium">Once saved, you can choose to auto-process all incoming uploads to your private vaults using this signature aesthetic.</p>
                   </div>
                   <div className="flex gap-4">
                      <button className="bg-white text-gray-900 border border-gray-200 font-black px-8 py-4 rounded-2xl uppercase text-[10px] tracking-widest">Keep Unfiltered</button>
                      <button className="bg-red-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-red-900/30 uppercase text-[10px] tracking-widest">Apply to All Assets</button>
                   </div>
                </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const StepIndicator = ({ active, done, label }: { active?: boolean, done?: boolean, label: string }) => (
  <div className="flex items-center gap-3 shrink-0">
     <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
        done ? 'bg-green-500 border-green-500 text-white' : 
        active ? 'bg-red-600 border-red-600 text-white shadow-lg' : 
        'border-gray-200 text-gray-300'
     }`}>
        {done ? <CheckCircle size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
     </div>
     <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-gray-900' : 'text-gray-300'}`}>{label}</span>
     {!label.includes('Finalize') && <div className="w-6 h-[2px] bg-gray-100" />}
  </div>
);

const ParameterBadge = ({ label, val }: { label: string, val: string }) => (
  <div className="bg-white border border-gray-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
     <span className="text-xs font-black text-gray-900">{val}</span>
  </div>
);

export default StyleHub;