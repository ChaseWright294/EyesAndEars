import React, { useState } from 'react';
import axios from 'axios';
const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];
        
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const name = prompt('Enter a name for your recording: ', 'my-recording')

          const formData = new FormData();
          formData.append('audio', audioBlob, `${name}.webm`);
          formData.append('name', name);
          
          try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:5001/api/audio', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
              }
            });
            alert('Upload Successful!');
          } catch (error) {
            console.error('Upload failed: ', error);
          }
          //const url = URL.createObjectURL(audioBlob);
          //downloadAudio(url);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setAudioChunks(chunks);
        setIsRecording(true);
      } catch (err) {
        console.error('Microphone access denied or unavailable:', err);
        alert('Microphone access is required to record audio.');
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  /*const downloadAudio = (url) => {
    const name = prompt('Enter a name for your recording:', 'my-recording');
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${name || 'recording'}.webm`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);

    
  };*/

  return (
    <div>
      <button onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default AudioRecorder;
