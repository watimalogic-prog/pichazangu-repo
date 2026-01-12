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
  })
];

const CERTIFICATE_MILESTONES: Milestone[] = [
  { id: 'm1', label: 'M1: Observation', status: 'Completed', description: 'Shoot 10 stories using just your eyes/no camera.' },
  { id: 'm2', label: 'M2: Gear Audit', status: 'Active', description: 'Identify every button on your specific camera model.' },
  { id: 'm3', label: 'M3: Manual Basics', status: 'Locked', description: 'Balance a shot using only manual settings.' },
  { id: 'm4', label: 'M4: Sharpness', status: 'Locked', description: 'Shoot 5 tack-sharp images of moving subjects.' },
  { id: 'm5', label: 'M5: Visual Storyteller', status: 'Locked', description: 'Compose a 3-image sequence that tells a silent story.' },
  { id: 'm6', label: 'M6: Street Safari', status: 'Locked', description: 'Capture 5 candid moments in a busy market.' },
  { id: 'm7', label: 'M7: The RAW Edit', status: 'Locked', description: 'Transform a dull photo into a masterpiece via editing.' },
  { id: 'm8', label: 'M8: The Contract', status: 'Locked', description: 'Draft your first photography service agreement.' },
  { id: 'm9', label: 'M9: Portfolio Launch', status: 'Locked', description: 'Select your best 10 images for your profile.' },
];

