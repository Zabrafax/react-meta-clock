import styles from './TimeZonePicker.module.css';
import {useTimeZones} from "../contexts/TimeZoneContext";
import {useState} from "react";

function TimeZonePicker() {
    const { timeZones, currentTimeZoneId, setCurrentTimeZoneId } = useTimeZones();

    const [isOpen, setIsOpen] = useState(false);

    function handleTimeZoneChange(event) {
        setCurrentTimeZoneId(event.target.value);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <div className={styles.Text__wrapper}>
                <p>{currentTimeZoneId ? timeZones.find(tz => tz.id === currentTimeZoneId)?.label : 'Choose timezone'}</p>
                <span className={styles.Arrow}>{isOpen ? '▲' : '▼'}</span>
            </div>
        </div>

        // <div className={styles.TimeZonePicker}>
        //     <label htmlFor="timezone">Time zone: </label>
        //     <select id="timezone" value={currentTimeZoneId} onChange={handleTimeZoneChange}>
        //         {timeZones.map((timezone) => (
        //             <option
        //                 key={timezone.id}
        //                 value={timezone.id}
        //             >
        //                 {timezone.label}
        //             </option>
        //         ))}
        //     </select>
        // </div>
    );
}

export default TimeZonePicker;