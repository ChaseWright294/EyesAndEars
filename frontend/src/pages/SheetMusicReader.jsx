import React, { useState, useEffect, Link } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import NavBar from "../components/NavBar";
import {useLocation} from "react-router-dom";
import AudioRecorder from "../components/AudioRecorder";
import Accordion from "../components/Accordion";

function SheetMusicReader() {
  const location = useLocation();
  const musicpath = location.state?.musicpath; //accessing the state from the location object 
  console.log("Music path received:", musicpath);
  const [musicContent, setMusicContent] = useState(null);

  //const [file,setFile] = useState(musicpath); //string loaded from file retrieved from MusicFileUpload

  useEffect(() => {
    const fetchMusicFile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/${musicpath}`);
        const text = await response.text();
        setMusicContent(text);
        console.log("fetched instruments: ", response);
      } catch (error) {
        console.error("Error loading music file:", error);
      }
    };

    if (musicpath) fetchMusicFile();
  }, [musicpath]);

  return(
    <div>
      <NavBar />
      <AudioRecorder />
      {musicContent ? (
        <SheetMusicRenderer musicString={musicContent}/>
      ) : (
        <p>Loading sheet music...</p>
      )}
    </div>
  );
}

export default SheetMusicReader;