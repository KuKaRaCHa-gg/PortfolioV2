import React, { useEffect, useRef } from 'react'

export default function Pong(){
  const canvasRef = useRef(null)

  useEffect(()=>{
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = 640
    let h = canvas.height = 360

    let ball = {x:w/2,y:h/2, vx:3, vy:2, r:6}
    let paddle = {x:10,y:h/2-30,w:8,h:60}
    let score = 0

    // Contrôle par souris
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseY = e.clientY - rect.top
      paddle.y = mouseY - paddle.h / 2
      // Limiter le paddle dans le canvas
      if(paddle.y < 0) paddle.y = 0
      if(paddle.y + paddle.h > h) paddle.y = h - paddle.h
    })

    function loop(){
      // Fond noir
      ctx.fillStyle = '#000'
      ctx.fillRect(0,0,w,h)
      
      // Balle
      ctx.fillStyle = '#33ff33'
      ctx.beginPath()
      ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2)
      ctx.fill()
      
      // Paddle
      ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h)

      // Score
      ctx.font = '16px "Share Tech Mono", monospace'
      ctx.fillText(`Score: ${score}`, 10, 20)

      // Mouvement balle
      ball.x += ball.vx
      ball.y += ball.vy

      // Rebonds haut/bas
      if(ball.y < ball.r || ball.y > h-ball.r) ball.vy *= -1

      // Collision avec paddle
      if(ball.x - ball.r < paddle.x + paddle.w && 
         ball.y > paddle.y && 
         ball.y < paddle.y + paddle.h){
        ball.vx *= -1
        score++
      }

      // Balle sort du terrain (gauche)
      if(ball.x < 0) { 
        ball.x = w/2
        ball.y = h/2
        score = 0
      }

      // Rebond droite
      if(ball.x > w) ball.vx *= -1

      requestAnimationFrame(loop)
    }
    loop()
  },[])

  return (
    <div className="terminal-screen">
      <div className="terminal-frame">
        <h3>Pong (mini-jeu)</h3>
        <canvas ref={canvasRef} style={{border:'2px solid #00FF00'}} />
        <div className="hint">Déplacez la souris pour contrôler le paddle vert</div>
      </div>
    </div>
  )
}
