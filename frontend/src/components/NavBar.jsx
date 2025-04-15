import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaGuitar } from "react-icons/fa";
import "../css/Navbar.css"; 
import Home from "../pages/Home";



function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to ="/Home" className="nav-item">
                    <FaHome className="nav-icon"/>
                    <span>Home</span>
                </Link>
                <Link to ="/sheetmusic" className="nav-item">
                    <FaMusic className="nav-icon"/>
                    <span>Sheet Music Reader</span>
                </Link>
                <Link to ="/instruments" className="nav-item">
                    <FaGuitar className="nav-icon"/>
                    <span>Instruments</span>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar