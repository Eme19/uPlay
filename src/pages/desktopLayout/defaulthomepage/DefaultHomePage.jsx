import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './DefaultHomePage.css'; 
import logo3 from '../../../assets/logo1.png';
import Navbar from "../defaulthomepage/defaultnavbar/DefaultNavbar"
import Footer from "../defaulthomepage/defaultfooter/DefaultFooter"

function DefaultHomePage() {
  const [url] = useState('https://u-play.vercel.app');

  return (

    <div>
      <Navbar/>
 <div className='text-black main-container'>
      <div className="qr-code-container">
        <QRCodeSVG
          value={url}
          size={236}
          imageSettings={{
            src: logo3, 
            height: 35, 
            width: 50,
            x: 100, 
            y: 100,
            excavate: true,
          }}
        />

      </div>
    </div>

    <div className='text-center text-6xl pt-10 text-stone-200 custm-qr-stylin'>
    <h1>Experience the Best Music</h1>
    <p>Scan the QR code to enjoy our web app on your mobile device</p>
        </div>


        <Footer/>
    </div>
   
  );
}

export default DefaultHomePage;
