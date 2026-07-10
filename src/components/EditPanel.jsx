import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Link as LinkIcon, Save, Palette, Sliders, Music, Disc, User, MapPin, Globe, MessageCircle, Sparkles } from 'lucide-react'
import { useProfileStore } from '../store/profileStore'
import { BADGE_TYPES, BACKGROUND_OPTIONS, FONT_OPTIONS, ANIMATION_OPTIONS, DISCORD_STATUS_COLORS } from '../data/badges'
import GradientEditor from './GradientEditor'

const EditPanel = () => {
  const { profile, updateProfile, updateCustomization, updateGradient, updateParticles, updateDiscord, updateMusic, addBadge, removeBadge, toggleEditMode } = useProfileStore()

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateProfile({ avatar: url })
    }
  }

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateCustomization({ customBackground: url })
    }
  }

  const handleMusicFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateMusic({ type: 'file', source: url })
    }
  }

  const handleBannerUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateProfile({ banner: url })
    }
  }

  const handleVideoBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateCustomization({ videoBackground: url })
    }
  }

  const handleCustomFontUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateCustomization({ customFont: url })
    }
  }

  const handleCustomCursorUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateCustomization({ customCursor: url })
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={toggleEditMode}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button onClick={toggleEditMode} className="p-2 hover:bg-gray-800 rounded-full">
              <X size={24} />
            </button>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <User size={18} /> Basic Info
            </h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Display Name</label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => updateProfile({ displayName: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => updateProfile({ username: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Custom URL</label>
              <input
                type="text"
                value={profile.customUrl}
                onChange={(e) => updateProfile({ customUrl: e.target.value })}
                placeholder="yourname"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Pronouns</label>
              <input
                type="text"
                value={profile.pronouns}
                onChange={(e) => updateProfile({ pronouns: e.target.value })}
                placeholder="they/them"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="Earth"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Website</label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => updateProfile({ website: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Status Message</label>
              <input
                type="text"
                value={profile.statusMessage}
                onChange={(e) => updateProfile({ statusMessage: e.target.value })}
                placeholder="Living my best life"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => updateProfile({ bio: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.avatar}
                  onChange={(e) => updateProfile({ avatar: e.target.value })}
                  placeholder="Image URL"
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Banner</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.banner}
                  onChange={(e) => updateProfile({ banner: e.target.value })}
                  placeholder="Image URL"
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Discord */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <Disc size={18} /> Discord
            </h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Discord Username</label>
              <input
                type="text"
                value={profile.discord.username}
                onChange={(e) => updateDiscord({ username: e.target.value })}
                placeholder="username#0000"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Status</label>
              <select
                value={profile.discord.status}
                onChange={(e) => updateDiscord({ status: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="online">Online</option>
                <option value="idle">Idle</option>
                <option value="dnd">Do Not Disturb</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Custom Status</label>
              <input
                type="text"
                value={profile.discord.customStatus}
                onChange={(e) => updateDiscord({ customStatus: e.target.value })}
                placeholder="Playing a game"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Activity</label>
              <input
                type="text"
                value={profile.discord.activity}
                onChange={(e) => updateDiscord({ activity: e.target.value })}
                placeholder="Playing Minecraft"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Spotify Song</label>
              <input
                type="text"
                value={profile.discord.spotifySong}
                onChange={(e) => updateDiscord({ spotifySong: e.target.value })}
                placeholder="Song name - Artist"
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Join Server Button</label>
              <input
                type="text"
                value={profile.discord.joinServerButton}
                onChange={(e) => updateDiscord({ joinServerButton: e.target.value })}
                placeholder="https://discord.gg/..."
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="richPresence"
                checked={profile.discord.richPresence}
                onChange={(e) => updateDiscord({ richPresence: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="richPresence" className="text-sm text-gray-300">Enable Rich Presence</label>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <LinkIcon size={18} /> Social Links
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                <input
                  type="text"
                  value={profile.socials.github}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, github: e.target.value } })}
                  placeholder="https://github.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Twitter</label>
                <input
                  type="text"
                  value={profile.socials.twitter}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, twitter: e.target.value } })}
                  placeholder="https://twitter.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Instagram</label>
                <input
                  type="text"
                  value={profile.socials.instagram}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, instagram: e.target.value } })}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">YouTube</label>
                <input
                  type="text"
                  value={profile.socials.youtube}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, youtube: e.target.value } })}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">SoundCloud</label>
                <input
                  type="text"
                  value={profile.socials.soundcloud}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, soundcloud: e.target.value } })}
                  placeholder="https://soundcloud.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Apple Music</label>
                <input
                  type="text"
                  value={profile.socials.appleMusic}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, appleMusic: e.target.value } })}
                  placeholder="https://music.apple.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Deezer</label>
                <input
                  type="text"
                  value={profile.socials.deezer}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, deezer: e.target.value } })}
                  placeholder="https://deezer.com/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Audius</label>
                <input
                  type="text"
                  value={profile.socials.audius}
                  onChange={(e) => updateProfile({ socials: { ...profile.socials, audius: e.target.value } })}
                  placeholder="https://audius.co/..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400">Badges</h3>
            
            <div className="flex flex-wrap gap-2">
              {Object.entries(BADGE_TYPES).map(([key, badge]) => (
                <button
                  key={key}
                  onClick={() => {
                    if (profile.badges.includes(key)) {
                      removeBadge(key)
                    } else {
                      addBadge(key)
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    profile.badges.includes(key)
                      ? `${badge.color} ring-2 ring-white`
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {badge.icon} {badge.name}
                </button>
              ))}
            </div>
          </div>

          {/* Music */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <Music size={18} /> Music
            </h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Type</label>
              <select
                value={profile.music.type}
                onChange={(e) => updateMusic({ type: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="none">None</option>
                <option value="file">Upload File</option>
                <option value="spotify">Spotify Link</option>
                <option value="youtube">YouTube Link</option>
                <option value="soundcloud">SoundCloud Link</option>
                <option value="apple">Apple Music Link</option>
                <option value="deezer">Deezer Link</option>
                <option value="audius">Audius Link</option>
              </select>
            </div>

            {profile.music.type === 'file' && (
              <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors w-fit">
                <Upload size={16} />
                <span>Upload Audio File</span>
                <input type="file" accept="audio/*" onChange={handleMusicFileUpload} className="hidden" />
              </label>
            )}

            {profile.music.type !== 'none' && profile.music.type !== 'file' && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Link</label>
                <input
                  type="text"
                  value={profile.music.source}
                  onChange={(e) => updateMusic({ source: e.target.value })}
                  placeholder="Paste your link here..."
                  className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={profile.music.autoplay}
                  onChange={(e) => updateMusic({ autoplay: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="autoplay" className="text-sm text-gray-300">Autoplay</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="loop"
                  checked={profile.music.loop}
                  onChange={(e) => updateMusic({ loop: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="loop" className="text-sm text-gray-300">Loop</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shuffle"
                  checked={profile.music.shuffle}
                  onChange={(e) => updateMusic({ shuffle: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="shuffle" className="text-sm text-gray-300">Shuffle</label>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <Palette size={18} /> Appearance
            </h3>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Background Type</label>
              <select
                value={profile.customization.backgroundType}
                onChange={(e) => updateCustomization({ backgroundType: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="particles">Particles</option>
              </select>
            </div>

            {profile.customization.backgroundType === 'gradient' && (
              <GradientEditor 
                gradient={profile.customization.gradient} 
                onChange={updateGradient} 
              />
            )}

            {profile.customization.backgroundType === 'image' && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Background Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.customization.customBackground}
                    onChange={(e) => updateCustomization({ customBackground: e.target.value })}
                    placeholder="Image URL"
                    className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {profile.customization.backgroundType === 'video' && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Video Background</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.customization.videoBackground}
                    onChange={(e) => updateCustomization({ videoBackground: e.target.value })}
                    placeholder="Video URL"
                    className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input type="file" accept="video/*" onChange={handleVideoBackgroundUpload} className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {profile.customization.backgroundType === 'particles' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Particle Type</label>
                  <select
                    value={profile.customization.particles.type}
                    onChange={(e) => updateParticles({ type: e.target.value })}
                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="none">None</option>
                    <option value="rain">Rain</option>
                    <option value="snow">Snow</option>
                    <option value="stars">Stars</option>
                    <option value="matrix">Matrix</option>
                    <option value="fireflies">Fireflies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Particle Count: {profile.customization.particles.count}</label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={profile.customization.particles.count}
                    onChange={(e) => updateParticles({ count: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Speed: {profile.customization.particles.speed}x</label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={profile.customization.particles.speed}
                    onChange={(e) => updateParticles({ speed: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-md font-semibold text-purple-300 flex items-center gap-2">
                <Sliders size={16} /> Card Effects
              </h4>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Blur: {profile.customization.blur}px</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={profile.customization.blur}
                  onChange={(e) => updateCustomization({ blur: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Glow Intensity: {profile.customization.glowIntensity}x</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={profile.customization.glowIntensity}
                  onChange={(e) => updateCustomization({ glowIntensity: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Card Transparency: {Math.round(profile.customization.cardTransparency * 100)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={profile.customization.cardTransparency}
                  onChange={(e) => updateCustomization({ cardTransparency: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Border Radius: {profile.customization.borderRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={profile.customization.borderRadius}
                  onChange={(e) => updateCustomization({ borderRadius: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Shadow Color</label>
                <input
                  type="color"
                  value={profile.customization.shadowColor}
                  onChange={(e) => updateCustomization({ shadowColor: e.target.value })}
                  className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noiseOverlay"
                  checked={profile.customization.noiseOverlay}
                  onChange={(e) => updateCustomization({ noiseOverlay: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="noiseOverlay" className="text-sm text-gray-300">Noise Overlay</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="glassmorphism"
                  checked={profile.customization.glassmorphism}
                  onChange={(e) => updateCustomization({ glassmorphism: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="glassmorphism" className="text-sm text-gray-300">Glassmorphism</label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Accent Color</label>
              <input
                type="color"
                value={profile.customization.accentColor}
                onChange={(e) => updateCustomization({ accentColor: e.target.value })}
                className="w-full h-10 bg-gray-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Font</label>
              <select
                value={profile.customization.font}
                onChange={(e) => updateCustomization({ font: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Object.entries(FONT_OPTIONS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Custom Font</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.customization.customFont}
                  onChange={(e) => updateCustomization({ customFont: e.target.value })}
                  placeholder="Font URL"
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span>Upload</span>
                  <input type="file" accept="font/*" onChange={handleCustomFontUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Animation</label>
              <select
                value={profile.customization.animation}
                onChange={(e) => updateCustomization({ animation: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {Object.entries(ANIMATION_OPTIONS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Cursor</label>
              <select
                value={profile.customization.cursor}
                onChange={(e) => updateCustomization({ cursor: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="default">Default</option>
                <option value="pointer">Pointer</option>
                <option value="crosshair">Crosshair</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            {profile.customization.cursor === 'custom' && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Custom Cursor</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={profile.customization.customCursor}
                    onChange={(e) => updateCustomization({ customCursor: e.target.value })}
                    placeholder="Cursor URL"
                    className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <label className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                    <Upload size={16} />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleCustomCursorUpload} className="hidden" />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={toggleEditMode}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Changes
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EditPanel
