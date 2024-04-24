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






// import React, { useEffect, useState } from 'react';
// import uplay from  '../../../assets/logo3.png';
// import "./Loading.css";

// const Loading = () => {
//   const [dotCount, setDotCount] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
    
//       setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 0));
//     }, 500); 

//     return () => clearInterval(interval); 
//   }, []);

//   return (
//     <div className="loading">
//       <div className="breathing-image">
//         <img src={uplay} alt="uplay"/>
//         <div className="loading-dots">
//           {[...Array(dotCount + 1)].map((_, index) => (
//             <div key={index} className="dot"></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loading;

