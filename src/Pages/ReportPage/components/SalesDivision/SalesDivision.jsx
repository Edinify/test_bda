import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import DateRangeModal from "../../../../globalComponents/Modals/DateRangeModal/DateRangeModal";
import { useReporStudentSalesTypeCustomHook } from "./utils/utils";
import  ArrowIcon from "../../../../assets/icons/report/arrow.svg?react"
import  DivisionBox from "../../../../assets/icons/report/divisionBox.svg?react"
import moment from "moment";
import "moment/locale/az";
const SalesDivision = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState({});

  const { salesDivitionDateSelectedOption } = useSelector(
    (state) => state.reportDateFilter
  );

  const { getAllDataByMonth, getAllDataByDateRange, getAllDefaultData } =
    useReporStudentSalesTypeCustomHook();

  const { studentsSalesType } = useSelector((state) => state.reportDatas);

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
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_CHOOSE_DATE_FILTER,
      payload: { salesDivitionChooseDate: { startDate, endDate } },
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
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_MONTH_FILTER,
      payload: { salesDivitionMonthFilter: option.key },
    });
  };

  const selectOption = (option) => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_DATE_SELECTED_OPTION,
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
      type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_DATE_SELECTED_OPTION,
      payload: {
        key: "all",
        name: "Hamısı",
      },
    });
    return () => {
      dispatch({
        type: REPORT_FILTER_ACTION_TYPE.GET_SALES_DIVITION_MONTH_FILTER,
        payload: { salesDivitionMonthFilter: "" },
      });
    };
  }, []);

  const b2bCount =
    studentsSalesType?.find((type) => type._id === "B2B")?.count || 0;
  const b2cCount =
    studentsSalesType?.find((type) => type._id === "B2C")?.count || 0;
  const b2gCount =
    studentsSalesType?.find((type) => type._id === "B2G")?.count || 0;

  const salesData = [
    {
      id: 1,
      name: "B2B",
      count: b2bCount,
    },
    {
      id: 2,
      name: "B2C",
      count: b2cCount,
    },
    {
      id: 3,
      name: "B2G",
      count: b2gCount,
    },
  ];
  return (
    <div className="lesson-remainder sales division ">
      <div className="sales-divition-img">
     

     <DivisionBox/>
      </div>
      <h2>Satış bölgüsü</h2>
      <div className="students-remainder">
        <div className="finance-date-filter">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => selectOption(item)}
              className={`content-box ${
                salesDivitionDateSelectedOption.key === item.key ? "active" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="sales-report-cards">
          {salesData?.map((student, i) => (
            <div key={i} className="sales-report-card">
              <div className={"report-type division"}>
               <ArrowIcon/>
                <h4>{student?.name}</h4>
              </div>
              <div className={"report-type  count "}>
                <h4>{student.count} </h4>
              </div>
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

export default SalesDivision;
