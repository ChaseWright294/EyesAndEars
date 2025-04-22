import HomeCard from "../components/HomeCard"
import "../css/Home.css";
import Welcome from "../components/welcome";
import metronomeImg from "../assets/metronome.png";
import tunerImg from "../assets/tuner.png";
import sheetmusicImg from "../assets/sheet-music.png";
import NavBar from "../components/NavBar";






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
        title: "Saved Audio",
        description: "View your saved audio for each instrument",
        link: "/saved-audio",
        image: sheetmusicImg //change to audio image once one is found
      }
    ]
  
    return (
      <>
      <NavBar/>
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