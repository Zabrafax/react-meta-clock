import './BaseLayout.css';
import styles from './Header.module.css';
import {useTheme} from "./contexts/ThemeContext";

function Header({ onAccountClick, onSettingsClick, onFullscreenClick }) {
    const { firstThemeColor, textThemeColor } = useTheme();

    function handleAccountClick(e) {
        e.preventDefault();
        onAccountClick();
    }

    function handleSettingsClick(e) {
        e.preventDefault();
        onSettingsClick();
    }

    function handleFullscreenClick(e) {
        e.preventDefault();
        onFullscreenClick();
    }

    return (
        <header
            className={styles.Header}
            style={{ backgroundColor: firstThemeColor }}
        >
            <h1>Meta Clock</h1>
            <div className={styles.Header__buttons__wrapper}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.Header__a__button}
                    onClick={handleAccountClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >ACCOUNT</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.Header__a__button}
                    onClick={handleSettingsClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >SETTINGS</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.Header__a__button}
                    onClick={handleFullscreenClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >FULLSCREEN</a>
            </div>
        </header>
    );
}

export default Header;