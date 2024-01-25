import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../components/Game";
import { difficultyType, gameStateType } from "../types";

function setup(difficulty: difficultyType, gameState: gameStateType) {
  return render(
    <Game
      difficulty={difficulty}
      gameState={gameState}
      onGameOver={() => new Error("Function not implemented.")}
      setDifficulty={(_) => new Error("Function not implemented.")}
    />,
  );
}

describe("Game should render properly", () => {
  setup("Easy", "OVER");
  screen.debug();
  test("on game over", () => {
    expect(screen.getByRole("heading", { name: /game over!/i }))
      .toBeInTheDocument();
  });
});
