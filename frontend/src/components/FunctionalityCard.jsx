import { Link } from "react-router-dom";
import "../css/FunctionalityCard.css";


function FunctionalityCard({fpage}){
    return(
        <div className="functionality-card">
            <Link to={fpage.link} className="card-link">
            <img src={fpage.image} alt={fpage.title} className="card-image" />
            <div className = "card-text">
                <h3>{fpage.title}</h3>
                <p>{fpage.description}</p>
            </div>
            </Link>
        </div>
    )
}

export default FunctionalityCard