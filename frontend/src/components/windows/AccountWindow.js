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
                        <svg
                            className={styles.Account__icon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            fill="currentColor"
                        >
                            <g>
                                <path d="M37.3,41.9c1.4,3.7,4.9,6.1,8.9,6.1h6.4c4,0,7.5-2.4,8.9-6.1l5.2-13.3c1.1-2.7,0.8-5.7-0.6-8.2l-4.4-7.6
                                    C60,9.8,56.8,8,53.4,8h-8c-3.4,0-6.6,1.8-8.3,4.8l-4.4,7.6c-1.5,2.5-1.7,5.5-0.6,8.2L37.3,41.9z M36.2,22.4l4.4-7.6
                                    c1-1.7,2.8-2.8,4.8-2.8h8c2,0,3.8,1.1,4.8,2.8l4.4,7.6c0.8,1.5,1,3.2,0.4,4.8l-5.2,13.3C57,42.6,54.9,44,52.6,44h-6.4
                                    c-2.3,0-4.3-1.4-5.2-3.5l-5.2-13.3C35.3,25.6,35.4,23.8,36.2,22.4z"/>
                                <path d="M18.4,91h62c3.6,0,6.5-2.9,6.5-6.5V71.6c0-2.1-1-4.1-2.8-5.3l-19-13.2C64,52.4,62.8,52,61.4,52h-24c-1.3,0-2.6,0.4-3.7,1.2
                                    l-19,13.2c-1.7,1.2-2.8,3.2-2.8,5.3v12.9C11.9,88.1,14.8,91,18.4,91z M15.9,71.6c0-0.8,0.4-1.6,1.1-2l19-13.2
                                    c0.4-0.3,0.9-0.4,1.4-0.4h24c0.5,0,1,0.2,1.4,0.4l19,13.2c0.7,0.5,1.1,1.2,1.1,2v12.9c0,1.4-1.1,2.5-2.5,2.5h-62
                                    c-1.4,0-2.5-1.1-2.5-2.5V71.6z"/>
                            </g>
                        </svg>
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