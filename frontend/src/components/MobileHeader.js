import styles from './MobileHeader.module.css';
import {useTheme} from "./contexts/ThemeContext";
import {useState} from "react";
import {HEXtoRGBA} from "./utils/colorUtils";
import MobileHeaderAButton from "./buttons/MobileHeaderAButton";

function MobileHeader({ onAccountClick, onSettingsClick, onFullscreenClick }) {
    const { firstThemeColor, alphaThemePercent, textThemeColor } = useTheme();

    const [isNavOpen, setIsNavOpen] = useState(false);

    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <>
            <header
                className={styles.MobileHeader}
                style={{backgroundColor: firstThemeColor}}
            >
                <h1>Meta Clock</h1>
                <button
                    className={styles.NavButton}
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
                        onClick={onAccountClick}
                    />
                    <MobileHeaderAButton
                        name="SETTINGS"
                        textThemeColor={textThemeColor}
                        onClick={onSettingsClick}
                    />
                    <MobileHeaderAButton
                        name="FULLSCREEN"
                        textThemeColor={textThemeColor}
                        onClick={onFullscreenClick}
                    />
                </nav>
            }
        </>
    );
}

export default MobileHeader;