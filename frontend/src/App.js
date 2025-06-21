import './App.css';
import React, {useState, useEffect} from "react";
import Clock from "./clock/Clock.js"

function App() {
  const [secondArrowDegrees, setSecondArrowDegrees] = useState(0);
  const [minuteArrowDegrees, setMinuteArrowDegrees] = useState(0);

  const speedDivider = 50;

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSecondArrowDegrees(secondArrowDegrees + 6);
  //     setMinuteArrowDegrees(minuteArrowDegrees + 0.1);
  //   }, 1000);
  // });

  useEffect(() => {
    setTimeout(() => {
      setSecondArrowDegrees(secondArrowDegrees + (6 / speedDivider));
      setMinuteArrowDegrees(minuteArrowDegrees + (0.1 / speedDivider));
    }, 1000 / speedDivider);
  });

  return (
    <div className="App">
      <header className="App-header">
        <Clock secondArrowDegrees={secondArrowDegrees} minuteArrowDegrees={minuteArrowDegrees} />
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
