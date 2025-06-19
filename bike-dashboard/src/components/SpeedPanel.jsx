import React, { useState, useEffect } from 'react';

function SpeedPanel() {
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [odometer, setOdometer] = useState(12348);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 101));
      setBattery((prev) => (prev > 0 ? prev - Math.floor(Math.random() * 2) : 100));
      setOdometer((prev) => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (speed / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner text-center font-semibold text-gray-800">
        <p className="text-sm">Odometer</p>
        <p className="text-2xl mt-1">{odometer.toLocaleString()} km</p>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <svg width="120" height="120" className="transform -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#3b82f6"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl font-semibold text-gray-800">{speed} km/h</p>
        </div>
      </div>
      <div className="w-full md:w-24 text-center font-semibold text-gray-800 space-y-2">
        <p className="text-sm">Battery</p>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-green-400 transition-all duration-500 ease-in-out"
            style={{ width: `${battery}%` }}
          />
        </div>
        <p className="text-sm">{battery}%</p>
      </div>
    </div>
  );
}

export default SpeedPanel;
