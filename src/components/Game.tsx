import { useEffect, useRef, useState } from 'react';

import Countdown from './Countdown';
import easyWords from '../assets/easyWords.json';
import mediumWords from '../assets/mediumWords.json';
import hardWords from '../assets/hardWords.json';

import type { difficultyType, gameStateType } from '../types';

import './Game.css';

type GameProps = {
  difficulty: difficultyType,
  gameState: gameStateType,
  onGameOver: () => void
}

function Game({ difficulty, gameState, onGameOver }: GameProps) {
  const [currentWord, setCurrentWord] = useState<string>("abcd");
  const [input, setInput] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const timer = useRef<number | undefined>(undefined);

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
      setCurrentWord(getNewWord(difficulty));
      setInput("");
    }
  }, [input]);

  // after decreasing remaining time, see if timer runs out
  useEffect(() => {
    if (remainingTime === 0 && timer.current) {   // game over
      clearInterval(timer.current);
      timer.current = undefined;
      setInput("");
      onGameOver();
    }
  }, [remainingTime]);

  // for every new word or difficulty level, set a new timer
  useEffect(() => {
    const seconds = currentWord.length;   // change logic for different levels
    setRemainingTime(seconds);
    if (gameState == 'PLAYING') timer.current = setInterval(() => setRemainingTime(time => time - 1), 1000);
    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, [currentWord, difficulty, gameState]);

  if (gameState === 'PLAYING') {
    return (
      <div className="Game">
        <Countdown />
        <h1 className="temp-countdown">{remainingTime}</h1>
        <div className="game-word">
          {currentWord.split("").map((letter, index) => {
            const letterClass = getLetterClass(letter, index);
            return <h1 key={index} className={`game-word__letter ${letterClass}`}>{letter}</h1>
          })}
        </div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="game-input" />
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