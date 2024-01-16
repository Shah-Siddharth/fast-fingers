import { useEffect, useRef, useState } from 'react';

import easyWords from '../assets/easyWords.json';
import mediumWords from '../assets/mediumWords.json';
import hardWords from '../assets/hardWords.json';

import type { difficultyType, gameStateType } from '../types';

import './Game.css';
import useTimer from '../hooks/useTimer';

type GameProps = {
  difficulty: difficultyType,
  gameState: gameStateType,
  onGameOver: () => void,
  setDifficulty: (val: difficultyType) => void
}

const difficultyValues = new Map<difficultyType, number>([
  ['Easy', 1],
  ['Medium', 1.5],
  ['Hard', 2]
])

function Game({ difficulty, gameState, onGameOver, setDifficulty }: GameProps) {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [input, setInput] = useState<string>("");
  // const [remainingTime, setRemainingTime] = useState<number>(0);
  const [maxTimeForWord, remainingTime, gameOver] = useTimer(currentWord, difficulty, gameState);

  // const timer = useRef<number | undefined>(undefined);
  const incrementValue: number = 0.1  // increment difficulty after every successful word
  const currentDifficultyValue = useRef<number>(difficultyValues.get(difficulty)!);
  // const maxTimeForWord = useRef<number>(remainingTime);

  const getNewWord = (difficulty: difficultyType): string => {
    if (difficulty === 'Easy') {
      return easyWords[Math.floor(Math.random() * easyWords.length)];
    } else if (difficulty == 'Medium') {
      return mediumWords[Math.floor(Math.random() * mediumWords.length)];
    } else {
      return hardWords[Math.floor(Math.random() * hardWords.length)];
    }
  }

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

  // on user input, see if it matches the current word
  useEffect(() => {
    if (input.toLowerCase() === currentWord) {
      currentDifficultyValue.current = currentDifficultyValue.current + incrementValue;
      if (currentDifficultyValue.current >= difficultyValues.get('Hard')!) setDifficulty('Hard');
      else if (currentDifficultyValue.current >= difficultyValues.get('Medium')!) setDifficulty('Medium');

      setInput("");
      setCurrentWord(getNewWord(difficulty));
    }
  }, [input]);

  // set state on game over
  useEffect(() => {
    if (gameOver) {
      setInput("");
      onGameOver();
    }
  }, [gameOver])

  // if difficulty changes, get new word and update current difficulty value
  useEffect(() => {
    currentDifficultyValue.current = difficultyValues.get(difficulty)!;
    setCurrentWord(getNewWord(difficulty));
  }, [difficulty])

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
        <input type="text" autoFocus value={input} onChange={(e) => setInput(e.target.value)} className="game-input" />
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