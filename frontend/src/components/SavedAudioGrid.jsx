import React from "react";
import "../css/savedaudiogrid.css";

const SavedAudioGrid = ({ audioFiles }) => {
  return (
    <div className="audio-grid-container">
      {audioFiles.map((audio, index) => (
        <div key={index} className="audio-grid-item">
          <button
            className="play-button"
            onClick={() => {
              const audioElement = new Audio(audio.url);
              audioElement.play();
            }}
          >
            ▶
          </button>
          <p className="audio-name">{audio.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedAudioGrid;