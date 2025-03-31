import React, { useState } from "react";

const MusicFileUpload = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFile(file); //passes the file to SheetMusicReader
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Handle the file upload logic here
      console.log("Uploading file:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default MusicFileUpload;