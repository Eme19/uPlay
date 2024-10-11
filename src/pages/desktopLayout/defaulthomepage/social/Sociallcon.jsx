import React from "react";
import "./SocialIcon.css";
import {
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import XIcon from "./XIcon";

const SocialIcon = () => (
  <div className="social-container pr-5">
    <div className="social-icons">
      <div className="social-icon-sty pr-10 ml-5">
        <a href="link-to-twitter" aria-label="Twitter">
          <XIcon />
        </a>
        <a
          href="link-to-facebook"
          className="facebk-style"
          aria-label="Facebook"
        >
          <FacebookOutlined />
        </a>
        <a
          href="https://www.linkedin.com/in/emeka-ngwu-83b940291/"
          className="link-styl-cl"
          aria-label="LinkedIn"
        >
          <LinkedinOutlined />
        </a>
        <a
          href="link-to-instagram"
          className="instgram-styl"
          aria-label="Instagram"
        >
          <InstagramOutlined />
        </a>
        <a
          href="link-to-youtube"
          className="hover-youtube"
          aria-label="YouTube"
        >
          <YoutubeOutlined />
        </a>
      </div>
      <div className="social-footer">
        {" "}
        &copy; {new Date().getFullYear()} | uPlay
      </div>
    </div>
  </div>
);

export default SocialIcon;
