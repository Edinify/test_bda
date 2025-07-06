import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../../../components/DropdownIcon/DropdownIcon";

const DiscountReason = ({ formik, data, addGroupData }) => {
  const { discountReasonList: dataList } = useCustomHook();
  const inputValue = dataList.find((item) => item.key === data.discountReason)?.name || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    addGroupData("discountReason", item)
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
              label="Endirim növü"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("discountReason", true)}
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
      {formik.errors.discountReason && formik.touched.discountReason && (
        <small className="validation-err-message">
          {formik.errors.discountReason}
        </small>
      )}
    </>
  );
};

export default DiscountReason;
