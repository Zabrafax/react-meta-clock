import {createContext, useContext, useEffect, useState} from "react";
import {darkenColor} from "../utils/colorUtils";
import {useUserContext} from "./UserContext";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const { saveColorTheme, isLoggedIn, userColorTheme } = useUserContext();

    const [allFirstThemeColors, setAllFirstThemeColors] = useState(["#1d2d65", "#eaeaea", "#8a89a6", "#1f1f1f", "#1d2d65"]);
    const [allSecondThemeColors, setAllSecondThemeColors] = useState(["#162652", "#d2d2d2", "#7f7e98", "#111111", "#162652"]);
    const [allAccentThemeColors, setAllAccentThemeColors] = useState(["#dcdcdc", "#000000", "#ffffff", "#d9d9d9", "#dcdcdc"]);
    const [allArrowShadows, setAllArrowShadows] = useState([true, false, true, true, true]);
    const [allTextThemeColors, setAllTextThemeColors] = useState(["#ffffff", "#000000", "#000000", "#ffffff", "#ffffff"]);
    // eslint-disable-next-line no-unused-vars
    const [allAlphaThemePercents, setAllAlphaThemePercents] = useState([0.85, 0.85, 0.8, 0.8, 0.85]);

    const [currentThemeNumber, setCurrentThemeNumber] = useState(0);

    const [firstThemeColor, setFirstThemeColor] = useState(allFirstThemeColors[currentThemeNumber]);
    const [secondThemeColor, setSecondThemeColor] = useState(allSecondThemeColors[currentThemeNumber]);
    const [accentThemeColor, setAccentThemeColor] = useState(allAccentThemeColors[currentThemeNumber]);
    const [arrowShadow, setArrowShadow] = useState(allArrowShadows[currentThemeNumber]);
    const [textThemeColor, setTextThemeColor] = useState(allTextThemeColors[currentThemeNumber]);
    const [alphaThemePercent, setAlphaThemePercent] = useState(allAlphaThemePercents[currentThemeNumber]);

    const [colorTheme, setColorTheme] = useState(() => ({
        currentThemeNumber,
        firstThemeColor: allFirstThemeColors[currentThemeNumber],
        accentThemeColor: allAccentThemeColors[currentThemeNumber],
        textThemeColor: allTextThemeColors[currentThemeNumber],
        arrowShadow: allArrowShadows[currentThemeNumber],
    }));

    useEffect(() => {
        const newTheme = {
            currentThemeNumber,
            firstThemeColor: allFirstThemeColors[currentThemeNumber],
            accentThemeColor: allAccentThemeColors[currentThemeNumber],
            textThemeColor: allTextThemeColors[currentThemeNumber],
            arrowShadow: allArrowShadows[currentThemeNumber],
        };
        setColorTheme(newTheme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentThemeNumber,
        allFirstThemeColors,
        allAccentThemeColors,
        allTextThemeColors,
        allArrowShadows
    ]);

    useEffect(() => {
        console.log("Saving theme...", colorTheme);
        saveColorTheme(colorTheme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorTheme]);
    
    useEffect(() => {
        if (isLoggedIn && userColorTheme) {
            setColorTheme(userColorTheme);

            setCurrentThemeNumber(userColorTheme.currentThemeNumber);
            setCustomFirstThemeColor(userColorTheme.firstThemeColor);
            setCustomDarkenSecondThemeColor(userColorTheme.firstThemeColor);
            setCustomAccentThemeColor(userColorTheme.accentThemeColor);
            setCustomTextThemeColor(userColorTheme.textThemeColor);
            setCustomArrowShadows(userColorTheme.arrowShadow);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, userColorTheme]);

    useEffect(() => {
        setFirstThemeColor(allFirstThemeColors[currentThemeNumber]);
        setSecondThemeColor(allSecondThemeColors[currentThemeNumber]);
        setAccentThemeColor(allAccentThemeColors[currentThemeNumber]);
        setArrowShadow(allArrowShadows[currentThemeNumber]);
        setTextThemeColor(allTextThemeColors[currentThemeNumber]);
        setAlphaThemePercent(allAlphaThemePercents[currentThemeNumber]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function setCustomAccentThemeColor(color) {
        setAllAccentThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        });
    }

    function setCustomArrowShadows(state) {
        setAllArrowShadows(prevShadows => {
            const updatedShadows = [...prevShadows];
            updatedShadows[updatedShadows.length - 1] = state;
            return updatedShadows;
        })
    }

    function setCustomTextThemeColor(color) {
        setAllTextThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        })
    }

    return (
        <ThemeContext.Provider value={{
            allFirstThemeColors, setCustomFirstThemeColor, firstThemeColor,
            allSecondThemeColors, setCustomDarkenSecondThemeColor, secondThemeColor,
            allAccentThemeColors, setCustomAccentThemeColor, accentThemeColor,
            allArrowShadows, setCustomArrowShadows, arrowShadow,
            allTextThemeColors, setCustomTextThemeColor, textThemeColor,
            allAlphaThemePercents, alphaThemePercent,

            currentThemeNumber, setCurrentThemeNumber,

            colorTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}