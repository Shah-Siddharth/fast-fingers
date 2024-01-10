import './GameFooter.css';

type GameFooterProps = {
  onGameRestart: () => void,
  onGameQuit: () => void
}

function GameFooter({ onGameRestart, onGameQuit }: GameFooterProps) {
  const gameEnd: boolean = true;

  return (
    <div className="GameFooter">
      {gameEnd && <button onClick={onGameRestart} className="play-agin">Play Again</button>}
      <button onClick={onGameQuit} className="quit-game">Quit Game</button>
    </div>
  )
}

export default GameFooter;