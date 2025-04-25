import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import NavBar from "../components/NavBar";
import AudioRecorder from "../components/AudioRecorder";

function SheetMusicReader() {
  const [file,setFile] = useState(null); //string loaded from file retrieved from MusicFileUpload

  return(
    <div>
      <NavBar />
      <AudioRecorder />
      {(file) ? "" : <h1>Sheet Music Reader</h1>} {/*removes the 'Sheet Music Reader' if there is a file being rendered*/}
      <MusicFileUpload setFile={setFile} />
       
      {/*display renderer if there is a file, and test if there isn't*/}
      <pre>{file ? <SheetMusicRenderer musicString={file} /> : "No file loaded"}</pre>
    </div>
  );
}

export default SheetMusicReader;