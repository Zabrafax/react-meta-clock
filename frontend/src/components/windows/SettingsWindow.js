import './SettingsWindow.css';
import './Window.css';
import SimpleSwitch from "../SimpleSwitch";
import ThemeSwitch from "../buttons/ThemeSwitch";
import {useTheme} from "../contexts/ThemeContext";
import {HEXtoRGBA} from "../utils/colorUtils";

function SettingsWindow({
                            onSettingsCrossClick,
                            isSecondsEnabled,
                            setIsSecondsEnabled,
                            isSeparatorsEnabled,
                            setIsSeparatorsEnabled
                        }) {

    const { allFirstThemeColors, allAccentThemeColors, currentThemeNumber } = useTheme();

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
            style={{backgroundColor: HEXtoRGBA(allFirstThemeColors[currentThemeNumber], 0.75)}}
        >
            <div className="Window__top__wrapper">
                <h2>Settings</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="Closing__cross" onClick={onSettingsCrossClick}>
                    <div className="Closing_cross__first"></div>
                    <div className="Closing_cross__second"></div>
                </a>
            </div>
            <div className="Window__main__wrapper">
                <div className="Setting__switch__wrapper">
                    <SimpleSwitch name="Seconds" initialState={isSecondsEnabled} onEnable={enableSeconds} onDisable={disableSeconds}/>
                    <SimpleSwitch name="Separators" initialState={isSeparatorsEnabled} onEnable={enableSeparators} onDisable={disableSeparators}/>
                </div>
                <ThemeSwitch name="Theme Colors" choiceColors={allFirstThemeColors} lineColors={allAccentThemeColors} />
                {/*<ColorPicker name="Theme Color" />*/}
            </div>
        </div>
    );
}

export default SettingsWindow;