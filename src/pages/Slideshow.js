import "./Slideshow.css";
import React, { useState, useEffect, useRef } from "react";
import kanye1 from "../assets/kanye1.png";
import beli from "../assets/beli.png";
import jayz from "../assets/jayz.png";
import kanye from "../assets/sweetboyye.png";

import beli1 from "../assets/beli1.png";

const images = [jayz, kanye];

const Slideshow = () => {
  const [counter, setCounter] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSlideWidth(canvasRef.current.clientWidth);
  }, []);

  const handleTransitionEnd = () => {
    if (counter === images.length) {
      setCounter(0);
    } else if (counter === -1) {
      setCounter(images.length - 1);
    }
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, slideWidth, canvasRef.current.clientHeight); // Clear canvas before drawing
    const img = new Image();
    img.onload = () => {
      context.drawImage(
        img,
        1,
        1,
        slideWidth - 2,
        canvasRef.current.clientHeight - 2
      ); // Adjusted to render inside the border
    };
    img.src = images[counter];
  }, [counter, slideWidth]);

  return (
    <div className="slideshow-container">
      <div className="canvas-container">
        <canvas ref={canvasRef} onTransitionEnd={handleTransitionEnd} />
      </div>
    </div>
  );
};

export default Slideshow;
