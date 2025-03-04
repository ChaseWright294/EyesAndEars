import { useState } from "react";

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
    "Percussion"
];

function SearchBar() {
    const [query, setQuery] = useState("");

    const filteredInstruments = instruments.filter((instrument) => instrument.toLowerCase().includes(query.toLowerCase()));

return(
    <div className="p-4 max-w-lg mx-auto">
        <input
        type="text"
        placeholder="Search for your instrument..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg shadow-md"
        />
        {query && (
        <ul className="mt-2 bg-white shadow-md rounded-lg">
            {filteredInstruments.length > 0 ? (
                filteredInstruments.map((instrument, index) => (
                    <li key={index} className="p-2 border-b last:border-b-0">
                        {instrument}  
                    </li>
                ))
            ) : (
                <li className="p-2 text-gray-500">No instruments found</li>
            )}
            </ul>
        )}
        </div>    
);

}

export default SearchBar;
