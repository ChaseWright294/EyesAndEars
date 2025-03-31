import MusicFileUpload from "../components/MusicFileUpload"
import NavBar from "../components/NavBar"
function SheetMusicReader() {
    return(
        <div>
            <NavBar />
            <p>This is a page for sheet music reader</p>
            <MusicFileUpload />
        </div>
    )
}

export default SheetMusicReader