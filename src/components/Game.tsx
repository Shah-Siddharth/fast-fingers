import { useEffect, useState } from 'react';

import Countdown from './Countdown';

import type { difficultyType } from '../types';

import './Game.css';

const easyWords: string[] = ['aab', 'bba', 'cab'];
const mediumWords: string[] = ['abcd', 'word', 'cake'];
const hardWords: string[] = ['verybigword', 'anotherword', 'veryhardword'];

function Game() {
  const gameState = 'PLAYING';
  const difficulty: difficultyType = 'Easy';
  const [currentWord, setCurrentWord] = useState("abcd");
  const [input, setInput] = useState("adc");

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

  return (
    <div className="Game">
      <Countdown />
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