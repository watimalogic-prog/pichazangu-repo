import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Activity, BookOpen, Briefcase, User, 
  Camera, Newspaper, Wand2, ShieldCheck, Settings,
  LogOut, Wallet, Menu, Search, Bell, Database, ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore, useThemeStore, useCartStore } from '../store/useAppStore';
import VerificationBadge from './VerificationBadge';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useUserStore();
  const { theme } = useThemeStore();
  const cartItems = useCartStore((state) => state.items);

  const isLanding = location.pathname === '/';
  if (isLanding && !user) return <>{children}</>;

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

  const sidebarNodes = [
    ...navItems,
    ...(user?.role === 'photographer' ? [
      { path: '/style-lab', label: 'AI Style', icon: <Wand2 size={24} /> },
    ] : []),
    ...(user?.role === 'media' ? [
      { path: '/media-house', label: 'Press Hub', icon: <Newspaper size={24} /> },
    ] : []),
  ];

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-black border-r border-white/5 z-[100] p-6">
        <Link to="/" className="flex items-center gap-3 mb-12 group">
          <div className="bg-[#E31E24] text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(227,30,36,0.4)]">
            <Camera size={24} />
          </div>
          <div className="font-embroidery text-2xl tracking-tighter uppercase italic text-white">
            PICHA<span className="text-[#E31E24]">ZANGU</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-2">
          {sidebarNodes.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                location.pathname === item.path 
                  ? 'bg-[#E31E24] text-white shadow-xl shadow-red-900/20' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              {location.pathname === item.path && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full shadow-[0_0_10px_#fff]" />
              )}
            </Link>
          ))}
          
          <Link
            to="/vault-access"
            className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative overflow-hidden text-gray-500 hover:text-white hover:bg-white/5"
          >
            <span className="relative z-10">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-[8px] font-black flex items-center justify-center text-white border-2 border-black">
                  {cartItems.length}
                </span>
              )}
            </span>
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em]">Cart Hub</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden">
               <img src={`https://i.pravatar.cc/100?u=${user?.id}`} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="min-w-0">
               <div className="flex items-center gap-1">
                 <span className="text-[10px] font-black uppercase truncate">{user?.name}</span>
                 <VerificationBadge type={user?.role} size={12} />
               </div>
               <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block">Node v4.0.2</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-[100] px-6 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#E31E24] p-1.5 rounded-lg text-white">
            <Camera size={16} />
          </div>
          <div className="font-embroidery text-lg tracking-tighter uppercase italic text-white">
            PICHA<span className="text-[#E31E24]">ZANGU</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
           <Link to="/vault-access" className="relative text-gray-500 hover:text-white">
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[7px] font-black flex items-center justify-center text-white border border-black">
                  {cartItems.length}
                </span>
              )}
           </Link>
           <div className="relative">
              <Bell size={22} className="text-gray-500" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-black shadow-lg" />
           </div>
        </div>
      </div>

      {/* --- MAIN VIEWPORT --- */}
      <main className="flex-1 lg:pl-64 w-full flex flex-col pb-24 md:pb-0 pt-16 md:pt-0 relative z-10">
         <div className="flex-1 w-full max-w-[1600px] mx-auto overflow-x-hidden">
            {children}
         </div>
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 h-20 glass z-[100] rounded-[2.5rem] border border-white/10 flex items-center justify-around px-2 shadow-2xl overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent pointer-events-none" />
         
         {navItems.map((item) => {
           const isActive = location.pathname === item.path || (item.path.includes('profile') && location.pathname.includes('profile'));
           return (
             <Link 
               key={item.path} 
               to={item.path} 
               className={`flex flex-col items-center gap-1.5 transition-all relative ${isActive ? 'text-[#E31E24] scale-110' : 'text-gray-500'}`}
             >
               <div className={`p-2 rounded-2xl transition-all duration-500 ${isActive ? 'bg-red-600/10' : ''}`}>
                  {item.icon}
               </div>
               <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                 {item.label}
               </span>
               {isActive && (
                 <motion.div 
                   layoutId="bottomNavDot"
                   className="absolute -bottom-1 w-1 h-1 bg-red-600 rounded-full shadow-[0_0_8px_#E31E24]" 
                 />
               )}
             </Link>
           );
         })}
      </nav>

      {/* Network Status Dot (Mobile Floating Overlay) */}
      <div className="lg:hidden fixed bottom-28 right-6 z-50 flex flex-col gap-4">
         <button className="w-12 h-12 rounded-full bg-red-600 shadow-2xl flex items-center justify-center text-white border-4 border-black hover:scale-110 transition-transform">
            <Database size={20} />
         </button>
      </div>

    </div>
  );
};

export default AppLayout;