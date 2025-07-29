import './SettingsWindow.css';
import './Window.css';
import SimpleSwitch from "../SimpleSwitch";
import ThemeSwitch from "../buttons/themeSwitch/ThemeSwitch";
import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import TimeZonePicker from "../buttons/TimeZonePicker";
import {useEffect, useRef, useState} from "react";

function SettingsWindow({
                            onSettingsCrossClick,
                            isSecondsEnabled,
                            setIsSecondsEnabled,
                            isSeparatorsEnabled,
                            setIsSeparatorsEnabled
                        }) {

    const { firstThemeColor, textThemeColor, alphaThemePercent } = useTheme();

    const themeSwitchRef = useRef();
    const [themeSwitchWidth, setThemeSwitchWidth] = useState(0);
    const allSettingsWrapperRef = useRef();
    const [allSettingsWrapperWidth, setAllSettingsWrapperWidth] = useState(0);

    useEffect(() => {
        if (allSettingsWrapperRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                const newWidth = allSettingsWrapperRef.current.offsetWidth;
                setAllSettingsWrapperWidth(newWidth);
            });

            resizeObserver.observe(allSettingsWrapperRef.current);

            return () => resizeObserver.disconnect();
        }
    }, []);

    useEffect(() => {
        if (themeSwitchRef.current) {
            const resizeObserver = new ResizeObserver(() => {
                const newWidth = themeSwitchRef.current.offsetWidth;
                setThemeSwitchWidth(newWidth);
            });

            resizeObserver.observe(themeSwitchRef.current);

            return () => resizeObserver.disconnect();
        }
    }, []);

    const disableSeconds = () => {
        setIsSecondsEnabled(false);
    }

    const enableSeconds = () => {
        setIsSecondsEnabled(true);
    }

    const enableSeparators = () => {
        setIsSeparatorsEnabled(true);
    }

    const disableSeparators = () => {
        setIsSeparatorsEnabled(false);
    }

    return (
        <div
            className="Settings__window Window"
            style={{
                backgroundColor: HEXtoRGBA(firstThemeColor, alphaThemePercent)
            }}
        >
            <div className="Window__top__wrapper">
                <h2>Settings</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className="Closing__cross"
                    onClick={onSettingsCrossClick}
                    style={{ "--after-color": textThemeColor }}
                ></a>
            </div>
            <div className="Window__main__wrapper" ref={allSettingsWrapperRef}>
                <div
                    className="All__settings__wrapper"
                    style={{
                        "--all-setting-wrapper-width": allSettingsWrapperWidth + 'px',
                        "--theme-switch-width": themeSwitchWidth + 'px'
                    }}
                >
                    <div className="Setting__switch__wrapper">
                        <SimpleSwitch name="Seconds" initialState={isSecondsEnabled} onEnable={enableSeconds} onDisable={disableSeconds}/>
                        <SimpleSwitch name="Separators" initialState={isSeparatorsEnabled} onEnable={enableSeparators} onDisable={disableSeparators}/>
                    </div>
                    <ThemeSwitch
                        name="Theme Colors"
                        ref={themeSwitchRef}
                    />
                    <TimeZonePicker />
                    {/*<ColorPicker name="Theme Color" />*/}
                </div>
            </div>
        </div>
    );
}

export default SettingsWindow;