import { difficultyType } from '../types';

import './GameHeader.css'

type GameHeaderProps = {
  username: string,
  difficulty: difficultyType,
  score: number
}

function GameHeader({ score, username, difficulty }: GameHeaderProps) {

  return (
    <>
      <div className="GameHeader">
        <h1 className="game-title">Fast Fingers</h1>
        <div className="game-info">
          <div className="game-info__name">{username}</div>
          <div className="game-info__level">Difficulty: {difficulty}</div>
          <div className="game-info__score">Score: {score}</div>
        </div>
      </div>
    </>
  )
}

export default GameHeader;