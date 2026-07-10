import { motion } from 'framer-motion'
import { Play, Pause, Music, Upload, Link2, Youtube } from 'lucide-react'
import { useProfileStore } from '../store/profileStore'

const MusicPlayer = () => {
  const { profile, updateMusic } = useProfileStore()
  const { music } = profile

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      updateMusic({ type: 'file', source: url })
    }
  }

  const togglePlay = () => {
    updateMusic({ isPlaying: !music.isPlaying })
  }

  if (music.type === 'none') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl rounded-full px-6 py-3 flex items-center gap-4 shadow-xl"
    >
      <Music size={20} className="text-purple-400" />
      
      {music.type === 'file' && (
        <>
          <audio
            src={music.source}
            autoPlay={music.isPlaying}
            onEnded={() => updateMusic({ isPlaying: false })}
          />
          <span className="text-sm text-gray-300 max-w-[200px] truncate">
            Custom Track
          </span>
        </>
      )}
      
      {music.type === 'spotify' && (
        <a
          href={music.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
        >
          <span className="max-w-[200px] truncate">Spotify</span>
          <ExternalLink size={14} />
        </a>
      )}
      
      {music.type === 'youtube' && (
        <a
          href={music.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
        >
          <Youtube size={16} className="text-red-500" />
          <span className="max-w-[200px] truncate">YouTube</span>
          <ExternalLink size={14} />
        </a>
      )}

      {music.type === 'file' && (
        <button
          onClick={togglePlay}
          className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
        >
          {music.isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
    </motion.div>
  )
}

export default MusicPlayer
