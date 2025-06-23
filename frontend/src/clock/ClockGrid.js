import './ClockGrid.css';
import React, {useEffect, useState} from 'react';
import Clock from "./Clock";

function ClockGrid(props) {
    const rows = props.rows;
    const cols = props.cols;
    const total = rows * cols;

    const [minuteArrowDegreesArray, setMinuteArrowDegreesArray] =
        useState(() => Array.from({length: total}));
    const [hourArrowDegreesArray, setHourArrowDegreesArray] =
        useState(() => Array.from({length: total}));

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/clock/current-time");

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const dataMinuteArray = data.map(clockCoordinates => clockCoordinates.minuteArrowDegrees);
                const dataHourArray = data.map(clockCoordinates => clockCoordinates.hourArrowDegrees);

                setMinuteArrowDegreesArray(dataMinuteArray);
                setHourArrowDegreesArray(dataHourArray);
            } catch (e) {
                console.error("WebSocket parsing error:", e);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div
            className="Clock-grid-container"
            style={{gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}>
            {Array.from({length: total}).map((_, i) => (
                <Clock
                    key={i}
                    secondArrowDegrees={0}
                    minuteArrowDegrees={minuteArrowDegreesArray[i]}
                    hourArrowDegrees={hourArrowDegreesArray[i]} />
            ))}
        </div>
    )
}

export default ClockGrid;