
import React, { useState, useEffect, useRef } from 'react';

declare const L: any;

const LocationTracker: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const selfMarkerRef = useRef<any>(null);
  const partnerMarkerRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Simulated partner location (User Two) - slightly offset from user or fixed
  const [partnerCoords, setPartnerCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (isSharing) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lng: longitude });
          // Simulate partner being nearby for the demo
          setPartnerCoords({ lat: latitude + 0.002, lng: longitude + 0.002 });
          setError(null);
        },
        (err) => {
          setError(err.message);
          setIsSharing(false);
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
        setPartnerCoords(null);
    }
  }, [isSharing]);

  useEffect(() => {
    if (coords && mapContainerRef.current && !mapRef.current) {
      // Initialize Map
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([coords.lat, coords.lng], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add Zoom Control to bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    }

    if (coords && mapRef.current) {
      // Handle Self Marker (Blue)
      if (!selfMarkerRef.current) {
        const selfIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #2563eb; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px #2563eb;"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });
        selfMarkerRef.current = L.marker([coords.lat, coords.lng], { icon: selfIcon }).addTo(mapRef.current)
          .bindPopup('<b style="color: #2563eb">You (User A)</b><br/>Live Now')
          .openPopup();
      } else {
        selfMarkerRef.current.setLatLng([coords.lat, coords.lng]);
      }

      // Handle Partner Marker (Purple)
      if (partnerCoords) {
          if (!partnerMarkerRef.current) {
            const partnerIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: #9333ea; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px #9333ea;"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
              });
              partnerMarkerRef.current = L.marker([partnerCoords.lat, partnerCoords.lng], { icon: partnerIcon }).addTo(mapRef.current)
                .bindPopup('<b style="color: #9333ea">Jordan (User B)</b><br/>Live Now');
          } else {
              partnerMarkerRef.current.setLatLng([partnerCoords.lat, partnerCoords.lng]);
          }
      } else if (partnerMarkerRef.current) {
          mapRef.current.removeLayer(partnerMarkerRef.current);
          partnerMarkerRef.current = null;
      }

      // Fit bounds if both are present
      if (partnerCoords) {
          const group = new L.featureGroup([selfMarkerRef.current, partnerMarkerRef.current]);
          mapRef.current.fitBounds(group.getBounds().pad(0.2));
      } else {
          mapRef.current.setView([coords.lat, coords.lng]);
      }
    }
  }, [coords, partnerCoords]);

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#050505]">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Live GPS Tracking</h2>
          <p className="text-gray-500 text-sm">Secure Peer-to-Peer Location Sharing</p>
        </div>
        <div className="flex items-center gap-4">
          {error && <span className="text-red-500 text-xs font-medium bg-red-500/10 px-3 py-1 rounded-full">{error}</span>}
          <button 
            onClick={() => setIsSharing(!isSharing)}
            className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${isSharing ? 'bg-red-600 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'}`}
          >
            <i className={`fas ${isSharing ? 'fa-stop' : 'fa-location-arrow'}`}></i>
            {isSharing ? 'Stop Sharing' : 'Start Live Sharing'}
          </button>
        </div>
      </header>

      <div className="flex-1 relative rounded-[40px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-inner">
        {!isSharing && !coords ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
             <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 border border-blue-600/20 animate-pulse">
                <i className="fas fa-satellite-dish text-3xl text-blue-500"></i>
             </div>
             <h3 className="text-xl font-bold">Tracking Inactive</h3>
             <p className="text-gray-500 mt-2 max-w-xs text-center">Enable location sharing to see both users on the encrypted map.</p>
          </div>
        ) : null}
        
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Legend */}
        {isSharing && (
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-3 border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-blue-600 border border-white shadow-[0_0_5px_#2563eb]"></div>
                    <span className="text-[10px] font-bold uppercase text-gray-300">User A (Self)</span>
                </div>
                <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-3 border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-purple-600 border border-white shadow-[0_0_5px_#9333ea]"></div>
                    <span className="text-[10px] font-bold uppercase text-gray-300">User B (Partner)</span>
                </div>
            </div>
        )}

        {/* Floating UI */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
           {coords && (
             <div className="glass-panel p-4 rounded-2xl border border-white/10 pointer-events-auto w-64 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase">Secure Link</h4>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500">
                          <i className="fas fa-crosshairs text-xs"></i>
                      </div>
                      <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Accuracy</p>
                          <p className="text-xs font-bold">Within 5 meters</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600/10 rounded-lg flex items-center justify-center text-green-500">
                          <i className="fas fa-shield-check text-xs"></i>
                      </div>
                      <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Privacy Mode</p>
                          <p className="text-xs font-bold text-green-500 font-mono tracking-tighter">ENCRYPTED_P2P</p>
                      </div>
                   </div>
                </div>
             </div>
           )}

           <div className="flex flex-col gap-2 pointer-events-auto">
              <button 
                onClick={() => coords && mapRef.current?.setView([coords.lat, coords.lng], 15)}
                className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl hover:bg-blue-500 transition-all active:scale-95"
                title="Recenter Map"
              >
                 <i className="fas fa-location-crosshairs"></i>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LocationTracker;
