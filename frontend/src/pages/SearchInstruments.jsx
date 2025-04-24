import { useEffect, useState } from "react";
import '../css/SearchInstruments.css'
import { getUserId } from "../../../backend/auth";
import axios from "axios";
import Popup from "../components/Popup";

const userId = getUserId();

function SearchBar({ userId }) {
    const [query, setQuery] = useState("");
    const [instruments, setInstruments] = useState([]);
    const [selectedInstruments, setSelectedInstrument] = useState([]);

    //fetch all instruments from the backend
    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/instruments');
                console.log("Fetched Instruments: ", response.data);
                setInstruments(response.data);
            } catch (error) {
                console.error("Error fetching instruments: ", error);
            }
        };
        fetchInstruments();
    }, []);

    //fetch user's selected instruments
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

    const filteredInstruments = instruments.filter((instrument) => instrument.i_name.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = async (instrument) => {
        if(!selectedInstruments.some((item) => item.id === instrument.i_id_pk)) {
            try {
                const token = localStorage.getItem("token");
                await axios.post("http://localhost:5001/api/user-instruments", {
                    instrument_id: instrument.i_id_pk
                }, {
                    headers: { Authorization: `Bearer ${token}`}
                });
                setSelectedInstrument([...selectedInstruments, instrument]);
            } catch (error) {
                console.error("Error adding instrument: ", error);
            }
        }
        //fetchUserInstruments();
        setQuery("");
    };
    const handleRemove = async (instrument) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Instrument to remove: ", instrument);
            await axios.delete(`http://localhost:5001/api/user-instruments?instrument_id=${instrument.i_id_pk}`, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setSelectedInstrument(selectedInstruments.filter((item) => item.id !== instrument.i_id_pk));
        } catch (error) {
            console.error("Error removing instrument: ", error);
        }        
    };

    const [buttonPopup, setButtonPopup] = useState(false);
    const [clickedInstrument, setClickedInstrument] = useState("");

return(
    <div className="p-4 max-w-lg mx-auto">
        
        <input
            type="text"
            placeholder="Search for your instrument"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-md"
        />
        {query && (
        <ul className="mt-2 bg-white shadow-md rounded-lg">
            {filteredInstruments.length > 0 ? (
                filteredInstruments.map((instrument, index) => (
                    <li 
                    key={index} 
                    onClick={() => handleSelect(instrument)}
                    className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200"
                    >
                        {instrument.i_name}  
                    </li>
                ))
            ) : (
                <li className="p-2 text-grey-500">No instruments found</li>
            )}
            </ul>
        )}
        
        <div className = "mt-4">
            <h2 className = "text-xl font-bold mb-2">Selected Instruments:</h2>
            <div className = "selected-instruments">
            {selectedInstruments.map((instrument, index) => (
                <div key = {index} className="instrument-card">
                    { <img src = {instrument.i_image} alt={instrument.i_name}className = "instrument-image" /> }
                    <button onClick={() => {
                        setButtonPopup(true);
                        setClickedInstrument(instrument);
                        }}>
                        {instrument.i_name}
                    </button>
                    <button onClick= {() => handleRemove(instrument)}className= "remove-btn">
                        Remove
                    </button>
                </div>
            ))}
            </div>
    </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} instrument={clickedInstrument.i_id_pk}>
            {clickedInstrument.i_name}
        </Popup>
    </div>
);
}

export default SearchBar;
