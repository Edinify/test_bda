import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CheckIcon  from "../../../../../../assets/icons/Checkbox.svg?react";
import CoursesInput from "./CoursesInput";
import { getAllCoursesAction } from "../../../../../../redux/actions/coursesActions";
import DropdownIcon from "../../../../components/DropdownIcon/DropdownIcon";

const CoursesList = ({ formik, updateModalState, modalData }) => {
  const dispatch = useDispatch();
  const { allCourses: dataList } = useSelector((state) => state.allCourses);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileErrMessage, setProfileErrMessage] = useState(false);

  const deleteClass = (_id) => {
    if (modalData.courses.length === 1) {
      updateModalState("courses", []);
    } else {
      const coursesData = modalData.courses.filter((course) => course._id !== _id )
      updateModalState("courses", coursesData);
    }
  };
  const addCourse = () => {
    if (modalData.courses) {
      // the same element can't be added twice
      if (modalData.courses.find((item) => item._id === selectedItem._id)) {
        setProfileErrMessage(true);
      } else {
        const coursesData = [...modalData?.courses, selectedItem];
        setProfileErrMessage(false);
        updateModalState("courses", coursesData);
      }
    } else {
      const coursesData = [selectedItem];
      setProfileErrMessage(false);
      updateModalState("courses", coursesData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch(getAllCoursesAction());
  }, []);


  return (
    <div>
      <div className="dropdown-input courses">
        <div className="left">
          <div className="input-box">
            <TextField
              sx={{
                "& input": { fontSize: "12px", marginRight: "32px" },
                marginTop: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="İxtisaslar"
              autoComplete="off"
              value={selectedItem?.name || ""}
              disabled
              onClick={() => setOpenDropdown(!openDropdown)}
            />

           <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul className={`dropdown-body ${openDropdown ? "active" : ""}`}>
            {dataList?.map((item, index) => (
              <li key={item._id} onClick={() => setSelectedItem(item)}>
                {modalData?.courses?.find((obj) => obj._id === item._id) ? (
                  <CheckIcon />
                ) : null}
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addCourse()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {formik.errors.courses && formik.touched.courses && (
        <small className="validation-err-message">
          {formik.errors.courses}
        </small>
      )}

      <ul className="category-list courses-li">
        {profileErrMessage ? (
          <small className="category-error-message">
            İxtisas artıq mövcuddur.
          </small>
        ) : null}

        {modalData?.courses?.map((item, index) => (
          <CoursesInput
            key={index}
            index={index}
            data={item}
            deleteClass={deleteClass}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
