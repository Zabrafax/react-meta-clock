import './BaseLayout.css'
import ClockGrid from "../clock/ClockGrid";

function Main() {
    return (
        <main className="Main">
            <ClockGrid rows={3} cols={8} />
        </main>
    );
}

export default Main;