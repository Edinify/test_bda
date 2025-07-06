import React from "react";
import { Link, useLocation } from "react-router-dom";
import  TableIcon  from "../../../../assets/icons/tableIcon.svg?react";
import  EventsIcon  from "../../../../assets/icons/sidebar/events.svg?react";
import  HomeIcon  from "../../../../assets/icons/teacherHome/teacher-home.svg?react";

const SidebarTeacher = ({ closeSidebar }) => {
  const location = useLocation();
  return (
    <ul className="sidebar-nav-list">
      {/* <li>
        <Link
          onClick={closeSidebar}
          to="/teacher-panel/home"
          className={
            location.pathname === "/teacher-panel/home" ? "active" : ""
          }
        >
          <HomeIcon />
          Home
        </Link>
      </li> */}
      <li>
        <Link
          onClick={closeSidebar}
          to="/teacher-panel"
          className={location.pathname === "/teacher-panel" ? "active" : ""}
        >
          <TableIcon />
          Cədvəl
        </Link>
      </li>
      <li>
        <Link
          to="/event"
          onClick={closeSidebar}
          className={location.pathname === "/event" ? "active" : ""}
        >
          <EventsIcon />
          Tədbirlər
        </Link>
      </li>
    </ul>
  );
};

export default SidebarTeacher;
