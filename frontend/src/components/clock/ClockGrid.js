import './ClockGrid.css';
import React, {useEffect, useState, useRef} from 'react';
import Clock from "./Clock";
import {useTimeZones} from "../contexts/TimeZoneContext";
import {useErrorContext} from "../contexts/ErrorContext";
import {useDeviceContext} from "../contexts/DeviceContext";

function ClockGrid(props) {
    const rows = props.rows;
    const cols = props.cols;
    const isSecondsEnabled = props.isSecondsEnabled;
    const isSeparatorsEnabled = props.isSeparatorsEnabled;

    const { currentTimeZoneId } = useTimeZones();
    const { handleError } = useErrorContext();
    const { isTablet, isMobile, isSmallHorizontal } = useDeviceContext();

    const [gridRows, setGridRows] = useState(rows);
    const [gridCols, setGridCols] = useState(cols * 6);
    const [gridSize, setGridSize] = useState(0);

    const [minuteArrowDegreesArray, setMinuteArrowDegreesArray] = useState([]);
    const [hourArrowDegreesArray, setHourArrowDegreesArray] = useState([]);

    const previousMinuteArrowDegreesArray = useRef("");
    const previousHourArrowDegreesArray = useRef("");

    useEffect(() => {
        if(isTablet || isSmallHorizontal) {
            setGridSize(2)
        } else {
            if(isSecondsEnabled && isSeparatorsEnabled) {
                setGridSize(1);
            } else {
                setGridSize(0);
            }
        }

        //console.log(gridSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSecondsEnabled, isSeparatorsEnabled, isMobile, isTablet]);

    useEffect(() => {
        console.log("isMobile: ", isMobile + ", isTablet: " + isTablet);

        if (!currentTimeZoneId) {
            //console.warn("Timezone is not defined, waiting...");
            return;
        }

        const backendUrl = process.env.REACT_APP_API_BASE || window.location.origin;
        const wsProtocol = backendUrl.startsWith("https") ? "wss" : "ws";
        const socket = new WebSocket(`${wsProtocol}://${new URL(backendUrl).host}/clock/coordinates`);

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "subscribe",
                rows,
                cols,
                isSecondsEnabled,
                isSeparatorsEnabled,
                timeZoneId: currentTimeZoneId,
                isVertical: isTablet,
            }));
            //setIsServerErrorWindowVisible(false);
            //console.log("Websocket connected, subscribe message sent");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                const {
                    gridRows,
                    gridCols,
                    clockCoordinates
                } = data;

                //console.log("Data received:", data);

                setGridRows(gridRows);
                setGridCols(gridCols);

                const dataMinuteArray = clockCoordinates.map(clock =>
                    clock ? clock.minuteArrowDegrees : null
                );
                const dataHourArray = clockCoordinates.map(clock =>
                    clock ? clock.hourArrowDegrees : null
                );

                previousMinuteArrowDegreesArray.current = minuteArrowDegreesArray;
                previousHourArrowDegreesArray.current = hourArrowDegreesArray;

                setMinuteArrowDegreesArray(dataMinuteArray);
                setHourArrowDegreesArray(dataHourArray);

                //console.log("Received grid size: " + gridRows + ", " + gridCols);
            } catch (e) {
                console.error("WebSocket parsing error:", e);
            }
        };

        socket.onerror = (error) => {
            handleError();
            console.error("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            const errorCodes = [1002, 1006, 1008, 1009, 1011, 1015];
            if(errorCodes.includes(event.code)) {
                handleError();
                //console.log("WebSocket closed with error: " + event.code);
            }
            //console.log("WebSocket closed: " + event.code);
        };

        return () => {
            // setIsServerErrorWindowVisible(true);
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
        };

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [cols, rows, isSecondsEnabled, isSeparatorsEnabled, currentTimeZoneId, isTablet]);

    return (
        <div
            className="Clock__grid__container"
            style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
            {Array.from({length: gridRows * gridCols}).map((_, i) => (
                <Clock
                    key={i}
                    minuteArrowDegrees={minuteArrowDegreesArray[i] != null ? minuteArrowDegreesArray[i] : 0}
                    hourArrowDegrees={hourArrowDegreesArray[i] != null ? hourArrowDegreesArray[i] : 0}
                    size={gridSize}
                />
            ))}
        </div>
    )
}

export default ClockGrid;