import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./headTabs.css";

const HeadTabs = ({
  firstRoute,
  secondRoute,
  thirdRoute,
  firstPathname,
  secondPathname,
  thirdPathname
}) => {
  const location = useLocation();
  return (
    <div className="global-head-tabs">
      <Link
        to={firstRoute}
        className={`${location.pathname === firstRoute ? "active" : ""}`}
      >
        {firstPathname}
      </Link>
      <Link
        to={secondRoute}
        className={`${location.pathname === secondRoute ? "active" : ""}`}
      >
        {secondPathname}
      </Link>
      <Link
        to={thirdRoute}
        className={`${location.pathname === thirdRoute ? "active" : ""}`}
      >
        {thirdPathname}
      </Link>
    </div>
  );
};

export default HeadTabs;
