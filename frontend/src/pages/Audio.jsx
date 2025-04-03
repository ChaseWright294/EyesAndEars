import NavBar from "../components/NavBar";
import AudioRecorder from '../components/AudioRecorder';


function Audio() {
    return(
        <div>
            <AudioRecorder />
            <NavBar />
            <h3>Welcome to the Audio page</h3>
        </div>
    )
}

export default Audio