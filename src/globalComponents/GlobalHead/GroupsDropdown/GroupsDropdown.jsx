import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import {
  DROPDOWN_GROUP_ACTIONS_TYPE,
  SELECTED_GROUPS_ACTION_TYPE,
} from "../../../redux/actions-type";
import {
  getGroupsAction,
  getGroupsWithMentorAction,
  getGroupsWithStudentAction,
  getGroupsWithTeacherAction,
} from "../../../redux/actions/groupsActions";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useLocation } from "react-router-dom";

export const GroupsDropdown = ({ deviceType = "", page, type }) => {
  const dispatch = useDispatch();
  const { groupData: dataList } = useSelector(
    (state) => state.groupsPagination
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { selectedGroups } = useSelector((state) => state.selectedGroups);

  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [groupStatus, setGroupStatus] = useState(
    page === "lesson-table" ? "current" : "all"
  );
  const location = useLocation();

  const getCourse = (group) => {
    if (
      location.pathname !== "/tuition-fee" ||
      location.pathname !== "/tuitionFee"
    ) {
      setDropdownOpen(false);
    }
    dispatch({
      type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
      payload: group,
    });
  };

  useEffect(() => {
    if (user?.role === "teacher") {
      dispatch(getGroupsWithTeacherAction(user._id));
    } else if (user?.role === "mentor") {
      dispatch(getGroupsWithMentorAction(user._id));
    } else if (user?.role === "student") {
      dispatch(getGroupsWithStudentAction(user._id));
    } else {
      dispatch(getGroupsAction(groupStatus));
    }
  }, [groupStatus]);

  useEffect(() => {
    return () => {
      dispatch({
        type: DROPDOWN_GROUP_ACTIONS_TYPE.CLEAR_GROUP,
      });
    };
  }, [dispatch]);

  const handleSelectAll = () => {
    setDropdownOpen(false);
    dispatch({
      type: DROPDOWN_GROUP_ACTIONS_TYPE.SELECT_GROUP,
      payload: "",
    });
    // setSelectedGroups([]);
    dispatch({
      type: SELECTED_GROUPS_ACTION_TYPE.GET_SELECTED_GROUPS,
      payload: [],
    });
  };

  const handleSelectedGroup = (id) => {
    let updatedGroups;

    if (selectedGroups.includes(id)) {
      updatedGroups = selectedGroups.filter((groupId) => groupId !== id);
    } else {
      updatedGroups = [...selectedGroups, id];
    }
    dispatch({
      type: SELECTED_GROUPS_ACTION_TYPE.GET_SELECTED_GROUPS,
      payload: updatedGroups,
    });

    dispatch({
      type: SELECTED_GROUPS_ACTION_TYPE.GET_SELECTED_GROUPS,
      payload: updatedGroups,
    });
  };

  const sortedDataList = [...dataList].sort((a, b) => {
    const isSelectedA = selectedGroups.includes(a._id);
    const isSelectedB = selectedGroups.includes(b._id);
    return isSelectedB - isSelectedA;
  });

  return (
    <div
      ref={dropdownRef}
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {!["/tuition-fee", "/tuitionFee"].includes(location.pathname) ? (
          <h2>{selectedGroup ? selectedGroup.name : "Qruplar"}</h2>
        ) : (
          <h2>Qruplar ({selectedGroups?.length}) </h2>
        )}

        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {page === "lesson-table" &&
          (user?.role === "super-admin" || user?.role === "worker") && (
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
                "& .MuiFormControlLabel-label": {
                  fontSize: 12,
                },
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 1,
                boxSizing: "border-box",
                borderBottom: "1px solid #dddddd",
              }}
            >
              <FormControlLabel
                value="current"
                control={<Radio checked={groupStatus === "current"} />}
                label="Mövcud"
                onClick={() => {
                  setGroupStatus("current");
                }}
              />
              <FormControlLabel
                value="ended"
                control={<Radio checked={groupStatus === "ended"} />}
                label="Bitmiş"
                onClick={() => {
                  setGroupStatus("ended");
                }}
              />
            </RadioGroup>
          )}
        <ul>
          {page !== "lesson-table" && <li onClick={handleSelectAll}>Hamısı</li>}
          {dataList
            ?.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""))
            ?.sort(
              (c, d) =>
                selectedGroups.includes(d._id) - selectedGroups.includes(c._id)
            )
            .map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  handleSelectedGroup(item._id);
                  getCourse(item);
                }}
              >
                {(location.pathname === "/tuition-fee" ||
                  location.pathname === "/tuitionFee") && (
                  <input
                    style={{ marginRight: "10px" }}
                    type="checkbox"
                    checked={selectedGroups?.includes(item._id)}
                    onChange={() => handleSelectedGroup(item._id)}
                  />
                )}

                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
