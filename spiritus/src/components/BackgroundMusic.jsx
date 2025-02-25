import React, { useEffect, useRef, useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import icons
import mindfulnessAudio from "@/assets/buddha.m4a";
const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const { token } = useContext(AppContext);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track play state

  useEffect(() => {
    if (token && audioRef.current) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true); // Audio started playing
          })
          .catch((err) => {
            console.error("Autoplay prevented:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [token]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  if (!token) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center">
      <audio
        ref={audioRef}
        src={mindfulnessAudio} // Use the imported audio file
        loop
        autoPlay
        muted={isMuted}
      >
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={toggleMute}
        className="bg-gray-800 text-white p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default BackgroundMusic;
