import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DashboardIcon  from "../../../../assets/icons/dashboardIcon.svg?react";
import MainPanelIcon  from "../../../../assets/icons/mainPanelIcon.svg?react";
import CoursesIcon  from "../../../../assets/icons/coursesIcon.svg?react";
import TeachersIcon  from "../../../../assets/icons/teachersIcon.svg?react";
import StudentsIcon  from "../../../../assets/icons/studentsIcon.svg?react";
import TableIcon  from "../../../../assets/icons/tableIcon.svg?react";
import SalaryIcon  from "../../../../assets/icons/salaryIcon.svg";
import ExpensesIcon  from "../../../../assets/icons/expensenIcon.svg?react";
import SalesIcon  from "../../../../assets/icons/sidebar/sales.svg?react";
import IncomesIcon  from "../../../../assets/icons/incomesIcon.svg";
import FeedBacksIcon  from "../../../../assets/icons/sidebar/feedbacks-icon.svg";
import AdminIcon  from "../../../../assets/icons/sidebar/users-01.svg?react";
import GroupIcon  from "../../../../assets/icons/sidebar/group-svgrepo-com.svg?react";
import CareerIcon  from "../../../../assets/icons/sidebar/work-case-filled-svgrepo-com (1).svg?react";
import EventsIcon  from "../../../../assets/icons/sidebar/events.svg?react";
import SyllabusIcon  from "../../../../assets/icons/sidebar/syllabus-svgrepo-com.svg?react";
import DiplomaIcon  from "../../../../assets/icons/sidebar/diploma.svg?react";
import RoomIcon  from "../../../../assets/icons/room-icon.svg?react";
import ReportIcon  from "../../../../assets/icons/sidebar/report.svg?react";
import AdvertisingIcon  from "../../../../assets/icons/advertising.svg?react";

const SidebarSuperAdmin = ({ closeSidebar }) => {
  const location = useLocation();
  const groupsNav = ["/groups/current", "/groups/waiting", "/groups/ended"];

  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <DashboardIcon />
          İdarəetmə paneli
        </NavLink>
      </li>
      <li>
        <NavLink to="/report" onClick={closeSidebar}>
          <ReportIcon />
          Hesabatlar paneli
        </NavLink>
      </li>
      <li>
        <NavLink to="/lesson" onClick={closeSidebar} className="admin">
          <TableIcon />
          Cədvəl
        </NavLink>
      </li>
      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Təlimçilər
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" onClick={closeSidebar}>
          <CoursesIcon />
          Fənlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/syllabus" onClick={closeSidebar}>
          <SyllabusIcon />
          Sillabus
        </NavLink>
      </li>
      <li>
        <NavLink
          className={groupsNav.includes(location.pathname) ? "active" : ""}
          to="/groups/waiting"
          onClick={closeSidebar}
        >
          <GroupIcon />
          Qruplar
        </NavLink>
      </li>
      <li>
        <NavLink to="/room" onClick={closeSidebar}>
          <RoomIcon />
          Otaqlar
        </NavLink>
      </li>
      <li>
        <NavLink to="/tuition-fee" onClick={closeSidebar}>
          <ExpensesIcon />
          Təhsil haqqı
        </NavLink>
      </li>
      <li>
        <NavLink to="/career" onClick={closeSidebar}>
          <CareerIcon />
          Karyera
        </NavLink>
      </li>
      <li>
        <NavLink to="/consultation" onClick={closeSidebar}>
          <MainPanelIcon />
          Konsultasiya
        </NavLink>
      </li>
      <li>
        <NavLink to="/sales" onClick={closeSidebar}>
          <SalesIcon />
          Satış
        </NavLink>
      </li>

      <li>
        <NavLink to="/event" onClick={closeSidebar}>
          <EventsIcon />
          Tədbirlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/workers" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Əməkdaşlar
        </NavLink>
      </li>
      <li>
        <NavLink to="/diploma" onClick={closeSidebar}>
          <DiplomaIcon />
          Diplom cədvəli
        </NavLink>
      </li>
      <li>
        <NavLink to="/whereHeard" onClick={closeSidebar}>
          <AdvertisingIcon />
          Reklam növləri
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarSuperAdmin;
