import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main from "./components/Main";
import {ThemeProvider} from "./components/contexts/ThemeContext";
import {TimeZoneProvider} from "./components/contexts/TimeZoneContext";
import {UserProvider} from "./components/contexts/UserContext";
import {ErrorProvider} from "./components/contexts/ErrorContext";
import {DeviceProvider} from "./components/contexts/DeviceContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ErrorProvider>
        <UserProvider>
            <ThemeProvider>
                <TimeZoneProvider>
                    <DeviceProvider>
                        <Main />
                    </DeviceProvider>
                </TimeZoneProvider>
            </ThemeProvider>
        </UserProvider>
    </ErrorProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();