import styles from './ThemeSwitchColorPicker.module.css'
import { useState, useEffect, useRef } from 'react'
import { ChromePicker } from 'react-color';

function CustomColorPicker( {name, currentColor, onChange, lineColor, borderColor} ) {
    const [isPickerOpened, setIsPickerOpened] = useState(false);
    const pickerRef = useRef(null);

    function handleTileClick() {
        setIsPickerOpened(prev => !prev);
    }

    const handleColorChange = (color) => {
        onChange(color.hex);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if(pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsPickerOpened(false);
            }
        }

        if(isPickerOpened) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isPickerOpened]);

    return (
        <div className={styles.Color__picker__wrapper}>
            <p>{name}</p>
            {/*
                eslint-disable-next-line
                jsx-a11y/click-events-have-key-events,
                jsx-a11y/no-static-element-interactions
            */}
            <div
                className={styles.Color__pick__tile}
                style={{
                    backgroundColor: currentColor,
                    "--after-color": lineColor,
                    border: borderColor ? `2px solid ${borderColor}` : 'none'
                }}
                onClick={handleTileClick}
            ></div>
            {isPickerOpened &&
                <div
                    className={styles.React__color__picker}
                    ref={pickerRef}
                >
                    <ChromePicker
                        style={{fontFamily: 'inherit'}}
                        color={ currentColor }
                        onChange={handleColorChange}
                    />
                </div>
            }
        </div>
    );
}

export default CustomColorPicker;