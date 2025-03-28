import './css/App.css'
import './css/HomeCard.css'
import './css/Navbar.css'
import Home from './pages/Home'
import Audio from './pages/Audio'
import Instruments from './pages/Instruments'
import Tuner from './pages/Tuner'
import Metronome from './pages/Metronome'
import SheetMusicReader from './pages/SheetMusicReader'
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar'
import Signup from './components/Signup'
import Login from './components/Login'
//import OtpVerification from './components/Otpverification'

function App() {
  return (
    <div>
      <main className='main-content'>
        <Routes>
          <Route path="/"             element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/audio"        element={<Audio />}/>
          <Route path="/instruments"  element={<Instruments />}/>
          <Route path="/tuner"        element={<Tuner />}/>
          <Route path="/metronome"    element={<Metronome />}/>
          <Route path="/sheetmusic"   element={<SheetMusicReader />}/>
          {/* <Route path="OtpVerification" element={<OtpVerification />}/> */}
        </Routes>
      </main>
    </div>
  );
}

export default App
