import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";
import SheetMusicRenderer from "../components/SheetMusicRenderer";

function SheetMusicReader() {
  const [file,setFile] = useState(null); //string loaded from file retrieved from MusicFileUpload

  return(
    <div>
      <h1>Sheet Music Reader</h1>
      <MusicFileUpload setFile={setFile} />
      <pre>{file ? "" : "No file loaded"}</pre> {/* display blank if file is loaded to give music room*/}
      <SheetMusicRenderer musicString={file} />
    </div>
  );
}

export default SheetMusicReader;