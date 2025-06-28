import './BaseLayout.css';

function Header({ onSettingsClick }) {
    return (
        <header className="Header">
            <div className="Header__logo">
                <h1>Meta Clock</h1>
            </div>
            <div className="Header__buttons">
                <a className="Header__a__button">ACCOUNT</a>
                <a className="Header__a__button" onClick={onSettingsClick}>SETTINGS</a>
                <a className="Header__a__button">FULLSCREEN</a>
            </div>
        </header>
    );
}

export default Header;