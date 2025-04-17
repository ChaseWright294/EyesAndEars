import Dropdown from "../components/dropdown";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
        <div className = "selected-instruments">
            {selectedInstruments.map((instrument, index) => (
                <div key = {index} className="instrument-card">
                    <Dropdown>{instrument}</Dropdown>
                </div>
            ))}
            </div>
    </div>
  );
}

export default InstrumentSheetMusic;