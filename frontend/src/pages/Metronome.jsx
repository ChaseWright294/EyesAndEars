import NavBar from "../components/NavBar"; //keep or remove?
import React, { useState, useEffect, useRef } from "react";

const Metronome = () => {
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatType, setBeatType] = useState("quarter");
    const intervalRef = useRef(null);
    const metronomeRef = useRef(null);

    const beatIntervals = {
        quarter: 1,
        eighth: 2, 
        triplets: 3, 
        sixteenth: 4, 
        swung: 2 //has to be handled differently
        //if time add more options
    };

    const playClick = () => {
        if(metronomeRef.current){
            metronomeRef.current.classList.remove("active");
            void metronomeRef.current.offsetWidth; //trigger
            metronomeRef.current.classList.add("active");
        }
        const audio = new Audio("/tick.wav");
        audio.play();
    };

    const startMetronome = () => {
        clearInterval(intervalRef.current);

        if (beatType === "swung"){
            intervalRef.current = setInterval(() => {
                playClick();
                setTimeout(() => 
                playClick(),
                 (60000 / bpm) * 2/3); //had to look up swing beat
            }, 60000 / bpm);
            return;
        } 
            const subdivision = beatIntervals[beatType] || 1;
            intervalRef.current = setInterval(() => {
                playClick();
                count = (count + 1) % subdivision;
            }, (60000 / bpm) / subdivision);
        
    };

    useEffect(() => {
        if(isPlaying){
            startMetronome();
        }
        else{
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, bpm, beatType]);

    return(
        <div>
            <NavBar />
        <div className= "p-6 max-w-md mx-auto text-center bg-white rounded-xl shadow-md border border-black text-2xl">
            <div className = "mb-4">
                <img
                    ref = {metronomeRef}
                    src = {metronomeImage}
                    alt = "Metronome"
                    className = "w-24 h-24 mx-auto transition-transform duration-75 ease-in-out"
                />
            </div>

            <label htmlFor = "bpmRange" className = "block text-lg font-medium text-gray-700">
                Tempo: {bpm} BPM
            </label>
        <input
            //this is the typical metronome range
            id = "bpmRange"
            type = "range"
            min = "40"
            max = "240"
            value = {bpm}
            onChange = {(e) => setBpm(Number(e.target.value))}
            className = "w-full md-2"
            aria-label = "BPM range"
            />
            <input
                type = "number"
                min = "40"
                max = "240"
                value = {bpm}
                onChange = {(e) => setBpm(Number(e.target.value))}
                className = "w-full my-2 border-2 border-black text-xl"
                aria-label = "BPM input"
            />

            <label htmlFor = "beatType" className = "block text-sm font-semibold mb-1">Beat Type</label>
            <select
                value = {beatType}
                onChange = {(e) => setBeatType(e.target.value)}
                className = "border-2 border-black p-2 rounded text-xl my-2"
                >
                    <option value = "quarter"> Quarter Notes</option>
                    <option value = "eighth"> Eighth Notes</option>
                    <option value = "triplets"> Triplets Notes</option>
                    <option value = "sixteenth"> Sixteenth Notes</option>
                    <option value = "swung"> Swung Notes</option>
                    <option value = "none"> None Notes</option>
                </select>

                <button
                    onClick ={() => setIsPlaying(!isPlaying)}
                    className = "mt-4 px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xl rounded shadow-md"
                    >
                        {isPlaying ? "Stop" : "Play"}
                    </button>
                    </div>
                </div>

    );
};

export default Metronome;