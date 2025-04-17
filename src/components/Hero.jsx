import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useState } from "react";
import Button from "./Button";
import ImagePreview from "./ImagePreview";
import HeroSub from "./HeroSub";
import { Link } from "react-router-dom";
// import '@fontsource/alegreya/700.css'; // For bold headings

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const totalImages = 4;

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleMiniImgClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalImages) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-image", { visibility: "visible" });
        gsap.to("#next-image", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
        });
        gsap.from("#current-image", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#image-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getImageSrc = (index) => `images/hero-${index}.jpg`;

  return (
    <>
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-white">
          <div className="loader">
          </div>
        </div>
      )}

    <div id="image-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-white">
        <div>
          <img
            src="/images/hero-4.jpg"
            alt="Current Image"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white">
          PO<b>PU</b>LIRO
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-white">
              tour <b>wi</b>th
            </h1>

            <p className="mb-5 max-w-72 font-robert-regular text-white">
              Embark on an interactive journey where<br /> exploration meets a gamified adventure!
            </p>
            <Link to="/">
              <Button
                id="product-button"
                title="Let's Start"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex items-center justify-center gap-1 mb-4 mt-2"
              />
            </Link>
          </div>
        </div>
      </div>


      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        PO<b>PU</b>LIRO
      </h1>
    </div>
    <HeroSub/>
    </>
  );
};

export default Hero;
