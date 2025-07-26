import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#eaeaea", "#af0e0e", "#62d59f", "#1d2d65"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#d2d2d2", "#960e0e", "#54be90", "#162652"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffd700", "#ffffff", "#dcdcdc"]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#ffffff", "#000000", "#ffffff"]);
    const [allAlphaThemePercents, setAllAlphaThemePercents] = useState([0.85, 0.85, 0.8, 0.8, 0.85]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(0);

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