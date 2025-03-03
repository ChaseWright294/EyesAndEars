import { useState } from "react";

export default function SearchableList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const instruments = ["Guitar", "Piano", "Violin", "Drums", "Flute", "Trumpet", "Saxophone"];

  const filteredInstruments = instruments.filter(instrument =>
    instrument.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search instruments..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      />
      <ul className="list-disc pl-5">
        {filteredInstruments.length > 0 ? (
          filteredInstruments.map((instrument, index) => (
            <li key={index} className="flex justify-between items-center">
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
          <li className="text-gray-500">No instruments found</li>
        )}
      </ul>
      <h2 className="mt-4 font-bold">Selected Instruments:</h2>
      <ul className="list-disc pl-5">
        {selectedInstruments.map((instrument, index) => (
          <li key={index} className="flex justify-between items-center">
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
