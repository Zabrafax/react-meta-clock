import styles from './TimeZonePicker.module.css';
import {useTimeZones} from "../contexts/TimeZoneContext";

function TimeZonePicker() {
    const { timeZones, currentTimeZoneId, setCurrentTimeZoneId } = useTimeZones();

    function handleTimeZoneChange(event) {
        setCurrentTimeZoneId(event.target.value);
    }

    return (
        <div className={styles.TimeZonePicker}>
            <p>{currentTimeZoneId ? timeZones.find(tz => tz.id === currentTimeZoneId)?.label : 'Choose timezone'}</p>
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