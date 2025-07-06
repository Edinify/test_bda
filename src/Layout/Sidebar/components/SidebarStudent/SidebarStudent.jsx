import React from "react";
import { Link, useLocation } from "react-router-dom";
import  TableIcon  from "../../../../assets/icons/tableIcon.svg?react";

const SidebarStudent = ({ closeSidebar }) => {
  const location = useLocation();
  return (
    <ul className="sidebar-nav-list">
      <li>
        <Link
          onClick={closeSidebar}
          to="/student-panel"
          className={location.pathname === "/student-panel" ? "active" : ""}
        >
          <TableIcon />
          Cədvəl
        </Link>
      </li>
    </ul>
  );
};

export default SidebarStudent;
