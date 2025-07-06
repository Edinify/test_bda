import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import SalesBox  from "../../../../assets/icons/report/salesBox.svg?react";
import ArrowIcon  from "../../../../assets/icons/report/arrow.svg?react";

import { useReportSalesCustomHook } from "./utils/utils";
import moment from "moment";
import "moment/locale/az";

const SalesReport = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState({});

  const { consultationStatisticSelectedOption } = useSelector(
    (state) => state.reportDateFilter
  );

  const { consultationStatistics } = useSelector((state) => state.reportDatas);

  const { getAllDataByMonth, getAllDataByDateRange, getAllDefaultData } =
    useReportSalesCustomHook();

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
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_CHOOSE_DATE_FILTER,
      payload: { financeChooseDate: { startDate, endDate } },
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
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_MONTH_FILTER,

      payload: { consultationStatisticMonthFilter: option.key },
    });
  };

  const selectOption = (option) => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_DATE_SELECTED_OPTION,
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
      type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    return () => {
      dispatch({
        type: REPORT_FILTER_ACTION_TYPE.GET_CONSULTATION_STATISTICS_MONTH_FILTER,
        payload: { consultationStatisticMonthFilter: "" },
      });
    };
  }, []);

  const salesData = [
    {
      id: 1,
      name: "Lead",
      count: consultationStatistics?.totalLead,
      color: "green",
    },
    {
      id: 2,
      name: "Nömrə",
      count: consultationStatistics?.totalPlans,
      color: "orange",
    },
    {
      id: 3,
      name: "Kons",
      count: consultationStatistics?.totalConsultation,
      color: "red",
    },
    {
      id: 4,
      name: "Satış",
      count: consultationStatistics?.totalSales,
      color: "blue",
    },
  ];
  return (
    <div className="lesson-remainder sales ">
      <div className="sales-divition-img">
        <SalesBox />
      </div>
      <h2>Satış hesabat</h2>
      <div className="students-remainder">
        <div className="finance-date-filter">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => selectOption(item)}
              className={`content-box ${
                consultationStatisticSelectedOption?.key === item?.key
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
        <div className="sales-report-cards">
          {salesData?.map((student) => (
            <div key={student.id} className="sales-report-card">
              <div
                className={`report-type left ${
                  student.color === "orange"
                    ? "orange"
                    : student.color === "green"
                    ? "green"
                    : student.color === "blue"
                    ? "blue"
                    : "red"
                } `}
              >
               <ArrowIcon/>
                <h4>{student.name}</h4>
              </div>
              <div
                className={`report-type right ${
                  student.color === "orange"
                    ? "orange"
                    : student.color === "green"
                    ? "green"
                    : student.color === "blue"
                    ? "blue"
                    : "red"
                } `}
              >
                <h4>{student.count} </h4>
              </div>
            </div>
          ))}
        </div>
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

export default SalesReport;
