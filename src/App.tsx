import { useEffect, useState } from 'react';

import Game from './components/Game';
import GameFooter from './components/GameFooter';
import GameHeader from './components/GameHeader';
import GameScores from './components/GameScores';
import HomePage from './HomePage'

import './App.css'

type gameStateType = 'HOME' | 'PLAYING' | 'OVER';
type difficultyType = 'Easy' | 'Medium' | 'Hard';

function App() {
  const [difficulty, setDifficulty] = useState<difficultyType>('Easy');
  const [gameState, setGameState] = useState<gameStateType>('HOME');
  const [username, setUsername] = useState<string | null>(null);

  const handleDifficultyChange = (difficulty: string) => setDifficulty(difficulty as difficultyType);
  const handleGameRestart = () => setGameState('PLAYING');
  const handleGameStart = () => setGameState('PLAYING');
  const handleGameQuit = () => setGameState('HOME');
  const handleUsernameChange = (username: string) => setUsername(username);

  if (gameState === 'HOME') {
    return (
      <div className="App">
        <HomePage
          onDifficultyChange={handleDifficultyChange}
          onGameStart={handleGameStart}
          onUsernameChange={handleUsernameChange}
        />
      </div>
    )
  }

  return (
    <div className="App">
      <GameHeader />
      <div className="game-main">
        <GameScores />
        <Game />
        <div className="game-padding"></div>
      </div>
      <GameFooter onGameRestart={handleGameRestart} onGameQuit={handleGameQuit} />
    </div>
  )
}

export default App
