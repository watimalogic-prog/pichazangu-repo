
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, UserRole, Photo, Currency, Vault, Gig, Bid } from '../types';
import { MOCK_GIGS, MOCK_BIDS, MOCK_VAULTS } from '../constants';

interface UserStore {
  user: UserProfile | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updateTaxId: (id: string) => void;
  updateBio: (bio: string) => void;
  updateGear: (gear: string) => void;
  updateAvatar: (url: string) => void;
  updateBanner: (url: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      login: (role) => {
        const mockProfiles: Record<UserRole, UserProfile> = {
          photographer: {
            id: 'ph1',
            role: 'photographer',
            name: 'Ali Command',
            avatar: 'https://i.pravatar.cc/150?u=ali',
            banner: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80',
            location: 'Nairobi, Kenya',
            verified: true,
            taxId: 'A001928374P',
            biography: 'Elite street and wildlife photographer based in Nairobi.',
            photographyGear: 'Sony A7R V, 24-70mm f/2.8 GM II, 70-200mm f/2.8 GM OSS II'
          },
          client: {
            id: 'cl1',
            role: 'client',
            name: 'Zainab Juma',
            avatar: 'https://i.pravatar.cc/150?u=zainab',
            location: 'Nairobi, Kenya',
            verified: true,
            taxId: 'A009988776Q'
          },
          media: {
            id: 'md1',
            role: 'media',
            name: 'Nation Media Editor',
            avatar: 'https://i.pravatar.cc/150?u=media',
            location: 'Nairobi, Kenya',
            verified: true,
            taxId: 'P051234567X'
          }
        };
        set({ user: mockProfiles[role] });
      },
      logout: () => set({ user: null }),
      updateTaxId: (taxId) => set((state) => ({
        user: state.user ? { ...state.user, taxId } : null
      })),
      updateBio: (biography) => set((state) => ({
        user: state.user ? { ...state.user, biography } : null
      })),
      updateGear: (photographyGear) => set((state) => ({
        user: state.user ? { ...state.user, photographyGear } : null
      })),
      updateAvatar: (avatar) => set((state) => ({
        user: state.user ? { ...state.user, avatar } : null
      })),
      updateBanner: (banner) => set((state) => ({
        user: state.user ? { ...state.user, banner } : null
      }))
    }),
    { name: 'pichazangu-user' }
  )
);

interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Added missing Theme store
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'pichazangu-theme' }
  )
);

interface CartStore {
  items: Photo[];
  addItem: (photo: Photo, customPrice?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// Added missing Cart store
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (photo, customPrice) => set((state) => ({ 
        items: [...state.items, customPrice ? { ...photo, price: customPrice } : photo] 
      })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'pichazangu-cart' }
  )
);

interface CurrencyStore {
  currency: Currency;
  exchangeRates: Record<Currency, number>;
  setCurrency: (currency: Currency) => void;
  detectRegion: () => void;
}

// Added missing Currency store
export const useCurrencyStore = create<CurrencyStore>()((set) => ({
  currency: 'KES',
  exchangeRates: {
    KES: 1,
    UGX: 28,
    TZS: 18,
    RWF: 9,
    USD: 0.0076
  },
  setCurrency: (currency) => set({ currency }),
  detectRegion: () => {
    // Mock region detection
    set({ currency: 'KES' });
  }
}));

interface ToastStore {
  message: string;
  type: 'success' | 'info' | 'error';
  isVisible: boolean;
  showToast: (message: string, type: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
}

// Added missing Toast store
export const useToastStore = create<ToastStore>((set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  showToast: (message, type) => {
    set({ message, type, isVisible: true });
    setTimeout(() => set({ isVisible: false }), 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));

interface MarketStore {
  vix: number;
  tickerMessages: string[];
  updateVix: () => void;
}

// Added missing Market store
export const useMarketStore = create<MarketStore>((set) => ({
  vix: 14.5,
  tickerMessages: [
    "KPL DERBY: 450 NEW ASSETS INGESTED",
    "SERENGETI SUNRISE: PRICE UP 12%",
    "NAIROBI FASHION WEEK: EXCLUSIVE DROP AT 18:00",
    "MARKET VOLATILITY: LOW (VIX 14.5)",
    "NEW BOUNTY: CBD PROTESTS - REWARD KES 15,000"
  ],
  updateVix: () => set((state) => ({ 
    vix: Math.max(10, Math.min(30, state.vix + (Math.random() - 0.5) * 2)) 
  })),
}));

interface GigStore {
  gigs: Gig[];
  bids: Bid[];
  addGig: (gig: Gig) => void;
  addBid: (bid: Bid) => void;
  updateGigStatus: (id: string, status: Gig['status']) => void;
}

// Added missing Gig store
export const useGigStore = create<GigStore>((set) => ({
  gigs: MOCK_GIGS,
  bids: MOCK_BIDS,
  addGig: (gig) => set((state) => ({ gigs: [gig, ...state.gigs] })),
  addBid: (bid) => set((state) => ({ bids: [bid, ...state.bids] })),
  updateGigStatus: (id, status) => set((state) => ({
    gigs: state.gigs.map(g => g.id === id ? { ...g, status } : g)
  })),
}));

interface VaultStore {
  vaults: Vault[];
  addVault: (vault: Vault) => void;
}

// Added missing Vault store
export const useVaultStore = create<VaultStore>((set) => ({
  vaults: MOCK_VAULTS,
  addVault: (vault) => set((state) => ({ vaults: [vault, ...state.vaults] })),
}));
