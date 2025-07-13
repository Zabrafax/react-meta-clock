import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#ffffff", "#c91010"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#e3e3e3", "#a91111"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#edc600", "#000000", "#edc600"]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(2);

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors, setAllFirstThemeColors,
            allSecondThemeColors, setAllSecondThemeColors,
            allAccentThemeColors, setAllAccentThemeColors,
            currentThemeNumber, setCurrentThemeNumber
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}