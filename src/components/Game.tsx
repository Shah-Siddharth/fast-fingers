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
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const timer = useRef<number | undefined>(undefined);
  const incrementValue: number = 0.1  // increment difficulty after every successful word
  const currentDifficultyValue = useRef<number>(difficultyValues.get(difficulty)!)

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

  // after decreasing remaining time, see if timer runs out
  useEffect(() => {
    if (remainingTime === 0 && timer.current) {   // game over
      clearInterval(timer.current);
      timer.current = undefined;
      setInput("");
      onGameOver();
    }
  }, [remainingTime]);

  // for every new word, set a new timer. Also set the timer when gameState changes (over -> playing)
  useEffect(() => {
    const seconds = Math.ceil(currentWord.length / difficultyValues.get(difficulty)!);
    setRemainingTime(seconds);
    if (gameState == 'PLAYING') timer.current = setInterval(() => setRemainingTime(time => time - 1), 1000);
    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, [currentWord, gameState]);

  // if difficulty changes, get new word and update current difficulty value
  useEffect(() => {
    currentDifficultyValue.current = difficultyValues.get(difficulty)!;
    setCurrentWord(getNewWord(difficulty));
  }, [difficulty])

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