import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";
import NavBar from "../components/NavBar";

function SheetMusicReader() {
  const [file,setFile] = useState(null); //string loaded from file retrieved from MusicFileUpload

  return(
    <div>
      <NavBar />
      {(file) ? "" : <h1>Sheet Music Reader</h1>} {/*removes the 'Sheet Music Reader, if there is a file being rendered*/}
      <MusicFileUpload setFile={setFile} />
      <pre>{file ? "" : "No file loaded"}</pre> {/* display blank if file is loaded to give music room*/}
      <SheetMusicRenderer musicString={file} />
    </div>
  );
}

export default SheetMusicReader;