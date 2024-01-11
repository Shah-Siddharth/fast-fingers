import './GameScores.css';

type GameScoresProps = {
  scores: number[]
}

function GameScores({ scores }: GameScoresProps) {

  return (
    <div className="GameScores">
      <h4 className="scores-heading">Score Board</h4>
      <ul className="game-scores">
        {scores.map((score, idx) => {
          return <li key={idx} className="game-scores__score">Game {idx + 1}: {score}</li>
        })}
      </ul>
    </div>
  )
}

export default GameScores;