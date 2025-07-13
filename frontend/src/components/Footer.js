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
        </footer>
    );
}

export default Footer;