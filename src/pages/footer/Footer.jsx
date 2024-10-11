import React, { useEffect, useState } from "react";
import {
  PlayCircleOutlined,
  CompassOutlined,
  AudioOutlined,
  BookOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledUp = window.scrollY > 0;
      setScrollUp(isScrolledUp);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`${scrollUp ? "transparent-bg " : ""}mobile-none`}>
      <div className=" capitalize flex justify-between cursor-pointer custm-styl-foter text-center">
        <div className=" custon-color-foter">
          <a href="#">
            <div>
              <PlayCircleOutlined className="text-2xl" />{" "}
            </div>
            <div className="text-sm custm-ty">Listen Now</div>
          </a>
        </div>

        <div className="custon-color-foter">
          <a href="#">
            <div>
              <AudioOutlined className="text-2xl" />{" "}
            </div>
            <div className="text-sm">Live</div>
          </a>
        </div>

        <div className=" custon-color-foter">
          <a href="#">
            <div>
              <CompassOutlined className="text-2xl" />{" "}
            </div>
            <div className="text-sm">Browser</div>
          </a>
        </div>

        <div className="custon-color-foter">
          <a href="/">
            <div>
              <BookOutlined className="text-2xl" />{" "}
            </div>
            <div className="text-sm">Library</div>
          </a>
        </div>

        <div className="custon-color-foter">
          <a href="/all/search/">
            <div>
              <SearchOutlined className="text-2xl " />{" "}
            </div>
            <div className="text-sm ">Search</div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
