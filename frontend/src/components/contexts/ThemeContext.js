import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#ffffff", "#af0e0e"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#e3e3e3", "#960e0e"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffd700"]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#ffffff"]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(2);

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors, setAllFirstThemeColors,
            allSecondThemeColors, setAllSecondThemeColors,
            allAccentThemeColors, setAllAccentThemeColors,
            allTextThemeColors, setAllTextThemeColors,
            currentThemeNumber, setCurrentThemeNumber
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}