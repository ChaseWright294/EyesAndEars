import { useState } from "react";
import '../css/SearchInstruments.css'

//array of instruments
const instruments = [
    { name: "Piano", image: "/images/piano.jpg" },
    { name: "Flute", image: "/images/flute.jpg" },
    { name: "Piccolo", image: "/images/piccolo.jpg" },
    { name: "Clarinet", image: "/images/clarinet.jpg" },
    { name: "Tuba", image: "/images/tuba.jpg" },
    { name: "Trumpet", image: "/images/trumpet.jpg" },
    { name: "Baritone/Exphonium", image: "/images/baritone.jpg" },
    { name: "Trombone", image: "/images/trombone.jpg" },
    { name: "French Horn", image: "/images/french-horn.jpg" },
    { name: "Saxophone-Alto", image: "/images/alto-sax.jpg" },
    { name: "Saxophone-Tenor", image: "/images/tenor-sax.jpg" },
    { name: "Oboe", image: "/images/oboe.jpg" },
    { name: "Bassoon", image: "/images/bassoon.jpg" },
    { name: "Violin", image: "/images/violin.jpg" },
    { name: "Percussion", image: "/images/percussion.jpg" }
];

function SearchBar() {
    const [query, setQuery] = useState("");

    const [selectedInstruments, setSelectedInstrument] = useState(null);

    const filteredInstruments = instruments.filter((instrument) => instrument.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (instrument) => {
        if(!selectedInstruments.includes(instrument)){
            setSelectedInstrument([...selectedInstruments, instrument]);
        }
        setQuery("");
        //alert was removed.
    };
    const handleRemove = (instrument) => {
        setSelectedInstrument(selectedInstruments.filter(item => item !== instrument));
    };

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
                    <li key={index} onClick={() => handleSelect(instrument)}
                    className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200"
                    >
                        {instrument.name}  
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
                    <img src = {instrument.image} alt={instrument.name}className = "instrument-image" />
                    <h3 className="instrument-name">{instrument.name}</h3>
                    <button onClick= {() => handleRemove(instrument)}className= "remove-btn">
                        Remove
                    </button>
                </div>
            ))}
        </div>
    </div>
    </div>
);
}

export default SearchBar;
