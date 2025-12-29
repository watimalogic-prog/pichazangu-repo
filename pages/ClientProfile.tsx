
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// DO add comment above each fix.
// Fixed missing 'ShieldCheck' import from lucide-react.
import { 
  History, CreditCard, Settings, Download, Briefcase, Heart, 
  Bell, MessageSquare, MapPin, Calendar, CheckCircle, 
  ChevronRight, ArrowRight, UserCheck, Smartphone, FileText, Gift,
  Wallet, Shield, Database, Trash2, FileOutput, Key, ShieldCheck
} from 'lucide-react';
import { MOCK_PHOTOS, MOCK_GIGS, CURRENCY_SYMBOLS } from '../constants';
import VerificationBadge from '../components/VerificationBadge';
import { getPrivacyClause } from '../services/taxService';

const ClientProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'gigs' | 'wishlist' | 'compliance'>('history');

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-embroidery text-3xl italic">PURCHASE HISTORY</h2>
        <div className="flex gap-2">
           <button className="text-[10px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-4 py-2 rounded-xl">Download All KRA Receipts</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {MOCK_PHOTOS.map((photo) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={photo.id} 
            className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl group hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                <img src={photo.url} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{photo.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Photographer: {photo.photographer}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">30-Year Archive Active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 p-4 bg-gray-50 text-gray-900 hover:bg-gray-100 rounded-2xl transition-all">
                  <FileText size={18} /> <span className="text-xs font-black uppercase tracking-widest">Tax Doc</span>
               </button>
               <button className="p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all">
                  <Download size={20} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-embroidery text-3xl italic uppercase">Data Sovereignty</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">NDPA Compliance & Regional Tax Identity</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100">
             <Shield size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">GDPR / NDPA Compliant</span>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <Smartphone size={20} className="text-red-600" />
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest">Tax Identification</h4>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">KRA PIN (Kenya)</span>
                   <span className="text-sm font-mono font-bold text-gray-800">A001928374P</span>
                </div>
                <button className="w-full text-[9px] font-black text-red-600 uppercase tracking-widest hover:underline text-left px-2">Update Regional Tax Details</button>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <Database size={20} className="text-red-600" />
                <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest">Data Privacy Control</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <ComplianceBtn icon={<FileOutput/>} label="Export Data" desc="Download all logs" />
                <ComplianceBtn icon={<Trash2/>} label="Right to Erase" desc="Delete account" color="red" />
             </div>
          </div>
       </div>

       <div className="bg-gray-900 p-10 rounded-[3rem] text-white relative overflow-hidden">
          <div className="relative z-10">
             <div className="flex items-center gap-4 mb-6">
                <Key size={32} className="text-red-600" />
                <h3 className="font-embroidery text-3xl">30-YEAR ARCHIVE GUARANTEE</h3>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xl">
                This account is currently covered by the Pichazangu Master Archival Agreement. We guarantee the bit-perfect storage of your purchased high-resolution media until at least January 1st, 2055.
             </p>
             <button className="flex items-center gap-2 bg-white text-gray-900 font-black px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">
                Download Legal Contract
             </button>
          </div>
          <ShieldCheck size={180} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
       </div>
    </div>
  );

  const renderGigs = () => (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="font-embroidery text-3xl italic">EVENT GIGS</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Manage your photography bookings</p>
         </div>
         <button className="bg-red-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-red-100 flex items-center gap-2">
            <Briefcase size={18} /> POST NEW GIG
         </button>
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-red-600 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest">ACTIVE</span>
             <span className="text-[10px] font-black text-gray-400">POSTED 2 DAYS AGO</span>
          </div>
          <h3 className="font-embroidery text-4xl mb-3">Wedding Photography - Kampala</h3>
          <p className="text-gray-400 text-sm max-w-xl mb-8 leading-relaxed">
            Searching for a documentary-style photographer for a traditional wedding ceremony. 3-day event.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <MapPin size={18} className="text-red-500 mb-2" />
                <span className="block text-[10px] font-black text-gray-500 uppercase">Location</span>
                <span className="font-bold text-sm">Speke Resort</span>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <Calendar size={18} className="text-red-500 mb-2" />
                <span className="block text-[10px] font-black text-gray-500 uppercase">Event Date</span>
                <span className="font-bold text-sm">Dec 15, 2024</span>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <Wallet size={18} className="text-red-500 mb-2" />
                <span className="block text-[10px] font-black text-gray-500 uppercase">Budget</span>
                <span className="font-bold text-sm">KES 120,000</span>
             </div>
             <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <CheckCircle size={18} className="text-red-500 mb-2" />
                <span className="block text-[10px] font-black text-gray-500 uppercase">Bids</span>
                <span className="font-bold text-sm">8 Received</span>
             </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all">
             REVIEW PROPOSALS <ChevronRight size={18}/>
          </button>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <Briefcase size={200} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
      <header className="relative py-16 mb-12 flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-48 bg-gray-50 -z-10 rounded-b-[4rem]" />
        
        <div className="relative group mb-6">
          <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 border-4 border-white shadow-2xl overflow-hidden relative">
            <img src="https://i.pravatar.cc/300?u=zainab" alt="Profile" className="w-full h-full object-cover rounded-[2.2rem]" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-2.5 bg-green-500 text-white rounded-2xl shadow-lg border-4 border-white">
            <UserCheck size={20} />
          </div>
        </div>

        <h1 className="font-embroidery text-5xl text-gray-900 mb-2 italic">
          Zainab Juma <VerificationBadge type="client" size={32} />
        </h1>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
              Verified Client
           </div>
           <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Nairobi, Kenya</div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-6">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 space-y-4">
          <SidebarBtn icon={<History/>} label="History" active={activeTab==='history'} onClick={()=>setActiveTab('history')} />
          <SidebarBtn icon={<Briefcase/>} label="My Gigs" active={activeTab==='gigs'} onClick={()=>setActiveTab('gigs')} />
          <SidebarBtn icon={<Heart/>} label="Wishlist" active={activeTab==='wishlist'} onClick={()=>setActiveTab('wishlist')} />
          <SidebarBtn icon={<Shield/>} label="Compliance" active={activeTab==='compliance'} onClick={()=>setActiveTab('compliance')} />
          
          <div className="mt-12 p-8 bg-gray-900 rounded-[2.5rem] text-white overflow-hidden relative group">
             <Gift className="text-red-600 mb-4 transition-transform group-hover:scale-125 duration-500" size={32} />
             <h4 className="font-embroidery text-xl mb-1">REFER & EARN</h4>
             <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Get 10% off your next shoot by inviting friends.</p>
             <button className="w-full bg-white text-gray-900 font-black py-3 rounded-xl text-[10px] uppercase tracking-widest">Share Link</button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3">
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'gigs' && renderGigs()}
          {activeTab === 'compliance' && renderCompliance()}
          {activeTab === 'wishlist' && (
            <div className="text-center py-20 text-gray-300">
               <Heart size={48} className="mx-auto mb-4 opacity-20" />
               <p className="font-black text-xs uppercase tracking-widest">Your wishlist is empty</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarBtn = ({icon, label, active, onClick}: {icon: any, label: string, active: boolean, onClick: any}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-black text-xs uppercase tracking-widest border ${
      active 
        ? 'bg-white border-gray-100 text-red-600 shadow-xl shadow-gray-200/50 translate-x-2' 
        : 'text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon} {label}
  </button>
);

const ComplianceBtn = ({icon, label, desc, color = "gray"}: {icon: any, label: string, desc: string, color?: "red" | "gray"}) => (
  <button className={`flex flex-col items-center justify-center p-6 rounded-3xl border border-gray-100 hover:bg-gray-50 transition-all gap-2 text-center group ${color === 'red' ? 'hover:border-red-200' : ''}`}>
     <div className={`p-3 rounded-xl ${color === 'red' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400 group-hover:text-red-600 group-hover:bg-red-50'}`}>
        {icon}
     </div>
     <div className="mt-2">
        <span className={`block font-bold text-[11px] uppercase tracking-widest ${color === 'red' ? 'text-red-600' : 'text-gray-900'}`}>{label}</span>
        <span className="text-[8px] text-gray-400 font-bold uppercase">{desc}</span>
     </div>
  </button>
);

export default ClientProfile;
