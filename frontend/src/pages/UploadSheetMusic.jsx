import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import { Link, useLocation } from "react-router-dom";

function UploadSheetMusic() {
  const [file,setFile] = useState(null); //string loaded from file retrieved from MusicFileUpload

  const location = useLocation();
  const instrument = location.state?.instrument;
  console.log("Music file received instrument:", instrument);
  return(
    <div>
      <div className="back-bttn">
          <Link to ="/Instruments" className="back-item">
              <h3>←</h3>
          </Link>
      </div>
      {(file) ? "" : <h1>Sheet Music Reader</h1>} {/*removes the 'Sheet Music Reader' if there is a file being rendered*/}
      <MusicFileUpload setFile={setFile} instrument={instrument}/>
      <pre>{file ? "" : "No file loaded"}</pre> {/* display blank if file is loaded to give music room*/}
       </div>
  );
}

export default UploadSheetMusic;