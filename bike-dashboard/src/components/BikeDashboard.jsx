import React, { useState, useEffect } from 'react';

const tabs = ["Overview", "Trip Info", "Maintenance", "Alerts"];

function BikeDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    if (window.mappls && !window.map) {
      window.map = new window.mappls.Map('map', {
        center: [28.61, 77.23],
        zoom: 12,
      });
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-3/5 h-64 bg-white rounded shadow" id="map" />
        <div className="w-full md:w-2/5 h-64 bg-white rounded shadow flex items-center justify-center">
          <p>Speedometer</p>
        </div>
      </div>
      <div className="bg-white rounded shadow">
        <div className="flex space-x-4 border-b px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 transition-all duration-300 ease-in-out ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          <p>{`Content for ${activeTab}`}</p>
        </div>
      </div>
    </div>
  );
}

export default BikeDashboard;
