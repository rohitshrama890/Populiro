import { useState } from "react";
import { AlertCircle } from "lucide-react";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [nearestStation, setNearestStation] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [holdTimeout, setHoldTimeout] = useState(null); // ✅ Hold timeout state

  // Mock user details (Replace with real location if available)
  const user = {
    user_id: 3, // Example user ID
    latitude: 37.7749, // Example latitude
    longitude: -122.4194, // Example longitude
  };

  const handleSOS = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://3908-223-187-109-157.ngrok-free.app/find_nearest_police", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          latitude: user.latitude,
          longitude: user.longitude,
        }),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to send SOS");
      }

      const data = await response.json();

      if (data.status === "success") {
        setNearestStation(data.nearest_police_station);
        setNearbyUsers(data.nearby_users);
        setUserDetails(data.user_details); // ✅ Set user details
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to send SOS. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startHold = () => {
    if (!loading) {
      const timeout = setTimeout(handleSOS, 1500); // ✅ Trigger SOS after 1.5 seconds
      setHoldTimeout(timeout);
    }
  };

  const cancelHold = () => {
    if (holdTimeout) {
      clearTimeout(holdTimeout); // ✅ Cancel SOS if released early
      setHoldTimeout(null);
    }
  };

  return (
    <div className="flex flex-col items-center mr-6">
      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center shadow-lg transition-all duration-300 ease-in-out"
      >
        {loading ? (
          <span className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <AlertCircle className="w-5 h-5 mr-2" />
        )}
        {loading ? "Sending..." : "SOS"}
      </button>

      {/* Nearest Police Station Info */}
      {nearestStation && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md w-full max-w-md">
          <h3 className="font-bold text-lg text-red-500">🚔 Nearest Police Station:</h3>
          <p><strong>Name:</strong> {nearestStation.name}</p>
          <p><strong>Distance:</strong> {nearestStation.distance_km} km</p>
          <p><strong>Location:</strong> ({nearestStation.latitude}, {nearestStation.longitude})</p>
        </div>
      )}

      {/* Nearby Users */}
      {nearbyUsers.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md w-full max-w-md">
          <h3 className="font-bold text-lg text-blue-500">👥 Nearby Users:</h3>
          <ul className="list-disc pl-4">
            {nearbyUsers.map((user) => (
              <li key={user.user_id}>
                {user.name} ({user.distance_km} km away)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ User Details */}
      {userDetails && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow-md w-full max-w-md">
          <h3 className="font-bold text-lg text-green-500">🙋‍♂️ User Details:</h3>
          <p><strong>User ID:</strong> {userDetails.user_id}</p>
          <p><strong>Latitude:</strong> {userDetails.latitude}</p>
          <p><strong>Longitude:</strong> {userDetails.longitude}</p>
          <p><strong>Contact No:</strong> {userDetails.contact_no}</p>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
