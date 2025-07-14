import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#d9d9d9", "#af0e0e"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#c9c9c9", "#960e0e"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffd700"]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#ffffff"]);
    const [allAlphaThemePercents, setAllAlphaThemePercents] = useState([0.85, 0.85, 0.8]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(1);

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors, setAllFirstThemeColors,
            allSecondThemeColors, setAllSecondThemeColors,
            allAccentThemeColors, setAllAccentThemeColors,
            allTextThemeColors, setAllTextThemeColors,
            allAlphaThemePercents, setAllAlphaThemePercents,
            currentThemeNumber, setCurrentThemeNumber
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}