import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './DefaultHomePage.css'; 

function DefaultHomePage() {
  const [url] = useState('https://u-play.vercel.app');

  return (
    <div className='text-black' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Scan QR Code to Open on Your Phone</h1>
      <div className="qr-code-container">
        <QRCodeSVG
          value={url}
          size={256}
          imageSettings={{
            src: "/logo.png",
            x: undefined,
            y: undefined,
            height: 64,
            width: 64,
            excavate: true,
          }}
        />
      </div>
    </div>
  );
}

export default DefaultHomePage;
