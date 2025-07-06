import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const WhereSend = ({ formik, modalData, updateModalState }) => {
  const { whereSendList: dataList } = useCustomHook();
  const inputValue =
    dataList.find((item) => item.key === modalData.whereSend)?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("whereSend", item);
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
                "& .MuiInputLabel-root.Mui-required:after": {
                  content: '" *"',
                  color: "red",
                  fontSize: "12px",
                },
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label=" Haradan Göndərilib?"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("whereSend", true)}
              required={true}
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
      {formik.errors.whereSend && formik.touched.whereSend && (
        <small className="validation-err-message">
          {formik.errors.whereSend}
        </small>
      )}
    </>
  );
};

export default WhereSend;
