import NavBar from "../components/NavBar"; //keep or remove?
import React, { useState, useEffect, useRef } from "react";

const Metronome = () => {
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatType, setBeatType] = useState("quarter");
    const intervalRef = useRef(null);
    const tickRef = useRef(null);

    const beatIntervals = {
        quarter: 1,
        eighth: 2, 
        triplets: 3, 
        sixteenth: 4, 
        swung: 2 //has to be handled differently
        //if time add more options
    };
    const playClick = () => {
        if(tickRef.current){
            tickRef.current.classList.remove("active");
            void tickRef.current.offsetWidth; //trigger
            tickRef.current.classList.add("active");
        }
        const audio = new Audio(/*whatever sound I find for the ticking sound*/);
        audio.play();
    };

    const startMetronome = () => {
        const subdivision = beatIntervals[beatType];
        let count = 0;
        clearInterval(intervalRef.current);

        if (beatType == "swung"){
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
        <div className= "p-4 max-w-md mx-auto text-center">
            <div
                ref = {ticketRef}
                className = "w-4 h-4 mx-auto md-4 rounded-full bg-blue-500 transition-all duration-75"
        ></div>

        <input
            //this is the typical metronome range
            type = "range"
            min = "40"
            max = "240"
            value = {bpm}
            onChange = {(e) => setBpm(Number(e.target.value))}
            className = "w-full md-2"
            />
            <p>{bpm} BPM</p>

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