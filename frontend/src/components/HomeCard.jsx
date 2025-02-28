//import the css and other needed things once created

function HomeCard({page}) {
    return (
    <div className="home-card">
        <div className="page-info">
            <h3>{page.title}
                <p>{page.description}</p>
            </h3>
        </div>
    </div>
    )
}

export default HomeCard