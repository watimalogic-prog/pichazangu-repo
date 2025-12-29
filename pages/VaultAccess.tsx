
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, Lock, ArrowRight, ShieldCheck, Search } from 'lucide-react';
import { MOCK_VAULTS, MOCK_CLIENTS } from '../constants';

const VaultAccess: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'search' | 'pin'>('search');
  const [phone, setPhone] = useState('');
  const [studio, setStudio] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [foundVault, setFoundVault] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding a vault
    const vault = MOCK_VAULTS.find(v => v.photographerName.toLowerCase().includes(studio.toLowerCase()));
    if (vault) {
      setFoundVault(vault);
      setStep('pin');
      setError('');
    } else {
      setError('No vault found for this photographer/studio.');
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === foundVault.passkey) {
      navigate(`/gallery/${foundVault.id}`);
    } else {
      setError('Invalid 6-digit PIN. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-red-600 p-10 text-white text-center">
          <ShieldCheck className="mx-auto mb-4" size={48} />
          <h1 className="font-embroidery text-4xl mb-2 italic">SECURE GATEWAY</h1>
          <p className="text-red-100 text-sm font-bold uppercase tracking-widest opacity-80">Access your private media</p>
        </div>

        <div className="p-10">
          <AnimatePresence mode="wait">
            {step === 'search' ? (
              <motion.form 
                key="search"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                // Fixed duplicate opacity property by renaming it to x for horizontal exit animation
                exit={{ x: -20, opacity: 0 }}
                onSubmit={handleSearch}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Photographer / Studio</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={studio}
                      onChange={(e) => setStudio(e.target.value)}
                      placeholder="e.g. Ali Studio"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>

                {error && <p className="text-red-600 text-xs font-bold text-center">{error}</p>}

                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-100 transition-all">
                  FIND MY VAULT <ArrowRight size={20} />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="pin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePinSubmit}
                className="space-y-6 text-center"
              >
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-red-600 p-1 mb-3">
                    <img src={`https://i.pravatar.cc/150?u=${foundVault.id}`} className="w-full h-full object-cover rounded-full" alt="Studio Logo" />
                  </div>
                  <h3 className="font-embroidery text-2xl text-gray-900">{foundVault.photographerName}</h3>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PRIVATE VAULT FOUND</span>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Enter 6-Digit Passkey</label>
                  <input 
                    type="password" 
                    maxLength={6}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full text-center text-4xl tracking-[0.5em] py-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl outline-none focus:border-red-600 focus:bg-white transition-all font-bungee"
                    placeholder="••••••"
                  />
                </div>

                {error && <p className="text-red-600 text-xs font-bold">{error}</p>}

                <div className="flex flex-col gap-3">
                  <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-100 transition-all">
                    UNLOCK GALLERY <Lock size={20} />
                  </button>
                  <button type="button" onClick={() => setStep('search')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors">
                    Search Again
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VaultAccess;