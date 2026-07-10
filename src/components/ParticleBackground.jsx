import { useEffect, useRef } from 'react'

const ParticleBackground = ({ type, count, speed }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: Math.random() * speed + 1,
          opacity: Math.random() * 0.5 + 0.5,
          char: type === 'matrix' ? String.fromCharCode(0x30A0 + Math.random() * 96) : null,
        })
      }
    }

    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        if (type === 'rain') {
          particle.y += particle.speedY * 2
          if (particle.y > canvas.height) {
            particle.y = -10
            particle.x = Math.random() * canvas.width
          }
          ctx.strokeStyle = `rgba(174, 194, 224, ${particle.opacity})`
          ctx.lineWidth = particle.size
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x, particle.y + 15)
          ctx.stroke()
        } else if (type === 'snow') {
          particle.y += particle.speedY * 0.5
          particle.x += Math.sin(particle.y * 0.01) * 0.5
          if (particle.y > canvas.height) {
            particle.y = -10
            particle.x = Math.random() * canvas.width
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (type === 'stars') {
          particle.opacity = 0.5 + Math.sin(Date.now() * 0.001 + index) * 0.5
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (type === 'matrix') {
          particle.y += particle.speedY * 2
          if (particle.y > canvas.height) {
            particle.y = -20
            particle.x = Math.random() * canvas.width
            particle.char = String.fromCharCode(0x30A0 + Math.random() * 96)
          }
          ctx.fillStyle = `rgba(0, 255, 70, ${particle.opacity})`
          ctx.font = `${particle.size * 5}px monospace`
          ctx.fillText(particle.char, particle.x, particle.y)
        } else if (type === 'fireflies') {
          particle.x += particle.speedX
          particle.y += particle.speedY
          particle.opacity = 0.3 + Math.sin(Date.now() * 0.003 + index) * 0.7
          
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
          
          ctx.fillStyle = `rgba(255, 200, 50, ${particle.opacity})`
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(255, 200, 50, 0.5)'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [type, count, speed])

  if (type === 'none') return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

export default ParticleBackground
