import React from "react";
import uplay from "../../../assets/logo3.png";
import "./LayoutLoading.css";

const LayoutLoading = () => {
  return (
    <div className="loading">
      <div className="breathing-image-dsktop">
        <img src={uplay} alt="uplay" />
      </div>
    </div>
  );
};

export default LayoutLoading;
