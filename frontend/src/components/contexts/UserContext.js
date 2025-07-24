import {createContext, useContext, useState} from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [username, setUsername] = useState("Zabrafax");
    const [registrationDate, setRegistrationDate] = useState(null);
    const isLoggedIn = !!username;

    const loginUser = async (username, password) => {
        if(!!isLoggedIn) {
            return {success: false, message: "You are already logged in"};
        }
        try {
            const today = new Date();
            const localDate = today.toISOString().slice(0, 10);

            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password, registrationDate: localDate})
            });

            const apiResponse = await response.json();

            if (apiResponse.success) {
                setUsername(apiResponse.data.username);
                setRegistrationDate(apiResponse.data.registrationDate);
                console.log('Register success:', apiResponse.data.username);
                return {success: true};
            } else {
                console.error('Register error:', apiResponse.message);
                return {success: false, message: apiResponse.message};
            }
        } catch (error) {
            return {success: false, message: error.message};
        }
    }

    const registerUser = async (username, password) => {
        try {
            const today = new Date();
            const localDate = today.toISOString().slice(0, 10);

            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password, registrationDate: localDate})
            });

            const apiResponse = await response.json();

            if (apiResponse.success) {
                setUsername(apiResponse.data.username);
                setRegistrationDate(apiResponse.data.registrationDate);
                console.log('Register success:', apiResponse.data.username);
                return {success: true};
            } else {
                console.error('Register error:', apiResponse.message);
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
            registerUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}