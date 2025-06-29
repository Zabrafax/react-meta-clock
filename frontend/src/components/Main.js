import './BaseLayout.css'
import ClockGrid from "./clock/ClockGrid";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import SettingsWindow from "./SettingsWindow";

function Main() {
    const [cols, setCols] = useState(12);
    const [rows, setRows] = useState(3);

    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    const onSettingsClick = () => {
        setIsSettingsVisible(!isSettingsVisible);
    }

    const changeGridSize = () => {
        if (cols === 8) {
            setCols(12);
            setRows(3);
        } else {
            setCols(8);
            setRows(3);
        }
    };

    return (
        <>
            <Header onSettingsClick={onSettingsClick}/>
            <main className="Main">
                <ClockGrid rows={rows} cols={cols} />
                <button onClick={changeGridSize}>Change grid</button>
            </main>
            {isSettingsVisible && <SettingsWindow />}
        </>
    );
}

export default Main;