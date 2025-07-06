import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { useReportCustomHook } from "./utils/utils";
import moment from "moment";
import "moment/locale/az";
import { BsInfoCircleFill } from "react-icons/bs";
import { Tooltip } from "antd";

const StatBox = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState({});

  const { reportDateSelectedOption } = useSelector(
    (state) => state.reportDateFilter
  );

  const { getAllDataByMonth, getAllDataByDateRange } = useReportCustomHook();

  const {
    totalAmountSumContinuesStudents,
    totalAmountSumWaitingStudents,
    totalDebtContinueStudents,
    totalDebtDisabledStudents,
  } = useSelector((state) => state.reportDatas);

  const data = [
    { key: "all", name: "Hamısı" },
    { key: 3, name: "Son 3 ay" },
    { key: 6, name: "Son 6 ay" },
    { key: 12, name: "İllik" },
    { key: "", name: "Tarix seç" },
  ];

  const dispatch = useDispatch();

  const applyFilter = (startDate = "", endDate = "") => {
    getAllDataByDateRange(startDate, endDate);
    setDate({
      startDate,
      endDate,
    });
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_CHOOSE_DATE_FILTER,
      payload: { financeChooseDate: { startDate, endDate } },
    });
    setOpenCalendar(false);
  };

  const applyMonthFilter = (option) => {
    getAllDataByMonth(option.key);
    setOpenCalendar(false);
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_MONTHS_FILTER,
      payload: { reportMonthFilter: option.key },
    });
  };

  const selectOption = (option) => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_DATE_SELECTED_OPTION,
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
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_DATE_SELECTED_OPTION,
      payload: {
        key: "all",
        name: "Hamısı",
      },
    });
    return () => {
      dispatch({
        type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_MONTHS_FILTER,
        payload: { reportMonthFilter: "" },
      });
    };
  }, []);

  const statBoxCard = [
    {
      id: 1,
      text: "Aktiv müqavilə həcmi",
      value: `${totalAmountSumContinuesStudents} AZN`,
      color: "blue",
      info: "“davam edir” statuslu tələbələrin müqavilə üzrə ödəməli olduqları məbləğlərin cəmi",
    },
    {
      id: 2,
      text: "Aktiv gecikmə həcmi",
      value: `${totalDebtContinueStudents} AZN`,
      color: "red",
      info: "“davam edir” statuslu tələbələrin gecikmədə olan ödənişlərinin cəmi",
    },
    {
      id: 3,
      text: "Dondurdu/Dayandırdı",
      value: `${totalDebtDisabledStudents} AZN`,
      color: "orange",
      info: "“dondurdu” və “dayandardı” statuslu tələbələrin qalıq ödənişlərinin cəmi",
    },
    {
      id: 4,
      text: "Gözləyən tələbə həcmi",
      value: `${totalAmountSumWaitingStudents} AZN`,
      color: "green",
      info: "“gözləmədə” statuslu tələbələrin müqavilə üzrə ödəyəcəyi məbləğlərin cəmi",
    },
  ];

  return (
    <div className="stat-box">
      <div className="stat-date">
        <div className="finance-date-filter">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => selectOption(item)}
              className={`content-box ${
                reportDateSelectedOption.key === item.key ? "active" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        {date.startDate && date.endDate && (
          <div>
            <span>{`${moment(date?.startDate)
              .locale("az")
              .format("DD MMMM YYYY")} - ${moment(date?.endDate)
              .locale("az")
              .format("DD MMMM YYYY")} `}</span>
          </div>
        )}
      </div>
      <div className="stat-box-cards">
        {statBoxCard?.map((card) => (
          <div
            className={`stat-card ${
              card.color === "blue"
                ? "blue"
                : card.color === "red"
                ? "red"
                : card.color === "orange"
                ? "orange"
                : "green"
            } `}
            key={card.id}
          >
            <h3>{card.value}</h3>
            <span>{card.text}</span>

            <div style={{ position: "absolute", right: "5px", top: "5px" }}>
              <Tooltip
                title={<p style={{ fontSize: "12px" }}>{card.info}</p>}
                sx={{
                  color: "lightgray",
                }}
                placement="right"
              >
                <div>
                  <BsInfoCircleFill
                    style={{
                      position: "static",
                      color: "lightgray",
                      cursor: "initial",
                      zIndex: 1000,
                      fontSize: "13px",
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {openCalendar && (
        <DateRangeModal
          applyFilter={applyFilter}
          setOpenCalendar={setOpenCalendar}
        />
      )}
    </div>
  );
};

export default StatBox;
