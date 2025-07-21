import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import './AccountWindow.css';
import {useState} from "react";

function AccountWindow({ onAccountCrossClick }) {
    const { allFirstThemeColors, allAccentThemeColors, allTextThemeColors, allAlphaThemePercents, currentThemeNumber } = useTheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            {!isLoggedIn &&
                <div className="Window__main__wrapper Account__window__login__wrapper">
                    <h1>Login</h1>
                    <div className="Account__window__login__form__wrapper">
                        <form className="Account__window__login__form">
                            <input type="text" className="Account__window__login__form__input" placeholder="Username" />
                            <input type="password" className="Account__window__login__form__input" placeholder="Password" />
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default AccountWindow;