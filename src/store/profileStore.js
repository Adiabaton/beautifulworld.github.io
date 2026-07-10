import { create } from 'zustand'

export const useProfileStore = create((set) => ({
  // Profile data
  profile: {
    id: 1,
    username: 'yourname',
    displayName: 'Your Name',
    customUrl: 'yourname',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    banner: '',
    bio: 'Your bio goes here...',
    pronouns: 'they/them',
    location: 'Earth',
    website: '',
    statusMessage: 'Living my best life',
    badges: ['verified', 'developer', 'musician'],
    achievements: {
      earlyUser: true,
      verified: true,
      premium: false,
      bugHunter: false,
      donator: false,
      staff: false,
      artist: false,
      developer: true,
      trending: false,
      translator: false,
    },
    discord: {
      status: 'online',
      username: 'username#0000',
      activity: '',
      customStatus: '',
      richPresence: false,
      spotifySong: '',
      joinServerButton: '',
      avatarDecoration: '',
      banner: '',
    },
    socials: {
      github: '',
      twitter: '',
      instagram: '',
      youtube: '',
      soundcloud: '',
      appleMusic: '',
      deezer: '',
      audius: '',
    },
    music: {
      type: 'none', // 'file', 'spotify', 'youtube', 'soundcloud', 'apple', 'deezer', 'audius', 'none'
      source: '',
      isPlaying: false,
      autoplay: false,
      loop: false,
      shuffle: false,
      playlist: [],
      currentIndex: 0,
    },
    customization: {
      background: 'gradient-purple',
      customBackground: '',
      videoBackground: '',
      backgroundType: 'gradient', // 'gradient', 'image', 'video', 'particles'
      particles: {
        type: 'none', // 'rain', 'snow', 'stars', 'matrix', 'fireflies', 'none'
        count: 100,
        speed: 1,
      },
      gradient: {
        colors: ['#667eea', '#764ba2'],
        angle: 135,
        animated: false,
      },
      blur: 0,
      glowIntensity: 0.5,
      cardTransparency: 0.9,
      borderRadius: 16,
      shadowColor: '#9333ea',
      noiseOverlay: false,
      glassmorphism: true,
      font: 'inter',
      customFont: '',
      accentColor: '#9333ea',
      foreground: 'default',
      animation: 'float',
      cursor: 'default',
      customCursor: '',
    },
    stats: {
      views: 0,
      uniqueVisitors: 0,
      likes: 0,
      comments: 0,
      followers: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      lastOnline: new Date().toISOString(),
      timeSpent: 0,
      favoriteSongPlays: 0,
      viewsOverTime: [],
    },
    guestbook: [],
    timeline: [],
  },
  isEditMode: false,
  
  // Actions
  updateProfile: (updates) => set((state) => ({ 
    profile: { ...state.profile, ...updates } 
  })),
  
  updateCustomization: (updates) => set((state) => ({
    profile: {
      ...state.profile,
      customization: { ...state.profile.customization, ...updates }
    }
  })),
  
  updateGradient: (updates) => set((state) => ({
    profile: {
      ...state.profile,
      customization: {
        ...state.profile.customization,
        gradient: { ...state.profile.customization.gradient, ...updates }
      }
    }
  })),
  
  updateParticles: (updates) => set((state) => ({
    profile: {
      ...state.profile,
      customization: {
        ...state.profile.customization,
        particles: { ...state.profile.customization.particles, ...updates }
      }
    }
  })),
  
  updateDiscord: (updates) => set((state) => ({
    profile: {
      ...state.profile,
      discord: { ...state.profile.discord, ...updates }
    }
  })),
  
  updateMusic: (updates) => set((state) => ({
    profile: {
      ...state.profile,
      music: { ...state.profile.music, ...updates }
    }
  })),
  
  updateAchievement: (key, value) => set((state) => ({
    profile: {
      ...state.profile,
      achievements: { ...state.profile.achievements, [key]: value }
    }
  })),
  
  addBadge: (badge) => set((state) => ({
    profile: {
      ...state.profile,
      badges: [...state.profile.badges, badge]
    }
  })),
  
  removeBadge: (badge) => set((state) => ({
    profile: {
      ...state.profile,
      badges: state.profile.badges.filter(b => b !== badge)
    }
  })),
  
  addGuestbookEntry: (entry) => set((state) => ({
    profile: {
      ...state.profile,
      guestbook: [...state.profile.guestbook, entry]
    }
  })),
  
  addTimelineEntry: (entry) => set((state) => ({
    profile: {
      ...state.profile,
      timeline: [...state.profile.timeline, entry]
    }
  })),
  
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  
  incrementViews: () => set((state) => ({
    profile: {
      ...state.profile,
      stats: {
        ...state.profile.stats,
        views: state.profile.stats.views + 1,
        viewsOverTime: [
          ...state.profile.stats.viewsOverTime,
          { date: new Date().toISOString(), views: state.profile.stats.views + 1 }
        ]
      }
    }
  })),
  
  recordTimeSpent: (seconds) => set((state) => ({
    profile: {
      ...state.profile,
      stats: {
        ...state.profile.stats,
        timeSpent: state.profile.stats.timeSpent + seconds
      }
    }
  })),
}))
