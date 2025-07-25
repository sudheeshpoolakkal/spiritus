import React, { useRef, useContext, useState, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const { token } = useContext(AppContext);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Attempt muted autoplay on initial load
  useEffect(() => {
    if (token && audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play().catch(() => {
        // Muted autoplay blocked - wait for user interaction
        setIsMuted(true);
      });
    }
  }, [token]);

  const toggleMute = async () => {
    if (!audioRef.current) return;
    
    // First interaction unlocks audio
    if (!hasInteracted) {
      setHasInteracted(true);
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsMuted(false);
      } catch (err) {
        console.error("Play failed:", err);
      }
      return;
    }

    // Subsequent interactions toggle mute state
    const newMuted = !audioRef.current.muted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  if (!token) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center">
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dbafo0u1c/video/upload/v1753430891/Super_Deep_Meditation_Music_Healing_Meditation_Music_Relax_Mind_Body_zvcls8.m4a"
        //src="https://res.cloudinary.com/dbafo0u1c/video/upload/v1740494207/buddha_oomulm.m4a"
        loop
        muted={isMuted}
      />
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