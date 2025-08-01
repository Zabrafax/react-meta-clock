import {createContext, useContext, useEffect, useState} from "react";
import {useUserContext} from "./UserContext";
import {useErrorContext} from "./ErrorContext";

const TimeZoneContext = createContext();

export function TimeZoneProvider({ children }) {
    const [currentTimeZoneId, setCurrentTimeZoneId] = useState("");
    const [timeZones, setTimeZones] = useState([]);
    
    const { isLoggedIn, userTimeZone, saveTimeZone } = useUserContext();
    const { handleError } = useErrorContext();

    useEffect(() => {
        saveTimeZone(currentTimeZoneId);
    }, [currentTimeZoneId]);

    useEffect(() => {
        async function fetchTimeZones() {
            try {
                const response = await fetch('http://localhost:8080/api/clock/timezones');

                if (!response.ok) {
                    console.log("Server error while fetching timezones", error);
                    handleError();
                }

                const data = await response.json();

                const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const userOffsetSeconds = -new Date().getTimezoneOffset() * 60;

                const fallbackTimeZone = data[0]?.id || "";
                let selectedTimeZone;
                if (!!isLoggedIn && !!userTimeZone) {
                    selectedTimeZone = userTimeZone;
                } else if (data.some(tz => tz.id === deviceZone)) {
                    selectedTimeZone = deviceZone;
                } else {
                    selectedTimeZone = data.find(tz => parseInt(tz.offsetSeconds, 10) === userOffsetSeconds).id ?? fallbackTimeZone;
                }

                setTimeZones(data);
                setCurrentTimeZoneId(selectedTimeZone);
            } catch (error) {
                console.log("Error while fetching timezones", error);
                handleError();
            }
        }

        fetchTimeZones();
    }, [isLoggedIn, userTimeZone]);

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