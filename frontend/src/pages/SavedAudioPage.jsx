import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import "../css/SavedAudioPage.css";


const SavedAudioPage = () => {
  const [userInstruments, setUserInstruments] = useState([]);

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

  return (
    <>
  <NavBar />
  <div className="audio-wrapper">
    <div className="saved-audio-page">
      {userInstruments.length === 0 ? (
        <p className="empty-instruments-message">You haven't added any instruments yet.</p>
      ) : (
        <div className="instrument-container-grid">
          {userInstruments.map((instrument, index) => (
            <div key={index} className="instrument-card">
              <img
                src={instrument.i_image}
                alt={instrument.i_name}
                className="instrument-card-image"
              />
              <div className="instrument-card-label">{instrument.i_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</>

  );
};

export default SavedAudioPage;
