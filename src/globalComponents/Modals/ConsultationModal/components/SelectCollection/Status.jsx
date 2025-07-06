import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const Status = ({ formik, modalData, updateModalState }) => {
  const { constStatusList: dataList } = useCustomHook();
  const inputValue = dataList.find((item) => item.key === modalData.status)?.name || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("status", item)
    setOpenDropdown(false)
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
              label="Status"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("status", true)}
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
            {dataList.map((item) => (
              <li key={item.key} onClick={() => addData(item.key)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.status && formik.touched.status && (
        <small className="validation-err-message">
          {formik.errors.status}
        </small>
      )}
    </>
  );
};

export default Status;
