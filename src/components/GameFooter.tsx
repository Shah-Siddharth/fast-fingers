import { gameStateType } from '../types';

import './GameFooter.css';

type GameFooterProps = {
  gameState: gameStateType
  onGameRestart: () => void,
  onGameQuit: () => void
}

function GameFooter({ gameState, onGameRestart, onGameQuit }: GameFooterProps) {

  return (
    <div className="GameFooter">
      {(gameState === 'OVER') && <button onClick={onGameRestart} className="game-footer__btn game-footer__btn--play-again">Play Again</button>}
      <button onClick={onGameQuit} className="game-footer__btn game-footer__btn--quit-game">Quit Game</button>
    </div>
  )
}

export default GameFooter;