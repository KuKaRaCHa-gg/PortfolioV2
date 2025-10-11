import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/gameoflife.css';

const GameOfLife = () => {
  const [grid, setGrid] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [gridSize, setGridSize] = useState(50);
  const [population, setPopulation] = useState(0);
  const canvasRef = useRef(null);
  const runningRef = useRef(isRunning);
  
  const CELL_SIZE = 10;

  // Patterns prédéfinis
  const patterns = {
    glider: [[0,1],[1,2],[2,0],[2,1],[2,2]],
    lwss: [[0,1],[0,4],[1,0],[2,0],[3,0],[4,1],[4,2],[4,3],[3,4],[1,4]], // Lightweight spaceship
    pulsar: [
      [2,4],[2,5],[2,6],[2,10],[2,11],[2,12],
      [4,2],[4,7],[4,9],[4,14],
      [5,2],[5,7],[5,9],[5,14],
      [6,2],[6,7],[6,9],[6,14],
      [7,4],[7,5],[7,6],[7,10],[7,11],[7,12],
      [9,4],[9,5],[9,6],[9,10],[9,11],[9,12],
      [10,2],[10,7],[10,9],[10,14],
      [11,2],[11,7],[11,9],[11,14],
      [12,2],[12,7],[12,9],[12,14],
      [14,4],[14,5],[14,6],[14,10],[14,11],[14,12]
    ],
    gun: [ // Gosper Glider Gun
      [5,1],[5,2],[6,1],[6,2],
      [5,11],[6,11],[7,11],[4,12],[8,12],[3,13],[9,13],[3,14],[9,14],
      [6,15],[4,16],[8,16],[5,17],[6,17],[7,17],[6,18],
      [3,21],[4,21],[5,21],[3,22],[4,22],[5,22],[2,23],[6,23],
      [1,25],[2,25],[6,25],[7,25],
      [3,35],[4,35],[3,36],[4,36]
    ],
    pentadecathlon: [[5,4],[5,5],[4,6],[6,6],[5,7],[5,8],[5,9],[5,10],[4,11],[6,11],[5,12],[5,13]],
    acorn: [[7,2],[5,3],[7,3],[6,5],[7,5],[8,5],[9,5]]
  };

  useEffect(() => {
    initializeGrid();
  }, [gridSize]);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  const initializeGrid = () => {
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill(0)
    );
    setGrid(newGrid);
    setGeneration(0);
    setPopulation(0);
  };

  const randomizeGrid = () => {
    const newGrid = Array(gridSize).fill().map(() =>
      Array(gridSize).fill().map(() => Math.random() > 0.7 ? 1 : 0)
    );
    setGrid(newGrid);
    setGeneration(0);
    countPopulation(newGrid);
  };

  const clearGrid = () => {
    initializeGrid();
  };

  const addPattern = (patternName, centerX, centerY) => {
    const pattern = patterns[patternName];
    const newGrid = grid.map(row => [...row]);
    
    pattern.forEach(([x, y]) => {
      const newX = centerX + x - Math.floor(pattern[0][0]);
      const newY = centerY + y - Math.floor(pattern[0][1]);
      if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        newGrid[newY][newX] = 1;
      }
    });
    
    setGrid(newGrid);
    countPopulation(newGrid);
  };

  const countPopulation = (currentGrid) => {
    let count = 0;
    currentGrid.forEach(row => {
      row.forEach(cell => {
        if (cell === 1) count++;
      });
    });
    setPopulation(count);
  };

  const countNeighbors = (grid, x, y) => {
    let count = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        count += grid[newY][newX];
      }
    });

    return count;
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(currentGrid => {
      const newGrid = currentGrid.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = countNeighbors(currentGrid, x, y);
          
          // Règles du Game of Life
          if (cell === 1) {
            return neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            return neighbors === 3 ? 1 : 0;
          }
        })
      );

      countPopulation(newGrid);
      return newGrid;
    });

    setGeneration(g => g + 1);

    setTimeout(runSimulation, 500 - speed * 4);
  }, [speed, gridSize]);

  useEffect(() => {
    if (isRunning) {
      runSimulation();
    }
  }, [isRunning, runSimulation]);

  const handleCanvasClick = (e) => {
    if (isRunning) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      const newGrid = grid.map(row => [...row]);
      newGrid[y][x] = grid[y][x] ? 0 : 1;
      setGrid(newGrid);
      countPopulation(newGrid);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = gridSize * CELL_SIZE;
    canvas.height = gridSize * CELL_SIZE;

    // Fond
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grille
    ctx.strokeStyle = '#001100';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Cellules vivantes
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillStyle = '#00ff00';
          ctx.fillRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
          
          // Effet de lueur
          ctx.shadowColor = '#00ff00';
          ctx.shadowBlur = 3;
          ctx.fillRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
          );
          ctx.shadowBlur = 0;
        }
      });
    });
  }, [grid, gridSize]);

  return (
    <div className="gameoflife-container terminal-card">
      <div className="gameoflife-header">
        <h2 className="neon-text">[LIFE] GAME OF LIFE</h2>
        <p className="terminal-text">Automate cellulaire de Conway</p>
      </div>

      <div className="gameoflife-stats">
        <div className="stat-box">
          <span className="stat-label">GÉNÉRATION</span>
          <span className="stat-value">{generation}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">POPULATION</span>
          <span className="stat-value">{population}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">TAILLE</span>
          <span className="stat-value">{gridSize}x{gridSize}</span>
        </div>
      </div>

      <div className="gameoflife-controls">
        <div className="control-group">
          <label>Taille de la grille: {gridSize}x{gridSize}</label>
          <input
            type="range"
            min="20"
            max="80"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </div>

        <div className="control-group">
          <label>Vitesse: {speed}/100</label>
          <input
            type="range"
            min="10"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="gameoflife-buttons">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="terminal-button primary"
        >
          {isRunning ? '⏸ PAUSE' : '▶ DÉMARRER'}
        </button>
        <button
          onClick={randomizeGrid}
          disabled={isRunning}
          className="terminal-button"
        >
          🎲 ALÉATOIRE
        </button>
        <button
          onClick={clearGrid}
          disabled={isRunning}
          className="terminal-button"
        >
          🗑️ EFFACER
        </button>
      </div>

      <div className="gameoflife-canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="gameoflife-canvas"
          onClick={handleCanvasClick}
        />
      </div>

      <div className="patterns-section">
        <h3 className="neon-text">📐 PATTERNS CLASSIQUES</h3>
        <div className="patterns-grid">
          <button
            onClick={() => addPattern('glider', Math.floor(gridSize/4), Math.floor(gridSize/4))}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">🚀</span>
            <span>Glider</span>
          </button>
          <button
            onClick={() => addPattern('lwss', Math.floor(gridSize/4), Math.floor(gridSize/2))}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">🛸</span>
            <span>LWSS</span>
          </button>
          <button
            onClick={() => addPattern('pulsar', Math.floor(gridSize/2) - 8, Math.floor(gridSize/2) - 8)}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">💫</span>
            <span>Pulsar</span>
          </button>
          <button
            onClick={() => addPattern('gun', 5, 5)}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">🔫</span>
            <span>Glider Gun</span>
          </button>
          <button
            onClick={() => addPattern('pentadecathlon', Math.floor(gridSize/2), Math.floor(gridSize/2))}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">⚡</span>
            <span>Pentadecathlon</span>
          </button>
          <button
            onClick={() => addPattern('acorn', Math.floor(gridSize/2), Math.floor(gridSize/2))}
            disabled={isRunning}
            className="pattern-button"
          >
            <span className="pattern-icon">🌰</span>
            <span>Acorn</span>
          </button>
        </div>
      </div>

      <div className="gameoflife-instructions terminal-card">
        <h3>📖 RÈGLES DE CONWAY</h3>
        <ul>
          <li>🟢 Une cellule vivante avec 2-3 voisins survit</li>
          <li>💀 Une cellule vivante avec &lt;2 ou &gt;3 voisins meurt</li>
          <li>✨ Une cellule morte avec exactement 3 voisins naît</li>
          <li>🖱️ Cliquez sur la grille pour activer/désactiver des cellules</li>
          <li>🎨 Utilisez les patterns classiques pour des effets intéressants!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameOfLife;
