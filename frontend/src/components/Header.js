import './BaseLayout.css';
import {useTheme} from "./contexts/ThemeContext";

function Header({ onSettingsClick, onFullScreenClick}) {
    const { allFirstThemeColors, allTextThemeColors, currentThemeNumber } = useTheme();

    return (
        <header
            className="Header"
            style={{backgroundColor: allFirstThemeColors[currentThemeNumber]}}
        >
            <div className="Header__logo">
                <h1>Meta Clock</h1>
            </div>
            <div className="Header__buttons">
                <a
                    className="Header__a__button"
                    style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                >ACCOUNT</a>
                <a
                    className="Header__a__button"
                    onClick={onSettingsClick}
                    style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                >SETTINGS</a>
                <a
                    className="Header__a__button"
                    onClick={onFullScreenClick}
                    style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                >FULLSCREEN</a>
            </div>
        </header>
    );
}

export default Header;