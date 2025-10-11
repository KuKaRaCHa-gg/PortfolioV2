import React, { useState, useEffect } from 'react'

export default function Header(){
  const [time, setTime] = useState(new Date())
  const [battery, setBattery] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    
    // Simulation batterie (décrémente lentement)
    const batteryTimer = setInterval(() => {
      setBattery(prev => prev > 0 ? prev - 1 : 100)
    }, 60000) // Chaque minute

    return () => {
      clearInterval(timer)
      clearInterval(batteryTimer)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <header className="terminal-header-enhanced">
      <div className="header-section header-left">
        <img src="/images/PP&logo/LogoRond.png" alt="Logo" className="header-logo" />
        <span className="header-icon">▶</span>
        <span className="header-brand glitch-text" data-text="DANIIL.DEV">DANIIL.DEV</span>
        <span className="header-badge">v2.0</span>
      </div>

      <div className="header-section header-center">
        <span className="system-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </span>
      </div>

      <div className="header-section header-right">
        <span className="header-time">{formatTime(time)}</span>
        <span className="header-date">{formatDate(time)}</span>
        <span className="header-battery" title={`Batterie: ${battery}%`}>
          <span className="battery-icon">🔋</span>
          <span className="battery-level">{battery}%</span>
        </span>
      </div>
    </header>
  )
}
