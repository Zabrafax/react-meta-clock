import {useTheme} from "./contexts/ThemeContext";
import {useEffect} from "react";
import {darkenColor} from "./utils/colorUtils";
import colors from "tailwindcss/colors";

function Footer() {
    /*
        Theme
     */
    const { allSecondThemeColors, currentThemeNumber } = useTheme();

    return (
        <footer
            className="Footer"
            style={{backgroundColor: allSecondThemeColors[currentThemeNumber]}}
        >
            <p>Meta Clock 2025</p>
            <p className="Footer__small__p__text">Inspired by ClockClock 24</p>
        </footer>
    );
}

export default Footer;