import React, { useEffect, useState } from 'react';
import { PlayCircleOutlined, CompassOutlined, AudioOutlined, BookOutlined, SearchOutlined } from '@ant-design/icons';
import './Footer.css'; 

const Footer = () => {
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledUp = window.scrollY > 0;
      setScrollUp(isScrolledUp);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={scrollUp ? 'transparent-bg' : ''}>
      <div className='flex justify-between cursor-pointer custm-styl-foter text-center'>
        <div className='pt-2 custon-color-foter'><a href="#">
            <div><PlayCircleOutlined className='text-2xl'/> </div>
            <div className='text-sm custm-ty'>Listen Now</div>
          </a>
        </div>



        <div className='pt-2 custon-color-foter'><a href="#">
            <div><AudioOutlined  className='text-2xl'/> </div>
            <div  className='text-sm'>Live</div>
          </a>
        </div>

        <div className='pt-2 custon-color-foter'><a href="#">
            <div><CompassOutlined  className='text-2xl'/> </div>
            <div className='text-sm'>Browser</div>
          </a>
        </div>
       
        <div className='pt-2 custon-color-foter'><a href="#">
            <div><BookOutlined  className='text-2xl'/> </div>
            <div  className='text-sm'>Library</div>
          </a>
        </div>
  
        <div className='pt-2 custon-color-foter'><a href="#">
            <div><SearchOutlined  className='text-2xl '/> </div>
            <div  className='text-sm '>Search</div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
