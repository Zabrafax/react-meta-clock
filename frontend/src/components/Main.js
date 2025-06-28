import './BaseLayout.css'
import ClockGrid from "../clock/ClockGrid";
import {useState, useEffect} from "react";

function Main() {
    const [cols, setCols] = useState(12);
    const [rows, setRows] = useState(3);

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
        <main className="Main">
            <ClockGrid rows={rows} cols={cols} />
            <button onClick={changeGridSize}>Change grid</button>
        </main>
    );
}

export default Main;