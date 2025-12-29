import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Photo, CartItem, UserRole, UserProfile } from '../types';

/**
 * USER IDENTITY STORE
 * Manages the global session and profile data.
 */
interface UserStore {
  user: UserProfile | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updateTaxId: (id: string) => void;
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
            name: 'Ali Photographer',
            avatar: 'https://i.pravatar.cc/150?u=ali',
            location: 'Nairobi, Kenya',
            verified: true,
            taxId: 'A001928374P'
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
        useToastStore.getState().showToast(`Authenticated as ${role.toUpperCase()}`, 'success');
      },
      logout: () => {
        set({ user: null });
        useToastStore.getState().showToast("Logged out successfully", "info");
      },
      updateTaxId: (taxId) => set((state) => ({
        user: state.user ? { ...state.user, taxId } : null
      }))
    }),
    { name: 'pichazangu-user' }
  )
);

/**
 * MARKET INTELLIGENCE STORE
 * Centralizes VIX and ticker messages to ensure consistency across pages.
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
 * CART & SELECTION STORE
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
        const platformFee = photo.category === 'Stock' ? 10 : 7;
        const finalPrice = customPrice !== undefined ? customPrice : (photo.price + platformFee);
        const newItem: CartItem = { ...photo, discountedPrice: finalPrice };
        
        if (!get().items.find(item => item.id === photo.id)) {
          set({ items: [...get().items, newItem] });
          useToastStore.getState().showToast(`Added "${photo.title}" to selection`, 'success');
        } else {
          useToastStore.getState().showToast(`Already in your selection`, 'info');
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
 * NOTIFICATION & TOAST STORE
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