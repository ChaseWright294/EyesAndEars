import HomeCard from "../components/HomeCard"

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
  
    return (
      <div>
        <HomeCard page={pages[0]}></HomeCard>
        <HomeCard page={pages[1]}></HomeCard>
        <HomeCard page={pages[2]}></HomeCard>
      </div>
    )
  }
  
  export default Home