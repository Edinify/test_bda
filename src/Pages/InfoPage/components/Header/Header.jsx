import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="info-header-container">
      <nav className="info-navbar">
        <ul>
          <li>
            <NavLink to="/info/about">Haqqımızda</NavLink>
          </li>
          <li>
            <NavLink to="/info/activities">Fəaliyyət istiqamətləri</NavLink>
          </li>
          <li>
            <NavLink to="/info/publications">Nəşrlər</NavLink>
          </li>
          <li>
            <NavLink to="/info/news">Xəbərlər</NavLink>
          </li>
          <li>
            <NavLink to="/info/exam">Sınaq imtahanları</NavLink>
          </li>
          <li>
            <NavLink to="/info/contact">Əlaqə</NavLink>
          </li>

          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
