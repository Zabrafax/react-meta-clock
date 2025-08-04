import './Clock.css';
import React, {useEffect, useState} from 'react';
import {useTheme} from "../contexts/ThemeContext";

function Clock(props) {
    const { secondThemeColor, accentThemeColor, arrowShadow } = useTheme();

    let minuteArrowDegrees = props.minuteArrowDegrees;
    let hourArrowDegrees = props.hourArrowDegrees;
    let size = props.size;

    const [sizeString, setSizeString] = useState('');

    useEffect(() => {
        setSizeString(size === 2 ? 'Small' : (size === 1 ? 'Medium' : ''));
    }, [size])

    return (
        <div className={`Clock-wrapper ${sizeString}`}>
            <div
                className={`Clock-background ${sizeString}`}
                style={{ backgroundColor: secondThemeColor }}
            >
                {/*<div style={{'--second-arrow-degrees': `${secondArrowDegrees}deg` }} className="Clock-second-arrow"></div>*/}
                <div
                    style={{
                        '--minute-arrow-degrees': `${minuteArrowDegrees}deg`,
                        backgroundColor: accentThemeColor,
                        boxShadow: (arrowShadow) ? '0 0 5px 0px black' : 'none'
                    }}
                    className={`Clock-minute-arrow ${sizeString}`}
                ></div>
                <div
                    style={{
                        '--hour-arrow-degrees': `${hourArrowDegrees}deg`,
                        backgroundColor: accentThemeColor,
                        boxShadow: (arrowShadow) ? '0 0 5px 0px black' : 'none'
                    }}
                    className={`Clock-hour-arrow ${sizeString}`}
                ></div>
            </div>
        </div>
    )
}

export default Clock;