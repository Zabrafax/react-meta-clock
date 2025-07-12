import "./Window.css";
import "./ServerErrorWindow.css";
import "../Buttons/SmallAButton.css"

function ServerErrorWindow(onServerErrorCrossClick) {
    return (
        <div className="Server__error__window Window">
            <div className="Window__top__wrapper">
                <h2>Connection Error</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="Closing__cross" onClick={() => window.location.reload()}>
                    <div className="Closing_cross__first"></div>
                    <div className="Closing_cross__second"></div>
                </a>
            </div>
            <div className="Window__main__wrapper Server__error__window__main__wrapper">
                <p>Unable to connect to the server</p>
                <p>Please check your internet connection or try again later :3</p>
                <a className="Small__a__button" onClick={() => window.location.reload()}>Reload page</a>
            </div>
        </div>
    );
}

export default ServerErrorWindow;