import styles from './MobileHeader.module.css';
import {useTheme} from "./contexts/ThemeContext";
import {useState} from "react";
import {HEXtoRGBA} from "./utils/colorUtils";
import MobileHeaderAButton from "./MobileHeaderAButton";

function MobileHeader({ onAccountClick, onSettingsClick, onAboutClick, onFullscreenClick }) {
    const { firstThemeColor, alphaThemePercent, textThemeColor } = useTheme();

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isNavButtonActive, setIsNavButtonActive] = useState(false);

    function toggleNav() {
        setIsNavOpen(!isNavOpen);
        setIsNavButtonActive(true);
        setTimeout(() => setIsNavButtonActive(false), 1000);
    }

    function handleAccountClick() {
        setIsNavOpen(false);
        setTimeout(() => onAccountClick(), 200);
    }

    function handleSettingsClick() {
        setIsNavOpen(false);
        setTimeout(() => onSettingsClick(), 200);
    }

    function handleAboutClick() {
        setIsNavOpen(false);
        setTimeout(() => onAboutClick(), 200);
    }

    function handleFullscreenClick() {
        setIsNavOpen(false);
        setTimeout(() => onFullscreenClick(), 200);
    }

    return (
        <>
            <header
                className={styles.MobileHeader}
                style={{backgroundColor: firstThemeColor}}
            >
                <h1>Meta Clock</h1>
                <button
                    className={`${styles.NavButton} ${isNavButtonActive ? styles.active : ''}`}
                    style={{ color: textThemeColor }}
                    onClick={toggleNav}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>
            </header>
            {isNavOpen &&
                <nav
                    className={styles.Nav}
                    style={{ backgroundColor: HEXtoRGBA(firstThemeColor, alphaThemePercent) }}
                >
                    <MobileHeaderAButton
                        name="ACCOUNT"
                        textThemeColor={textThemeColor}
                        onClick={handleAccountClick}
                    />
                    <MobileHeaderAButton
                        name="SETTINGS"
                        textThemeColor={textThemeColor}
                        onClick={handleSettingsClick}
                    />
                    <MobileHeaderAButton
                        name="ABOUT"
                        textThemeColor={textThemeColor}
                        onClick={handleAboutClick}
                    />
                    <MobileHeaderAButton
                        name="FULLSCREEN"
                        textThemeColor={textThemeColor}
                        onClick={handleFullscreenClick}
                    />
                </nav>
            }
        </>
    );
}

export default MobileHeader;