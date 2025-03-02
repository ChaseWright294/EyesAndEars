import HomeCard from "../components/HomeCard"
import FunctionalityCard from "../components/FunctionalityCard"

function Home() {
    const pages = [
      {
        title: "Tuner",
        description: "Tune your instrument"
      },
      {
        title: "Metronome",
        description: "Practice in rhythm"
      },
      {
        title: "Sheet Music Reader",
        description: "Get help reading your sheet music"
      }
    ]

    const functionalities = [
      {
        title: "Tuner",
        description: "Tune your instrument",
        link: "/tuner"
      },
      {
        title: "Metronome",
        description: "Practice in rhythm",
        link: "/metronome"
      },
      {
        title: "Sheet Music Reader",
        description: "Get help reading your sheet music",
        link: "/sheetmusic"

      }
    ]
  
    return (
      <div>
        <h3>Home page is working</h3>
        <HomeCard page={pages[0]}></HomeCard>
        <HomeCard page={pages[1]}></HomeCard>
        <HomeCard page={pages[2]}></HomeCard>

        {functionalities.map((func, index) => (
          <FunctionalityCard
            key={index}
            title={func.title}
            description={func.description}
            link={func.link}
          />

        ))}
      </div>


    )

  }
  
  export default Home