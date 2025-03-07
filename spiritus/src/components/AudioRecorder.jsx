import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onAudioRecorded }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
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
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          if (onAudioRecorded) {
            onAudioRecorded(audioBlob);
          }
        };
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  return (
    <div className="relative">
      <button 
        type="button" 
        onClick={handleRecordClick}
        className="absolute right-2 bottom-2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 focus:outline-none"
        title={recording ? "Stop Recording" : "Record Audio"}
      >
        {recording ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v10c0 2.21-1.79 4-4 4s-4-1.79-4-4V1m12 0v10c0 2.21 1.79 4 4 4s4-1.79 4-4V1M5 21h14" />
          </svg>
        )}
      </button>
      {audioURL && (
        <div className="mt-2">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
