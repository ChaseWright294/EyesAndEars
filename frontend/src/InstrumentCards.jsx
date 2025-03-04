import { useState } from "react"; 

// Array of instruments
const instruments = [
    "Piano", "Flute", "Piccolo", "Clarinet", "Tuba", "Trumpet", "Baritone/Euphonium",
    "Trombone", "French Horn", "Saxophone-Alto", "Saxophone-Tenor", "Oboe", "Bassoon", "Percussion"
];

function SearchBar() {
    const [query, setQuery] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState(null);

    // Filter instruments based on search query
    const filteredInstruments = instruments.filter((instrument) => 
        instrument.toLowerCase().includes(query.toLowerCase())
    );

    // Function to set selected instrument
    const selectInstrument = (instrument) => {
        setSelectedInstrument(instrument);
    };

    return (
        <div className="p-4 max-w-lg mx-auto text-white">
            {/* Selected Instrument Message */}
            {selectedInstrument && (
                <div className="mb-4 p-2 bg-green-500 text-white font-bold rounded-lg shadow-md">
                    {selectedInstrument} selected
                </div>
            )}

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for your instrument..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-lg shadow-md bg-gray-800 text-white"
            />

            {/* Search Results List */}
            <ul className="mt-2 bg-gray-900 shadow-md rounded-lg p-2">
                {/* If there are filtered instruments, map through and display them */}
                {filteredInstruments.length > 0 ? (
                    filteredInstruments.map((instrument, index) => (
                        <li 
                            key={index} 
                            className="p-2 border-b last:border-b-0 flex justify-between items-center"
                        >
                            {/* Display the instrument name */}
                            <span>{instrument}</span>
                            {/* Button to select an instrument */}
                            <button 
                                onClick={() => selectInstrument(instrument)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </li>
                    ))
                ) : (
                    // If no instruments match the query, display a message
                    <li className="p-2 text-gray-400">No instruments found</li>
                )}
            </ul>
        </div>    
    );
}

export default SearchBar;
