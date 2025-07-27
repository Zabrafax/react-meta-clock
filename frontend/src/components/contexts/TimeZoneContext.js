import {createContext, useContext, useEffect, useState} from "react";
import {useUserContext} from "./UserContext";

const TimeZoneContext = createContext();

export function TimeZoneProvider({ children }) {
    const [currentTimeZoneId, setCurrentTimeZoneId] = useState("");
    const [timeZones, setTimeZones] = useState([]);

    const { saveTimeZone } = useUserContext();

    useEffect(() => {
        console.log(currentTimeZoneId);
        saveTimeZone(currentTimeZoneId);
    }, [currentTimeZoneId]);

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
                    selectedTimeZone = data.find(tz => parseInt(tz.offsetSeconds, 10) === userOffsetSeconds).id ?? fallbackTimeZone;
                }

                setTimeZones(data);
                // console.log(userZone);
                // console.log(selectedTimeZone);
                setCurrentTimeZoneId(selectedTimeZone);
            });
    }, [])

    return (
        <TimeZoneContext.Provider value={{
            currentTimeZoneId, setCurrentTimeZoneId, timeZones
        }}>
            {children}
        </TimeZoneContext.Provider>
    );
}

export function useTimeZones() {
    return useContext(TimeZoneContext);
}