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
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [scores, setScores] = useState<number[]>([]);
  const [username, setUsername] = useState<string>("");

  const timer = useRef<number | undefined>();
  const selectedDifficulty = useRef<difficultyType>('Easy');

  const handleDifficultyChange = (difficulty: string) => {
    setDifficulty(difficulty as difficultyType);
    selectedDifficulty.current = difficulty as difficultyType;
  }

  const handleGameOver = () => {
    setGameState('OVER');
    setDifficulty(selectedDifficulty.current);
  }

  const handleGameStart = () => setGameState('PLAYING');
  const handleGameQuit = () => setGameState('HOME');
  const handleUsernameChange = (username: string) => setUsername(username);

  // handle the score timer
  useEffect(() => {
    if (gameState == 'PLAYING') {
      timer.current = setInterval(() => setCurrentScore(score => score + 1), 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [gameState]);

  // handle state updates based on gameState changes
  useEffect(() => {
    if (gameState == 'HOME') {
      setUsername("");
      setCurrentScore(0);
      setDifficulty('Easy');
      selectedDifficulty.current = 'Easy';
      setScores([]);
    }

    if (gameState == 'PLAYING') {
      setCurrentScore(0);
    }

    if (gameState == 'OVER') {
      setDifficulty(selectedDifficulty.current);
      setScores(scores => [...scores, currentScore]);
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
      <GameHeader username={username} difficulty={difficulty} score={currentScore} />
      <div className="game-main">
        <GameScores scores={scores} />
        <Game
          difficulty={difficulty}
          gameState={gameState}
          onGameOver={handleGameOver}
          setDifficulty={setDifficulty}
        />
        <div className="game-padding"></div>
      </div>
      <GameFooter gameState={gameState} onGameRestart={handleGameStart} onGameQuit={handleGameQuit} />
    </div>
  )
}

export default App
