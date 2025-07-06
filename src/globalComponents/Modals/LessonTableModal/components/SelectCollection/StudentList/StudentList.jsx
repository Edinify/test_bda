import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import SearchIcon  from "../../../../../../assets/icons/search-normal.svg?react";
import CheckIcon  from "../../../../../../assets/icons/Checkbox.svg?react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  getActiveStudentsAction,
  setLoadingAllStudentsAction,
} from "../../../../../../redux/actions/studentsActions";
import LoadingBtn from "../../../../../Loading/components/LoadingBtn/LoadingBtn";
import StudentInput from "./StudentInput";
import DropdownIcon from "../../../../components/DropdownIcon/DropdownIcon";

const StudentList = ({ modalData, updateModalState }) => {
  const dispatch = useDispatch();
  const { loading, loadingAll, studentsByMore } = useSelector(
    (state) => state.studentsPagination
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchedValue, setSearchedValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const inputValue = selectedItem ? selectedItem.fullName : searchedValue;

  const getSearchValue = (e) => {
    if (!openDropdown) {
      setOpenDropdown(true);
    }
    setSearchedValue(e.target.value);
    setSelectedItem("");
    updateModalState("student", "");
  };
  const addItem = () => {
    if (modalData.students) {
      // the same element can't be added twice
      if (modalData.students.find((item) => item._id === selectedItem._id)) {
      } else {
        const studentsData = [...modalData?.students, {student: selectedItem}];
        updateModalState("students", studentsData);
      }
    } else {
      const studentsData = [{student: selectedItem}];
      updateModalState("students", studentsData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };
  const searchData = (e) => {
    dispatch(setLoadingAllStudentsAction(true));
    dispatch(
      getActiveStudentsAction({
        studentsCount: 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseId: modalData?.group.course?._id,
      })
    );
  };
  const getMoreData = () => {
    dispatch(
      getActiveStudentsAction({
        studentsCount: studentsByMore?.length ? studentsByMore?.length : 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseId: modalData?.group.course?._id,
      })
    );
  };
  const deleteItem = (_id) => {
    if (modalData.students.length === 1) {
      updateModalState("students", []);
    } else {
      const studentsData = modalData.students.filter(
        (student) => student._id !== _id
      );
      updateModalState("students", studentsData);
    }
  };

  useEffect(() => {
    if (modalData.course) {
      dispatch(
        getActiveStudentsAction({
          studentsCount: 0,
          searchQuery: searchedValue ? searchedValue : "",
          courseId: modalData?.group.course?._id,
        })
      );
    }
  }, []);

  return (
    <div>
      <div className={`dropdown-input search courses`}>
        <div className="left">
          <div className="input-box">
            <div className="search-icon" onClick={() => searchData()}>
              <SearchIcon />
            </div>
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginLeft: "25px",
                  marginRight: "32px",
                },
                "& label": {
                  paddingLeft: inputValue ? "0px" : "25px",
                },
                "& label.Mui-focused": {
                  paddingLeft: "0px",
                },
                marginTop: "20px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label="Tələbə adı"
              name="class"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => getSearchValue(e)}
            />
            <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>
          <ul className={`dropdown-body  ${openDropdown ? "active" : ""}`}>
            {loadingAll ? (
              <li className="loading">
                <LoadingBtn />
              </li>
            ) : (
              studentsByMore?.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  className={
                    modalData.items?.find(
                      (item) => item?.item._id === item?._id
                    )
                      ? "disabled"
                      : ""
                  }
                >
                  {modalData?.students?.find((obj) => obj._id === item._id) ? (
                    <CheckIcon />
                  ) : null}
                  <h4>{item.fullName}</h4>
                </li>
              ))
            )}
            {!loadingAll && (
              <li>
                <button
                  onClick={() => modalData.course && getMoreData()}
                  className="more-btn"
                  disabled={loading}
                >
                  {loading ? "yüklənir..." : "daha cox"}
                </button>
              </li>
            )}
          </ul>
        </div>

        <div className="right">
          <button
            disabled={!selectedItem}
            onClick={() => addItem()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      <ul className="category-list courses-li">
        {modalData?.students?.map((item, index) => (
          <StudentInput
            key={index}
            index={index}
            data={item}
            deleteItem={deleteItem}
            modalData={modalData}
            updateModalState={updateModalState}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
