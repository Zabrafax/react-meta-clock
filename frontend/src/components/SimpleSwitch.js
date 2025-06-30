import './SimpleSwitch.css'
import { useState, useEffect, useRef } from 'react';

function SimpleSwitch({ name, onEnable, onDisable } ) {
    const [lineWidth, setLineWidth] = useState(0);
    const [isEnabled, setIsEnabled] = useState(true);

    const enableRef = useRef(null);
    const disableRef = useRef(null);

    useEffect(() => {
        if (enableRef.current && disableRef.current) {
            const enableWidth = enableRef.current.getBoundingClientRect().width;
            const disableWidth = disableRef.current.getBoundingClientRect().width;

            setLineWidth(!!isEnabled ? enableWidth : disableWidth);
        }
    }, [isEnabled]);

    const enable = () => {
        onEnable();
        setIsEnabled(true);
    }

    const disable = () => {
        onDisable();
        setIsEnabled(false);
    }

    return (
        <div className="Simple__switch">
            <p>{name + ": "}</p>
            <div className="Choices__wrapper">
                <div className="Choices__text">
                    <p>[ </p>
                    <a ref={enableRef} onClick={enable}>Enable</a>
                    <p> | </p>
                    <a ref={disableRef} onClick={disable}>Disable</a>
                    <p>]</p>
                </div>
                <div
                    className="Choices__line"
                    style={{width: lineWidth + "px"}}
                ></div>
            </div>
        </div>
    );
}

export default SimpleSwitch;