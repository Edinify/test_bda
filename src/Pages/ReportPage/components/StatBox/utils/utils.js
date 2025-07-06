import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { getTotalAmountSumOfContinuesStudents, getTotalAmountSumOfWaitingStudents, getTotalDebtOfContinueStudents, getTotalDebtOfDisabledStudents } from "../../../../../redux/actions/reportActions";
import { REPORT_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";
import { useEffect } from "react";

export const useReportCustomHook = () => {
  const dispatch = useDispatch();

  const { reportChooseDate, reportMonthFilter } = useSelector(
    (state) => state.reportDateFilter
  );

  const getAllDefaultData = () => {
    dispatch(getTotalAmountSumOfContinuesStudents("", "", ""));
    dispatch(getTotalDebtOfContinueStudents("","",""));
    dispatch(getTotalDebtOfDisabledStudents("","",""));
    dispatch(getTotalAmountSumOfWaitingStudents("","",""))
  };


  useEffect(()=>{
    getAllDefaultData()
  },[])

  const getAllDataByMonth = (monthCount) => {
    if (monthCount === "all" || monthCount==="") {
      dispatch(getTotalAmountSumOfContinuesStudents("", "", ""));
      dispatch(getTotalDebtOfContinueStudents("","",""));
      dispatch(getTotalDebtOfDisabledStudents("","",""));
      dispatch(getTotalAmountSumOfWaitingStudents("","",""))
    } else {
      dispatch(getTotalAmountSumOfContinuesStudents("", "", monthCount));
      dispatch(getTotalDebtOfContinueStudents("","",monthCount));
      dispatch(getTotalDebtOfDisabledStudents("","",monthCount));
      dispatch(getTotalAmountSumOfWaitingStudents("","",monthCount))
    }
  };

  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch(getTotalAmountSumOfContinuesStudents(start, end, ""));
    dispatch(getTotalDebtOfContinueStudents(start, end,""));
    dispatch(getTotalDebtOfDisabledStudents(start, end,""));
    dispatch(getTotalAmountSumOfWaitingStudents(start, end,""))
  };

  const getFinanceDataAfterUpdate = () => {
    if (reportChooseDate.startDate && reportChooseDate.endDate) {
      const start = moment(reportChooseDate.startDate).format("YYYY-MM");
      const end = moment(reportChooseDate.endDate).format("YYYY-MM");
      dispatch(getTotalAmountSumOfContinuesStudents(start, end, ""));
      dispatch(getTotalDebtOfContinueStudents(start, end,""));
      dispatch(getTotalDebtOfDisabledStudents(start, end,""));
      dispatch(getTotalAmountSumOfWaitingStudents(start, end,""))
    } else {
      dispatch(
        getTotalAmountSumOfContinuesStudents("", "", reportMonthFilter || "")
   
        
      );
      dispatch(getTotalDebtOfContinueStudents("", "",reportMonthFilter || ""));
      dispatch(getTotalDebtOfDisabledStudents("", "",reportMonthFilter || ""));
      dispatch(getTotalAmountSumOfWaitingStudents("", "",reportMonthFilter || ""))
    }
  };

  const getFinanceDataAfterCreate = () => {
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_MONTHS_FILTER,
      payload: { financeMonthsFilter:"" },
    });
    dispatch({
      type: REPORT_FILTER_ACTION_TYPE.GET_REPORT_DATE_SELECTED_OPTION,
      payload: {
        key: "all",
        name: "Hamısı",
      },
    });
    dispatch(getTotalAmountSumOfContinuesStudents("", "", ""));
    dispatch(getTotalDebtOfContinueStudents("", "",""));
    dispatch(getTotalDebtOfDisabledStudents("", "",""));
    dispatch(getTotalAmountSumOfWaitingStudents("", "",""))
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
  };
};
