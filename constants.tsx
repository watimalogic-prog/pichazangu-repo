import { Photo, Gig, Article, Currency, Vault, Client, Transaction, Model, CastingCall, Bounty, NewsClip, Match, PlayerStats, Bid, AcademyCourse, Grade, PhotographerMarketStats, Milestone } from './types';
import { getBlurPlaceholder } from './services/imageService';

export const COLORS = {
  primary: '#E31E24',
  secondary: '#000000',
  white: '#FFFFFF',
  dark: '#0a0a0a',
  glass: 'rgba(255, 255, 255, 0.05)',
  gold: '#D4AF37',
  stadium: '#22c55e',
  academy: '#111111',
  bullish: '#00FF41',
  bearish: '#FF003C'
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KES: 'KSh', UGX: 'USh', TZS: 'TSh', RWF: 'RF', USD: '$'
};

export const MOCK_PHOTOGRAPHER_MARKET_CAPS: PhotographerMarketStats[] = [
  { id: 'ph1', name: 'Ali Command Center', handle: '@ali_studio', marketCap: 1250000, lifetimeSales: 4500, rating: 4.9, trend: 'up', avatar: 'https://i.pravatar.cc/100?u=ali' },
  { id: 'ph2', name: 'WildLens Africa', handle: '@wild_africa', marketCap: 980000, lifetimeSales: 3200, rating: 4.8, trend: 'up', avatar: 'https://i.pravatar.cc/100?u=wild' },
  { id: 'ph3', name: 'Sarah Lens', handle: '@sarah_k', marketCap: 750000, lifetimeSales: 1800, rating: 4.7, trend: 'down', avatar: 'https://i.pravatar.cc/100?u=sarah' },
  { id: 'ph4', name: 'Action Shots', handle: '@action_ke', marketCap: 520000, lifetimeSales: 2100, rating: 4.6, trend: 'up', avatar: 'https://i.pravatar.cc/100?u=action' },
];

const generateMockPhoto = (base: Partial<Photo>): Photo => {
  const fullPhoto = {
    ...base,
    blurDataUrl: getBlurPlaceholder(base.url || ''),
  } as Photo;
  return fullPhoto;
};

