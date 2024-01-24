import { renderHook, waitFor } from "@testing-library/react";
import useGame from "../hooks/useGame";
import { difficultyType, gameStateType } from "../types";

const setDifficultyMock = jest.fn((_difficulty) => {});
const onGameOverMock = jest.fn(() => {});

function setup(difficulty: difficultyType, gameState: gameStateType) {
  const { result } = renderHook(() =>
    useGame({
      difficulty,
      gameState,
      setDifficulty: setDifficultyMock,
      onGameOver: onGameOverMock,
    })
  );

  return { ...result.current };
}

describe("useGame hook", () => {
  test("hook should contain correct initial values", () => {
    const { input, currentWord, maxTimeForWord } = setup("Easy", "PLAYING");
    expect(input).toBe("");
    expect(currentWord.length).toEqual(maxTimeForWord);
  });

  test("hook should call onGameOver() when time runs out", () => {
    const { remainingTime } = setup("Easy", "PLAYING");
    waitFor(() => expect(remainingTime).toBe(0))
      .then(() => expect(onGameOverMock.mock.calls.length).toBe(1));
  });
});
