import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SavedAudioPopup from '../components/SavedAudioPopup';
import "../css/SavedAudioPage.css";
import '../css/SavedAudioPopup.css';

const SavedAudioPage = () => {
  const [userInstruments, setUserInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const fetchUserInstruments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/user-instruments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInstruments(response.data);
      } catch (error) {
        console.error("Failed to fetch user instruments:", error);
      }
    };

    fetchUserInstruments();
  }, []);

  const handleCardClick = async (instrument) => {
    setSelectedInstrument(instrument);
    setShowPopup(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5001/api/audio?instrument_id=${instrument.i_id_pk}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const audioList = response.data.map(file => ({
        name: file.a_title,
        url: `http://localhost:5001/${file.a_filepath.replace(/\\/g, '/')}`
      }));
      setAudioFiles(audioList);
    } catch (error) {
      console.error("Failed to fetch audio files:", error);
      setAudioFiles([]); // Optional fallback
    }
  };

  return (
    <>
      <NavBar />
      <div className="audio-wrapper">
        <div className="saved-audio-page">
          {userInstruments.length === 0 ? (
            <p className="empty-instruments-message">You haven't added any instruments yet.</p>
          ) : (
            <div className="audio-instrument-container-grid">
              {userInstruments.map((instrument, index) => (
                <div key={index} className="audio-instrument-card" onClick={() => handleCardClick(instrument)}>
                  <img
                    src={instrument.i_image}
                    alt={instrument.i_name}
                    className="audio-instrument-card-image"
                  />
                  <div className="audio-instrument-card-label">{instrument.i_name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <SavedAudioPopup
          files={audioFiles}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default SavedAudioPage;
