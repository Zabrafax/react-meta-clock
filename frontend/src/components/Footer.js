import {useTheme} from "./contexts/ThemeContext";

function Footer() {
    /*
        Theme
     */
    const { secondThemeColor, textThemeColor } = useTheme();

    return (
        <footer
            className="Footer"
            style={{ backgroundColor: secondThemeColor }}
        >
            <p>Meta Clock 2025</p>
            <div className="Footer__bottom__wrapper">
                <p className="Footer__small__p__text">Inspired by </p>
                <a
                    href="https://www.humanssince1982.com/en-eu/products/clockclock-24-white"
                    style={{ "--after-color": textThemeColor }}
                >ClockClock 24</a>
            </div>
        </footer>
    );
}

export default Footer;