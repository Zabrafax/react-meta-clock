import './SettingsWindow.css';
import './Window.css';
import SimpleSwitch from "../buttons/SimpleSwitch";
import ThemeSwitch from "../buttons/themeSwitch/ThemeSwitch";
import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";
import TimeZonePicker from "../buttons/TimeZonePicker";
import {useDeviceContext} from "../contexts/DeviceContext";

function SettingsWindow({
                            onSettingsCrossClick,
                            isSecondsEnabled,
                            setIsSecondsEnabled,
                            isSeparatorsEnabled,
                            setIsSeparatorsEnabled
                        }) {

    const { firstThemeColor, textThemeColor, alphaThemePercent } = useTheme();
    const { isMobile } = useDeviceContext();

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
                {/*
                    eslint-disable-next-line
                    jsx-a11y/anchor-has-content,
                    jsx-a11y/click-events-have-key-events,
                    jsx-a11y/no-static-element-interactions,
                    jsx-a11y/anchor-is-valid
                */}
                <a
                    className="Closing__cross"
                    onClick={onSettingsCrossClick}
                    style={{ "--after-color": textThemeColor }}
                ></a>
            </div>
            <div className="Window__main__wrapper">
                <div
                    className="All__settings__wrapper"
                >
                    <div className="Setting__switch__wrapper">
                        <SimpleSwitch
                            name="Seconds"
                            initialState={isSecondsEnabled}
                            onEnable={enableSeconds}
                            onDisable={disableSeconds}
                        />
                        {!isMobile &&
                            <SimpleSwitch
                                name="Separators"
                                initialState={isSeparatorsEnabled}
                                onEnable={enableSeparators}
                                onDisable={disableSeparators}
                            />
                        }
                    </div>
                    <ThemeSwitch
                        name="Theme Colors"
                    />
                    <TimeZonePicker />
                    {/*<ColorPicker name="Theme Color" />*/}
                </div>
            </div>
        </div>
    );
}

export default SettingsWindow;