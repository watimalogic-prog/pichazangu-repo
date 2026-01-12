import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Trophy, 
  Shirt, 
  Leaf, 
  Camera, 
  BookOpen, 
  Briefcase, 
  User, 
  Newspaper,
  LogOut,
  Lock,
  Eye,
  Activity,
  LogIn,
  ChevronDown,
  UserCircle,
  ShoppingCart,
  Wand2,
  Sun,
  Moon
} from 'lucide-react';
import { UserRole } from '../types';
import VerificationBadge from './VerificationBadge';
import { useCartStore, useThemeStore } from '../store/useAppStore';

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
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide max-w-[40vw] items-center">
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
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-2xl transition-all border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-yellow-500 hover:bg-white/10' : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'}`}
            title="Toggle Visual Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/vault-access" className={`relative p-3 border rounded-2xl transition-all group ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-100 border-gray-200 text-gray-900'} hover:bg-[#E31E24] hover:text-white hover:border-[#E31E24]`}>
             <ShoppingCart size={20} />
             {cartItems.length > 0 && (
               <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E31E24] border-2 border-black rounded-full text-[10px] font-black flex items-center justify-center animate-pulse group-hover:animate-bounce text-white">
                  {cartItems.length}
               </span>
             )}
          </Link>

          {userRole ? (
            <div className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl border relative ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
              <div className="relative group">
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
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block">{userRole === 'media' ? 'Media House' : userRole}</span>
                  </div>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} />
                </button>

                {showPersonaMenu && (
                  <div className={`absolute top-full right-0 mt-4 w-64 border rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 z-[110] ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/5 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-4">Switch Persona</span>
                      <div className="space-y-2">
                        <PersonaBtn label="Photographer" active={userRole === 'photographer'} onClick={() => {onRoleSwitch('photographer'); setShowPersonaMenu(false);}} />
                        <PersonaBtn label="Client" active={userRole === 'client'} onClick={() => {onRoleSwitch('client'); setShowPersonaMenu(false);}} />
                        <PersonaBtn label="Media House" active={userRole === 'media'} onClick={() => {onRoleSwitch('media'); setShowPersonaMenu(false);}} />
                      </div>
                    </div>
                    <div className="p-2">
                      {userRole === 'photographer' && (
                        <Link to="/style-lab" onClick={() => setShowPersonaMenu(false)} className={`flex items-center gap-3 w-full p-4 text-[10px] font-black uppercase rounded-2xl transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-gray-100'}`}>
                          <Wand2 size={18} className="text-red-600" /> AI Style Lab
                        </Link>
                      )}
                      <Link to={profilePath} onClick={() => setShowPersonaMenu(false)} className={`flex items-center gap-3 w-full p-4 text-[10px] font-black uppercase rounded-2xl transition-all ${theme === 'dark' ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-gray-100'}`}>
                        <UserCircle size={18} className="text-[#E31E24]" /> My Dashboard
                      </Link>
                      <button onClick={() => {onLogout(); setShowPersonaMenu(false);}} className="flex items-center gap-3 w-full p-4 text-[10px] font-black uppercase text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
                        <LogOut size={18} /> Logout Session
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {userRole === 'client' && (
                <Link
                  to="/vault-access"
                  className="bg-[#E31E24] text-white p-2.5 rounded-xl hover:bg-white hover:text-black transition-all shadow-lg"
                  title="My Vault"
                >
                  <Lock size={16} />
                </Link>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginRequest}
              className="flex items-center gap-3 bg-[#E31E24] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-red-900/20"
            >
              <LogIn size={16} /> Login Portal
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Tab Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-20 glass border-t z-[100] flex items-center justify-around px-4 pb-2 transition-colors ${theme === 'dark' ? 'border-white/10' : 'bg-white border-gray-200'}`}>
        <TabItem to="/trending" icon={<TrendingUp size={24} />} label="Feed" active={location.pathname === '/trending'} />
        <TabItem to="/stock" icon={<Activity size={24} />} label="Market" active={location.pathname === '/stock'} />
        <TabItem to="/gigz" icon={<Briefcase size={24} />} label="Gigs" active={location.pathname === '/gigz'} />
        <TabItem to={userRole ? profilePath : '/'} icon={userRole ? <User size={24} /> : <LogIn size={24} />} label={userRole ? (userRole === 'media' ? 'Press' : 'Profile') : "Login"} active={location.pathname.includes('profile') || location.pathname.includes('media-house') || (location.pathname === '/' && !userRole)} />
        <button onClick={toggleTheme} className={`flex flex-col items-center gap-1.5 transition-all ${theme === 'dark' ? 'text-yellow-500' : 'text-gray-400'}`}>
          <div className={`p-2 rounded-xl transition-all ${theme === 'dark' ? 'bg-yellow-500/10' : ''}`}>
             {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </>
  );
};

const PersonaBtn = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => {
  const { theme } = useThemeStore();
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-[#E31E24] text-white shadow-lg' : `${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}`}
    >
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
};

const TabItem = ({ to, icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => {
  const { theme } = useThemeStore();
  return (
    <Link to={to} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#E31E24] scale-110' : `${theme === 'dark' ? 'text-white/40' : 'text-gray-400'}`}`}>
      <div className={`p-2 rounded-xl transition-all ${active ? 'bg-[#E31E24]/10 text-[#E31E24]' : ''}`}>
         {icon}
      </div>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
};

export default Navigation;