import styles from './TimeZonePicker.module.css';
import {useEffect, useState} from "react";

function TimeZonePicker() {
    const [timeZones, setTimeZones] = useState([]);
    const [currentTimeZone, setCurrentTimeZone] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/api/clock/timezones')
            .then(res => {
                console.log(res.headers.get("content-type"));
                return res.text();
            })
            .then(text => {
                console.log(text);
            })
            .catch(err => console.error(err));
        // fetch("/clock/timezones")
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        //         const sortedTimeZones = data.sort((a, b) => a.localeCompare(b));
        //         setTimeZones(sortedTimeZones);
        //         setCurrentTimeZone(sortedTimeZones.includes(userZone) ? userZone : sortedTimeZones[0]);
        //     });
    }, []);

    function handleTimeZoneChange(event) {
        setCurrentTimeZone(event.target.value);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <label htmlFor="timezone">Time zone:</label>
            <select id="timezone" value="selectedTimeZone" onChange={handleTimeZoneChange}>
                {timeZones.map((timezone) => (
                    <option key={timezone} value={timezone}>
                        {timezone}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TimeZonePicker;