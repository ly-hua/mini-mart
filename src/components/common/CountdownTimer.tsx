import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: number; // Timestamp in seconds or milliseconds
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  // Ensure we're working with milliseconds
  const targetTime = targetDate.toString().length === 10 ? targetDate * 1000 : targetDate;

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = targetTime - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div className="flex flex-col items-center justify-center bg-red-500 text-white rounded-lg w-16 h-16 sm:w-20 sm:h-20">
        <span className="text-2xl sm:text-3xl font-bold leading-none">{timeLeft.days}</span>
        <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Days</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-red-500 text-white rounded-lg w-16 h-16 sm:w-20 sm:h-20">
        <span className="text-2xl sm:text-3xl font-bold leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Hours</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-red-500 text-white rounded-lg w-16 h-16 sm:w-20 sm:h-20">
        <span className="text-2xl sm:text-3xl font-bold leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Minutes</span>
      </div>
      <div className="flex flex-col items-center justify-center bg-red-500 text-white rounded-lg w-16 h-16 sm:w-20 sm:h-20">
        <span className="text-2xl sm:text-3xl font-bold leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
