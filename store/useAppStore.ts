import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Photo, CartItem, UserRole, UserProfile, Vault, Gig, Bid, Currency } from '../types';
import { MOCK_GIGS } from '../constants';

/**
 * CURRENCY & GEOLOCATION STORE
 */
interface CurrencyState {
  currency: Currency;
  exchangeRates: Record<Currency, number>; // Base: KES
  setCurrency: (c: Currency) => void;
  detectRegion: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'KES',
  exchangeRates: {
    KES: 1,
    UGX: 28.5,
    TZS: 20.1,
    RWF: 9.8,
    USD: 0.0078
  },
  setCurrency: (currency) => set({ currency }),
  detectRegion: async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude } = pos.coords;
        if (latitude > 0.3) set({ currency: 'UGX' });
        else if (latitude < -4) set({ currency: 'TZS' });
        else set({ currency: 'KES' });
      });
    }
  }
}));

/**
 * THEME STORE
 */
interface ThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    { name: 'pichazangu-theme' }
  )
);

/**
 * GIG & OPPORTUNITY STORE
 */
interface GigStore {
  gigs: Gig[];
  bids: Bid[];
  addGig: (gig: Gig) => void;
  addBid: (bid: Bid) => void;
  updateGigStatus: (id: string, status: Gig['status']) => void;
}

export const useGigStore = create<GigStore>()(
  persist(
    (set) => ({
      gigs: MOCK_GIGS,
      bids: [],
      addGig: (gig) => set((state) => ({ gigs: [gig, ...state.gigs] })),
      addBid: (bid) => set((state) => ({ bids: [...state.bids, bid] })),
      updateGigStatus: (id, status) => set((state) => ({
        gigs: state.gigs.map(g => g.id === id ? { ...g, status } : g)
      })),
    }),
    { name: 'pichazangu-gigs' }
  )
);

/**
 * VAULT STORE
 */
interface VaultStore {
  vaults: Vault[];
  addVault: (vault: Vault) => void;
  updateVaultPhotoCount: (id: string, count: number) => void;
}

export const useVaultStore = create<VaultStore>()(
  persist(
    (set) => ({
      vaults: [
        {
          id: 'v-private-1',
          clientId: 'c1',
          clientName: 'Amara Okafor',
          clientEmail: 'amara@example.io',
          clientPhone: '+254 712 000 111',
          clientAvatar: 'https://i.pravatar.cc/150?u=amara',
          photographerId: 'ph1',
          photographerName: 'Ali Command',
          passkey: '882910',
          photoCount: 42,
          lastUpdated: '2024-05-21',
          shootingDate: '2024-05-20',
          location: 'Nairobi',
          isPublic: false,
          archiveStatus: 'Active',
          eventName: 'Nairobi Fashion Gala',
          price: 25000,
          status: 'locked'
        }
      ],
      addVault: (vault) => set((state) => ({ vaults: [vault, ...state.vaults] })),
      updateVaultPhotoCount: (id, count) => set((state) => ({
        vaults: state.vaults.map(v => v.id === id ? { ...v, photoCount: v.photoCount + count } : v)
      })),
    }),
    { name: 'pichazangu-vaults' }
  )
);

/**
 * USER IDENTITY STORE
 */
interface UserStore {
  user: UserProfile | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updateTaxId: (id: string) => void;
  updateBio: (bio: string) => void;
  updateGear: (gear: string) => void;
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
      }))
    }),
    { name: 'pichazangu-user' }
  )
);

/**
 * MARKET INTELLIGENCE STORE
 */
interface MarketStore {
  vix: number;
  tickerMessages: string[];
  updateVix: () => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  vix: 24.5,
  tickerMessages: [
    "JUST SOLD: Ali Studio - Serengeti Sunrise for KSH 1,500",
    "NEW CREATOR: Sarah Lens joined the tribe!",
    "TRENDING: 'Nairobi Nightlife' collection is peaking!",
    "WHALE ALERT: Nation Media buys 'CBD' collection",
    "IPPO ALERT: Sarah Lens drops exclusive news set"
  ],
  updateVix: () => set((state) => ({
    vix: Math.max(10, Math.min(60, state.vix + (Math.random() - 0.5) * 2))
  }))
}));

/**
 * CART STORE
 */
interface CartStore {
  items: CartItem[];
  addItem: (photo: Photo, customPrice?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (photo, customPrice) => {
        // Protocol Service Fees:
        // Private/Personal: 10 KES
        // Public Stock: 20 KES
        // Live Wire (Media): 50 KES
        let platformFee = 20; 
        if (photo.category === 'Media' || photo.category === 'News') platformFee = 50;
        else if (photo.license === 'Personal') platformFee = 10;
        
        const finalPrice = customPrice !== undefined ? customPrice : (photo.price + platformFee);
        const newItem: CartItem = { ...photo, discountedPrice: finalPrice };
        
        const existing = get().items.find(item => item.id === photo.id);
        if (!existing) {
          set({ items: [...get().items, newItem] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(item => item.id !== id) }),
      clearCart: () => set({ items: [] }),
      getTotal: () => get().items.reduce((acc, item) => acc + (item.discountedPrice || item.price), 0),
    }),
    { name: 'pichazangu-cart' }
  )
);

/**
 * TOAST STORE
 */
type ToastType = 'success' | 'error' | 'info';
interface ToastStore {
  message: string | null;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: null,
  type: 'success',
  isVisible: false,
  showToast: (message, type = 'success') => {
    set({ message, type, isVisible: true });
    setTimeout(() => set({ isVisible: false }), 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));