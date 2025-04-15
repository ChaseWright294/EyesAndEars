import React, { useState } from "react";

const MusicFileUpload = ({ setFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
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
      }
  };

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

  const uploadFile = document.querySelector('.upload')
  if(uploadFile){
    uploadFile.addEventListener('submit', function(e) {
      e.preventDefault()
      let file = e.target.uploadFile.files[0]

      let formData = new FormData()
      formData.append('file',file)
    })
  }

  return (
    <form className="upload">
      <input type="file" name="uploadFile" accept=".musicxml" onChange={handleFileChange} required/>
      <br/>
      <input type="submit" />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </form>
  );
};

export default MusicFileUpload;