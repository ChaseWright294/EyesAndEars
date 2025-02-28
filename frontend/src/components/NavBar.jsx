import { Link } from "react-router-dom";
//import the css and other things once done

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to ="/" className="nav-link">Home</Link>
                <Link to ="/audio" className="nav-link">Audio</Link>
                <Link to ="/instruments" className="nav-link">Instruments</Link>
            </div>
        </nav>
    )
}

export default NavBar