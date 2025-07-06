import React from "react";
// import { ReactComponent as LogoTabletIcon } from "../../assets/icons/sidebar/Logo-tablet.svg";
// import { ReactComponent as LogoTabletIcon } from "../../assets/icons/logo/bdaLogoMoba.svg";
import bdaLogo from "../../assets/icons/logo/bdaLogo.png";
import { useSelector, useDispatch } from "react-redux";
import SidebarSuperAdmin from "./components/SidebarSuperAdmin/SidebarSuperAdmin";
import SidebarTeacher from "./components/SidebarTeacher/SidebarTeacher";
import { SIDEBAR_ACTION_TYPE } from "../../redux/actions-type";
import SidebarHead from "./components/SidebarHead/SidebarHead";
import SidebarWorkers from "./components/SidebarWorkers/SidebarWorkers";
import { profileGetImage } from "../../redux/actions/profileImageAction";
import SidebarStudent from "./components/SidebarStudent/SidebarStudent";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { openSidebar } = useSelector((state) => state.openSidebar);
  const userData = JSON.parse(localStorage.getItem("userData"));



  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: false });
  };
  const openFullSidebar = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: true });
  };
  return (
    <div className={`main-sidebar ${openSidebar ? "active" : ""}`}>
      <div className="main-sidebar-con">
        <div className="main-sidebar-con-con">
          <SidebarHead closeSidebar={closeSidebar} />

          <div className="sidebar-head-tablet">
            <img src={bdaLogo} alt="/" onClick={openFullSidebar} />
            {/* <LogoTabletIcon/> */}
            {/* <BDALogo onClick={openFullSidebar} /> */}
          </div>

          {userData?.role === "super-admin" && (
            <SidebarSuperAdmin closeSidebar={closeSidebar} />
          )}
          {userData?.role === "teacher" && (
            <SidebarTeacher closeSidebar={closeSidebar} />
          )}
          {userData?.role === "mentor" && (
            <SidebarTeacher closeSidebar={closeSidebar} />
          )}
          {userData?.role === "worker" && (
            <SidebarWorkers
              closeSidebar={closeSidebar}
              profiles={userData.profiles}
            />
          )}
          {userData?.role === "student" && (
            <SidebarStudent closeSidebar={closeSidebar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
