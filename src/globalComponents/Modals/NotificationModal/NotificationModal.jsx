import React, { useEffect } from "react";
import "./notificationModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationsAdminAction,
  getNotificationsTeacherAction,
  getNotificationsStudentAction,
  viewedAllNotifications,
  getNotifications,
} from "../../../redux/actions/notificationsActions";
import "moment/locale/az";
import SuperAdminNotification from "./components/SuperAdminNotification/SuperAdminNotification";
// import AdminNotification from "./components/AdminNotification/AdminNotification";
// import TeacherNotification from "./components/TeacherNotification/TeacherNotification";
// import StudentNotification from "./components/StudentNotification/StudentNotification";

const NotificationModal = ({
  openNotModal,
  setOpenNotModal,
  setChangeNotificationIcon,
  setNewNotification,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token && openNotModal) {
      dispatch(getNotifications());
    }
  }, [user, openNotModal, dispatch]);

  useEffect(() => {
    dispatch(viewedAllNotifications());
    setNewNotification(false);
  }, []);

  console.log(user.role, "user roleeeeeeeeeee");
  return (
    <>
      {/* {user.role === "admin" && (
        <AdminNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
          setNewNotification={setNewNotification}
        />
      )} */}

      {user.role !== "student" && (
        <SuperAdminNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
          setNewNotification={setNewNotification}
        />
      )}
      {/* {user.role === "teacher" && (
        <TeacherNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )}

      {user.role === "student" && (
        <StudentNotification
          openNotModal={openNotModal}
          setOpenNotModal={setOpenNotModal}
          setChangeNotificationIcon={setChangeNotificationIcon}
        />
      )} */}
    </>
  );
};

export default NotificationModal;
