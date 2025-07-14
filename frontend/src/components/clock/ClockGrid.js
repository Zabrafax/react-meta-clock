import './ClockGrid.css';
import React, {useEffect, useState, useRef} from 'react';
import Clock from "./Clock";

function ClockGrid(props) {
    const rows = props.rows;
    const cols = props.cols;
    const isSecondsEnabled = props.isSecondsEnabled;
    const isSeparatorsEnabled = props.isSeparatorsEnabled;

    const [totalRows, setTotalRows] = useState(0);
    const [totalCols, setTotalCols] = useState(0);


    const setIsServerErrorWindowVisible = props.setIsServerErrorWindowVisible;

    const [minuteArrowDegreesArray, setMinuteArrowDegreesArray] =
        useState(() => Array.from({length: totalRows * totalCols}));
    const [hourArrowDegreesArray, setHourArrowDegreesArray] =
        useState(() => Array.from({length: totalRows * totalCols}));

    const previousMinuteArrowDegreesArray = useRef("");
    const previousHourArrowDegreesArray = useRef("");

    useEffect(() => {
        setTotalRows(rows);

        if(isSecondsEnabled) {
            if(isSeparatorsEnabled) {
                setTotalCols(cols * 6 + 2);
            } else {
                setTotalCols(cols * 6);
            }
        }
        else {
            if(isSeparatorsEnabled) {
                setTotalCols(cols * 4 + 2);
            } else {
                setTotalCols(cols * 4);
            }
        }
    }, [cols, rows, isSecondsEnabled, isSeparatorsEnabled]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/clock/coordinates");

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: "subscribe", rows, cols, isSecondsEnabled, isSeparatorsEnabled }));
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
    }, [cols, rows, isSecondsEnabled, isSeparatorsEnabled, totalRows, totalCols]);

    return (
        <div
            className="Clock-grid-container"
            style={{gridTemplateColumns: `repeat(${totalCols}, 1fr)`,
        }}>
            {Array.from({length: totalRows * totalCols}).map((_, i) => (
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