import Game from './components/Game';
import GameFooter from './components/GameFooter';
import GameHeader from './components/GameHeader';
import GameScores from './components/GameScores';
import HomePage from './HomePage'

import './App.css'

function App() {
  const playing: boolean = true;

  if (!playing) {
    return (
      <div className="App">
        <HomePage />
      </div>
    )
  }

  return (
    <div className="App">
      <GameHeader />
      <div className="game-main">
        <GameScores />
        <Game />
      </div>
      <GameFooter />
    </div>
  )
}

export default App
