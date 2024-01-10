import { useEffect, useState } from 'react';

import Game from './components/Game';
import GameFooter from './components/GameFooter';
import GameHeader from './components/GameHeader';
import GameScores from './components/GameScores';
import HomePage from './HomePage'

import './App.css'

type gameStateType = 'NEW' | 'PLAYING' | 'OVER';
type difficultyType = 'Easy' | 'Medium' | 'Hard';

function App() {
  const [gameState, setGameState] = useState<gameStateType>('NEW');
  const [username, setUsername] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<difficultyType>('Easy');

  const onDifficultyChange = (difficulty: string) => setDifficulty(difficulty as difficultyType);
  const onGameStart = () => setGameState('PLAYING');
  const onUsernameChange = (username: string) => setUsername(username);

  if (gameState === 'NEW') {
    return (
      <div className="App">
        <HomePage
          onDifficultyChange={onDifficultyChange}
          onGameStart={onGameStart}
          onUsernameChange={onUsernameChange}
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
      <GameFooter />
    </div>
  )
}

export default App
