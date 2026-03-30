import React from 'react'

export default function LogoMark({ className = '', title = 'Daniil Minevich logo' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width="64"
      height="64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#05210f" />
          <stop offset="100%" stopColor="#021108" />
        </linearGradient>
        <linearGradient id="logo-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#79ffae" />
          <stop offset="100%" stopColor="#00ff66" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#logo-bg)" stroke="url(#logo-ring)" strokeWidth="3" />
      <path d="M18 44V20h8l8 12 8-12h8v24h-7V31l-8 11-8-11v13h-9z" fill="#b7ffd1" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#00ff66" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  )
}