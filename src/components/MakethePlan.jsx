// import React, { useState, useEffect } from 'react';

// const TourismLocations = () => {
//   const [locations, setLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [connectionStatus, setConnectionStatus] = useState(null);
//   const [selectedPlaces, setSelectedPlaces] = useState([]);

//   const API_BASE_URL = 'http://127.0.0.1:5003';

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/status`)
//       .then(response => response.json())
//       .then(data => {
//         setConnectionStatus(data.status);
//         if (data.status === 'connected') {
//           fetchLocations();
//         }
//       })
//       .catch(err => {
//         setConnectionStatus('error');
//         setError('Failed to check database connection status');
//         setIsLoading(false);
//       });
//   }, []);

//   const fetchLocations = () => {
//     fetch(`${API_BASE_URL}/locations`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setLocations(data.data);
//         setIsLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch locations data');
//         setIsLoading(false);
//       });
//   };

//   const handleSelectionChange = (id) => {
//     setSelectedPlaces((prev) =>
//       prev.includes(id) ? prev.filter((placeId) => placeId !== id) : [...prev, id]
//     );
//   };

//   const saveSelections = () => {
//     fetch(`${API_BASE_URL}/save-selections`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ selectedPlaces }),
//     })
//       .then(response => response.json())
//       .then(data => alert(data.message))
//       .catch(err => alert('Failed to save selections'));
//   };

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center z-[100] bg-violet-50">
//         <div className="three-body">
//           <div className="three-body__dot"></div>
//           <div className="three-body__dot"></div>
//           <div className="three-body__dot"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">{error}</div>;
//   }

//   if (connectionStatus === 'error') {
//     return <div className="p-4 text-center text-red-600 bg-red-100 rounded-md">Database connection failed. Please check your backend server.</div>;
//   }

//   return (
//     <div className="max-w-7xl pt-32 mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-blue-50">
//       <h1 className="text-[40px] font-bold text-center text-blue-900 mb-8">Shimla Tourism Destinations</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {locations.map((location) => (
//           <div key={location.id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-5">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-blue-800">{location.place}</h2>
//               <input
//                 type="checkbox"
//                 className="w-5 h-5 accent-blue-600"
//                 checked={selectedPlaces.includes(location.id)}
//                 onChange={() => handleSelectionChange(location.id)}
//               />
//             </div>
//             <h3 className="text-gray-600 italic mb-3">{location.city}</h3>
//             <p className="text-gray-700 text-sm line-clamp-3">{location.history}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button 
//           className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" 
//           onClick={saveSelections}
//           disabled={selectedPlaces.length === 0}
//         >
//           Save Selections
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TourismLocations;


import React, { useState, useEffect } from "react";

const TourismLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState(new Set());
  const [message, setMessage] = useState("");

  const API_BASE_URL = "http://127.0.0.1:5001";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/locations`);
        if (!response.ok) throw new Error("Failed to fetch locations data");
        const data = await response.json();
        setLocations(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const toggleSelection = (placeId) => {
    setSelectedPlaces((prev) => {
      const newSelection = new Set(prev);
      newSelection.has(placeId) ? newSelection.delete(placeId) : newSelection.add(placeId);
      return newSelection;
    });
  };

  const submitSelection = async () => {
    const user_id = 1; // Replace with dynamic user ID
    const selectedData = Array.from(selectedPlaces).map((placeId) => ({
      user_id,
      place_id: placeId,
      selected_at: new Date().toISOString().split("Z")[0], // Remove timezone
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/save-selections`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections: selectedData }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to save selection");

      setMessage(result.message);
      setSelectedPlaces(new Set()); // Reset selection
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  if (isLoading) return         <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-white">
  <div className="loader">
  </div>
</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl pt-32 mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-blue-50">
      <h1 className="text-[40px] font-bold text-center text-blue-900 mb-8">
        Shimla Tourism Destinations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(({ id, place, city, history }) => (
          <div
            key={id}
            className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-5"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-3 w-5 h-5"
                checked={selectedPlaces.has(id)}
                onChange={() => toggleSelection(id)}
              />
              <h2 className="text-xl font-bold text-blue-800">{place}</h2>
            </div>
            <h3 className="text-gray-600 italic mb-3">{city}</h3>
            <p className="text-gray-700 text-sm line-clamp-3">{history}</p>
          </div>
        ))}
      </div>

      {message && <p className="mt-4 text-center text-blue-800">{message}</p>}

      <button
        onClick={submitSelection}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Save Selection
      </button>
    </div>
  );
};

export default TourismLocations;

