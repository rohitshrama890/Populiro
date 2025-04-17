import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import axios from "axios";
const navItems = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/" },
  { name: "Make The Plan", path: "/" },
  { name: "Himblazer", path: "/" },
];
const NavBar = () => {
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItemsRef = useRef([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          console.log("No email found, user not logged in.");
          return;
        }
  
        console.log("Fetching user data for email:", email);
  
        // ✅ Fetch fresh user data
        const response = await axios.get(`http://127.0.0.1:5000/profile?email=${email}`);
  
        console.log("User data received:", response.data);
  
        if (response.data) {
          const avatar = response.data.avatar || "default.png";
          console.log("Setting avatar to:", avatar);
          localStorage.setItem("avatar", avatar);
          setUser(response.data);
        }
  
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);
  
  useEffect(() => {
    // ✅ Ensure avatar updates when `user` changes
    if (user) {
      console.log("User state updated:", user);
      if (user.avatar) {
        console.log("Updating avatar in localStorage:", user.avatar);
        localStorage.setItem("avatar", user.avatar);
      }
    }
  }, [user]);
  

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setMobileMenuOpen(false); // Close dropdown when navbar disappears
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); // Close menu on larger screens
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto", // Let it grow dynamically
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
  
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0, // Shrinks smoothly
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div>
      <div
        ref={navContainerRef}
        className="fixed inset-x-6 top-4 z-50 h-16 border-none bg-black/30 backdrop-blur-sm transition-all duration-700 
        rounded-lg"
      >

        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-7">
              <img src="/img/poplogo-removebg-preview.png" alt="logo" className="w-16" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <Link key={index} to={item.path} className="nav-hover-btn">
                  {item.name}
                </Link>
              ))}
             <a href="/"  className="nav-hover-btn">Swachbharat</a>
            </div>

            {/* User Avatar or Login Button */}
            <div className="hidden md:flex items-center">
              {user ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <Link to="/">
                  <Button
                    id="product-button"
                    title="Login"
                    rightIcon={<TiLocationArrow />}
                    containerClass="bg-white flex items-center justify-center gap-1"
                  />
                </Link>
              )}
            </div>
            {/* <div className="hidden md:flex items-center">
              {user ? (
                <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
              ) : (
                <Link to="/auth">
                  <Button
                    id="product-button"
                    title="Login"
                    rightIcon={<TiLocationArrow />}
                    containerClass="bg-white md:flex hidden items-center justify-center gap-1"
                  />
                </Link>
              )}
            </div> */}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white text-2xl transition-transform duration-300 ease-in-out z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`${mobileMenuOpen ? "rotate-180" : "rotate-0"} transition-transform duration-500`}>
                {mobileMenuOpen ? <FiX /> : <FiMenu />}
              </span>
            </button>



          </nav>
        </header>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-x-6 top-20 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center z-40 overflow-hidden rounded-lg"
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              ref={(el) => (navItemsRef.current[index] = el)}
              to={item.path}
              className="text-white text-2xl p-2 opacity-0 nav-hover-bttn"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <Link to="/">
              <Button
                id="product-button"
                title="Login"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex items-center justify-center gap-1 mb-4 mt-2"
              />
            </Link>
          )}
        </div>
      )}

    </div>
  );
};

export default NavBar;
