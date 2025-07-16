import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from "./components/Main";
import {ThemeProvider} from "./components/contexts/ThemeContext";
import {TimeZoneProvider} from "./components/contexts/TimeZoneContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ThemeProvider>
        <TimeZoneProvider>
            <Main />
        </TimeZoneProvider>
    </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();