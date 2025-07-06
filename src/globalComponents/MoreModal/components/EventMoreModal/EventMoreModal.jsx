import React from "react";
import moment from "moment";
import "moment/locale/az";

const EventMoreModal = ({ eventsModalData }) => {
  // // console.log(eventsModalData, "event modal data");

  const purposes = [
    { key: "new-qrup", value: "Yeni qrup" },
    { key: "conversation", value: "Müzakirə" },
    { key: "meet-up", value: "Meet-up" },
    { key: "community", value: "Community görüşü" },
    { key: "meeting", value: "Tanışlıq" },
    { key: "thesis-defense", value: "Diplom müdafiəsi" },
  ];

  return (
    <>
      <div className="more-modal-work-inform">
        <div className="work-inform-con">
          <h3>
            Tədbir adı: <span>{eventsModalData?.eventName || ""}</span>
          </h3>
          <h3>
            Qonaq: <span>{eventsModalData?.visitor || ""}</span>
          </h3>
          <h3>
            Spiker: <span>{eventsModalData?.speaker || ""}</span>
          </h3>
          <h3>
            Məkan: <span>{eventsModalData?.place || ""} </span>
          </h3>
          <h3>
            Tarix
            <span>
              {eventsModalData?.date
                ? moment(eventsModalData?.date)
                    .locale("az")
                    .format("DD MMMM YYYY")
                : ""}
            </span>
          </h3>
          <h3>
            Saat: <span>{eventsModalData?.time || ""}</span>
          </h3>
          <h3>
            Hədəf kütlə: <span>{eventsModalData?.targetAudience || ""}</span>
          </h3>
          <h3>
            Məqsəd:{" "}
            <span>
              {eventsModalData?.purpose
                ? purposes.find((item) => item.key === eventsModalData.purpose)
                    .value
                : ""}
            </span>
          </h3>
          <h3>
            İştirakçı sayı:{" "}
            <span>{eventsModalData?.participantsCount || ""}</span>
          </h3>{" "}
          <h3>
            Büdcə: <span>{eventsModalData?.budget || ""}</span>
          </h3>{" "}
          <h3>
            Alınacaq:
            {(!eventsModalData?.products && "") || (
              <ul
                style={{
                  display: "block",
                  listStyle: "circle",
                  paddingLeft: "30px",
                  boxSizing: "border-box",
                }}
              >
                {eventsModalData.products.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </h3>{" "}
          <h3>
            Status:{" "}
            <span
              style={
                eventsModalData?.status
                  ? { color: "#07bc0c" }
                  : { color: "#704eff" }
              }
            >
              {eventsModalData?.status ? "Keçirilib" : "Gözləmədə"}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default EventMoreModal;
