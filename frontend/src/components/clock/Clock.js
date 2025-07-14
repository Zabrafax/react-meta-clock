import './Clock.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {useTheme} from "../contexts/ThemeContext";

function Clock(props) {
    const { allSecondThemeColors, allAccentThemeColors, currentThemeNumber } = useTheme();

    let secondArrowDegrees = props.secondArrowDegrees;
    let minuteArrowDegrees = props.minuteArrowDegrees;
    let hourArrowDegrees = props.hourArrowDegrees;

    return (
        <div className="Clock-wrapper">
            <div
                className="Clock-background"
                style={{backgroundColor: allSecondThemeColors[currentThemeNumber]}}
            >
                {/*<div style={{'--second-arrow-degrees': `${secondArrowDegrees}deg` }} className="Clock-second-arrow"></div>*/}
                <div
                    style={{
                        '--minute-arrow-degrees': `${minuteArrowDegrees}deg`,
                        backgroundColor: allAccentThemeColors[currentThemeNumber],
                        boxShadow: currentThemeNumber === 1 ? 'none' : '0 0 5px 1px black'
                    }}
                    className="Clock-minute-arrow"
                ></div>
                <div
                    style={{
                        '--hour-arrow-degrees': `${hourArrowDegrees}deg`,
                        backgroundColor: allAccentThemeColors[currentThemeNumber],
                        boxShadow: currentThemeNumber === 1 ? 'none' : '0 0 5px 0px black'
                    }}
                    className="Clock-hour-arrow"
                ></div>
            </div>
        </div>
    )
}

export default Clock;