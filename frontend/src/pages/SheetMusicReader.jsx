import React, { useEffect, useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import NavBar from "../components/NavBar";
import {useParams} from "react-router-dom";
import axios from "axios";

function SheetMusicReader() {
  let musicID = useParams();
  console.log("musicID: ", musicID);
  //let musicpath = ; //accessing the filepath from the music object
  /*
  useEffect(() => {
    axios.get(`http://localhost:5001/api/upload/${musicID}`).then(response => {
      console.log(response.data)
  }).catch((error) => {
    console.error("Error fetching music file: ", error)
  })
}, []);*/

  const [file,setFile] = useState(musicID); //string loaded from file retrieved from MusicFileUpload
  console.log("File: ", file);
  return(
    <div>
      <NavBar />
      {(file) ? "" : <h1>Sheet Music Reader</h1>} {/*removes the 'Sheet Music Reader' if there is a file being rendered*/}
      {/*<MusicFileUpload setFile={props.m_filepath} />*/}
       
      {/*display renderer if there is a file, and test if there isn't*/}
      <pre>{file ? <SheetMusicRenderer musicString={file} /> : "No file loaded"}</pre>
    </div>
  );
}

export default SheetMusicReader;