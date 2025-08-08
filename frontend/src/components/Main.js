import './BaseLayout.css'
import ClockGrid from "./clock/ClockGrid";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import ServerErrorWindow from "./windows/ServerErrorWindow";
import SettingsWindow from "./windows/SettingsWindow";
import Footer from "./Footer";
import { useTheme } from "./contexts/ThemeContext";
import AccountWindow from "./windows/AccountWindow";
import {useErrorContext} from "./contexts/ErrorContext";
import {useDeviceContext} from "./contexts/DeviceContext";
import MobileHeader from "./MobileHeader";
import AboutWindow from "./windows/AboutWindow";

function Main() {
    const { isMobile } = useDeviceContext();

    /*
        Theme
     */
    const { firstThemeColor, textThemeColor } = useTheme();

    /*
        Account window
     */
    const [isAccountWindowVisible, setIsAccountWindowVisible] = useState(false);

    const onAccountClick = () => {
        if (!isAccountWindowVisible) {
            closeAllWindows();
            setIsAccountWindowVisible(true);
        } else {
            setIsAccountWindowVisible(false);
        }
    }

    const onAccountCrossClick = () => {
        setIsAccountWindowVisible(false);
    }

    /*
        Error window context
     */
    const { isErrorWindowActive } = useErrorContext();

    /*
        Settings window
     */
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    const onSettingsClick = () => {
        if (!isSettingsVisible) {
            closeAllWindows();
            setIsSettingsVisible(true);
        } else {
            setIsSettingsVisible(false);
        }
    }

    const onSettingsCrossClick = () => {
        setIsSettingsVisible(false);
    }

    /*
        About window
     */
    const [isAboutWindowVisible, setIsAboutWindowVisible] = useState(false);

    const onAboutClick = () => {
        if (!isAboutWindowVisible) {
            closeAllWindows();
            setIsAboutWindowVisible(true);
        } else {
            setIsAboutWindowVisible(false);
        }
    }

    const onAboutCrossClick = () => {
        setIsAboutWindowVisible(false);
    }

    /*
        Close all windows
     */
    const closeAllWindows = () => {
        setIsAccountWindowVisible(false);
        setIsSettingsVisible(false);
        setIsAboutWindowVisible(false);
    }

    /*
        Fullscreen support
     */
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        closeAllWindows();

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
                color: textThemeColor,
                backgroundColor: firstThemeColor
            }}
        >
            {!isFullscreen && (
                isMobile
                    ? <MobileHeader
                        onAccountClick={onAccountClick}
                        onSettingsClick={onSettingsClick}
                        onAboutClick={onAboutClick}
                        onFullscreenClick={toggleFullscreen}
                    />
                    : <Header
                        onAccountClick={onAccountClick}
                        onSettingsClick={onSettingsClick}
                        onAboutClick={onAboutClick}
                        onFullscreenClick={toggleFullscreen}
                    />
            )}

            <main
                className="Main"
                style={{
                    marginTop: isFullscreen ? "0" : (isMobile ? "4rem" : "5rem"),
                    minHeight: isFullscreen ? "100vh" : (isMobile ? "calc(100vh - 4rem - 5rem)" : "calc(100vh - 5rem - 5rem)"),
                    justifyContent: isFullscreen ? "center" : (isMobile ? "center" : "start"),
                    backgroundColor: firstThemeColor
                }}
            >
                <ClockGrid
                    rows={3}
                    cols={2}
                    isSecondsEnabled={isSecondsEnabled}
                    isSeparatorsEnabled={isSeparatorsEnabled}
                />
            </main>

            {isAccountWindowVisible &&
                <AccountWindow
                    onAccountCrossClick={onAccountCrossClick}
                />
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

            {isAboutWindowVisible &&
                <AboutWindow
                    onAboutCrossClick={onAboutCrossClick}
                />
            }

            {isErrorWindowActive &&
                <ServerErrorWindow />
            }

            {!isFullscreen && <Footer />}
        </div>
    );
}

export default Main;