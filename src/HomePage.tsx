import './HomePage.css';

type HomePageProps = {
  onDifficultyChange: (difficulty: string) => void,
  onGameStart: () => void,
  onUsernameChange: (username: string) => void,
}

function HomePage({ onDifficultyChange, onGameStart, onUsernameChange }: HomePageProps) {

  return (
    <div className="HomePage">
      <div className="home-title">
        <div className="home-title__logo">{/* logo goes here */}</div>
        <h1 className="home-title__heading">Fastest Fingers</h1>
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
      <button onClick={onGameStart} className="start-btn">START GAME</button>
    </div>
  )
}

export default HomePage;