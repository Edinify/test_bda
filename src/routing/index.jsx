import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Login } from "../Pages/LoginPage/LoginPage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
// import { profileGetImage } from "../redux/actions/profileImageAction";
import { Header } from "../Layout/Header/Header";
import LoginRoute from "./LoginRoute";

import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Sidebar from "../Layout/Sidebar/Sidebar";
import SuperAdminPanelRoute from "./SuperAdminPanelRoute";
import WorkerPanelRoute from "./WorkerPanelRoute";
import TeacherPanelRoute from "./TeacherPanelRoute";
// import TeacherPanelRoute from "./TeacherPanelRoute";
import StudentPanelRoute from "./StudentPanelRoute";
import { useCustomHook } from "../globalComponents/GlobalFunctions/globalFunctions";
import InfoPanelRoute from "./InfoRoute";
import InfoPage from "../Pages/InfoPage/InfoPage";

export const Routing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const { generalProfileList } = useCustomHook();

  //
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const forgetPassword = useSelector((state) => state.forgetPassword);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("auth");

  // console.log(userData,"user dataaaa")

  // console.log(user, "userrrrrrr");
  // console.log(userData, "userrrr dataaaaaaaaa");

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/info");
    }
    if (token) {
      if (!user._id) {
        dispatch(userAction());
      } else if (user.role === "super-admin" && !notFound) {
        // console.log(location.pathname);
        if (
          location.pathname.startsWith("/login") ||
          location.pathname === "/"
        ) {
          navigate("/dashboard");
        }
      } else if (
        (user.role === "teacher" || user.role === "mentor") &&
        !notFound
      ) {
        if (location.pathname.startsWith("/login")) {
          navigate("/teacher-panel");
        }
      } else if (user.role === "student" && !notFound) {
        if (location.pathname.startsWith("/login")) {
          navigate("/student-panel");
        }
      } else if (user.role === "worker" && !notFound) {
        let profile;
        for (let profileItem of generalProfileList) {
          const checkProfile = user?.profiles.find(
            (item) => item.profile === profileItem.key
          );
          if (checkProfile) {
            profile = profileItem.key;
            break;
          }
        }
        if (location.pathname.startsWith("/login")) {
          switch (profile) {
            case "dashboard":
              navigate("/dashboard");
              break;
            case "tuitionFee":
              navigate("/tuitionFee");
              break;
            case "students":
              navigate("/students");
              break;
            case "courses":
              navigate("/courses");
              break;
            case "teachers":
              navigate("/teachers");
              break;
            case "consultation":
              navigate("/consultation");
              break;
            case "groups":
              navigate("/groups/current");
              break;
            case "career":
              navigate("/career");
              break;
            case "syllabus":
              navigate("/syllabus");
              break;
            case "lessonTable":
              navigate("/lessonTable");
              break;
            case "events":
              navigate("/events");
              break;
            default:
              navigate("/not-found");
              break;
          }
        }
      }
    } else if (forgetPassword.login) {
      // // console.log(6);
      navigate("/login");
    } else {
      if (forgetPassword.email) {
        // // console.log(7);
        navigate("/forget");
      } else if (forgetPassword.otp) {
        // // console.log(8);
        navigate("/send");
      } else if (forgetPassword.changePassword) {
        // // console.log(9);
        navigate("/change");
      }
    }
  }, [auth, user, forgetPassword]);

  // // console.log(location.pathname, "pathname");
  return (
    <div className={userData ? "main-container" : ""}>
      {userData && <Sidebar />}
      <div className="left">
        {userData && <Header />}

        <Routes>
          <Route path="/info" element={<InfoPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={<NotFoundPage setNotFound={setNotFound} />}
          />
          {LoginRoute()}
          {InfoPanelRoute()}
          {userData?.role === "super-admin" && SuperAdminPanelRoute()}
          {/* {userData?.role === "admin" && AdminPanelRoute()} */}
          {(userData?.role === "teacher" || userData?.role === "mentor") &&
            TeacherPanelRoute()}
          {user?.role === "worker" && WorkerPanelRoute(user)}
          {user?.role === "student" && StudentPanelRoute(user)}
        </Routes>
      </div>
    </div>
  );
};
