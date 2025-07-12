import "./Window.css";
import "./ServerErrorWindow.css";

function ServerErrorWindow(onServerErrorCrossClick) {
    return (
        <div className="Server__error__window Window">
            <div className="Window__top__wrapper">
                <h2>Error</h2>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="Closing__cross" onClick={onServerErrorCrossClick}>
                    <div className="Closing_cross__first"></div>
                    <div className="Closing_cross__second"></div>
                </a>
            </div>
            <div className="Window__main__wrapper">
                <p>There is an error </p>
            </div>
        </div>
    );
}

export default ServerErrorWindow;