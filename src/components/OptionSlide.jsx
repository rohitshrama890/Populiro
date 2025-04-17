import React, { useState } from "react";
import Destination from "./Destination";

const OptionSlide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionClick = async (option) => {
    const response = await fetch("http://localhost:5000/select_option", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="relative h-screen">
      {/* Button to open slide-up */}
      <div className="fixed bottom-10 left-0 right-0 flex justify-center">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg"
        >
          What’s Next?
        </button>
      </div>

      {/* Slide-up container */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-3xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: '50%' }}
      >
        {/* Drag Handle */}
        <div
          className="w-16 h-1.5 bg-gray-400 rounded-full mx-auto mt-3 cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Options */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">What would you like to do next?</h2>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleOptionClick("next_destination")}
              className="w-full px-6 py-3 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
            >
              Next Destination
            </button>
            <button
              onClick={() => handleOptionClick("eat")}
              className="w-full px-6 py-3 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500 transition"
            >
              Eat (Nearby Hotels)
            </button>
            <button
              onClick={() => handleOptionClick("rest")}
              className="w-full px-6 py-3 bg-green-400 text-white rounded-lg shadow-md hover:bg-green-500 transition"
            >
              Rest
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-4 bg-gray-100 p-3 rounded-lg">
              {result.message ? (
                <p className="text-gray-700">{result.message}</p>
              ) : (
                <ul className="space-y-2">
                  {result.hotels?.map((hotel, index) => (
                    <li key={index} className="flex justify-between border-b border-gray-300 py-2">
                      <span className="text-gray-800 font-medium">{hotel.name}</span>
                      <span className="text-gray-600 text-sm">
                        {hotel.distance} • ⭐ {hotel.rating}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionSlide;
