import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Select = ({
  formik,
  inputName,
  label,
  setInputValue,
  updateModalState,
  dataList,
}) => {
  const { tuitionFeeModalData: modalData } = useSelector(
    (state) => state.tuitionFeeModal
  );
  const [openDropdown, setOpenDropdown] = useState(false);
  const selectedValue = modalData[inputName]
    ? dataList.find((item) => item.key === modalData[inputName])?.name
    : "";
  const selectItem = (inputValue) => {
    setInputValue(inputName, inputValue);
    updateModalState(inputName, inputValue);
    setOpenDropdown(false);
  };
  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <TextField
            sx={{
              "& input": {
                fontSize: "12px",
                marginRight: "32px",
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label={label}
            autoComplete="off"
            value={selectedValue}
            onBlur={() => formik.setFieldTouched(inputName, true)}
            onClick={() => setOpenDropdown(!openDropdown)}
          />
          <div
            className="dropdown-icon"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <svg
              className={!openDropdown ? "down" : "up"}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                stroke="#5D5D5D"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <ul
          className={`dropdown-body where-coming ${
            openDropdown ? "active" : ""
          }`}
        >
          {dataList.map((item, index) => (
            <li key={index} onClick={() => selectItem(item.key)}>
              <h4>{item.name}</h4>
            </li>
          ))}
        </ul>
      </div>
      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </>
  );
};

export default Select;
