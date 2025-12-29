import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useToastStore } from '../store/useAppStore';

const GlobalToast: React.FC = () => {
  const { message, type, isVisible, hideToast } = useToastStore();

  const icons = {
    success: <CheckCircle className="text-green-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-6"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 text-white">
            <div className="shrink-0">{icons[type]}</div>
            <p className="flex-1 text-[10px] font-black uppercase tracking-widest">{message}</p>
            <button onClick={hideToast} className="p-1 hover:bg-white/10 rounded-lg text-gray-500">
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalToast;