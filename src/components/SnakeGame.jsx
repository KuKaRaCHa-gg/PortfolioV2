import React, { useState, useEffect, useRef } from 'react';
import '../styles/snake.css';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef(null);
  const directionRef = useRef(direction);
  
  const GRID_SIZE = 30;
  const CELL_SIZE = 15;

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score);
    }
  }, [score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      const currentDir = directionRef.current;
      
      if (key === ' ') {
        e.preventDefault();
        setIsPaused(prev => !prev);
        return;
      }

      if (key === 'ArrowUp' && currentDir !== 'DOWN') {
        setDirection('UP');
      } else if (key === 'ArrowDown' && currentDir !== 'UP') {
        setDirection('DOWN');
      } else if (key === 'ArrowLeft' && currentDir !== 'RIGHT') {
        setDirection('LEFT');
      } else if (key === 'ArrowRight' && currentDir !== 'LEFT') {
        setDirection('RIGHT');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead;

        switch (directionRef.current) {
          case 'UP':
            newHead = [head[0], head[1] - 1];
            break;
          case 'DOWN':
            newHead = [head[0], head[1] + 1];
            break;
          case 'LEFT':
            newHead = [head[0] - 1, head[1]];
            break;
          case 'RIGHT':
            newHead = [head[0] + 1, head[1]];
            break;
          default:
            newHead = head;
        }

        // Collision avec les murs
        if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || 
            newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Collision avec soi-même
        if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Manger la nourriture
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(prev => prev + 10);
          generateFood(newSnake);
          // Augmenter la vitesse progressivement
          setSpeed(prev => Math.max(50, prev - 2));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [gameOver, speed, food, isPaused]);

  const generateFood = (currentSnake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
    } while (currentSnake.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]));
    
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake([[10, 10]]);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setSpeed(150);
    setIsPaused(false);
    generateFood([[10, 10]]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    // Fond
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grille
    ctx.strokeStyle = '#001100';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Serpent
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ff00' : '#00aa00';
      ctx.fillRect(
        segment[0] * CELL_SIZE + 1,
        segment[1] * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
      
      // Oeil du serpent
      if (index === 0) {
        ctx.fillStyle = '#000';
        ctx.fillRect(
          segment[0] * CELL_SIZE + 3,
          segment[1] * CELL_SIZE + 3,
          2, 2
        );
      }
    });

    // Nourriture
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(
      food[0] * CELL_SIZE + CELL_SIZE / 2,
      food[1] * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Ombre de la nourriture
    ctx.shadowColor = '#ff0000';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <div className="snake-container terminal-card">
      <div className="snake-header">
        <h2 className="neon-text">[SNEK] SNAKE TERMINAL</h2>
        <p className="terminal-text">Jeu classique rétro - Utilisez les flèches</p>
      </div>

      <div className="snake-stats">
        <div className="stat-box">
          <span className="stat-label">SCORE</span>
          <span className="stat-value score-current">{score}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">MEILLEUR</span>
          <span className="stat-value score-high">{highScore}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">LONGUEUR</span>
          <span className="stat-value">{snake.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">VITESSE</span>
          <span className="stat-value">{Math.round((200 - speed) / 10)}/15</span>
        </div>
      </div>

      <div className="snake-canvas-wrapper">
        <canvas ref={canvasRef} className="snake-canvas" />
        
        {gameOver && (
          <div className="game-overlay">
            <div className="game-over-box">
              <h2 className="glitch-text" data-text="GAME OVER">GAME OVER</h2>
              <p className="score-display">Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="new-record">🏆 NOUVEAU RECORD! 🏆</p>
              )}
              <button onClick={resetGame} className="terminal-button primary">
                ▶ REJOUER
              </button>
            </div>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="game-overlay">
            <div className="pause-box">
              <h2 className="neon-text">⏸ PAUSE</h2>
              <p className="terminal-text">Appuyez sur ESPACE pour continuer</p>
            </div>
          </div>
        )}
      </div>

      <div className="snake-controls">
        <div className="control-buttons">
          <button 
            onClick={resetGame}
            className="terminal-button"
          >
            🔄 NOUVELLE PARTIE
          </button>
          <button 
            onClick={() => setIsPaused(!isPaused)}
            disabled={gameOver}
            className="terminal-button"
          >
            {isPaused ? '▶ REPRENDRE' : '⏸ PAUSE'}
          </button>
        </div>

        <div className="mobile-controls">
          <button 
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
            className="mobile-btn"
          >
            ▲
          </button>
          <div className="mobile-row">
            <button 
              onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
              className="mobile-btn"
            >
              ◀
            </button>
            <button 
              onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
              className="mobile-btn"
            >
              ▶
            </button>
          </div>
          <button 
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
            className="mobile-btn"
          >
            ▼
          </button>
        </div>
      </div>

      <div className="snake-instructions terminal-card">
        <h3>[CTRL] CONTRÔLES</h3>
        <ul>
          <li>⬆️⬇️⬅️➡️ Flèches directionnelles pour se déplacer</li>
          <li>ESPACE pour mettre en pause</li>
          <li>🍎 Mangez les pommes pour grandir</li>
          <li>⚠️ Évitez les murs et votre propre corps</li>
          <li>🏆 Plus vous mangez, plus c'est rapide!</li>
        </ul>
      </div>
    </div>
  );
};

export default SnakeGame;
