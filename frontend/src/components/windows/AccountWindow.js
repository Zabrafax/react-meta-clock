import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import './AccountWindow.css';

function AccountWindow({ onAccountCrossClick }) {
    const { allFirstThemeColors, allAccentThemeColors, allTextThemeColors, allAlphaThemePercents, currentThemeNumber } = useTheme();

    return (
        <div
            className="Account__window Window"
            style={{
                backgroundColor: HEXtoRGBA(allFirstThemeColors[currentThemeNumber], allAlphaThemePercents[currentThemeNumber])
            }}
        >
            <div className="Window__top__wrapper">
                <h2>Account</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="Closing__cross"
                    onClick={onAccountCrossClick}
                    style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                ></a>
            </div>
            <div className="Window__main__wrapper Account__window__main__wrapper">

            </div>
        </div>
    );
}

export default AccountWindow;