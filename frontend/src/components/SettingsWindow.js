import './SettingsWindow.css';

function SettingsWindow({ onSettingsCrossClick, changeGridSize }) {
    return (
        <div className="Settings__window">
            <div className="Settings__top__wrapper">
                <h2>Settings</h2>
                <a className="Closing__cross" onClick={onSettingsCrossClick}>
                    <div className="Closing_cross__first"></div>
                    <div className="Closing_cross__second"></div>
                </a>
            </div>
            <div className="Settings__main__wrapper">
                <a onClick={changeGridSize}>Change Grid Size</a>
            </div>
        </div>
    );
}

export default SettingsWindow;