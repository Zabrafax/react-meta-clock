import './Clock.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

function Clock(props) {
    let secondArrowDegrees = props.secondArrowDegrees;
    let minuteArrowDegrees = props.minuteArrowDegrees;
    let hourArrowDegrees = props.hourArrowDegrees;

    return (
        <div className="Clock-wrapper">
            <div className="Clock-background">
                {/*<div style={{'--second-arrow-degrees': `${secondArrowDegrees}deg` }} className="Clock-second-arrow"></div>*/}
                <div style={{'--minute-arrow-degrees': `${minuteArrowDegrees}deg` }} className="Clock-minute-arrow"></div>
                <div style={{'--hour-arrow-degrees': `${hourArrowDegrees}deg` }} className="Clock-hour-arrow"></div>
            </div>
        </div>
    )
}

export default Clock;