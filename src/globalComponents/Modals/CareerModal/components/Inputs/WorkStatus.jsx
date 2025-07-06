import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const WorkStatus = ({ formik, modalData, updateModalState }) => {
  const { careerModalWorkStatusList: dataList } = useCustomHook();

  // const dataList=[
  //     {name:"İşləyir",key:"employed"},
  //     {name:"Tələbədir",key:"student"},
  //     {name:"İşsizdir",key:"unemployed"},
  // ]
  const inputValue =
    dataList.find((item) => item.key === modalData.workStatus)?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("workStatus", item);
    setOpenDropdown(false);
  };

  // // console.log(modalData,"modal")
  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div
            className="input-box"
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="İş statusu"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("workStatus", true)}
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
                {/* { console.log(item.name)} */}
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

export default WorkStatus;
