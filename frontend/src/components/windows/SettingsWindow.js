import './SettingsWindow.css';
import './Window.css';
import SimpleSwitch from "../SimpleSwitch";
import ThemeSwitch from "../buttons/ThemeSwitch";

function SettingsWindow({
                            onSettingsCrossClick,
                            isSecondsEnabled,
                            setIsSecondsEnabled,
                            isSeparatorsEnabled,
                            setIsSeparatorsEnabled
                        }) {

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

    const themeSecondColors = ["#edc600", "#000000", "#edc600"]
    const themeColors = ["#000042", "#ffffff", "#bb1515"];

    return (
        <div className="Settings__window Window">
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
                <ThemeSwitch name="Theme Colors" colors={themeColors} secondColors={themeSecondColors} />
                {/*<ColorPicker name="Theme Color" />*/}
            </div>
        </div>
    );
}

export default SettingsWindow;