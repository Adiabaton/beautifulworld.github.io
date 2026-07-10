import { motion } from 'framer-motion'
import { Github, Twitter, Instagram, Youtube, ExternalLink, Edit2, Eye, MapPin, Globe, Calendar, MessageCircle, Heart, Cloud } from 'lucide-react'
import { useProfileStore } from '../store/profileStore'
import { BADGE_TYPES, DISCORD_STATUS_COLORS, BACKGROUND_OPTIONS } from '../data/badges'

const ProfileCard = () => {
  const { profile, isEditMode, toggleEditMode, incrementViews } = useProfileStore()
  
  const backgroundStyle = (() => {
    if (profile.customization.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(${profile.customization.gradient.angle}deg, ${profile.customization.gradient.colors.join(', ')})`,
        backgroundSize: profile.customization.gradient.animated ? '400% 400%' : '100% 100%',
        animation: profile.customization.gradient.animated ? 'gradientShift 3s ease infinite' : 'none',
      }
    } else if (profile.customization.backgroundType === 'image' && profile.customization.customBackground) {
      return { backgroundImage: `url(${profile.customization.customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    } else if (profile.customization.backgroundType === 'video' && profile.customization.videoBackground) {
      return { backgroundImage: `url(${profile.customization.videoBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    }
    return { background: BACKGROUND_OPTIONS[profile.customization.background] }
  })()

  const fontStyle = { fontFamily: profile.customization.customFont || profile.customization.font }
  const cardStyle = {
    borderRadius: `${profile.customization.borderRadius}px`,
    backgroundColor: `rgba(17, 24, 39, ${profile.customization.cardTransparency})`,
    backdropFilter: `blur(${profile.customization.blur}px)`,
    boxShadow: `0 0 ${profile.customization.glowIntensity * 40}px ${profile.customization.shadowColor}`,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={backgroundStyle}
    >
      {/* Noise Overlay */}
      {profile.customization.noiseOverlay && (
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
        }} />
      )}

      <motion.div
        className={`relative backdrop-blur-xl p-8 max-w-md w-full ${profile.customization.glassmorphism ? 'glass-effect' : ''} ${profile.customization.animation}`}
        style={{ ...fontStyle, ...cardStyle }}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Banner */}
        {profile.banner && (
          <div className="absolute top-0 left-0 right-0 h-32 rounded-t-lg overflow-hidden">
            <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Edit Button */}
        <button
          onClick={() => {
            toggleEditMode()
            if (!isEditMode) incrementViews()
          }}
          className="absolute top-4 right-4 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors z-10"
          style={{ top: profile.banner ? '140px' : '16px' }}
        >
          {isEditMode ? <Eye size={20} /> : <Edit2 size={20} />}
        </button>

        {/* User ID */}
        <div className="absolute top-4 left-4 text-sm text-gray-400 z-10" style={{ top: profile.banner ? '140px' : '16px' }}>
          #{profile.id.toString().padStart(4, '0')}
        </div>

        {/* Avatar */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-6"
          style={{ marginTop: profile.banner ? '48px' : '0' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-full h-full rounded-full border-4 object-cover"
            style={{ borderColor: profile.customization.accentColor }}
          />
          
          {/* Discord Status Indicator */}
          <div
            className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-gray-900"
            style={{ backgroundColor: DISCORD_STATUS_COLORS[profile.discord.status] }}
            title={profile.discord.status}
          />
        </motion.div>

        {/* Display Name & Username */}
        <div className="text-center mb-4">
          <motion.h1
            className="text-3xl font-bold mb-1"
            style={{ color: profile.customization.accentColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {profile.displayName}
          </motion.h1>
          <p className="text-gray-400">@{profile.username}</p>
          {profile.pronouns && (
            <p className="text-sm text-gray-500">{profile.pronouns}</p>
          )}
        </div>

        {/* Status Message */}
        {profile.statusMessage && (
          <div className="flex items-center justify-center gap-2 mb-4 text-gray-300">
            <MessageCircle size={16} />
            <span className="text-sm">{profile.statusMessage}</span>
          </div>
        )}

        {/* Location & Website */}
        <div className="flex justify-center gap-4 mb-4 text-sm text-gray-400">
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Globe size={14} />
              <span>Website</span>
            </a>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {profile.badges.map((badge) => {
            const badgeInfo = BADGE_TYPES[badge]
            if (!badgeInfo) return null
            return (
              <motion.span
                key={badge}
                className={`${badgeInfo.color} px-3 py-1 rounded-full text-sm font-medium ${badgeInfo.glow} shadow-lg`}
                whileHover={{ scale: 1.1 }}
                title={badgeInfo.name}
              >
                {badgeInfo.icon}
              </motion.span>
            )
          })}
        </div>

        {/* Bio */}
        <p className="text-center text-gray-300 mb-6">{profile.bio}</p>

        {/* Discord Info */}
        {profile.discord.username && (
          <div className="flex items-center justify-center gap-2 mb-6 text-gray-400">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: DISCORD_STATUS_COLORS[profile.discord.status] }}
            />
            <span>{profile.discord.username}</span>
            {profile.discord.customStatus && (
              <span className="text-sm">- {profile.discord.customStatus}</span>
            )}
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-6">
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform"
            >
              <Github size={24} />
            </a>
          )}
          {profile.socials.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform"
            >
              <Twitter size={24} />
            </a>
          )}
          {profile.socials.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform"
            >
              <Instagram size={24} />
            </a>
          )}
          {profile.socials.youtube && (
            <a
              href={profile.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform"
            >
              <Youtube size={24} />
            </a>
          )}
          {profile.socials.soundcloud && (
            <a
              href={profile.socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:scale-110 transform"
            >
              <Cloud size={24} />
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-center text-sm text-gray-400 mb-4">
          <div>
            <div className="text-2xl font-bold text-white">{profile.stats.views}</div>
            <div>Views</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.stats.likes}</div>
            <div>Likes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.stats.followers}</div>
            <div>Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.badges.length}</div>
            <div>Badges</div>
          </div>
        </div>

        {/* Join Date */}
        <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>Joined {new Date(profile.stats.createdAt).toLocaleDateString()}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProfileCard
