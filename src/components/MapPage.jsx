import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapComponent from "./MapComponent"
import Openslide from "./OptionSlide";
const MapPage = () => {
  const [info, setInfo] = useState({ history: '', features: '', precautions: '', story: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://7167-110-224-72-216.ngrok-free.app/get_story?place_name=8', {
          headers: { "ngrok-skip-browser-warning": "true" } // Bypass ngrok warning
        });

        console.log("API Response:", response.data); // Debugging: Check API response in console

        if (!response.data) {
          throw new Error("Empty response from server");
        }

        setInfo({
          history: response.data["History"] || 'No history available.',
          features: response.data["Key Features"] || 'No key features available.',
          precautions: response.data["Precautions"] || 'No precautions available.',
          story: response.data["Generated Story"] || 'No story available.'
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-blue-300">
            <video 
          className="absolute top-0 left-0 w-full h-full object-cover z-0" 
          autoPlay 
          loop 
          muted
        >
          <source src="./videos/gamebg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
            {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div className='pt-20 relative z-20'>
        <div className='bg-green-400 rounded-2xl w-[50%] h-[40%] flex justify-center items-center mx-auto border-r-8 border-b-8 border-yellow-800'>
          <h1 className="special-f text-white text-center text-[5vw] max-w-full">
            Himblazer
          </h1>
        </div>

      <MapComponent/>
      <Openslide/>
      </div>
      {/* {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className='p-4 bg-gray-100 rounded-lg shadow-md mt-4'>
          <h2 className='text-lg font-bold'>History</h2>
          <p>{info.history}</p>
          <h2 className='text-lg font-bold mt-2'>Key Features</h2>
          <p>{info.features}</p>
          <h2 className='text-lg font-bold mt-2'>Precautions</h2>
          <p>{info.precautions}</p>
          <h2 className='text-lg font-bold mt-2'>Generated Story</h2>
          <p>{info.story}</p>
        </div>
      )} */}
    </div>
  );
};

export default MapPage;
