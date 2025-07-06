import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import SearchIcon  from "../../../../../assets/icons/search-normal.svg?react";
import CheckIcon  from "../../../../../assets/icons/Checkbox.svg?react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  getGroupsByCourseIdAction,
  setLoadingAllGroupsAction,
} from "../../../../../redux/actions/groupsActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import GroupInput from "./GroupInput";
import {
  GROUP_ALL_ACTIONS_TYPE,
} from "../../../../../redux/actions-type";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const GroupList = ({ modalData, updateModalState, formik, setInputValue }) => {
  const dispatch = useDispatch();
  const { loading, loadingAll, groupsByMore } = useSelector(
    (state) => state.groupsPagination
  );

  const courseIds =
    modalData?.courses?.map((item) => {
      return item._id;
    }) || [];
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchedValue, setSearchedValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const inputValue = selectedItem ? selectedItem.name : searchedValue;
  const [sameItemErrMessage, setsameItemErrMessage] = useState(false);

  const getSearchValue = (e) => {
    if (!openDropdown) {
      setOpenDropdown(true);
    }
    setSearchedValue(e.target.value);
    setSelectedItem("");
    updateModalState("student", "");
  };
  const searchData = (e) => {
    dispatch(setLoadingAllGroupsAction(true));
    dispatch(
      getGroupsByCourseIdAction({
        groupsCount: 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseIds: courseIds,
      })
    );
  };
  const getMoreData = () => {
    dispatch(
      getGroupsByCourseIdAction({
        groupsCount: groupsByMore?.length ? groupsByMore?.length : 0,
        searchQuery: searchedValue ? searchedValue : "",
        courseIds: courseIds,
      })
    );
  };

  const addData = () => {
    if (modalData.groups) {
      // the same element can't be added twice
      if (
        modalData.groups.find((item) => item.group._id === selectedItem._id)
      ) {
        setsameItemErrMessage(true);
      } else {
        setsameItemErrMessage(false);
        const groupsData = [...modalData.groups, { group: selectedItem }];
        updateModalState("groups", groupsData);
      }
    } else {
      const groupsData = [{ group: selectedItem }];
      updateModalState("groups", groupsData);
    }
    setSelectedItem("");
    setOpenDropdown(false);
  };
  const deleteItem = (_id) => {
    if (modalData.groups.length === 1) {
      updateModalState("groups", []);
    } else {
      const groupsData = modalData.groups.filter(
        (item) => item.group._id !== _id
      );
      updateModalState("groups", groupsData);
    }
  };

  useEffect(() => {
    if (modalData.courses) {
      dispatch(
        getGroupsByCourseIdAction({
          groupsCount: 0,
          searchQuery: "",
          courseIds: courseIds,
        })
      );
    } else {
      dispatch({
        type: GROUP_ALL_ACTIONS_TYPE.GET_MORE_GROUP_ALL_ADD,
        payload: { groups: "" },
      });
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
              label="Qrup adı"
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
              groupsByMore &&
              groupsByMore?.map((item, i) => (
                <li key={i} onClick={() => setSelectedItem(item)}>
                  {modalData?.groups?.find(
                    (obj) => obj.group._id === item._id
                  ) ? (
                    <CheckIcon />
                  ) : null}
                  <h4>{item.name}</h4>
                </li>
              ))
            )}
            {!loadingAll && (
              <li>
                <button
                  onClick={() =>
                    modalData?.courses?.length > 0 && getMoreData()
                  }
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
            onClick={() => addData()}
            className="add-class"
          >
            <AiOutlinePlusCircle />
          </button>
        </div>
      </div>

      {sameItemErrMessage && (
        <small className="exist-error-message">
          Bu qrup növü artıq mövcuddur.
        </small>
      )}

      <ul className="category-list courses-li">
        {modalData?.groups?.map((item, index) => (
          <GroupInput
            key={item.group._id}
            index={index}
            data={item}
            deleteItem={deleteItem}
            updateModalState={updateModalState}
            modalData={modalData}
            formik={formik}
            setInputValue={setInputValue}
          />
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
