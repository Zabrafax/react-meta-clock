import './SettingsWindow.css';
import SimpleSwitch from "./SimpleSwitch";

function SettingsWindow({ onSettingsCrossClick, setRows, setCols }) {
    const disableSeconds = () => {
        setRows(3);
        setCols(8);
    }

    const enableSeconds = () => {
        setRows(3);
        setCols(12);
    }

    return (
        <div className="Settings__window">
            <div className="Settings__top__wrapper">
                <h2>Settings</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="Closing__cross" onClick={onSettingsCrossClick}>
                    <div className="Closing_cross__first"></div>
                    <div className="Closing_cross__second"></div>
                </a>
            </div>
            <div className="Settings__main__wrapper">
                <div className="Setting__switch__wrapper">
                    <SimpleSwitch name="Seconds" onEnable={enableSeconds} onDisable={disableSeconds}/>
                </div>
            </div>
        </div>
    );
}

export default SettingsWindow;