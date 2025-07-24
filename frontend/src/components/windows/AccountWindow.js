import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import './Window.css';
import '../buttons/SmallAButton.css'
import styles from './AccountWindow.module.css';
import {useState} from "react";
import {useUserContext} from "../contexts/UserContext";

function AccountWindow({ onAccountCrossClick }) {
    const { allFirstThemeColors, allTextThemeColors, allAlphaThemePercents, currentThemeNumber } = useTheme();

    const { isLoggedIn, username, registrationDate, registerUser } = useUserContext();

    const [isRegisterWindow, setIsRegisterWindow] = useState(false);

    const minInputLength = 4;
    const maxInputLength = 16;

    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

    function handleRegister(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const username = form.username.value;
        const password = form.password.value;

        registerUser(username, password);
    }

    return (
        <div
            className={styles.Account__window + ' Window'}
            style={{
                backgroundColor: HEXtoRGBA(allFirstThemeColors[currentThemeNumber], allAlphaThemePercents[currentThemeNumber])
            }}
        >
            <div className="Window__top__wrapper">
                <h2>Account</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/anchor-has-content */}
                <a
                    className="Closing__cross"
                    onClick={onAccountCrossClick}
                    style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                ></a>
            </div>

            {/*
                Account block
            */}
            {isLoggedIn &&
                <div className={styles.Account__wrapper + ' Window__main__wrapper'}>
                    <div className={styles.Left__account__wrapper}>
                        <img
                            className={styles.Account__icon}
                            src="https://icons.iconarchive.com/icons/praveen/minimal-outline/128/profile-icon.png"
                        />
                    </div>
                </div>
            }

            {/*
                Login form
            */}
            {!isLoggedIn && !isRegisterWindow &&
                <div className={styles.Login__wrapper + ' Window__main__wrapper'}>
                    <h1>Login</h1>
                    <div className={styles.Login__form__wrapper}>
                        <form className={styles.Login__form}>
                            <div className={styles.Login__form__input__wrapper}>
                                <input
                                    type="text"
                                    name="username"
                                    minLength={minInputLength}
                                    maxLength={maxInputLength}
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
                                    name="password"
                                    minLength={minInputLength}
                                    maxLength={maxInputLength}
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

                            <button
                                type="submit"
                                className={styles.Submit__button}
                                style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                            >Login</button>
                        </form>
                    </div>
                    <div className={styles.Login__bottom__text}>
                        <p>Don't have an account? </p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            onClick={() => {setIsRegisterWindow(true)}}
                            className="Small__a__button"
                            style={{
                                "--after-color": allTextThemeColors[currentThemeNumber],
                                "--after-height": "1px"
                        }}
                        >Register</a>
                    </div>
                </div>
            }

            {/*
                Register form
            */}
            {!isLoggedIn && isRegisterWindow &&
                <div className={styles.Login__wrapper + ' Window__main__wrapper'}>
                    <h1>Register</h1>
                    <div className={styles.Login__form__wrapper}>
                        <form className={styles.Login__form} onSubmit={handleRegister}>
                            <div className={styles.Login__form__input__wrapper}>
                                <input
                                    type="text"
                                    name="username"
                                    minLength={minInputLength}
                                    maxLength={maxInputLength}
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
                                    name="password"
                                    minLength={minInputLength}
                                    maxLength={maxInputLength}
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

                            <button
                                type="submit"
                                className={styles.Submit__button}
                                style={{ "--after-color": allTextThemeColors[currentThemeNumber] }}
                            >Register</button>
                        </form>
                    </div>
                    <div className={styles.Login__bottom__text}>
                        <p>Have an account? </p>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            onClick={() => {setIsRegisterWindow(false)}}
                            className="Small__a__button"
                            style={{
                                "--after-color": allTextThemeColors[currentThemeNumber],
                                "--after-height": "1px"
                            }}
                        >Login</a>
                    </div>
                </div>
            }
        </div>
    );
}

export default AccountWindow;