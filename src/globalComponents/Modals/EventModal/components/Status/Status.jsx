import React, { useState } from "react";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useDispatch } from "react-redux";

const Status = ({ modalData, setInputValue }) => {
  const dispatch = useDispatch();
  const confirmedStatusList = [
    { status: false, label: "Gözləmədə" },
    { status: true, label: "Keçirilib" },
  ];

  const handleStatusClick = (status) => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: {
        data: { ...modalData, status },
        openModal: true,
      },
    });
    setInputValue("status", status);
  };

  // // console.log(modalData, "modal data in status");
  return (
    <>
      <div className="modal-select events ">
        <ul>
          {confirmedStatusList.map((item, i) => (
            <li
              key={i}
              className={item.status === modalData?.status ? "active" : ""}
              onClick={() => handleStatusClick(item.status)}
              id={item.status ? "confirmed" : "unviewed"}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Status;
