import timeNotImg from "../../../../../assets/icons/timeNotImg.svg?react";
import birthdayNotImg from "../../../../../assets/icons/birthdayNot.svg?react";
import notificationAlert from "../../../../../assets/icons/notification/notification-bell.svg?react";
import BackIcon  from "../../../../../assets/icons/back-icon.svg?react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/az";
import NotificationLoading from "../../../../Loading/components/NotificationLoading/NotificationLoading";
import { useEffect } from "react";
const SuperAdminNotification = ({
  openNotModal,
  setOpenNotModal,
  setChangeNotificationIcon,
  setNewNotification,
}) => {
  const { notifications } = useSelector((state) => state.notifications);
  const { loading } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.user);

  const a = notifications.map((notif) =>
    notif.recipients.find((a) => a._id === user._id)
  );

  console.log(a, "aaaa");

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Baku",
    };

    return new Intl.DateTimeFormat("az-AZ", options).format(new Date(date));
  };

  useEffect(() => {
    if (openNotModal && window.innerWidth <= 500) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openNotModal]);

  useEffect(() => {
    setNewNotification(false);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`notification-modal ${openNotModal ? "active" : ""}`}
    >
      <div className="not-mobile-container-header">
        <BackIcon
          onClick={() => {
            setOpenNotModal(false);
            setChangeNotificationIcon(false);
          }}
        />
        <h2>Bildiriş</h2>
      </div>

      {loading ? (
        <NotificationLoading />
      ) : notifications.length === 0 ? (
        <div className="empty-not">
          <div className="empty-content">
            <img src={notificationAlert} alt="" />
            <h2>Heç bir bildiriş yoxdur.</h2>
          </div>
        </div>
      ) : (
        <div>
          <div className="new-notification">
            <h2>Yeni</h2>
            <div className="new-content">
              {notifications
                .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
                .map((notification) => {
                  if (
                    notification?.recipients?.find(
                      (item) => item.user === user._id
                    )?.viewed === false
                  ) {
                    return (
                      <div
                        key={notification._id}
                        className="new-content-container"
                      >
                        <div className="container-about">
                          <div className="new-not-img">
                            <img src={timeNotImg} alt="/lessonAmount" />
                          </div>
                          <div className="new-not-content">
                            <h4>Tədbir</h4>
                            <span>{notification.message}</span>
                          </div>
                        </div>
                        <div className="new-time">
                          <span className="notif-time">
                            {formatDate(notification?.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
          <div className="prev-notification">
            <h2>Əvvəlkilər</h2>
            <div className="prev-content">
              {notifications?.map((notification) => {
                if (
                  notification?.recipients.find(
                    (item) => item.user === user._id
                  )?.viewed === true
                ) {
                  return notification.student === null ? (
                    ""
                  ) : (
                    <div
                      key={notification._id}
                      className="prev-content-container"
                    >
                      <div className="container-about">
                        <div className="prev-not-img">
                          <img src={timeNotImg} alt="/birthday" />
                        </div>
                        <div className="prev-not-content">
                          <h4>Tədbir</h4>
                          <span>{notification?.message}</span>
                        </div>
                      </div>
                      <div className="prev-time">
                        <span className="notif-time">
                          {formatDate(notification?.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminNotification;
