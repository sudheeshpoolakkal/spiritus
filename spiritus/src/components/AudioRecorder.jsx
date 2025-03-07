import React, { useState, useRef } from "react";
import wave from "../assets/assets_frontend/sound-wave.png";

const AudioRecorder = ({ onAudioRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleRecordClick = async () => {
    if (recording) {
      // Stop recording
      mediaRecorderRef.current.stop();
      setRecording(false);
    } else {
      // Start recording: request microphone access
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          if (onAudioRecorded) {
            onAudioRecorded(audioBlob);
          }
        };
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Define the animation keyframes */}
      <style>{`
        /* Pulsing halo effect for recording state */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
          }
        }
        /* Subtle scaling effect for ready state */
        @keyframes readyPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(.95);
          }
        }
      `}</style>

      {/* Button with conditional animation */}
      <button
        type="button"
        onClick={handleRecordClick}
        style={{
          position: "absolute",
          right: "0.5rem",
          bottom: "0.5rem",
          backgroundColor: "white",
          borderRadius: "9999px",
          padding: "0.5rem",
          outline: "none",
          animation: recording ? "pulse 1.5s infinite" : "readyPulse 2s infinite",
        }}
        title={recording ? "Stop Recording" : "Record Audio"}
      >
        {recording ? (
          // Stop icon during recording
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "1.5rem", width: "1.5rem", color: "red" }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        ) : (
          // Mic icon before recording
          <img
            src={wave}
            alt="wave"
            style={{ height: "2.5rem", width: "2.5rem" }}
          />
        )}
      </button>

      {/* Audio player for playback */}
      {audioURL && (
        <div style={{ marginTop: "0.5rem" }}>
          <audio controls src={audioURL} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;