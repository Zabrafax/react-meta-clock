import './SimpleSwitch.css'

function SimpleSwitch({ name, onEnable, onDisable } ) {
    return (
        <div className="Simple__switch">
            <p>{name}</p>
            <div className="Choices__wrapper">
                <div className="Choices__text">
                    <p>[</p>
                    <a onClick={onEnable}>Enable</a>
                    <p>|</p>
                    <a onClick={onDisable}>Disable</a>
                    <p>]</p>
                </div>
            </div>
        </div>
    );
}

export default SimpleSwitch;