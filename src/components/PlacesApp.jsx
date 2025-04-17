import { useEffect, useState } from "react";
import axios from "axios";

const PlacesApp = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.43.198:5000/places")
      .then(response => {
        setPlaces(response.data.places);
      })
      .catch(error => console.error("Error fetching places:", error));
  }, []);

  const handleSelect = (place) => {
    if (!selectedPlaces.includes(place)) {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const sendSelectedPlaces = () => {
    axios.post("http://192.168.43.198:5000/add_location", { location: selectedPlaces })
      .then(response => {
        alert("Locations sent successfully!");
      })
      .catch(error => console.error("Error sending locations:", error));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tourist Places</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">{place.place}</h2>
            <p className="text-gray-600">Popular Places: {place.popular_places}</p>
            <button 
              className="mt-2 bg-blue-500 text-white p-2 rounded"
              onClick={() => handleSelect(place.place)}>
              Select
            </button>
          </div>
        ))}
      </div>
      {selectedPlaces.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Selected Places:</h2>
          <ul className="list-disc pl-5">
            {selectedPlaces.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>
          <button 
            className="mt-4 bg-green-500 text-white p-2 rounded"
            onClick={sendSelectedPlaces}>
            Send to Backend
          </button>
        </div>
      )}
    </div>
  );
};

export default PlacesApp;
