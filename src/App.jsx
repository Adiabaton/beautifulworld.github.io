import { useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import MusicPlayer from './components/MusicPlayer'
import EditPanel from './components/EditPanel'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import { useProfileStore } from './store/profileStore'

function App() {
  const { isEditMode, incrementViews, profile, recordTimeSpent } = useProfileStore()

  useEffect(() => {
    incrementViews()
    const startTime = Date.now()
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      recordTimeSpent(timeSpent)
    }
  }, [incrementViews, recordTimeSpent])

  return (
    <>
      <CustomCursor 
        cursor={profile.customization.cursor} 
        customCursor={profile.customization.customCursor} 
      />
      <ParticleBackground 
        type={profile.customization.particles.type}
        count={profile.customization.particles.count}
        speed={profile.customization.particles.speed}
      />
      <ProfileCard />
      <MusicPlayer />
      {isEditMode && <EditPanel />}
    </>
  )
}

export default App
