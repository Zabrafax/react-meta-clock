import {useTheme} from "./contexts/ThemeContext";

function Footer() {
    /*
        Theme
     */
    const { secondThemeColor } = useTheme();

    return (
        <footer
            className="Footer"
            style={{ backgroundColor: secondThemeColor }}
        >
            <p>Meta Clock 2025</p>
            <p className="Footer__small__p__text">Inspired by ClockClock 24</p>
        </footer>
    );
}

export default Footer;