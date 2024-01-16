import { useEffect, useRef, useState } from "react";
import { difficultyType, gameStateType } from "../types";

const difficultyValues = new Map<difficultyType, number>([
  ['Easy', 1],
  ['Medium', 1.5],
  ['Hard', 2]
])

function useTimer(currentWord: string, difficulty: difficultyType, gameState: gameStateType): [number, number, boolean] {
  const timer = useRef<number|undefined>(undefined);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const maxTimeForWord = useRef<number>(remainingTime);

  // when timer runs out, game over
  useEffect(() => {
    if (remainingTime === 0 && timer.current) {
      clearInterval(timer.current);
      timer.current = undefined;
      setGameOver(true);
    }
  }, [remainingTime]);

  // for every new word, set a new timer. Also set the timer when gameState changes (over -> playing)
  useEffect(() => {
    const seconds = Math.ceil(currentWord.length / difficultyValues.get(difficulty)!);
    setRemainingTime(seconds);
    maxTimeForWord.current = seconds;
    if (gameState === 'PLAYING') timer.current = setInterval(() => setRemainingTime(time => time - 1), 1000);
    return () => {
      clearInterval(timer.current);
      timer.current = undefined;
    }
  }, [currentWord, gameState]);

  return  [maxTimeForWord.current, remainingTime, gameOver]
}

export default useTimer;