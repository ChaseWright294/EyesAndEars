import HomeCard from "../components/HomeCard"
import "../css/Home.css";
import Welcome from "../components/welcome";
import metronomeImg from "../assets/metronome.png";
import tunerImg from "../assets/tuner.png";
import sheetmusicImg from "../assets/sheet-music.png";






function Home() {
    const pages = [
      {
        title: "Tuner",
        description: "Tune your instrument",
        link: "/tuner",
        image: tunerImg
      },
      {
        title: "Metronome",
        description: "Practice in rhythm",
        link: "/metronome",
        image: metronomeImg
      },
      {
        title: "Sheet Music Reader",
        description: "Get help reading your sheet music",
        link: "/sheetmusic",
        image: sheetmusicImg
      }
    ]
  
    return (
      <>
      <div className = "home-top-section">
        <Welcome />
      </div>

     
      <div className="home-container">
        <HomeCard page={pages[0]}></HomeCard>
        <HomeCard page={pages[1]}></HomeCard>
        <HomeCard page={pages[2]}></HomeCard>
      </div>

      
      </>
    )
  }
  
  export default Home