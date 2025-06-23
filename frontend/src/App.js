import './App.css';
import React, {useState, useEffect} from "react";
import Clock from "./clock/Clock.js"
import ClockGrid from "./clock/ClockGrid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ClockGrid rows={3} cols={8} />
      </header>
    </div>
  );
}

export default App;
