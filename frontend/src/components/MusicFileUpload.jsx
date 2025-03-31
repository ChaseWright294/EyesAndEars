import React, { useState } from "react";

const MusicFileUpload = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    // setFile(file); //passes the file to SheetMusicReader

    if (file && file.name.endsWith(".musicxml")) {
      const reader = new FileReader();

      //convert the file to a string
      reader.onload = (e) => {
        setFile(e.target.result);
      }

      reader.readAsText(file);
      }
      else
      {
        alert("File needs to be in .musicxml format. Try again with a .musicxml file.");
      }
  };

  // const handleFileUpload = (event) => {
  //   // if (selectedFile) {
  //   //   // Handle the file upload logic here
  //   //   console.log("Uploading file:", selectedFile.name);
  //   // } else {
  //   //   console.log("No file selected");
  //   // }
  //   const file = event.target.files[0];

  //   //make sure file is in .musicxml format
  //   if(file && file.name.endsWith(".musicxml")) {
  //     const reader = new FileReader();
    
  //     //convert the file to a string
  //     reader.onload = (e) => {
  //       setFile(e.target.result);
  //     }

  //     reader.readAsText(file);
  //   }
  //   else
  //   {
  //     alert("File needs to be in .musicxml format. Try again with a .musicxml file.");
  //   }
  // };

  return (
    <div>
      <input type="file" accept=".musicxml" onChange={handleFileChange} />
      {/* <button onClick={handleFileUpload}>Upload</button> */}
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default MusicFileUpload;