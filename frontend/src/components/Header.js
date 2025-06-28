import './BaseLayout.css';

function Header() {
    return (
        <header className="Header">
            <div className="Header__logo">
                <h1>Meta Clock</h1>
            </div>
            <div className="Header__buttons">
                <a className="Header__a__button">SETTINGS</a>
                <a className="Header__a__button">ACCOUNT</a>
            </div>
        </header>
    );
}

export default Header;