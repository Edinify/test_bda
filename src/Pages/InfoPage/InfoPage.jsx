import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import { IoMail } from "react-icons/io5";

import Logo from "../../assets/logo/logo.jpg";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const InfoPage = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <header className="info-header">
          <div className="info-logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="connect">
            <ul className="social-links">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="icon facebook-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagramSquare className="icon instagram-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="icon linkedin-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="icon tiktok-icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="icon youtube-icon" />
                </a>
              </li>
            </ul>

            <div className="contact">
              <div className="phone">
                <a href="tel:+1234567890">
                  <FaPhoneAlt className="icon" />
                </a>
                <span>(+994) 50 290 61 21</span>
              </div>
              <div className="email">
                <a href="tel:+1234567890">
                  <IoMail className="icon" />
                </a>
                <span>info@innab.org</span>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default InfoPage;
