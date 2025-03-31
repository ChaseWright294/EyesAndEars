import React, { useState } from "react";
import MusicFileUpload from "../components/MusicFileUpload";

function SheetMusicReader() {
  const [file,setFile] = useState(null);  

  return(
    <div>
      <h1>Sheet Music Reader</h1>
      <MusicFileUpload setFile={setFile}/>
      {file ? <p>Displaying: {file.name}</p> : <p>No file uploaded</p>}
    </div>
  );
}

export default SheetMusicReader;