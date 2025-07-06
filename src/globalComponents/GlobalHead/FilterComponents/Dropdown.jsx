import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import { FILTER_ACTION_TYPE } from "../../../redux/actions-type";
import { getAllCoursesAction } from "../../../redux/actions/coursesActions";
import { useCustomHook } from "../../GlobalFunctions/globalFunctions";
import { getActiveWhereComing } from "../../../redux/actions/whereHeardActions";
// test
export const Dropdown = ({ deviceType = "", type }) => {
  const dispatch = useDispatch();
  const {
    course,
    status,
    whereComing,
    startDate,
    endDate,
    group,
    teacher,
    paymentType,
    forDate,
    tuitionStatus,
  } = useSelector((state) => state.filter);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { activeWhereData } = useSelector((state) => state.whereHeard);
  const [dataList, setDataList] = useState([]);
  const { allCourses } = useSelector((state) => state.allCourses);
  const { groupData } = useSelector((state) => state.groupsPagination);
  const { whereForDate, constStatusList, tuitionStatusData } = useCustomHook();

  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    dispatch(getActiveWhereComing());
  }, [dispatch]);

  const handleClick = (item) => {
    setDropdownOpen(false);

    switch (type) {
      case "course": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { course: item },
        });
        return;
      }
      case "status": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { status: item?.key || "" },
        });
        return;
      }
      case "whereComing": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { whereComing: item?._id || "" },
        });
        return;
      }
      case "whereForDate": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { forDate: item.key || "" },
        });
        return;
      }
      case "group": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { group: item },
        });
        return;
      }
      case "tuitionStatus": {
        dispatch({
          type: FILTER_ACTION_TYPE.GET_FILTER_DATA,
          payload: { tuitionStatus: item?.key || "" },
        });
        return;
      }
      default:
        return;
    }
  };

  const handleChangeDrop = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    if (dropdownOpen) {
      switch (type) {
        case "course": {
          dispatch(getAllCoursesAction());
        }
      }
    }
  }, [dropdownOpen]);

  useEffect(() => {
    switch (type) {
      case "course": {
        setDataList(allCourses);
        return;
      }

      case "status": {
        setDataList(constStatusList);
        return;
      }
      case "whereComing": {
        setDataList(activeWhereData);
        return;
      }
      case "group": {
        setDataList(groupData);
        return;
      }
      case "whereForDate": {
        setDataList(whereForDate);
        return;
      }
      case "tuitionStatus": {
        setDataList(tuitionStatusData);
        return;
      }
      default:
        return;
    }
  }, [allCourses, groupData, activeWhereData]);

  useEffect(() => {
    switch (type) {
      case "course": {
        setSelectedOption(course?.name || "İxtisaslar");
        return;
      }
      case "status": {
        setSelectedOption(
          constStatusList.find((item) => item.key === status)?.name ||
            "Statuslar"
        );
        return;
      }
      case "whereComing": {
        setSelectedOption(
          activeWhereData.find((item) => item._id === whereComing)?.name ||
            "Bizi haradan eşidiblər"
        );
        return;
      }
      case "whereForDate": {
        setSelectedOption(
          whereForDate.find((item) => item.key === forDate)?.name ||
            "Əlaqə tarixi"
        );
        return;
      }
      case "group": {
        setSelectedOption(group?.name || "Qruplar");
        return;
      }
      case "tuitionStatus": {
        setSelectedOption(
          tuitionStatusData.find((item) => item.key === tuitionStatus)?.name ||
            "Status"
        );
        return;
      }

      default:
        return;
    }
  }, [
    course,
    status,
    whereComing,
    startDate,
    endDate,
    group,
    teacher,
    paymentType,
    group,
    forDate,
    tuitionStatus,
    activeWhereData,
  ]);

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div className="dropdown-head" onClick={handleChangeDrop}>
        <h2>{selectedOption}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {type !== "whereForDate" && (
            <li onClick={() => handleClick("")}>Hamısı</li>
          )}

          {(type === "course" &&
            dataList.map((item) => (
              <li key={item._id} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))) ||
            dataList.map((item, i) => (
              <li key={i} onClick={() => handleClick(item)}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
