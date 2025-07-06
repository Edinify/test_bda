import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import DropdownIcon from "../../components/DropdownIcon/DropdownIcon";
import { EVENTS_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";

const Purpose = ({ formik, modalData, setInputValue }) => {
  const dispatch = useDispatch();
  const inputValue = modalData?.purpose || "";
  const [openDropdown, setOpenDropdown] = useState(false);

  const purposes = [
    { key: "new-qrup", value: "Yeni qrup" },
    { key: "conversation", value: "Müzakirə" },
    { key: "meet-up", value: "Meet-up" },
    { key: "community", value: "Community görüşü" },
    { key: "meeting", value: "Tanışlıq" },
    { key: "thesis-defense", value: "Diplom müdafiəsi" },
  ];

  const addData = (item) => {
    dispatch({
      type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
      payload: {
        data: { ...modalData, purpose: item.key },
        openModal: true,
      },
    });
    setInputValue("purpose", item.value);
    setOpenDropdown(false);
  };

  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
                // marginBottom: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Məqsəd"
              autoComplete="off"
              disabled
              value={
                purposes.find((item) => item.key === inputValue)?.value || ""
              }
              onBlur={() => formik.setFieldTouched("purpose", true)}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            {purposes.map((item, i) => (
              <li key={i} onClick={() => addData(item)}>
                <h4>{item.value}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">
          {formik.errors.purpose}
        </small>
      )}
    </>
  );
};

export default Purpose;
