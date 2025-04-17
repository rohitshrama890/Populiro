
import React, { useState, useEffect } from 'react';

const TourismLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Update this URL to match your Flask server address
  const API_BASE_URL = 'https://6f6f-2401-4900-1c66-e292-ab70-590-5d29-7edb.ngrok-free.app';

  useEffect(() => {
    const checkConnectionAndFetch = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/status`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const data = await res.json();
  
        setConnectionStatus(data.status);
  
        if (data.status === 'connected') {
          fetchLocations();
        }
      } catch (error) {
        setConnectionStatus('error');
        setError('Unable to connect to server.');
        setIsLoading(false);
      }
    };
  
    checkConnectionAndFetch();
  }, []);
  
  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/locations`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      if (!res.ok) throw new Error();
  
      const data = await res.json();
      setLocations(data.data);
    } catch {
      setError('Failed to fetch locations');
    } finally {
      setIsLoading(false);
    }
  };
  

  const openDetailPanel = (location) => {
    setSelectedLocation(location);
    setIsPanelOpen(true);
    // Add overflow hidden to body to prevent scrolling when panel is open
    document.body.style.overflow = 'hidden';
  };

  const closeDetailPanel = () => {
    setIsPanelOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return                 <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-white">
    <div className="loader">
    </div>
  </div>;
  }

  if (error) {
    // return <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">{error}</div>;
    return                 <div className="flex-center h-dvh w-screen overflow-hidden bg-white">
    <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">{error}
    </div>
  </div>;
  }

  if (connectionStatus === 'error') {
    return <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">Database connection failed. Please check your backend server.</div>;
  }

  return (
    <div className="max-w-7xl pt-32 mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-blue-50">
      <h1 className="text-[40px] font-bold text-center text-blue-900 mb-8">Shimla Tourism Destinations</h1>
      {/* <div className="text-center mb-6 p-3 bg-gray-100 rounded-lg">
        Database Connection: 
        <span className={connectionStatus === 'connected' ? 'text-green-600 font-semibold ml-2' : 'text-red-600 font-semibold ml-2'}>
          {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
        </span>
      </div> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(location => (
          <div key={location.id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-5">
              <h2 className="text-xl font-bold text-blue-800">{location.place}</h2>
              <h3 className="text-gray-600 italic mb-3">{location.city}</h3>
              <div className="text-gray-700 text-sm">
                <p className="line-clamp-4">{location.history}</p>
              </div>
              
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" 
                onClick={() => openDetailPanel(location)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sliding panel for detailed view */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeDetailPanel}
      ></div>
      
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-1/2 bg-white shadow-lg z-50 transition-transform duration-300 transform ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}
      >
        {selectedLocation && (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold text-blue-800">{selectedLocation.place}</h2>
              <button onClick={closeDetailPanel} className="p-2 rounded-full hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-600 italic mb-3">{selectedLocation.city}</h3>
                  <div className="text-gray-700 mb-6">
                    <p className="whitespace-pre-line">{selectedLocation.history}</p>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  {/* Placeholder for image - you'll need to update your backend to provide image URLs */}
                  <div className="bg-gray-200 h-64 W-64 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url('./shimla_img/s${selectedLocation.id}.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}>
                  </div>
                  
                  <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Additional Information</h4>
                    <p className="text-gray-600">
                      Location: {selectedLocation.city}, Himachal Pradesh<br />
                      {/* Add more details as needed */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourismLocations;