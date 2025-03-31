import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";

function SheetMusicReader() {
  const [file,setFile] = useState(null);  

  return(
    <div>
      <h1>Sheet Music Reader</h1>
      <MusicFileUpload setFile={setFile}/>
      <pre>{file ? file.substring(0, 500) + "..." : "No file loaded"}</pre>
    </div>
  );
}

export default SheetMusicReader;