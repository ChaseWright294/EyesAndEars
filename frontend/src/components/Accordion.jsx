import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Accordion.css';
import { Link } from "react-router-dom";

function Accordion (props){
  const [isActive, setIsActive] = useState(false);
  //const [musicpath, setMusicPath] = useState("");
    
  const [selectedMusic, setSelectedMusic] = useState([]);
  //const instrument_Id = props.children.i_id_fk;           ?param=${instrument_Id}
  const instrument = props.instrument;
    
    useEffect(() => {
        const fetchUserMusic = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5001/api/instrumentMusic/${instrument.i_id_pk}`, {headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedMusic(response.data);             
                console.log("Fetched User music: ", response.data);
            } catch(error){
                console.error("Error fetching user music: ", error);
            }
        };
        if (isActive) fetchUserMusic();
        
    }, [isActive, instrument.i_id_pk]); 

    const musicForInstrument = selectedMusic.filter(
        (music) => music.i_id_fk = instrument.i_id_pk
    );

    
  return (
    
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{instrument.i_name}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className="accordion.content">
            {selectedMusic.map((music, index) => {
                console.log("file path for music:", music);
                
                return(
                <div className='music-card' key={index}>
                    <Link
                        to="/sheetmusic"
                        state={{ musicpath : music.m_filepath}}
                    >
                        {music.m_title}
                    </Link>
                </div>
                );
})}
            
        </div>

      )}
      {/*isActive && <div className="accordion-content">
        {musicForInstrument.length > 0 ? (musicForInstrument.map((music, index) => (
        <div className="music-card" key={index}>
            <Link 
                to = "/sheetmusic" 
                state= {{ musicPath: music.m_filepath}}
                className='music-link'
            > 
                {music.m_title}
            </Link>
        </div>
        ))
    ) : (
            <p>No music for this instrument</p>
    )}
        </div>*/}
    </div>
  );
  
};


export default Accordion;


/*const [selectedMusic, setSelectedMusic] = useState([]);
    
    useEffect(() => {
        const fetchUserMusic = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5001/api/backend/uploads", {headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedMusic(response.data);             
                console.log("Fetched User music: ", response.data);
            } catch(error){
                console.error("Error fetching user music: ", error);
            }
        };
        fetchUserMusic();
        
    }, []); */