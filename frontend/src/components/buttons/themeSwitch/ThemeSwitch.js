import styles from './ThemeSwitch.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useTheme} from "../../contexts/ThemeContext";
import CustomColorPicker from "./CustomColorPicker";

const ThemeSwitch = forwardRef(({ name, choiceColors, lineColors }, ref) => {
// function themeSwitch({ name, choiceColors, lineColors }) {
    const {
        currentThemeNumber, setCurrentThemeNumber,
        allFirstThemeColors, setAllFirstThemeColors,
        allAccentThemeColors, allTextThemeColors
    } = useTheme();

    const [lineColor, setLineColor] = useState(0);

    const [leftLineOffset, setLeftLineOffset] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);

    const isCustomColor = currentThemeNumber === choiceColors.length - 1;

    const colorRefs = useRef([]);

    function handleMainCustomColorsChange(color) {
        setAllFirstThemeColors(prevColors => {
            const updatedColors = [...prevColors];
            updatedColors[updatedColors.length - 1] = color;
            return updatedColors;
        });

        const secondColor =
    }

    useEffect(() => {
        if(colorRefs.current[0]) {
            const basicLineWidth = colorRefs.current[0].getBoundingClientRect().width;

            setLeftLineOffset(basicLineWidth * currentThemeNumber);
            setLineWidth(basicLineWidth);
        }

        setLineColor(lineColors[currentThemeNumber]);

    }, [currentThemeNumber, choiceColors, colorRefs, lineColors, setCurrentThemeNumber]);

    useEffect(() => {
        colorRefs.current = colorRefs.current.slice(0, choiceColors.length);
    }, [choiceColors, colorRefs]);

    return (
        <div ref={ref} className={styles.ThemeSwitch}>
            <div className={styles.Horizontal__wrapper}>
                <p>{name + ": "}</p>
                <div className={styles.Choices__wrapper}>
                    <div className={styles.Choice__options}>
                        {choiceColors.slice(0, -1).map((color, index) => (
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
                            ref={el => (colorRefs.current[choiceColors.length - 1] = el)}
                            className={styles.Choice__option__custom}
                            onClick={() => setCurrentThemeNumber(choiceColors.length - 1)}
                        ></a>
                    </div>
                    <div className={styles.Choices__line__wrapper}>
                        <div
                            className={styles.Choices__line}
                            style={{
                                width: lineWidth + "px",
                                left: leftLineOffset + "px",
                                backgroundColor: lineColor
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
                        />
                        <CustomColorPicker
                            name={"Accent color: "}
                            currentColor={allAccentThemeColors[currentThemeNumber]}
                        />
                        <CustomColorPicker
                            name={"Text color: "}
                            currentColor={allTextThemeColors[currentThemeNumber]}
                        />
                    </div>
                </div>
            }
        </div>
    );
});

export default ThemeSwitch;