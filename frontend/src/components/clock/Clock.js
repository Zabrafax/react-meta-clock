import './Clock.css';
import React from 'react';
import {useTheme} from "../contexts/ThemeContext";

function Clock(props) {
    const { secondThemeColor, accentThemeColor, arrowShadow } = useTheme();

    let minuteArrowDegrees = props.minuteArrowDegrees;
    let hourArrowDegrees = props.hourArrowDegrees;

    return (
        <div className="Clock-wrapper">
            <div
                className="Clock-background"
                style={{ backgroundColor: secondThemeColor }}
            >
                {/*<div style={{'--second-arrow-degrees': `${secondArrowDegrees}deg` }} className="Clock-second-arrow"></div>*/}
                <div
                    style={{
                        '--minute-arrow-degrees': `${minuteArrowDegrees}deg`,
                        backgroundColor: accentThemeColor,
                        boxShadow: (arrowShadow) ? '0 0 5px 0px black' : 'none'
                    }}
                    className="Clock-minute-arrow"
                ></div>
                <div
                    style={{
                        '--hour-arrow-degrees': `${hourArrowDegrees}deg`,
                        backgroundColor: accentThemeColor,
                        boxShadow: (arrowShadow) ? '0 0 5px 0px black' : 'none'
                    }}
                    className="Clock-hour-arrow"
                ></div>
            </div>
        </div>
    )
}

export default Clock;