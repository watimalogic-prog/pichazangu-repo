
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Trophy, Shirt, Leaf, Camera, 
  BookOpen, Briefcase, User, Newspaper,
  LogOut, Lock, Eye, Activity, LogIn,
  ChevronDown, UserCircle, ShoppingCart, Wand2,
  Sun, Moon, Globe, MapPin
} from 'lucide-react';
import { UserRole, Currency } from '../types';
import VerificationBadge from './VerificationBadge';
import { useCartStore, useThemeStore, useCurrencyStore } from '../store/useAppStore';

interface NavigationProps {
  userRole: UserRole | null;
  userName: string | null;
  onLogout: () => void;
  onRoleSwitch: (role: UserRole) => void;
  onLoginRequest?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ userRole, userName, onLogout, onRoleSwitch, onLoginRequest }) => {
  const location = useLocation();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const { theme, toggleTheme } = useThemeStore();
  const { currency, setCurrency, detectRegion } = useCurrencyStore();

  useEffect(() => {
    detectRegion();
  }, []);

  const isLanding = location.pathname === '/';
  if (isLanding && !userRole) return null;

  const navItems = [
    { path: '/trending', label: 'Trending', icon: <TrendingUp size={20} /> },
    { path: '/stock', label: 'Market', icon: <Activity size={20} /> },
    { path: '/sports', label: 'Sports', icon: <Trophy size={20} /> },
    { path: '/fashion', label: 'Fashion', icon: <Shirt size={20} /> },
    { path: '/wildlife', label: 'Wild', icon: <Leaf size={20} /> },
    { path: '/street', label: 'Street', icon: <Camera size={20} /> },
    { path: '/learn', label: 'Academy', icon: <BookOpen size={20} /> },
    { path: '/gigz', label: 'Gigz', icon: <Briefcase size={20} /> },
    { path: '/about', label: 'Vision', icon: <Eye size={20} /> },
  ];

  if (userRole === 'media') {
    navItems.push({ path: '/media-house', label: 'Press', icon: <Newspaper size={20} /> });
  }

  const profilePath = userRole === 'photographer' ? '/photographer-profile' : userRole === 'media' ? '/media-house' : '/client-profile';

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 h-20 glass z-[100] px-10 items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-[#E31E24] text-white p-2.5 rounded-2xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(227,30,36,0.4)]">
              <Camera size={24} />
            </div>
            <div className={`font-embroidery text-3xl tracking-tighter uppercase italic ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              PICHA<span className="text-[#E31E24]">ZANGU</span>
            </div>
          </Link>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide max-w-[35vw] items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-2 ${
                  location.pathname === item.path 
                    ? 'bg-[#E31E24] text-white border-[#E31E24] shadow-xl shadow-red-900/20' 
                    : `${theme === 'dark' ? 'text-white/40' : 'text-gray-400'} border-transparent hover:text-red-600 hover:bg-red-600/5`
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* REGIONAL NODE INDICATOR */}
          <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
             <MapPin size={14} className="text-red-600 animate-pulse" />
             <div className="flex flex-col">
                <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest">Sector Node</span>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-transparent text-[10px] font-black uppercase text-white outline-none cursor-pointer"
                >
                  <option value="KES" className="bg-black">Nairobi (KES)</option>
                  <option value="UGX" className="bg-black">Kampala (UGX)</option>
                  <option value="TZS" className="bg-black">Dar (TZS)</option>
                  <option value="USD" className="bg-black">Global (USD)</option>
                </select>
             </div>
          </div>

          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-2xl transition-all border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-yellow-500 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/vault-access" className={`relative p-3 border rounded-2xl transition-all group ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'} hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24]`}>
             <ShoppingCart size={20} />
             {cartItems.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E31E24] border-2 border-black rounded-full text-[10px] font-black flex items-center justify-center text-white">{cartItems.length}</span>}
          </Link>

          {userRole ? (
            <div className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl border relative ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
              <button 
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-800 overflow-hidden border border-white/10">
                  <img src={`https://i.pravatar.cc/100?u=${userRole}`} className="w-full h-full object-cover" alt="User" />
                </div>
                <div className="text-left hidden lg:block">
                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-tighter truncate max-w-[80px] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{userName}</span>
                    <VerificationBadge type={userRole} size={12} />
                  </div>
                </div>
                <ChevronDown size={14} className={`text-gray-500 transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} />
              </button>
            </div>
          ) : (
            <button onClick={onLoginRequest} className="bg-[#E31E24] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Login Portal</button>
          )}
        </div>
      </nav>
      {/* Mobile implementation would follow same patterns */}
    </>
  );
};

export default Navigation;
