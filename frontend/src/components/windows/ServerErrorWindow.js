import "./Window.css";
import "./ServerErrorWindow.css";
import "../buttons/SmallAButton.css"
import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";

function ServerErrorWindow() {
    const { firstThemeColor, textThemeColor, alphaThemePercent } = useTheme();

    return (
        <div
            className="Server__error__window Window"
            style={{
                backgroundColor: HEXtoRGBA(firstThemeColor, alphaThemePercent)
            }}
        >
            <div className="Window__top__wrapper">
                <h2>Connection Error</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="Closing__cross"
                    onClick={() => window.location.reload()}
                    style={{ "--after-color": textThemeColor }}
                ></a>
            </div>
            <div className="Window__main__wrapper Server__error__window__main__wrapper">
                <p>Unable to connect to the server</p>
                <p>Please check your internet connection or try again later :3</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    style={{ "--after-color": textThemeColor }}
                    className="Small__a__button"
                    onClick={() => window.location.reload()}
                >Reload page</a>
            </div>
        </div>
    );
}

export default ServerErrorWindow;