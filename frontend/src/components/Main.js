import './BaseLayout.css'
import ClockGrid from "./clock/ClockGrid";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import ServerErrorWindow from "./windows/ServerErrorWindow";
import SettingsWindow from "./windows/SettingsWindow";
import Footer from "./Footer";
import { useTheme } from "./contexts/ThemeContext";

function Main() {
    /*
        Theme
     */
    const { allFirstThemeColors, allSecondThemeColors, allTextThemeColors, currentThemeNumber } = useTheme();

    /*
        Server error window
     */
    const [isServerErrorWindowVisible, setIsServerErrorWindowVisible] = useState(false);

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
        Initial settings
     */
    const [isSecondsEnabled, setIsSecondsEnabled] = useState(true);
    const [isSeparatorsEnabled, setIsSeparatorsEnabled] = useState(false);

    return (
        <div
            className="Page__back__wrapper"
            style={{
                color: allTextThemeColors[currentThemeNumber],
                backgroundColor: allFirstThemeColors[currentThemeNumber]
            }}
        >
            {!isFullscreen && <Header onSettingsClick={onSettingsClick} onFullScreenClick={toggleFullscreen} />}

            <main
                className="Main"
                style={{
                    marginTop: isFullscreen ? "0" : "5rem",
                    minHeight: isFullscreen ? "100vh" : "calc(100vh - 5rem - 5rem)",
                    justifyContent: isFullscreen ? "center" : "start",
                    backgroundColor: allFirstThemeColors[currentThemeNumber]
                }}
            >
                <ClockGrid
                    rows={3}
                    cols={2}
                    isSecondsEnabled={isSecondsEnabled}
                    isSeparatorsEnabled={isSeparatorsEnabled}
                    setIsServerErrorWindowVisible={setIsServerErrorWindowVisible}
                />
            </main>

            {isServerErrorWindowVisible &&
                <ServerErrorWindow />
            }

            {isSettingsVisible &&
                <SettingsWindow
                    onSettingsCrossClick={onSettingsCrossClick}
                    isSecondsEnabled={isSecondsEnabled}
                    setIsSecondsEnabled={setIsSecondsEnabled}
                    isSeparatorsEnabled={isSeparatorsEnabled}
                    setIsSeparatorsEnabled={setIsSeparatorsEnabled}
                />
            }

            {!isFullscreen && <Footer />}
        </div>
    );
}

export default Main;