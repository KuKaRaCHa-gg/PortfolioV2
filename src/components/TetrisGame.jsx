import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/tetris.css'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const CELL_SIZE = 25

// Formes des Tetrominos
const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#00ffff'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#ffff00'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#ff00ff'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00ff00'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#ff0000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: '#0000ff'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: '#ffa500'
  }
}

export default function TetrisGame() {
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)))
  const [currentPiece, setCurrentPiece] = useState(null)
  const [nextPiece, setNextPiece] = useState(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('tetris-highscore') || '0')
  })

  const gameLoopRef = useRef(null)
  const canvasRef = useRef(null)

  // Créer une pièce aléatoire
  const createPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS)
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
    return {
      type: randomPiece,
      ...TETROMINOS[randomPiece],
      rotation: 0
    }
  }, [])

  // Initialiser le jeu
  const initGame = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0))
    setBoard(newBoard)
    const piece = createPiece()
    const next = createPiece()
    setCurrentPiece(piece)
    setNextPiece(next)
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 })
    setScore(0)
    setLevel(1)
    setLines(0)
    setGameOver(false)
    setIsPaused(false)
    setGameStarted(true)
  }, [createPiece])

  // Rotation de pièce
  const rotatePiece = (piece) => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(row => row[i]).reverse()
    )
    return { ...piece, shape: rotated }
  }

  // Vérifier collision
  const checkCollision = useCallback((piece, pos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x
          const newY = pos.y + y

          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true
          }
        }
      }
    }
    return false
  }, [board])

  // Fusionner pièce avec le board
  const mergePiece = useCallback(() => {
    const newBoard = board.map(row => [...row])
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = position.y + y
          const boardX = position.x + x
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color
          }
        }
      }
    }
    return newBoard
  }, [board, currentPiece, position])

  // Supprimer les lignes complètes
  const clearLines = useCallback((newBoard) => {
    let linesCleared = 0
    const clearedBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++
        return false
      }
      return true
    })

    while (clearedBoard.length < BOARD_HEIGHT) {
      clearedBoard.unshift(Array(BOARD_WIDTH).fill(0))
    }

    if (linesCleared > 0) {
      const points = [0, 100, 300, 500, 800][linesCleared] * level
      setScore(prev => prev + points)
      setLines(prev => {
        const newLines = prev + linesCleared
        setLevel(Math.floor(newLines / 10) + 1)
        return newLines
      })
    }

    return clearedBoard
  }, [level])

  // Déplacer la pièce vers le bas
  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    const newPos = { x: position.x, y: position.y + 1 }

    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos)
    } else {
      // Fusionner et créer nouvelle pièce
      const merged = mergePiece()
      const cleared = clearLines(merged)
      setBoard(cleared)

      const newPiece = nextPiece
      const nextNew = createPiece()
      const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }

      if (checkCollision(newPiece, startPos)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('tetris-highscore', score.toString())
        }
      } else {
        setCurrentPiece(newPiece)
        setNextPiece(nextNew)
        setPosition(startPos)
      }
    }
  }, [currentPiece, position, board, gameOver, isPaused, nextPiece, createPiece, checkCollision, mergePiece, clearLines, score, highScore])

  // Déplacements
  const move = useCallback((dir) => {
    if (!currentPiece || gameOver || isPaused) return

    const newPos = {
      x: position.x + dir,
      y: position.y
    }

    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos)
    }
  }, [currentPiece, position, gameOver, isPaused, checkCollision])

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    const rotated = rotatePiece(currentPiece)
    if (!checkCollision(rotated, position)) {
      setCurrentPiece(rotated)
    }
  }, [currentPiece, position, gameOver, isPaused, checkCollision])

  const drop = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return

    let newPos = { ...position }
    while (!checkCollision(currentPiece, { x: newPos.x, y: newPos.y + 1 })) {
      newPos.y++
    }
    setPosition(newPos)
    moveDown()
  }, [currentPiece, position, gameOver, isPaused, checkCollision, moveDown])

  // Contrôles clavier
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          move(-1)
          break
        case 'ArrowRight':
          e.preventDefault()
          move(1)
          break
        case 'ArrowDown':
          e.preventDefault()
          moveDown()
          break
        case 'ArrowUp':
          e.preventDefault()
          rotate()
          break
        case ' ':
          e.preventDefault()
          if (gameStarted && !gameOver) {
            setIsPaused(prev => !prev)
          }
          break
        case 's':
        case 'S':
          e.preventDefault()
          drop()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameOver, move, moveDown, rotate, drop])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return

    const speed = Math.max(100, 1000 - (level - 1) * 100)
    gameLoopRef.current = setInterval(moveDown, speed)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver, isPaused, level, moveDown])

  // Dessiner sur canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dessiner la grille
    ctx.strokeStyle = '#00ff0033'
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath()
      ctx.moveTo(0, y * CELL_SIZE)
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE)
      ctx.stroke()
    }
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath()
      ctx.moveTo(x * CELL_SIZE, 0)
      ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE)
      ctx.stroke()
    }

    // Dessiner le board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = board[y][x]
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
          ctx.strokeStyle = '#000'
          ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1)
        }
      }
    }

    // Dessiner la pièce courante
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const drawX = (position.x + x) * CELL_SIZE
            const drawY = (position.y + y) * CELL_SIZE
            ctx.fillRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1)
            ctx.strokeStyle = '#000'
            ctx.strokeRect(drawX, drawY, CELL_SIZE - 1, CELL_SIZE - 1)
          }
        }
      }
    }

    // Effet scan line
    ctx.fillStyle = 'rgba(0, 255, 0, 0.05)'
    for (let i = 0; i < canvas.height; i += 2) {
      ctx.fillRect(0, i, canvas.width, 1)
    }
  }, [board, currentPiece, position])

  return (
    <div className="tetris-game">
      <h2 className="neon-text">[TETR] TETRIS TERMINAL</h2>

      <div className="tetris-container">
        <div className="tetris-main">
          <canvas
            ref={canvasRef}
            width={BOARD_WIDTH * CELL_SIZE}
            height={BOARD_HEIGHT * CELL_SIZE}
            className="tetris-canvas"
          />

          {!gameStarted && (
            <div className="tetris-overlay">
              <button onClick={initGame} className="terminal-button">
                [START] Nouvelle Partie
              </button>
            </div>
          )}

          {gameOver && (
            <div className="tetris-overlay">
              <div className="game-over-text">
                <div className="glitch-text">GAME OVER</div>
                <div>Score: {score}</div>
                {score === highScore && score > 0 && (
                  <div className="new-record">🏆 NOUVEAU RECORD !</div>
                )}
              </div>
              <button onClick={initGame} className="terminal-button">
                [RETRY] Rejouer
              </button>
            </div>
          )}

          {isPaused && !gameOver && (
            <div className="tetris-overlay">
              <div className="pause-text">⏸️ PAUSE</div>
            </div>
          )}
        </div>

        <div className="tetris-sidebar">
          <div className="tetris-stats">
            <div className="stat-box">
              <div className="stat-label">[SCORE]</div>
              <div className="stat-value">{score}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">[LEVEL]</div>
              <div className="stat-value">{level}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">[LINES]</div>
              <div className="stat-value">{lines}</div>
            </div>

            <div className="stat-box">
              <div className="stat-label">[BEST]</div>
              <div className="stat-value">{highScore}</div>
            </div>
          </div>

          <div className="next-piece-box">
            <div className="stat-label">[NEXT]</div>
            {nextPiece && (
              <div className="next-piece-preview">
                {nextPiece.shape.map((row, y) => (
                  <div key={y} className="preview-row">
                    {row.map((cell, x) => (
                      <div
                        key={x}
                        className="preview-cell"
                        style={{
                          backgroundColor: cell ? nextPiece.color : 'transparent',
                          border: cell ? '1px solid #000' : 'none'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="tetris-controls">
            <div className="stat-label">[CTRL] CONTRÔLES</div>
            <div className="control-list">
              <div>← → : Déplacer</div>
              <div>↑ : Rotation</div>
              <div>↓ : Descente rapide</div>
              <div>S : Drop instantané</div>
              <div>ESPACE : Pause</div>
            </div>
          </div>

          <div className="mobile-controls">
            <div className="mobile-row">
              <button onClick={() => move(-1)} className="control-btn">←</button>
              <button onClick={rotate} className="control-btn">↻</button>
              <button onClick={() => move(1)} className="control-btn">→</button>
            </div>
            <div className="mobile-row">
              <button onClick={moveDown} className="control-btn">↓</button>
              <button onClick={drop} className="control-btn">⬇</button>
              <button onClick={() => setIsPaused(!isPaused)} className="control-btn">
                {isPaused ? '▶' : '⏸'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="tetris-legend">
        <div className="stat-label">[INFO] SCORING</div>
        <div className="legend-content">
          <span>1 ligne = 100pts</span>
          <span>2 lignes = 300pts</span>
          <span>3 lignes = 500pts</span>
          <span>4 lignes (Tetris!) = 800pts</span>
        </div>
      </div>
    </div>
  )
}
