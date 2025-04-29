import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaGuitar } from "react-icons/fa";
import "../css/Navbar.css";
import HoverSpeak from "./HoverSpeak"; // Import HoverSpeak

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Home Link */}
        <Link to="/Home" className="nav-item">
          <FaHome className="nav-icon" />
          <HoverSpeak text="Home" /> {/* HoverSpeak for Home */}
        </Link>

        {/* Sheet Music Reader Link */}
        <Link to="/dropdown" className="nav-item">
          <FaMusic className="nav-icon" />
          <HoverSpeak text="Sheet Music Reader" /> {/* HoverSpeak for Sheet Music Reader */}
        </Link>

        {/* Instruments Link */}
        <Link to="/instruments" className="nav-item">
          <FaGuitar className="nav-icon" />
          <HoverSpeak text="Instruments" /> {/* HoverSpeak for Instruments */}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