export const MOCK_ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'c-cert',
    tier: 1,
    title: 'Pichazangu Certificate',
    description: 'The Amateur-to-Pro Roadmap. 3 Months to regional mastery.',
    durationMonths: 3,
    progress: 12,
    isUnlocked: true,
    milestones: CERTIFICATE_MILESTONES,
    modules: [
      {
        id: 'month-1',
        title: 'Month 1: The Foundation',
        month: 1,
        lessons: [
          { id: 'l1', title: '1. Introduction to Photography', type: 'reading', isCompleted: true, proTip: 'Your camera is just a tool; your eye is the actual lens. Start by looking for "stories" before you look for "settings."' },
          { id: 'l2', title: '2. The Timeline of Light', type: 'reading', isCompleted: false },
          { id: 'l3', title: '3. The First Cameras', type: 'reading', isCompleted: false },
          { id: 'l4', title: '4. Milestone 1: Observation Challenge', type: 'practical', isCompleted: false, milestoneId: 'm1' },
          { id: 'l5', title: '5. Anatomy of the Modern Camera', type: 'reading', isCompleted: false },
          { id: 'l6', title: '6. Lenses 101', type: 'video', isCompleted: false },
          { id: 'l7', title: '7. The Image Sensor', type: 'reading', isCompleted: false },
          { id: 'l8', title: '8. Milestone 2: Gear Audit', type: 'practical', isCompleted: false, milestoneId: 'm2' },
          { id: 'l9', title: '9. Exposure Triangle Part 1: Aperture', type: 'video', isCompleted: false },
          { id: 'l10', title: '10. Exposure Triangle Part 2: Shutter Speed', type: 'video', isCompleted: false },
          { id: 'l11', title: '11. Exposure Triangle Part 3: ISO', type: 'video', isCompleted: false },
          { id: 'l12', title: '12. Milestone 3: Manual Mode Basics', type: 'practical', isCompleted: false, milestoneId: 'm3' },
          { id: 'l13', title: '13. Old vs. New Control', type: 'reading', isCompleted: false },
          { id: 'l14', title: '14. Memory & Storage', type: 'reading', isCompleted: false },
          { id: 'l15', title: '15. Monthly Review Quiz', type: 'quiz', isCompleted: false },
        ]
      },
      {
        id: 'month-2',
        title: 'Month 2: The Craft',
        month: 2,
        lessons: [
          { id: 'l16', title: '16. Holding the Camera', type: 'reading', isCompleted: false },
          { id: 'l17', title: '17. Autofocus Modes', type: 'video', isCompleted: false },
          { id: 'l18', title: '18. Metering Modes', type: 'reading', isCompleted: false },
          { id: 'l19', title: '19. Milestone 4: Sharpness Challenge', type: 'practical', isCompleted: false, milestoneId: 'm4' },
          { id: 'l20', title: '20. Composition 1: Rule of Thirds', type: 'video', isCompleted: false },
          { id: 'l21', title: '21. Composition 2: Framing & Space', type: 'video', isCompleted: false },
          { id: 'l22', title: '22. Color Theory', type: 'reading', isCompleted: false },
          { id: 'l23', title: '23. Milestone 5: Visual Storyteller', type: 'practical', isCompleted: false, milestoneId: 'm5' },
          { id: 'l24', title: '24. Portraits: Engaging Souls', type: 'video', isCompleted: false },
          { id: 'l25', title: '25. Studio Photography', type: 'video', isCompleted: false, proTip: 'In studio photography, the most important light is the one you turn off. Learn to control shadows first.' },
          { id: 'l26', title: '26. Street Photography', type: 'reading', isCompleted: false },
          { id: 'l27', title: '27. Milestone 6: Street Safari', type: 'practical', isCompleted: false, milestoneId: 'm6' },
          { id: 'l28', title: '28. Motion & Sports Action', type: 'video', isCompleted: false },
          { id: 'l29', title: '29. Wildlife & Nature', type: 'video', isCompleted: false },
          { id: 'l30', title: '30. Career Path Selection', type: 'quiz', isCompleted: false },
        ]
      },
      {
        id: 'month-3',
        title: 'Month 3: The Business',
        month: 3,
        lessons: [
          { id: 'l31', title: '31. Introduction to RAW', type: 'reading', isCompleted: false },
          { id: 'l32', title: '32. White Balance Mastery', type: 'video', isCompleted: false },
          { id: 'l33', title: '33. Adobe Lightroom Workflow', type: 'video', isCompleted: false },
          { id: 'l34', title: '34. Milestone 7: The RAW Edit', type: 'practical', isCompleted: false, milestoneId: 'm7' },
          { id: 'l35', title: '35. Post-Processing: Retouching', type: 'video', isCompleted: false },
          { id: 'l36', title: '36. Post-Processing: Color Grading', type: 'video', isCompleted: false },
          { id: 'l37', title: '37. Ethics & Law (Regional)', type: 'reading', isCompleted: false },
          { id: 'l38', title: '38. Milestone 8: The Contract', type: 'practical', isCompleted: false, milestoneId: 'm8' },
          { id: 'l39', title: '39. Pricing your Work', type: 'reading', isCompleted: false, proTip: 'Never say "I’m just an amateur" when talking to a client. Say "I am a Certified Pichazangu Photographer."' },
          { id: 'l40', title: '40. Pichazangu Dashboard Mastery', type: 'video', isCompleted: false },
          { id: 'l41', title: '41. Social Media Marketing', type: 'video', isCompleted: false },
          { id: 'l42', title: '42. Milestone 9: Portfolio Launch', type: 'practical', isCompleted: false, milestoneId: 'm9' },
          { id: 'l43', title: '43. Customer Service Excellence', type: 'reading', isCompleted: false },
          { id: 'l44', title: '44. The Final Examination', type: 'quiz', isCompleted: false },
          { id: 'l45', title: '45. Graduation & License', type: 'reading', isCompleted: false },
        ]
      }
    ]
  }
];

export const MOCK_GRADES: Grade[] = [
  { id: 'g1', assignmentName: 'Portrait Composition', score: 92, feedback: 'Excellent.', gradedBy: 'Ali Studio', date: '2024-05-12' }
];

export const MOCK_MATCHES: Match[] = [
  { id: 'm1', league: 'KPL', homeTeam: 'Gor Mahia', awayTeam: 'AFC Leopards', homeScore: 2, awayScore: 1, minute: 68, status: 'Live' }
];

export const MOCK_PLAYERS: PlayerStats[] = [
  { id: 'p1', name: 'Benson Omala', team: 'Gor Mahia', jerseyNumber: '10', position: 'Forward', matches: 24, goals: 18, assists: 4, image: 'https://i.pravatar.cc/150?u=omala' }
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
    isPublic: false, 
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