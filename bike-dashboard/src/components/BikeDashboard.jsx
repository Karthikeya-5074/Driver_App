import React, { useState, useEffect } from 'react';

const tabs = ["Overview", "Trip Info", "Maintenance", "Alerts"];

function BikeDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const scriptId = 'mappls-script';

    const initializeMap = (coords) => {
      if (!window.L) return;
      const map = window.L.map('map').setView(coords, 12);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
      window.L.marker(coords).addTo(map);
    };

    const handleLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            initializeMap([pos.coords.latitude, pos.coords.longitude]);
          },
          () => {
            initializeMap([28.61, 77.23]);
          }
        );
      } else {
        initializeMap([28.61, 77.23]);
      }
    };

    const loadScriptAndInit = () => {
      if (document.getElementById(scriptId)) {
        if (window.L) handleLocation();
        return;
      }
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://apis.mappls.com/advancedmaps/v1/c45331da12ea977d69c6ec5988dea0cb/map_load?v=1.5';
      script.async = true;
      script.onload = handleLocation;
      document.body.appendChild(script);
    };

    loadScriptAndInit();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div id="map" className="w-full md:w-3/5 h-[400px] rounded-xl shadow-lg"></div>
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
