import styles from './TimeZonePicker.module.css';
import {useTimeZones} from "../contexts/TimeZoneContext";
import {useEffect, useRef, useState} from "react";
import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";

function TimeZonePicker() {
    const { firstThemeColor, textThemeColor, alphaThemePercent } = useTheme();

    const { timeZones, currentTimeZoneId, setCurrentTimeZoneId } = useTimeZones();

    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef();
    const lineRef = useRef();
    const [lineWidth, setLineWidth] = useState(0);
    const [topDialogOffset, setTopDialogOffset] = useState(0);

    useEffect(() => {
        setTopDialogOffset(
            textRef.current.getBoundingClientRect().height +
            lineRef.current.getBoundingClientRect().height
        );
    }, [isOpen]);

    function openDialogWindow() {
        setIsOpen(!isOpen);
        if(isOpen) {
            setLineWidth(textRef.current.getBoundingClientRect().width);
        }
    }

    function enableLine() {
        if (textRef.current) {
            setLineWidth(textRef.current.getBoundingClientRect().width);
        }
    }

    function disableLine() {
        if(!isOpen) {
            setLineWidth(0);
        }
    }

    function handleTimeZoneChange(timeZoneId) {
        setCurrentTimeZoneId(timeZoneId);
        setIsOpen(false);
        setLineWidth(0);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <p>Timezone: </p>
            <div className={styles.Vertical__wrapper}>
                <div
                    className={styles.Current__choice__wrapper}
                    ref={textRef}
                    onMouseEnter={enableLine}
                    onMouseLeave={disableLine}
                    onClick={openDialogWindow}
                >
                    <p>{currentTimeZoneId ? timeZones.find(tz => tz.id === currentTimeZoneId)?.label : 'Choose timezone'}</p>
                    <span className={styles.Arrow}>{isOpen ? '▲' : '▼'}</span>
                </div>
                <div
                    className={styles.Bottom__line}
                    ref={lineRef}
                    style={{
                        backgroundColor: textThemeColor,
                        width: lineWidth + 'px'
                    }}
                ></div>
                { isOpen && <div
                    className={styles.Dialog__window}
                    style={{
                        backgroundColor: HEXtoRGBA(firstThemeColor, alphaThemePercent),
                        top: topDialogOffset + 'px'
                    }}
                >
                    {timeZones.map((timezone) => (
                        /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                        <a
                            className={styles.Choice__option + ' Small__a__button'}
                            style={{
                                "--after-color": textThemeColor,
                                "--after-height": 1.5 + 'px'
                        }}
                            key={timezone.id}
                            onClick={() => handleTimeZoneChange(timezone.id)}
                        >
                            {timezone.label}
                        </a>
                        // <div
                        //     className={styles.Choice__option}
                        //     key={timezone.id}
                        //     onClick={() => handleTimeZoneChange(timezone.id)}
                        // >
                        //     {timezone.label}
                        // </div>
                    ))}
                </div>}
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