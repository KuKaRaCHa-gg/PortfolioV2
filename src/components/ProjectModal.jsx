import React from 'react'

export default function ProjectModal({project,onClose}){
  if(!project) return null
  return (
    <div className="modal">
      <div className="modal-inner">
        <h2>{project.title}</h2>
        <p>{project.short}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
