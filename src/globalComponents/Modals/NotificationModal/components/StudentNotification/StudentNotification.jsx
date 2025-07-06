import notificationAlert from "../../../../../assets/icons/notification/notification-bell.svg?react";
import updatedTableImg from "../../../../../assets/icons/table-updated-img.svg?react";
import timeNotImg from "../../../../../assets/icons/timeNotImg.svg?react";
import { useSelector } from "react-redux";
import "moment/locale/az";
import NotificationLoading from "../../../../Loading/components/NotificationLoading/NotificationLoading";
import BackIcon  from "../../../../../assets/icons/back-icon.svg?react";
import { useEffect } from "react";
const StudentNotification = ({ openNotModal, setOpenNotModal }) => {
  const { notifications } = useSelector((state) => state.notifications);
  const { loading } = useSelector((state) => state.notifications);

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
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((notification) => {
                  if (notification?.isViewedStudent === false) {
                    return (
                      <div
                        key={notification._id}
                        className="new-content-container"
                      >
                        <div className="container-about">
                          <div className="new-not-img">
                            {notification.role === "update-table" ? (
                              <img src={updatedTableImg} alt="/updated" />
                            ) : (
                              <img src={timeNotImg} alt="/time" />
                            )}
                          </div>
                          <div className="new-not-content">
                            {notification.role === "update-table" ? (
                              <h4>Cədvəl yeniləndi</h4>
                            ) : (
                              <h4>Dərs sayı</h4>
                            )}
                            <span>
                              {notification.role === "update-table"
                                ? "Sizin cədvəliniz yeniləndi"
                                : "Dərsiniz bitti"}
                            </span>
                          </div>
                        </div>
                        <div className="new-time">
                          <span className="notif-time">
                            {formatDate(new Date(notification?.createdAt))}
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
              {notifications.map((notification) => {
                if (notification?.isViewedStudent === true) {
                  return notification.student === null ? (
                    ""
                  ) : (
                    <div
                      key={notification._id}
                      className="prev-content-container"
                    >
                      <div className="container-about">
                        <div className="prev-not-img">
                          {notification.role === "update-table" ? (
                            <img src={updatedTableImg} alt="/updated" />
                          ) : (
                            <img src={timeNotImg} alt="/time" />
                          )}
                        </div>
                        <div className="prev-not-content">
                          {notification.role === "update-table" ? (
                            <h4>Cədvəl yeniləndi</h4>
                          ) : (
                            <h4>Dərs sayı</h4>
                          )}
                          <span>
                            {notification.role === "update-table"
                              ? "Sizin cədvəliniz yeniləndi"
                              : "Dərsiniz bitti"}
                          </span>
                        </div>
                      </div>
                      <div className="prev-time">
                        <span className="notif-time">
                          {formatDate(new Date(notification?.createdAt))}
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

export default StudentNotification;
