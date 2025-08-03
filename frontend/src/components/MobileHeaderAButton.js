import styles from "./MobileHeader.module.css";
import {useState} from "react";

function MobileHeaderAButton( {name, textThemeColor, onClick } ) {
    const [isActive, setIsActive] = useState(false);

    function handleClick() {
        onClick();
        setIsActive(true);
        setTimeout(() => setIsActive(false), 1000);
    }

    return (
        /*
            eslint-disable-next-line
            jsx-a11y/anchor-is-valid,
            jsx-a11y/click-events-have-key-events,
            jsx-a11y/no-static-element-interactions
        */
        <a
            className={`${styles.Header__a__button} ${isActive ? styles.active : ''}`}
            style={{ "--after-color": textThemeColor }}
            onClick={handleClick}
        >{name}</a>
    );
}

export default MobileHeaderAButton;