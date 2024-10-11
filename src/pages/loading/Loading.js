import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading">
      <div className="frame-image">
        <div className="loading-dots">
          {[...Array(dotCount + 1)].map((_, index) => (
            <div key={index} className="dot"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
