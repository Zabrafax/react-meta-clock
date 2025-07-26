import styles from './ThemeSwitchColorPicker.module.css'

function customColorPicker( {name, currentColor, onChange} ) {
    return (
        <div className={styles.Color__picker__wrapper}>
            <p>{name}</p>
            <input type="color"/>
        </div>
    );
}

export default customColorPicker;