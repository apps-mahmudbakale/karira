import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
  const initialTime = 15 * 60; // 15 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState<number>(
    parseInt(localStorage.getItem("countdownTime") || `${initialTime}`, 10)
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
      localStorage.setItem("countdownTime", `${timeRemaining}`);
    };
  }, [timeRemaining]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
   
      <p className=" text-primaryBlue text-[22px] font-fellix-bold ">{formatTime(timeRemaining)} left</p>
  
  );
};

export default CountdownTimer;
