import React, { useState } from 'react';
import AdvancedThreeScene from '../components/AdvancedThreeScene';
import MazeGenerator from '../components/MazeGenerator';
import SnakeGame from '../components/SnakeGame';
import GameOfLife from '../components/GameOfLife';
import Pong from './games/Pong';
import TetrisGame from '../components/TetrisGame';
import '../styles/tools.css';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('maze');

  const tools = [
    {
      id: 'maze',
      name: '[MAZE] Labyrinthe',
      description: 'Générateur de labyrinthes avec A*, Dijkstra, DFS, BFS',
      component: MazeGenerator
    },
    {
      id: 'snake',
      name: '[SNEK] Snake',
      description: 'Snake rétro terminal avec high scores',
      component: SnakeGame
    },
    {
      id: 'gameoflife',
      name: '[LIFE] Game of Life',
      description: 'Automate cellulaire de Conway avec patterns classiques',
      component: GameOfLife
    },
    {
      id: 'pong',
      name: '[PONG] Pong',
      description: 'Pong classique terminal à deux joueurs',
      component: Pong
    },
    {
      id: 'tetris',
      name: '[TETR] Tetris',
      description: 'Tetris terminal avec scoring et levels',
      component: TetrisGame
    }
  ];

  const ActiveComponent = tools.find(t => t.id === activeTool)?.component;

  const isMobile = window.innerWidth <= 768;

  return (
    <div className="tools-page">
      <AdvancedThreeScene />
      
      <div className="tools-content">
        <div className="tools-header terminal-card">
          <h1 className="glitch-text" data-text="OUTILS & JEUX INTERACTIFS">
            OUTILS & JEUX INTERACTIFS
          </h1>
          <p className="terminal-text">
            Collection d'algorithmes, visualisations et jeux rétro-terminaux
          </p>
          
          {isMobile && (
            <div className="mobile-warning" style={{
              margin: '1rem 0',
              padding: '0.75rem',
              background: 'rgba(255, 0, 0, 0.1)',
              border: '2px solid #ff0000',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <p style={{ color: '#ff0000', margin: '0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                ATTENTION : Jeux non optimisés pour mobile
              </p>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                Ces jeux nécessitent un clavier pour fonctionner correctement.
                Utilisez un ordinateur pour une meilleure expérience.
              </p>
            </div>
          )}
        </div>

        <div className="tools-nav">
          {tools.map(tool => (
            <button
              key={tool.id}
              className={`tool-nav-button ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
            >
              <div className="tool-icon">{tool.name}</div>
              <div className="tool-description">{tool.description}</div>
            </button>
          ))}
          
          {/* Coming soon badges */}
          <div className="tool-nav-button coming-soon">
            <div className="tool-icon">[FRAC] Mandelbrot</div>
            <div className="tool-description">Bientôt disponible...</div>
          </div>
          <div className="tool-nav-button coming-soon">
            <div className="tool-icon">[2048] 2048</div>
            <div className="tool-description">Bientôt disponible...</div>
          </div>
          <div className="tool-nav-button coming-soon">
            <div className="tool-icon">[INVD] Space Invaders</div>
            <div className="tool-description">Bientôt disponible...</div>
          </div>
        </div>

        <div className="tool-display">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default Tools;
