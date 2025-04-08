//import the css and other needed things once created
import FunctionalityCard from "./FunctionalityCard"

function HomeCard({page}) {
    return (
    <div className="home-card">
        <div className="page-info">
            
            <FunctionalityCard fpage={page} />
        </div>
    </div>
    )
}

export default HomeCard