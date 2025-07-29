import styles from './ThemeSwitch.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useTheme} from "../../contexts/ThemeContext";
import CustomColorPicker from "./CustomColorPicker";
import SimpleSwitch from "../../SimpleSwitch";

const ThemeSwitch = forwardRef(({ name }, ref) => {
    const {
        allFirstThemeColors, setCustomFirstThemeColor, firstThemeColor,
        setCustomDarkenSecondThemeColor,
        allAccentThemeColors, setCustomAccentThemeColor, accentThemeColor,
        setCustomArrowShadows, arrowShadow,
        setCustomTextThemeColor, textThemeColor,

        currentThemeNumber, setCurrentThemeNumber
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
        setCustomAccentThemeColor(color);
    }

    function handleTextCustomColorChange(color) {
        setCustomTextThemeColor(color);
    }

    function enableArrowShadow() {
        setCustomArrowShadows(true);
    }

    function disableArrowShadow() {
        setCustomArrowShadows(false);
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
                            currentColor={firstThemeColor}
                            onChange={handleMainCustomColorsChange}
                            lineColor={accentThemeColor}
                        />
                        <CustomColorPicker
                            name={"Accent color: "}
                            currentColor={accentThemeColor}
                            onChange={handleAccentCustomColorChange}
                            lineColor={firstThemeColor}
                        />
                        <CustomColorPicker
                            name={"Text color: "}
                            currentColor={textThemeColor}
                            onChange={handleTextCustomColorChange}
                            lineColor={firstThemeColor}
                        />
                        <SimpleSwitch
                            name="Arrows shadow"
                            initialState={arrowShadow}
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