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
  location: string;
  taxId?: string;
  phone?: string;
  verified: boolean;
  styleProfiles?: StyleProfile[];
  biography?: string;
  basePrice?: number;
  performanceScore?: number;
}

export interface MarketState {
  vix: number;
  lastUpdate: string;
  tickerMessages: string[];
}

export interface PhotoFeedback {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  timestamp: string;
  requestType?: 'Retouch' | 'Color' | 'Crop' | 'General';
}

export interface Photo {
  id: string;
  url: string; 
  blurDataUrl?: string; 
  highResUrl?: string; 
  signedUrl?: string; 
  signedUrlExpiresAt?: number;
  title: string;
  description?: string;
  photographer: string;
  price: number;
  category: string;
  license: 'Commercial' | 'Editorial' | 'Personal';
  location?: string;
  lat?: number;
  lng?: number;
  tags: string[];
  isPaid?: boolean;
  uploadedAt?: string;
  authenticityScore?: number;
  credibilityScore?: number;
  jerseyNumber?: string;
  matchId?: string;
  isRawTalent?: boolean;
  decisiveMomentSeconds?: number;
  soundscapeUrl?: string;
  povVlogUrl?: string;
  gear?: {
    camera: string;
    lens: string;
    settings: string;
  };
  isMediaReady?: boolean;
  priceChange24h?: number;
  volume24h?: number;
  historicalPrices?: { time: string; value: number }[];
  isIPPO?: boolean;
  // Vault specific enhancements
  isStarred?: boolean;
  proofingStatus?: 'Pending' | 'Approved' | 'Rejected';
  feedback?: PhotoFeedback[];
  collectionId?: string;
  discountedPrice?: number;
}

export interface VaultCollection {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
}

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
  isPublic: boolean;
  archiveStatus: 'Active' | 'Archived' | 'Permanent';
  eventName?: string;
  description?: string;
  price?: number; 
  status?: 'locked' | 'unlocked' | 'paid' | 'preview';
}

export interface Transaction {
  id: string;
  type: 'Sale' | 'Withdrawal' | 'Deposit' | 'Purchase';
  amount: number;
  vatAmount?: number;
  netAmount?: number;
  currency: Currency;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  taxInvoiceId?: string;
  items?: string[];
}

export interface PhotographerMarketStats {
  id: string;
  name: string;
  handle: string;
  marketCap: number;
  lifetimeSales: number;
  rating: number;
  avatar: string;
  trend: 'up' | 'down';
}

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

export interface Bounty {
  id: string;
  title: string;
  reward: number;
  location: string;
  deadline: string;
  description: string;
}

export interface CartItem extends Photo {
  discountedPrice?: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  isReturning: boolean;
  totalSpent: number;
  verified?: boolean;
  taxId?: string; 
}

export interface Model {
  id: string;
  name: string;
  height: string;
  measurements: string;
  skinTone: string;
  verified: boolean;
  rating: number;
  thumbnail: string;
  agency?: string;
  style: 'High Fashion' | 'Streetwear' | 'Commercial' | 'Fitness' | 'Lingerie';
}

export interface CastingCall {
  id: string;
  title: string;
  budget: number;
  deadline: string;
  location: string;
  agency: string;
  description: string;
}

export interface Milestone {
  id: string;
  label: string;
  amount?: number;
  status: 'Locked' | 'Active' | 'Completed';
  description: string;
}

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
  category: 'Wedding' | 'News' | 'Sports' | 'Fashion' | 'Corporate';
  status: 'Open' | 'Booked' | 'In Progress' | 'Completed' | 'Disputed';
  type: 'Public' | 'Invite';
  urgency: 'Normal' | 'Flash';
  requirements: string[];
  milestones?: Milestone[];
  hiredPhotographerId?: string;
  lat?: number;
  lng?: number;
}

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

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  videoUrl?: string;
  type: 'video' | 'quiz' | 'practical' | 'reading';
  isCompleted: boolean;
  milestoneId?: string;
  proTip?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
  month?: number;
}

export interface AcademyCourse {
  id: string;
  tier: 1 | 2 | 3;
  title: string;
  description: string;
  durationMonths: number;
  modules: CourseModule[];
  milestones: Milestone[];
  progress: number;
  isUnlocked: boolean;
}

export interface Grade {
  id: string;
  assignmentName: string;
  score: number;
  feedback: string;
  gradedBy: string;
  date: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
}

export enum PaymentProvider {
  MPESA = 'M-Pesa',
  MTN = 'MTN Mobile Money',
  AIRTEL = 'Airtel Money',
  VODAFONE = 'Vodafone M-Pesa'
}