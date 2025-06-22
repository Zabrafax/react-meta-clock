import './App.css';
import React, {useState, useEffect} from "react";
import Clock from "./clock/Clock.js"

function App() {
  const [secondArrowDegrees, setSecondArrowDegrees] = useState(0);
  const [minuteArrowDegrees, setMinuteArrowDegrees] = useState(0);

  const speedDivider = 50;

  useEffect(() => {
    // setInterval(() => {
    //   setSecondArrowDegrees(secondArrowDegrees + (6 / speedDivider));
    //   setMinuteArrowDegrees(minuteArrowDegrees + (0.1 / speedDivider));
    // }, 1000 / speedDivider);

    const socket = new WebSocket("ws://localhost:8080/clock/current-time");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.secondArrowDegrees !== undefined) setSecondArrowDegrees(data.secondArrowDegrees);
        if (data.minuteArrowDegrees !== undefined) setMinuteArrowDegrees(data.minuteArrowDegrees);
      } catch (e) {
        console.error("WebSocket parsing error:", e);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []);

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
