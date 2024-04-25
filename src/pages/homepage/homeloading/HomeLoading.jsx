import React from 'react';
import uplay from  '../../../assets/logo3.png';
import "./Loading.css"

const Loading = () => {
  return (
    <div className="loading">
      <div className="breathing-image">
        <img src={uplay} alt="uplay"/>
      </div>
    </div>
  );
};

export default Loading;




