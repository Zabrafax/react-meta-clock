import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import './Window.css';
import '../buttons/SmallAButton.css'
import styles from './AccountWindow.module.css';
import {useState} from "react";

function AccountWindow({ onAccountCrossClick }) {
    const { allFirstThemeColors, allTextThemeColors, allAlphaThemePercents, currentThemeNumber } = useTheme();

    const [isLoggedIn/*, setIsLoggedIn*/] = useState(false);
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

        const today = new Date();
        const localDate = today.toISOString().slice(0, 10);

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password, registrationDate: localDate})
        })
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse.success) {
                    console.log('Register success:', apiResponse.data.username);
                } else {
                    console.error('Register error:', apiResponse.message);
                }
            })
            .catch(error => {
                console.error("Register network or parsing error: " + error);
            })
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