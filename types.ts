
export type UserRole = 'photographer' | 'client' | 'media';
export type Currency = 'KES' | 'UGX' | 'TZS' | 'RWF' | 'USD';

export interface StyleProfile {
  id: string;
  name: string;
  description: string;
  instructions: EditingInstructions;
  createdAt: string;
}

export interface EditingInstructions {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  grain: number;
  sepia: number;
  hueShift: number;
  description: string;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  avatar: string;
  banner?: string;
  location: string;
  taxId?: string;
  phone?: string;
  verified: boolean;
  styleProfiles?: StyleProfile[];
  biography?: string;
  basePrice?: number;
  performanceScore?: number;
  photographyGear?: string;
}

// Added missing Photo interface
export interface Photo {
  id: string;
  url: string;
  title: string;
  photographer: string;
  price: number;
  category: string;
  license: string;
  location: string;
  lat?: number;
  lng?: number;
  tags: string[];
  uploadedAt?: string;
  authenticityScore?: number;
  credibilityScore?: number;
  isRawTalent?: boolean;
  decisiveMomentSeconds?: number;
  gear?: { camera: string; lens: string; settings: string };
  priceChange24h?: number;
  volume24h?: number;
  historicalPrices?: { time: string; value: number }[];
  matchId?: string;
  jerseyNumber?: string;
  isIPPO?: boolean;
  blurDataUrl?: string;
  collectionId?: string;
  isPaid?: boolean;
  discountedPrice?: number;
}

// Added missing Gig interface
export interface Gig {
  id: string;
  title: string;
  budgetMin: number;
  budgetMax: number;
  currency: Currency;
  description: string;
  location: string;
  postedBy: string;
  deadline: string;
  category: string;
  status: 'Open' | 'Booked' | 'Completed';
  type: 'Public' | 'Private';
  urgency: 'Normal' | 'Flash';
  requirements: string[];
}

// Added missing Article interface
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
}

// Added missing Vault interface
export interface Vault {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar: string;
  photographerId: string;
  photographerName: string;
  passkey: string;
  photoCount: number;
  lastUpdated: string;
  shootingDate: string;
  location: string;
  isPublic: boolean;
  archiveStatus: 'Permanent' | 'Active' | 'Archived';
  targetScreen?: string;
  price?: number;
  eventName?: string;
  status?: 'locked' | 'unlocked' | 'preview';
}

// Added missing Client interface
export interface Client {
  id: string;
  name: string;
  phone: string;
  isReturning: boolean;
  totalSpent: number;
  verified: boolean;
}

// Added missing Transaction interface
export interface Transaction {
  id: string;
  type: string;
  amount: number;
  currency: Currency;
  date: string;
  status: string;
}

// Added missing Model interface
export interface Model {
  id: string;
  name: string;
  height: string;
  measurements: string;
  skinTone: string;
  verified: boolean;
  rating: number;
  thumbnail: string;
  style: string;
  agency?: string;
}

// Added missing CastingCall interface
export interface CastingCall {
  id: string;
  title: string;
  budget: number;
  deadline: string;
  location: string;
  agency: string;
  description: string;
}

// Added missing Bounty interface
export interface Bounty {
  id: string;
  title: string;
  reward: number;
  location: string;
  deadline: string;
  description: string;
}

// Added missing NewsClip interface
export interface NewsClip {
  id: string;
  thumbnail: string;
  url: string;
  title: string;
  duration: string;
  photographer: string;
  location: string;
  uploadedAt: string;
}

// Added missing Match interface
export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: 'Live' | 'Finished' | 'Upcoming';
}

// Added missing PlayerStats interface
export interface PlayerStats {
  id: string;
  name: string;
  team: string;
  jerseyNumber: string;
  position: string;
  matches: number;
  goals: number;
  assists: number;
  image: string;
}

// Added missing Bid interface
export interface Bid {
  id: string;
  gigId: string;
  photographerId: string;
  photographerName: string;
  photographerRating: number;
  pitch: string;
  quote: number;
  status: 'Pending' | 'Accepted' | 'Declined';
  portfolioUrl: string;
}

// Added missing AcademyCourse interface
export interface AcademyCourse {
  id: string;
  tier: number;
  title: string;
  description: string;
  durationMonths: number;
  progress: number;
  isUnlocked: boolean;
  milestones: Milestone[];
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'quiz' | 'practical';
  isCompleted: boolean;
  videoUrl?: string;
  proTip?: string;
}

export interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type Grade = 'A' | 'B' | 'C' | 'D';

// Added missing PhotographerMarketStats interface
export interface PhotographerMarketStats {
  id: string;
  name: string;
  handle: string;
  marketCap: number;
  lifetimeSales: number;
  rating: number;
  trend: 'up' | 'down';
  avatar: string;
}
