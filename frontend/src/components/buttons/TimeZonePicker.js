import styles from './TimeZonePicker.module.css';
import {useTimeZones} from "../contexts/TimeZoneContext";
import {useEffect, useRef, useState} from "react";
import {useTheme} from "../contexts/ThemeContext";

function TimeZonePicker() {
    const { allFirstThemeColors, allTextThemeColors, currentThemeNumber } = useTheme();

    const { timeZones, currentTimeZoneId, setCurrentTimeZoneId } = useTimeZones();

    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [lineWidth, setLineWidth] = useState(0);

    function enableLine() {
        if (textRef.current) {
            setLineWidth(textRef.current.getBoundingClientRect().width);
        }
    }

    function disableLine() {
        setLineWidth(0);
    }

    function handleTimeZoneChange(event) {
        setCurrentTimeZoneId(event.target.value);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <div className={styles.Text__wrapper} ref={textRef} onMouseEnter={enableLine} onMouseLeave={disableLine}>
                <p>{currentTimeZoneId ? timeZones.find(tz => tz.id === currentTimeZoneId)?.label : 'Choose timezone'}</p>
                <span className={styles.Arrow}>{isOpen ? '▲' : '▼'}</span>
            </div>
            <div
                className={styles.Bottom__line}
                style={{
                    backgroundColor: allTextThemeColors[currentThemeNumber],
                    width: lineWidth + 'px'
                }}
            >

            </div>
        </div>

        // <div className={styles.TimeZonePicker}>
        //     <label htmlFor="timezone">Time zone: </label>
        //     <select id="timezone" value={currentTimeZoneId} onChange={handleTimeZoneChange}>
        //         {timeZones.map((timezone) => (
        //             <option
        //                 key={timezone.id}
        //                 value={timezone.id}
        //             >
        //                 {timezone.label}
        //             </option>
        //         ))}
        //     </select>
        // </div>
    );
}

export default TimeZonePicker;