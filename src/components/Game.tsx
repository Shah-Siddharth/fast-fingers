import { useEffect, useRef, useState } from 'react';

import Countdown from './Countdown';

import type { difficultyType, gameStateType } from '../types';

import './Game.css';

const easyWords: string[] = ['aab', 'bba', 'cab'];
const mediumWords: string[] = ['abcd', 'word', 'cake'];
const hardWords: string[] = ['verybigword', 'anotherword', 'veryhardword'];

type GameProps = {
  difficulty: difficultyType,
  gameState: gameStateType,
  onGameOver: () => void
}

function Game({ difficulty, gameState, onGameOver }: GameProps) {
  const [currentWord, setCurrentWord] = useState<string>("abcd");
  const [input, setInput] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const timer = useRef<number>();

  const getNewWord = (difficulty: difficultyType): string => {
    const randomIndex = Math.floor(Math.random() * 3);
    if (difficulty === 'Easy') {
      return easyWords[randomIndex];
    } else if (difficulty == 'Medium') {
      return mediumWords[randomIndex];
    } else {
      return hardWords[randomIndex];
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

  useEffect(() => {
    if (input.toLowerCase() === currentWord) {
      setCurrentWord(getNewWord(difficulty));
      setInput("");
    }
  }, [input]);

  useEffect(() => {
    if (remainingTime === 0 && timer.current) {
      clearInterval(timer.current);
      onGameOver();
    }
  }, [remainingTime]);

  useEffect(() => {
    const seconds = currentWord.length;   // change logic for different levels
    setRemainingTime(seconds);
    timer.current = setInterval(() => setRemainingTime(time => time - 1), 1000);
    return () => clearInterval(timer.current);
  }, [currentWord, difficulty]);


  return (
    <div className="Game">
      <Countdown />
      <h1 className="temp-countdown">{remainingTime}</h1>
      <div className="game-word">
        {currentWord.split("").map((letter, index) => {
          const letterClass = getLetterClass(letter, index);
          return <h1 className={`game-word__letter ${letterClass}`}>{letter}</h1>
        })}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="game-input" />
    </div>
  )
}

export default Game;