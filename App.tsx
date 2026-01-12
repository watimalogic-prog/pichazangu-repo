import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Trending from './pages/Trending';
import StockMarket from './pages/StockMarket';
import CategoryPage from './pages/CategoryPage';
import Learn from './pages/Learn';
import Gigz from './pages/Gigz';
import ClientProfile from './pages/ClientProfile';
import PhotographerProfile from './pages/PhotographerProfile';
import MediaHouse from './pages/MediaHouse';
import VaultAccess from './pages/VaultAccess';
import PrivateGallery from './pages/PrivateGallery';
import FashionHub from './pages/FashionHub';
import SportsHub from './pages/SportsHub';
import StreetHub from './pages/StreetHub';
import StyleHub from './pages/StyleHub';
import About from './pages/About';
import Navigation from './components/Navigation';
import GlobalToast from './components/GlobalToast';
import { useUserStore, useThemeStore } from './store/useAppStore';

const App: React.FC = () => {
  const { user, login, logout } = useUserStore();
  const { theme } = useThemeStore();

  // Apply theme to HTML root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navigation 
          userRole={user?.role || null} 
          userName={user?.name || null}
          onLogout={logout} 
          onRoleSwitch={login}
          onLoginRequest={() => {
             window.location.hash = '/';
          }} 
        />
        
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={!user ? <LandingPage onLogin={login} /> : <Navigate to="/trending" />} />
            <Route path="/about" element={<About />} />
            <Route path="/trending" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><Trending userRole={user?.role || null} /></div>} />
            <Route path="/stock" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><StockMarket userRole={user?.role || null} /></div>} />
            <Route path="/sports" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><SportsHub userRole={user?.role || null} /></div>} />
            <Route path="/fashion" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><FashionHub userRole={user?.role || null} /></div>} />
            <Route path="/street" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><StreetHub userRole={user?.role || null} /></div>} />
            <Route path="/wildlife" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><CategoryPage title="Wildlife" category="Wildlife" showGeo /></div>} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/gigz" element={<div className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pb-24"><Gigz userRole={user?.role || 'client'} /></div>} />

            <Route 
              path="/client-profile" 
              element={user?.role === 'client' ? <ClientProfile /> : <Navigate to="/" />} 
            />
            {/* Verify photographer dashboard route visibility */}
            <Route 
              path="/photographer-profile" 
              element={user?.role === 'photographer' ? <PhotographerProfile /> : <Navigate to="/" />} 
            />
            <Route 
              path="/style-lab" 
              element={user?.role === 'photographer' ? <StyleHub /> : <Navigate to="/" />} 
            />
            <Route 
              path="/media-house" 
              element={user?.role === 'media' ? <MediaHouse /> : <Navigate to="/" />} 
            />
            <Route path="/vault-access" element={<VaultAccess />} />
            <Route path="/gallery/:vaultId" element={<PrivateGallery />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <GlobalToast />
      </div>
    </Router>
  );
};

export default App;