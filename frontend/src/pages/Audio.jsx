import React, { useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import SavedAudioGrid from "../components/SavedAudioGrid";

const Audio = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  const handleAudioSave = (newAudio) => {
    setAudioFiles((prevFiles) => [...prevFiles, newAudio]);
  };

  return (
    <div>
      <h3>Welcome to the Audio Page</h3>
      <AudioRecorder onSave={handleAudioSave} />
      <SavedAudioGrid audioFiles={audioFiles} />
    </div>
  );
};

export default Audio;