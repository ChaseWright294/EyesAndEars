import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "../components/Accordion";
import NavBar from "../components/NavBar";

function InstrumentSheetMusic() {
    const [selectedInstruments, setSelectedInstrument] = useState([]);
    
    useEffect(() => {
        const fetchUserInstruments = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5001/api/user-instruments", {headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedInstrument(response.data);             
                console.log("Fetched User instruments: ", response.data);
            } catch(error){
                console.error("Error fetching user instruments: ", error);
            }
        };
        fetchUserInstruments();
        
    }, []);  

    return (
    <div className="instrument-sheet-music">
        <NavBar></NavBar>
    <div className="accordion">
        {selectedInstruments.map((instrument, index) => (
            <div key = {index} className="accordion">
            <Accordion>{instrument}</Accordion>
            </div>
            
            ))}
    </div>
    </div>
  );
}

export default InstrumentSheetMusic;
