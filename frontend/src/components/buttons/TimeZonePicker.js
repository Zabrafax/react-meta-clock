import styles from './TimeZonePicker.module.css';
import {useEffect, useState} from "react";

function TimeZonePicker() {
    const [timeZones, setTimeZones] = useState([]);
    const [currentTimeZone, setCurrentTimeZone] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/api/clock/timezones')
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                // const sortedTimeZones = data.sort((a, b) => a.label.localeCompare(b.label));
                const sortedTimeZones = data;

                console.log(userZone);

                setTimeZones(sortedTimeZones);

                let isTrue = sortedTimeZones.some(tz => tz.id === userZone);
                console.log(isTrue);
                setCurrentTimeZone(sortedTimeZones.some(tz => tz.id === userZone) ? userZone : sortedTimeZones[0].id);
            });
    }, []);

    function handleTimeZoneChange(event) {
        setCurrentTimeZone(event.target.value);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <label htmlFor="timezone">Time zone:</label>
            <select id="timezone" value={currentTimeZone} onChange={handleTimeZoneChange}>
                {timeZones.map((timezone) => (
                    <option
                        key={timezone.id}
                        value={timezone.id}
                    >
                        {timezone.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TimeZonePicker;