import styles from './ThemeSwitch.module.css'
import {useEffect, useRef, useState} from "react";

function ThemeSwitch({ name, colors, secondColors }) {
    const [currentColor, setCurrentColor] = useState(0);
    const [lineColor, setLineColor] = useState(0);

    const [leftLineOffset, setLeftLineOffset] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);

    const colorRefs = useRef([]);

    useEffect(() => {
        if(colorRefs.current[0]) {
            const basicLineWidth = colorRefs.current[0].getBoundingClientRect().width;

            setLeftLineOffset(basicLineWidth * currentColor);
            setLineWidth(basicLineWidth);
        }

        setLineColor(secondColors[currentColor]);
    }, [currentColor, colors, colorRefs]);

    useEffect(() => {
        colorRefs.current = colorRefs.current.slice(0, colors.length);
    }, [colors, colorRefs]);

    return (
        <div className={styles.ThemeSwitch}>
            <p>{name + ": "}</p>
            <div className={styles.Choices__wrapper}>
                <div className={styles.Choice__options}>
                    {colors.map((color, index) => (
                        <a
                            key={index}
                            ref={el => (colorRefs.current[index] = el)}
                            className={styles.Choice__option}
                            style={{ backgroundColor: color }}
                            onClick={() => setCurrentColor(index)}
                        ></a>
                    ))}
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
    );
}

export default ThemeSwitch;