export const MOCK_PHOTOS: Photo[] = [
  generateMockPhoto({ 
    id: '1', 
    url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5', 
    title: 'Serengeti Sunrise', 
    photographer: 'Ali Studio', 
    price: 1500, 
    category: 'Wildlife', 
    license: 'Commercial', 
    location: 'Tanzania', 
    lat: -2.3333, lng: 34.8333, tags: ['safari'], 
    uploadedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), 
    authenticityScore: 98, credibilityScore: 95,
    priceChange24h: 12.5, volume24h: 42,
    historicalPrices: [
      { time: '08:00', value: 1200 }, { time: '10:00', value: 1250 }, { time: '12:00', value: 1400 }, { time: '14:00', value: 1500 }
    ]
  }),
  generateMockPhoto({ 
    id: '2', 
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', 
    title: 'Nairobi Skyline', 
    photographer: 'Ali Studio', 
    price: 3500, 
    category: 'Stock', 
    license: 'Commercial', 
    location: 'Kenya', 
    lat: -1.2863, lng: 36.8172, tags: ['city'], 
    uploadedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), 
    authenticityScore: 99, credibilityScore: 92,
    priceChange24h: -2.1, volume24h: 88,
    historicalPrices: [
      { time: '08:00', value: 3700 }, { time: '10:00', value: 3650 }, { time: '12:00', value: 3550 }, { time: '14:00', value: 3500 }
    ]
  }),
  generateMockPhoto({ 
    id: 'sp1', 
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018', 
    title: 'Goal Celebration', 
    photographer: 'Action Shots', 
    price: 2500, 
    category: 'Sports', 
    license: 'Editorial', 
    location: 'Nairobi', 
    tags: ['football', 'kpl'], 
    matchId: 'm1',
    jerseyNumber: '10',
    uploadedAt: new Date().toISOString(),
    priceChange24h: 4.5, volume24h: 10,
    historicalPrices: [{ time: '10:00', value: 2400 }, { time: '14:00', value: 2500 }]
  }),
  generateMockPhoto({ 
    id: 'wd1', 
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', 
    title: 'Swahili Wedding', 
    photographer: 'Sarah Lens', 
    price: 8000, 
    category: 'Wedding', 
    license: 'Personal', 
    location: 'Mombasa', 
    tags: ['wedding', 'culture'], 
    uploadedAt: new Date().toISOString(),
    priceChange24h: 0, volume24h: 2,
    historicalPrices: [{ time: '14:00', value: 8000 }]
  }),
  generateMockPhoto({ 
    id: 'pr1', 
    url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce', 
    title: 'Melanin Magic', 
    photographer: 'Ali Studio', 
    price: 3000, 
    category: 'Portrait', 
    license: 'Commercial', 
    location: 'Kampala', 
    tags: ['portrait', 'beauty'], 
    uploadedAt: new Date().toISOString(),
    priceChange24h: 8.2, volume24h: 15,
    historicalPrices: [{ time: '14:00', value: 3000 }]
  }),
  generateMockPhoto({ 
    id: '3', 
    url: 'https://images.unsplash.com/photo-1544621150-45308605330a', 
    title: 'Street Vibes', 
    photographer: 'Ali Studio', 
    price: 1200, 
    category: 'Street', 
    license: 'Personal', 
    location: 'Mombasa', 
    lat: -4.0435, lng: 39.6682, tags: ['street'], 
    uploadedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), 
    authenticityScore: 95, credibilityScore: 88, 
    isRawTalent: true, decisiveMomentSeconds: 1.4, 
    gear: { camera: "Fuji X100V", lens: "23mm f/2", settings: "f/5.6, 1/500s, ISO 400" },
    priceChange24h: 5.8, volume24h: 12,
    historicalPrices: [
      { time: '08:00', value: 1100 }, { time: '10:00', value: 1120 }, { time: '12:00', value: 1180 }, { time: '14:00', value: 1200 }
    ]
  }),
  generateMockPhoto({ 
    id: 'st1', 
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952', 
    title: 'Shadows of Luthuli', 
    photographer: 'Urban King', 
    price: 800, 
    category: 'Street', 
    license: 'Editorial', 
    location: 'Nairobi', 
    tags: ['urban', 'shadows'], 
    uploadedAt: new Date().toISOString(), 
    isRawTalent: true, decisiveMomentSeconds: 0.8, 
    isMediaReady: true, gear: { camera: "Ricoh GR III", lens: "28mm", settings: "f/8, 1/1000s, ISO 800" },
    priceChange24h: 1.2, volume24h: 5,
    historicalPrices: [
      { time: '08:00', value: 790 }, { time: '14:00', value: 800 }
    ]
  }),
  generateMockPhoto({ 
    id: 'f1', 
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c', 
    title: 'Ebony Elegance', 
    photographer: 'Ali Studio', 
    price: 2500, 
    category: 'Fashion', 
    license: 'Commercial', 
    location: 'Nairobi', 
    tags: ['couture'], 
    uploadedAt: new Date().toISOString(),
    priceChange24h: 15.2, volume24h: 24,
    historicalPrices: [
      { time: '08:00', value: 2100 }, { time: '10:00', value: 2200 }, { time: '12:00', value: 2400 }, { time: '14:00', value: 2500 }
    ]
  }),
  generateMockPhoto({
    id: 'ippo1',
    url: 'https://images.unsplash.com/photo-1523805081446-99b2566d9ffb',
    title: 'IPPO: State House Secret',
    photographer: 'Sarah Lens',
    price: 45000,
    category: 'Media',
    license: 'Editorial',
    location: 'Nairobi',
    tags: ['exclusive', 'politics'],
    uploadedAt: new Date().toISOString(),
    isIPPO: true,
    priceChange24h: 0, volume24h: 1,
    historicalPrices: [{ time: '14:00', value: 45000 }]
  }),
  // Additional Sports Mock
  generateMockPhoto({
    id: 'sp2',
    url: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa',
    title: 'Leopards Defensive Wall',
    photographer: 'WildLens Africa',
    price: 1800,
    category: 'Sports',
    license: 'Editorial',
    location: 'Nairobi',
    matchId: 'm1',
    tags: ['football', 'defence'],
    uploadedAt: new Date().toISOString(),
  })
];

