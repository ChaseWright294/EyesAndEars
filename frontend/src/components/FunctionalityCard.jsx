import { Link } from "react-router-dom";

function FunctionalityCard({fpage}){
    return(
        <div className="functionality-card">
            <Link to={fpage.link} className="card-link">
                <h3>{fpage.title}</h3>
                <p>{fpage.description}</p>
            </Link>
        </div>
    )
}

export default FunctionalityCard