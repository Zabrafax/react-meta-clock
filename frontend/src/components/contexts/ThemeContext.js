import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#eaeaea", "#8a89a6", "#4e9762", "#1d2d65"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#d2d2d2", "#7f7e98", "#478556", "#162652"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffffff", "#ffffff", "#dcdcdc"]);
    const [allArrowShadows, setAllArrowShadows] = useState([true, false, true, true, true]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#000000", "#ffffff", "#ffffff"]);
    const [allAlphaThemePercents, setAllAlphaThemePercents] = useState([0.85, 0.85, 0.8, 0.8, 0.85]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(0);

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors, setAllFirstThemeColors,
            allSecondThemeColors, setAllSecondThemeColors,
            allAccentThemeColors, setAllAccentThemeColors,
            allArrowShadows, setAllArrowShadows,
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