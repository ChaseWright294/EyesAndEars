import { useEffect, useState, useRef } from "react";
import '../css/SearchInstruments.css'
import { getUserId } from "../../../backend/auth";
import axios from "axios";
import Popup from "../components/Popup";
//const userId = getUserId();

/*const instrumentItems = [
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
];*/


function SearchBar({ userId }) {
    const [query, setQuery] = useState("");
    const [instruments, setInstruments] = useState([]);
    const [selectedInstruments, setSelectedInstrument] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [clickedInstrument, setClickedInstrument] = useState("");

    const searchInputRef = useRef(null);

    //fetch instruments from database 
useEffect(() => {
    const fetchInstruments = async() => {
        try{
            const res = await axios.get("http://localhost:5001/api/user-instruments");
            setInstruments(res.data);
        }
        catch(err){
            console.error("Unable to fetch instruments from database", err);
        }
    };
    
    const fetchUserInstruments = async () => {
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5001/api/user-instruments", {
                headers: {Authorization: `Bearer ${token}`}
            });
            setSelectedInstrument(res.data);
        }
        catch(err){
            console.error("Failed to fetch the instrument: ", err);
        }
        };
    fetchInstruments();
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
                //fetchUserInstruments();
                setQuery("");
                setShowSearch(false); //removes search bar after addition
            } catch (error) {
                console.error("Error adding instrument: ", error);
            }
        }
        
    };

    //removes an imstrument from the user's selected list
    const handleRemove = async (instrument) => {
        try {
            const token = localStorage.getItem("token");
            //console.log("Instrument to remove: ", instrument);
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
            searchInputRef.current?.focus();
        }, 0);
    };



return(
    <div className="p-4 max-w-lg mx-auto">
        
            <button
                onClick={handleShowSearch}
                aria-label=" Add Instrument" //for screen reader support!
                className="w-32 h-32 flex flex-col items-center justify-center border-2 border-gray-700 rounded-2xl shadow-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
                    <span className="text-5xl text-black font-bold">+</span>
                    <span className="text-base text-black font-semibold mt-1"> Add Instrument</span>
                </button>    
        
        
        {showSearch && (
        <input
            ref={searchInputRef} //comment this out?
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

        <div className = "mt-6">
            <div className = "selected-instruments grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 overflow-y-auto max-h-96 p-2">
            {selectedInstruments.map((instrument, index) => (
                <div key = {index} className="relative instrument-card p-2 border rounded-lg shadow-md text-center bg-white">
                    <button
                        onClick={() => handleRemove(instrument)}
                        className = "absolute top-0 right-0 big-red-600 text-white rounded-bl-lg px-2 py-1 hover:bg-red-700"
                        aria-label = {`Remove ${instrument.name}`}
                    >
                        x
                    </button>

                    <img
                        src = {imstrument.i_image} //for database
                        alt={instrument.i_name}
                        className = "instrument-image w-full h-32 object-cover rounded-md"
                    />
                    <h3 className="instrument-name text-lg font semibold mt-2">{instrument.name}</h3>
                    <button
                        onClick= {() => handleRemove(instrument)}
                        className= "remove-btn bg-pink-500 text-white px-2 py-1 rounded mt-2"
                    >
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
