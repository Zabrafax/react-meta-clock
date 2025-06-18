import './App.css';

function App() {
  let secondArrowDegrees = 0;

  setInterval(() => {
    secondArrowDegrees += 6;
  }, 1000)

  return (
    <div className="App">
      <header className="App-header">
        <div className="Clock-wrapper">
          <div style={{'--second-arrow-degrees': `${secondArrowDegrees}deg` }} className="Clock-second-arrow"></div>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
