import React, { useState } from "react";

const AudioRecorder = ({ onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState(null);

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const url = URL.createObjectURL(audioBlob);
          setRecordedAudio(url);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setAudioChunks(chunks);
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or unavailable:", err);
        alert("Microphone access is required to record audio.");
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSaveAudio = () => {
    if (recordedAudio) {
      const newAudio = {
        name: `Audio ${Date.now()}`, // Generate a unique name
        url: recordedAudio, // URL of the recorded audio
      };
      onSave(newAudio); // Pass the new audio file to the parent component
      setRecordedAudio(null); // Reset recorded audio
    } else {
      alert("No audio recorded to save.");
    }
  };

  return (
    <div>
      <button onClick={handleRecord}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={handleSaveAudio} disabled={!recordedAudio}>
        Save Audio
      </button>
    </div>
  );
};

export default AudioRecorder;
