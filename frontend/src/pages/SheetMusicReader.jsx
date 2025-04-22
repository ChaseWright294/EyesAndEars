import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import NavBar from "../components/NavBar";
import {useLocation} from "react-router-dom";
import AudioRecorder from "../components/AudioRecorder";

function SheetMusicReader() {
  const location = useLocation();
  const { musicpath } = location.state; //accessing the state from the location object 

  const [file,setFile] = useState(musicpath); //string loaded from file retrieved from MusicFileUpload

  return(
    <div>
      <NavBar />
      <AudioRecorder />
      {(file) ? "" : <h1>Sheet Music Reader</h1>} {/*removes the 'Sheet Music Reader' if there is a file being rendered*/}
      {/*<MusicFileUpload setFile={props.m_filepath} />*/}
       
      {/*display renderer if there is a file, and test if there isn't*/}
      <pre>{file ? <SheetMusicRenderer musicString={file} /> : "No file loaded"}</pre>
    </div>
  );
}

export default SheetMusicReader;