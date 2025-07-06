import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { getAllCoursesAction } from "../../../../../redux/actions/coursesActions";
import { useDispatch, useSelector } from "react-redux";
import { getActiveStudentsAction } from "../../../../../redux/actions/studentsActions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const Course = ({ formik, modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const inputValue = modalData?.course?.name || "";
  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    dispatch(
      getActiveStudentsAction({
        studentsCount: 0,
        searchQuery: "",
        courseId: item._id,
      })
    );
    updateModalState("course", item);
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
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
              label="İxtisas"
              autoComplete="off"
              disabled
              value={inputValue}
              onBlur={() => formik.setFieldTouched("course", true)}
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
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {formik.errors.course && formik.touched.course && (
        <small className="validation-err-message">{formik.errors.course}</small>
      )}
    </>
  );
};

export default Course;
