import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const Knowledge = ({ formik, modalData, updateModalState }) => {
  const { knowledgeList: dataList } = useCustomHook();
  const inputValue = dataList.find((item) => item.key === modalData.knowledge)?.name || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("knowledge", item)
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
              label="Sahə biliyi"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("knowledge", true)}
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
      {formik.errors.knowledge && formik.touched.knowledge && (
        <small className="validation-err-message">
          {formik.errors.knowledge}
        </small>
      )}
    </>
  );
};

export default Knowledge;
