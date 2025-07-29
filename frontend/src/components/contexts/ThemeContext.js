import {createContext, useContext, useEffect, useState} from "react";
import {darkenColor} from "../utils/colorUtils";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#eaeaea", "#8a89a6", "#4e9762", "#1d2d65"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#d2d2d2", "#7f7e98", "#478556", "#162652"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffffff", "#ffffff", "#dcdcdc"]);
    const [allArrowShadows, setAllArrowShadows] = useState([true, false, true, true, true]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#000000", "#ffffff", "#ffffff"]);
    const [allAlphaThemePercents, setAllAlphaThemePercents] = useState([0.85, 0.85, 0.8, 0.8, 0.85]);
    const [currentThemeNumber, setCurrentThemeNumber] = useState(0);

    const [firstThemeColor, setFirstThemeColor] = useState(allFirstThemeColors[currentThemeNumber]);
    const [secondThemeColor, setSecondThemeColor] = useState(allSecondThemeColors[currentThemeNumber]);
    const [accentThemeColor, setAccentThemeColor] = useState(allAccentThemeColors[currentThemeNumber]);
    const [arrowShadows, setArrowShadows] = useState(allArrowShadows[currentThemeNumber]);
    const [textThemeColor, setTextThemeColor] = useState(allTextThemeColors[currentThemeNumber]);
    const [alphaThemePercent, setAlphaThemePercent] = useState(allAlphaThemePercents[currentThemeNumber]);

    useEffect(() => {
        setFirstThemeColor(allFirstThemeColors[currentThemeNumber]);
        setSecondThemeColor(allSecondThemeColors[currentThemeNumber]);
        setAccentThemeColor(allAccentThemeColors[currentThemeNumber]);
        setArrowShadows(allArrowShadows[currentThemeNumber]);
        setTextThemeColor(allTextThemeColors[currentThemeNumber]);
        setAlphaThemePercent(allAlphaThemePercents[currentThemeNumber]);
    }, [
        currentThemeNumber,
        allFirstThemeColors,
        allSecondThemeColors,
        allAccentThemeColors,
        allArrowShadows,
        allTextThemeColors,
        allAlphaThemePercents
    ]);

    function setCustomFirstThemeColor(color) {
        setAllFirstThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        });
    }

    function setCustomDarkenSecondThemeColor(color) {
        const secondColor = darkenColor(color, 10);
        setAllSecondThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = secondColor;
            return updatedColors;
        });
    }

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors,
            setCustomFirstThemeColor,
            allSecondThemeColors,
            setCustomDarkenSecondThemeColor,
            allAccentThemeColors, setAllAccentThemeColors,
            allArrowShadows, setAllArrowShadows,
            allTextThemeColors, setAllTextThemeColors,
            allAlphaThemePercents, setAllAlphaThemePercents,
            currentThemeNumber, setCurrentThemeNumber,

            firstThemeColor,
            secondThemeColor,
            accentThemeColor,
            arrowShadows,
            textThemeColor,
            alphaThemePercent
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}