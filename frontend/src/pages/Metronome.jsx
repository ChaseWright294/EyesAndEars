import NavBar from "../components/NavBar"; 
import React, { useState, useEffect, useRef } from "react";
import '../css/Metronome.css'


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

    useEffect(() => {
        if (metronomeRef.current) {
            const secondsPerBeat = 60 / bpm;
            metronomeRef.current.style.animationDuration = `${secondsPerBeat}s`;
        }
    }, [bpm, isPlaying]); 

    return(
        <div>
            <NavBar/>
            <div className= "p-6 max-w-md mx-auto bg-white rounded-xl shadow-md border border-black">
                <div className = "flex flex-col items-center space-y-4">
                    <div
                        ref = {metronomeRef}
                        className={`w-4 h-32 bg-black pendulum ${isPlaying ? "continuousSwing" : ""}`}
                    />
                </div>
                
                {/*BPM number */}
                <input
                    type = "number"
                    min = "40"
                    max = "240"
                    value = {bpm}
                    onChange = {(e) => setBpm(Number(e.target.value))}
                    className = "w-full border-2 border-black text-xl px-2 py-1 rounded"
                    aria-label = "BPM input"
                />

                {/*Scroll bar*/}
                <input
                    //this is the typical metronome range
                    id = "bpmRange"
                    type = "range"
                    min = "40"
                    max = "240"
                    value = {bpm}
                    onChange = {(e) => setBpm(Number(e.target.value))}
                    className = "w-full"
                    aria-label = "BPM range"
                />
            
                {/*Beat type*/}
                <select
                    value = {beatType}
                    onChange = {(e) => setBeatType(e.target.value)}
                    className = "w-full border-2 border-black p-2 rounded text-xl"
                >
                    <option value = "quarter"> Quarter Notes</option>
                    <option value = "eighth"> Eighth Notes</option>
                    <option value = "triplets"> Triplets Notes</option>
                    <option value = "sixteenth"> Sixteenth Notes</option>
                    <option value = "swung"> Swung Notes</option>
                    
                </select>

                <button
                    onClick ={() => setIsPlaying(!isPlaying)}
                    className = "w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white text-xl rounded shadow-md"
                    >
                        {isPlaying ? "❚❚ Pause" : "▶ Play"}
                    </button>
                </div>
            </div>
    );
};

export default Metronome;