import React, { useEffect, useState } from "react";
import scrollTopImg from "../../assets/top.png";
const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="w-12 h-12 md:w-14 md:h-14 bg-red-400 rounded-full fixed bottom-5 right-5 overflow-hidden cursor-pointer z-100"
        >
          <img
            src={scrollTopImg}
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
      )}
    </>
  );
};

export default ScrollTop;
