import TypingIcon from './assets/typing-icon.jpg'
import './HomePage.css';

type HomePageProps = {
  username: string,
  onDifficultyChange: (difficulty: string) => void,
  onGameStart: () => void,
  onUsernameChange: (username: string) => void,
}

function HomePage({ username, onDifficultyChange, onGameStart, onUsernameChange }: HomePageProps) {

  return (
    <div className="HomePage">
      <div className="home-title">
        <img src={TypingIcon} className="home-title__logo" />
        <h1 className="home-title__heading">Fast Fingers</h1>
        <h4 className="home-title__subheading">The ulitmate typing game</h4>
      </div>
      <div className="home-form">
        <input onChange={(e) => onUsernameChange(e.target.value)} type="text" placeholder="Enter your name" className="home-form__name" />
        <select onChange={(e) => onDifficultyChange(e.target.value)} className="home-form__difficulty">
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <button disabled={!username} onClick={onGameStart} className="start-btn">
        {username ? "Start Game" : "Please Enter a Username"}
      </button>
    </div>
  )
}

export default HomePage;