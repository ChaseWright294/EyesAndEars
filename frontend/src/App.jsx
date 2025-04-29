import './css/App.css'
import './css/HomeCard.css'
import './css/Navbar.css'
import Home from './pages/Home'
import SavedAudioPage from './pages/SavedAudioPage'
import Instruments from './pages/Instruments'
import Tuner from './pages/Tuner'
import Metronome from './pages/Metronome'
import SheetMusicReader from './pages/SheetMusicReader'
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar'
import Signup from './components/Signup'
import Login from './components/Login'
import UploadSheetMusic from './pages/UploadSheetMusic'
import InstrumentSheetMusic from './pages/InstrumentSheetMusic'

function App() {
  return (
    <div>
      <main className='main-content'>
        <Routes>
          <Route path="/"             element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/Signup" element={<Signup />}/>
          <Route path="/saved-audio"        element={<SavedAudioPage />}/>
          <Route path="/instruments"  element={<Instruments />}/>
          <Route path="/tuner"        element={<Tuner />}/>
          <Route path="/metronome"    element={<Metronome />}/>
          <Route path="/sheetmusic"   element={<SheetMusicReader />}/>
          <Route path="/upload-sheetmusic" element={<UploadSheetMusic />}/>
          <Route path="/dropdown"      element={<InstrumentSheetMusic />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
