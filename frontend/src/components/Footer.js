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
            <p className="Footer__small__p__text">Inspired by</p>
            <a href="https://www.humanssince1982.com/en-eu/products/clockclock-24-white">ClockClock 24</a>
        </footer>
    );
}

export default Footer;