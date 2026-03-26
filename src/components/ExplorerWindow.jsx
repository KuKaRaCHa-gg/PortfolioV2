import React from 'react'

export default function ExplorerWindow({ title, path, status = 'Ready', className = '', children }) {
  return (
    <section className={`xp-window ${className}`.trim()}>
      <header className="xp-titlebar">
        <div className="xp-title-left">[EXPLORER] {title}</div>
        <div className="xp-title-buttons" aria-hidden="true">
          <span>_</span>
          <span>[]</span>
          <span>X</span>
        </div>
      </header>

      <div className="xp-toolbar">
        <span className="xp-path">Address: {path}</span>
      </div>

      <div className="xp-content">{children}</div>

      <footer className="xp-statusbar">
        <span>{status}</span>
      </footer>
    </section>
  )
}
