import React from 'react'

export default function Skills({items=[]}){
  return (
    <div className="skills-list">
      <h3>Compétences</h3>
      <ul>
        {items.map((s,i)=> <li key={i}>{s}</li>)}
      </ul>
    </div>
  )
}
