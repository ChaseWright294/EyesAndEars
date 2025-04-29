import React from "react";

const HoverSpeak = ({ text }) => {
  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.5; // Adjust the rate to make the speech faster (default is 1)
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech Synthesis not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
    }
  };

  return (
    <span
      onMouseEnter={speak}
      onMouseLeave={stopSpeaking} // Stop speech when the cursor leaves
      style={{
        cursor: "pointer",
        padding: "10px",
        fontSize: "1.2em",
        color: "#000",
        transition: "color 0.3s ease",
      }}
    >
      {text}
    </span>
  );
};

export default HoverSpeak;
