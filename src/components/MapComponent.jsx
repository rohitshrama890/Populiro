// import React, { useState, useRef, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker, Polyline, OverlayView } from "@react-google-maps/api";
// import Character from "./character";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;
// const libraries = ["places"];
// const defaultCenter = { lat: 31.1048, lng: 77.1734 };

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState({lat:31.51548, lng:76.88678});
//   const [path, setPath] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState("face-down");

//   useEffect(() => {
//     // Get user's current location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setSource({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => console.error("Error getting location:", error)
//     );

//     // Fetch destination from Flask API
//     // fetch("http://127.0.0.1:5000/get_destination")  // Update this URL if Flask is hosted elsewhere
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     setDestination({ lat: data.lat, lng: data.lng });
//     //   })
//     //   .catch((error) => console.error("Error fetching destination:", error));
//   }, []);

//   useEffect(() => {
//     if (source && destination) {
//       getRoute(); // Automatically call getRoute() when destination is set
//     }
//   }, [source, destination]);

//   const getRoute = async () => {
//     if (!source || !destination) return;
//     setPath([]);
//     setCurrentIndex(0);

//     const routeRequest = {
//       origin: {
//         location: { latLng: { latitude: source.lat, longitude: source.lng } },
//       },
//       destination: {
//         location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
//       },
//       travelMode: "DRIVE",
//       routingPreference: "TRAFFIC_AWARE_OPTIMAL",
//       computeAlternativeRoutes: false,
//     };

//     try {
//       const response = await fetch(
//         `https://routes.googleapis.com/directions/v2:computeRoutes`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Goog-Api-Key": API_KEY,
//             "X-Goog-FieldMask": "routes.polyline",
//           },
//           body: JSON.stringify(routeRequest),
//         }
//       );

//       const data = await response.json();
//       if (data.routes && data.routes.length > 0) {
//         setPath(decodePolyline(data.routes[0].polyline.encodedPolyline));
//       } else {
//         console.error("No optimized route found");
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//     }
//   };

//   const decodePolyline = (encoded) => {
//     let points = [];
//     let index = 0, len = encoded.length;
//     let lat = 0, lng = 0;

//     while (index < len) {
//       let shift = 0, result = 0, byte;

//       do {
//         byte = encoded.charCodeAt(index++) - 63;
//         result |= (byte & 0x1f) << shift;
//         shift += 5;
//       } while (byte >= 0x20);

//       let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
//       lat += deltaLat;

//       shift = 0;
//       result = 0;

//       do {
//         byte = encoded.charCodeAt(index++) - 63;
//         result |= (byte & 0x1f) << shift;
//         shift += 5;
//       } while (byte >= 0x20);

//       let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
//       lng += deltaLng;

//       points.push({ lat: lat / 1e5, lng: lng / 1e5 });
//     }
//     return points;
//   };
  

//   return (
// <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
//       <div className="h-3/4 flex items-center justify-center">
//         <div className="w-[90%] h-full rounded-2xl overflow-hidden shadow-lg">
//           {window.google && window.google.maps ? (
//             <GoogleMap
//               mapContainerStyle={{ width: "100%", height: "500px" }}
//               center={source || defaultCenter}
//               zoom={12}
//               options={{
//                 fullscreenControl: false,
//                 mapTypeControl: false,
//                 streetViewControl: false,
//                 mapId: MAP_ID,
//               }}
//             >
//               {destination && (
//                 <Marker 
//                   position={destination} 
//                   icon={{
//                     url: "/destinations/temple2.png",
//                     scaledSize: new window.google.maps.Size(50, 50),
//                   }}
//                 />
//               )}

//               <Polyline path={path} options={{ strokeColor: "#FF0000", strokeWeight: 4 }} />
//               <OverlayView position={source} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
//                 <div style={{ transform: "translate(-50%, -85%)", position: "absolute", zIndex: 100 }}>
//                   <Character/>
//                 </div>
//               </OverlayView>
//             </GoogleMap>
//           ) : (
//             <p>Loading Map...</p>
//           )}
//         </div>
//       </div>
//     </LoadScript>
//   );
// };

// export default MapComponent;



// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker, Polyline, OverlayView } from "@react-google-maps/api";
// import Character from "./character";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;
// const libraries = ["places"];
// const defaultCenter = { lat: 31.1048, lng: 77.1734 };

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState({ lat: 31.51548, lng: 76.88678 });
//   const [path, setPath] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState("face-down");
//   const [speed, setSpeed] = useState(1); // Default speed (adjusted dynamically)

//   useEffect(() => {
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
  
