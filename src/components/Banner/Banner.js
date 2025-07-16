import React, { useEffect, useState } from "react";
import "./Banner.css";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="banner">
      <div
        className="banner__image"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {!imageError ? (
          <img
            src="/banner-bg.jpg"
            alt="Banner Background"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="banner__placeholder">
            <div className="banner__placeholder-content">
              <p>Banner Image</p>
              <small>Please add banner-bg.jpg to public folder</small>
            </div>
          </div>
        )}
        <div className="banner__overlay"></div>
      </div>

      <div
        className="banner__content"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="banner__title">Ideas</h1>
        <p className="banner__subtitle">Where all our great things begin</p>
      </div>

      <div className="banner__slope"></div>
    </div>
  );
};

export default Banner;
