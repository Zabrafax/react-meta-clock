import './App.css';
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
