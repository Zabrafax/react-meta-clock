import {HEXtoRGBA} from "../utils/colorUtils";
import './AboutWindow.css';
import {useTheme} from "../contexts/ThemeContext";
import './Window.css';

function AboutWindow( {onAboutCrossClick} ) {
    const { firstThemeColor, textThemeColor, alphaThemePercent } = useTheme();

    return (
        <div
            className="About__window Window"
            style={{
                backgroundColor: HEXtoRGBA(firstThemeColor, alphaThemePercent)
            }}
        >
            <div className="Window__top__wrapper">
                <h2>About</h2>
                {/*
                    eslint-disable-next-line
                    jsx-a11y/anchor-is-valid,
                    jsx-a11y/anchor-has-content,
                    jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-static-element-interactions
                */}
                <a
                    className="Closing__cross"
                    onClick={onAboutCrossClick}
                    style={{ "--after-color": textThemeColor }}
                ></a>
            </div>
            <div className="About__window__main__wrapper Window__main__wrapper">
                <p>
                    Meta Clock is a web application that displays time with customizable themes and settings.
                </p>
                <p>
                    Inspired by <a
                        href="https://www.humanssince1982.com/en-eu/products/clockclock-24-white"
                    >
                        ClockClock 24
                    </a>,
                    it is built as a GitHub project to showcase skills in React, Spring, and PostgreSQL.
                </p>
                <p>
                    Due to free hosting, the server may take a couple of minutes to start.
                </p>
                <a
                    style={{ "--after-color": textThemeColor }}
                    href="https://github.com/Zabrafax/spring-react-meta-clock"
                    className="Small__a__button"
                >Visit GitHub</a>
            </div>
        </div>
    );
}

export default AboutWindow;