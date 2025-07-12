import './ClockGrid.css';
import React, {useEffect, useState, useRef} from 'react';
import Clock from "./Clock";

function ClockGrid(props) {
    const rows = props.rows;
    const cols = props.cols;
    const total = rows * cols;

    const setIsServerErrorWindowVisible = props.setIsServerErrorWindowVisible;

    const [minuteArrowDegreesArray, setMinuteArrowDegreesArray] =
        useState(() => Array.from({length: total}));
    const [hourArrowDegreesArray, setHourArrowDegreesArray] =
        useState(() => Array.from({length: total}));

    const previousMinuteArrowDegreesArray = useRef("");
    const previousHourArrowDegreesArray = useRef("");

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/clock/coordinates");

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "subscribe", rows, cols }));
            //setIsServerErrorWindowVisible(false);
            console.log("Websocket connected, subscribe message sent");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                //console.log("Data received:", data);

                const dataMinuteArray = data.map(clockCoordinates =>
                    clockCoordinates ? clockCoordinates.minuteArrowDegrees : null
                );
                const dataHourArray = data.map(clockCoordinates =>
                    clockCoordinates ? clockCoordinates.hourArrowDegrees : null
                );

                previousMinuteArrowDegreesArray.current = minuteArrowDegreesArray;
                previousHourArrowDegreesArray.current = hourArrowDegreesArray;

                setMinuteArrowDegreesArray(dataMinuteArray);
                setHourArrowDegreesArray(dataHourArray);
            } catch (e) {
                console.error("WebSocket parsing error:", e);
            }
        };

        socket.onerror = (error) => {
            setIsServerErrorWindowVisible(true);
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            const errorCodes = [1002, 1006, 1008, 1009, 1011, 1015];
            if(errorCodes.includes(event.code)) {
                setIsServerErrorWindowVisible(true);
                console.log("WebSocket closed with error: " + event.code);
            }
            console.log("WebSocket closed: " + event.code);
        };

        return () => {
            // setIsServerErrorWindowVisible(true);
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
        };
    }, [cols, rows]);

    return (
        <div
            className="Clock-grid-container"
            style={{gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}>
            {Array.from({length: total}).map((_, i) => (
                <Clock
                    key={i}
                    minuteArrowDegrees={minuteArrowDegreesArray[i] != null ? minuteArrowDegreesArray[i] : 0}
                    hourArrowDegrees={hourArrowDegreesArray[i] != null ? hourArrowDegreesArray[i] : 0}
                />
            ))}
        </div>
    )
}

export default ClockGrid;