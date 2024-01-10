import './GameFooter.css';

function GameFooter() {
  const gameEnd: boolean = true;

  return (
    <div className="GameFooter">
      {gameEnd && <button className="play-agin">Play Again</button>}
      <button className="quit-game">Quit Game</button>
    </div>
  )
}

export default GameFooter;