import { useEffect, useState, useRef } from "react";
import '../css/SearchInstruments.css'
import { getUserId } from "../../../backend/auth";
import axios from "axios";
import Popup from "../components/Popup";

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

//fetch instruments from database 
useEffect(() => {
    const fetchInstruments = async() => {
        try{
            const response = await axios.get();
            setInstruments(response.data);
        }
        catch(error){
            console.error("Unable to fetch instruments from database", error);
        }
    };
    fetchInstruments();
}, []);

function SearchBar({ userId }) {
    const [query, setQuery] = useState("");
    const [instruments, setInstruments] = useState([]);
    const [selectedInstruments, setSelectedInstrument] = useState([]);

    const [showSearch, setShowSearch] = useState(false);

    const searchInputRef = useRef(null);

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
    //removes an imstrument from the user's selected list
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
            searchInputRef.current?.focus();
        }, 0);
    };

    const [buttonPopup, setButtonPopup] = useState(false);
    const [clickedInstrument, setClickedInstrument] = useState("");

return(
    <div className="p-4 max-w-lg mx-auto">
        {/*"Add Instrument" icon*/
            <button
                onClick={handleShowSearch}
                aria-label=" Add Instrument" //for screen reader support!
                className="w-32 h-32 flex flex-col items-center justify-center border-2 border-gray-700 rounded-2xl shadow-lg bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500"
                >
                    <span className="text-5xl text-black font-bold">+</span>
                    <span className="text-base text-black font-semibold mt-1"> Add Instrument</span>
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
        
        <div className = "mt-6">
            <div className = "selected-instruments grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
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
                        src = {instrument.http://localhost:5001/api/user-instruments?instrument_id=${instrument.i_id_pk}{instrument.i_name}}
                        alt={instrument.i_name}
                        className = "instrument-image w-full h-32 object-cover rounded-md"
                    />
                    <h3 className="instrument-name text-lg font semibold mt-2">{instrument.name}</h3>
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
