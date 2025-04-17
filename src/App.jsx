import { Link } from "react-router-dom";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeroSub from "./components/HeroSub";
import MapComponent from "./components/MapComponent";

// import SwachhBharat from './components/SwachhBharat';
import Character from "./components/character";
import MapPage from "./components/MapPage";
import Auth from "./components/Auth";
import Destinations from "./components/Destination";
import MakethePlan from  "./components/MakethePlan";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Routes>
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/" element={<Hero />} />
        {/* <Route path="/Himblazer" element={<MapPage />} /> */}
        {/* <Route path="/Destinations" element={<Destinations />} /> */}
        {/* <Route path="/MakethePlan" element={<MakethePlan />} /> */}
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
