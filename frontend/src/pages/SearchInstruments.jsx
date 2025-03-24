import { useState } from "react";
import '../css/SearchInstruments.css'

//array of instruments
const instruments = [
    "Piano",
    "Flute",
    "Piccolo",
    "Clarinet",
    "Tuba",
    "Trumpet",
    "Baritone/Euphonium",
    "Trombone",
    "French Horn",
    "Saxophone-Alto",
    "Saxophone-Tenor",
    "Oboe",
    "Bassoon",
    "Violin",
    "Percussion"
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
        //alert('Selected: ${instrument}');
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
                        {instrument}  
                    </li>
                ))
            ) : (
                <li className="p-2 text-grey-500">No instruments found</li>
            )}
            </ul>
        )}

        <div className = "mt-4">
            {selectedInstruments.map((instrument, index) => (
                <div key={index} className="p-4 mb-2 bg-blue-100 border rounded-lg shadow-md">
                    <h3 className="font-bold text-lg">{instrument}</h3>
                    <p className="text-sm text-gray-600">Sheet music available for {instrument}</p>
                    <button onClick={() => handleRemove(instrument)}
                        className="mt-2 p-1 bg-red-500 text-white rounded hover:bg-red-700">
                            Remove
                        </button>
                    </div>
            ))}
            </div>
            </div>
);
}

export default SearchBar;
