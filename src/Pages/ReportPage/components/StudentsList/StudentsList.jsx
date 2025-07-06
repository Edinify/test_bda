import React, { useEffect, useState } from "react";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import { useDispatch, useSelector } from "react-redux";
import { useReportStudentListCustomHook } from "./utils/utils";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";
import moment from "moment";
import "moment/locale/az";
const StudentsList = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState({});

  const { studentsCountAndTotalContractAmountStatus } = useSelector(
    (state) => state.reportDatas
  );

  const { studentsCountContractStatusSelectedOption } = useSelector(
    (state) => state.reportDateFilter
  );
  const { tuitionStatusData } = useCustomHook();

  const { getAllDataByDateRange, getAllDataByMonth, getAllDefaultData } =
    useReportStudentListCustomHook();

  useEffect(() => {
    getAllDefaultData();
  }, []);

  const data = [
    { key: 1, name: "Cari ay" },
    { key: 3, name: "Son 3 ay" },
    { key: 6, name: "Son 6 ay" },
    { key: 12, name: "İllik" },
    { key: "", name: "Tarix seç" },
  ];

  const dispatch = useDispatch();

  const applyFilter = (startDate = "", endDate = "") => {
    getAllDataByDateRange(startDate, endDate);
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_CHOOSE_DATE_FILTER,
      payload: {
        studentsCountContractStatusChooseDate: { startDate, endDate },
      },
    });
    setDate({
      startDate,
      endDate,
    });
    setOpenCalendar(false);
  };

  const applyMonthFilter = (option) => {
    getAllDataByMonth(option.key);
    setOpenCalendar(false);
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_MONTH_FILTER,
      payload: { studentsCountContractStatusMonthFilter: option.key },
    });
  };

  const selectOption = (option) => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_DATE_SELECTED_OPTION,
      payload: option,
    });
    if (option.name === "Tarix seç") {
      setOpenCalendar(!openCalendar);
    } else {
      applyMonthFilter(option);
    }
  };

  useEffect(() => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    return () => {
      dispatch({
        type: REPORT_FILTER_ACTION_TYPE.GET_STUDENTS_COUNT_CONTRACT_STATUS_MONTH_FILTER,
        payload: { studentsCountContractStatusMonthFilter: "" },
      });
    };
  }, []);
  return (
    <div className="student-list-card">
      <div className="finance-date-filter">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => selectOption(item)}
            className={`content-box ${
              studentsCountContractStatusSelectedOption.key === item.key
                ? "active"
                : ""
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
      {date.startDate && date.endDate && (
        <div style={{ textAlign: "center" }}>
          <span>{`${moment(date?.startDate)
            .locale("az")
            .format("DD MMMM YYYY")} - ${moment(date?.endDate)
            .locale("az")
            .format("DD MMMM YYYY")} `}</span>
        </div>
      )}

      <table className="status-list-cards">
        <thead>
          <tr>
            <th>Ad</th>
            <th>Say</th>
            <th>Qiymət</th>
          </tr>
        </thead>
        <tbody>
          {studentsCountAndTotalContractAmountStatus?.map((group, i) => {
            const matchedStatus = tuitionStatusData.find(
              (item) => item.key === group.status
            );

            return (
              <tr key={i}>
                <td style={{color:"#979797"}} >{matchedStatus ? matchedStatus.name : group.status}</td>
                <td style={{color:"#FF9000"}} >{group.studentCount}</td>
                <td>{group.totalPaymentsSum} AZN</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </div>
  );
};

export default StudentsList;
