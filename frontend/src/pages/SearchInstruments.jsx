import { useEffect, useState, useRef } from "react";
import '../css/SearchInstruments.css'
import { getUserId } from "../../../backend/auth";
import axios from "axios";

const userId = getUserId();
import Popup from "../components/Popup";

//array of instruments
const instruments = [
    { name: "Piano", image: "piano.png" },
    { name: "Flute", image: "Flute4.png" },
    { name: "Piccolo", image: "Piccolo3.png" },
    { name: "Clarinet", image: "Clarinet.png" },
    { name: "Tuba", image: "tuba3.png" },
    { name: "Trumpet", image: "trumpet4.png" },
    { name: "Baritone/Euphonium", image: "baritone.png" },
    { name: "Trombone", image: "trombone.png" },
    { name: "French Horn", image: "french-horn3.png" },
    { name: "Saxophone-Alto", image: "alto-sax.png" },
    { name: "Saxophone-Tenor", image: "tenor-sax.png" },
    { name: "Oboe", image: "oboe.png" },
    { name: "Bassoon", image: "bassoon.png" },
    { name: "Violin", image: "violin.png" },
    { name: "Percussion", image: "percussion.png" }
];

function SearchBar({ userId }) {
    const [query, setQuery] = useState("");
    const [instruments, setInstruments] = useState([]);
    const [selectedInstruments, setSelectedInstrument] = useState([]);

    const [showSearch, setShowSearch] = useState(false);

    const searchInputRef = useRef(null);

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
        setShowSearch(false); //removes search bar after addition
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

    const handleShowSearch = () => {
        setShowSearch(true);
        setTimeout(() => {
            //searchInputRef.current?.focus();
        }, 0);
    };

    const [buttonPopup, setButtonPopup] = useState(false);
    const [clickedInstrument, setClickedInstrument] = useState("");

return(
    <div className="p-4 max-w-lg mx-auto">
        {/*"Add Instrument" icon*/
            <button
                onClick={handleShowSearch}
                className="w-24 h-24 flex-col items-center justify-center border-gray-400 rounded-lg shadow-md hover:bg-gray-200"
                >
                    <span className="text-4xl">+</span>
                    <span className="text-sm">Add Instrument</span>
                </button>
        }
        
        {showSearch && (
        <input
            //ref={searchInputRef}
            type="text"
            placeholder="Search for your instrument"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-md"
        />
        )}
        
        {query && (
        <div className="mt-2 bg-white shadow-md rounded-lg">
            {filteredInstruments.length > 0 ? (
                filteredInstruments.map((instrument, index) => (
                    <div 
                    key={index} 
                    onClick={() => handleSelect(instrument)}
                    className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200 text-left"
                    >
                        {instrument.i_name}  
                    </div>
                ))
            ) : (
                <div className="p-2 text-grey-500">No instruments found</div>
            )}
            </div>
        )}
        
        <div className = "mt-4">
            <div className = "selected-instruments grid grid-cols-2 gap-4">
            {selectedInstruments.map((instrument, index) => (
                <div key = {index} className="instrument-card p-2 border rounded-lg shadow-md text-center">

                    <img
                        src = {`/images/${instrument.image}`}
                        alt={instrument.name}
                        className = "instrument-image w-full h-32 object-cover rounded-md"
                    />
                    <button onClick={() => {
                        setButtonPopup(true);
                        setClickedInstrument(instrument.name);
                        }}>
                        {instrument.name}
                    </button>
                    <button onClick= {() => handleRemove(instrument)}
                    className= "remove-btn bg-pink-500 text-white px-2 py-1 rounded mt-2">
                        Remove
                    </button>
                </div>
            ))}
            </div>
    </div>
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            {clickedInstrument}
        </Popup>
    </div>
);
}

export default SearchBar;
