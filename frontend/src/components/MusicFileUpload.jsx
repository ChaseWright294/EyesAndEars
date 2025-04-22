import React, { useState } from "react";
import axios from "axios";

const MusicFileUpload = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

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
        return;
      }
      setSelectedFile(file);

  const formData = new FormData();
  formData.append("file", file);

  try{  
    const token = localStorage.getItem("token");
    const res = await axios.post('http://localhost:5001/api/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    });

    setUploadStatus("Upload successful");
    setFile(res.data.file_path);
  } catch(err){
    console.error("Upload failed: ", err);
    setUploadStatus("Upload failed");
  }
};


  return (
    <div>
      <input type="file" accept=".musicxml" onChange={handleFileChange} />
      {/* <button onClick={handleFileUpload}>Upload</button> */}
      {/* ^ button didn't serve a purpose at the time so I removed
            it. Feel free to put it back if you want it there! -Chase */}
      {/* {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      {uploadStatus && <p>{uploadStatus}</p>} */}
    </div>
  );
};

export default MusicFileUpload;

//! old code that may be needed if functionality of this file is changed

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
