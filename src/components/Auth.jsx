import { useState, useEffect , useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import gsap from "gsap";
import Character from "./character"
import { FiEye, FiEyeOff } from "react-icons/fi";
// Avatar & Pet Options
const avatars = [
  { id: 1, name: "Leo", img: "/avatars/boy1.png" },
  { id: 2, name: "Aiden", img: "/avatars/boy2.png" },
  { id: 3, name: "Maya", img: "/avatars/girl1.png" },
  { id: 4, name: "Ella", img: "/avatars/girl2.png" },
];

const pets = [
  { id: 1, name: "cat"},
  { id: 2, name: "rabbit"},
];

const Auth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [isLogin, setIsLogin] = useState(false);
  const containerRef = useRef(null);
  const [user, setUser] = useState(null);
  
  const [showPassword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    aadhaar: "",
    contact: "",
    emergency: "",
    avatar: "",
    avatarName: "",
    pet: "",
    petName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Updated Form Data:", formData);
  };


  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar: avatar.img, avatarName: avatar.name });
    console.log("Selected Avatar:", avatar);
  };

  const handlePetSelect = (pet) => {
    setFormData({ ...formData, pet: pet.name });
    console.log("Selected Pet:", pet);
  };
  
  

  const handleSignup = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/signup", formData);
      // alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email: formData.email,
        password: formData.password,
      });
  
      console.log("Full API Response:", response.data);
  
      if (response.data && response.data.user) {
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("token", response.data.token);
  
        // ✅ Fetch fresh user data after login
        const userResponse = await axios.get(
          `http://127.0.0.1:5000/profile?email=${response.data.user.email}`
        );
        
        if (userResponse.data) {
          localStorage.setItem("avatar", userResponse.data.avatar || "default.png");
        }
  
        console.log("User logged in:", response.data.user.email);
      } else {
        console.error("No user data received from API.");
      }
  
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        onComplete: () => navigate("/"),
      });
  
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  
  
  

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Social login error:", error.message);
    }
  };
  

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step, isLogin]);

  const goBack = () => {
    if (step === "avatar") setStep("form");
    else if (step === "pet") setStep("avatar");
    else if (step === "confirm") setStep("pet");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[70%] h-[700px] bg-white rounded-3xl flex items-center relative m-24 sm:p-20">
        <div ref={containerRef} className="bg-white p-8 rounded-2xl w-full mt-10 sm:w-96">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome<span className="text-GY-200"> to</span>  
        </h1>
        <h1 className="text-5xl font-extrabold text-GY-200 flex items-center gap-2">
          Populiro  
          <div className="bg-gray-800 p-2 rounded-full">
            <img src="/img/poplogo-removebg-preview.png" alt="Populiro Icon" className="w-10" />
          </div>

        </h1>


        <h2 className="mt-8 text-3xl font-bold text-center mb-6 text-GY-200">
          {isLogin ? "Login" : step === "form" ? "Sign Up" : step === "avatar" ? "Choose an Avatar" : step === "pet" ? "Choose a Pet" : "Confirm Details"}
        </h2>

        {/* Step 1: Login/Signup Form */}
        {step === "form" && (
          <>
            {!isLogin && (
              <>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"
                />

                <input type="text" name="aadhaar" placeholder="Aadhaar" value={formData.aadhaar} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
                <input type="text" name="contact" placeholder="Contact No." value={formData.contact} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
                <input type="text" name="emergency" placeholder="Emergency No." value={formData.emergency} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
              </>
            )}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
            {/* <input
              type={showPassword ? "text" : "password"} // Toggle between "text" & "password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                        focus:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300"
            /> */}

            {/* Password visibility toggle */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 pr-12 mb-2 border-2 bg-slate-200 rounded-lg outline-none 
                          focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"
              />
              
              {/* Password visibility toggle */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center justify-center h-full text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
            

            {isLogin ? (
              <>
              <button onClick={handleLogin} className="w-full bg-GY-200 text-white p-2 rounded-lg hover:bg-GY-300 transition duration-300 mt-2">Login</button>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button onClick={() => handleSocialLogin(new GoogleAuthProvider())} className="p-3 bg-slate-200 rounded-full">
                  <FaGoogle className="text-gray-500 text-2xl
                  hover:text-GY-300 transition duration-300" />
                </button>
                <button onClick={() => handleSocialLogin(new FacebookAuthProvider())} className="p-3 bg-slate-200 rounded-full">
                  <FaFacebook className="text-gray-500 text-2xl
                  hover:text-GY-300 transition duration-300" />
                </button>
              </div>
              </>
            ) : (
              <button
                onClick={() => {
                  if (
                    formData.name.trim() &&
                    formData.aadhaar.trim() &&
                    formData.contact.trim() &&
                    formData.emergency.trim() &&
                    formData.email.trim() &&
                    formData.password.trim()
                  ) {
                    setStep("avatar");
                  } else {
                    alert("Please fill all fields before proceeding.");
                  }
                }}
                className={`w-full p-2 rounded-lg transition duration-300 mt-2 ${
                  formData.name.trim() &&
                  formData.aadhaar.trim() &&
                  formData.contact.trim() &&
                  formData.emergency.trim() &&
                  formData.email.trim() &&
                  formData.password.trim()
                    ? "bg-GY-200 text-white hover:bg-GY-300"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next
              </button>

            )}
            
          </>
        )}

        {/* Step 2: Avatar Selection */}
        {step === "avatar" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {avatars.map((avatar) => (
                <div key={avatar.id} className={`p-2 border-2 rounded-lg cursor-pointer ${formData.avatar === avatar.img ? "border-GY-200" : "border-gray-300"}`} onClick={() => handleAvatarSelect(avatar)}>
                  <img src={avatar.img} alt={avatar.name} className="w-20 h-20 mx-auto"/>
                  <p className="text-center">{avatar.name}</p>
                </div>
              ))}
            </div>
            <input type="text" name="avatarName" placeholder="Enter Avatar Name" value={formData.avatarName} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 mt-2 border-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
            <div className="flex gap-20">
              <button onClick={goBack} className="w-full bg-slate-400 text-white p-2 rounded-lg hover:bg-slate-500 transition duration-300 mt-2">Back</button>
              <button
                onClick={() => {
                  if (formData.avatar.trim() && formData.avatarName.trim()) {
                    setStep("pet");
                  } else {
                    alert("Please select an avatar and enter its name.");
                  }
                }}
                className={`w-full p-2 rounded-lg transition duration-300 mt-2 ${
                  formData.avatar.trim() && formData.avatarName.trim()
                    ? "bg-GY-200 text-white hover:bg-GY-300"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next
              </button>

            </div>
          </>
        )}

        {/* Step 3: Pet Selection */}
        {step === "pet" && (
          <>
            <div className="grid grid-cols-3 gap-4 items">
              {pets.map((pet) => (
                <div
                  key={pet.name}
                  className={`p-2 border-2 rounded-lg cursor-pointer ${
                    formData.pet === pet.name ? "border-GY-200" : "border-gray-300"
                  }`}
                  onClick={() => handlePetSelect(pet)}
                >

                  <div className="flex justify-center items-center w-full">
                    <Character direction={'face-down'} name={pet.name}/>
                  </div>
                  <p className="text-center">{pet.name}</p>
                </div>
              ))}
            </div>
            <input type="text" name="petName" placeholder="Enter Pet Name" value={formData.petName} onChange={handleChange}                   required
                  className="w-full p-2 mb-2 border-2 mt-2 bg-slate-200 rounded-lg outline-none 
                            focus:border-GY-100 focus:ring-2 focus:ring-GY-200 focus:bg-white transition-all duration-300"/>
            <div className="flex gap-20">
              <button onClick={goBack} className="w-full bg-slate-400 text-white p-2 rounded-lg hover:bg-slate-500 transition duration-300 mt-2">Back</button>
              <button
                onClick={() => {
                  if (formData.pet.trim() && formData.petName.trim()) {
                    setStep("confirm");
                  } else {
                    alert("Please select a pet and enter its name.");
                  }
                }}


                className={`w-full p-2 rounded-lg transition duration-300 mt-2 ${
                  formData.pet?.trim() && formData.petName?.trim()
                    ? "bg-GY-200 text-white hover:bg-GY-300"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next
              </button>


            </div>
          </>
        )}

        {/* Step 4: Confirmation */}
        {step === "confirm" && (
          <>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Your Selection</h3>
              
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <img src={formData.avatar} alt="Avatar" className="w-24 h-24 border-4 rounded-full"/>
                <p className="mt-2 text-lg font-medium text-gray-700">{formData.avatarName}</p> {/* Avatar Name */}
              </div>

              {/* Pet Section */}
              <div className="flex flex-col items-center mt-4">
                <div className="w-24 h-24 border-4 rounded-full flex items-center justify-center ">
                  <Character direction={'face-down'} name={formData.pet}/>
                </div>
                <p className="mt-2 text-lg font-medium text-gray-700">{formData.petName}</p> {/* Pet Name */}
              </div>
            </div>

            <div className="flex gap-20">
              <button onClick={goBack} className="w-full bg-slate-400 text-white p-2 rounded-lg hover:bg-slate-500 transition duration-300 mt-2">Back</button>
              <button onClick={handleSignup} className="w-full bg-GY-200 text-white p-2 rounded-lg hover:bg-GY-300 transition duration-300 mt-2">Confirm</button>
            </div>
          </>
        )}


        {/* Social Login */}

        {/* Toggle Login/Signup */}
        {/* Toggle Between Login & Signup */}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-GY-200 cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin);
              setStep("form"); // ✅ Reset step when toggling login/signup
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        </div>
        <video className="hidden md:block w-[55%] h-[80%] rounded-2xl absolute -right-12 object-cover" autoPlay loop muted>
          <source src="/videos/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>



      </div>
    </div>
  );
};

export default Auth;