//         if (source) {
//           const distance = google.maps.geometry.spherical.computeDistanceBetween(
//             new google.maps.LatLng(source.lat, source.lng),
//             new google.maps.LatLng(newPos.lat, newPos.lng)
//           );
  
//           const time = (position.timestamp - (source.timestamp || Date.now())) / 1000;
//           const newSpeed = time > 0 ? distance / time : 1;
  
//           setSpeed(newSpeed);
//         }
  
//         setSource({ ...newPos, timestamp: position.timestamp });
//       },
//       (error) => console.error("Error getting location:", error),
//       { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 }
//     );
  
//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);
  

//   useEffect(() => {
//     if (source && destination) getRoute();
//   }, [source, destination]);

//   const getRoute = async () => {
//     if (!source || !destination) return;
//     setPath([]);
//     setCurrentIndex(0);
  
//     const routeRequest = {
//       origin: `${source.lat},${source.lng}`,
//       destination: `${destination.lat},${destination.lng}`,
//       travelMode: "WALKING",
//     };
  
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${routeRequest.origin}&destination=${routeRequest.destination}&mode=${routeRequest.travelMode}&key=${API_KEY}`
//       );
//       const data = await response.json();
  
//       if (data.routes.length > 0) {
//         const route = data.routes[0];
  
//         // Get total distance along the path
//         const totalDistance = route.legs.reduce((sum, leg) => sum + leg.distance.value, 0);
  
//         // Decode polyline if present
//         let newPath = [];
//         if (route.overview_polyline) {
//           newPath = decodePolyline(route.overview_polyline.points);
//         }
  
//         setPath(newPath);
//         console.log("Total Route Distance:", totalDistance, "meters");
//       } else {
//         console.error("No route found.");
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//     }
//   };
  
  
  

//   const decodePolyline = (encoded) => {
//     let points = [];
//     let index = 0, lat = 0, lng = 0;

//     while (index < encoded.length) {
//       let shift = 0, result = 0, byte;
//       do {
//         byte = encoded.charCodeAt(index++) - 63;
//         result |= (byte & 0x1f) << shift;
//         shift += 5;
//       } while (byte >= 0x20);
//       lat += result & 1 ? ~(result >> 1) : result >> 1;

//       shift = 0;
//       result = 0;
//       do {
//         byte = encoded.charCodeAt(index++) - 63;
//         result |= (byte & 0x1f) << shift;
//         shift += 5;
//       } while (byte >= 0x20);
//       lng += result & 1 ? ~(result >> 1) : result >> 1;

//       points.push({ lat: lat / 1e5, lng: lng / 1e5 });
//     }
//     return points;
//   };

//   // Move the character dynamically based on user speed
//   useEffect(() => {
//     if (path.length > 1) {
//       const interval = setInterval(() => {
//         if (currentIndex < path.length - 1) {
//           setCurrentIndex((prev) => prev + 1);
//           setSource(path[currentIndex]);

//           // Determine direction based on movement
//           const nextPoint = path[currentIndex + 1];
//           if (!nextPoint) return;

//           const dx = nextPoint.lng - path[currentIndex].lng;
//           const dy = nextPoint.lat - path[currentIndex].lat;

//           let newDirection = "face-down";
//           if (dx > 0 && dy > 0) newDirection = "face-down-right";
//           else if (dx < 0 && dy > 0) newDirection = "face-down-left";
//           else if (dx > 0 && dy < 0) newDirection = "face-up-right";
//           else if (dx < 0 && dy < 0) newDirection = "face-up-left";
//           else if (dx > 0) newDirection = "face-right";
//           else if (dx < 0) newDirection = "face-left";
//           else if (dy > 0) newDirection = "face-down";
//           else if (dy < 0) newDirection = "face-up";

//           setDirection(newDirection);
//         } else {
//           clearInterval(interval);
//         }
//       }, 1000 / speed); // Adjust interval based on user speed

//       return () => clearInterval(interval);
//     }
//   }, [path, currentIndex, speed]);

//   // Function to calculate distance between two coordinates (Haversine formula)
//   // const getDistance = (point1, point2) => {
//   //   if (!point1 || !point2) return 0;

//   //   const R = 6371e3; // Earth radius in meters
//   //   const φ1 = (point1.lat * Math.PI) / 180;
//   //   const φ2 = (point2.lat * Math.PI) / 180;
//   //   const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
//   //   const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

//   //   const a =
//   //     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//   //     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   //   return R * c;
//   // };

//   return (
//     <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
//       <div className="h-3/4 flex items-center justify-center">
//         <div className="w-[90%] h-full rounded-2xl overflow-hidden shadow-lg">
//           {window.google && window.google.maps ? (
//             <GoogleMap
//               mapContainerStyle={{ width: "100%", height: "500px" }}
//               center={source || defaultCenter}
//               zoom={12}
//               options={{
//                 fullscreenControl: false,
//                 mapTypeControl: false,
//                 streetViewControl: false,
//                 mapId: MAP_ID,
//               }}
//             >
//               {destination && (
//                 <Marker
//                   position={destination}
//                   icon={{
//                     url: "/destinations/temple2.png",
//                     scaledSize: new window.google.maps.Size(50, 50),
//                   }}
//                 />
//               )}

//               <Polyline path={path} options={{ strokeColor: "#FF0000", strokeWeight: 4 }} />
//               <OverlayView position={source} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
//                 <div style={{ transform: "translate(-50%, -85%)", position: "absolute", zIndex: 100 }}>
//                   <Character direction={direction} />
//                 </div>
//               </OverlayView>
//             </GoogleMap>
//           ) : (
//             <p>Loading Map...</p>
//           )}
//         </div>
//       </div>
//     </LoadScript>
//   );
// };

// export default MapComponent;

import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScriptNext, Marker, Polyline, Autocomplete, OverlayView } from "@react-google-maps/api";
import Character from "./character";
import SOSButton from "./SOSButton"; 
import AWS from 'aws-sdk';
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;
const libraries = ["places"];
const AWS_ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY;
const AWS_SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY;

const containerStyle = { width: "90%", height: "500px" };
const defaultCenter = { lat: 31.1048, lng: 77.1734 };

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-east-1",
});

const polly = new AWS.Polly();

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [path, setPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const polylineRef = useRef(null);
  const destinationRef = useRef(null);
  const [center, setCenter] = useState(defaultCenter);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const speakText = (text) => {
    const params = {
      OutputFormat: "mp3",
      Text: text,
      VoiceId: "Ivy",
    };
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) console.error("Polly Error:", err);
      else {
        const audioUrl = URL.createObjectURL(new Blob([data.AudioStream], { type: "audio/mpeg" }));
        const audio = new Audio(audioUrl);
        audio.play();
      }
    });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSource({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log("lat:",lat);
        console.log("lng",lng);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);
  const fetchAndSpeakInfo = async (destination) => {
    try {
      const response = await fetch(`/api/info?lat=${destination.lat}&lng=${destination.lng}`);
      const data = await response.json();
      speakText(`${data.keyFeatures}. ${data.history}. ${data.precautions}`);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };
  const fetchAndSpeakStory = async (destination) => {
    try {
      const response = await fetch(`/api/story?lat=${destination.lat}&lng=${destination.lng}`);
      const data = await response.json();
      speakText(data.story);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };
  const handlePlaceSelect = () => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlace();
      if (place && place.geometry) {
        setDestination({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setPath([]);
        setCurrentIndex(0);
      }
    }
  };

  const getRoute = async () => {
    if (!source || !destination) return;
    setPath([]);
    setCurrentIndex(0);
  
    const routeRequest = {
      origin: {
        location: { latLng: { latitude: source.lat, longitude: source.lng } },
      },
      destination: {
        location: { latLng: { latitude: destination.lat, longitude: destination.lng } },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE_OPTIMAL", // 🚀 Use optimized route with live traffic
      computeAlternativeRoutes: false,
    };
  
    try {
      const response = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "routes.polyline,routes.legs.distanceMeters,routes.legs.duration,routes.legs.polyline",
          },
          body: JSON.stringify(routeRequest),
        }
      );
  
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const polylinePoints = decodePolyline(data.routes[0].polyline.encodedPolyline);
        setPath(polylinePoints);
        setCurrentIndex(0);
      } else {
        console.error("No optimized route found");
      }
    } catch (error) {
      console.error("Error fetching optimized route:", error);
    }
  };
  

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let shift = 0, result = 0, byte;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return points;
  };
  const smoothMove = (start, end, duration = 500) => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const lat = start.lat + (end.lat - start.lat) * progress;
      const lng = start.lng + (end.lng - start.lng) * progress;
      setSource({ lat, lng });
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };
  
  // const [prevLocation, setPrevLocation] = useState(null);

  const [prevLocation, setPrevLocation] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  
  useEffect(() => {
    if (!destination) return;
  
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        if (prevLocation) {
          updateDirection(prevLocation, newLocation);
          smoothMove(prevLocation, newLocation, 800);
        } else {
          setSource(newLocation);
        }
  
        setPrevLocation(newLocation);
        setCenter(newLocation);
  
        const distance = haversineDistance(newLocation, destination);
        
        if (distance < 1 && !hasSpoken) {
          setHasSpoken(true);
          fetchAndSpeakInfo(destination);
        }
        
        if (distance < 0.02) {
          setDestination(null);
          fetchAndSpeakStory(destination);
        }
      },
      (error) => console.error("Error tracking location:", error),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  
    return () => navigator.geolocation.clearWatch(watchId);
  }, [destination, prevLocation, hasSpoken]);
  
  const [direction, setDirection] = useState("face-down");

  const updateDirection = (prev, current) => {
    const dx = current.lng - prev.lng;
    const dy = prev.lat - current.lat; // Inverted Y-axis for map coordinates
  
    let newDirection = "face-down"; // Default direction
  
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
    if (angle >= -22.5 && angle < 22.5) newDirection = "face-right";
    else if (angle >= 22.5 && angle < 67.5) newDirection = "face-right-down";
    else if (angle >= 67.5 && angle < 112.5) newDirection = "face-down";
    else if (angle >= 112.5 && angle < 157.5) newDirection = "face-left-down";
    else if (angle >= 157.5 || angle < -157.5) newDirection = "face-left";
    else if (angle >= -157.5 && angle < -112.5) newDirection = "face-left-up";
    else if (angle >= -112.5 && angle < -67.5) newDirection = "face-up";
    else if (angle >= -67.5 && angle < -22.5) newDirection = "face-right-up";
  
    setDirection(newDirection);
  };
  const haversineDistance = (coord1, coord2) => {
  const toRad = (angle) => (Math.PI / 180) * angle;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};
  const onMapLoad = (map) => {
    setMap(map);
    setIsMapLoaded(true); // Set map loaded state to true
  };
  
  return (
    <LoadScriptNext googleMapsApiKey={API_KEY} libraries={libraries}
    onLoad={() => setIsMapLoaded(true)}>
      <div className="h-3/4 flex items-center justify-center relative mt-4 ">
        <div className="absolute top-0 right-0 z-10">
          <SOSButton/>
        </div>
        <div className="w-[90%] h-full rounded-2xl overflow-hidden shadow-lg border-4 border-yellow-800">
        {!isMapLoaded ? (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-white">
        <div className="loader">
        </div>
      </div>
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "500px" }}
              center={source || defaultCenter}
              zoom={12}
              onLoad={onMapLoad} // This will call `onMapLoad` once the map is loaded
              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapId: MAP_ID,
              }}
            >
              {destination && (
                <Marker
                  position={destination}
                  icon={{
                    url: "/destinations/dest.png",
                    scaledSize: new window.google.maps.Size(50, 50),
                    anchor: new window.google.maps.Point(25, 50),
                  }}
                />
              )}
              <Polyline path={path} options={{ strokeColor: "#FF0000", strokeWeight: 4 }} />
              <OverlayView
                position={source}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div style={{ transform: "translate(-50%, -85%)", position: "absolute", zIndex: 100 }}>
                  <Character direction={direction} />
                </div>
              </OverlayView>
            </GoogleMap>
          )}
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Autocomplete
          onLoad={(ref) => (destinationRef.current = ref)}
          onPlaceChanged={handlePlaceSelect}
          options={{ types: ["geocode"] }}
        >
          <input type="text" placeholder="Enter Destination" style={{ width: "100%", padding: "10px" }} />
        </Autocomplete>
        <button
          onClick={getRoute}
          style={{ padding: "10px", marginTop: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
        >
          Get Route
        </button>
      </div>
      <div>
        
      </div>
    </LoadScriptNext>
  );
};

export default MapComponent;

// import React, { useState, useRef, useEffect } from "react";
// import { GoogleMap, LoadScriptNext, Marker, Polyline, Autocomplete, OverlayView } from "@react-google-maps/api";
// import Character from "./character";
// import SOSButton from "./SOSButton"; 
// import AWS from "aws-sdk"; // Import AWS SDK
// import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";


// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;
// const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL;
// const libraries = ["places"];

// // AWS Polly Configuration
// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
//   secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
//   region: "us-east-1", // Adjust region accordingly
// });
// const polly = new AWS.Polly();
// const containerStyle = { width: "90%", height: "500px" };
// const defaultCenter = { lat: 31.1048, lng: 77.1734 };

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [path, setPath] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const destinationRef = useRef(null);
//   const [center, setCenter] = useState(defaultCenter);
//   const [prevLocation, setPrevLocation] = useState(null);
//   const [direction, setDirection] = useState("face-down");
//   const [hasSpoken, setHasSpoken] = useState(false);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setSource({ lat: position.coords.latitude, lng: position.coords.longitude });
//       },
//       (error) => console.error("Error getting location:", error)
//     );
//   }, []);

//   const handlePlaceSelect = () => {
//     if (destinationRef.current) {
//       const place = destinationRef.current.getPlace();
//       if (place && place.geometry) {
//         setDestination({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         });
//         setPath([]);
//         setCurrentIndex(0);
//         setHasSpoken(false); // Reset speech trigger
//       }
//     }
//   };

//   const haversineDistance = (loc1, loc2) => {
//     const R = 6371; // Earth radius in km
//     const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
//     const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
//     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//               Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
//               Math.sin(dLng / 2) * Math.sin(dLng / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   useEffect(() => {
//     if (!destination) return;

//     const watchId = navigator.geolocation.watchPosition(
//       async (position) => {
//         const newLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        
//         if (prevLocation) {
//           updateDirection(prevLocation, newLocation);
//         }

//         setPrevLocation(newLocation);
//         setSource(newLocation);
//         setCenter(newLocation);

//         const distance = haversineDistance(newLocation, destination);

//         if (distance <= 1 && !hasSpoken) {
//           await fetchAndSpeakInfo(destination, "keyfeatures");
//           setHasSpoken(true);
//         }

//         if (distance < 0.02) {
//           await fetchAndSpeakInfo(destination, "story");
//           setDestination(null);
//           alert("You have arrived!");
//         }
//       },
//       (error) => console.error("Error tracking location:", error),
//       { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, [destination, prevLocation, hasSpoken]);

//   const fetchAndSpeakInfo = async (location, type) => {
//     try {
//       const response = await fetch(`${FLASK_API_URL}/get-info?lat=${location.lat}&lng=${location.lng}&type=${type}`);
//       const data = await response.json();

//       if (data && data.text) {
//         speakText(data.text);
//       }
//     } catch (error) {
//       console.error("Error fetching information:", error);
//     }
//   };

//   const speakText = (text) => {
//     const params = {
//       OutputFormat: "mp3",
//       Text: text,
//       VoiceId: "Ivy",
//       Engine: "neural",
//     };

//     polly.synthesizeSpeech(params, (err, data) => {
//       if (err) console.error("Polly Error:", err);
//       else {
//         const audioUrl = URL.createObjectURL(new Blob([data.AudioStream], { type: "audio/mpeg" }));
//         const audio = new Audio(audioUrl);
//         audio.play();
//       }
//     });
//   };

//   const updateDirection = (prev, current) => {
//     const dx = current.lng - prev.lng;
//     const dy = prev.lat - current.lat; 

//     let newDirection = "face-down";
//     const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//     if (angle >= -22.5 && angle < 22.5) newDirection = "face-right";
//     else if (angle >= 22.5 && angle < 67.5) newDirection = "face-right-down";
//     else if (angle >= 67.5 && angle < 112.5) newDirection = "face-down";
//     else if (angle >= 112.5 && angle < 157.5) newDirection = "face-left-down";
//     else if (angle >= 157.5 || angle < -157.5) newDirection = "face-left";
//     else if (angle >= -157.5 && angle < -112.5) newDirection = "face-left-up";
//     else if (angle >= -112.5 && angle < -67.5) newDirection = "face-up";
//     else if (angle >= -67.5 && angle < -22.5) newDirection = "face-right-up";

//     setDirection(newDirection);
//   };

//   return (
//     <LoadScriptNext googleMapsApiKey={API_KEY} libraries={libraries}>
//       <div className="h-3/4 flex items-center justify-center relative mt-24">
//         <div className="absolute top-0 right-0 z-10">
//           <SOSButton/>
//         </div>
//         <div className="w-[90%] h-full rounded-2xl overflow-hidden shadow-lg">
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "500px" }}
//             center={source || defaultCenter}
//             zoom={12}
//             onLoad={(map) => setMap(map)}
//             options={{
//               fullscreenControl: false,
//               mapTypeControl: false,
//               streetViewControl: false,
//               mapId: MAP_ID,
//             }}
//           >
//             {destination && <Marker position={destination} />}
//             <Polyline path={path} options={{ strokeColor: "#FF0000", strokeWeight: 4 }} />
//             <OverlayView position={source} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
//               <div style={{ transform: "translate(-50%, -85%)", position: "absolute", zIndex: 100 }}>
//                 <Character direction={direction} />
//               </div>
//             </OverlayView>
//           </GoogleMap>
//         </div>
//       </div>
//     </LoadScriptNext>
//   );
// };

// export default MapComponent;
