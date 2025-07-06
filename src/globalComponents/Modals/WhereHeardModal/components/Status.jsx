import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { WHERE_HEARD_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

const Status = ({ modalData, setInputValue }) => {
  const dispatch = useDispatch();
  const confirmedStatusList = [
    { status: true, label: "Aktiv" },
    { status: false, label: "Deaktiv" },
  ];


  const handleStatusClick = (isActive) => {
    dispatch({
      type: WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL,
      payload: {
        data: { ...modalData, isActive },
        openModal: true,
      },
    });
    setInputValue("isActive", isActive);
  };

  return (
    <>
      <div className="modal-select events ">
        <ul>
          {confirmedStatusList.map((item, i) => (
            <li
              key={i}
              className={item.status === modalData?.isActive ? "active" : ""}
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
