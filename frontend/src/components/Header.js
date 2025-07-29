import './BaseLayout.css';
import {useTheme} from "./contexts/ThemeContext";

function Header({ onAccountClick, onSettingsClick, onFullScreenClick}) {
    const { firstThemeColor, textThemeColor } = useTheme();

    return (
        <header
            className="Header"
            style={{ backgroundColor: firstThemeColor }}
        >
            <div className="Header__logo">
                <h1>Meta Clock</h1>
            </div>
            <div className="Header__buttons">
                <a
                    className="Header__a__button"
                    onClick={onAccountClick}
                    style={{ "--after-color": textThemeColor }}
                >ACCOUNT</a>
                <a
                    className="Header__a__button"
                    onClick={onSettingsClick}
                    style={{ "--after-color": textThemeColor }}
                >SETTINGS</a>
                <a
                    className="Header__a__button"
                    onClick={onFullScreenClick}
                    style={{ "--after-color": textThemeColor }}
                >FULLSCREEN</a>
            </div>
        </header>
    );
}

export default Header;