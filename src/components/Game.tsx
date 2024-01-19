import type { difficultyType, gameStateType } from '../types';

import './Game.css';
import useGame from '../hooks/useGame';

type GameProps = {
  difficulty: difficultyType,
  gameState: gameStateType,
  onGameOver: () => void,
  setDifficulty: (val: difficultyType) => void
}

function Game({ difficulty, gameState, onGameOver, setDifficulty }: GameProps) {

  const {
    input,
    currentWord,
    remainingTime,
    maxTimeForWord,
    handleInputChange
  } = useGame({ difficulty, gameState, setDifficulty, onGameOver })

  const getLetterClass = (letter: string, index: number): string => {
    let colorStatus: number = 0;
    if (index <= input.length - 1) {
      colorStatus = (letter === input[index].toLowerCase()) ? 1 : -1;
    }

    let letterClass = '';
    switch (colorStatus) {
      case 1:
        letterClass = 'game-word__letter--correct';
        break;
      case -1:
        letterClass = 'game-word__letter--wrong';
        break;
      default:
        letterClass = '';
        break;
    }

    return letterClass;
  }

  if (gameState === 'PLAYING') {
    return (
      <div className="Game">
        <h1 className="countdown-heading">{remainingTime}</h1>
        <progress className='countdown-bar' value={remainingTime} max={maxTimeForWord}></progress>
        <div className="game-word">
          {currentWord.split("").map((letter, index) => {
            const letterClass = getLetterClass(letter, index);
            return <h1 key={index} className={`game-word__letter ${letterClass}`}>{letter}</h1>
          })}
        </div>
        <input type="text" autoFocus value={input} onChange={(e) => handleInputChange(e.target.value)} className="game-input" />
      </div>
    )
  } else {
    return (
      <div className="Game">
        <h1 className="game-over">Game Over!</h1>
      </div>
    )
  }
}

export default Game;