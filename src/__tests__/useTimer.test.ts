import { renderHook, waitFor } from "@testing-library/react";
import useTimer from "../hooks/useTimer";
import { gameStateType } from "../types";

function setup(
  currentWord: string,
  difficultyFactor: number,
  gameState: gameStateType,
) {
  const { result } = renderHook(() =>
    useTimer(currentWord, difficultyFactor, gameState)
  );
  const [maxTimeForWord, remainingTime, gameOver] = result.current;

  return { maxTimeForWord, remainingTime, gameOver };
}

describe("useTimer hook", () => {
  test("hook should contain correct initial values", () => {
    const currentWord: string = "word";
    const difficultyFactor: number = 1;
    const { maxTimeForWord, gameOver } = setup(
      currentWord,
      difficultyFactor,
      "PLAYING",
    );
    expect(maxTimeForWord).toEqual(currentWord.length / difficultyFactor);
    expect(gameOver).toEqual(false);
  });

  test("gameover should be set to true once timer runs out", () => {
    const { remainingTime, gameOver } = setup("abcd", 1, "PLAYING");
    waitFor(() => expect(remainingTime).toEqual(0))
      .then(() => expect(gameOver).toBe(true));
  });
});
