import React from "react";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { CiPizza } from "react-icons/ci";


const Footer = () => {
  return (
    <div className=" bg-black text-white rounded-t-3xl mt-8 md:mt-0 select-none">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <div className="flex items-center">
            <div className="flex items-center gap-7">
              <img src="/img/poplogo-removebg-preview.png" alt="logo" className="w-16" />
            </div>
            <h1 className=" font-pacifico text-2xl select-none">Populiro</h1>
          </div>
          <p className=" text-sm select-none">
          “Embark on an interactive journey where<br /> exploration meets a gamified adventure!”
          </p>
        </div>
        <div className="flex justify-between w-1/4">
        <div>
          <h1 className=" font-general text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="custom-link"
            >
              Destinations
            </a>
            <a
              className="custom-link"
            >
              Make the Plan
            </a>
            <a
              className="custom-link"
            >
              Himblazer
            </a>
            <a
              className="custom-link"
            >
              Swachbharat
            </a>
          </nav>
        </div>
        {/* <div>
          <h1 className=" font-general text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="custom-link"
            >
              Our Dishes
            </a>
            <a
              className="custom-link"
            >
              Premium Menu
            </a>
          </nav>
        </div> */}
        <div>
          <h1 className=" font-general text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="custom-link"
            >
              populiro@email.com
            </a>
            {/* <a
              className="custom-link"
            >
              +91 958 248 9664
            </a> */}
            <div className="flex gap-2">
              <a
                className="custom-link"
              >
                <span>
                    <BsInstagram size={20} />
                </span>
              </a>
              <a
                className="custom-link"
              >
                <span>
                    <BsFacebook size={20} />
                </span>
              </a>
              <a
                className="custom-link"
              >
                <span>
                    <RiTwitterXFill size={20} />
                </span>
              </a>
              <a
                className="custom-link"
              >
                <span>
                    <BsWhatsapp size={20} />
                </span>
              </a>
            </div>
          </nav>
        </div>
        </div>
      </div>
      <div>
        <p>
          <p className=" text-center py-4 text-base">
            @copyright developed by
            <span className=" text-GY-100"> Kernel Boot</span> |
            All rights reserved
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
