import styles from './ThemeSwitchColorPicker.module.css'
import { useState, useEffect, useRef } from 'react'
import { SketchPicker } from 'react-color';

function CustomColorPicker( {name, currentColor, onChange} ) {
    const [isPickerOpened, setIsPickerOpened] = useState(false);

    function handleTileClick() {
        setIsPickerOpened(prev => !prev);
    }

    const handleColorChange = (color) => {
        onChange(color.hex);
    };

    return (
        <div className={styles.Color__picker__wrapper}>
            <p>{name}</p>
            <div
                className={styles.Color__pick__tile}
                style={{backgroundColor: currentColor}}
                onClick={handleTileClick}
            ></div>
            {isPickerOpened &&
                <SketchPicker
                    color={ currentColor }
                    onChange={handleColorChange}
                />
            }
        </div>
    );
}

export default CustomColorPicker;