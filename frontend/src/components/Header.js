import './BaseLayout.css';
import SettingsWindow from "./SettingsWindow";
import { useState } from 'react';

function Header() {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    const openSettings = () => {
        setIsSettingsVisible(!isSettingsVisible);
    }

    return (
        <header className="Header">
            <div className="Header__logo">
                <h1>Meta Clock</h1>
            </div>
            <div className="Header__buttons">
                <a className="Header__a__button">ACCOUNT</a>
                <a className="Header__a__button" onClick={openSettings}>SETTINGS</a>
                <a className="Header__a__button">FULLSCREEN</a>
            </div>
            {isSettingsVisible &&
                <SettingsWindow />
            }
        </header>
    );
}

export default Header;