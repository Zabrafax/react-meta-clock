import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import './Window.css';
import styles from './AccountWindow.module.css';
import {useState} from "react";

function AccountWindow({ onAccountCrossClick }) {
    const { allFirstThemeColors, allAccentThemeColors, allTextThemeColors, allAlphaThemePercents, currentThemeNumber } = useTheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    return (
        <div
            className={styles.Account__window + ' Window'}
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
                <div className={styles.Login__wrapper + ' Window__main__wrapper'}>
                    <h1>Login</h1>
                    <div className={styles.Login__form__wrapper}>
                        <form className={styles.Login__form}>
                            <div className={styles.Login__form__input__wrapper}>
                                <input
                                    type="text"
                                    maxLength="16"
                                    className={styles.Login__form__input}
                                    placeholder="Username"
                                    onFocus={() => setIsFocusedUsername(true)}
                                    onBlur={() => setIsFocusedUsername(false)}
                                />
                                <div
                                    className={styles.Input__line}
                                    style={{
                                        width: isFocusedUsername ? '105%' : '100%',
                                        backgroundColor: allTextThemeColors[currentThemeNumber]
                                    }}
                                ></div>
                            </div>
                            <div className={styles.Login__form__input__wrapper}>
                                <input
                                    type="password"
                                    maxLength="16"
                                    className={styles.Login__form__input}
                                    placeholder="Password"
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                />
                                <div
                                    className={styles.Input__line}
                                    style={{
                                        width: isFocusedPassword ? '105%' : '100%',
                                        backgroundColor: allTextThemeColors[currentThemeNumber]
                                    }}
                                ></div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default AccountWindow;