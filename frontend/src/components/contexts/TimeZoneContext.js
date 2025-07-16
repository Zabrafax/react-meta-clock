import {createContext, useContext, useEffect, useState} from "react";

const TimeZoneContext = createContext();

export function TimeZoneProvider({ children }) {
    const [currentTimeZone, setCurrentTimeZone] = useState("");
    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/clock/timezones')
            .then(res => res.json())
            .then(data => {
                const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const userOffsetSeconds = -new Date().getTimezoneOffset() * 60;

                const fallbackTimeZone = data[0]?.id || "";
                let selectedTimeZone;
                if(data.some(tz => tz.id === userZone)) {
                    selectedTimeZone = userZone;
                } else {
                    selectedTimeZone = data.find(tz => tz.offsetSeconds === userOffsetSeconds) ?? fallbackTimeZone;
                }

                setTimeZones(data);
                console.log(userZone);
                console.log(selectedTimeZone);
                setCurrentTimeZone(selectedTimeZone);
            });
    }, [])

    return (
        <TimeZoneContext.Provider value={{
            currentTimeZone, setCurrentTimeZone, timeZones
        }}>
            {children}
        </TimeZoneContext.Provider>
    );
}

export function useTimeZones() {
    return useContext(TimeZoneContext);
}