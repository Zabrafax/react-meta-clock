import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [registrationDate, setRegistrationDate] = useState(null);
    const [userTimeZone, setUserTimeZone] = useState(null);
    const [userColorTheme, setUserColorTheme] = useState(null);
    const isLoggedIn = !!username;

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/users/verify-token", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const apiResponse = await response.json();

                if (apiResponse.success) {
                    localStorage.setItem("token", apiResponse.data.token);
                    setUsername(apiResponse.data.username);
                    setRegistrationDate(apiResponse.data.registrationDate);

                    const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

                    if (apiResponse.data.timeZone && !isEmptyObject(apiResponse.data.timeZone)) {
                        setUserTimeZone(apiResponse.data.timeZone);
                    } else {
                        console.log("User time zone is null, undefined or empty, auto time zone will be set");
                    }

                    if (apiResponse.data.userTheme && !isEmptyObject(apiResponse.data.userTheme)) {
                        setUserColorTheme(apiResponse.data.userTheme);
                    } else {
                        console.log("User theme is null, undefined or empty, auto color theme will be set");
                    }

                    //console.log('Token login success:', apiResponse.data.username);
                    return {success: true};
                } else {
                    //console.error('Token login error:', apiResponse.message);
                    return {success: false, message: apiResponse.message};
                }
            } catch (error) {
                return {success: false, message: error.message};
            }
        })()
    }, []);

    const saveColorTheme = async (colorTheme) => {
        if(isLoggedIn) {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/users/save-color-theme", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ userTheme: colorTheme })
                });

                const apiResponse = await response.json();

                if (apiResponse.success) {
                    return {success: true};
                } else {
                    console.log("Error saving colorTheme");
                    return {success: false, message: apiResponse.message};
                }
            } catch (error) {
                console.log("Error saving colorTheme: ", error);
                return {success: false, message: error.message};
            }
        }
    }

    const saveTimeZone = async (timeZone) => {
        if(isLoggedIn) {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/users/save-timezone", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify( {timeZone} )
                });

                const apiResponse = await response.json();

                if (apiResponse.success) {
                    //console.log('TimeZone saving success');
                    return {success: true};
                } else {
                    //console.error('TimeZone saving error:', apiResponse.message);
                    return {success: false, message: apiResponse.message};
                }
            } catch (error) {
                return {success: false, message: error.message};
            }
        }
    }

    const logout = () => {
        setUsername(null);
        setRegistrationDate(null);
        setUserTimeZone(null);

        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    }

    const loginUser = async (username, password) => {
        if(!!isLoggedIn) {
            return {success: false, message: "You are already logged in"};
        }

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });

            const apiResponse = await response.json();

            if (apiResponse.success) {
                localStorage.setItem("token", apiResponse.data.token);
                setUsername(apiResponse.data.username);
                setRegistrationDate(apiResponse.data.registrationDate);

                const isEmptyObject = obj => obj && Object.keys(obj).length === 0;

                if (apiResponse.data.timeZone && !isEmptyObject(apiResponse.data.timeZone)) {
                    setUserTimeZone(apiResponse.data.timeZone);
                } else {
                    console.log("User time zone is null, undefined or empty, auto time zone will be set");
                }

                if (apiResponse.data.userTheme && !isEmptyObject(apiResponse.data.userTheme)) {
                    setUserColorTheme(apiResponse.data.userTheme);
                } else {
                    console.log("User theme is null, undefined or empty, auto color theme will be set");
                }

                console.log('Login success:', apiResponse.data.username);
                return {success: true};
            } else {
                console.error('Login error:', apiResponse.message);
                return {success: false, message: apiResponse.message};
            }
        } catch (error) {
            return {success: false, message: error.message};
        }
    }

    const registerUser = async (username, password, timeZone, colorTheme) => {
        if(!!isLoggedIn) {
            return {success: false, message: "You are already logged in"};
        }

        try {
            const today = new Date();
            const localDate = today.toISOString().slice(0, 10);

            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    password,
                    registrationDate: localDate,
                    timeZone,
                    userTheme: colorTheme
                } )
            });

            const apiResponse = await response.json();

            if (apiResponse.success) {
                localStorage.setItem("token", apiResponse.data.token);
                setUsername(apiResponse.data.username);
                setRegistrationDate(apiResponse.data.registrationDate);
                setUserTimeZone(apiResponse.data.timeZone);

                //console.log('Register success:', apiResponse.data.username);
                return {success: true};
            } else {
                //console.error('Register error:', apiResponse.message);
                return {success: false, message: apiResponse.message};
            }
        } catch (error) {
            return {success: false, message: error.message};
        }
    }


    return (
        <UserContext.Provider value={{
            isLoggedIn,
            username,
            registrationDate,
            registerUser,
            loginUser,
            logout,
            saveTimeZone,
            userTimeZone,
            saveColorTheme,
            userColorTheme,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}