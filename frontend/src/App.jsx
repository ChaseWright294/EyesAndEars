import './css/App.css'
import Home from './pages/Home'
import Audio from './pages/Audio'
import Instruments from './pages/Instruments'
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar'

function App() {
  return (
    <div>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/audio" element={<Audio />}/>
          <Route path="/instruments" element={<Instruments />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App
