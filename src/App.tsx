// libraries and packages
import { useEffect, useRef, useState } from 'react';

// other components
import Game from './components/Game';
import GameFooter from './components/GameFooter';
import GameHeader from './components/GameHeader';
import GameScores from './components/GameScores';
import HomePage from './HomePage'

// types
import type { difficultyType, gameStateType } from './types';

// styles
import './App.css'


function App() {
  const [difficulty, setDifficulty] = useState<difficultyType>('Easy');
  const [gameState, setGameState] = useState<gameStateType>('HOME');
  const [score, setScore] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  const timer = useRef<number | undefined>();

  const handleDifficultyChange = (difficulty: string) => setDifficulty(difficulty as difficultyType);
  const handleGameRestart = () => setGameState('PLAYING');
  const handleGameStart = () => setGameState('PLAYING');
  const handleGameQuit = () => setGameState('HOME');
  const handleUsernameChange = (username: string) => setUsername(username);

  // handle the score timer
  useEffect(() => {
    if (gameState == 'PLAYING') {
      timer.current = setInterval(() => setScore(score => score + 1), 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [gameState]);

  // handle state updates based on gameState changes
  useEffect(() => {
    if (gameState == 'HOME') {
      setUsername("");
      setScore(0);
      setDifficulty('Easy');
    }
  }, [gameState]);

  if (gameState === 'HOME') {
    return (
      <div className="App">
        <HomePage
          username={username}
          onDifficultyChange={handleDifficultyChange}
          onGameStart={handleGameStart}
          onUsernameChange={handleUsernameChange}
        />
      </div>
    )
  }

  return (
    <div className="App">
      <GameHeader username={username} difficulty={difficulty} score={score} />
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
