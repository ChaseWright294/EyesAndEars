import NavBar from "../components/NavBar";
import React, { useState, useEffect, useRef } from "react";
import '../css/Metronome.css'


const Metronome = () => {
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatType, setBeatType] = useState("quarter");
    const intervalRef = useRef(null);
    const metronomeRef = useRef(null);
    const metronomeImage = "/metronomeImage.png";

    const beatIntervals = {
        quarter: 1,
        eighth: 2,
        triplets: 3,
        sixteenth: 4,
        swung: 2,
    };

    const playClick = () => {
        if (metronomeRef.current) {
            metronomeRef.current.classList.remove("active");
            void metronomeRef.current.offsetWidth;
            metronomeRef.current.classList.add("active");
        }
        const audio = new Audio("/tick.wav");
        audio.play();
    };

    const startMetronome = () => {
        clearInterval(intervalRef.current);

        if (beatType === "swung") {
            intervalRef.current = setInterval(() => {
                playClick();
                setTimeout(() => playClick(), (60000 / bpm) * 2 / 3);
            }, 60000 / bpm);
            return;
        }

        const subdivision = beatIntervals[beatType] || 1;
        intervalRef.current = setInterval(() => {
            playClick();
        }, (60000 / bpm) / subdivision);
    };

    useEffect(() => {
        if (isPlaying) {
            startMetronome();
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, bpm, beatType]);

    return (
        <div>
            <NavBar />
            <div className="p-6 max-w-md mx-auto text-center bg-white rounded-xl shadow-md border border-black text-2xl space-y-6">
                {/* Metronome Image */}
                <div className="mb-2">
                    <img
                        ref={metronomeRef}
                        src={metronomeImage}
                        alt="Metronome"
                        className="w-24 h-24 mx-auto transition-transform duration-75 ease-in-out"
                    />
                </div>

                {/* Tempo Slider */}
                <div>
                    <label htmlFor="bpmRange" className="block text-lg font-medium text-gray-700 mb-1">
                    
                    </label>
                    <input
                        id="tempo-slider"
                        type="range"
                        min="40"
                        max="240"
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                        className="w-full"
                        aria-label="BPM range"
                    />
                </div>

                {/* BPM Number Input */}
                <input
                    type="number"
                    min="40"
                    max="240"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    placeholder="BPM"
                    className="w-full border-2 border-black px-4 py-2 text-xl rounded"
                    aria-label="BPM input"
                />

                {/* Beat Type Selector */}
                <div>
                    <label htmlFor="beatType" className="block text-sm font-semibold mb-2"> </label>
                    <select
                        value={beatType}
                        onChange={(e) => setBeatType(e.target.value)}
                        className="w-full border-2 border-black p-2 rounded text-xl"
                    >
                        <option value="quarter">Quarter Notes</option>
                        <option value="eighth">Eighth Notes</option>
                        <option value="triplets">Triplets</option>
                        <option value="sixteenth">Sixteenth Notes</option>
                        <option value="swung">Swung Notes</option>
                    </select>
                </div>

                {/* Play / Stop Button */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xl rounded shadow-md"
                >
                    {isPlaying ? "❚❚ Pause" : "▶ Play"}
                </button>
            </div>
        </div>
    );
};

export default Metronome;