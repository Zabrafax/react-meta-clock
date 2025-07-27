import {createContext, useContext, useEffect, useState} from "react";
import {useUserContext} from "./UserContext";
import {wait} from "@testing-library/user-event/dist/utils";

const TimeZoneContext = createContext();

export function TimeZoneProvider({ children }) {
    const [currentTimeZoneId, setCurrentTimeZoneId] = useState("");
    const [timeZones, setTimeZones] = useState([]);
    
    const { isLoggedIn, userTimeZone } = useUserContext();

    const { saveTimeZone } = useUserContext();

    useEffect(() => {
        saveTimeZone(currentTimeZoneId);
    }, [currentTimeZoneId]);

    useEffect(() => {
        console.log("Is logged: " + isLoggedIn);
        console.log("UserTimeZone: " + userTimeZone);

        fetch('http://localhost:8080/api/clock/timezones')
            .then(res => res.json())
            .then(data => {
                const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const userOffsetSeconds = -new Date().getTimezoneOffset() * 60;

                const fallbackTimeZone = data[0]?.id || "";
                let selectedTimeZone;
                if(!!isLoggedIn && !!userTimeZone) {
                    selectedTimeZone = userTimeZone;
                } else if (data.some(tz => tz.id === deviceZone)) {
                    selectedTimeZone = deviceZone;
                } else {
                    selectedTimeZone = data.find(tz => parseInt(tz.offsetSeconds, 10) === userOffsetSeconds).id ?? fallbackTimeZone;
                }

                setTimeZones(data);
                // console.log(userZone);
                // console.log(selectedTimeZone);
                setCurrentTimeZoneId(selectedTimeZone);
            });
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