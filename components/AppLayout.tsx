import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Activity, BookOpen, Briefcase, User, 
  Camera, Newspaper, Wand2, ShoppingCart, Bell, Database, LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore, useCartStore } from '../store/useAppStore';
import VerificationBadge from './VerificationBadge';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useUserStore();
  const cartItems = useCartStore((state) => state.items);

  const isLanding = location.pathname === '/';
  if (isLanding && !user) return <div className="min-h-screen bg-black">{children}</div>;

  const profilePath = user?.role === 'photographer' 
    ? '/photographer-profile' 
    : user?.role === 'media' ? '/media-house' : '/client-profile';

  const navItems = [
    { path: '/trending', label: 'Feed', icon: <TrendingUp size={24} /> },
    { path: '/stock', label: 'Market', icon: <Activity size={24} /> },
    { path: '/learn', label: 'Academy', icon: <BookOpen size={24} /> },
    { path: '/gigz', label: 'Gigz', icon: <Briefcase size={24} /> },
    { path: profilePath, label: 'Identity', icon: <User size={24} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      
      {/* --- DESKTOP SIDEBAR (Visible > 1024px) --- */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-black border-r border-white/5 z-[100] p-6 overflow-y-auto custom-scrollbar">
        <Link to="/" className="flex items-center gap-3 mb-10 group">
          <div className="bg-[#E31E24] text-white p-2 rounded-xl shadow-lg shadow-red-900/20 group-hover:rotate-12 transition-transform">
            <Camera size={20} />
          </div>
          <div className="font-embroidery text-2xl tracking-tighter uppercase italic text-white">
            PICHA<span className="text-[#E31E24]">ZANGU</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative overflow-hidden group ${
                location.pathname === item.path 
                  ? 'bg-[#E31E24] text-white shadow-xl' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              {location.pathname === item.path && (
                <motion.div layoutId="activePill" className="absolute inset-0 bg-[#E31E24] -z-0" />
              )}
            </Link>
          ))}
          
          <Link
            to="/vault-access"
            className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-[8px] font-black flex items-center justify-center text-white border-2 border-black">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Vault Cart</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
               <img src={`https://i.pravatar.cc/100?u=${user?.id}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="min-w-0">
               <div className="flex items-center gap-1">
                 <span className="text-[10px] font-black uppercase truncate">{user?.name}</span>
                 <VerificationBadge type={user?.role} size={12} />
               </div>
               <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block">v4.0.5 ACTIVE</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <LogOut size={20} /> Terminate
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP BAR (Visible < 1024px) --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-[100] px-6 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#E31E24] p-1.5 rounded-lg text-white shadow-lg">
            <Camera size={16} />
          </div>
          <div className="font-embroidery text-lg tracking-tighter uppercase italic text-white">
            PICHA<span className="text-[#E31E24]">ZANGU</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
           <Link to="/vault-access" className="relative text-gray-400 hover:text-white transition-colors">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[7px] font-black flex items-center justify-center text-white border border-black shadow-lg">
                  {cartItems.length}
                </span>
              )}
           </Link>
           <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 overflow-hidden">
             <img src={`https://i.pravatar.cc/100?u=${user?.id}`} className="w-full h-full object-cover" alt="" />
           </div>
        </div>
      </div>

      {/* --- MAIN CONTENT VIEWPORT --- */}
      <main className="flex-1 lg:pl-64 w-full flex flex-col pt-16 lg:pt-0">
         <div className="app-container flex-1 w-full px-4 sm:px-6 lg:px-12 py-6 lg:py-12">
            {children}
         </div>
      </main>

      {/* --- MOBILE BOTTOM NAV (Visible < 1024px) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass z-[100] border-t border-white/5 flex items-center justify-around px-2 pb-safe">
         {navItems.map((item) => {
           const isActive = location.pathname === item.path || (item.path.includes('profile') && location.pathname.includes('profile'));
           return (
             <Link 
               key={item.path} 
               to={item.path} 
               className={`flex flex-col items-center gap-1.5 transition-all relative py-2 min-w-[64px] ${isActive ? 'text-[#E31E24]' : 'text-gray-500'}`}
             >
               <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                  {item.icon}
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest text-center whitespace-nowrap">
                 {item.label}
               </span>
               {isActive && (
                 <motion.div 
                   layoutId="bottomNavDot"
                   className="absolute bottom-0 w-8 h-1 bg-[#E31E24] rounded-t-full shadow-[0_0_12px_#E31E24]" 
                 />
               )}
             </Link>
           );
         })}
      </nav>

      {/* Floating Status (Desktop Only) */}
      <div className="hidden lg:flex fixed bottom-8 right-8 z-[110] flex-col items-end gap-3">
         <button className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl flex items-center justify-center text-green-500 hover:scale-110 transition-transform">
            <div className="relative">
              <Database size={24} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            </div>
         </button>
      </div>

    </div>
  );
};

export default AppLayout;