import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Accordion.css';
import { Link } from "react-router-dom";

function Accordion (props){
  const [isActive, setIsActive] = useState(false);
  const [musicpath, setMusicPath] = useState("");
    
  const [selectedMusic, setSelectedMusic] = useState([]);
  //const instrument_Id = props.children.i_id_fk;           ?param=${instrument_Id}
    
    useEffect(() => {
        const fetchUserMusic = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5001/api/upload`, {headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedMusic(response.data);             
                console.log("Fetched User music: ", response.data);
            } catch(error){
                console.error("Error fetching user music: ", error);
            }
        };
        fetchUserMusic();
        
    }, []); 

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{props.children.i_name}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accordion-content">
        {selectedMusic.map((music, index) => (
        <div className="music-card" key={index}>
            {setMusicPath(music.m_path)}
            <Link to ={{pathname: "/sheetmusic", state: {musicpath} }}>
                {music.m_title}
            </Link>
        </div>
        ))}
        </div>}
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