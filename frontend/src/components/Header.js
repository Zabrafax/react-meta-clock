import './BaseLayout.css';
import styles from './Header.module.css';
import {useTheme} from "./contexts/ThemeContext";

function Header({ onAccountClick, onSettingsClick, onFullScreenClick }) {
    const { firstThemeColor, textThemeColor } = useTheme();

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
                    onClick={onAccountClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >ACCOUNT</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.Header__a__button}
                    onClick={onSettingsClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >SETTINGS</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className={styles.Header__a__button}
                    onClick={onFullScreenClick}
                    href="#"
                    style={{ "--after-color": textThemeColor }}
                >FULLSCREEN</a>
            </div>
        </header>
    );
}

export default Header;