function GameHeader() {
  const name: string = "Siddharth";
  const level: string = "Easy";
  const currentScore: number = 10;

  return (
    <>
      <div className="GameHeader">
        <h1 className="game-title">Fast Fingers</h1>
        <div className="game-info">
          <div className="game-info__name">{name}</div>
          <div className="game-info__level">Level: {level}</div>
          <div className="game-info__score">Score: {currentScore}</div>
        </div>
      </div>
    </>
  )
}

export default GameHeader;