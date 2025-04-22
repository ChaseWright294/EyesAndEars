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
        const audio = new Audio(/*whatever sound I find for the ticking sound*/);
        audio.play();
    };

    const startMetronome = () => {
        const subdivision = beatIntervals[beatType];
        let count = 0;
        clearInterval(intervalRef.current);

        if (beatType === "swung"){
            intervalRef.current = setInterval(() => {
                playClick();
                setTimeout(() => {
                    playClick();
                }, (60000 / bpm) * 0.66); //had to look up swing beat
            }, 60000 / bpm);
        } else{
            intervalRef.current = setInterval(() => {
                playClick();
                count = (count + 1) % subdivision;
            }, (60000 / bpm) / subdivision);
        }
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
        <div className= "p-6 max-w-md mx-auto text-center bg-white rounded-xl shadow-md">
            <div className = "mb-4">
                <img
                    ref = {metronomeRef}
                    scr = {metronomeImage}
                    alt = "Metronome"
                    className = "w-24 h-24 mx-auto transition-transform duratino-75 ease-in-out"
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
                className = "border px-2 py-1 rounded w-24 md-4"
                aria-label = "BPM input"
            />

            <label htmlFor = "beatType" className = "block text-sm font-semibold mb-1">Beat Type</label>
            <select
                value = {beatType}
                onChange = {(e) => setBeatType(e.target.value)}
                className = "border p-1 rounded mt-2"
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
                    className = "mt-4 px-4 py-2 bg-pink-600 text-white rounded"
                    >
                        {isPlaying ? "Stop" : "Play"}
                    </button>
                    </div>
    );
};


/*function Metronome() {
    return(
        <div>
            <NavBar />
            <p>this is a page for metronome</p>
        </div>
    )
}*/

export default Metronome