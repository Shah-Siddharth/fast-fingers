import './GameScores.css';

function GameScores() {
  const scores: number[] = [2, 10, 100];
  return (
    <div className="GameScores">
      <h4 className="scores-heading">Score Board</h4>
      <ul className="game-scores">
        {scores.map((score, idx) => {
          return <li className="game-scores__score">Game {idx + 1}: {score}</li>
        })}
      </ul>
    </div>
  )
}

export default GameScores;