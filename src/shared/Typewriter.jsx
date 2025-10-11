import React, { useEffect, useState } from 'react'
import soundManager from '../utils/soundManager'

export default function Typewriter({ lines = [], speed = 25, enableSound = true }) {
  const [out, setOut] = useState([''])
  const [li, setLi] = useState(0)

  useEffect(() => {
    let mounted = true
    let i = 0
    let current = ''

    function tick() {
      const line = lines[li] || ''
      if (i <= line.length) {
        current = line.slice(0, i)
        setOut(prev => {
          const copy = [...prev]
          copy[li] = current
          return copy
        })
        // Jouer son de typing (1 chance sur 3 pour ne pas surcharger)
        if (enableSound && Math.random() > 0.7) {
          soundManager.playTyping()
        }
        i++
        setTimeout(tick, speed)
      } else {
        // next line after a pause
        setTimeout(() => {
          if (!mounted) return
          if (li < lines.length - 1) {
            setLi(l => l + 1)
            i = 0
            setOut(prev => [...prev, ''])
          }
        }, 300)
      }
    }

    tick()
    return () => (mounted = false)
  }, [li, lines, speed, enableSound])

  return (
    <div className="typewriter">
      {lines.map((_, idx) => (
        <div key={idx} className="type-line">{out[idx] || ''}<span className="cursor">▌</span></div>
      ))}
    </div>
  )
}

