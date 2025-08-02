import styles from './SimpleSwitch.module.css'
import { useState, useEffect, useRef } from 'react';
import {useTheme} from "./contexts/ThemeContext";

function SimpleSwitch({ name, initialState, onEnable, onDisable } ) {
    const { textThemeColor } = useTheme();

    const [leftLineOffset, setLeftLineOffset] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const [isEnabled, setIsEnabled] = useState(initialState);

    const preText = useRef(null);
    const enableRef = useRef(null);
    const middleText = useRef(null);
    const disableRef = useRef(null);

    useEffect(() => {
        if (enableRef.current && disableRef.current && preText.current && middleText.current) {
            const leftWidth = preText.current.getBoundingClientRect().width;
            const enableWidth = enableRef.current.getBoundingClientRect().width;
            const middleWidth = middleText.current.getBoundingClientRect().width;
            const disableWidth = disableRef.current.getBoundingClientRect().width;

            setLeftLineOffset(isEnabled ? leftWidth : leftWidth + enableWidth + middleWidth);
            setLineWidth(isEnabled ? enableWidth : disableWidth);
        }
    }, [isEnabled]);

    const enable = (e) => {
        e.preventDefault();

        onEnable();
        setIsEnabled(true);
    }

    const disable = (e) => {
        e.preventDefault();

        onDisable();
        setIsEnabled(false);
    }

    return (
        <div className={styles.Simple__switch}>
            <p>{name + ": "}</p>
            <div className={styles.Choices__wrapper}>
                <div className={styles.Choices__text}>
                    <p ref={preText}>[ </p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className={isEnabled ? styles.a__enabled : styles.a__disabled}
                        ref={enableRef}
                        href="#"
                        onClick={enable}
                    >
                        Enable
                    </a>
                    <p ref={middleText}> / </p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className={!isEnabled ? styles.a__enabled : styles.a__disabled}
                        ref={disableRef}
                        href="#"
                        onClick={disable}
                    >
                        Disable
                    </a>
                    <p> ]</p>
                </div>
                <div className={styles.Choices__line__wrapper}>
                    <div
                        className={styles.Choices__line}
                        style={{
                            width: lineWidth + "px",
                            left: leftLineOffset + "px",
                            backgroundColor: textThemeColor
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SimpleSwitch;