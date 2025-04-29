// Tuner.jsx

import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A4 = 440;
const SEMITONE = 69;
const TUNING_THRESHOLD = 10; // Cents within which the needle turns blue

function getNoteFromFrequency(freq) {
  const note = Math.round(12 * (Math.log2(freq / A4)) + SEMITONE);
  return NOTES[note % 12];
}

function getCentsOff(freq, note) {
  const noteIndex = NOTES.indexOf(note);
  const noteFreq = A4 * Math.pow(2, (noteIndex - 9) / 12);
  return Math.floor((1200 * Math.log2(freq / noteFreq)) % 100);
}

const Tuner = () => {
  const [note, setNote] = useState("-");
  const [frequency, setFrequency] = useState(0);
  const [cents, setCents] = useState(0);
  const [smoothedCents, setSmoothedCents] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    async function setupAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        dataArrayRef.current = new Float32Array(analyserRef.current.fftSize);

        sourceRef.current.connect(analyserRef.current);
        listen();
      } catch (err) {
        console.error("Error accessing microphone", err);
      }
    }

    setupAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  function autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, threshold = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < threshold) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
    }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] += buf[j] * buf[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;
    return sampleRate / T0;
  }

  function listen() {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const sampleRate = audioContextRef.current.sampleRate;

    const update = () => {
      analyser.getFloatTimeDomainData(dataArray);
      const freq = autoCorrelate(dataArray, sampleRate);

      if (freq !== -1) {
        const detectedNote = getNoteFromFrequency(freq);
        const deviation = getCentsOff(freq, detectedNote);

        setFrequency(freq.toFixed(1));
        setNote(detectedNote);
        setCents(deviation);
        setSmoothedCents(prev => prev + (deviation - prev) * 0.1);
      }

      requestAnimationFrame(update);
    };

    update();
  }

  const needleAngle = Math.max(-90, Math.min((smoothedCents / 50) * 90, 90)); // has to stay between -90 and 90 degrees
  const needleColor = Math.abs(cents) <= TUNING_THRESHOLD ? "blue" : "red";

  return (
    <div style={styles.container}>
      <NavBar /> {/*NavBar here? */}
      <h1 style={styles.title}>Fine Chromatic Tuner</h1>

      <div style={styles.notes}>
        {NOTES.map((n) => (
          <span key={n} style={n === note ? styles.activeNote : styles.note}>
            {n}
          </span>
        ))}
      </div>

      <div style={styles.gaugeContainer}>
        <svg width="600" height="300" viewBox="0 0 600 300">
          <path
            d="M 40 280 A 260 260 0 0 1 560 280"
            fill="none"
            stroke="#555"
            strokeWidth="10"
          />
          <g
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: "300px 280px",
              transition: "transform 0.3s ease-out",
            }}
          >
            <line
              x1="300"
              y1="280"
              x2="300"
              y2="80"
              stroke={needleColor}
              strokeWidth="10"
            />
          </g>
          <text x="40" y="300" fill="#888" fontSize="24">
            -50
          </text>
          <text x="290" y="46" fill="#888" fontSize="24" textAnchor="middle">
            0
          </text>
          <text x="520" y="300" fill="#888" fontSize="24">
            +50
          </text>
        </svg>
      </div>

      <div style={{ ...styles.freq, fontSize: "2.4em" }}>{frequency} Hz</div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    background: "#ffe4e1", // Pinkish white color
    color: "#ccc",
    height: "800px",
    width: "130%",
    paddingTop: "30px",
    fontFamily: "sans-serif",
    borderRadius: "15px", // Rounded edges
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)", // a shadow
  },
  title: {
    fontSize: "3.5em",
    marginBottom: "20px",
    color: "#000",
  },
  notes: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "60px",
    gap: "10px",
    flexWrap: "wrap",
  },
  note: {
    fontSize: "2em",
    color: "#555",
    transition: "color 0.3s ease",
    cursor: "pointer",
  },
  activeNote: {
    fontSize: "2.5em",
    color: "#0af",
    fontWeight: "bold",
  },
  gaugeContainer: {
    marginBottom: "20px",
    position: "relative",
  },
  freq: {
    fontSize: "1.2em",
    color: "#aaa",
    marginTop: "10px",
  },
};

export default Tuner;
