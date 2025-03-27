import { useState } from "react";
import '../css/SearchInstruments.css'

//array of instruments
const instruments = [
    { name: "Piano", image: "piano.png" },
    { name: "Flute", image: "Flute4.png" },
    { name: "Piccolo", image: "Piccolo3.png" },
    { name: "Clarinet", image: "Clarinet.png" },
    { name: "Tuba", image: "/images/tuba.jpg" },
    { name: "Trumpet", image: "/images/trumpet.jpg" },
    { name: "Baritone/Euphonium", image: "/images/baritone.jpg" },
    { name: "Trombone", image: "trombone.png" },
    { name: "French Horn", image: "french-horn3.png" },
    { name: "Saxophone-Alto", image: "/images/alto-sax.jpg" },
    { name: "Saxophone-Tenor", image: "/images/tenor-sax.jpg" },
    { name: "Oboe", image: "/images/oboe.jpg" },
    { name: "Bassoon", image: "/images/bassoon.jpg" },
    { name: "Violin", image: "/images/violin.jpg" },
    { name: "Percussion", image: "/images/percussion.jpg" }
];

function SearchBar() {
    const [query, setQuery] = useState("");

    const [selectedInstruments, setSelectedInstrument] = useState([]);

    const filteredInstruments = instruments.filter((instrument) => instrument.name.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (instrument) => {
        if(!selectedInstruments.some((item) => item.name === instrument.name)) {
            setSelectedInstrument([...selectedInstruments, instrument]);
        }
        setQuery("");
        //alert was removed.
    };
    const handleRemove = (instrument) => {
        setSelectedInstrument(selectedInstruments.filter((item) => item.name !== instrument.name));
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
        <div className="mt-2 bg-white shadow-md rounded-lg">
            {filteredInstruments.length > 0 ? (
                filteredInstruments.map((instrument, index) => (
                    <div 
                    key={index} 
                    onClick={() => handleSelect(instrument)}
                    className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200 text-left"
                    >
                        {instrument.name}  
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
                    <img src = {`/images/${instrument.image}`} alt={instrument.name} className = "instrument-image w-full h-32 object-cover rounded-md" />
                    <h3 className="instrument-name text-lg font semibold mt-2">{instrument.name}</h3>
                    <button onClick= {() => handleRemove(instrument)}className= "remove-btn bg-pink-500 text-white px-2 py-1 rounded mt-2">
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
