import { useEffect, useRef, useState } from 'react';
import useTimer from './useTimer';

import { difficultyValues, incrementValue } from '../constants';
import { difficultyType, gameStateType } from '../types';

import easyWords from '../assets/easyWords.json';
import mediumWords from '../assets/mediumWords.json';
import hardWords from '../assets/hardWords.json';


const getNewWord = (difficulty: difficultyType): string => {
  if (difficulty === 'Easy') {
    return easyWords[Math.floor(Math.random() * easyWords.length)];
  } else if (difficulty == 'Medium') {
    return mediumWords[Math.floor(Math.random() * mediumWords.length)];
  } else {
    return hardWords[Math.floor(Math.random() * hardWords.length)];
  }
}

type useGameParams = {
  difficulty: difficultyType,
  gameState: gameStateType,
  setDifficulty: (val: difficultyType) => void,
  onGameOver: () => void
}

function useGame(params: useGameParams) {
  const {
    difficulty,
    gameState,
    setDifficulty,
    onGameOver
  } = params;

  const [currentWord, setCurrentWord] = useState<string>(getNewWord(difficulty));
  const [input, setInput] = useState<string>("");
  const difficultyFactor = useRef<number>(difficultyValues.get(difficulty)!);
  const [maxTimeForWord, remainingTime, gameOver] = useTimer(currentWord, difficultyFactor.current, gameState);

  const handleInputChange = (input: string) => {
    if (input.toLowerCase() === currentWord) {
      difficultyFactor.current = difficultyFactor.current + incrementValue;
      if (difficultyFactor.current >= difficultyValues.get('Hard')!) {
        setDifficulty('Hard');
      }
      else if (difficultyFactor.current >= difficultyValues.get('Medium')!) {
        setDifficulty('Medium');
      }

      setCurrentWord(getNewWord(difficulty));
      setInput("");

    } else {
      setInput(input);
    }
  }

  useEffect(() => {
    if (gameOver) {
      setInput("");
      onGameOver();
    }
  }, [gameOver])

  return {
    input,
    currentWord,
    remainingTime,
    maxTimeForWord,
    handleInputChange
  }
}

export default useGame;