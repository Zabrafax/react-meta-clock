import './BaseLayout.css'
import ClockGrid from "./clock/ClockGrid";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import SettingsWindow from "./SettingsWindow";
import Footer from "./Footer";

function Main() {
    /*
        Settings window button
     */
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    const onSettingsClick = () => {
        setIsSettingsVisible(!isSettingsVisible);
    }

    const onSettingsCrossClick = () => {
        setIsSettingsVisible(false);
    }

    /*
        Fullscreen support
     */
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    useEffect(() => {
        const keyListener = (e) => {
            if (e.key === "Escape") {
                setIsFullscreen(false);
            }
        };

        window.addEventListener("keydown", keyListener);

        return () => window.removeEventListener("keydown", keyListener);
    }, []);

    useEffect(() => {
        const fullScreenHandler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", fullScreenHandler);

        return () => document.removeEventListener("fullscreenchange", fullScreenHandler);
    }, []);

    /*
        Grid size change
     */
    const [cols, setCols] = useState(12);
    const [rows, setRows] = useState(3);

    return (
        <>
            {!isFullscreen && <Header onSettingsClick={onSettingsClick} onFullScreenClick={toggleFullscreen} />}

            <main
                className="Main"
                style={{
                    marginTop: isFullscreen ? "0" : "5rem",
                    minHeight: isFullscreen ? "100vh" : "calc(100vh - 5rem - 5rem)",
                    justifyContent: isFullscreen ? "center" : "start"
                }}
            >
                <ClockGrid rows={rows} cols={cols} />
            </main>

            {isSettingsVisible &&
                <SettingsWindow
                    onSettingsCrossClick={onSettingsCrossClick}
                    setRows={setRows}
                    setCols={setCols}
                />
            }

            {!isFullscreen && <Footer />}
        </>
    );
}

export default Main;