import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getActiveTeachersAction } from "../../../../../redux/actions/teachersActions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const Teacher = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { teachers: dataList } = useSelector((state) => state.teachersPagination);
  const inputValue = modalData?.teacher?.fullName || ""
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("teacher", item)
    setOpenDropdown(false)
  };

  useEffect(() => {
    dispatch(getActiveTeachersAction());
  }, []);
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
              label="Təlimçi"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("teacher", true)}
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
              <li key={item._id} onClick={() => addData(item)}>
                <h4>{item.fullName}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.teacher && formik.touched.teacher && (
        <small className="validation-err-message">
          {formik.errors.teacher}
        </small>
      )}
    </>
  );
};

export default Teacher;