export const MOCK_MATCHES: Match[] = [
  { id: 'm1', league: 'KPL', homeTeam: 'Gor Mahia', awayTeam: 'AFC Leopards', homeScore: 2, awayScore: 1, minute: 68, status: 'Live' },
  { id: 'm2', league: 'NSL', homeTeam: 'Shabana FC', awayTeam: 'Muranga Seal', homeScore: 0, awayScore: 0, minute: 15, status: 'Live' },
  { id: 'm3', league: 'Women', homeTeam: 'Vihiga Queens', awayTeam: 'Gaspo Women', homeScore: 3, awayScore: 1, minute: 90, status: 'Finished' }
];

export const MOCK_PLAYERS: PlayerStats[] = [
  { id: 'p1', name: 'Benson Omala', team: 'Gor Mahia', jerseyNumber: '10', position: 'Forward', matches: 24, goals: 18, assists: 4, image: 'https://i.pravatar.cc/150?u=omala' },
  { id: 'p2', name: 'Cliff Nyakeya', team: 'AFC Leopards', jerseyNumber: '11', position: 'Midfielder', matches: 22, goals: 6, assists: 12, image: 'https://i.pravatar.cc/150?u=cliff' },
];

export const MOCK_GIGS: Gig[] = [
  { 
    id: 'g1', 
    title: 'Tech Startup Office Shoot', 
    budgetMin: 12000, budgetMax: 20000, 
    currency: 'KES', 
    description: 'Corporate launch.', location: 'Nairobi', postedBy: 'Safiri Tech', deadline: '2024-06-15', category: 'Corporate', status: 'Open', type: 'Public', urgency: 'Normal', requirements: ['Drone']
  }
];

export const MOCK_BIDS: Bid[] = [
  { id: 'b1', gigId: 'g1', photographerId: 'p1', photographerName: 'Ali Studio', photographerRating: 4.9, pitch: 'Pro.', quote: 18000, status: 'Pending', portfolioUrl: '#' }
];

