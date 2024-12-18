'use client';
import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isActive, setIsActive] = useState(false); 
  const [inputTime, setInputTime] = useState(""); 

  const beep = new Audio('./beep.mp3')
 
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }else if(isActive && timeLeft === 0){
      setIsActive(false);
      beep.play()
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      setIsActive(false);
      setInputTime('')
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  
  const startCountdown = () => {
    const seconds = parseInt(inputTime); 
    if (!isNaN(seconds) && seconds > 0) {
      setTimeLeft(seconds); 
      setIsActive(true); 
    } else {
      alert("Please enter a valid time in seconds!");
    }
  };

 
  const resetCountdown = () => {
    setTimeLeft(0);
    setIsActive(false);
    setInputTime("");
  };

  
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Countdown Timer</h1>

        
        <div className="text-4xl font-mono mb-6">{formatTime(timeLeft)}</div>

       
        <input
          type="number"
          placeholder="Enter seconds"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="border p-2 rounded mb-4 w-60 text-center"
        />

    
        <div className="flex justify-center gap-4">
          <button
            onClick={startCountdown}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start
          </button>
          <button
            onClick={resetCountdown}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
