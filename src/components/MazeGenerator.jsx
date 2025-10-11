import React, { useState, useEffect, useRef } from 'react';
import '../styles/maze.css';

const MazeGenerator = () => {
  const [size, setSize] = useState(25);
  const [maze, setMaze] = useState([]);
  const [solving, setSolving] = useState(false);
  const [algorithm, setAlgorithm] = useState('astar');
  const [stats, setStats] = useState(null);
  const [speed, setSpeed] = useState(10);
  const canvasRef = useRef(null);
  
  const CELL_SIZE = 20;
  const WALL = 1;
  const PATH = 0;
  const START = 2;
  const END = 3;
  const VISITED = 4;
  const SOLUTION = 5;

  // Générer un labyrinthe avec l'algorithme de Prim
  const generateMaze = () => {
    const newMaze = Array(size).fill().map(() => Array(size).fill(WALL));
    const visited = Array(size).fill().map(() => Array(size).fill(false));
    
    // Début au centre
    const startX = Math.floor(size / 2);
    const startY = Math.floor(size / 2);
    newMaze[startY][startX] = PATH;
    visited[startY][startX] = true;
    
    const walls = [];
    const addWalls = (x, y) => {
      const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];
      directions.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && !visited[ny][nx]) {
          walls.push([x + dx/2, y + dy/2, nx, ny]);
        }
      });
    };
    
    addWalls(startX, startY);
    
    while (walls.length > 0) {
      const randomIndex = Math.floor(Math.random() * walls.length);
      const [wallX, wallY, cellX, cellY] = walls[randomIndex];
      walls.splice(randomIndex, 1);
      
      if (!visited[cellY][cellX]) {
        newMaze[wallY][wallX] = PATH;
        newMaze[cellY][cellX] = PATH;
        visited[cellY][cellX] = true;
        addWalls(cellX, cellY);
      }
    }
    
    // Placer START et END
    newMaze[1][1] = START;
    newMaze[size - 2][size - 2] = END;
    
    setMaze(newMaze);
    setStats(null);
  };

  // A* Algorithm
  const solveMazeAStar = async () => {
    const startTime = performance.now();
    const newMaze = maze.map(row => [...row]);
    const start = [1, 1];
    const end = [size - 2, size - 2];
    
    const heuristic = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    
    const openSet = [start];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    
    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start, end));
    
    let nodesVisited = 0;
    
    while (openSet.length > 0) {
      openSet.sort((a, b) => fScore.get(a.toString()) - fScore.get(b.toString()));
      const current = openSet.shift();
      nodesVisited++;
      
      if (current[0] === end[0] && current[1] === end[1]) {
        // Reconstruire le chemin
        const path = [];
        let temp = current;
        while (cameFrom.has(temp.toString())) {
          path.unshift(temp);
          temp = cameFrom.get(temp.toString());
        }
        
        // Animer le chemin solution
        for (const [x, y] of path) {
          if (newMaze[y][x] !== START && newMaze[y][x] !== END) {
            newMaze[y][x] = SOLUTION;
            setMaze([...newMaze.map(row => [...row])]);
            await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
          }
        }
        
        const endTime = performance.now();
        setStats({
          algorithm: 'A*',
          time: ((endTime - startTime) / 1000).toFixed(3),
          nodesVisited,
          pathLength: path.length
        });
        return;
      }
      
      if (newMaze[current[1]][current[0]] !== START && newMaze[current[1]][current[0]] !== END) {
        newMaze[current[1]][current[0]] = VISITED;
        setMaze([...newMaze.map(row => [...row])]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
      }
      
      const neighbors = [
        [current[0] + 1, current[1]],
        [current[0] - 1, current[1]],
        [current[0], current[1] + 1],
        [current[0], current[1] - 1]
      ];
      
      for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && newMaze[ny][nx] !== WALL) {
          const tentativeGScore = gScore.get(current.toString()) + 1;
          
          if (!gScore.has(neighbor.toString()) || tentativeGScore < gScore.get(neighbor.toString())) {
            cameFrom.set(neighbor.toString(), current);
            gScore.set(neighbor.toString(), tentativeGScore);
            fScore.set(neighbor.toString(), tentativeGScore + heuristic(neighbor, end));
            
            if (!openSet.some(n => n[0] === nx && n[1] === ny)) {
              openSet.push(neighbor);
            }
          }
        }
      }
    }
    
    setStats({ algorithm: 'A*', time: 'Pas de solution', nodesVisited });
  };

  // Dijkstra Algorithm
  const solveMazeDijkstra = async () => {
    const startTime = performance.now();
    const newMaze = maze.map(row => [...row]);
    const start = [1, 1];
    const end = [size - 2, size - 2];
    
    const dist = new Map();
    const prev = new Map();
    const unvisited = [];
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (newMaze[y][x] !== WALL) {
          dist.set([x, y].toString(), Infinity);
          unvisited.push([x, y]);
        }
      }
    }
    dist.set(start.toString(), 0);
    
    let nodesVisited = 0;
    
    while (unvisited.length > 0) {
      unvisited.sort((a, b) => dist.get(a.toString()) - dist.get(b.toString()));
      const current = unvisited.shift();
      nodesVisited++;
      
      if (current[0] === end[0] && current[1] === end[1]) {
        const path = [];
        let temp = current;
        while (prev.has(temp.toString())) {
          path.unshift(temp);
          temp = prev.get(temp.toString());
        }
        
        for (const [x, y] of path) {
          if (newMaze[y][x] !== START && newMaze[y][x] !== END) {
            newMaze[y][x] = SOLUTION;
            setMaze([...newMaze.map(row => [...row])]);
            await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
          }
        }
        
        const endTime = performance.now();
        setStats({
          algorithm: 'Dijkstra',
          time: ((endTime - startTime) / 1000).toFixed(3),
          nodesVisited,
          pathLength: path.length
        });
        return;
      }
      
      if (newMaze[current[1]][current[0]] !== START && newMaze[current[1]][current[0]] !== END) {
        newMaze[current[1]][current[0]] = VISITED;
        setMaze([...newMaze.map(row => [...row])]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
      }
      
      const neighbors = [
        [current[0] + 1, current[1]],
        [current[0] - 1, current[1]],
        [current[0], current[1] + 1],
        [current[0], current[1] - 1]
      ];
      
      for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && newMaze[ny][nx] !== WALL) {
          const alt = dist.get(current.toString()) + 1;
          if (alt < dist.get(neighbor.toString())) {
            dist.set(neighbor.toString(), alt);
            prev.set(neighbor.toString(), current);
          }
        }
      }
    }
    
    setStats({ algorithm: 'Dijkstra', time: 'Pas de solution', nodesVisited });
  };

  // DFS Algorithm
  const solveMazeDFS = async () => {
    const startTime = performance.now();
    const newMaze = maze.map(row => [...row]);
    const start = [1, 1];
    const end = [size - 2, size - 2];
    
    const stack = [[start, [start]]];
    const visited = new Set([start.toString()]);
    let nodesVisited = 0;
    
    while (stack.length > 0) {
      const [current, path] = stack.pop();
      nodesVisited++;
      
      if (current[0] === end[0] && current[1] === end[1]) {
        for (const [x, y] of path) {
          if (newMaze[y][x] !== START && newMaze[y][x] !== END) {
            newMaze[y][x] = SOLUTION;
            setMaze([...newMaze.map(row => [...row])]);
            await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
          }
        }
        
        const endTime = performance.now();
        setStats({
          algorithm: 'DFS',
          time: ((endTime - startTime) / 1000).toFixed(3),
          nodesVisited,
          pathLength: path.length
        });
        return;
      }
      
      if (newMaze[current[1]][current[0]] !== START && newMaze[current[1]][current[0]] !== END) {
        newMaze[current[1]][current[0]] = VISITED;
        setMaze([...newMaze.map(row => [...row])]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
      }
      
      const neighbors = [
        [current[0] + 1, current[1]],
        [current[0] - 1, current[1]],
        [current[0], current[1] + 1],
        [current[0], current[1] - 1]
      ];
      
      for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && 
            newMaze[ny][nx] !== WALL && !visited.has(neighbor.toString())) {
          visited.add(neighbor.toString());
          stack.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    
    setStats({ algorithm: 'DFS', time: 'Pas de solution', nodesVisited });
  };

  // BFS Algorithm
  const solveMazeBFS = async () => {
    const startTime = performance.now();
    const newMaze = maze.map(row => [...row]);
    const start = [1, 1];
    const end = [size - 2, size - 2];
    
    const queue = [[start, [start]]];
    const visited = new Set([start.toString()]);
    let nodesVisited = 0;
    
    while (queue.length > 0) {
      const [current, path] = queue.shift();
      nodesVisited++;
      
      if (current[0] === end[0] && current[1] === end[1]) {
        for (const [x, y] of path) {
          if (newMaze[y][x] !== START && newMaze[y][x] !== END) {
            newMaze[y][x] = SOLUTION;
            setMaze([...newMaze.map(row => [...row])]);
            await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
          }
        }
        
        const endTime = performance.now();
        setStats({
          algorithm: 'BFS',
          time: ((endTime - startTime) / 1000).toFixed(3),
          nodesVisited,
          pathLength: path.length
        });
        return;
      }
      
      if (newMaze[current[1]][current[0]] !== START && newMaze[current[1]][current[0]] !== END) {
        newMaze[current[1]][current[0]] = VISITED;
        setMaze([...newMaze.map(row => [...row])]);
        await new Promise(resolve => setTimeout(resolve, 100 - speed * 8));
      }
      
      const neighbors = [
        [current[0] + 1, current[1]],
        [current[0] - 1, current[1]],
        [current[0], current[1] + 1],
        [current[0], current[1] - 1]
      ];
      
      for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx >= 0 && nx < size && ny >= 0 && ny < size && 
            newMaze[ny][nx] !== WALL && !visited.has(neighbor.toString())) {
          visited.add(neighbor.toString());
          queue.push([neighbor, [...path, neighbor]]);
        }
      }
    }
    
    setStats({ algorithm: 'BFS', time: 'Pas de solution', nodesVisited });
  };

  const solveMaze = async () => {
    if (solving) return;
    setSolving(true);
    
    switch (algorithm) {
      case 'astar': await solveMazeAStar(); break;
      case 'dijkstra': await solveMazeDijkstra(); break;
      case 'dfs': await solveMazeDFS(); break;
      case 'bfs': await solveMazeBFS(); break;
    }
    
    setSolving(false);
  };

  useEffect(() => {
    generateMaze();
  }, [size]);

  useEffect(() => {
    if (!maze.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = size * CELL_SIZE;
    canvas.height = size * CELL_SIZE;
    
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        switch (cell) {
          case WALL: ctx.fillStyle = '#0a0a0a'; break;
          case PATH: ctx.fillStyle = '#1a1a1a'; break;
          case START: ctx.fillStyle = '#00ff00'; break;
          case END: ctx.fillStyle = '#ff0000'; break;
          case VISITED: ctx.fillStyle = '#004400'; break;
          case SOLUTION: ctx.fillStyle = '#00ff00'; break;
        }
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      });
    });
  }, [maze]);

  return (
    <div className="maze-container terminal-card">
      <div className="maze-header">
        <h2 className="neon-text">[MAZE] GÉNÉRATEUR DE LABYRINTHES</h2>
        <p className="terminal-text">Visualisation d'algorithmes de résolution de chemins</p>
      </div>

      <div className="maze-controls">
        <div className="control-group">
          <label>Taille: {size}x{size}</label>
          <input 
            type="range" 
            min="15" 
            max="50" 
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))}
            disabled={solving}
          />
        </div>

        <div className="control-group">
          <label>Vitesse: {speed}/10</label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Algorithme:</label>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={solving}
            className="terminal-select"
          >
            <option value="astar">A* (A-star) - Optimal + Rapide</option>
            <option value="dijkstra">Dijkstra - Optimal</option>
            <option value="bfs">BFS (Breadth-First) - Optimal</option>
            <option value="dfs">DFS (Depth-First) - Non optimal</option>
          </select>
        </div>
      </div>

      <div className="maze-buttons">
        <button 
          onClick={generateMaze} 
          disabled={solving}
          className="terminal-button"
        >
          🔄 Nouveau Labyrinthe
        </button>
        <button 
          onClick={solveMaze} 
          disabled={solving}
          className="terminal-button primary"
        >
          {solving ? '⏳ Résolution...' : '▶ Résoudre'}
        </button>
      </div>

      <div className="maze-canvas-wrapper">
        <canvas ref={canvasRef} className="maze-canvas" />
      </div>

      {stats && (
        <div className="maze-stats terminal-card">
          <h3 className="neon-text">📊 STATISTIQUES</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Algorithme:</span>
              <span className="stat-value">{stats.algorithm}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Temps:</span>
              <span className="stat-value">{stats.time}s</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Nœuds visités:</span>
              <span className="stat-value">{stats.nodesVisited}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Longueur du chemin:</span>
              <span className="stat-value">{stats.pathLength}</span>
            </div>
          </div>
        </div>
      )}

      <div className="maze-legend terminal-card">
        <h3>Légende:</h3>
        <div className="legend-items">
          <div className="legend-item"><span className="legend-color start"></span> Départ</div>
          <div className="legend-item"><span className="legend-color end"></span> Arrivée</div>
          <div className="legend-item"><span className="legend-color visited"></span> Cases explorées</div>
          <div className="legend-item"><span className="legend-color solution"></span> Chemin solution</div>
        </div>
      </div>
    </div>
  );
};

export default MazeGenerator;
