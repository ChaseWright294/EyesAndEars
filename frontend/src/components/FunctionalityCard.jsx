import { Link } from "react-router-dom";

function FunctionalityCard({ title, description, link }){
    return(
        <div className="functionality-card">
            <Link to={link} className="card-link">
                <h3>{title}</h3>
                <p>{description}</p>
            </Link>
        </div>
    )

}

export default FunctionalityCard