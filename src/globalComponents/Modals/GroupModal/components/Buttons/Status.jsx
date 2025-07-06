import React from "react";

const Status = ({ modalData, updateModalState }) => {
  const getStatus = (status) => {
    updateModalState("status", status);
  };

  return (
    <ul className="modal-status group-status ">
      <li
        className={`${modalData.status === "current" ? "active" : ""}`}
        onClick={() => getStatus("current")}
      >
        Mövcud
      </li>
      <li
        className={`${modalData.status === "waiting" ? "active" : ""}`}
        onClick={() => getStatus("waiting")}
      >
        Yığılan
      </li>
      <li
        className={`${modalData.status === "ended" ? "active" : ""}`}
        onClick={() => getStatus("ended")}
      >
        Bitmiş
      </li>
    </ul>
  );
};

export default Status;
