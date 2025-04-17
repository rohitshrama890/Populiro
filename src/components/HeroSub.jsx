import React, { useRef } from "react";
import { Search, Bell, Grid, Home, MapPin, User } from "lucide-react";
import { TbBellFilled } from "react-icons/tb";

const HeroSub = () => {
  const destinations = [
    { name: "Tara Devi Temple", location: "Shimla, H.P.", path: "./shimla_img/s1.png"},
    { name: "Kali Ka Tibba", location: "Shimla, H.P.", path: "./shimla_img/s4.png"},
    { name: "Jakhu Temple", location: "Shimla, H.P.", path: "./shimla_img/s6.png"},
    { name: "Shimla Water Catchment", location: "Shimla, H.P.", path: "./shimla_img/s7.png"},
    { name: "Bridge No. 541", location: "Shimla, H.P.", path: "./shimla_img/s9.png"},
    { name: "Tatapani", location: "Shimla, H.P.", path: "./shimla_img/s11.png"},
    { name: "Chharabra", location: "Shimla, H.P.", path: "./shimla_img/s8.png"},
    { name: "Naldehra", location: "Shimla, H.P.", path: "./shimla_img/s10.png"},
  ];
  const topDestinations = [
    { name: "Bridge No. 541", location: "Shimla, H.P.", path: "./shimla_img/s9.png"},
    { name: "Tatapani", location: "Shimla, H.P.", path: "./shimla_img/s11.png"},
    { name: "Chharabra", location: "Shimla, H.P.", path: "./shimla_img/s8.png"},
    { name: "Naldehra", location: "Shimla, H.P.", path: "./shimla_img/s10.png"},

  ];


  const recommendedScrollRef = useRef(null);
  const topDestinationScrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handlePointerDown = (e, ref) => {
    isDown = true;
    if (ref.current) {
      ref.current.style.cursor = "grabbing";
      startX = e.clientX || e.touches[0].clientX;
      scrollLeft = ref.current.scrollLeft;
    }
  };
  
  const handlePointerMove = (e, ref) => {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x = e.clientX || e.touches[0].clientX;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };
  
  const handlePointerLeave = (ref) => {
    isDown = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };
  
  const handlePointerUp = (ref) => {
    isDown = false;
    if (ref.current) ref.current.style.cursor = "grab";
  };
  

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden p-4">
      {/* Header */}
      {/* <div className="p-5 flex flex-row justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-gray-500 text-sm">Welcome</p>
            <p className="text-lg font-semibold">Hiro</p>
          </div>
        </div>
        <TbBellFilled className="text-gray-400 text-4xl"/>

      </div> */}

      {/* Search Bar */}
      {/* <div className="mt-4 flex flex-row justify-center items-center bg-white p-3 rounded-lg">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search Destination"
          className="ml-2 w-4/6 outline-none text-gray-600"
        />
        <span className="relative flex flex-col items-center justify-center w-12 h-12 bg-blue-500 rounded-[30%] p-1">
          <span className="w-2/5 flex justify-between items-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            <span className="w-2 h-0.5 bg-white rounded-full"></span>
            </span>
          <span className="w-2/5 flex justify-between items-center">
          <span className="w-2 h-0.5 bg-white rounded-full bottom-4"></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full bottom-4"></span>
          </span>
        </span>
      </div> */}

      {/* Recommended Section */}
      <div className="mt-6 p-4">
        <h2 className="ps-2 text-2xl font-bold">Recommended</h2>
        <div
          ref={recommendedScrollRef}
          className="mt-2 flex space-x-4 overflow-hidden cursor-grab touch-none select-none p-2 pt-6 pb-6"
          onMouseDown={(e) => handlePointerDown(e, recommendedScrollRef)}
          onMouseLeave={() => handlePointerLeave(recommendedScrollRef)}
          onMouseUp={() => handlePointerUp(recommendedScrollRef)}
          onMouseMove={(e) => handlePointerMove(e, recommendedScrollRef)}
          onTouchStart={(e) => handlePointerDown(e, recommendedScrollRef)}
          onTouchEnd={() => handlePointerUp(recommendedScrollRef)}
          onTouchMove={(e) => handlePointerMove(e, recommendedScrollRef)}
        >
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="w-56 bg-gray-100 flex-shrink-0 p-2 rounded-3xl
              hover:scale-110 hover:bg-GY-100 transition-transform duration-300"
            >
              <div className="w-full h-56 bg-gray-100 rounded-t-3xl p-2"
                            style={{
                              backgroundImage: `url(${destination.path})`, // Set background image for each item
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}>
              </div>
              <div className="hover:bg-GY-100 p-3 rounded-b-3xl">
                  <p className="font-semibold">{destination.name}</p>
                  <p className="text-sm text-gray-700">{destination.location}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Destinations */}
      <div className="mt-6 p-2">
        <h2 className="ps-2 text-xl font-bold">Top Destination</h2>
        <div
          ref={topDestinationScrollRef}
          className="mt-2 flex space-x-4 overflow-hidden cursor-grab touch-none select-none pt-2 pb-2"
          onMouseDown={(e) => handlePointerDown(e, topDestinationScrollRef)}
          onMouseLeave={() => handlePointerLeave(topDestinationScrollRef)}
          onMouseUp={() => handlePointerUp(topDestinationScrollRef)}
          onMouseMove={(e) => handlePointerMove(e, topDestinationScrollRef)}
          onTouchStart={(e) => handlePointerDown(e, topDestinationScrollRef)}
          onTouchEnd={() => handlePointerUp(topDestinationScrollRef)}
          onTouchMove={(e) => handlePointerMove(e, topDestinationScrollRef)}
        >
        {topDestinations.map((destination, index) => (
          <div key={index} className="min-w-max min-h-min flex items-center bg-gray-100 p-3 rounded-full
          hover:scale-110 transition-transform duration-300 hover:bg-GY-100">
            <div className="min-w-12 min-h-12 bg-gray-300 rounded-[30%]
            " style={{
              backgroundImage: `url(${destination.path})`, // Set background image for each item
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}></div>
            <div className="ps-3">            
              <p className="text-sm font-semibold">{destination.name}</p>
              <p className="text-xs text-gray-500">{destination.location}</p>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-white shadow-lg p-3 rounded-full flex flex-row justify-around">
        <Home className="text-blue-500" />
        <MapPin className="text-gray-500" />
        <User className="text-gray-500" />
      </div> */}
    </div>
  );
};

export default HeroSub;
