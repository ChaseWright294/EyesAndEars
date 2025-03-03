import { useState } from "react";

const instruments = [
    "Piano", "Flute", "Piccolo", "Clarinet", "Tuba", "Trumpet", "Baritone/Euphonium",
    "Trombone", "French Horn", "Saxophone-Alto", "Saxophone-Tenor", "Oboe", "Bassoon", "Percussion"
];

function SearchBar() {
    const [query, setQuery] = useState("");
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    const filteredInstruments = instruments.filter((instrument) => 
        instrument.toLowerCase().includes(query.toLowerCase())
    );

    const addInstrument = (instrument) => {
        if (!selectedInstruments.includes(instrument)) {
            setSelectedInstruments([...selectedInstruments, instrument]);
        }
    };

    const removeInstrument = (instrument) => {
        setSelectedInstruments(selectedInstruments.filter(item => item !== instrument));
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <input
                type="text"
                placeholder="Search for your instrument..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border rounded-lg shadow-md"
            />
            <ul className="mt-2 bg-white shadow-md rounded-lg">
                {filteredInstruments.length > 0 ? (
                    filteredInstruments.map((instrument, index) => (
                        <li key={index} className="p-2 border-b last:border-b-0 flex justify-between items-center">
                            {instrument}
                            <button 
                                onClick={() => addInstrument(instrument)}
                                className="ml-2 p-1 bg-blue-500 text-white rounded-md"
                            >
                                Add
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="p-2 text-gray-500">No instruments found</li>
                )}
            </ul>
            <h2 className="mt-4 font-bold">Selected Instruments:</h2>
            <ul className="mt-2 bg-white shadow-md rounded-lg">
                {selectedInstruments.map((instrument, index) => (
                    <li key={index} className="p-2 border-b last:border-b-0 flex justify-between items-center">
                        {instrument}
                        <button 
                            onClick={() => removeInstrument(instrument)}
                            className="ml-2 p-1 bg-red-500 text-white rounded-md"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;

