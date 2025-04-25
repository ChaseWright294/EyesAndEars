import React from "react";
import "../css/SavedAudioPopup.css";

const SavedAudioPopup = ({ files, onClose }) => {
  return (
   
      <div className="audio-popup">
        <button className="audio-close-button" onClick={onClose}>×</button>
        <h2>Saved Recordings</h2>

        {files.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
            No recordings found for this instrument.
          </p>
        ) : (
          <ul className="audio-list">
            {files.map((file, index) => (
              <li key={index}>
                <p>{file.name}</p>
                <audio controls>
                  <source src={file.url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </li>
            ))}
          </ul>
        )}
      </div>
   
  );
};

export default SavedAudioPopup;
