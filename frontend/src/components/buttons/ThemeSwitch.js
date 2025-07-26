import styles from './ThemeSwitch.module.css'
import {forwardRef, useEffect, useRef, useState} from "react";
import {useTheme} from "../contexts/ThemeContext";

const ThemeSwitch = forwardRef(({ name, choiceColors, lineColors }, ref) => {
// function ThemeSwitch({ name, choiceColors, lineColors }) {
    const { currentThemeNumber, setCurrentThemeNumber } = useTheme();

    const [lineColor, setLineColor] = useState(0);

    const [leftLineOffset, setLeftLineOffset] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);

    const isCustomColor = currentThemeNumber === choiceColors.length - 1;

    const colorRefs = useRef([]);

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

                </div>
            }
        </div>
    );
});

export default ThemeSwitch;