function HomePage() {
  const name: string | null = null;
  return (
    <div className="HomePage">
      <div className="home-title">
        <div className="home-title__logo">{/* logo goes here */}</div>
        <h1 className="home-title__heading">Fastest Fingers</h1>
        <h4 className="home-title__subheading">The ulitmate typing game</h4>
      </div>
      <div className="home-form">
        <input type="text" placeholder={!name && "Enter your name"} className="home-form__name" />
        <select className="home-form__difficulty">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <button className="start-btn">START GAME</button>
    </div>
  )
}

export default HomePage;