export const MOCK_NEWS_CLIPS: NewsClip[] = [
  { id: 'nc1', thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=400&q=80', url: '#', title: 'CBD Traffic', duration: '0:45', photographer: 'Ali Studio', location: 'Nairobi', uploadedAt: new Date().toISOString() }
];

export const MOCK_NEWS_BOUNTIES: Bounty[] = [
  { id: 'nb1', title: 'Flooding', reward: 15000, location: 'Dar', deadline: 'Today', description: 'Urgent.' }
];

export const MOCK_VAULTS: Vault[] = [
  { 
    id: 'v1', 
    clientId: 'c1', 
    clientName: 'Zainab Juma',
    clientEmail: 'zainab@example.com',
    clientPhone: '+254712345678',
    clientAvatar: 'https://i.pravatar.cc/150?u=zainab',
    photographerId: 'ph1',
    photographerName: 'Ali Studio', 
    passkey: '882910', 
    photoCount: 45, 
    lastUpdated: '2024-05-20', 
    shootingDate: '2024-05-15',
    location: 'Nairobi',
    isPublic: false, 
    archiveStatus: 'Permanent' 
  },
  {
    id: 'v-stadium-1',
    clientId: 'public',
    clientName: 'KPL Derby Archive',
    clientEmail: 'admin@kpl.co.ke',
    clientPhone: '0000',
    clientAvatar: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    photographerId: 'ph1',
    photographerName: 'Ali Studio',
    passkey: '',
    photoCount: 120,
    lastUpdated: '2024-05-22',
    shootingDate: '2024-05-22',
    location: 'Nairobi',
    isPublic: true,
    targetScreen: 'Sports',
    price: 1500,
    eventName: 'Gor Mahia vs AFC Leopards',
    archiveStatus: 'Permanent'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'Purchase', amount: 3500, currency: 'KES', date: '2024-05-21', status: 'Completed' }
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Zainab Juma', phone: '+254712345678', isReturning: true, totalSpent: 12500, verified: true }
];

export const MOCK_MODELS: Model[] = [
  { id: 'm1', name: 'Iman J.', height: '5\'10"', measurements: '32-24-34', skinTone: 'Deep', verified: true, rating: 4.9, thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80', style: 'High Fashion' }
];

export const MOCK_CASTING_CALLS: CastingCall[] = [
  { id: 'cc1', title: 'Resort Campaign', budget: 75000, deadline: '2024-07-01', location: 'Diani', agency: 'Zanzibar Stays', description: 'Models needed.' }
];

export const MOCK_ARTICLES: Article[] = [
  { id: 'a1', title: 'Lighting', excerpt: 'Tips.', thumbnail: 'https://picsum.photos/seed/learn1/400/300', category: 'Lighting' }
];

// Fixed 'MOCK_ACADEMY_COURSES' export to satisfy imports in Learn.tsx.
// Updated to include quiz data and more complex lesson types.
export const MOCK_ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'c-cert',
    tier: 1,
    title: 'Zangu Certificate',
    description: 'Master the fundamentals of regional photography.',
    durationMonths: 3,
    progress: 45,
    isUnlocked: true,
    milestones: [],
    modules: [
      {
        id: 'm1',
        title: 'Node 01: Foundations',
        lessons: [
          { id: 'l1', title: 'Philosophy of the Lens', type: 'reading', isCompleted: true },
          { id: 'l2', title: 'Exposure Triangle', type: 'video', isCompleted: true },
        ]
      },
      {
        id: 'm2',
        title: 'Node 02: Hardware',
        lessons: [
          { 
            id: 'l13', 
            title: 'Old Features vs Modern Mastery', 
            type: 'video', 
            isCompleted: false,
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' 
          },
          {
            id: 'l14',
            title: 'Knowledge Sync 02',
            type: 'quiz',
            isCompleted: false,
            proTip: "ISO is digital gain, not physical sensitivity in modern sensors."
          }
        ]
      },
      {
        id: 'm3',
        title: 'Node 03: Biomechanics',
        lessons: [
          { 
            id: 'l16', 
            title: 'The Handshake (Grip)', 
            type: 'practical', 
            isCompleted: false,
            proTip: "Support the weight of the lens with your palm, not just your fingers."
          },
        ]
      },
      {
        id: 'm4',
        title: 'Node 04: Specialization',
        lessons: [
          { id: 'l30', title: 'Finding Your Field', type: 'reading', isCompleted: false },
          { id: 'l24', title: 'Portraiture Foundations', type: 'video', isCompleted: false },
        ]
      }
    ]
  }
];

export const MOCK_QUIZ_DATA: Record<string, any> = {
  'l14': {
    questions: [
      {
        q: "What does ISO stand for in the context of digital sensors?",
        options: ["Internal Sensor Output", "International Organization for Standardization", "Imaging Speed Optics", "Image Signal Optimization"],
        correct: 1
      },
      {
        q: "In a 'Decisive Moment' street shot, which setting is usually prioritized?",
        options: ["Aperture", "Shutter Speed", "White Balance", "Digital Zoom"],
        correct: 1
      }
    ]
  }
};