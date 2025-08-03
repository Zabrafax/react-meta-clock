import {useState} from "react";
import styles from "../MobileHeader.module.css";
import './MobileSmallAButton.css';

function MobileSmallAButton({ name, onClick, afterColor }) {
    const [isActive, setIsActive] = useState(false);

    function handleOnClick() {
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
            className={`Mobile__small__a__button ${isActive ? styles.active : ''}`}
            onClick={handleOnClick}
            style={{
                "--after-color": afterColor,
                "--after-height": "1px"
            }}
        >{name}</a>
    );
}

export default MobileSmallAButton;