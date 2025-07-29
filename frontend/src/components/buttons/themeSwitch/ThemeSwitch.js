import styles from './ThemeSwitch.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useTheme} from "../../contexts/ThemeContext";
import CustomColorPicker from "./CustomColorPicker";
import {darkenColor} from "../../utils/colorUtils";
import SimpleSwitch from "../../SimpleSwitch";

const ThemeSwitch = forwardRef(({ name }, ref) => {
    const {
        currentThemeNumber, setCurrentThemeNumber,
        allFirstThemeColors,
        setCustomFirstThemeColor,
        setCustomDarkenSecondThemeColor,
        allAccentThemeColors, setAllAccentThemeColors,
        allTextThemeColors, setAllTextThemeColors,
        allArrowShadows, setAllArrowShadows,
        accentThemeColor
    } = useTheme();

    const [leftLineOffset, setLeftLineOffset] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);

    const isCustomColor = currentThemeNumber === allFirstThemeColors.length - 1;

    const colorRefs = useRef([]);

    function handleMainCustomColorsChange(color) {
        setCustomFirstThemeColor(color);
        setCustomDarkenSecondThemeColor(color);
    }

    function handleAccentCustomColorChange(color) {
        setAllAccentThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        });
    }

    function handleTextCustomColorChange(color) {
        setAllTextThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        })
    }

    function enableArrowShadow() {
        setAllArrowShadows(prevShadows => {
            const updatedShadows = [...prevShadows];
            updatedShadows[updatedShadows.length - 1] = true;
            return updatedShadows;
        })
    }

    function disableArrowShadow() {
        setAllArrowShadows(prevShadows => {
            const updatedShadows = [...prevShadows];
            updatedShadows[updatedShadows.length - 1] = false;
            return updatedShadows;
        })
    }

    useEffect(() => {
        if(colorRefs.current[0]) {
            const basicLineWidth = colorRefs.current[0].getBoundingClientRect().width;

            setLeftLineOffset(basicLineWidth * currentThemeNumber);
            setLineWidth(basicLineWidth);
        }
    }, [currentThemeNumber, colorRefs, allAccentThemeColors]);

    useEffect(() => {
        colorRefs.current = colorRefs.current.slice(0, allFirstThemeColors.length);
    }, [allFirstThemeColors, colorRefs]);

    return (
        <div ref={ref} className={styles.ThemeSwitch}>
            <div className={styles.Horizontal__wrapper}>
                <p>{name + ": "}</p>
                <div className={styles.Choices__wrapper}>
                    <div className={styles.Choice__options}>
                        {allFirstThemeColors.slice(0, -1).map((color, index) => (
                            // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid
                            <a
                                key={index}
                                ref={el => (colorRefs.current[index] = el)}
                                className={styles.Choice__option}
                                style={{ backgroundColor: color }}
                                onClick={() => setCurrentThemeNumber(index)}
                            ></a>
                        ))}
                        <a
                            key={"custom"}
                            ref={el => (colorRefs.current[allFirstThemeColors.length - 1] = el)}
                            className={styles.Choice__option__custom}
                            onClick={() => setCurrentThemeNumber(allFirstThemeColors.length - 1)}
                        ></a>
                    </div>
                    <div className={styles.Choices__line__wrapper}>
                        <div
                            className={styles.Choices__line}
                            style={{
                                width: lineWidth + "px",
                                left: leftLineOffset + "px",
                                backgroundColor: accentThemeColor
                            }}
                        />
                    </div>
                </div>
            </div>

            {isCustomColor &&
                <div
                    className={styles.Custom__color__extension}
                    // style={{ transform: `scaleY(${isCustomColor ? 1 : 0})` }}
                >
                    {/*<h2>Custom:</h2>*/}
                    <div className={styles.Custom__color__switches__wrapper}>
                        <CustomColorPicker
                            name={"Main color: "}
                            currentColor={allFirstThemeColors[currentThemeNumber]}
                            onChange={handleMainCustomColorsChange}
                            lineColor={allAccentThemeColors[currentThemeNumber]}
                        />
                        <CustomColorPicker
                            name={"Accent color: "}
                            currentColor={allAccentThemeColors[currentThemeNumber]}
                            onChange={handleAccentCustomColorChange}
                            lineColor={allFirstThemeColors[currentThemeNumber]}
                        />
                        <CustomColorPicker
                            name={"Text color: "}
                            currentColor={allTextThemeColors[currentThemeNumber]}
                            onChange={handleTextCustomColorChange}
                            lineColor={allFirstThemeColors[currentThemeNumber]}
                        />
                        <SimpleSwitch
                            name="Arrows shadow"
                            initialState={allArrowShadows[currentThemeNumber]}
                            onEnable={enableArrowShadow}
                            onDisable={disableArrowShadow}
                        />
                    </div>
                </div>
            }
        </div>
    );
});

export default ThemeSwitch;